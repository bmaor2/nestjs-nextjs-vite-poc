'use client';

import { useState } from 'react';
import { TodoApiResponse, TodoFormData, TodoUpdateData } from '../types/todo';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import EmptyState from './EmptyState';

interface TodoListProps {
    todos: TodoApiResponse[] | undefined;
    isLoading: boolean;
    error: Error | null;
    onCreateTodo: (data: TodoFormData & { completed: boolean }) => void;
    onUpdateTodo: (id: string, data: TodoUpdateData) => void;
    onDeleteTodo: (id: string) => void;
    isCreatePending: boolean;
    isUpdatePending: boolean;
}

export default function TodoList({
    todos,
    isLoading,
    error,
    onCreateTodo,
    onUpdateTodo,
    onDeleteTodo,
    isCreatePending,
    isUpdatePending
}: TodoListProps) {
    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [editingTodo, setEditingTodo] = useState<string | null>(null);


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error.message} />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Add Todo Button */}
            <div className="mb-6 text-center">
                <button
                    onClick={() => setIsAddingTodo(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Todo
                </button>
            </div>

            {/* Add Todo Form */}
            {isAddingTodo && (
                <AddTodoForm
                    onSubmit={(data) => {
                        onCreateTodo({
                            ...data,
                            completed: false,
                        });
                        setIsAddingTodo(false);
                    }}
                    onCancel={() => setIsAddingTodo(false)}
                    isLoading={isCreatePending}
                />
            )}

            {/* Todos List */}
            <div className="space-y-4">
                {todos?.map((todo: TodoApiResponse) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onEdit={() => setEditingTodo(todo.id)}
                        onDelete={() => onDeleteTodo(todo.id)}
                        onToggleComplete={(completed) =>
                            onUpdateTodo(todo.id, { completed })
                        }
                        isEditing={editingTodo === todo.id}
                        onSaveEdit={(data) =>
                            onUpdateTodo(todo.id, data)
                        }
                        onCancelEdit={() => setEditingTodo(null)}
                        isLoading={isUpdatePending}
                    />
                ))}
            </div>

            {/* Empty State */}
            {todos?.length === 0 && <EmptyState />}
        </div>
    );
}
