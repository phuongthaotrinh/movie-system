import {Card, Button} from "antd";

import {DownloadIcon, PlusCircleIcon, UploadIcon} from "lucide-react";
import * as React from "react";

interface IProps {
    inHome?: boolean,
    pageName: string,
    pageDesc: string,
    importExportShow?: boolean,
    handleImport?: () => void,
    handleExport?: () => void,
}

export  function HeaderPage({inHome, pageName, pageDesc, importExportShow,handleImport,handleExport}: IProps) {
    return (
        <div className="">
            <div className="sm:hidden md:block">
                <Card className="p-0" bordered={false}>
                    <div className="flex items-center h-full ">
                        <div>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                {pageName}
                            </h1>
                            <p className="text-sm text-muted-foreground">{pageDesc}.</p>
                        </div>

                        <div className="flex items-center gap-x-2 justify-end flex-auto">

                            {importExportShow && (
                                <>
                                    <Button type="dashed" disabled={!inHome} onClick={handleImport}>
                                        <UploadIcon className="mr-2 h-4 w-4"/>Import
                                    </Button>
                                    <Button type="dashed" disabled={!inHome} onClick={handleExport}>
                                        <DownloadIcon className="mr-2 h-4 w-4"/>Export
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    )
}