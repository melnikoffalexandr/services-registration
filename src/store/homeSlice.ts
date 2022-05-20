import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EntriesList } from '../types/entries';
import { fetchAllEntriesRequest } from '../api';
import { getLocationSearch } from '../utils';

const { userId } = getLocationSearch();

export const getAllEntries = createAsyncThunk<EntriesList, undefined, { rejectValue: string }>(
    'home/fetchEntries',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAllEntriesRequest({ userId: userId || '51673' });
            return data;
        } catch (e) {
            return rejectWithValue('Не удалось получить записи');
        }
    },
);

export type HomeState = {
    searchText: string;
    entries: {
        loading: boolean;
        data: EntriesList;
        error: string | null;
    }
};

const initialState: HomeState = {
    searchText: '',
    entries: {
        loading: false,
        data: [],
        error: '',
    },
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEntries.pending, (state) => {
                state.entries.loading = true;
                state.entries.error = '';
            })
            .addCase(getAllEntries.fulfilled, (state, { payload }) => {
                state.entries.loading = false;
                state.entries.data = payload;
            })
            .addCase(getAllEntries.rejected, (state, { payload }) => {
                if (payload) {
                    state.entries.loading = false;
                    state.entries.error = payload;
                }
            });
    },
});

export const { setSearchText } = homeSlice.actions;

export default homeSlice.reducer;
