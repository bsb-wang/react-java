# Frontend UI, Messages, and Styling Rules

## Layout

- Use a viewport-height flex layout.
- Keep Header and PageBreadcrumb fixed; allow scrolling only in the content area.
- Use consistent page spacing.

## User Messages

- All user-facing text must use i18n.
- Show validation errors near the field.
- Show 業務エラー, confirmation, and system errors in the page message area or with `MessageDialog`; confirmation and system errors must use `MessageDialog`.

## Tailwind

- Prefer utility classes; avoid inline styles.
- Use `cn` or `clsx`.
- Maintain accessible focus states.

Button colors: Register `bg-emerald-600`, Update `bg-blue-600`, Search `bg-sky-600`, Back `bg-slate-500`, Delete `bg-zinc-900`, Clear `bg-slate-300`, Reset `bg-amber-500`, Download `bg-violet-600`, Upload `bg-teal-600`.