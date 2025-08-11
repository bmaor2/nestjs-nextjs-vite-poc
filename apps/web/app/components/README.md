# Todo App Components

This directory contains the React components for the Todo application, organized for better maintainability and reusability.

## Component Structure

### Core Components

- **`TodoList.tsx`** - Main container component that manages the list of todos and handles CRUD operations
- **`TodoItem.tsx`** - Individual todo item component with edit/delete functionality
- **`AddTodoForm.tsx`** - Form component for adding new todos

### UI Components

- **`LoadingSpinner.tsx`** - Loading state component
- **`ErrorDisplay.tsx`** - Error state component
- **`EmptyState.tsx`** - Empty state component when no todos exist

### Types

- **`../types/todo.ts`** - TypeScript interfaces for Todo data structures

## Usage

```tsx
import { TodoList, AddTodoForm, TodoItem } from './components';

// Use the main TodoList component
<TodoList />

// Or use individual components
<AddTodoForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={false} />
<TodoItem todo={todoData} onEdit={handleEdit} onDelete={handleDelete} />
```

## Benefits of This Structure

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be easily reused in other parts of the app
3. **Maintainability** - Easier to debug and modify individual components
4. **Type Safety** - Proper TypeScript interfaces for better development experience
5. **Testing** - Individual components can be tested in isolation

## Component Dependencies

- All components use the `'use client'` directive for Next.js client-side rendering
- Components use Tailwind CSS for styling
- TRPC is used for API communication in the TodoList component
- State management is handled locally within each component as needed
