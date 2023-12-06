"use client"

import * as React from "react"
import Link from "next/link"

import {cn} from "@/lib/utils";
import clsx from "clsx";
import {Icons} from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export function NavigationMenuDemo() {
    const [scrollY, setScrollY] = React.useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    console.log('scrollY',scrollY)

    return (
        <>

            <header
                className="sticky top-0 z-50 w-full border-b bg-white"


            >
                <div className="container flex h-14 items-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white">
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <Icons.logo className="h-6 w-6"/>
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed components built with Radix UI and
                                                        Tailwind CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/docs" title="Introduction">
                                            Re-usable components built using Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem href="/docs/installation" title="Installation">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                            Styles for headings, paragraphs, lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white">
                                    <ul className="grid w-[100vw] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">

                                        <ListItem
                                            key={'component.title'}
                                            title={'component.title'}
                                            href={'component.href'}
                                        >
                                            {'component.description'}
                                        </ListItem>

                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Documentation
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="relative">
                    <div className={clsx('subscribe absolute right-[90px] w-[250px] top-0 z-50 transition',{
                        'opacity-0': scrollY > 600
                    })} >
                        <aside className="connect text-xs font-semibold uppercase leading-2 text-center py-2.5 px-5">
                            <a href="#contact" data-scrolled-to="contact"
                               className="sign-up-link text-[#052c6f]">
                                <span>Subscribe to the newsletter</span>
                            </a>
                        </aside>
                    </div>
                </div>
            </header>


        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
