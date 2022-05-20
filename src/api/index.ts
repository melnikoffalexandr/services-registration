import { EntriesList } from '../types/entries';

import { axiosClient, AxiosPromise } from './common';

export function fetchAllEntriesRequest(params: { userId: string }): AxiosPromise<EntriesList> {
    const { userId } = params;
    return axiosClient.get(`api/scheduler/getScheduler?userId=${userId}`);
}

export function fetchAddEntryRequest(params: { userId: string, date: string, post?: string }): AxiosPromise<string> {
    return axiosClient.post('api/scheduler/createRecordTemplate', params);
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
