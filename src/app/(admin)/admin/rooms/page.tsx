"use client"

import {HeaderPage} from "@/components/header-page/admin";
import * as React from "react";
import {CardGeneral} from "@/components/admin/rooms/card-general"
import {Card} from "antd";
import {RoomsShell} from "@/components/admin/rooms/rooms-shell";


interface RoomsPageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default function ProductsPage({
                                         searchParams,
                                     }: RoomsPageProps) {


    return (
        <div className="space-y-6">
            <HeaderPage
                pageName="Rooms"
                pageDesc="Set-up your rooms"
                inHome={false}
            />

            <CardGeneral/>
            <Card>
                <RoomsShell data={[]} pageCount={1} />
            </Card>
        </div>
    )
}