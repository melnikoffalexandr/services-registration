import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EntriesList, SearchList } from '../types/entries';
import { allArchiveRequest, allEntriesRequest, schedulerSearchRequest } from '../api';
import { getLocationSearch } from '../utils';
import { pushMetric } from '../api/metric';
import { webAppReady } from '../utils/telegram';

const { userId } = getLocationSearch();

export const getAllList = createAsyncThunk<EntriesList, undefined, { rejectValue: string, state: { home: HomeState } }>(
    'home/getAllList',
    async (_, { rejectWithValue, getState }) => {
        const { home } = getState();
        const { layout } = home;
        try {
            if (layout === 'entries') {
                const { data } = await allEntriesRequest({ userId });
                webAppReady();
                pushMetric('telegramCRM/initMainPage', { testField: 'Проверка работы метрики' });
                return data;
            }
            const { data } = await allArchiveRequest({ userId });
            return data;
        } catch (e) {
            return rejectWithValue('Не удалось получить информацию о записях');
        }
    },
);

export const getSchedulerSearch = createAsyncThunk<SearchList, { searchText: string }, { rejectValue: string }>(
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
    layout: 'entries' | 'archive';
    list: {
        loading: boolean;
        data: EntriesList;
        error: string | null;
    },
    search: {
        loading: boolean;
        data: SearchList;
        error: string | null;
    };
};

const initialState: HomeState = {
    searchText: '',
    layout: 'entries',
    list: {
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

const SchedulerSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchText(state, { payload }: PayloadAction<string>) {
            state.searchText = payload;
        },
        setLayout(state, { payload }: PayloadAction<'entries' | 'archive'>) {
            state.layout = payload;
        },
        clearSearchResult(state) {
            state.search.data = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllList.pending, (state) => {
                state.list.loading = true;
                state.list.error = '';
            })
            .addCase(getAllList.fulfilled, (state, { payload }) => {
                state.list.loading = false;
                state.list.data = payload;
            })
            .addCase(getAllList.rejected, (state, { payload }) => {
                if (payload) {
                    state.list.loading = false;
                    state.list.error = payload;
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

export const { setLayout, setSearchText, clearSearchResult } = SchedulerSlice.actions;

export default SchedulerSlice.reducer;
