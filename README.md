# PTAS Websites

[![DeepSource](https://app.deepsource.com/gh/Yeah-Jack/ptas.svg/?label=active+issues&show_trend=true&token=n9DpIqjD19HJCYoG1EkI-vBd)](https://app.deepsource.com/gh/Yeah-Jack/ptas/)

<img width="2552" height="1433" alt="Website Screenshot" src="https://github.com/user-attachments/assets/35b4d647-906b-4b37-9613-be78432afd48" />

Monorepo for [ptas.de](https://ptas.de) and [taxiware.de](https://taxiware.de).

| Path            | Description                                        | Dev URL                 |
| --------------- | -------------------------------------------------- | ----------------------- |
| `apps/ptas`     | ptas.de                                            | <http://localhost:3000> |
| `apps/taxiware` | taxiware.de                                        | <http://localhost:3001> |
| `packages/ui`   | Shared shadcn/ui components and theme (`@repo/ui`) |                         |

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Turborepo** - Task orchestration and caching across the apps
- **Biome** - Linting and formatting
- **Vitest** - Unit and component tests with React Testing Library

## Getting Started

First, install the dependencies:

```bash
bun install
```

Optionally, install AI coding dependencies:

```bash
apm install
```

Then, run the development servers:

```bash
bun run dev                        # both apps
bunx turbo run dev --filter=ptas   # only one app
```

## Git Hooks and Formatting

- Format and lint fix: `bun run lint`

## Available Scripts

- `bun run dev`: Start all apps in development mode
- `bun run build`: Build all apps for production
- `bun run start`: Build (if needed) and start all apps in production mode
- `bun run check-types`: Type check all workspaces
- `bun run test`: Run all tests with Vitest (`bun run test:watch` for watch mode)
- `bun run lint`: Run Biome formatting and linting

## Adding a shadcn Component

Run the CLI inside the app that needs it. Shared primitives land in `packages/ui`:

```bash
cd apps/ptas
bunx --bun shadcn@latest add [component]
```
