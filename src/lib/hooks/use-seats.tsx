import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import http from "@/config/http";

import axios, {AxiosResponse} from "axios";

const getDataList = async (signal?: AbortSignal) =>
    http.get<any>('seatType', {
        signal
    });

const createSeats =async(body: any) => {
    await http.post<any>('seatType', body)
}
const useSeats = () => {
    const data:UseQueryResult<AxiosResponse<any[]>> = useQuery({
        queryKey: ['seats'],
        queryFn: async () => {
            const controller = new AbortController()
            setTimeout(() => {
                controller.abort()
            }, 3000)
            return await getDataList(controller.signal)
        },

    })
    const refetchData = (): void => {
        data.refetch()
    };
    return {seats:data.data?.data, reloadFn: refetchData}
};

export  {useSeats, getDataList, createSeats};
