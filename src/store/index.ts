import { configureStore } from '@reduxjs/toolkit';

import AppReducer from './appSlice';
import HomeReducer from './homeSlice';
import NewEntryReducer from './newEntrySlice';

const store = configureStore({
    reducer: {
        app: AppReducer,
        home: HomeReducer,
        newEntry: NewEntryReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
