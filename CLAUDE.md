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

## Directory Structure

```
frontend/
├── components/     # Reusable UI components
│   └── ui/         # Base components (button, heading, text)
├── core/           # Shared utilities and configuration
│   ├── config/     # App configuration (company info)
│   └── util/       # Utilities (cn, mergeRef)
├── pages/          # Page components and layouts
│   └── landing/    # Landing page with section layouts
├── root.tsx        # App root component
└── routes.ts       # Route definitions
```

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
| `react-router.config.ts`         | React Router SSR config          |
| `frontend/core/config/config.ts` | Company info (name, phone, etc.) |
| `frontend/core/util/cn.ts`       | Class name utility               |

## Additional Documentation

See `.claude/docs/architectural_patterns.md` for detailed code patterns with file references.
