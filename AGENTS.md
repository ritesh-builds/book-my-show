# Universal Agent Rules

All agents follow shared rules and strict guardrails configured in [.agents/](.agents/).

## References
- General Rules: [.agents/rules/general-rules.md](.agents/rules/general-rules.md)
- Security Guardrails: [.agents/rules/guardrails.md](.agents/rules/guardrails.md)
- Interceptor Hooks: [.agents/hooks.json](.agents/hooks.json)
- Audit Log: [.agents/audit.log](.agents/audit.log)

## Quick Summary
- Chat responses: Hinglish, short paragraphs, bullet points, tables, no em-dashes.
- Code and documentation: 100% English.
- Execution: Always require plan first and explicit "Go".
- Restrictions: Zero Git commands, zero file deletions, zero destructive DB operations, zero secrets reading, zero unapproved package installs, zero kill commands.
