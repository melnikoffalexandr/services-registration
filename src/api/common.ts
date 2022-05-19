import axios, { AxiosInstance } from 'axios';

const baseUrl = 'https://telegram-crm.rossko.dev';

class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 6000,
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    get(url: string) {
        return this.api.get(`${baseUrl}/api/${url}`);
    }

    post(url: string, data: any) {
        return this.api.post(`${baseUrl}/api/${url}`, data);
    }

    put(url: string, data: any) {
        return this.api.put(`${baseUrl}/api/${url}`, data);
    }

    delete(url: string) {
        return this.api.delete(`${baseUrl}/api/${url}`);
    }
}

export default new ApiClient();
