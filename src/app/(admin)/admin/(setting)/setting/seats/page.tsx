'use client';
import {Button, Form, Input, InputNumber, ColorPicker, Table,Card} from 'antd';
import React, {useState, useTransition} from "react";
import {HeaderPage} from "@/components/header-page/admin";
import type {ColumnsType} from 'antd/es/table';
import {useSeats, createSeats} from "@/lib/hooks/use-seats";
import {toast} from "sonner";
import { useRouter } from 'next/navigation';
import {Settings2} from "lucide-react";


export default function SetupSeat() {
    const [form] = Form.useForm();
    const router = useRouter()
    const [_, startTransition] = useTransition()
    const {seats, reloadFn} = useSeats();
    const [mode, setMode] = useState<string> ("")

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: "name",
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'color',
            dataIndex: 'color',
            render: (_: any, record: any) => {
                return (
                    <><ColorPicker showText disabled value={record.color.metaColor}/></>
                )
            }
        },
        {
            title: 'desc',
            dataIndex: 'desc',
            render:(_:any, {desc}: any) =>{
                return (
                    <p className="text-sm text-muted-foreground">{desc}</p>
                )
            }
        },
        {
            title: 'Action',
            render: (_:any, record:any) => {
                return (
                    <div className="flex items-center cursor-pointer hover:text-red-600" onClick={() =>handleEdit(record)}><Settings2 className='w-4 h-4'/>Edit </div>
                )
            }
        }
    ];


    const  handleEdit = (values:any) => {
        setMode("edit");
        toast.info(`Edit seat's name: ${values.name}`)
        form.setFieldsValue({
            ...values,
            color: values.color.metaColor
        })
    }



    const onFinish = (values: any) => {
        values.key = values.name
        console.log('onFinish',onFinish)
        if(mode === "edit") {
            toast.info('Edit ')
        }else{
            startTransition(() => {
                toast.promise(createSeats(values), {
                    loading: "Creating....",
                    success: () => {
                        router.refresh();
                        reloadFn();
                        form.resetFields()
                        return `Data has been added`;
                    },
                    error: "fail"
                })
            })
        }
    }
    // @ts-ignore
    const dataSource = seats?.map((item: ISeats) => ({
        key: item._id,
        ...item
    })) || [];
    return (
        <>
            <HeaderPage
                pageName="Seats"
                pageDesc="setup your seats"
            />
            <div className="grid grid-cols-3 gap-6 space-y-6">
                <div className="mt-6 col-span-2 ">
                    <Card>
                        <Table columns={columns} dataSource={dataSource} size="middle"
                               pagination={{hideOnSinglePage: true}}/>
                    </Card>
                </div>
                <div className="">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            'color': null,
                        }}
                    >
                        <Form.Item label="Tên" name="name">
                            <Input placeholder="enter name"/>

                        </Form.Item>
                        <Form.Item label="Price" name="price">
                            <InputNumber
                                style={{width: '100%'}}
                                prefix="vnd"
                                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}/>
                        </Form.Item>

                        <Form.Item
                            name="color"
                            label="Color"
                            rules={[{required: true, message: 'color is required!'}]}
                        >
                            <ColorPicker showText/>
                        </Form.Item>

                        <Form.Item label="Desciption" name="desc">
                            <Input.TextArea/>

                        </Form.Item>
                        <Form.Item colon={false} className="mt-5">
                            <Button type="primary" htmlType="submit" style={{backgroundColor: "black", marginRight: 2}}>
                                Submit
                            </Button>
                            <Button type="primary" htmlType="button" style={{backgroundColor: "black"}} onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    )
}