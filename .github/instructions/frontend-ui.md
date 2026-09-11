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

## Button styles

Use the following semantic mapping for primary action buttons. The labels may be localized; map the action by meaning, not by its displayed text.

| Action | Examples | Base color | Hover color |
|---|---|---|---|
| Login / submit | 登录, Sign in | `bg-blue-600` | `hover:bg-blue-700` |
| Register / new | 注册, 新规, New | `bg-emerald-600` | `hover:bg-emerald-700` |
| Update / edit | 更新, 修改, Update | `bg-blue-600` | `hover:bg-blue-700` |
| Search | 检索, 搜索, Search | `bg-sky-600` | `hover:bg-sky-700` |
| Back | 后退, 返回, Back | `bg-slate-500` | `hover:bg-slate-600` |
| Delete | 删除, Delete | `bg-zinc-900` | `hover:bg-zinc-800` |
| Clear fields | 清除, Clear | `bg-slate-300` | `hover:bg-slate-400` |
| Reset page | 重置, Reset | `bg-amber-500` | `hover:bg-amber-600` |
| Download | 下载, Download | `bg-violet-600` | `hover:bg-violet-700` |
| Upload | 上传, Upload | `bg-teal-600` | `hover:bg-teal-700` |

For colored buttons, also use `text-white` unless the contrast check requires otherwise. Keep the shared `Button` focus-visible and disabled states; do not replace them with inline styles. Secondary actions such as logout may use `variant="outline"` or `variant="ghost"` unless a page-specific requirement defines a semantic color.