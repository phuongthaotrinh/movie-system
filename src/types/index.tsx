import * as z from "zod"

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: any
    label?: string
    description?: string
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export interface FooterItem {
    title: string
    items: {
        title: string
        href: string
        external?: boolean
    }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}
export interface DataTableSearchableColumn<TData> {
    id: keyof TData
    title: string
}
export interface DataTableFilterableColumn<TData>
    extends DataTableSearchableColumn<TData> {
    options: Option[]
}
export const userPrivateMetadataSchema = z.object({
    role: z.enum(["user", "admin", "super_admin"]),
    stripePriceId: z.string().optional().nullable(),
    stripeSubscriptionId: z.string().optional().nullable(),
    stripeCustomerId: z.string().optional().nullable(),
    stripeCurrentPeriodEnd: z.string().optional().nullable(),
})

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>
