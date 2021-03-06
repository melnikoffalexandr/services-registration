import { EntriesList, SearchList } from '../types/entries';

import { axiosClient, AxiosPromise } from './common';

export function allEntriesRequest(params: { userId: string }): AxiosPromise<EntriesList> {
    const { userId } = params;
    return axiosClient.get(`api/scheduler/getScheduler?userId=${userId}`);
}

export function allArchiveRequest(params: { userId: string }): AxiosPromise<EntriesList> {
    const { userId } = params;
    return axiosClient.get(`api/scheduler/getArchiveScheduler?userId=${userId}`);
}

export function addEntryRequest(params: { userId: string, date: string, point?: string }): AxiosPromise<string> {
    return axiosClient.post('api/scheduler/createRecordTemplate', params);
}

export function schedulerSearchRequest(params: { userId: string, searchText: string }): AxiosPromise<SearchList> {
    const { userId, searchText } = params;
    return axiosClient.get(`api/scheduler/search?userId=${userId}&searchText=${searchText}`);
}

export const sendWebBotData = (params: {
    chatId: number,
    userId: string,
    request: string,
    rest?: Record<string, any>
}) => {
    const {
        chatId, userId, request, rest,
    } = params;
    return axiosClient.post('api/webHandler/update', {
        chatId, userId, request, ...rest,
    });
};
