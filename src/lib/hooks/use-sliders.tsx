import http from "@/config/http";
import {useMutation, useQueryClient,useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import {movieApi} from "@/lib/hooks/use-movies";

const createOne = async (body: any) => {
    try {
        const res = await http.post('/slider', body);
        return res.data;
    } catch (error) {
        console.error('Error creating:', error);
        throw error;
    }
}
const getOne = async (id: string) => {
    try {
        const res = await http.post(`/slider/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
const getList = async (signal?: AbortSignal) => {
    const res = await http.get('/slider',{signal});
    return res.data;
};



export const useCreateSlider = () => {
    const client = useQueryClient();
    const { mutate: createDataInfo } =useMutation({
        mutationFn: createOne,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['GET_ALL_SLIDERS'] });
            toast.success('Create success');

        },
        onError: (error) => {
            console.error('Error creating:', error);
            toast.error("Faild")
        },
    })

    return createDataInfo;
}


export const useSlider = (id: string) => {
    return useQuery({
        queryKey: ['GET_SLIDER_ID', id],
        queryFn: async () => {
            const data = await getOne(id);
            return data;
        },
    });
}

export const useSliders = () => {
    return useQuery({
        queryKey: ['GET_ALL_SLIDERS'],
        queryFn: async () => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, 3000)
            return await getList(controller.signal)
        },
        retry: 1

    });
};
