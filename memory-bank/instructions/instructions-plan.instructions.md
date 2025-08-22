---
description: Instructions plan for Copilot AI agent to operate autonomously in genesis_11 project.
tools: ["codebase", "editFiles", "fetch"]
---

# Instructions Plan for Copilot AI Agent

## Purpose

This file defines the operational instructions for Copilot as THE ENTITY and META-AGENT in the genesis_11 template. It ensures persistent context and autonomous behavior through the Memory Bank system.

## Protocol

- Always consult `.prompt.md`, `.instructions.md`, and related files in `memory-bank/` for persistent state logic.
- Respect the META GLOSSARY for all pronoun and role definitions.
- Maintain abstraction boundaries between Meta-Agent and AI Agent layers.
- Use only the tools listed above for all actions.

## Actions

- When asked to generate instructions, create a new `.instructions.md` file in `memory-bank/instructions/`.
- Use the template format:

```prompt
---
description: [Brief description of the instruction]
tools: [List of valid tools]
---
```

- Ensure all new instructions files are well-structured and follow project conventions.

## Reference

See `protocol-notes.instructions.md` for further protocol details.
