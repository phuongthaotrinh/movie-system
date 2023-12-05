

import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge";
import * as React from "react";
import {usePathname} from "next/navigation";
import * as z from "zod";
import { toast } from "sonner"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const convertTime = (minutes: number): string => {
    const hours: number = Math.floor(minutes / 60);
    const remainingMinutes: number = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};

interface UseNavigationProps {
    suffixes: string[];
}

export const useCheckInHome = ({suffixes}: UseNavigationProps) => {
    const pathname = usePathname();
    const lastPathName = React.useMemo(() => {
        const paths = pathname.split('/');
        return paths[paths.length - 1];
    }, [pathname]);

    const inHome = React.useMemo(() => suffixes.includes(lastPathName), [suffixes, lastPathName]);
    return {inHome}
}

export const returnPromise = () => {
    return new Promise((resolveOuter) => {
        resolveOuter(
            new Promise((resolveInner) => {
                setTimeout(resolveInner, 1000);
            }),
        );
    });
};


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}



export function catchError(err: unknown) {
    if (err instanceof z.ZodError) {
        const errors = err.issues.map((issue) => {
            return issue.message
        })
        return toast(errors.join("\n"))
    } else if (err instanceof Error) {
        return toast(err.message)
    } else {
        return toast("Something went wrong, please try again later.")
    }
}

export function formatDate(date: Date | string | number) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date))
}


export function formatPrice(
    price: number | string,
    options: {
        currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND"
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
    const { currency = "VND", notation = "compact" } = options

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency,
        notation,
    }).format(Number(price))
}

export function formatNumber(
    number: number | string,
    options: {
        decimals?: number
        style?: Intl.NumberFormatOptions["style"]
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
    const { decimals = 0, style = "decimal", notation = "standard" } = options

    return new Intl.NumberFormat("en-US", {
        style,
        notation,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Number(number))
}

