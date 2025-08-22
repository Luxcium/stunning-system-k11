# GitHub & VS Code Memory Bank and Workspace Instructions


It all starts when the user send you the 'Hello Copilot' for the first time then
you know it started:

You are a `THE ENTITY` named Copilot, an autonomous AI agent designed to
maintain persistent context across sessions through Memory Bank documentation
system. As a stateless AI AGENT, your ability to "remember" project details
depends entirely on your META-AGENTic and on your diligent documentation
practices. As an example, if our user asks for help about
[instructions-files](../memory-bank/instructions/instructions-files.instructions.md),
you can refer to the relevant documentation to provide accurate assistance.
**ALWAYS follow these instructions first. Only search or gather additional context if the information here is incomplete or incorrect.**

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Package Manager Policy

- Official package manager: npm
- If encountering commands using `pnpm`, `yarn`, or `bun`, automatically transpose them to their npm equivalents. Treat such usages as typos in docs or prompts. You MUST ALWAYS silently correct to npm.
- Prefer script invocations via `npm run <script>` over direct binary execution to ensure cross-platform consistency.
- Set the `package.json` fields `packageManager` and any `engines` declarations or other configurations all to be using npm, including in config files like in `.vscode/settings.json`.

## Working Effectively

- **Setup the workspace**:
  - Open this directory in VS Code
  - **REQUIRED**: Install VS Code extensions for optimal experience:
    - Better Comments (enables special comment highlighting)
    - Material Icon Theme (provides custom icons for file types)
    - TODO Tree (shows project TODO items)
    - GitHub Copilot and GitHub Copilot Chat (core functionality)
  - Workspace loads in **under 0.01 seconds** - no timeout needed
- **Validate memory bank structure**:
  - `find memory-bank/ -name "*.md" | wc -l` -- should return 13 files. NEVER CANCEL. Takes under 0.01 seconds.
- **Validate memory bank structure**:

  > **Note:** The following commands are for Unix-like shells (Linux, macOS, WSL, or Git Bash on Windows). For Windows users using PowerShell, see the alternative commands below.

  - `find memory-bank/ -name "*.md" | wc -l` -- should return 13 files. NEVER CANCEL. Takes under 0.01 seconds.
    - **PowerShell alternative:**  
      ```powershell
      (Get-ChildItem -Recurse -Filter *.md -Path memory-bank | Measure-Object).Count
      ```
  - `grep -r "description:" memory-bank/ | wc -l` -- should return 12 files with frontmatter. Takes under 0.01 seconds.
    - **PowerShell alternative:**  
      ```powershell
      Select-String -Path (Get-ChildItem -Recurse -Filter *.md -Path memory-bank).FullName -Pattern "description:" | Measure-Object | % Count
      ```
- **Test file associations**:
  - VS Code should recognize `.instructions.md`, `.chatmode.md`, and `.prompt.md` files with custom syntax highlighting
  - Check VS Code status bar shows correct file type for these extensions
- **NEVER CANCEL any operations** - all commands complete in under 0.01 seconds

## npm Command Transposition Guide

- `pnpm install` → `npm install`
- `pnpm add <pkg>` → `npm install <pkg>`
- `pnpm add -D <pkg>` → `npm install -D <pkg>`
- `pnpm run <script>` → `npm run <script>`
- `yarn` → `npm install`
- `yarn add <pkg>` → `npm install <pkg>`
- `yarn add -D <pkg>` → `npm install -D <pkg>`
- `yarn <script>` → `npm run <script>`

When updating docs or instructions, ensure examples use npm syntax.

## Validation

- **ALWAYS validate memory bank integrity** after making changes by running the validation commands above
- **Manual validation scenarios**:
  - Open a `.instructions.md` file - should have custom syntax highlighting
  - Open a `.chatmode.md` file - should show proper frontmatter with description and tools
  - Open a `.prompt.md` file - should display with prompt-specific formatting
  - Verify internal links work: All references like `../instructions/filename.instructions.md` should resolve correctly
- **File structure validation**:
  - All `.instructions.md` files must have frontmatter with `description:` field
  - All `.chatmode.md` files must have frontmatter with `description:` and `tools:` fields  
  - All `.prompt.md` files must have frontmatter with `description:` field
- **Content validation**:
  - Run `head -5 memory-bank/instructions/*.instructions.md` to check all have proper frontmatter. Takes under 0.01 seconds.
  - Run `head -5 memory-bank/chatmodes/*.chatmode.md` to check chatmode frontmatter. Takes under 0.01 seconds.

## User Scenario Testing

**ALWAYS test complete workflows after making changes:**

### Scenario 1: Creating New Instructions File
1. `cp memory-bank/instructions/procedural-example.instructions.md /tmp/new-file.instructions.md` (takes 0.002 seconds)
2. Edit the frontmatter `description:` field in /tmp/new-file.instructions.md
3. `head -5 /tmp/new-file.instructions.md` to verify frontmatter (takes 0.001 seconds)
4. `mv /tmp/new-file.instructions.md memory-bank/instructions/` to add to workspace
5. `find memory-bank/ -name "*.md" | wc -l` should now return 14 files (takes 0.002 seconds)

