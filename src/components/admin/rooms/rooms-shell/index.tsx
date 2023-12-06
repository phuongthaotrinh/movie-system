'use client';

import * as React from "react";
import {useMovieTypes} from "@/lib/hooks/use-movie-type";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table/components/data-table-column-header";
import Link from "next/link";
import {catchError, convertTime, formatDate} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Eye} from "lucide-react";
import {toast} from "sonner";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {IImage} from "@/components/admin/movies/movies-shell";
import {DataTable} from "@/components/data-table";
import {MovieStatus} from "@/lib/data/movie";

interface RoomsShellProps {
    data: any[]
    pageCount: number
}

export  function RoomsShell({data,pageCount}:RoomsShellProps) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [open,setOpen] = React.useState<boolean>(false);
    const movieTypes = useMovieTypes()
    function deleteProductAction({id}: any) {

    }

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
                accessorKey: "image",
                header: () => {
                    return (<p>thumbnail</p>)
                },
                cell: ({row}) => {
                    return (
                        <>
                            <img style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                 src={row.getValue('image') && (row.getValue('image') as IImage).length > 0 ? (row.getValue('image') as IImage)[0]['url'] : ""}
                                 alt="thumbnail"/>
                        </>
                    )
                }
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
                            <Link href={`/admin/movies/${id}`}>

                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "profit",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="Profit" />
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("profit")} vnd</div>,
            },
            {
                accessorKey: "runTime",
                header: () => {
                    return (
                        <p>RunTime</p>
                    )
                },
                cell: ({row}) => <div>{convertTime(row.getValue("runTime"))}</div>,
            },{
                accessorKey: "country",
                header: () => {
                    return (
                        <p>Quốc gia</p>
                    )
                },
                cell: ({row}) => <div>{row.getValue("country")}</div>,
            },
            {
                accessorKey: "movieTypeId",
                header: ({column}) => (
                    <p>movieTypeId</p>
                ),
                cell: ({cell}) => {
                    const movieTypeIdCell = cell.getValue() as any
                    return (
                        <>
                            {movieTypeIdCell && movieTypeIdCell.map((item: { _id: string, name: string }) => <p
                                key={item._id}>{item.name}</p>)}
                        </>
                    )
                }
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("status") === "0" ? "Phim sắp chiếu" : row.getValue("status") === "1" ? "Phim đang chiếu " : "Phim ngừng chiếu "}</div>,
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
                                    href={`/admin/movies/${row.original._id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <Link href={`/movies/${row.original._id}`}>Client view</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setOpen(true)}
                            >
                                <Eye className="h-4 w-4 mr-1"/>
                                <span> Quick Preview</span>
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
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"} id="SheetContent">
                                {/* <MovieInfo payment={row.original}/> */}
                                MovieInfo
                            </SheetContent>
                        </Sheet>
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
            newRowLink={`/admin/movies/create`}
            deleteRowsAction={() => void deleteSelectedRows()}
        />
    )
}