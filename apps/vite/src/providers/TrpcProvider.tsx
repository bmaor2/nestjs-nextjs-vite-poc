import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { TRPC } from '../trpc/client';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        TRPC.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000/trpc',
                }),
            ],
        })
    );

    return (
        <TRPC.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </TRPC.Provider>
    );
}
