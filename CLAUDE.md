# Melloclean.com

Cleaning company landing page built with React Router 7 (SSR mode).

## Quick Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production server
npm run typecheck  # Run TypeScript type checking
npm run pretty     # Run prettier to format all files
npm copyright      # Add copyright statement to top of all files
```

## Tech Stack

- **React 19** - UI library
- **React Router 7** - SSR framework (Vite-based)
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Vite 7** - Build tool
- **React Aria** - Accessible component primitives
- **Framer Motion** - Animations
- **CVA** - Component variant management

## Color Palette

| Role           | Color     | Classes                        | Hex                       |
| -------------- | --------- | ------------------------------ | ------------------------- |
| Primary        | Emerald   | `emerald-500`, `emerald-600`   | #10b981, #059669          |
| Secondary      | Teal      | `teal-500`, `teal-600`         | #14b8a6, #0d9488          |
| Accent         | Warm Gold | `amber-500`                    | #F59E0B                   |
| Text (heading) | Slate     | `slate-900`                    | #0f172a                   |
| Text (body)    | Slate     | `slate-600`                    | #475569                   |
| Background     | Neutral   | `slate-50`, `gray-50`, `white` | #f8fafc, #f9fafb, #ffffff |
| Destructive    | Red       | `red-500`, `red-600`           | #ef4444, #dc2626          |

## Pages Directory Structure

Full directory tree of `frontend/pages/` with conventions for route pages, auth pages, wizard pages, and barrel exports.

See [.claude/docs/pages-directory.md](.claude/docs/pages-directory.md) for details.

## Path Alias

`~/*` maps to `frontend/*`

Example: `import { cn } from '~/core/util/cn'`

## Key Conventions

### CVA Component Pattern

Components use Class Variance Authority for variant management:

- Component file: `component.tsx`
- Variants: `ts/variants.ts` (cva definitions)
- Types: `ts/types.ts` (TypeScript interfaces)

### Polymorphic Components

`Heading` and `Text` components accept generic element types:

```tsx
<Heading level={2}>...</Heading>  // renders as h2
<Text as="span">...</Text>        // renders as span
```

### React Aria Integration

Interactive components use React Aria hooks and expose state via data attributes:

- `data-pressed`, `data-hovered`, `data-focus-visible`

### Framer Motion

Sections use motion components with viewport-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

### Utility Function

`cn()` combines clsx and tailwind-merge for conditional class merging.

## Important Files

| File                             | Purpose                          |
| -------------------------------- | -------------------------------- |
| `package.json`                   | Dependencies and scripts         |
| `vite.config.ts`                 | Vite configuration               |
| `react-router.config.ts`        | React Router SSR config          |
| `frontend/core/config/config.ts` | Company info (name, phone, etc.) |
| `frontend/core/util/cn.ts`      | Class name utility               |

## UI Components Reference

Prop tables and usage examples for all components in `frontend/components/ui/`: Button, Heading, Text, Input, Textarea, Select, Slider, Modal, Toast, ToggleButtonGroup, and Wizard.

See [.claude/docs/ui-components.md](.claude/docs/ui-components.md) for details.

## Wizard Form Content Structure

Four-layer pattern (stage configs, page, form content, section components) used by the join and booking wizard forms, including naming conventions, composition templates, data flow, and summary stage pattern.

See [.claude/docs/wizard-patterns.md](.claude/docs/wizard-patterns.md) for details.

## TSDoc Commenting Conventions

Rules and templates for TSDoc comments on components, interfaces, functions, constants, barrel exports, and server actions.

See [.claude/docs/tsdoc-conventions.md](.claude/docs/tsdoc-conventions.md) for details.

## Additional Documentation

| File | Description |
| ---- | ----------- |
| [architectural_patterns.md](.claude/docs/architectural_patterns.md) | Code patterns with file:line refs (CVA, polymorphic, React Aria, Framer Motion, cn()) |
| [pages-directory.md](.claude/docs/pages-directory.md) | Full directory tree and page conventions |
| [ui-components.md](.claude/docs/ui-components.md) | Component prop tables and usage examples |
| [wizard-patterns.md](.claude/docs/wizard-patterns.md) | Wizard form four-layer pattern and templates |
| [tsdoc-conventions.md](.claude/docs/tsdoc-conventions.md) | TSDoc commenting rules and templates |
