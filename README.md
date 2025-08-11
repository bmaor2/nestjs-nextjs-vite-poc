# NestJS + Next.js + Vite + tRPC POC

This is a proof-of-concept project demonstrating a monorepo setup with:

- **Backend**: NestJS server with tRPC
- **Frontend 1**: Next.js 15 app with App Router
- **Frontend 2**: Vite + React app
- **Shared**: tRPC types and UI components

## Project Structure

```
nestjs-nextjs-vite-poc/
├── apps/
│   ├── server/          # NestJS backend server
│   ├── web/            # Next.js 15 frontend
│   └── vite/           # Vite + React frontend
├── packages/
│   ├── trpc/           # Shared tRPC router and types
│   ├── ui/             # Shared React UI components
│   ├── eslint-config/  # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

## Features

- **Shared tRPC API**: Both frontends use the same tRPC backend
- **Shared UI Components**: Todo components are shared between Next.js and Vite apps
- **Type Safety**: Full TypeScript support across the stack
- **Modern Tooling**: Uses pnpm workspaces and Turborepo

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

Start all development servers:

```bash
pnpm run dev
```

This will start:

- **Server**: http://localhost:3000 (NestJS backend)
- **Next.js**: http://localhost:3001 (Next.js frontend)
- **Vite**: http://localhost:3002 (Vite frontend)

### Build

Build all packages and apps:

```bash
pnpm run build
```

### Linting

Lint all packages and apps:

```bash
pnpm run lint
```

## Architecture

### Backend (NestJS + tRPC)

The NestJS server provides a tRPC API with the following endpoints:

- `todo.find` - Get all todos
- `todo.findById` - Get a specific todo
- `todo.create` - Create a new todo
- `todo.update` - Update an existing todo
- `todo.delete` - Delete a todo

### Shared UI Package

The `@repo/ui` package contains reusable React components:

- `TodoList` - Main todo list component
- `TodoItem` - Individual todo item component
- `AddTodoForm` - Form for adding new todos
- `LoadingSpinner` - Loading state component
- `ErrorDisplay` - Error state component
- `EmptyState` - Empty state component

### Frontend Apps

Both frontend apps use the shared UI components and tRPC client to interact with the backend. They provide the same functionality but are built with different frameworks:

- **Next.js**: Uses App Router and server-side rendering
- **Vite**: Uses Vite for fast development and building

## Technology Stack

- **Backend**: NestJS, tRPC, Zod
- **Frontend**: React 19, TypeScript
- **Build Tools**: Vite, Next.js, Turborepo
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)

## Development Workflow

1. **Shared Components**: Add new UI components to `packages/ui/src/components/`
2. **Types**: Update types in `packages/ui/src/types/` or `packages/trpc/src/`
3. **API**: Add new tRPC procedures in `packages/trpc/src/server/server.ts`
4. **Frontends**: Use shared components and types in both `apps/web/` and `apps/vite/`

## Notes

- Both frontends connect to the same tRPC backend
- UI components are framework-agnostic and can be used in any React app
- The project uses modern React patterns and hooks
- Tailwind CSS is configured for both frontend apps
- TypeScript provides full type safety across the monorepo
