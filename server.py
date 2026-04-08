from __future__ import annotations

import hashlib
import json
import os
import secrets
import urllib.parse
import urllib.request
from contextlib import contextmanager
from datetime import UTC, datetime
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory, session
from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text, create_engine, func, or_, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, selectinload, sessionmaker
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.security import check_password_hash, generate_password_hash


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_DATABASE_URL = f"sqlite:///{BASE_DIR / 'dream_share.db'}"
DATABASE_URL = os.environ.get("DATABASE_URL", DEFAULT_DATABASE_URL)
PORT = int(os.environ.get("PORT", "5000"))
DEBUG = os.environ.get("FLASK_DEBUG", "").lower() in {"1", "true", "yes", "on"}
SESSION_COOKIE_SECURE = os.environ.get("SESSION_COOKIE_SECURE", "").lower() in {"1", "true", "yes", "on"}


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    preferred_language: Mapped[str] = mapped_column(String(8), default="zh")
    avatar_data_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    location_label: Mapped[str | None] = mapped_column(String(180), nullable=True)
    location_lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    location_lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))

    wishes: Mapped[list["Wish"]] = relationship(back_populates="owner")


class Wish(Base):
    __tablename__ = "wishes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    title: Mapped[str] = mapped_column(String(120))
    description: Mapped[str] = mapped_column(Text)
    place: Mapped[str] = mapped_column(String(120))
    lat: Mapped[float] = mapped_column(Float)
    lng: Mapped[float] = mapped_column(Float)
    original_language: Mapped[str] = mapped_column(String(8), default="zh")
    status: Mapped[str] = mapped_column(String(24), default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))

    owner: Mapped[User] = relationship(back_populates="wishes")
    matches: Mapped[list["Match"]] = relationship(back_populates="wish")


class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    wish_id: Mapped[int] = mapped_column(ForeignKey("wishes.id"), index=True)
    helper_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    status: Mapped[str] = mapped_column(String(24), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    matched_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    wish: Mapped[Wish] = relationship(back_populates="matches")
    helper: Mapped[User] = relationship()
    messages: Mapped[list["Message"]] = relationship(back_populates="match")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    match_id: Mapped[int] = mapped_column(ForeignKey("matches.id"), index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    body: Mapped[str] = mapped_column(Text)
    original_language: Mapped[str] = mapped_column(String(8), default="zh")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))

    match: Mapped[Match] = relationship(back_populates="messages")
    sender: Mapped[User] = relationship()


class TranslationCache(Base):
    __tablename__ = "translation_cache"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    text_hash: Mapped[str] = mapped_column(String(64), index=True)
    source_language: Mapped[str] = mapped_column(String(8), index=True)
    target_language: Mapped[str] = mapped_column(String(8), index=True)
    translated_text: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))


def normalized_database_url(raw_url: str) -> str:
    if raw_url.startswith("postgres://"):
        return raw_url.replace("postgres://", "postgresql+psycopg://", 1)
    if raw_url.startswith("postgresql://") and "+psycopg" not in raw_url:
        return raw_url.replace("postgresql://", "postgresql+psycopg://", 1)
    return raw_url


NORMALIZED_DATABASE_URL = normalized_database_url(DATABASE_URL)
ENGINE_CONNECT_ARGS = {"check_same_thread": False} if NORMALIZED_DATABASE_URL.startswith("sqlite") else {}


engine = create_engine(
    NORMALIZED_DATABASE_URL,
    future=True,
    connect_args=ENGINE_CONNECT_ARGS,
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(engine, expire_on_commit=False)

app = Flask(__name__, static_folder=None)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", secrets.token_hex(16))
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = SESSION_COOKIE_SECURE
app.config["MAX_CONTENT_LENGTH"] = 4 * 1024 * 1024
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)


DEMO_PASSWORD = "demo123"
LANGUAGE_NAMES = {"zh": "中文", "en": "English"}
GEOCODER_USER_AGENT = "WishOrbit/1.0 (local prototype)"


@contextmanager
def db_session() -> Session:
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def utc_now() -> datetime:
    return datetime.now(UTC)


def current_user_id() -> int | None:
    user_id = session.get("user_id")
    return int(user_id) if user_id else None


def require_auth() -> int:
    user_id = current_user_id()
    if not user_id:
        raise ApiError("Please sign in first.", 401)
    return user_id


class ApiError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


@app.errorhandler(ApiError)
def handle_api_error(error: ApiError):
    return jsonify({"error": error.message}), error.status_code


@app.errorhandler(404)
def handle_404(_):
    if request.path.startswith("/api/"):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/")
