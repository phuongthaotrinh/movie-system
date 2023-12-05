import http from "@/config/http";
import {useQuery} from '@tanstack/react-query';

export const movieKeys = {
    all: ['movie-types'],
    details: () => [...movieKeys.all, 'detail'],
    detail: (id: number) => [...movieKeys.details(), id],
    pagination: (page: number) => [...movieKeys.all, 'pagination', page],
    infinite: () => [...movieKeys.all, 'infinite'],
  };


export const movieTypesApi = {
    getDataList:(signal?: AbortSignal) => http.get('/movieType',{signal}),
    create_one: (body: any) => http.post('/movieType', body)
}


export function useMovieTypes() {
    const data = useQuery({
        queryKey: [movieKeys.all],
        queryFn: async () => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, 3000)
            return await movieTypesApi.getDataList(controller.signal)
        },
        retry: 1,
    })
    return data
  }