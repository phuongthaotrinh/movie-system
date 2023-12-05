"use client";


import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Store, Coins, Armchair} from "lucide-react";


export default function SettingsDefaultLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const routes = [
        {
            href: `/admin/setting`,
            label: "Store",
            icon: <Store className="w-4 h-4 mr-2"/>,
            active: pathname === `/admin/setting`,
        },
        {
            href: `/admin/setting/price`,
            label: "Price",
            icon: <Coins className="w-4 h-4 mr-2"/>,
            active: pathname === `/admin/setting/setup/price`,
        },
        {
            href: `/admin/setting/seats`,
            label: "Seats",
            icon: <Armchair className="w-4 h-4 mr-2"/>,
            active: pathname === `/admin/setting/setup/seats`,
        }

    ];
    return (
        <>
            <div className="w-full flex gap-6 min-h-screen">
                <aside className="lg:w-1/5">
                    <nav
                        className={cn(
                            "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
                        )}
                    >
                        {routes.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    buttonVariants({variant: "ghost"}),
                                    pathname === item.href
                                        ? "bg-slate-300 hover:bg-muted"
                                        : "hover:bg-transparent hover:underline",
                                    "justify-start"
                                )}
                            >
                                <div className="flex items-center gap-x-3">
                                    <div>{item.icon} </div>
                                    <div>{item.label}  </div>
                                </div>

                            </Link>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1  w-auto border-l-slate-400">
                    <div className="px-2">
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}