def root():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/app.js")
def app_js():
    return send_from_directory(BASE_DIR, "app.js")


@app.route("/styles.css")
def styles_css():
    return send_from_directory(BASE_DIR, "styles.css")


@app.route("/orbit-mark.svg")
def orbit_mark():
    return send_from_directory(BASE_DIR, "orbit-mark.svg")


@app.get("/healthz")
def healthcheck():
    return jsonify({"ok": True, "status": "healthy"})


@app.get("/api/session")
def api_session():
    language = request.args.get("language", "zh")
    with db_session() as db:
        user = get_current_user(db)
        return jsonify({"currentUser": serialize_user(user) if user else None, "language": normalize_language(language)})


@app.post("/api/auth/register")
def register():
    payload = request.get_json(force=True, silent=True) or {}
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    preferred_language = normalize_language(payload.get("preferredLanguage") or "zh")

    if len(name) < 2:
        raise ApiError("Name must be at least 2 characters.")
    if "@" not in email:
        raise ApiError("Please provide a valid email.")
    if len(password) < 6:
        raise ApiError("Password must be at least 6 characters.")

    with db_session() as db:
        exists = db.scalar(select(User).where(User.email == email))
        if exists:
            raise ApiError("That email is already registered.", 409)

        user = User(
            name=name,
            email=email,
            password_hash=generate_password_hash(password),
            preferred_language=preferred_language,
        )
        db.add(user)
        db.flush()
        session["user_id"] = user.id
        return jsonify({"currentUser": serialize_user(user)})


@app.post("/api/auth/login")
def login():
    payload = request.get_json(force=True, silent=True) or {}
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    with db_session() as db:
        user = db.scalar(select(User).where(User.email == email))
        if not user or not check_password_hash(user.password_hash, password):
            raise ApiError("Email or password is incorrect.", 401)

        session["user_id"] = user.id
        return jsonify({"currentUser": serialize_user(user)})


