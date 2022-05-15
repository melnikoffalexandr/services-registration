import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const baseUrl = 'http://localhost:3004';

class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 3000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    get(url: string) {
        return this.api.get(url);
    }

    post(url: string, { data }: AxiosRequestConfig) {
        return this.api.post(url, data);
    }

    put(url: string, { data }: AxiosRequestConfig) {
        return this.api.put(url, data);
    }

    delete(url: string) {
        return this.api.delete(url);
    }
}

export default new ApiClient();
