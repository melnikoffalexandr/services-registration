import { configureStore } from '@reduxjs/toolkit';

import AppReducer from './appSlice';
import SchedulerReducer from './schedulerSlice';
import CreateEntryReducer from './createEntrySlice';

const store = configureStore({
    reducer: {
        app: AppReducer,
        home: SchedulerReducer,
        createEntry: CreateEntryReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
