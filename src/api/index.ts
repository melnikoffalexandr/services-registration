import { AxiosPromise } from 'axios';

import { getLocationSearch } from '../utils';
import { webAppChatId, webAppClose, webAppMainButtonShowProgress } from '../utils/telegram';

import ApiClient from './common';

const chatId = webAppChatId();
const { userId } = getLocationSearch();

export const sendWebBotData = (params: {
    chatId: number,
    userId: string,
    request: string,
    recordId?: string
}): AxiosPromise => ApiClient.post('webHandler/update', params);

export const fetchAllEntriesRequest = (): AxiosPromise => ApiClient.get(`scheduler/getScheduler?userId=${userId || '51673'}`);

export const fetchAddEntryRequest = async (params: { userId: string, date: string, post?: string }) => {
    try {
        webAppMainButtonShowProgress();
        const { data, status } = await ApiClient.post('scheduler/createRecordTemplate', params);
        if (status === 200) {
            await sendWebBotData({
                chatId,
                userId: params.userId,
                request: 'UserSetSchedulerRecord',
                recordId: data,
            });
            webAppClose();
        }
    } catch (err) {
        console.log(err);
    }
};
