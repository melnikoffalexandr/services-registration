import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NavbarState = {
    layout: 'entries' | 'archive';
};

const initialState: NavbarState = {
    layout: 'entries',
};

const NavbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setLayout(state, { payload }: PayloadAction<'entries' | 'archive'>) {
            state.layout = payload;
        },
    },
});

export const { setLayout } = NavbarSlice.actions;

export default NavbarSlice.reducer;
