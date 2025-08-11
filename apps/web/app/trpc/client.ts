import {
  type CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type { AppRouter } from "@repo/trpc";
import { QueryClient } from "@tanstack/react-query";

export const TRPC: CreateTRPCReact<AppRouter, object> = createTRPCReact<
  AppRouter,
  object
>();

export const queryClient = new QueryClient();

console.log(
  "process.env.NEXT_PUBLIC_TRPC_URL!: ",
  process.env.NEXT_PUBLIC_TRPC_URL!
);
export const trpcClient = TRPC.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL!,
    }),
  ],
});
