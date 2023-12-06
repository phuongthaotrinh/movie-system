'use client';

import Menu from "@/layouts/admin/menu";
import {usePathname, useRouter} from "next/navigation";
import * as React from "react";
import {X} from "lucide-react";
import {Button} from "antd"

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const router = usePathname();
    const routerHistory = useRouter()
    const suffixes = ['admin', 'movies', 'movie-types', 'test', 'setting', 'price','seats','rooms', 'sliders'];

    const lastPart = React.useMemo(() => {
        const paths = router.split('/');
        return paths[paths.length - 1];
    }, [router]);
    const showNavbar = React.useMemo(() => suffixes.includes(lastPart), [suffixes, lastPart]);

    return (
        <>
            {!showNavbar ? (
                <div className="relative ">
                    <div className="fixed z-[11] top-0 right-0 bg-slate-200 h-14 text-black w-full ">
                        <div className="flex justify-end items-center h-full mr-5">
                            <Button type="dashed" onClick={() => routerHistory.push('/admin')}>
                                <X />
                            </Button>
                        </div>
                    </div>
                    <div className="relative min-h-screen h-auto top-10 sm:px-5 z-[2] mt-5">
                        {children}
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="h-12" >
                        <Menu/>
                    </div>
                    <div className="border-t">
                        <div className="main_page">
                            <div className="">
                                    <div className="min-h-screen h-auto py-6 lg:px-8" >
                                        {children}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}