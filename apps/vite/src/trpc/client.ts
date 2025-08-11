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

const getBaseUrl = () => {
  // In the browser, use relative URLs to go through the Vite proxy
  if (typeof window !== "undefined") return "";
  // For SSR, use the environment variable or fallback
  if (process.env.VITE_TRPC_URL) return process.env.VITE_TRPC_URL;
  return "http://localhost:3000";
};

export const trpcClient = TRPC.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
    }),
  ],
});
