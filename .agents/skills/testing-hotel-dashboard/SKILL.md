---
name: testing-hotel-dashboard
description: Test the Hotel dashboard end-to-end locally. Use when verifying UI changes, bug fixes, or new features in the OVER SKY HOTEL Next.js app.
---

# Testing the Hotel Dashboard

## Prerequisites

- Node.js (the project uses Next.js 15.2.4 with React 19)
- Dependencies installed with `npm install --legacy-peer-deps` (required due to React 19 / react-day-picker peer dep conflict)

## Running the Dev Server

```bash
cd /home/ubuntu/Hotel
npm run dev
```

The server runs on port 3000. The root `/` redirects to `/login`.

## Key Pages to Test

| Route | What to verify |
|-------|---------------|
| `/dashboard` | Charts render (depends on recharts + react-is). Sidebar nav visible with all links. |
| `/booking` | Room cards render with capacity badges ("N guests"), amenities, and prices. Date picker works. |
| `/settings` | All 6 tabs load (General, Rooms, Payments, Notifications, Users, Advanced). Forms are interactive. |
| `/check-in-out` | Guest list and check-in/out actions render. |
| `/rooms` | Room grid with status indicators. |
| `/billing` | Billing table and invoice features. |
| `/food-delivery` | Menu items and order flow. |
| `/messages` | Conversation list and chat area. |
| `/profile` | Profile form with photo upload area. |
| `/login` | Login form renders. |
| `/register` | Registration form renders. |

## Common Issues

- **react-is missing**: recharts depends on `react-is` at runtime. If charts show blank/error, run `npm install react-is --legacy-peer-deps`.
- **Peer dep conflicts**: Always use `--legacy-peer-deps` flag with npm install. React 19 conflicts with react-day-picker 8.x.
- **Navigation mismatch**: The sidebar nav links should match actual route folders under `app/(dashboard)/`. If a nav link 404s, check the href vs the folder name.
- **Loading skeletons**: Each route may have a `loading.tsx` file. If a page crashes during navigation, check the loading file for invalid JSX.

## Build Verification

```bash
npx next build
```

All 19 routes should compile. Warnings about chart dimensions from recharts during SSR are expected and harmless.

## Lint

```bash
npm run lint
```

## Devin Secrets Needed

None -- this is a frontend-only app with mock data, no API keys or auth required.
