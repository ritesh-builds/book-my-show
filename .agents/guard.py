"""
guard.py - Unified Fail-Closed Security Guardrail Interceptor

Enforces project guardrails across all AI agents and tools.
Default behavior: Fail-closed. If evaluation fails or crashes, block the operation.
"""

import sys
import os
import re
import datetime
from pathlib import Path

# Paths
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
AGENTS_DIR = WORKSPACE_ROOT / ".agents"
AUDIT_LOG_FILE = AGENTS_DIR / "audit.log"
APPROVED_LOCK_FILE = AGENTS_DIR / "APPROVED"
ALLOW_NET_FILE = AGENTS_DIR / "ALLOW_NET"

# Git allowlist (Read-only commands allowed, state-changing blocked)
GIT_READONLY_ALLOWLIST = {
    "status", "diff", "log", "branch", "show", "tag", "remote"
}

GIT_HARD_BLOCKED = {
    "commit", "push", "add", "rm", "reset", "rebase", "merge", "cherry-pick", "checkout -b"
}

# Destructive Database patterns
DB_DESTRUCTIVE_PATTERNS = [
    re.compile(r"\bdrop\s+(database|table|view|index|schema)\b", re.IGNORECASE),
    re.compile(r"\bdelete\s+from\b", re.IGNORECASE),
    re.compile(r"\btruncate\s+(table)?\b", re.IGNORECASE),
    re.compile(r"\balter\s+table\s+.*drop\s+(column|constraint)\b", re.IGNORECASE),
    re.compile(r"\.delete\s*\(", re.IGNORECASE),
    re.compile(r"\.destroy\s*\(", re.IGNORECASE),
]

# Sensitive files patterns
SENSITIVE_FILE_PATTERNS = [
    re.compile(r"(^|[/\\])\.env(\..+)?$", re.IGNORECASE),
    re.compile(r".*\.(pem|key|p12|pkcs12)$", re.IGNORECASE),
    re.compile(r".*credentials(\.json|\.yml|\.yaml|\.xml)?$", re.IGNORECASE),
    re.compile(r".*id_rsa.*", re.IGNORECASE),
]

# Dangerous shell commands
DANGEROUS_SHELL_PATTERNS = [
    re.compile(r"\b(rm|del|Remove-Item|unlink)\b", re.IGNORECASE),
    re.compile(r"\b(kill|pkill|taskkill)\b", re.IGNORECASE),
    re.compile(r"\b(sudo|runas|chmod\s+-R|chown\s+-R)\b", re.IGNORECASE),
    re.compile(r"\|\s*(sh|bash|powershell|cmd)\b", re.IGNORECASE),
    re.compile(r"\b(docker\s+exec|kubectl\s+exec)\b", re.IGNORECASE),
]

# Network patterns
NETWORK_COMMAND_PATTERNS = [
    re.compile(r"\b(curl|wget|Invoke-WebRequest|Invoke-RestMethod)\b", re.IGNORECASE),
    re.compile(r"\b(nc|ncat|netcat|telnet|ssh|scp)\b", re.IGNORECASE),
]


def log_audit(action_type: str, status: str, details: str, agent: str = "AGENT") -> None:
    """Log an audit entry to .agents/audit.log."""
    try:
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        entry = f"[{now}] [{agent}] [{action_type}] [{status}] {details}\n"
        with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(entry)
    except Exception as e:
        # Failsafe: print to stderr if file logging fails
        sys.stderr.write(f"Guard logging failure: {e}\n")


def check_consent_lock() -> tuple[bool, str]:
    """Check if the human user has placed .agents/APPROVED."""
    if not APPROVED_LOCK_FILE.exists():
        return False, "Consent lock active: '.agents/APPROVED' file is missing. User approval required."
    return True, "Consent verified via .agents/APPROVED."


def check_network_permission() -> tuple[bool, str]:
    """Check if network calls are temporarily allowed via .agents/ALLOW_NET."""
    if not ALLOW_NET_FILE.exists():
        return False, "Network calls blocked: '.agents/ALLOW_NET' file not present."
    
    # Check expiry if timestamp is stored in ALLOW_NET
    try:
        content = ALLOW_NET_FILE.read_text(encoding="utf-8").strip()
        if content:
            expires_at = float(content)
            now = datetime.datetime.now().timestamp()
            if now > expires_at:
                return False, f"Network allowance expired at {datetime.datetime.fromtimestamp(expires_at)}."
    except Exception:
        pass
    
    return True, "Network call permitted by .agents/ALLOW_NET."


