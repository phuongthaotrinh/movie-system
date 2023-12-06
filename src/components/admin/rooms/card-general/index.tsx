import {Card} from "antd";
import {Armchair, CircleDollarSignIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";


export  function CardGeneral() {
        return (
            <div className="grid grid-cols-2 gap-6">
                <Card size="small"
                      className="border border-slate-200"
                      hoverable
                      title={<div className="text-lg font-semibold flex items-center gap-4">Check your ticket price
                          settings.<CircleDollarSignIcon className="text-slate-500 w-4 h-4"/></div>}
                      extra={<CircleDollarSignIcon/>}>
                    <div className="desc my-3">
                        Manage ticket prices in your store with price settings based on each time frame and day.
                    </div>
                    <div>
                        <Button>
                            <Link href="/admin/setting/price">Go to setting Price</Link>
                        </Button>
                    </div>
                </Card>
                <Card size="small"
                      className="border border-slate-200"
                      hoverable
                      title={<div className="text-lg font-semibold flex items-center gap-4">Check your ticket seats
                          types
                          settings.<Armchair className="text-slate-500 w-4 h-4"/></div>}
                      extra={<Armchair/>}>
                    <div className="desc my-3">
                        Manage various types of seats so that you can easily set up screening rooms.
                    </div>
                    <div>
                        <Button>
                            <Link href="/admin/setting/seats">Go to setting Seats</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        )
}