import { AxiosPromise } from 'axios';

import { getLocationSearch } from '../utils/locationSearch';

import ApiClient from './common';

// @ts-ignore
const chatId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
const isDev = process.env.NODE_ENV === 'development';
const { userId } = getLocationSearch();

export const sendWebBotData = (params: {
    chatId: number,
    userId: string,
    request: string,
    recordId?: string
}): AxiosPromise => ApiClient.post('webHandler/update', params);

export const fetchAllEntriesRequest = (): AxiosPromise => ApiClient.get(`scheduler/getScheduler?userId=${isDev ? 51673 : userId}`);

export const fetchAddEntryRequest = async (params: { date: string, post?: string }) => {
    try {
        const { data, status } = await ApiClient.post(`scheduler/createRecordTemplate?userId=${isDev ? 51673 : userId}`, params);
        if (status === 200) {
            await sendWebBotData({
                chatId,
                userId: userId || '51673',
                request: 'UserSetSchedulerRecord',
                recordId: data,
            });
        }
    } catch (err) {
        console.log(err);
    }
};
