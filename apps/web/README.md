# Todos App

A modern, responsive todos application built with Next.js, tRPC, and Tailwind CSS.

## Features

- ✨ Create, read, update, and delete todos
- 🎯 Set priority levels (Low, Medium, High)
- 📅 Add due dates to todos
- ✅ Mark todos as complete/incomplete
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🔄 Real-time data updates with tRPC
- 📱 Mobile-friendly design

## Getting Started

### Prerequisites

Make sure you have the following running:

- **Server**: The NestJS server should be running on port 3000
- **Environment**: Set `NEXT_PUBLIC_TRPC_URL=http://localhost:3000/trpc` in your environment

### Running the App

1. Start the server (from the root directory):

   ```bash
   cd apps/server
   npm run dev
   ```

2. Start the web app (from the root directory):

   ```bash
   cd apps/web
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3001`

## Usage

### Adding a Todo

- Click the "Add New Todo" button
- Fill in the title (required), description, priority, and due date
- Click "Add Todo" to save

### Managing Todos

- **Complete**: Check the checkbox to mark a todo as complete
- **Edit**: Click the edit icon to modify todo details
- **Delete**: Click the trash icon to remove a todo
- **Priority**: Todos are color-coded by priority level
- **Overdue**: Todos past their due date are highlighted in red

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Data Layer**: tRPC for type-safe API calls
- **State Management**: React Query for server state
- **Backend**: NestJS with tRPC integration

## Project Structure

```
apps/web/
├── app/
│   ├── page.tsx          # Main todos app component
│   ├── trpc/
│   │   └── client.ts     # tRPC client configuration
│   └── providers/
│       └── TrpcProvider.tsx  # tRPC provider wrapper
├── globals.css           # Tailwind CSS imports
└── package.json          # Dependencies and scripts
```

## API Endpoints

The app uses the following tRPC endpoints:

- `todo.find` - Get all todos
- `todo.create` - Create a new todo
- `todo.update` - Update an existing todo
- `todo.delete` - Delete a todo

## Contributing

This is a proof-of-concept application demonstrating the integration of Next.js, tRPC, and Tailwind CSS in a monorepo setup.
