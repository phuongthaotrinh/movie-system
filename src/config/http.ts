import axios, { AxiosInstance } from 'axios'

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
    }
}

const http = new Http().instance
export default http;
