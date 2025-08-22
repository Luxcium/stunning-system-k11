# Chat Modes

## Overview

Custom chat modes that tailor Copilot behavior to specific workflows. Each file
uses front matter with a `description:` and optional `model` and `tools` fields.

## Contents

- `main-expert.chatmode.md` — Primary mode for implementation planning and repo operations.

## Authoring Guidelines

- Keep each mode focused and reference shared instructions via relative links.
- Do not invent tools; only list tools that exist in the workspace configuration.

## Package Manager Policy

When chat modes reference commands, they should use npm. Transpose any `pnpm` or
`yarn` examples to npm equivalents.