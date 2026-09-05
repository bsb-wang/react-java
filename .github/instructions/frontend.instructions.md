# Frontend Instructions

## 1. Technology Stack

- React 19.2.8
- React DOM 19.2.8
- React Router DOM 7.18.2
- Vite 8.2.0
- TypeScript 6.0.2
- Tailwind CSS 4.3.3
- shadcn/ui 4.18.0
- Base UI
- lucide-react
- Zustand 5.0.15

## 2. Architecture and Directory Structure

Use Feature-Based Architecture. Each page or business function must have its own feature directory under `src/features/<feature-name>`.

```text
src/
├── assets/
├── components/
│   ├── common/
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── ConfirmDialog.tsx
│   ├── layouts/
│   └── ui/
├── features/
│   ├── login/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── state/
│   │   ├── tests/
│   │   └── ui/
├── i18n/
├── lib/
│   └── utils.ts
├── router/
└── shared/
    ├── services/
    │   └── http.ts
    ├── state/
    └── types/
```

### Directory Responsibilities

- `components/ui`: Shared UI components.
- `components/common`: Shared reusable components such as loading indicators, error messages, and confirmation dialogs.
- `components/layouts`: Shared layouts.
- `features/<feature-name>/schemas`: Validation schemas.
- `features/<feature-name>/services`: Feature-specific services, API calls, and types.
- `features/<feature-name>/state`: Feature-specific hooks and stores.
- `features/<feature-name>/tests`: Feature-specific tests.
- `features/<feature-name>/ui`: Feature-specific pages and components.
- `i18n`: Internationalization resources and logic.
- `router`: Route definitions.
- `lib`: Library-level utilities such as `utils.ts`.
- `shared/services`: Common API and service logic.
- `shared/state`: Common hooks and stores.
- `shared/types`: Common types.

Avoid creating large shared directories that become difficult to maintain. Business logic belongs in `features`.

## 3. General TypeScript and React Rules

- Use TypeScript strict mode.
- Prefer functional components.
- Do not use class components.
- Avoid `any`.
- Prefer explicit types over type assertions.
- Use ES Modules.
- Follow React 19 best practices.
- Use named exports.
- Use function declarations for React components.

```tsx
// Good
export function UserListPage() {
  return <div>User List</div>;
}

// Bad
const UserListPage = () => {
  return <div>User List</div>;
};

export default UserListPage;
```

## 4. Layout and Scrolling

- Use a viewport-height flex layout for screens with a shared header.
- Prevent the page root from scrolling.
- Keep the shared header and `PageBreadcrumb` fixed in place.
- Restrict vertical scrolling to the content area below `PageBreadcrumb` using a flex child with `min-h-0` and `overflow-y-auto`.
- For screens without `PageBreadcrumb`, restrict vertical scrolling to the page-specific content area below the shared header.

## 5. Naming Conventions

### Pages and Layouts

Page components must use the `Page` suffix.

```text
LoginPage
MainLayout
```

### Hooks

Custom hooks must start with `use`.

```text
useAuth
```

### Boolean State

Boolean state names must use clear prefixes such as `is`, `has`, or `can`.

```tsx
const [isLoading, setIsLoading] = useState(false);
```

Examples:

```text
isLoading
hasError
canEdit
```

### Tests

Test file names must contain `.test.`.

```text
LoginPage.test.ts
```

### Event Handlers

Event handlers must use the `handle` prefix.

```text
handleSubmit
```

### Types

Use PascalCase for type and interface names. Do not use the `I` or `T` prefix.

```ts
// Good
type User = {
  id: number;
};

interface LoginRequest {
  userId: string;
}

// Bad
interface IUser {}
type TUser = {};
```

### API Files and Functions

- API file names must use camelCase and an `Api` suffix.
- API functions must start with a verb.

```text
userApi.ts
authApi.ts
```

```ts
getUsers();
createUser();
updateUser();
deleteUser();
```

### Services

- Service file names must use camelCase and a `Service` suffix.
- Service exports must use camelCase.

```text
userService.ts
authService.ts
```

```ts
export const userService = {};
```

## 6. Tailwind CSS

- Prefer Tailwind utility classes.
- Avoid inline styles.
- Reuse common styles through components.
- Use `clsx` or the `cn` utility for conditional classes.

```tsx
<Button
  className={cn(
    "w-full",
    isLoading && "opacity-50",
  )}
>
  Search
</Button>
```

## 7. shadcn/ui

- Use shadcn/ui as the primary UI framework.
- When creating screens, prioritize existing components under `src/components/ui/`.
- Do not create custom components when an existing shadcn/ui component provides the required functionality.
- Extend shadcn/ui through composition.
- Keep component variants inside their component files.

```tsx
<Button variant="outline">
  Search
</Button>
```

## 8. Forms and Validation

- Use React Hook Form for form handling.
- Use Zod for validation.
- Keep schemas in dedicated files.

```text
features/<feature-name>/schemas/userSchema.ts
```

## 9. Imports

Use alias imports.

```ts
// Good
import { Button } from "@/components/ui/button";
import { UserListPage } from "@/pages/UserListPage";

// Bad
import { Button } from "../../../components/ui/button";
```

## 10. Code Style and Responsibilities

- Use `async/await` instead of Promise chains.
- Prefer early returns.
- Keep functions small and focused.
- Extract reusable logic into hooks.
- Extract API calls into the API layer.
- Avoid business logic inside UI components.

## 11. Accessibility

- Use semantic HTML.
- Use `Label` instead of `span` for form labels.
- Provide ARIA attributes when appropriate.
- Ensure keyboard navigation works.

## 12. Code Generation Expectations

When generating code:

- Follow the existing project structure.
- Use React 19 patterns.
- Use TypeScript strict typing.
- Use named exports.
- Use shadcn/ui components whenever possible.
- Use Tailwind CSS utilities.
- Keep code clean, readable, and production-ready.
