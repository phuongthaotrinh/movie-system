"use client";

import * as React from 'react';
import { Segmented, Popover, Card } from 'antd';
import { HeaderPage } from '@/components/header-page/admin';
import { LayoutGrid, List } from 'lucide-react';
import TableLayoutImage from "@/components/admin/movies/table-layout-image";
import { useMovies } from '@/lib/hooks/use-movies';
import MovieShells from '@/components/admin/movies/movies-shell';


interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


const MoviePage = ({ searchParams }: ProductsPageProps) => {
  const [value, setValue] = React.useState<string>("List");
  const [_, startTransition] = React.useTransition();
  const data = useMovies();

  return (
    <div className="">
      <HeaderPage
        pageName="Movies"
        pageDesc="Your's movies is here"

      />
      <Card className='min-h-screen border_card'>
        <div className="flex items-center justify-end ">
          <Segmented
            value={value}
            options={[
              { value: 'List', icon: <Popover content="Watch as table"><List className="w-4 h-4" /> </Popover> },
              { value: 'Kanban', icon: <Popover content="Watch as images"><LayoutGrid className="w-4 h-4" /> </Popover> },
            ]}
            defaultValue="List"
            onChange={(e: any) => {
              startTransition(() => {
                setValue(e)
              })
            }}
            size='small'
          />

        </div>

        <div id='render_segmented' className="pt-3">
          {value === 'List' && (
            <>
              {data.isSuccess && (
                <div>
                  <MovieShells data={data.data.data} pageCount={1} />
                </div>
              )}

            </>
          )}

          {value === 'Kanban' && (
            <>
              {data.isSuccess && (
                <TableLayoutImage data={data.data.data} isLoading={data.isLoading} />
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

export default MoviePage