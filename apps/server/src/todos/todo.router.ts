import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { TodoService } from './todo.service';
import z from 'zod';
import {
  createTodoSchema,
  todoSchema,
  type CreateTodo,
  type Todo,
} from './todo.schema';

@Router({ alias: 'todo' })
export class TodoRouter {
  constructor(private readonly todoService: TodoService) {}

  @Query({
    input: z.object({
      id: z.string(),
    }),
    output: todoSchema,
  })
  findById(@Input('id') id: string) {
    return this.todoService.findById(id);
  }

  @Query({
    output: z.array(todoSchema),
  })
  find() {
    return this.todoService.findAll();
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: todoSchema.partial(),
    }),
    output: todoSchema,
  })
  update(@Input('id') id: string, @Input('data') data: Partial<Todo>) {
    return this.todoService.update(id, data);
  }

  @Mutation({
    input: createTodoSchema,
    output: todoSchema,
  })
  create(@Input() todo: CreateTodo) {
    return this.todoService.create(todo);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: z.boolean(),
  })
  delete(@Input('id') id: string) {
    return this.todoService.delete(id);
  }
}
