import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Entry } from '../types/entries';
import { fetchAllEntriesRequest } from '../api';

export const fetchAllEntries = createAsyncThunk<Entry[], undefined, { rejectValue: string }>(
    'home/fetchEntries',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchAllEntriesRequest();
            return response.data;
        } catch (err) {
            return rejectWithValue('Server Error Test');
        }
    }
);

type HomeState = {
  searchText: string;
  entries: {
    loading: boolean;
    data: Entry[];
    error: string | null;
  }
}

const initialState: HomeState = {
    searchText: '',
    entries: {
        loading: false,
        data: [],
        error: ''
    }
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEntries.pending, (state) => {
                state.entries.loading = true;
                state.entries.error = '';
            })
            .addCase(fetchAllEntries.fulfilled, (state, { payload }) => {
                state.entries.loading = false;
                state.entries.data = payload;
            })
            .addCase(fetchAllEntries.rejected, (state, { payload }) => {
                if (payload) {
                    state.entries.loading = false;
                    state.entries.error = payload;
                }
            });
    }
});

export const { setSearchText } = homeSlice.actions;

export default homeSlice.reducer;
