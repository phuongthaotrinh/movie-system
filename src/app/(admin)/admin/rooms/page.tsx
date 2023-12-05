"use client"

import {HeaderPage} from "@/components/header-page/admin";
import * as React from "react";
import { Card, Space } from 'antd';



import {Armchair, CircleDollarSignIcon} from "lucide-react"
// import {Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent} from "@/components/ui/ca"
import Link from "next/link";
import {Button} from "@/components/ui/button"


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

            <Space direction="vertical" style={{ display: 'flex' }}>
                <Card size="small" className="border border-slate-200" hoverable title="Default size card" extra={<a href="#">More</a>} >

                </Card>
                <Card size="small" hoverable title="Small size card" extra={<a href="#">More</a>} >

                </Card>
            </Space>
        </div>
    )
}