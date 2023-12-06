"use client";
import * as React from "react";
import {LoadingSpin} from "@/components/loading-spin"
import {HeaderPage} from "@/components/header-page/admin"
import {Card} from "antd";
import SlidersTableShell from "@/components/admin/sliders/sliders-shell"
import {useSliders} from "@/lib/hooks/use-sliders";

interface RoomsPageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default function SliderPage({
                                       searchParams,
                                   }: RoomsPageProps) {
    const {data, isPending} = useSliders();
    return (
        <>
            <HeaderPage pageName="Sliders" pageDesc="setting your sliders (carousel)"/>

            <Card>
                <SlidersTableShell data={data} pageCount={1} isPending={isPending}/>
            </Card>
        </>
    )
}