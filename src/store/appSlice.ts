import { createSlice } from '@reduxjs/toolkit';

import { getLocationSearch } from '../utils';
import { webAppChatId } from '../utils/telegram';

const { userId } = getLocationSearch();
const chatId = webAppChatId();

export type AppState = {
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

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser(state) {
            state.user = { userId, chatId };
        },
    },
});

export const { setUser } = AppSlice.actions;

export default AppSlice.reducer;
