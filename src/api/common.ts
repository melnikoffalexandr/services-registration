import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getLocationSearch } from '../utils/locationSearch';

const { userId } = getLocationSearch();

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = 'https://telegram-crm.rossko.dev';

class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 6000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    get(url: string) {
        return this.api.get(`${baseUrl}/api/${url}?userId=${isDev ? 51673 : userId}`);
    }

    post(url: string, { data }: AxiosRequestConfig) {
        return this.api.post(`${baseUrl}/api/${url}?userId=${isDev ? 51673 : userId}`, data);
    }

    put(url: string, { data }: AxiosRequestConfig) {
        return this.api.put(`${baseUrl}/api/${url}?userId=${isDev ? 51673 : userId}`, data);
    }

    delete(url: string) {
        return this.api.delete(`${baseUrl}/api/${url}?userId=${isDev ? 51673 : userId}`);
    }
}

export default new ApiClient();