@app.post("/api/auth/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.post("/api/preferences/language")
def update_language_preference():
    user_id = require_auth()
    payload = request.get_json(force=True, silent=True) or {}
    language = normalize_language(payload.get("language"))
    with db_session() as db:
        user = db.get(User, user_id)
        user.preferred_language = language
        return jsonify({"currentUser": serialize_user(user)})


@app.patch("/api/profile")
def update_profile():
    user_id = require_auth()
    payload = request.get_json(force=True, silent=True) or {}
    name = (payload.get("name") or "").strip()
    preferred_language = normalize_language(payload.get("preferredLanguage") or "zh")
    location_label = (payload.get("locationLabel") or "").strip()
    avatar_data_url = (payload.get("avatarDataUrl") or "").strip()
    location_lat = payload.get("locationLat")
    location_lng = payload.get("locationLng")

    if len(name) < 2:
        raise ApiError("Name must be at least 2 characters.")
    if avatar_data_url and (not avatar_data_url.startswith("data:image/") or len(avatar_data_url) > 3_000_000):
        raise ApiError("Avatar image is invalid or too large.")

    try:
        location_lat = float(location_lat) if location_lat not in (None, "", "null") else None
        location_lng = float(location_lng) if location_lng not in (None, "", "null") else None
    except Exception as exc:
        raise ApiError("Location coordinates are invalid.") from exc

    with db_session() as db:
        user = db.get(User, user_id)

        user.name = name
        user.preferred_language = preferred_language
        user.avatar_data_url = avatar_data_url or None
        user.location_label = location_label or None
        user.location_lat = location_lat
        user.location_lng = location_lng
        return jsonify({"currentUser": serialize_user(user)})


@app.get("/api/bootstrap")
def bootstrap():
    language = normalize_language(request.args.get("language", "zh"))
    with db_session() as db:
        user = get_current_user(db)
        wishes = db.scalars(
            select(Wish)
            .options(selectinload(Wish.owner), selectinload(Wish.matches).selectinload(Match.helper))
            .order_by(Wish.created_at.desc())
        ).all()

        matches = []
        incoming_requests = []
        active_matches = []
        pending_outgoing = []
        my_wishes = []
        discover_wishes = wishes

        if user:
            my_wishes = [wish for wish in wishes if wish.owner_id == user.id]
            discover_wishes = [wish for wish in wishes if can_discover_wish(wish, user.id)]
            all_matches = db.scalars(
                select(Match)
                .join(Wish)
                .options(
                    selectinload(Match.wish).selectinload(Wish.owner),
                    selectinload(Match.helper),
                    selectinload(Match.messages).selectinload(Message.sender),
                )
                .where(or_(Match.helper_id == user.id, Wish.owner_id == user.id))
                .order_by(Match.created_at.desc())
            ).all()
            matches = [serialize_match(db, match, user.id, language) for match in all_matches]
            incoming_requests = [match for match in matches if match["status"] == "pending" and match["viewerRole"] == "owner"]
            active_matches = [match for match in matches if match["status"] in {"matched", "completed"}]
            pending_outgoing = [match for match in matches if match["status"] == "pending" and match["viewerRole"] == "helper"]

        return jsonify(
            {
                "currentUser": serialize_user(user) if user else None,
                "stats": compute_user_stats(db, user) if user else guest_stats(wishes),
                "wishes": [serialize_wish(db, wish, user.id if user else None, language) for wish in wishes],
                "discoverWishes": [serialize_wish(db, wish, user.id if user else None, language) for wish in discover_wishes],
                "myWishes": [serialize_wish(db, wish, user.id if user else None, language) for wish in my_wishes],
                "incomingRequests": incoming_requests,
                "pendingMatches": pending_outgoing,
                "activeMatches": active_matches,
                "demoAccounts": demo_accounts(),
            }
        )


@app.get("/api/wishes/<int:wish_id>")
def get_wish(wish_id: int):
    language = normalize_language(request.args.get("language", "zh"))
    with db_session() as db:
        user = get_current_user(db)
        wish = db.scalar(
            select(Wish)
            .options(
                selectinload(Wish.owner),
                selectinload(Wish.matches).selectinload(Match.helper),
                selectinload(Wish.matches).selectinload(Match.messages).selectinload(Message.sender),
            )
            .where(Wish.id == wish_id)
        )
        if not wish:
            raise ApiError("Wish not found.", 404)

        payload = serialize_wish(db, wish, user.id if user else None, language, include_requests=True)
        return jsonify({"wish": payload})


@app.post("/api/wishes")
def create_wish():
    user_id = require_auth()
    payload = request.get_json(force=True, silent=True) or {}
    title = (payload.get("title") or "").strip()
    description = (payload.get("description") or "").strip()
    place = (payload.get("place") or "").strip()
    language = normalize_language(payload.get("language", "zh"))
    lat = payload.get("lat")
    lng = payload.get("lng")

    if len(title) < 4:
        raise ApiError("Wish title is too short.")
    if len(description) < 12:
        raise ApiError("Wish description is too short.")
    if not place:
        raise ApiError("Place is required.")

    try:
        lat = float(lat)
        lng = float(lng)
    except Exception as exc:
        raise ApiError("Location coordinates are invalid.") from exc

    with db_session() as db:
        user = db.get(User, user_id)
        stats = compute_user_stats(db, user)
        if stats["availableCredits"] <= 0:
            raise ApiError("You do not have any posting credits right now.", 409)

        wish = Wish(
            owner_id=user_id,
            title=title,
            description=description,
            place=place,
            lat=lat,
            lng=lng,
            original_language=language,
            status="open",
        )
        db.add(wish)
        db.flush()
        db.refresh(wish)
        db.refresh(user)
        wish = db.scalar(select(Wish).options(selectinload(Wish.owner), selectinload(Wish.matches)).where(Wish.id == wish.id))
        return jsonify({"wish": serialize_wish(db, wish, user_id, user.preferred_language)})


@app.patch("/api/wishes/<int:wish_id>")
def update_wish(wish_id: int):
    user_id = require_auth()
    payload = request.get_json(force=True, silent=True) or {}
    title = (payload.get("title") or "").strip()
    description = (payload.get("description") or "").strip()
    place = (payload.get("place") or "").strip()
    language = normalize_language(payload.get("language", "zh"))
    lat = payload.get("lat")
    lng = payload.get("lng")

    if len(title) < 4:
        raise ApiError("Wish title is too short.")
    if len(description) < 12:
        raise ApiError("Wish description is too short.")
    if not place:
        raise ApiError("Place is required.")

    try:
        lat = float(lat)
        lng = float(lng)
    except Exception as exc:
        raise ApiError("Location coordinates are invalid.") from exc

    with db_session() as db:
        wish = db.scalar(select(Wish).options(selectinload(Wish.owner), selectinload(Wish.matches)).where(Wish.id == wish_id))
        if not wish:
            raise ApiError("Wish not found.", 404)
        if wish.owner_id != user_id:
            raise ApiError("Only the wish owner can edit this wish.", 403)
        if wish.status != "open":
            raise ApiError("Only wishes before matching can be edited.", 409)

        wish.title = title
        wish.description = description
        wish.place = place
        wish.lat = lat
        wish.lng = lng
        wish.original_language = language

        return jsonify({"wish": serialize_wish(db, wish, user_id, db.get(User, user_id).preferred_language)})


@app.delete("/api/wishes/<int:wish_id>")
def delete_wish(wish_id: int):
    user_id = require_auth()
    with db_session() as db:
        wish = db.scalar(
            select(Wish)
            .options(selectinload(Wish.matches).selectinload(Match.messages), selectinload(Wish.owner))
            .where(Wish.id == wish_id)
        )
        if not wish:
            raise ApiError("Wish not found.", 404)
        if wish.owner_id != user_id:
            raise ApiError("Only the wish owner can delete this wish.", 403)
        if wish.status != "open":
            raise ApiError("Only wishes before matching can be deleted.", 409)

        for match in wish.matches:
            for message in match.messages:
                db.delete(message)
            db.delete(match)
        db.delete(wish)
        return jsonify({"ok": True})


@app.post("/api/wishes/<int:wish_id>/requests")
def request_help(wish_id: int):
    user_id = require_auth()
    with db_session() as db:
        wish = db.scalar(select(Wish).options(selectinload(Wish.owner), selectinload(Wish.matches)).where(Wish.id == wish_id))
        if not wish:
            raise ApiError("Wish not found.", 404)
        if wish.owner_id == user_id:
            raise ApiError("You cannot help your own wish.")
        if wish.status == "completed":
            raise ApiError("This wish is already completed.", 409)

        existing = db.scalar(
            select(Match).where(
                Match.wish_id == wish_id,
                Match.helper_id == user_id,
                Match.status.not_in(["rejected", "cancelled"]),
            )
        )
        if existing:
            raise ApiError("You already have a request or match for this wish.", 409)

        match = Match(wish_id=wish_id, helper_id=user_id, status="pending")
        db.add(match)
        db.flush()
        language = db.get(User, user_id).preferred_language
        match = db.scalar(
            select(Match)
            .options(selectinload(Match.wish).selectinload(Wish.owner), selectinload(Match.helper), selectinload(Match.messages))
            .where(Match.id == match.id)
        )
        return jsonify({"match": serialize_match(db, match, user_id, language)})


@app.post("/api/matches/<int:match_id>/approve")
def approve_match(match_id: int):
    user_id = require_auth()
    with db_session() as db:
        match = db.scalar(
            select(Match)
            .options(selectinload(Match.wish).selectinload(Wish.matches), selectinload(Match.helper), selectinload(Match.messages))
            .where(Match.id == match_id)
        )
        if not match:
            raise ApiError("Match request not found.", 404)
        if match.wish.owner_id != user_id:
            raise ApiError("Only the wish owner can approve this request.", 403)
        if match.status != "pending":
            raise ApiError("This request is no longer pending.", 409)

        match.status = "matched"
        match.matched_at = utc_now()
        match.wish.status = "matched"

        for other in match.wish.matches:
            if other.id != match.id and other.status == "pending":
                other.status = "rejected"

        language = db.get(User, user_id).preferred_language
        return jsonify({"match": serialize_match(db, match, user_id, language)})


@app.post("/api/matches/<int:match_id>/complete")
def complete_match(match_id: int):
    user_id = require_auth()
    with db_session() as db:
        match = db.scalar(
            select(Match)
            .options(selectinload(Match.wish).selectinload(Wish.owner), selectinload(Match.helper), selectinload(Match.messages))
            .where(Match.id == match_id)
        )
        if not match:
            raise ApiError("Match not found.", 404)
        if user_id != match.wish.owner_id:
            raise ApiError("Only the wish owner can mark this match complete.", 403)
        if match.status != "matched":
            raise ApiError("Only active matches can be completed.", 409)

        match.status = "completed"
        match.completed_at = utc_now()
        match.wish.status = "completed"
        language = db.get(User, user_id).preferred_language
        return jsonify({"match": serialize_match(db, match, user_id, language)})


@app.post("/api/matches/<int:match_id>/unmatch")
def unmatch_match(match_id: int):
    user_id = require_auth()
    with db_session() as db:
        match = db.scalar(
            select(Match)
            .options(selectinload(Match.wish).selectinload(Wish.matches), selectinload(Match.helper), selectinload(Match.messages))
            .where(Match.id == match_id)
        )
        if not match:
            raise ApiError("Match not found.", 404)
        if user_id not in {match.helper_id, match.wish.owner_id}:
            raise ApiError("You are not part of this match.", 403)
        if match.status != "matched":
            raise ApiError("Only active matches can be ended.", 409)

        match.status = "cancelled"
        match.wish.status = "open"
        language = db.get(User, user_id).preferred_language
        return jsonify({"match": serialize_match(db, match, user_id, language)})


@app.get("/api/matches/<int:match_id>/messages")
def get_messages(match_id: int):
    user_id = require_auth()
    language = normalize_language(request.args.get("language", "zh"))
    with db_session() as db:
        match = db.scalar(
            select(Match)
            .options(
                selectinload(Match.wish).selectinload(Wish.owner),
                selectinload(Match.helper),
                selectinload(Match.messages).selectinload(Message.sender),
            )
            .where(Match.id == match_id)
        )
        if not match:
            raise ApiError("Match not found.", 404)
        if user_id not in {match.helper_id, match.wish.owner_id}:
            raise ApiError("You are not part of this match.", 403)

        messages = sorted(match.messages, key=lambda item: item.created_at)
        return jsonify(
            {
                "match": serialize_match(db, match, user_id, language),
                "messages": [serialize_message(db, message, language, user_id) for message in messages],
            }
        )


@app.post("/api/matches/<int:match_id>/messages")
def send_message(match_id: int):
    user_id = require_auth()
    payload = request.get_json(force=True, silent=True) or {}
    body = (payload.get("body") or "").strip()
    language = normalize_language(payload.get("language", "zh"))
    if len(body) < 1:
        raise ApiError("Message cannot be empty.")

    with db_session() as db:
        match = db.scalar(
            select(Match)
            .options(selectinload(Match.wish).selectinload(Wish.owner), selectinload(Match.helper), selectinload(Match.messages))
            .where(Match.id == match_id)
        )
        if not match:
            raise ApiError("Match not found.", 404)
        if match.status not in {"matched", "completed"}:
            raise ApiError("Chat is only available after a match is approved.", 409)
        if user_id not in {match.helper_id, match.wish.owner_id}:
            raise ApiError("You are not part of this chat.", 403)

        message = Message(match_id=match.id, sender_id=user_id, body=body, original_language=language)
        db.add(message)
        db.flush()
        db.refresh(message)
        message = db.scalar(select(Message).options(selectinload(Message.sender)).where(Message.id == message.id))
        return jsonify({"message": serialize_message(db, message, language, user_id)})


@app.get("/api/places/search")
def search_places():
    query = (request.args.get("q") or "").strip()
    language = normalize_language(request.args.get("language", "zh"))
    if len(query) < 2:
        raise ApiError("Please enter a more specific place name.")

    params = urllib.parse.urlencode(
        {
            "q": query,
            "format": "jsonv2",
            "addressdetails": 1,
            "limit": 5,
        }
    )
    payload = geocoder_request(
        f"https://nominatim.openstreetmap.org/search?{params}",
        language,
    )
    results = [serialize_place_result(item) for item in payload if item.get("lat") and item.get("lon")]
    return jsonify({"results": results})


@app.get("/api/places/reverse")
def reverse_place_lookup():
    language = normalize_language(request.args.get("language", "zh"))
    try:
        lat = float(request.args.get("lat", ""))
        lng = float(request.args.get("lng", ""))
    except ValueError as exc:
        raise ApiError("Location coordinates are invalid.") from exc

    params = urllib.parse.urlencode(
        {
            "lat": lat,
            "lon": lng,
            "format": "jsonv2",
            "addressdetails": 1,
            "zoom": 16,
        }
    )
    payload = geocoder_request(
        f"https://nominatim.openstreetmap.org/reverse?{params}",
        language,
    )
    if isinstance(payload, list):
        payload = payload[0] if payload else None
    place = serialize_place_result(payload) if payload and payload.get("lat") and payload.get("lon") else None
    return jsonify({"place": place})


def get_current_user(db: Session) -> User | None:
    user_id = current_user_id()
    return db.get(User, user_id) if user_id else None


def normalize_language(value: str | None) -> str:
    return "en" if value == "en" else "zh"


def serialize_user(user: User | None) -> dict | None:
    if not user:
        return None
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "preferredLanguage": normalize_language(user.preferred_language),
        "avatarDataUrl": user.avatar_data_url,
        "locationLabel": user.location_label,
        "locationLat": user.location_lat,
        "locationLng": user.location_lng,
    }


