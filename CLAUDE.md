# Project Guidelines, Rules & Guardrails

All agents, subagents, and tools must follow the rules in [.agents/rules/general-rules.md](.agents/rules/general-rules.md) and [.agents/rules/guardrails.md](.agents/rules/guardrails.md).

## Critical Guardrails
1. No command or script execution without explicit permission.
2. Zero Git commands allowed (`git add`, `git commit`, `git push`, etc. are forbidden).
3. No destructive database commands (`DROP`, `DELETE`, `TRUNCATE`).
4. Strict zero file deletion policy.
5. Workspace boundary enforced. Stay strictly inside project root.
6. Present plan first; wait for user's explicit "Go" before creating or executing.
7. Secrets protection: Never read or inspect `.env`, `.pem`, `.key`, or credentials.
8. Process protection: Never execute `kill`, `pkill`, or restart commands.
9. Package installations (`npm install`, `pip install`) require explicit permission.
10. Shell safety: Block `curl | sh`, `sudo`, `chmod -R`.
11. Network calls: Require explicit permission for `curl`, `wget`.
12. Container isolation: Block `docker exec`, DB touches via containers.
13. Universal hooks active via [.agents/hooks.json](.agents/hooks.json).
14. Audit logging active via [.agents/audit.log](.agents/audit.log).

## Communication Rules
- Hinglish in chat replies.
- 100% English in repo files, code, and comments.
- No over-explaining. Keep answers crisp and simple.
- Short paragraphs, proper line spacing, bullet points, tables.
- No em-dashes. Use a comma or a period instead.

## Project Scope: BookMyShow System Design
- Low-Level Design (LLD): Object-oriented models, design patterns, seat locking mechanism.
- High-Level Design (HLD): Microservices architecture, caching, database choices, message queues.
- Concurrency Handling: Distributed locks, Redis TTL, database isolation levels.
