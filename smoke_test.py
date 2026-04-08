from __future__ import annotations

import os
import tempfile
import unittest
from importlib import import_module


class WishOrbitSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tempdir = tempfile.TemporaryDirectory()
        os.environ["DATABASE_URL"] = f"sqlite:///{os.path.join(cls.tempdir.name, 'smoke.db')}"
        os.environ["SECRET_KEY"] = "smoke-test-secret"
        cls.server = import_module("server")
        cls.server.translate_text = lambda db, text, source_language, target_language: f"[{target_language}] {text}"
        cls.server.geocoder_request = lambda url, language: [
            {
                "display_name": "Xuanwu Lake, Nanjing, Jiangsu, China",
                "lat": "32.077",
                "lon": "118.792",
                "address": {
                    "attraction": "Xuanwu Lake",
                    "city": "Nanjing",
                    "state": "Jiangsu",
                    "country": "China",
                },
            }
        ]

    @classmethod
    def tearDownClass(cls):
        cls.tempdir.cleanup()

    def login(self, email: str, password: str = "demo123"):
        response = self.client.post(
            "/api/auth/login",
            json={"email": email, "password": password},
        )
        self.assertEqual(response.status_code, 200, response.get_data(as_text=True))
        return response.get_json()

    def logout(self):
        response = self.client.post("/api/auth/logout")
        self.assertEqual(response.status_code, 200)

    def test_full_core_flow(self):
        with self.server.app.test_client() as client:
            self.client = client

            root = self.client.get("/")
            self.assertEqual(root.status_code, 200)
            health = self.client.get("/healthz")
            self.assertEqual(health.status_code, 200)
            self.assertTrue(health.get_json()["ok"])

            session_payload = self.client.get("/api/session?language=zh").get_json()
            self.assertIsNone(session_payload["currentUser"])

            bootstrap = self.client.get("/api/bootstrap?language=zh")
            self.assertEqual(bootstrap.status_code, 200)
            demo_accounts = bootstrap.get_json()["demoAccounts"]
            self.assertGreaterEqual(len(demo_accounts), 6)

            self.login("voyager@wishorbit.app")

            create_response = self.client.post(
                "/api/wishes",
                json={
                    "title": "想在南京找人一起晨跑",
                    "description": "希望能找到一个熟悉玄武湖路线的人，一起约个清晨慢跑然后喝咖啡。",
                    "place": "南京 · 玄武湖",
                    "lat": 32.077,
                    "lng": 118.792,
                    "language": "zh",
                },
            )
            self.assertEqual(create_response.status_code, 200, create_response.get_data(as_text=True))
            created_wish = create_response.get_json()["wish"]

            detail_response = self.client.get(f"/api/wishes/{created_wish['id']}?language=zh")
            self.assertEqual(detail_response.status_code, 200)

            update_response = self.client.patch(
                f"/api/wishes/{created_wish['id']}",
                json={
                    "title": "想在南京找人一起晨跑和喝咖啡",
                    "description": "希望能找到一个熟悉玄武湖路线的人，一起约个清晨慢跑，然后在湖边喝咖啡聊聊天。",
                    "place": "南京 · 玄武湖",
                    "lat": 32.078,
                    "lng": 118.793,
                    "language": "zh",
                },
            )
            self.assertEqual(update_response.status_code, 200, update_response.get_data(as_text=True))

            delete_response = self.client.delete(f"/api/wishes/{created_wish['id']}")
            self.assertEqual(delete_response.status_code, 200, delete_response.get_data(as_text=True))

            place_search = self.client.get("/api/places/search?q=%E5%8D%97%E4%BA%AC&language=zh")
            self.assertEqual(place_search.status_code, 200)
            self.assertTrue(place_search.get_json()["results"])

            reverse = self.client.get("/api/places/reverse?lat=32.077&lng=118.792&language=zh")
            self.assertEqual(reverse.status_code, 200)
            self.assertIsNotNone(reverse.get_json()["place"])

            self.logout()
            self.login("nora@wishorbit.app")
            request_response = self.client.post("/api/wishes/6/requests")
            self.assertEqual(request_response.status_code, 200, request_response.get_data(as_text=True))
            match_id = request_response.get_json()["match"]["id"]

            self.logout()
            self.login("voyager@wishorbit.app")
            approve_response = self.client.post(f"/api/matches/{match_id}/approve")
            self.assertEqual(approve_response.status_code, 200, approve_response.get_data(as_text=True))

            message_response = self.client.post(
                f"/api/matches/{match_id}/messages",
                json={"body": "欢迎，一起把这件事真的做起来吧。", "language": "zh"},
            )
            self.assertEqual(message_response.status_code, 200, message_response.get_data(as_text=True))

            thread_response = self.client.get(f"/api/matches/{match_id}/messages?language=zh")
            self.assertEqual(thread_response.status_code, 200)
            self.assertGreaterEqual(len(thread_response.get_json()["messages"]), 1)

            complete_response = self.client.post(f"/api/matches/{match_id}/complete")
            self.assertEqual(complete_response.status_code, 200, complete_response.get_data(as_text=True))

            post_complete_message = self.client.post(
                f"/api/matches/{match_id}/messages",
                json={"body": "完成后也继续保持联系。", "language": "zh"},
            )
            self.assertEqual(post_complete_message.status_code, 200, post_complete_message.get_data(as_text=True))

            profile_response = self.client.patch(
                "/api/profile",
                json={
                    "name": "Voyager Updated",
                    "preferredLanguage": "en",
                    "locationLabel": "Princeton, New Jersey",
                    "locationLat": 40.3573,
                    "locationLng": -74.6672,
                    "avatarDataUrl": "",
                },
            )
            self.assertEqual(profile_response.status_code, 200, profile_response.get_data(as_text=True))
            self.assertEqual(profile_response.get_json()["currentUser"]["name"], "Voyager Updated")


if __name__ == "__main__":
    unittest.main()