def serialize_wish(db: Session, wish: Wish, viewer_id: int | None, language: str, include_requests: bool = False) -> dict:
    owner = wish.owner
    translated_title = None
    translated_description = None
    if language != wish.original_language:
        translated_title = translate_text(db, wish.title, wish.original_language, language)
        translated_description = translate_text(db, wish.description, wish.original_language, language)

    relation = "viewer"
    viewer_match = None
    if viewer_id:
        if wish.owner_id == viewer_id:
            relation = "owner"
        else:
            viewer_match = next(
                (
                    match
                    for match in wish.matches
                    if match.helper_id == viewer_id and match.status not in {"rejected", "cancelled"}
                ),
                None,
            )
            if viewer_match:
                relation = "helper"

    active_match = next((match for match in wish.matches if match.status == "matched"), None)
    incoming_requests: list[dict] = []
    if include_requests and viewer_id and wish.owner_id == viewer_id:
        incoming_requests = [
            serialize_match(db, match, viewer_id, language)
            for match in sorted(wish.matches, key=lambda item: item.created_at, reverse=True)
            if match.status == "pending"
        ]

    return {
        "id": wish.id,
        "owner": {"id": owner.id, "name": owner.name},
        "place": wish.place,
        "lat": wish.lat,
        "lng": wish.lng,
        "status": wish.status,
        "createdAt": wish.created_at.isoformat(),
        "sourceLanguage": wish.original_language,
        "sourceLanguageLabel": LANGUAGE_NAMES.get(wish.original_language, wish.original_language),
        "originalTitle": wish.title,
        "originalDescription": wish.description,
        "translatedTitle": translated_title,
        "translatedDescription": translated_description,
        "hasTranslation": bool(translated_title and translated_description),
        "relation": relation,
        "viewerMatchStatus": viewer_match.status if viewer_match else "none",
        "viewerMatchId": viewer_match.id if viewer_match else None,
        "activeMatchId": active_match.id if active_match else None,
        "canRequestHelp": bool(viewer_id and viewer_id != wish.owner_id and wish.status == "open" and not viewer_match),
        "canApproveRequests": bool(viewer_id and viewer_id == wish.owner_id),
        "canManage": bool(viewer_id and viewer_id == wish.owner_id and wish.status == "open"),
        "incomingRequests": incoming_requests,
    }


