"use client";

import React, { PropsWithChildren } from 'react'
import { queryClient, TRPC, trpcClient } from '../trpc/client'
import { QueryClientProvider } from '@tanstack/react-query'

const TrpcProvider = ({ children }: PropsWithChildren) => {
    return (
        <TRPC.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </TRPC.Provider >
    )
}

export default TrpcProvider