import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HomeState = {
  searchText: string;
}

const initialState: HomeState = {
    searchText: ''
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        }
    }
});

export const { setSearchText } = homeSlice.actions;

export default homeSlice.reducer;