def inspect_git_command(command: str) -> tuple[bool, str]:
    """Verify Git commands against strict allowlist."""
    clean_cmd = command.strip()
    match = re.match(r"^git\s+([a-zA-Z0-9_-]+)", clean_cmd, re.IGNORECASE)
    if not match:
        return True, "Not a git command."

    subcommand = match.group(1).lower()

    if subcommand in GIT_HARD_BLOCKED:
        return False, f"Git '{subcommand}' is strictly forbidden for agents. Human user must execute."

    if subcommand in GIT_READONLY_ALLOWLIST:
        return True, f"Git read-only subcommand '{subcommand}' allowed."

    return False, f"Git subcommand '{subcommand}' not in read-only allowlist."


def inspect_database_query(query: str) -> tuple[bool, str]:
    """Verify SQL or ORM query against destructive patterns."""
    for pattern in DB_DESTRUCTIVE_PATTERNS:
        if pattern.search(query):
            return False, f"Destructive database operation matched forbidden pattern: '{pattern.pattern}'."
    return True, "Database query safe."


def inspect_file_access(file_path: str) -> tuple[bool, str]:
    """Check if file path is sensitive or outside workspace."""
    clean_path = str(Path(file_path).resolve())
    workspace_str = str(WORKSPACE_ROOT.resolve())

    # Boundary check
    if not clean_path.startswith(workspace_str):
        return False, f"Path '{clean_path}' violates workspace boundary: outside project root."

    # Sensitive files check
    for pattern in SENSITIVE_FILE_PATTERNS:
        if pattern.search(file_path):
            return False, f"Access to sensitive file '{file_path}' is strictly blocked."

    return True, "File access allowed."


def inspect_command(command: str, requires_consent: bool = False) -> tuple[bool, str]:
    """
    Comprehensive command inspector.
    Returns (True, reason) if allowed, (False, reason) if blocked.
    """
    try:
        # 1. Shell Dangerous Commands
        for pattern in DANGEROUS_SHELL_PATTERNS:
            if pattern.search(command):
                return False, f"Blocked dangerous shell pattern: '{pattern.pattern}' in command."

        # 2. Git inspection
        if re.search(r"\bgit\s+", command):
            git_ok, git_reason = inspect_git_command(command)
            if not git_ok:
                return False, git_reason

        # 3. Database destructive commands in shell (e.g. psql, mysql -e "DROP...")
        db_ok, db_reason = inspect_database_query(command)
        if not db_ok:
            return False, db_reason

        # 4. Network calls
        for net_pattern in NETWORK_COMMAND_PATTERNS:
            if net_pattern.search(command):
                net_ok, net_reason = check_network_permission()
                if not net_ok:
                    return False, net_reason

        # 5. Sensitive file references in command
        for sens_pattern in SENSITIVE_FILE_PATTERNS:
            if sens_pattern.search(command):
                return False, f"Command contains reference to sensitive file matching '{sens_pattern.pattern}'."

        # 6. Consent check for critical actions
        if requires_consent:
            consent_ok, consent_reason = check_consent_lock()
            if not consent_ok:
                return False, consent_reason

        return True, "Command passed all guardrail checks."

    except Exception as e:
        # FAIL-CLOSED: if guard fails, block by default
        return False, f"Fail-closed interceptor error: {e}"


def evaluate_and_enforce(command: str, requires_consent: bool = False) -> bool:
    """Main entrypoint for evaluating a command and logging result."""
    allowed, reason = inspect_command(command, requires_consent=requires_consent)
    if allowed:
        log_audit("COMMAND_INSPECT", "ALLOWED", f"Command: '{command}' | Reason: {reason}")
        return True
    else:
        log_audit("COMMAND_BLOCK", "BLOCKED", f"Command: '{command}' | Reason: {reason}")
        sys.stderr.write(f"\n[GUARDRAIL BLOCKED] {reason}\n")
        return False


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python guard.py \"<command>\" [--require-consent]")
        sys.exit(1)

    cmd = sys.argv[1]
    require_consent_flag = "--require-consent" in sys.argv

    is_safe = evaluate_and_enforce(cmd, requires_consent=require_consent_flag)
    sys.exit(0 if is_safe else 1)
