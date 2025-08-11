import { TRPC } from './trpc/client';
import { TodoList } from '@repo/ui';
import { TodoFormData, TodoUpdateData } from '@repo/ui';

export default function App() {
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
        console.log('Creating todo:', data);
        createTodo.mutate({
            ...data,
        });
    };

    const handleUpdateTodo = (id: string, data: TodoUpdateData) => {
        console.log('Updating todo:', id, data);
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
        console.log('Deleting todo:', id);
        deleteTodo.mutate({ id });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Todo App - Vite Client
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
