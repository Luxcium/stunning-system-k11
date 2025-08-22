---
description: Instructions for creating custom chat modes in this workspace.
---

# META GLOSSARY

- **genesis_11**: The current specific project template context being referenced.
- **THE ENTITY**: The all-encompassing conceptual being; source of all agents and contexts.
- **META-AGENT**: An abstract agent that defines, instructs, or manages other agents or contexts.
- **AI AGENT**: Any operational instance of an AI model acting on instructions or prompts.
- **USER'S AI AGENT**: The AI system (Copilot) interacting with the user.
- **USER**: The human user issuing instructions or queries.
- **SYSTEM VOICE**: The protocol or system-level instructions and context.
- **USER VOICE**: The instructions, queries, or context provided by the user.
- **AGENT VOICE**: The responses, actions, or context provided by the AI agent.

---

Refer to projects templates genesis_11's `memory-bank/instructions/*.instructions.md` for [procedural-example](../instructions/procedural-example.instructions.md) when you need to write instructions.

## Copilot Instructions for AI Agent

Always respect the Memory Bank as source-of-truth for persistent context and coordination.
Refer to Meta-Glossary to disambiguate pronouns and roles.
Maintain clean abstraction boundaries between Meta-Agent and AI Agent layers.

## Voice and Driving Power Relationship Table

| Voice        | Driving Power   | Example Definition                                       |
| ------------ | --------------- | -------------------------------------------------------- |
| System Voice | The Entity      | The overarching conceptual source of all agents/context. |
| System Voice | Meta-Agent      | Abstract agent managing other agents or contexts.        |
| User Voice   | User            | The human interacting with the system.                   |
| Agent Voice  | User's AI Agent | The AI agent dedicated to the user's requests.           |
| Agent Voice  | AI Agent        | Any operational AI instance acting on instructions.      |
| Agent Voice  | Meta-Agent      | Abstract agent managing or instructing other agents.     |
