'use client';

import { useState } from 'react';
import { TodoApiResponse, TodoUpdateData } from '../types/todo';

interface TodoItemProps {
    todo: TodoApiResponse;
    onEdit: () => void;
    onDelete: () => void;
    onToggleComplete: (completed: boolean) => void;
    isEditing: boolean;
    onSaveEdit: (data: TodoUpdateData) => void;
    onCancelEdit: () => void;
    isLoading: boolean;
}

export default function TodoItem({
    todo,
    onEdit,
    onDelete,
    onToggleComplete,
    isEditing,
    onSaveEdit,
    onCancelEdit,
    isLoading
}: TodoItemProps) {
    const [editData, setEditData] = useState({
        name: todo.name || '',
        description: todo.description || '',
        priority: (todo.priority as 'low' | 'medium' | 'high') || 'medium',
        dueDate: todo.dueDate && todo.dueDate !== '' ? new Date(todo.dueDate) : new Date(),
    });

    const handleSave = () => {
        onSaveEdit({
            ...editData,
            dueDate: editData.dueDate,
        });
    };

    const priorityColors: Record<string, string> = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800',
    };

    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    if (isEditing) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={editData.priority}
                                onChange={(e) => setEditData({ ...editData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                                type="date"
                                value={editData.dueDate.toISOString().split('T')[0]}
                                onChange={(e) => setEditData({ ...editData, dueDate: new Date(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={onCancelEdit}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading || !editData.name.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 transition-all duration-200 ${todo.completed
            ? 'border-green-500 opacity-75'
            : isOverdue
                ? 'border-red-500'
                : 'border-blue-500'
            }`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <input
                            type="checkbox"
                            checked={todo.completed || false}
                            onChange={(e) => onToggleComplete(e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}>
                            {todo.name}
                        </h3>
                        {todo.priority && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[todo.priority] || priorityColors.medium}`}>
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                            </span>
                        )}
                        {isOverdue && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                Overdue
                            </span>
                        )}
                    </div>

                    {todo.description && (
                        <p className={`text-gray-600 mb-3 ${todo.completed ? 'line-through' : ''
                            }`}>
                            {todo.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        {todo.dueDate && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                        )}
                        {todo.createdAt && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Created: {new Date(todo.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                    <button
                        onClick={onEdit}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                        title="Edit todo"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                        title="Delete todo"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
