import { createSlice } from '@reduxjs/toolkit';

import { getLocationSearch } from '../utils';

// @ts-ignore
const chatId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
const { userId } = getLocationSearch();

type AppState = {
    user: {
        userId: string,
        chatId: number | null,
    },
};

const initialState: AppState = {
    user: {
        userId: '',
        chatId: null,
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
