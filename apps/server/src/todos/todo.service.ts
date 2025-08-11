import { Injectable } from '@nestjs/common';
import { CreateTodo, Todo } from './todo.schema';
import { TRPCError } from '@trpc/server';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findById(id: string) {
    const product = this.todos.find((product) => product.id === id);
    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Todo task with id: '${id}' was not found.`,
      });
    }
    return product;
  }

  findAll() {
    return this.todos;
  }

  update(id: string, data: Partial<Todo>) {
    const index = this.todos.findIndex(({ id: productId }) => productId === id);
    if (index === -1) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Todo task with id: '${id}' was not found.`,
      });
    }
    this.todos[index] = { ...this.todos[index], ...data };

    return this.todos[index];
  }

  create(todo: CreateTodo) {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  delete(id: string) {
    const index = this.todos.findIndex(({ id: productId }) => productId === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}
