"use client"

import * as React from "react";
import {Form, Button, Input, Switch, Space, Select} from "antd"
import UploadImage from "@/components/upload-file";
import {useMovies} from "@/lib/hooks/use-movies";
import {useRouter} from "next/navigation";
import {useCreateSlider} from "@/lib/hooks/use-sliders"

const positionSlider = [
    {name: 'left', value: 'left'},
    {name: 'center', value: 'center'},
    {name: 'right', value: 'right'}

]

export default function SlidersCreate() {
    const [form] = Form.useForm();
    const createFn = useCreateSlider()
    const [images, setImages] = React.useState([]);
    const {data, isPending} = useMovies();

    const onFinish = (values: any) => {
        values.images = images
        createFn(values);
        form.resetFields();
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <Form form={form} onFinish={onFinish} layout="vertical">
                <div className="container my-5">
                    <div className="mb-5">
                        <p className="capitalize font-semibold text-sm">Image</p>
                        <UploadImage
                            max={1}
                            hierarchy={false}
                            onRemove={(data: any) => {
                                setImages(images.filter((current) => current !== data))
                            }}
                            onChange={(data: any) => {
                                //@ts-ignore
                                setImages([...images, data])
                            }}
                            value={images}
                        />

                    </div>
                    <Form.Item name="name" label="name" className="custom_ant_label">
                        <Input placeholder="Doraemon image"/>
                    </Form.Item>
                    <Form.Item name="title" label="title" className="custom_ant_label">
                        <Input placeholder="Doraemon image"/>
                    </Form.Item>
                    <Form.Item name="url" label="url for:" className="custom_ant_label">
                        <Select placeholder="Your slider is backlink of:">
                            {data?.data &&
                                data?.data?.map((item: any, index: any) => (
                                    <Select.Option value={item._id}
                                                   key={`${item._id}.${item?.id}.${index}`}>
                                        {item?.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="position" label="position" className="custom_ant_label">
                        <Select placeholder="Your slider is backlink of:">
                            {
                                positionSlider?.map((item: any, index: any) => (
                                    <Select.Option value={item.value}
                                                   key={`${item.value}.${item?.value}.${index}`}>
                                        {item?.value}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="status" label="status" className="custom_ant_label">
                        <Switch/>
                    </Form.Item>
                    <Form.Item name="isInTheatersNow" label="IN THEATERS NOW" className="custom_ant_label">
                        <Switch/>
                    </Form.Item>
                    <Space>
                        <Form.Item colon={false} className="space-y-5">
                            <Button type="primary" htmlType="submit" style={{backgroundColor: "black"}}>
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item colon={false}>
                            <Button onClick={() => form.resetFields()}>Reset</Button>
                        </Form.Item>
                    </Space>

                </div>
            </Form>


            {/*<div>*/}
            {/*    <h1>Preview your sliders</h1>*/}
            {/*    <div className="preview  relative max-h-[550px] h-[550px]">*/}
            {/*        <img src={URL}*/}
            {/*             className=" absolute w-full max-h-full rounded-sm h-full   object-cover group-hover:hover:scale-75"/>*/}
            {/*        <div className="overlay"></div>*/}
            {/*        <div className="position_slider">*/}
            {/*            <main className={clsx(*/}
            {/*                'content absolute bottom-40 text-white border border-red-600 bg-transparent',*/}
            {/*                {*/}
            {/*                    'left-40': positionWatch == 'left',*/}
            {/*                    'right-40': positionWatch == 'right',*/}
            {/*                    'left-1/4': positionWatch == 'center' || !positionWatch*/}
            {/*                }*/}
            {/*            )}>*/}
            {/*                <div className="topline">*/}
            {/*                    {!isInTheatersNowWatch && (*/}
            {/*                        <p className="uppercas text-md">*/}
            {/*                            NEW EPISODE NOW STREAMING ON*/}
            {/*                            NETFLIX*/}
            {/*                        </p>*/}
            {/*                    )}*/}
            {/*                </div>*/}
            {/*                <a href="shows/gabbys-dollhouse" target="_self" data-stagger="fade-up 1" className="x-link">*/}
            {/*                    <h1*/}
            {/*                        className="title uppercase font-bold text-[3rem] ">*/}
            {/*                        <span>Gabby Dollhouse</span></h1></a>*/}
            {/*                <ul className="actions">*/}
            {/*                    <li data-stagger="fade-up 2" className="action">*/}
            {/*                        <a href="shows/gabbys-dollhouse"*/}
            {/*                           target="_self"*/}
            {/*                           data-site="Gabby's Dollhouse"*/}
            {/*                           className="link"><span>Official site</span></a>*/}
            {/*                    </li>*/}
            {/*                    <li data-stagger="fade-up 3" className="action">*/}
            {/*                        <div data-trailer="Gabby's Dollhouse" className="link"><span></span>*/}
            {/*                            <span>Watch Video</span></div>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </main>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

