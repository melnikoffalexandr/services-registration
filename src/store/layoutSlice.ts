import { createSlice } from '@reduxjs/toolkit';

type LayoutState = {}

const initialState: LayoutState = {
    test: 'test'
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {}
});

// export const { } = layoutSlice.actions;

export default layoutSlice.reducer;
