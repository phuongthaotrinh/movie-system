"use client"

import * as React from "react"
import Link from "next/link"
import {DotsHorizontalIcon} from "@radix-ui/react-icons"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "sonner";
import {catchError, formatDate} from "@/lib/utils";
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTable} from "@/components/data-table"
import {DataTableColumnHeader} from "@/components/data-table/components/data-table-column-header"
import { useMovieTypes } from "@/lib/hooks/use-movie-type";

interface ProductsTableShellProps {
    data: any[]
    pageCount: number
}

export default function MovieTypesTableShell({
                                               data,
                                               pageCount,
                                           }: ProductsTableShellProps) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

    function deleteProductAction({id}: any) {

    }

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value: any) => {
                            table.toggleAllPageRowsSelected(!!value)
                            setSelectedRowIds((prev) =>
                                prev.length === data.length ? [] : data.map((row) => row.id)
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },

            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/movie-types/${id}`}>

                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "imdbId",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="imdbId" />
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("imdbId")}</div>,
            },
            {
                accessorKey: "createdAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Created At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                accessorKey: "updatedAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="updated At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label="Open menu"
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem >
                                <Link
                                    href={`/admin/movie-types/${row.original._id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <Link href={`/movies/${row.original._id}`}>Client view</Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={() => {
                                    startTransition(() => {
                                        row.toggleSelected(false)
                                        // @ts-ignore
                                        toast.promise((deleteProductAction({id: row.original.id})),
                                            {
                                                loading: "Deleting...",
                                                success: () => "Product deleted successfully.",
                                                error: (err: unknown) => catchError(err),
                                            }
                                        )
                                    })
                                }}
                                disabled={isPending}
                            >
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>


                ),
            },
        ],
        [data, isPending]
    )

    function deleteSelectedRows() {
        toast.promise(
            Promise.all(
                selectedRowIds.map((id) =>
                    deleteProductAction({
                        id,
                    })
                )
            ),
            {
                loading: "Deleting...",
                success: () => {
                    setSelectedRowIds([])
                    return "Products deleted successfully."
                },
                error: (err: unknown) => {
                    setSelectedRowIds([])
                    return catchError(err)
                },
            }
        )
    }


    return (
        <DataTable
            columns={columns}
            data={data}
            pageCount={pageCount}
            searchableColumns={[
                {
                    id: "name",
                    title: "name",
                },
            ]}
            newRowLink={`/admin/movie-types/create`}
            deleteRowsAction={() => void deleteSelectedRows()}
        />
    )
}
