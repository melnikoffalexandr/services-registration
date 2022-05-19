import { createSlice } from '@reduxjs/toolkit';

type NewEntrySliceState = {

};

const initialState: NewEntrySliceState = {
    test: 1,
};

const newEntrySlice = createSlice({
    name: 'new-entry',
    initialState,
    reducers: {},
});

// export const {} = newEntrySlice.actions;

export default newEntrySlice.reducer;
