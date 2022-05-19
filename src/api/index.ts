import { AxiosPromise } from 'axios';

import ApiClient from './common';

// @ts-ignore
const chatId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;

export const sendWebBotData = (data: { chatId: number, userId: string, request: string, timezone: number, recordId?: string }): AxiosPromise => ApiClient.post('webHandler/update', data);

export const fetchAllEntriesRequest = (): AxiosPromise => ApiClient.get('scheduler/getScheduler');

export const fetchAddEntryRequest = (data: { userId: string, date: string, post?: string }) => {
    const test = data.date.charAt(data.date.length - 4);
    console.log(test);
    try {
        ApiClient
            .post('scheduler/createRecordTemplate', { data })
            .then((res) => sendWebBotData({
                chatId,
                userId: data.userId,
                request: 'UserSetSchedulerRecord',
                timezone: +data.date.charAt(data.date.length - 4),
                recordId: res.data,
            }));
    } catch (err) {
        console.log(err);
    }
};
