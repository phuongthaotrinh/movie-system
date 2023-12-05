"use client";

import * as React from 'react';
import {Segmented, Popover, Card} from 'antd';
import {HeaderPage} from '@/components/header-page/admin';
import {LayoutGrid, List} from 'lucide-react';
import TableLayoutImage from "@/components/admin/movies/table-layout-image";
import {useMovies} from '@/lib/hooks/use-movies';
import MovieTypesTableShell from '@/components/admin/movie-types/movie-types-shell'
import {useMovieTypes} from "@/lib/hooks/use-movie-type";
import {LoadingSpin} from "@/components/loading-spin";


interface ProductsPageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const MovieTypesPage = ({searchParams}: ProductsPageProps) => {
    const data = useMovieTypes();
    return (
        <div className="">
            <HeaderPage
                pageName="Movies Genres"
                pageDesc="Your's genres is here"

            />
            <Card className='min-h-screen border_card'>
                {data.isSuccess ? (
                    <MovieTypesTableShell data={data?.data?.data} pageCount={1}/>
                ):(
                    <LoadingSpin />
                )}
            </Card>
        </div>
    )
}

export default MovieTypesPage