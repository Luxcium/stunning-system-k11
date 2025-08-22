# Prompts
## Overview
Reusable prompt templates for Copilot. Each `.prompt.md` contains front matter with a `description:` and optional metadata. Prompts reference instructions and chat modes to create repeatable flows.
## Contents
- `make-new-instructions.prompt.md` — Template for creating new instructions files.
## Authoring Guidelines
- Keep prompts concise and task-oriented; link to relevant instructions.
- Ensure all links resolve using workspace-relative paths.
## Package Manager Policy
Use npm in all command examples. If prompts include `pnpm` or `yarn`, transpose to npm.