# Changelog

All notable changes to this project will be documented in this file.

## v3.0.0

This documents all changes currently on the `improvements` branch relative to
`main` (commit f5897f2, “Update api spec (#352)”). Dates are in UTC.

### Breaking Changes

- Type strictness: remove explicit `any` from generated and template code.
  - Models generator now falls back to `unknown` (not `any`) for ambiguous
    OpenAPI shapes, and uses `Record<string, unknown>` instead of bare
    `object` for index signatures. (src/modelsGen.ts)
  - WebSocket template no longer uses `any` internally; it narrows binary
    payloads and returns `Res` with typed parsing. (src/templates/ws.hbs)

### Features

- WebSocket endpoints: add generated clients for
  `ml_copilot_ws`, `ml_reasoning_ws`, and `modeling_commands_ws`.
- Handlebars templates: migrate generator to Handlebars-based templates for
  REST, multipart, and WebSocket operations (`src/templates/*.hbs`).
- Example generation: create per-endpoint example tests in `__tests__/gen` for
  REST and WS endpoints.
- Error handling helpers: introduce `ApiError` and `throwIfNotOk` utilities for
  consistent HTTP error surfaces. (src/errors.ts)
- Top-level types: re-export all schema types from the package root so you can
  `import type { User } from '@kittycad/lib'` instead of `Models['User']`.
  - Aliases to avoid name collisions: `ApiError` (model) → `ApiErrorModel`,
    and `Error` (error-body model) → `ApiErrorBody`.

### Improvements

- Windows TLS root CAs: refine dynamic import for `win-ca` with typed
  indirection and `NodeJS.Process` narrowing. (src/client.ts)
- WebSocket binary parsing: add robust ArrayBufferView detection and safer BSON
  fallbacks; avoid global `any`/`Buffer` guards. (src/templates/ws.hbs)
- Generator resiliency: better request/response type collection, multipart
  handling, and spec patch emission. (src/apiGen.ts)
- Formatting and linting: apply Biome formatting across generated sources.

### Regenerated SDK

- Regenerate `src/api/**` and `src/models.ts` from `spec.json` to reflect the
  above template and typing changes. This touches many files; behavior is
  unchanged aside from stricter TypeScript types.

### Migration Guide

- If your application relied on permissive `any` fields, you may see new
  TypeScript errors. Prefer safe narrowing, type guards, or an explicit cast to
  the expected type.

  Before:

  ```ts
  // `output` previously typed as any
  doStuff(resp.output.foo)
  ```

  After:

  ```ts
  // `output` is now unknown
  const out = resp.output as { foo: string }
  doStuff(out.foo)
  ```

- You can now import types directly from the root:

  ```ts
  // Before
  import type { Models } from '@kittycad/lib'
  type User = Models['User']

  // After
  import type { User, ApiErrorModel, ApiErrorBody } from '@kittycad/lib'
  ```

- WebSocket usage still uses generics to control payload shapes:

  ```ts
  const conn = new SomeWs<{ type: 'ping' }, { type: 'pong' }>({ client })
  ```

- If you need permissive behavior, cast at the call site instead of loosening
  library types.
