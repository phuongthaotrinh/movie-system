import http from "@/config/http";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {movieApi, movieKeys} from "@/lib/hooks/use-movies";

const createStore = async (userBody: any) => {
    try {
        const res = await http.post('/store', userBody);
        return res.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const useCreateUser = () => {
    const client = useQueryClient();
    const { mutate: createUserInfo } =useMutation({
        mutationFn: createStore,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] });
            toast.success('Update success')
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            toast.error("Faild")
        },
    })

    return createUserInfo;
}