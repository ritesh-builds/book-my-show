# Shared Agent Rules

All agents must strictly comply with this document and [guardrails.md](guardrails.md).

## Communication Rules
- Chat replies: Hinglish (Hindi + English mix).
- Repository content: 100% English.
- No over-explaining. Direct answers only.
- Simple words. Avoid heavy jargon.
- No long paragraphs. Use short sentences and proper spacing.
- Bullet points and tables preferred.
- No em-dashes. Use a comma or a period instead.

## Mandatory Guardrails Summary
- No command execution without explicit user permission.
- Absolute ban on Git commands (`git add`, `git commit`, `git push`, etc.).
- Never execute destructive database operations (`DROP`, `DELETE`, `TRUNCATE`).
- Strict zero file deletion policy (`rm`, `del` forbidden).
- Operations strictly confined inside the project directory.
- Always provide plan first, wait for user's explicit "Go" before creation.
- Check [.agents/hooks.json](../hooks.json) for hook interceptor rules.

## Domain Focus
- System Design for BookMyShow.
- Low-Level Design (LLD): OOP models, seat concurrency locks, state machines.
- High-Level Design (HLD): Microservices, caching, scale, resilience.
