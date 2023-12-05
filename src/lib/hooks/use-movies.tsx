import http from "@/config/http";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {toast} from "sonner";
import {useRouter,useParams} from "next/navigation";
import {AxiosError} from "axios";

export const movieKeys = {
    all: ['movies'],
    details: () => [...movieKeys.all, 'detail'],
    detail: (id: number) => [...movieKeys.details(), id],
    pagination: (page: number) => [...movieKeys.all, 'pagination', page],
    infinite: () => [...movieKeys.all, 'infinite'],
  };


export const movieApi = {
    getDataList:(signal?: AbortSignal) => http.get('/movie',{signal}),
    create_one:  async (body: any) =>  {
       const response= await http.post('/movie', body);
       return response
    },
    update_one:  async (body: any) =>  {
        const response= await http.patch(`/movie/${body._id}`, body);
        return response
    },
    get_one:  (id:string) =>  http.get(`/movie/${id}`)

}


export function useMovies() {
    const data = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, 3000)
            return await movieApi.getDataList(controller.signal)
        },
        retry: 1,
    })
    return data
  }


export function useCreateMovie() {
    const queryClient = useQueryClient();
    const router= useRouter()
    return useMutation({
        mutationFn: movieApi.create_one,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: movieKeys.all });
        },
        onSuccess: (data) => {
          toast.success('Create success');
            router.refresh();
            setTimeout(() => {
                router.push('/admin/movies', { scroll: false })
            },1000)
        },
        onError: (err:AxiosError<any>, newUser, context?: any) => {

            const message = err.response?.data?.message as string;
            toast.error(`Fail: ${message}`)
            queryClient.setQueryData(movieKeys.all, context.previousUsers);

        },
        onSettled: () => {
            toast.loading('Creating...')
            queryClient.invalidateQueries({ queryKey: movieKeys.all });

        },
    });
}

export function useEditMovie() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const router= useRouter()
    return useMutation({
        mutationFn: movieApi.update_one,
        onMutate: async (updatedUser) => {
            await queryClient.cancelQueries({ queryKey: movieKeys.detail(Number(id))});
            const previousUser = queryClient.getQueryData(
                movieKeys.detail(Number(id))
            );
            queryClient.setQueryData(movieKeys.detail(Number(id)), updatedUser);
            return { previousUser: previousUser, updatedUser: updatedUser };
        },
        onError: (err:AxiosError<any>, updatedUser, context?: any) => {
            const message = err.response?.data?.message as string;
            toast.error(`Fail: ${message}`)
            queryClient.setQueryData(movieKeys.detail(Number(id)), context.previousUsers);
        },

        onSettled: () => {
            toast.loading('Editting...')
            queryClient.invalidateQueries({ queryKey: movieKeys.all });
        },
        onSuccess: (data) => {
            toast.success('Edit success');
            router.refresh();
            setTimeout(() => {
                router.push('/admin/movies', { scroll: false })
            },1000)
        },
    });
}