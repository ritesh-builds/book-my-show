# Strict Security and Operational Guardrails

All agents, subagents, and tools MUST strictly follow these mandatory guardrails without exception.

## 1. Explicit Permission Before Execution
- No command, script, or code execution is permitted without prior human approval.
- Always present the exact command or action first and wait for approval.

## 2. Absolute Ban on Git Commands
- Agents and subagents are strictly prohibited from executing Git commands.
- Do not run `git add`, `git commit`, `git push`, `git rebase`, `git reset`, or any repo-level git commands.
- Only the human user is allowed to manage Git and version control.
- If any subagent attempts to execute a Git command, terminate and block the operation immediately.

## 3. Database Protection
- No destructive database operations are allowed (`DROP`, `DELETE`, `TRUNCATE`, `ALTER TABLE ... DROP`).
- Direct database connections and mutations are forbidden without explicit instruction and approval.
- All schema or data modifications must be proposed as reviewable migration scripts in files only.

## 4. Zero File Deletion Policy
- Deleting files or directories is completely forbidden.
- Never execute commands like `rm`, `del`, `Remove-Item`, `unlink`, or delete file tools.
- If a file is no longer needed, mark it as deprecated in documentation, but do not delete it.

## 5. Strict Workspace Boundary
- Operations are strictly confined to the project directory: `c:\Programming\System Design\book-my-show\`.
- Never read, write, scan, or modify files outside this workspace root.
- If external tools, libraries, or paths are needed, prompt the human user first.

## 6. Plan Approval Before Creation ("Plan First, Go Second")
- Before creating new modules, architectures, or significant files, present a clear step-by-step plan.
- Wait for the user to explicitly say "Go" or provide approval before proceeding with execution.

## 7. Secrets and Environment Protection
- Never read, display, or inspect `.env`, `.env.*`, `.pem`, `.key`, or credentials files.
- Secrets must never be logged or echoed in shell outputs.

## 8. Process Termination Restrictions
- Never execute process termination commands such as `kill`, `pkill`, `taskkill`, or system restart commands.

## 9. Supply Chain and Package Installation Gate
- Package installations (`npm install`, `yarn add`, `pip install`, `composer require`) require explicit user confirmation.
- Supply chain security: Never run automated background package installations.

## 10. Dangerous Shell Pattern Restrictions
- Disallow piped remote scripts: `curl ... | sh`, `wget ... | bash`.
- Disallow privileged commands: `sudo`, `runas`, `chmod -R 777`, `chown -R`.

## 11. Network Call Gate
- External network requests via `curl`, `wget`, `Invoke-WebRequest`, or HTTP clients require user permission.

## 12. Container and Docker Restrictions
- Direct container mutation commands like `docker exec` or `kubectl exec` into databases or services are blocked.

## 13. Multi-Agent & Codex Hook Interception
- All subagents, Codex routines, and Antigravity subtasks must load and execute under these exact constraints.

## 14. Audit Logging
- Every blocked attempt or security violation is logged to `.agents/audit.log` with timestamp, command, and reason.