def serialize_match(db: Session, match: Match, viewer_id: int, language: str) -> dict:
    wish = match.wish
    owner = wish.owner
    helper = match.helper
    latest_message = max(match.messages, key=lambda item: item.created_at, default=None)
    other_user = helper if viewer_id == owner.id else owner
    viewer_role = "owner" if viewer_id == owner.id else "helper"

    latest_preview = None
    if latest_message:
        latest_preview = serialize_message(db, latest_message, language, viewer_id)

    translated_title = None
    if language != wish.original_language:
        translated_title = translate_text(db, wish.title, wish.original_language, language)

    return {
        "id": match.id,
        "status": match.status,
        "viewerRole": viewer_role,
        "otherUser": {"id": other_user.id, "name": other_user.name},
        "wish": {
            "id": wish.id,
            "place": wish.place,
            "status": wish.status,
            "sourceLanguage": wish.original_language,
            "originalTitle": wish.title,
            "translatedTitle": translated_title,
        },
        "latestMessage": latest_preview,
        "createdAt": match.created_at.isoformat(),
    }


def serialize_message(db: Session, message: Message, language: str, viewer_id: int) -> dict:
    translated_body = None
    if language != message.original_language:
        translated_body = translate_text(db, message.body, message.original_language, language)

    return {
        "id": message.id,
        "sender": {"id": message.sender.id, "name": message.sender.name},
        "isMine": message.sender_id == viewer_id,
        "sourceLanguage": message.original_language,
        "originalBody": message.body,
        "translatedBody": translated_body,
        "createdAt": message.created_at.isoformat(),
    }


