import axios, { AxiosRequestConfig, AxiosResponse as OriginalAxiosResponse } from 'axios';

import config from '../config';

interface AxiosResponse<TResult> extends OriginalAxiosResponse {
    data: TResult;
}
export type AxiosPromise<TResult> = Promise<AxiosResponse<TResult>>;

export const httpConfig: AxiosRequestConfig = {
    baseURL: config.BASE_URL,
    timeout: 6000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const axiosClient = axios.create(httpConfig);
