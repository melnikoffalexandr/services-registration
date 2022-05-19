import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        setUser(state, action: PayloadAction<AppState['user']>) {
            state.user = action.payload || 51673;
        },
    },
});

export const { setUser } = appSlice.actions;

export default appSlice.reducer;
