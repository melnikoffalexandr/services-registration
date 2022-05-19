import { createSlice } from '@reduxjs/toolkit';

import { getLocationSearch } from '../utils';
import { webAppChatId } from '../utils/telegram';

const { userId } = getLocationSearch();
const chatId = webAppChatId();

type AppState = {
    user: {
        userId: string,
        chatId: number,
    },
};

const initialState: AppState = {
    user: {
        userId: '',
        chatId: 0,
    },
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser(state) {
            state.user = { userId, chatId };
        },
    },
});

export const { setUser } = appSlice.actions;

export default appSlice.reducer;
