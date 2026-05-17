# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (Vite)
pnpm build      # Production build
```

No lint, test, or type-check scripts are configured.

## Architecture

ArenaPass is a React 18 + TypeScript SPA for FIFA World Cup 2026 ticket sales. Built with Vite 6, React Router 7, and Tailwind CSS v4.

### Routing

All routes are defined in [src/app/App.tsx](src/app/App.tsx). The app has 8 page-level screens:

| Route | Screen |
|---|---|
| `/` | HomeScreen |
| `/match/:id` | MatchDetails |
| `/seat-selection/:id` | SeatSelection |
| `/payment/:id` | PaymentScreen |
| `/my-tickets` | MyTickets |
| `/explore` | ExploreScreen |
| `/profile` | ProfileScreen |
| `/admin` | AdminDashboard |

### Component Structure

- `src/app/components/` — Page-level screen components (one per route)
- `src/app/components/ui/` — 50+ reusable shadcn/ui components (Button, Card, Dialog, etc.)
- `src/app/components/BottomNavigation.tsx` — Mobile tab bar, rendered on all screens
- `src/app/components/AccessibilitySettings.tsx` — Persists preferences to localStorage

### State Management

No global state library. Each screen manages its own state with `useState`/`useEffect`. Accessibility settings (font size, high contrast) are read/written to `localStorage` directly.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — use utility classes directly in JSX
- **Design tokens** live in `src/styles/theme.css` as CSS custom properties
- **Primary color**: `#1E7F43` (green); **Accent**: `#F5C518` (yellow)
- **Fonts**: Poppins (headings), Inter (body) — loaded via `src/styles/fonts.css`
- Dark mode and accessibility overrides are applied via CSS variable swaps on `:root`

### Key Dependencies

- **shadcn/ui + Radix UI** — headless accessible primitives for all UI components
- **lucide-react** — icon library used throughout
- **recharts** — charts in AdminDashboard only
- **react-hook-form** — form handling in PaymentScreen
- **sonner** — toast notifications
- **react-router v7** — client-side routing (no server-side rendering)
- **motion** — animation library

### Vite Configuration

`vite.config.ts` includes a custom Figma asset resolver plugin that maps `figma://` imports to the local `src/assets/` directory. The `@` alias resolves to `/src`.

### Accessibility

The app has a dedicated accessibility layer: font sizes (12/16/24px) and high-contrast mode are toggled via `AccessibilitySettings.tsx` and stored in `localStorage`. ARIA labels and semantic HTML are used throughout the page screens.
