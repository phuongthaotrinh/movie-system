"use client";

import {LoadingSpin} from "@/components/loading-spin"

import {Card, Collapse, Form,Skeleton} from "antd";
import React from "react";

export default function FormMoviesCreateSkeleton() {


    return (
        <>
            <div>
                {/*<Space>*/}
                {/*    <Skeleton.Button active shape={"default"} block />*/}
                {/*    <Skeleton.Avatar active size={"default"} shape={"square"} />*/}
                {/*    <Skeleton.Input active size={"default"}/>*/}
                {/*</Space>*/}

                <div>
                    <Form layout="vertical"
                    >
                        <Collapse defaultActiveKey={['1', '2', '3']} items={[
                            {
                                key: '1',
                                label: <div className="text-lg font-semibold">MEDIA</div>,
                                children: (
                                    <div className="space-y-3">
                                        <div>
                                            <h1 className="text-lg font-semibold ">Thumbnail</h1>
                                            <p className="text-sm text-muted-foreground">Thumbnail</p>
                                            <Skeleton.Image active/>
                                        </div>
                                      <div className="space-x-3">
                                          <h1 className="text-lg font-semibold ">Media</h1>
                                          <p className="text-sm text-muted-foreground">Media</p>
                                          <Skeleton.Image active/>
                                          <Skeleton.Image active/>
                                          <Skeleton.Image active/>
                                      </div>
                                    </div>
                                ),

                            },
                            {
                                key: '2',
                                label: <div className="text-lg font-semibold">Basic Infomation</div>,
                                children: (
                                    <Card>
                                        <div className="space-y-3">
                                            <div className="grid_col2_gap3 ">
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                            </div>
                                            <div className="grid_col2_gap3">
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                            </div>
                                            <div className="grid_col2_gap3">
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                            </div>

                                            <div className="grid_col2_gap3">
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                                <Skeleton.Input active={true} size={'large'} block={true}/>
                                            </div>
                                            <div>
                                                <Skeleton.Input active={true} size={'large'} block={true}/>

                                            </div>
                                        </div>
                                    </Card>
                                ),

                            },
                            {
                                key: '3',
                                label: <div className="text-lg font-semibold">Casts & Crews</div>,
                                children: (
                                    <Card>
                                        <div className="space-y-3">
                                            <Skeleton.Input active={true} size={'large'} block={true}/>
                                            <Skeleton.Input active={true} size={'large'} block={true}/>

                                        </div>

                                    </Card>
                                )
                            }
                        ]}>

                        </Collapse>


                    </Form>
                </div>
            </div>
        </>
    );
}