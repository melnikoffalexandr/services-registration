import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addEntryRequest, sendWebBotData } from '../api';
import { webAppClose, webAppMainButtonShowProgress } from '../utils/telegram';

import { AppState } from './appSlice';

export const addEntry = createAsyncThunk<string, { date: string, post: string }, { rejectValue: string, state: { app: AppState } }>(
    'createEntry/addEntry',
    async ({ date, post }, { rejectWithValue, getState }) => {
        const state = getState();
        const { userId, chatId } = state.app.user;
        try {
            webAppMainButtonShowProgress();
            const { data: recordId, status } = await addEntryRequest({ userId, date, post });

            if (status === 200) {
                const { status: webBotStatus } = await sendWebBotData({
                    chatId,
                    userId,
                    request: 'UserSetSchedulerRecord',
                    rest: {
                        recordId,
                    },
                });

                if (webBotStatus === 200) {
                    webAppClose();
                }
            }

            return recordId;
        } catch (err) {
            return rejectWithValue('Не удалось добавить запись');
        }
    },
);

export type CreateEntrySliceState = {
    calendar: {
        isVisible: boolean,
        position: { top: number, left: number }
    }
    isShowPostInput: boolean,
    date: string,
    time: string,
    post: string,
};

const initialState: CreateEntrySliceState = {
    calendar: {
        isVisible: false,
        position: { top: 0, left: 0 },
    },
    isShowPostInput: false,
    date: '',
    time: '',
    post: '',
};

const CreateEntrySlice = createSlice({
    name: 'createEntry',
    initialState,
    reducers: {
        setCalendar(state, { payload }: PayloadAction<CreateEntrySliceState['calendar']>) {
            state.calendar = payload;
        },
        setShowPostInput(state, { payload }: PayloadAction<boolean>) {
            state.isShowPostInput = payload;
        },
        setDate(state, { payload }: PayloadAction<string>) {
            state.date = payload;
        },
        setTime(state, { payload }: PayloadAction<string>) {
            state.time = payload;
        },
        setPost(state, { payload }: PayloadAction<string>) {
            state.post = payload;
        },
    },
});

export const {
    setCalendar, setShowPostInput, setDate, setTime, setPost,
} = CreateEntrySlice.actions;

export default CreateEntrySlice.reducer;
