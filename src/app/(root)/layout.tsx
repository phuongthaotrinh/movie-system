'use client';

import {NavigationMenuDemo} from "@/layouts/root/header";
export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <NavigationMenuDemo/>
            <div className="min-h-screen h-auto relative" >
                  {children}
            </div>
        </>
    )
}