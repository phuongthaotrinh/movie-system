"use client";


import * as React from "react";
import {CldUploadButton} from 'next-cloudinary';
import {Button} from "@/components/ui/button";
import {CldUploadWidget} from "next-cloudinary";
import {ImagePlus, Trash} from "lucide-react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import {ScrollArea,ScrollBar } from "@/components/ui/scroll-area"

interface ImageUploadProps {
    disabled?: boolean;
    max: number;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    hierarchy: boolean
}

export default function UploadImage({disabled, onChange, onRemove, value, max, hierarchy}: ImageUploadProps) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false)
    const [urlMount, setUrlMount] = React.useState<string | null>(null);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (urlMount) {
            setOpenDialog(true);
        }
    }, [urlMount]);


    const onUpload = (result: any) => {
        onChange(result?.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }
    const handleClick = (imageURl: string) => {
        setUrlMount(imageURl)
    }

    const valueLength = value?.length;
    const firstImage = value?.at(0);
    const allImageWithoutFirst: string[] = value?.slice(1)


    return (
        <div className="">
            <div className="mb-4 flex items-center gap-4 flex-wrap w-full">
                <React.Fragment>
                    {hierarchy && value && firstImage ? (
                        <>
                            <div className="grid gap-4 w-full">
                                <div id="thumbnail">
                                    <h1 className="text-lg font-semibold ">Thumbnail(1)</h1>
                                    <p className="text-sm text-muted-foreground">Thumbnail</p>
                                    <div className="my-3">
                                        <div
                                            key={firstImage}
                                            className="relative w-[200px] h-[200px] rounded-md overflow-hidden cursor-pointer"
                                            onClick={() => handleClick(firstImage)}
                                            onDoubleClick={() => handleClick(firstImage)}
                                        >
                                            <div className="z-10 absolute top-2 right-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => onRemove(firstImage)}
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                            <Image fill className="object-cover" alt="Image" src={firstImage}/>
                                        </div>
                                    </div>
                                </div>


                                    <div id='media' className="w-80">
                                        <h1 className="text-lg font-semibold">Media({value.length -1})</h1>
                                        <p className="text-sm text-muted-foreground">Media</p>
                                        <div className="my-3">
                                            <ScrollArea className="whitespace-nowrap rounded-md">
                                            <div className="flex w-max space-x-4 p-4">
                                                {allImageWithoutFirst.map((url) => (
                                                    <div
                                                        key={url}
                                                        className="relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"
                                                        onClick={() => handleClick(url)}
                                                        onDoubleClick={() => handleClick(url)}
                                                    >
                                                        <div className="z-10 absolute top-2 right-2">
                                                            <Button
                                                                type="button"
                                                                onClick={() => onRemove(url)}
                                                                variant="destructive"
                                                        
                                                            >
                                                                <Trash className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                        <Image className="aspect-[3/4] h-fit w-fit object-cover"
                                                               alt="Image" src={url}
                                                               width={300}
                                                               height={400}/>
                                                    </div>
                                                ))}
                                            </div>
                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </div>
                                    </div>


                            </div>
                        </>
                    ) : (
                        <>

                            { value?.map((url) => (
                                <div
                                    key={url}
                                    className="relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"
                                    onClick={() => handleClick(url)}
                                    onDoubleClick={() => handleClick(url)}
                                    title={url}
                                >
                                    <div className="z-10 absolute top-2 right-2">
                                        <Button
                                            type="button"
                                            onClick={() => onRemove(url)}
                                            variant="destructive"
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <Image fill className="object-cover" alt="Image" src={url}/>
                                </div>
                            ))}
                        </>
                    )}
                </React.Fragment>
            </div>
            {(valueLength < max) && (
                <CldUploadWidget onUpload={onUpload} uploadPreset="c8zrj0fl">
                    {({open}) => {
                        const onClick = () => {
                            open();
                        };

                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2"/>
                                <p className="text-primary"> Upload an Image</p>
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            )}


            {(urlMount !== undefined || true) && urlMount && (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="h-[40vw] ">
                        <div className='h-2/3 w-full'>
                            <img className="object-cover" style={{width: '300px', height: 'auto'}} alt="Image"
                                 src={urlMount}
                                 title={urlMount}/>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>


    )
}