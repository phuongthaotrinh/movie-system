"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    const routes = [
        {
            href: `/admin`,
            label: "Overview",
            active: pathname === `/admin`,
        },
        {
            href: `/admin/movies`,
            label: "Movies",
            active: pathname === `/admin/movies`,
        },
        {
            href: `/admin/movie-types`,
            label: "Genres",
            active: pathname === `/admin/movie-types`,
        },
        {
            href: `/admin/rooms`,
            label: "Rooms",
            active: pathname === `/admin/rooms`,
        },
        {
            href: `/admin/setting`,
            label: "Setting",
            active: pathname === `/admin/setting`,
        },
        {
            href: `/admin/sliders`,
            label: "Sliders",
            active: pathname === `/admin/sliders`,
        },

    ];
    return (
        <nav className={cn("flex item-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-gray-400 dark:text-white"
                            : "text-black "
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
