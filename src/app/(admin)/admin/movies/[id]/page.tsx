"use client";

import {Form, Input, Card, Button, Collapse, InputNumber, Select, DatePicker, Switch} from "antd";
import type {DatePickerProps} from 'antd';
import {MovieCountry, MovieLimitAge, MovieStatus, MoviLanguages} from "@/lib/data/movie";
import {toast} from "sonner";
import React from "react";
import http from "@/config/http";
import {catchError, convertTime} from "@/lib/utils"
import Chips from "@/components/chips"
import UploadImage from "@/components/upload-file";
import FormMoviesCreateSkeleton from "@/components/skeleton/form-movies-create"
import Link from "next/link";
import {Youtube} from "lucide-react";
import moment from "moment";
import {useCreateMovie, useEditMovie} from "@/lib/hooks/use-movies"
import {useMovieTypes} from "@/lib/hooks/use-movie-type";
import { useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query"
import {movieApi} from "@/lib/hooks/use-movies"

export default function CreatePage() {
    const [pending, startTransition] = React.useTransition();
    const [form] = Form.useForm();
    const [actors, setActors] = React.useState([]);
    const [director, setDirector] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [formState, setFormState] = React.useState<any>()

    const {id} = useParams();

    const watchRunTime = convertTime(Form.useWatch('runTime', form));
    const trailerWatch = Form.useWatch('trailerUrl', form);

    const {data: movieTypes} = useMovieTypes();
    const updateMovie = useEditMovie();
    const detailQuery = useQuery({
        queryKey: ['movies', id],
        queryFn: async () => await movieApi.get_one(String(id)),
        enabled: id !== undefined,
        staleTime: 1000 * 10,
    })

    React.useEffect(() => {
        if (id && detailQuery.data) {
            const result = detailQuery.data.data.movie
            setFormState(result)
        }
    }, [id, detailQuery.data]);


    React.useEffect(() => {
        if (formState) {
            setActors(formState?.actor);
            setDirector(formState?.director);
            setImages(formState?.image?.map((item: any) => item?.url));
            form.setFieldsValue({
                ...formState,
                image: images,
                movieTypeId: formState?.movieTypeId?.map((item: any) => item?._id),
                releaseDate: moment(formState.releaseDate),
            })
        }
    }, [formState])


    const onFinish2 = (values: any) => {
        values.image = images;
        values.actor = actors;
        values.director = director;
        values.movieTypeId = movieTypes && movieTypes.data?.filter((item: any) => values.movieTypeId.includes(item._id));
        values._id = id;
        updateMovie.mutate(values);
    }

    const handleReset = () => {
        setImages([]);
        setDirector([]);
        setActors([]);
        form.resetFields();
    }

    const handleDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };


    return (
        <div className="grid gap-6 pt-5">
            <div>
                {!pending ? (
                    <Form form={form} name="form2" onFinish={onFinish2} layout="vertical"
                    >
                        <div className="w-full flex gap-3 justify-end">
                            <Form.Item>
                                <Button htmlType="submit" type="primary" loading={pending}
                                        className="bg-black block">Submit</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="button" type="default" loading={pending}
                                        className="block" onClick={handleReset}>Reset</Button>
                            </Form.Item>
                        </div>

                        <Collapse defaultActiveKey={['1', '2']} items={[
                            {
                                key: '1',
                                label: <div className="text-lg font-semibold">MEDIA</div>,
                                children: (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-6 col-span-1 ">
                                            <Card>
                                                <div>
                                                    <UploadImage
                                                        max={10}
                                                        hierarchy={true}
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
                                                <div>
                                                    <Form.Item name="trailerUrl" label="Trailer URL"
                                                               className="custom_ant_label">
                                                        <Input placeholder="www.youtube.yoursite"/>
                                                    </Form.Item>


                                                    <div>
                                                        {trailerWatch && <Link href={trailerWatch}
                                                                               className="flex items-center">
                                                            <Youtube
                                                                className="w-4 h-4 mr-1"/><span>Youtube</span>
                                                        </Link>}
                                                    </div>
                                                </div>
                                            </Card>


                                        </div>
                                        <div className="col-span-1">
                                            <Card>
                                                <Form.Item name="releaseDate" label="Release Day"
                                                           className="custom_ant_label">
                                                    <DatePicker onChange={handleDatePicker}/>
                                                </Form.Item>
                                                <Card className="w-full">


                                                    <Form.Item name="status" label="status"
                                                               className="custom_ant_label">
                                                                <Select placeholder="Select country">
                                                                    {MovieStatus.map((item, index:any) => (
                                                                        <Select.Option value={item.stt} key={index}>
                                                                           {item.name}
                                                                        </Select.Option>
                                                                    ))}
                                                                </Select>
                                                    </Form.Item>
                                                </Card>
                                            </Card>
                                        </div>
                                    </div>
                                ),

                            },
                            {
                                key: '2',
                                label: <div className="text-lg font-semibold">Basic Infomation</div>,
                                children: (
                                    <Card>
                                        <div className="grid_col2_gap3">
                                            <Form.Item name="name" label="movie name" className="custom_ant_label">
                                                <Input placeholder="Doraemon ep 1"/>
                                            </Form.Item>
                                            <Form.Item name="slug" label="Slug" tooltip="optional"
                                                       className="custom_ant_label">
                                                <Input placeholder="doraemon-ep-1"/>
                                            </Form.Item>
                                        </div>
                                        <div className="grid_col2_gap3">
                                            <Form.Item name="runTime" label="Run Time (by minutes)"
                                                       className="custom_ant_label">
                                                <InputNumber className="w-full" placeholder="161"/>

                                            </Form.Item>
                                            <Form.Item label="Run Time (by hour)" className="custom_ant_label">
                                                <Input value={watchRunTime} placeholder={"1h 1m"}/>
                                            </Form.Item>
                                        </div>
                                        <div className="grid_col2_gap3">
                                            <Form.Item name="ageLimit" label="ageLimit" className="custom_ant_label">
                                                <Select placeholder="Select ageLimit">
                                                    {MovieLimitAge.map((item) => (
                                                        <Select.Option value={item.name} key={item.name}>
                                                            ({item.name})- {item.desc}
                                                        </Select.Option>
                                                    ))}

                                                </Select>
                                            </Form.Item>
                                            <Form.Item name="country" label="country" className="custom_ant_label">
                                                <Select placeholder="Select country">
                                                    {MovieCountry.map((item) => (
                                                        <Select.Option value={item.name} key={item.original_language}>
                                                            ({item.original_language})-{item.name}
                                                        </Select.Option>
                                                    ))}

                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className="grid_col2_gap3">
                                            <Form.Item name="languages" label="Languages" className="custom_ant_label">
                                                <Select placeholder="Select MoviLanguages">
                                                    {MoviLanguages.map((item) => (
                                                        <Select.Option value={item.name} key={item.name}>
                                                            ({item.name})
                                                        </Select.Option>
                                                    ))}

                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="movieTypeId" name="movieTypeId"
                                                       className="custom_ant_label">
                                                <Select mode="multiple">
                                                    {movieTypes?.data &&
                                                        movieTypes?.data?.map((item: any, index: any) => (
                                                            <Select.Option value={item._id}
                                                                           key={`${item._id}.${item?.id}.${index}`}>
                                                                {item?.name}
                                                            </Select.Option>
                                                        ))}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item name="description" label="description"
                                                       className="w-full custom_ant_label">
                                                <Input.TextArea placeholder="Lorem"/>
                                            </Form.Item>
                                        </div>
                                    </Card>
                                ),

                            },
                            {
                                key: '3',
                                label: <div className="text-lg font-semibold">Casts & Crews</div>,
                                children: (
                                    <Card>
                                        <div>
                                            <Form.Item name="actor" label="actors" className="custom_ant_label">
                                                <Chips chips={actors}
                                                       key="actor"
                                                       placeholder="add actors name ..."
                                                       onChange={(data: string) => {
                                                           // @ts-ignore
                                                           setActors([...actors, data])
                                                       }}
                                                       onRemove={(data: any) => {
                                                           console.log('onRemove chips', data);
                                                           setActors(actors.filter((current) => current !== data))
                                                       }}
                                                />
                                            </Form.Item>

                                            <Form.Item name="director" label="directors" className="custom_ant_label">
                                                <Chips chips={director}
                                                       key="director"
                                                       placeholder="add crews name ..."
                                                       onChange={(data: string) => {
                                                           // @ts-ignore
                                                           setDirector([...director, data])
                                                       }}
                                                       onRemove={(data: any) => {
                                                           setDirector(director.filter((current) => current !== data))
                                                       }}
                                                />
                                            </Form.Item>
                                        </div>

                                    </Card>
                                )
                            }
                        ]}>

                        </Collapse>


                    </Form>

                ) : (
                    <>
                        <div className="min-h-screen">
                            <FormMoviesCreateSkeleton/>
                        </div>
                    </>
                )}


            </div>
        </div>
    )
}