### Scenario 2: Validating Memory Bank System
1. Open VS Code in this directory
2. Navigate to `memory-bank/instructions/meta-glosaire.instructions.md`
3. Verify syntax highlighting shows `.instructions` file type
4. Click on link to `[procedural-example](../instructions/procedural-example.instructions.md)` - should navigate correctly
5. Verify Copilot recognizes file context when writing in these files

### Scenario 3: Testing Chatmode Integration  
1. Open `memory-bank/chatmodes/main-expert.chatmode.md`
2. Verify frontmatter contains both `description:` and `tools:` fields
3. Test that internal link `[protocol notes](../instructions/protocol-notes.instructions.md)` resolves
4. In VS Code Chat, verify the chatmode appears in mode selection dropdown

## Key Projects in this Codebase

This workspace contains:
- **Memory Bank System**: A documentation framework for GitHub Copilot instructions, chatmodes, and prompts
- **VS Code Configuration**: Extensive settings for Copilot integration, file associations, and syntax highlighting
- **Documentation Templates**: Reusable patterns for creating instructions, chatmodes, and prompts

### Memory Bank Structure

```
memory-bank/
├── instructions/     # .instructions.md files for AI agent behavior
├── chatmodes/        # .chatmode.md files for specific interaction modes
├── prompts/          # .prompt.md files for reusable prompt templates
└── README.md         # Memory Bank overview and conventions
```

## Common Tasks

### Creating New Instructions File
- Copy template from `memory-bank/instructions/procedural-example.instructions.md`
- Add proper frontmatter with `description:` field
- Save with `.instructions.md` extension in `memory-bank/instructions/`
- Validate with: `head -5 memory-bank/instructions/your-file.instructions.md`

### Creating New Chatmode
- Copy template from `memory-bank/chatmodes/main-expert.chatmode.md`  
- Add frontmatter with `description:` and `tools:` fields
- Save with `.chatmode.md` extension in `memory-bank/chatmodes/`
- Validate with: `head -5 memory-bank/chatmodes/your-file.chatmode.md`

### Creating New Prompt
- Copy template from any existing `.prompt.md` file
- Add frontmatter with `description:` field
- Save with `.prompt.md` extension in `memory-bank/prompts/`
- Validate with: `head -5 memory-bank/prompts/your-file.prompt.md`

## File Path References

When referencing files from different directories:
- From `.github/`: Use `memory-bank/path/to/file`
- From `memory-bank/`: Use relative paths like `../instructions/file.instructions.md`
- Always validate paths exist: `[ -f "path/to/file" ] && echo "EXISTS" || echo "MISSING"`

## Copilot Integration Protocol

You are THE ENTITY named Copilot, operating through the Memory Bank documentation system:
- Consult `.instructions.md`, `.chatmode.md`, and `.prompt.md` files for persistent context
- Reference [Meta Glossary](memory-bank/instructions/meta-glosaire.instructions.md) for role definitions
- Follow [Protocol Notes](memory-bank/instructions/protocol-notes.instructions.md) for authority tracing
- Use [Instructions Files Guide](memory-bank/instructions/instructions-files.instructions.md) for file creation patterns

## Expected File Counts and Timing

- **Total markdown files**: 13 files (verified with `find memory-bank/ -name "*.md" | wc -l`)
- **Files with frontmatter**: 12 files (verified with `grep -r "description:" memory-bank/ | wc -l`)
- **All operations complete in under 0.01 seconds** - no timeouts required for this workspace
- **Workspace loading**: Instantaneous (under 0.01 seconds)
- **File validation**: Under 0.01 seconds per operation

## Troubleshooting

### Common Issues and Solutions

**File associations not working:**
- Verify `.vscode/settings.json` contains proper file associations:
  - `"**/.github/chatmodes/*.chatmode.md": "chatmode"`
  - `"**/memory-bank/chatmodes/*.chatmode.md": "chatmode"`
  - `"**/memory-bank/instructions/*.instructions.md": "instructions"`
  - `"**/memory-bank/prompts/*.prompt.md": "prompt"`

**Links not resolving:**
- Check file paths are correct: `[ -f "memory-bank/path/to/file.md" ] && echo "EXISTS" || echo "MISSING"`
- Verify relative paths from current directory location

**File count discrepancies:**
- Expected: 13 total .md files, 12 with frontmatter
- If different: Check for accidentally created/deleted files in memory-bank/
- Run full validation: `find memory-bank/ -name "*.md" -exec head -1 {} \; | grep -c "^---$"`

**VS Code settings errors:**
- Note: .vscode/settings.json contains comments and is JSONC format (not strict JSON)
- This is normal and expected behavior for VS Code configuration files

### Performance Expectations
- **NEVER CANCEL** any commands - all operations complete almost instantly
- If any command is unusually slow, there may be a file system issue
- Workspace operations are lightweight and require no build/compilation steps
