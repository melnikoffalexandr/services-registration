import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EntriesList, SchedulerSearchList } from '../types/entries';
import { allEntriesRequest, schedulerSearchRequest } from '../api';
import { getLocationSearch } from '../utils';

const { userId } = getLocationSearch();

export const getAllEntries = createAsyncThunk<EntriesList, undefined, { rejectValue: string }>(
    'home/getAllEntries',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await allEntriesRequest({ userId });
            return data;
        } catch (e) {
            return rejectWithValue('Не удалось получить записи');
        }
    },
);

export const getSchedulerSearch = createAsyncThunk<SchedulerSearchList, { searchText: string }, { rejectValue: string }>(
    'home/getSchedulerSearch',
    async (params, { rejectWithValue }) => {
        const { searchText } = params;
        try {
            const { data } = await schedulerSearchRequest({ userId, searchText });
            return data;
        } catch (e) {
            return rejectWithValue('Поиск не дал результатов');
        }
    },
);

export type HomeState = {
    searchText: string;
    entries: {
        loading: boolean;
        data: EntriesList;
        error: string | null;
    },
    search: {
        loading: boolean;
        data: SchedulerSearchList;
        error: string | null;
    };
};

const initialState: HomeState = {
    searchText: '',
    entries: {
        loading: false,
        data: [],
        error: '',
    },
    search: {
        loading: false,
        data: [],
        error: '',
    },
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchText(state, { payload }: PayloadAction<string>) {
            state.searchText = payload;
        },
        clearSearchResult(state) {
            state.search.data = [];
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
            })
            .addCase(getSchedulerSearch.pending, (state) => {
                state.search.loading = true;
                state.search.error = '';
            })
            .addCase(getSchedulerSearch.fulfilled, (state, { payload }) => {
                state.search.loading = false;
                state.search.data = payload;
            })
            .addCase(getSchedulerSearch.rejected, (state, { payload }) => {
                if (payload) {
                    state.search.loading = false;
                    state.search.error = payload;
                }
            });
    },
});

export const { setSearchText, clearSearchResult } = homeSlice.actions;

export default homeSlice.reducer;
