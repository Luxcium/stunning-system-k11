# Contributing

1. Open an issue describing the change and the official doc reference.
2. Update `openapi.yaml` and add examples.
3. Run `python3 scripts/validate.py`.
4. Submit a PR.

## Package Manager

- Use npm for all dependency management and scripts.
- If you paste instructions using `pnpm`, `yarn`, or `bun`, convert them to npm:

```
pnpm install         -> npm install
pnpm add <pkg>       -> npm install <pkg>
pnpm add -D <pkg>    -> npm install -D <pkg>
yarn                 -> npm install
yarn add <pkg>       -> npm install <pkg>
yarn <script>        -> npm run <script>
```

Prefer `npm run <script>` over invoking binaries directly to ensure cross-platform behavior.
