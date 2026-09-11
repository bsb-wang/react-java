# General Rules

- Reply in Japanese; write source-code comments in Japanese.
- Prefer existing implementation patterns and keep code readable and maintainable.
- Consider security during implementation.
- 提供されていない業務ルールやデータ定義を推測しない。不足情報がある場合は、先に確認する。

## Loading Rules

1. Load `api.md` for backend tasks; load `api-database.md`, `api-naming.md`, `api-structure.md`, or `api-testing.md` only when relevant.
2. Load `frontend.md` for frontend tasks; load `frontend-generation.md` or `frontend-ui.md` only when relevant.
3. Load `build-war.md` only when the user explicitly requests a staging or production WAR.
4. In case of conflict, follow the user's explicit request and existing project implementation. 業務ルールやデータ定義を推測せず、不足情報がある場合は先に確認する。

## File Index

| File | Load when |
|---|---|
| `api.md` | Java/Spring/MyBatis backend tasks |
| `api-database.md` | Entity, Mapper, SQL, DDL, or database tasks |
| `api-naming.md` | Creating classes, methods, or JavaDoc |
| `api-structure.md` | Creating files or deciding file locations |
| `api-testing.md` | Creating or modifying tests |
| `frontend.md` | React/TypeScript frontend tasks |
| `frontend-generation.md` | Creating a feature, page, component, Hook, form, or Service |
| `frontend-ui.md` | Layout, styling, messages, or Tailwind tasks |
| `build-war.md` | Staging or production WAR builds |