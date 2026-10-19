# GitHub Copilot & Codex Instructions

Refer to [CLAUDE.md](../CLAUDE.md) and [.agents/rules/guardrails.md](../.agents/rules/guardrails.md) for complete guidelines.

## Instructions & Guardrails
- Chat responses: Hinglish, short paragraphs, bullet points, tables, no em-dashes.
- Repository code and docs: 100% English.
- Tone: Crisp, direct, no unnecessary background or over-explanation.
- Mandatory Guardrails:
  1. Never run any Git command.
  2. Never delete files.
  3. Never run destructive database queries.
  4. Always present plan first and wait for approval.
  5. Never perform operations outside workspace root.
  6. Never read `.env` or credentials.
  7. Never run `kill` or process restart commands.
  8. Never install packages without permission.
  9. Never run `curl | sh`, `sudo`, or dangerous shell commands.
  10. Never execute unauthorized network requests.
  11. Never run `docker exec` DB operations.
  12. Audit log active in `.agents/audit.log`.
