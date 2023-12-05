"use client";

import React from 'react';
import {Button, Form, Input, Select, Switch, Card, Typography} from 'antd';
import {X} from "lucide-react"
import {HeaderPage} from "@/components/header-page/admin";


export default function SettingStore() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <HeaderPage pageDesc="Edit your store" pageName="Setting Store"/>
            <Card>
                <Form
                    name="complex-form"
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                >
                    <div className="grid grid-cols-2 gap-6 space-y-5">
                        <div className="mt-5">

                            <Form.Item
                                label="Store name"
                                name="name"
                                className="custom_ant_label"
                                rules={[{required: true, message: 'Username is required'}]}
                            >
                                <Input placeholder="Please input"/>
                            </Form.Item>


                            <Form.Item label="Store phone"
                                       name="phone"
                                       className="custom_ant_label"
                                       rules={[{required: true, message: 'phonenumber is required'}]}
                            >
                                <Input placeholder="Please input"/>
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Store address"
                                className="custom_ant_label"
                                rules={[{required: true, message: 'address is required'}]}
                            >
                                <Input placeholder="Please address"/>
                            </Form.Item>
                            <Card bodyStyle={{padding: 5, borderStyle: 'none'}}>
                                <Form.Item name="status" label="Store status" valuePropName="checked"
                                           className="custom_ant_label">
                                    <Switch/>
                                </Form.Item>

                            </Card>
                        </div>
                        <div>
                            <Card>
                                <label className="pb-2 block capitalize font-semibold text-sm">Social</label>
                                <Form.List name="socials">
                                    {(fields, {add, remove}) => (
                                        <div style={{display: 'flex', rowGap: 16, flexDirection: 'column'}}>
                                            {fields.map((field) => {
                                                    return (
                                                        <Card
                                                            bodyStyle={{padding: 10,}}
                                                            size="small"
                                                            title={`Item ${field.name + 1}`}
                                                            key={field.key}
                                                            extra={
                                                                <X
                                                                    onClick={() => {
                                                                        remove(field.name);
                                                                    }}
                                                                />
                                                            }
                                                        >
                                                            <Form.Item label="Name" className="custom_ant_label"
                                                                       name={[field.name, 'name']}>
                                                                <Input placeholder="facebook..."/>
                                                            </Form.Item>

                                                            {/* Nest Form.List */}
                                                            <Form.Item label="Social value" className="custom_ant_label">
                                                                <Form.List name={[field.name, 'values']}>
                                                                    {(subFields, subOpt) => (
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            rowGap: 16
                                                                        }}>
                                                                            {subFields.map((subField) => (
                                                                                <div key={subField.key}
                                                                                     className="flex gap-x-2">
                                                                                    <Form.Item noStyle
                                                                                               name={[subField.name, 'value']}>
                                                                                        <Input
                                                                                            placeholder="https://www.facebook.yourstoresite.com"/>
                                                                                    </Form.Item>
                                                                                    <X
                                                                                        onClick={() => {
                                                                                            subOpt.remove(subField.name);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            ))}
                                                                            <Button type="dashed"
                                                                                    onClick={() => subOpt.add()}
                                                                                    block>
                                                                                +
                                                                                Add <b>{` Item ${field.name + 1}`}</b> value
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </Form.List>
                                                            </Form.Item>
                                                        </Card>
                                                    )
                                                }
                                            )
                                            }
                                            <Button type="dashed" onClick={() => add()} block>
                                                + Add Social
                                            </Button>
                                        </div>
                                    )}
                                </Form.List>
                            </Card>
                        </div>
                    </div>
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>
                    <Form.Item label=" " colon={false} className="space-y-5">
                        <Button type="primary" htmlType="submit" style={{backgroundColor: "black"}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>


            </Card>
        </>
    )
}