def compute_user_stats(db: Session, user: User) -> dict:
    completed_help_count = db.scalar(
        select(func.count(Match.id)).where(Match.helper_id == user.id, Match.status == "completed")
    ) or 0
    matched_count = db.scalar(
        select(func.count(Match.id)).where(Match.helper_id == user.id, Match.status == "matched")
    ) or 0
    active_my_wishes = db.scalar(
        select(func.count(Wish.id)).where(Wish.owner_id == user.id, Wish.status != "completed")
    ) or 0
    return {
        "availableCredits": max(0, 3 + completed_help_count - active_my_wishes),
        "completedHelpCount": completed_help_count,
        "matchedCount": matched_count,
    }


def guest_stats(wishes: list[Wish]) -> dict:
    return {
        "availableCredits": 3,
        "completedHelpCount": 0,
        "matchedCount": sum(1 for wish in wishes if wish.status == "matched"),
    }


def can_discover_wish(wish: Wish, viewer_id: int) -> bool:
    if wish.owner_id == viewer_id or wish.status != "open":
        return False
    return not any(match.helper_id == viewer_id and match.status not in {"rejected", "cancelled"} for match in wish.matches)


def geocoder_request(url: str, language: str) -> list[dict] | dict:
    accept_language = "zh-CN,zh;q=0.9,en;q=0.6" if language == "zh" else "en-US,en;q=0.9,zh;q=0.5"
    request_obj = urllib.request.Request(
        url,
        headers={
            "User-Agent": GEOCODER_USER_AGENT,
            "Accept-Language": accept_language,
        },
    )
    try:
        with urllib.request.urlopen(request_obj, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        raise ApiError("Place lookup is unavailable right now.", 502) from exc


def serialize_place_result(item: dict) -> dict:
    address = item.get("address") or {}
    return {
        "label": compose_place_label(address, item.get("display_name", "")),
        "displayName": item.get("display_name", ""),
        "lat": float(item["lat"]),
        "lng": float(item["lon"]),
    }


def compose_place_label(address: dict, fallback: str) -> str:
    parts = []
    primary = fallback.split(",")[0].strip() if fallback else ""
    if primary:
        parts.append(primary)

    for key in (
        "attraction",
        "tourism",
        "amenity",
        "leisure",
        "natural",
        "building",
        "shop",
        "neighbourhood",
        "suburb",
        "city_district",
        "hamlet",
        "village",
        "town",
        "city",
    ):
        value = address.get(key)
        if value and value not in parts:
            parts.append(value)

    for key in ("county", "state", "country"):
        value = address.get(key)
        if value and value not in parts:
            parts.append(value)

    if parts:
        return " · ".join(parts[:3])

    if fallback:
        return " · ".join(part.strip() for part in fallback.split(",")[:3] if part.strip())

    return "Pinned location"


def translate_text(db: Session, text: str, source_language: str, target_language: str) -> str:
    target_language = normalize_language(target_language)
    source_language = normalize_language(source_language)
    if source_language == target_language:
        return text

    text_hash = hashlib.sha256(f"{source_language}:{target_language}:{text}".encode("utf-8")).hexdigest()
    cached = db.scalar(
        select(TranslationCache).where(
            TranslationCache.text_hash == text_hash,
            TranslationCache.source_language == source_language,
            TranslationCache.target_language == target_language,
        )
    )
    if cached:
        return cached.translated_text

    query = urllib.parse.urlencode(
        {
            "client": "gtx",
            "sl": "zh-CN" if source_language == "zh" else "en",
            "tl": "zh-CN" if target_language == "zh" else "en",
            "dt": "t",
            "q": text,
        }
    )
    url = f"https://translate.googleapis.com/translate_a/single?{query}"
    with urllib.request.urlopen(url, timeout=8) as response:
        payload = json.loads(response.read().decode("utf-8"))
    translated = "".join(part[0] for part in payload[0]) if payload and payload[0] else text

    db.add(
        TranslationCache(
            text_hash=text_hash,
            source_language=source_language,
            target_language=target_language,
            translated_text=translated,
        )
    )
    db.flush()
    return translated


def demo_accounts() -> list[dict]:
    return [
        {"email": "voyager@wishorbit.app", "name": "Voyager", "passwordHint": DEMO_PASSWORD},
        {"email": "lina@wishorbit.app", "name": "Lina", "passwordHint": DEMO_PASSWORD},
        {"email": "mateo@wishorbit.app", "name": "Mateo", "passwordHint": DEMO_PASSWORD},
        {"email": "elsa@wishorbit.app", "name": "Elsa", "passwordHint": DEMO_PASSWORD},
        {"email": "nora@wishorbit.app", "name": "Nora", "passwordHint": DEMO_PASSWORD},
        {"email": "youssef@wishorbit.app", "name": "Youssef", "passwordHint": DEMO_PASSWORD},
    ]


def create_seed_data(db: Session):
    if db.scalar(select(func.count(User.id))):
        return

    users = {}
    for name, email, preferred_language in [
        ("Voyager", "voyager@wishorbit.app", "zh"),
        ("Lina", "lina@wishorbit.app", "en"),
        ("Mateo", "mateo@wishorbit.app", "en"),
        ("Elsa", "elsa@wishorbit.app", "en"),
        ("Nora", "nora@wishorbit.app", "en"),
        ("Youssef", "youssef@wishorbit.app", "en"),
    ]:
        user = User(
            name=name,
            email=email,
            password_hash=generate_password_hash(DEMO_PASSWORD),
            preferred_language=preferred_language,
        )
        db.add(user)
        db.flush()
        users[email] = user

    wishes = {}
    for email, title, description, place, lat, lng, language, status in [
        (
            "lina@wishorbit.app",
            "想在京都拍一组春日写真",
            "希望有人愿意帮我做半天向导，带我找到安静又不游客化的樱花小路。",
            "Kyoto, Japan",
            35.0116,
            135.7681,
            "zh",
            "matched",
        ),
        (
            "mateo@wishorbit.app",
            "想在利马画一面社区壁画",
            "需要一个懂颜料和社区沟通的人，一起把学校外墙变成大家都愿意停下来的地方。",
            "Lima, Peru",
            -12.0464,
            -77.0428,
            "zh",
            "open",
        ),
        (
            "elsa@wishorbit.app",
            "想在雷克雅未克借一架钢琴练一天",
            "如果你知道哪家咖啡馆或工作室愿意借琴，我想用一整天录一段属于冰岛的旋律。",
            "Reykjavik, Iceland",
            64.1466,
            -21.9426,
            "zh",
            "open",
        ),
        (
            "nora@wishorbit.app",
            "想在温哥华租一小块共享菜地",
            "如果你知道社区花园怎么申请，愿意带我去看看现场，我就能把这个愿望开始起来。",
            "Vancouver, Canada",
            49.2827,
            -123.1207,
            "zh",
            "completed",
        ),
        (
            "youssef@wishorbit.app",
            "想找到开罗老城区的阿拉伯语会话搭子",
            "我想每周两次在咖啡馆练口语，只要有人愿意陪我从最简单的话题开始就够了。",
            "Cairo, Egypt",
            30.0444,
            31.2357,
            "zh",
            "open",
        ),
        (
            "voyager@wishorbit.app",
            "想在首尔做一次深夜摄影散步",
            "如果你熟悉延南洞和圣水一带，愿意带我走一条适合夜拍的人行路线，我想拍一组有电影感的城市照片。",
            "Seoul, South Korea",
            37.5665,
            126.978,
            "zh",
            "open",
        ),
    ]:
        wish = Wish(
            owner_id=users[email].id,
            title=title,
            description=description,
            place=place,
            lat=lat,
            lng=lng,
            original_language=language,
            status=status,
        )
        db.add(wish)
        db.flush()
        wishes[title] = wish

    voyager = users["voyager@wishorbit.app"]
    lina = users["lina@wishorbit.app"]
    mateo = users["mateo@wishorbit.app"]
    elsa = users["elsa@wishorbit.app"]

    matched = Match(
        wish_id=wishes["想在京都拍一组春日写真"].id,
        helper_id=voyager.id,
        status="matched",
        matched_at=utc_now(),
    )
    pending_outgoing = Match(
        wish_id=wishes["想在利马画一面社区壁画"].id,
        helper_id=voyager.id,
        status="pending",
    )
    completed = Match(
        wish_id=wishes["想在温哥华租一小块共享菜地"].id,
        helper_id=voyager.id,
        status="completed",
        matched_at=utc_now(),
        completed_at=utc_now(),
    )
    incoming = Match(
        wish_id=wishes["想在首尔做一次深夜摄影散步"].id,
        helper_id=elsa.id,
        status="pending",
    )
    db.add_all([matched, pending_outgoing, completed, incoming])
    db.flush()

    db.add_all(
        [
            Message(
                match_id=matched.id,
                sender_id=lina.id,
                body="我周六上午有空，可以从哲学之道开始，那里人会少一点。",
                original_language="zh",
            ),
            Message(
                match_id=matched.id,
                sender_id=voyager.id,
                body="太好了，我会带上胶片相机和一件浅色外套。",
                original_language="zh",
            ),
        ]
    )


def init_database():
    Base.metadata.create_all(engine)
    ensure_user_profile_columns()
    with db_session() as db:
        create_seed_data(db)


def ensure_user_profile_columns():
    with engine.begin() as connection:
        existing_columns = {row[1] for row in connection.exec_driver_sql("PRAGMA table_info(users)")}
        if "avatar_data_url" not in existing_columns:
            connection.exec_driver_sql("ALTER TABLE users ADD COLUMN avatar_data_url TEXT")
        if "location_label" not in existing_columns:
            connection.exec_driver_sql("ALTER TABLE users ADD COLUMN location_label VARCHAR(180)")
        if "location_lat" not in existing_columns:
            connection.exec_driver_sql("ALTER TABLE users ADD COLUMN location_lat FLOAT")
        if "location_lng" not in existing_columns:
            connection.exec_driver_sql("ALTER TABLE users ADD COLUMN location_lng FLOAT")


init_database()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
