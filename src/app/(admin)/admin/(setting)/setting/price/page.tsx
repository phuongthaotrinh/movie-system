"use client"
import {Form, Input, InputNumber, Table, Typography, Button,Divider, Radio} from 'antd';
import React, {useState} from 'react';
import {allDay} from "@/lib/data";
import {formatPrice} from "@/lib/utils";
import {HeaderPage} from "@/components/header-page/admin";

interface Item {
    key: string;
    name: string;
    day_time: number;
    night_time: number;
    midnight_time: number;
    sneak_show:number
}

const originData: Item[] = [];
for (const day of allDay) {
    originData.push({
        key: day.value,
        name: day.value,
        day_time: 30000,
        night_time: 31000,
        midnight_time: 29000,
        sneak_show:40000
    });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ?
        <InputNumber
            addonAfter="vnd"
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}

                </Form.Item>
            ) : (
                <>
                    {children}
                </>
            )}
        </td>
    );
};


const SettingPrice: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({name: '', day_time: 0, night_time: 0, ...record});
        setEditingKey(record.key);
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');

            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '15%',
            render:(_:any, record:Item) => <p className="font-semibold"> {record.name}</p>
        },
        {
            title: 'Suất chiếu sáng (trước 17:00)',
            dataIndex: 'day_time',
            editable: true,
            render: (_: any, record: Item) => <p>{formatPrice(record['day_time'], {
                currency: "VND",
                notation: 'standard'
            })}</p>
        },
        {
            title: 'Suất chiếu tối (sau 17:00)',
            dataIndex: 'night_time',
            editable: true,
            render: (_: any, record: Item) => <p>{formatPrice(record['night_time'], {
                currency: "VND",
                notation: 'standard'
            })}</p>
        },
        {
            title: 'Sau 22h',
            dataIndex: 'midnight_time',
            editable: true,
            render: (_: any, record: Item) => <p>{formatPrice(record['midnight_time'], {
                currency: "VND",
                notation: 'standard'
            })}</p>
        },
        {
            title: 'Suất chiếu sớm',
            dataIndex: 'sneak_show',
            editable: true,
            render: (_: any, record: Item) => <p>{formatPrice(record['sneak_show'], {
                currency: "VND",
                notation: 'standard'
            })}</p>
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'name' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = (value: string) => {
        const output = {
            price: data
        }
        console.log('onFinish:', output);
    };

    return (
        <>
            <HeaderPage pageName="Setting Price" pageDesc={"set-up price"} />
            <Form form={form} onFinish={onFinish}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,

                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{hideOnSinglePage: true}}

                />
                <Form.Item colon={false} className="mt-5">
                    <Button type="primary" htmlType="submit" style={{backgroundColor: "black"}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SettingPrice;