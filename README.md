# Wish Orbit

Wish Orbit is a full-stack web app where people post wishes on a globe, get matched with helpers, and move wishes forward through chat.

## What Works

- account registration and sign-in
- globe homepage with live wishes
- posting, editing, and deleting wishes before matching
- precise place search and map pinning in the composer
- incoming help requests and approval flow
- chat after matching
- completion and unmatch flows
- profile editing with avatar upload and local-location fill
- SQLite-backed persistence for users, wishes, matches, and messages
- backend-powered translation caching for wishes and chat

## Local Development

Install dependencies:

```bash
pip install -r requirements.txt
```

Run locally:

```bash
FLASK_DEBUG=1 python3 server.py
```

Then open:

- [http://localhost:5000](http://localhost:5000)

If port `5000` is already in use:

```bash
PORT=5010 FLASK_DEBUG=1 python3 server.py
```

## Production Run

This repo now includes a production WSGI entrypoint:

- [wsgi.py](/Users/haojiang/Documents/dream-share/wsgi.py)
- [Procfile](/Users/haojiang/Documents/dream-share/Procfile)
- [Dockerfile](/Users/haojiang/Documents/dream-share/Dockerfile)
- [render.yaml](/Users/haojiang/Documents/dream-share/render.yaml)

Run with Gunicorn:

```bash
gunicorn wsgi:application
```

Common production env vars:

- `SECRET_KEY`
- `PORT`
- `DATABASE_URL`
- `SESSION_COOKIE_SECURE=true`

`DATABASE_URL` now supports:

- local SQLite
- `postgres://...`
- `postgresql://...`

The app normalizes PostgreSQL URLs automatically for SQLAlchemy / psycopg.

Health check endpoint:

- `GET /healthz`

## Public Deployment

If you want a real public URL that other people can open, the fastest path is a Python host with managed PostgreSQL.

Recommended path for a free internal test:

1. push this repo to GitHub
2. create a Render account
3. create a new Blueprint deploy from this repo
4. Render will read [render.yaml](/Users/haojiang/Documents/dream-share/render.yaml), create:
   - one web service
   - one PostgreSQL database
5. after deploy finishes, you'll get a public `onrender.com` URL

For this repo's current `render.yaml`, the Render Blueprint is configured for a free internal-test deployment.

Free-tier caveats:

- the web service can spin down after inactivity
- free resources are suitable for demos and internal testing, not stable production use
- if you later want a real public product, switch the web service and database to paid plans

If you prefer Docker-based hosting, this repo can also be deployed with:

- Railway
- Fly.io
- Render Docker service
- any VPS that can run `gunicorn`

## Smoke Test

There is now a backend smoke test that validates the main product flow on a temporary database:

```bash
python3 smoke_test.py
```

It covers:

- homepage and health endpoint
- session bootstrap
- demo login
- create, edit, detail, and delete wish
- place search and reverse lookup
- request help, approve match, send chat, complete match
- sending chat after completion
- profile update

## Demo Accounts

Seed data is created automatically on first run.

- `voyager@wishorbit.app` / `demo123`
- `lina@wishorbit.app` / `demo123`
- `mateo@wishorbit.app` / `demo123`
- `elsa@wishorbit.app` / `demo123`
- `nora@wishorbit.app` / `demo123`
- `youssef@wishorbit.app` / `demo123`

## Stack

- Flask
- SQLAlchemy
- SQLite
- Vanilla JS
- MapLibre GL JS

## Current Limitations

- Translation still uses the public Google Translate endpoint and local caching. For a real launch, replace this with a supported paid provider or a controlled backend proxy.
- Chat uses polling instead of websockets or SSE.
- SQLite is fine for MVP deployment and demos, but PostgreSQL would be a better production default for multi-user traffic.
