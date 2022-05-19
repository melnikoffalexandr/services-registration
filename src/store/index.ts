import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import homeReducer from './homeSlice';
import newEntryReducer from './newEntrySlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        home: homeReducer,
        newEntry: newEntryReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
