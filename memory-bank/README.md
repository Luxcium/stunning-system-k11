# Memory Bank

## Overview

Workspace-scoped documentation for Copilot instructions, chat modes, and prompts.
Acts as the persistent context system for autonomous, repeatable workflows.

## Structure

- `instructions/` — Operational guidelines for AI agents (`*.instructions.md`).
- `chatmodes/` — Custom chat modes and behaviors (`*.chatmode.md`).
- `prompts/` — Reusable prompt templates (`*.prompt.md`).

## Conventions

- One top-level `#` header per file.
- Front matter must include a `description:` field; `tools:` where applicable.
- Use relative links between files; keep topics focused and scoped.

## Package Manager Policy

All examples and tooling references use npm. If you encounter `pnpm`, `yarn`, or
`bun` commands in any documentation or pasted snippets, transpose them to npm
equivalents (see project root README for the cheatsheet).