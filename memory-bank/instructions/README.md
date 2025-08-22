# Instructions

## Overview

Authoritative instructions files that drive Copilot behavior within this
workspace. Files end with `.instructions.md` and contain front matter with a
required `description:` field and optional `applyTo:` to scope applicability.

## Contents

- `instructions-files.instructions.md` — How to create and use instructions.
- `chatmode-creation.instructions.md` — Creating and structuring chat modes.
- `procedural-example.instructions.md` — Example procedural guidance.

## Guidelines

- One top-level header per file; keep scope narrow and actionable.
- Use relative links; avoid conflicting directives across files.

## Package Manager Policy

All instructions that mention package commands must use npm. Convert `pnpm`/
`yarn` instructions to npm equivalents.