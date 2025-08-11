import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.date().or(z.string().transform((val) => new Date(val))),
  createdAt: z.date().or(z.string().transform((val) => new Date(val))),
});

export const createTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateTodo = z.infer<typeof createTodoSchema>;
export type Todo = z.infer<typeof todoSchema>;
