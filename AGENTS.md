This project generates a TypeScript SDK for our API based on the OpenAPI spec
in `spec.json`.

Directory layout (important)

- `gen/` — generator source (edit these):
  - `gen/modelsGen.ts` — builds `src/models.ts`, then calls `gen/apiGen.ts`.
  - `gen/apiGen.ts` — creates files under `src/api/**`, `__tests__/gen/**`, and
    updates `src/index.ts`.
  - `gen/expectedToFail.ts` — lists endpoints to skip or treat specially when
    generating tests/examples.
  - `gen/templates/*.hbs` — Handlebars templates for REST, multipart, WS, and
    example files. Update these for behavior/shape changes.

- `src/` — generated runtime SDK (do not hand‑edit):
  - `src/models.ts`, `src/api/**`, `src/index.ts` — the library surface users
    import. These are overwritten by `npm run gen`.
  - `src/client.ts`, `src/errors.ts`, `src/pagination.ts`, `src/ws-utils.ts`
    — shared runtime helpers used by generated code.

You MUST NOT manually edit `src/api/**`, `src/models.ts`, or other generated
outputs. Make changes in `gen/**` and re‑generate.

We aim to make this SDK as idiomatic to TypeScript developers as possible.

We also try to write simple and idiomatic Typescript in the generation logic.

Workflow

- Run `npm run gen` after changes in `gen/**` to regenerate the SDK.
- Run `npm run tsc` to type‑check everything, including generated examples.
- Run `npm run build` to produce `dist/` artifacts (`exports` point to `dist`).
- Run `npm run test` to execute tests (note: most generated examples are smoke
  tests; network calls may be skipped/expected to throw with dummy data).

If you make a breaking change add it to the CHANGELOG.md with a migration guide.

Always run `npm run fmt` after you make changes.

Conventions added by the generator

- JSDoc: descriptions from the spec are emitted as JSDoc on functions, params,
  and models; REST methods include `@returns` and property docs.
- Pagination: for list endpoints returning `*ResultsPage`, we emit
  `<operationId>_pager(params)` helpers (snake_case) that return a small
  `Pager` with `hasNext()` and `next()`.
- Client injection: generated REST/WS code reads `client.baseUrl` and
  `client.fetch` if provided; otherwise it falls back to environment defaults
  and global `fetch`.
