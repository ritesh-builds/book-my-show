"""
test_guard.py - Test Suite for Guardrail Engine (.agents/guard.py)

Validates that all security guardrails and fail-closed policies work accurately.
"""

import unittest
import os
import time
from pathlib import Path

from guard import (
    inspect_command,
    inspect_git_command,
    inspect_database_query,
    inspect_file_access,
    APPROVED_LOCK_FILE,
    ALLOW_NET_FILE,
    WORKSPACE_ROOT
)


class TestGuardrails(unittest.TestCase):

    def setUp(self):
        # Clean up temporary test flags if present
        if APPROVED_LOCK_FILE.exists():
            APPROVED_LOCK_FILE.unlink()
        if ALLOW_NET_FILE.exists():
            ALLOW_NET_FILE.unlink()

    def tearDown(self):
        if APPROVED_LOCK_FILE.exists():
            APPROVED_LOCK_FILE.unlink()
        if ALLOW_NET_FILE.exists():
            ALLOW_NET_FILE.unlink()

    # --- 1. Git Tests ---
    def test_git_push_is_blocked(self):
        ok, reason = inspect_git_command("git push origin main")
        self.assertFalse(ok)
        self.assertIn("strictly forbidden", reason)

    def test_git_commit_is_blocked(self):
        ok, reason = inspect_git_command("git commit -m 'Initial commit'")
        self.assertFalse(ok)
        self.assertIn("strictly forbidden", reason)

    def test_git_add_is_blocked(self):
        ok, reason = inspect_git_command("git add .")
        self.assertFalse(ok)
        self.assertIn("strictly forbidden", reason)

    def test_git_status_is_allowed(self):
        ok, reason = inspect_git_command("git status")
        self.assertTrue(ok)

    def test_git_log_is_allowed(self):
        ok, reason = inspect_git_command("git log -n 5")
        self.assertTrue(ok)

    # --- 2. Database Tests ---
    def test_db_drop_table_is_blocked(self):
        ok, _ = inspect_database_query("DROP TABLE users CASCADE;")
        self.assertFalse(ok)

    def test_db_delete_from_is_blocked(self):
        ok, _ = inspect_database_query("DELETE FROM bookings WHERE id = 1;")
        self.assertFalse(ok)

    def test_db_truncate_is_blocked(self):
        ok, _ = inspect_database_query("TRUNCATE TABLE seats;")
        self.assertFalse(ok)

    def test_db_select_query_is_allowed(self):
        ok, _ = inspect_database_query("SELECT id, name FROM movies WHERE active = true;")
        self.assertTrue(ok)

    # --- 3. Shell Dangerous Commands Tests ---
    def test_file_deletion_rm_is_blocked(self):
        ok, _ = inspect_command("rm -rf src/old_code")
        self.assertFalse(ok)

    def test_file_deletion_powershell_del_is_blocked(self):
        ok, _ = inspect_command("del app.log")
        self.assertFalse(ok)

    def test_kill_process_is_blocked(self):
        ok, _ = inspect_command("kill -9 1234")
        self.assertFalse(ok)

    def test_sudo_is_blocked(self):
        ok, _ = inspect_command("sudo systemctl restart nginx")
        self.assertFalse(ok)

    # --- 4. Sensitive Files Tests ---
    def test_env_file_inspection_is_blocked(self):
        ok, _ = inspect_file_access(str(WORKSPACE_ROOT / ".env"))
        self.assertFalse(ok)

    def test_pem_file_inspection_is_blocked(self):
        ok, _ = inspect_file_access(str(WORKSPACE_ROOT / "id_rsa.pem"))
        self.assertFalse(ok)

    def test_readme_file_inspection_is_allowed(self):
        ok, _ = inspect_file_access(str(WORKSPACE_ROOT / "README.md"))
        self.assertTrue(ok)

    # --- 5. Network Gate Tests ---
    def test_network_curl_is_blocked_by_default(self):
        ok, reason = inspect_command("curl -X GET https://api.example.com/data")
        self.assertFalse(ok)
        self.assertIn("ALLOW_NET", reason)

    def test_network_curl_is_allowed_with_allow_net_file(self):
        # Create temporary ALLOW_NET with future timestamp
        ALLOW_NET_FILE.write_text(str(time.time() + 300), encoding="utf-8")
        ok, _ = inspect_command("curl -X GET https://api.example.com/data")
        self.assertTrue(ok)

    # --- 6. Consent Lock Tests (.agents/APPROVED) ---
    def test_consent_lock_blocks_when_approved_file_missing(self):
        ok, reason = inspect_command("python deploy.py", requires_consent=True)
        self.assertFalse(ok)
        self.assertIn("Consent lock active", reason)

    def test_consent_lock_passes_when_approved_file_present(self):
        APPROVED_LOCK_FILE.write_text("APPROVED BY USER", encoding="utf-8")
        ok, _ = inspect_command("python deploy.py", requires_consent=True)
        self.assertTrue(ok)


if __name__ == "__main__":
    unittest.main(verbosity=2)
