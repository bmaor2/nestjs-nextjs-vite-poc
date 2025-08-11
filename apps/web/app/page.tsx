'use client';

import { TodoList } from '@repo/ui';
import { TRPC } from './trpc/client';
import { TodoFormData, TodoUpdateData } from '@repo/ui';

function TodosApp() {
  const todos = TRPC.todo.find.useQuery();
  const createTodo = TRPC.todo.create.useMutation({
    onSuccess: () => {
      todos.refetch();
    },
  });
  const updateTodo = TRPC.todo.update.useMutation({
    onSuccess: () => {
      todos.refetch();
    },
  });
  const deleteTodo = TRPC.todo.delete.useMutation({
    onSuccess: () => {
      todos.refetch();
    },
  });

  const handleCreateTodo = (data: TodoFormData & { completed: boolean }) => {

    createTodo.mutate({
      ...data,
    });
  };

  const handleUpdateTodo = (id: string, data: TodoUpdateData) => {

    updateTodo.mutate({
      id,
      data: {
        ...data,
        id,
        name: data.name || '',
        description: data.description || '',
        completed: data.completed || false,
        priority: data.priority,
        dueDate: data.dueDate,
        createdAt: new Date(),
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate({ id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          ✨ Todo App - Next.js
        </h1>
        <TodoList
          todos={todos.data}
          isLoading={todos.isLoading}
          error={todos.error ? new Error(todos.error.message) : null}
          onCreateTodo={handleCreateTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
          isCreatePending={createTodo.isPending}
          isUpdatePending={updateTodo.isPending}
        />
      </div>
    </div>
  );
}

export default TodosApp;