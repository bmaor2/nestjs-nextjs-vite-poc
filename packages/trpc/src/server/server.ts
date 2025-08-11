import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    findById: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      dueDate: z.date().or(z.string().transform((val) => new Date(val))),
      createdAt: z.date().or(z.string().transform((val) => new Date(val))),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    find: publicProcedure.output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      dueDate: z.date().or(z.string().transform((val) => new Date(val))),
      createdAt: z.date().or(z.string().transform((val) => new Date(val))),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    update: publicProcedure.input(z.object({
      id: z.string(),
      data: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        dueDate: z.date().or(z.string().transform((val) => new Date(val))),
        createdAt: z.date().or(z.string().transform((val) => new Date(val))),
      }).partial(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      dueDate: z.date().or(z.string().transform((val) => new Date(val))),
      createdAt: z.date().or(z.string().transform((val) => new Date(val))),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    create: publicProcedure.input(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      dueDate: z.date().or(z.string().transform((val) => new Date(val))),
      createdAt: z.date().or(z.string().transform((val) => new Date(val))),
    }).omit({
      id: true,
      createdAt: true,
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      dueDate: z.date().or(z.string().transform((val) => new Date(val))),
      createdAt: z.date().or(z.string().transform((val) => new Date(val))),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

