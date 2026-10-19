# Agents Configuration Directory

This directory contains shared rules, skills, and configuration for all AI assistants.

## Structure
- `rules/`: Modular rule files applied automatically.
  - `general-rules.md`: Tone, style, language, and project guidelines.
- `skills/`: Custom workflows and skill definitions.
- `hooks.json`: Lifecycle hooks for agent workflows.

## Compatibility
All agents (Antigravity, Cursor, Claude Code, GitHub Copilot, Windsurf) reference or read from this folder.
