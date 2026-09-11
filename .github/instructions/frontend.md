# Frontend Development Rules

## Technology Stack

React 19, TypeScript 6, React Router 7, Tailwind CSS 4, shadcn/ui 4, lucide-react, Zustand 5. Use current best practices and no deprecated APIs.

## Architecture and Code

- Use Feature-Based Architecture; keep 業務ロジック in features.
- Do not add top-level directories unless explicitly requested.
- Use TypeScript strict mode, functional components, `async/await`, and early returns; avoid `any`, keep functions small, and keep 業務ロジック out of UI.
- Use `@/...` alias imports and named exports.

## Directory Responsibilities

`src/components/{ui,common,layouts}` contains shared UI; `src/features/<feature>/{ui,services,state,schemas,types,tests}` contains feature code; `src/shared/{services,state,types,utils}` contains shared resources; also use `router/`, `i18n/`, and `assets/`.

## Naming

Pages end with `Page`, Hooks start with `use`, Services end with `Service`, APIs end with `Api`, and tests use `*.test.ts(x)`. Boolean names start with `is`, `has`, or `can`; types use PascalCase.