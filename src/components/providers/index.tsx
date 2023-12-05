'use client';
import { ConfigProvider } from 'antd';
import * as React from "react"
import { Toaster } from 'sonner';
import theme from '@/config/ant-theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';


export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <>

            <div className="min-h-screen">
                <QueryClientProvider client={queryClient}>
                    <ConfigProvider
                        theme={theme}>
                        {children}
                        <Toaster position="top-right" />
                    </ConfigProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </div>

        </>
    )
}