import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SchedulerPage from '../../pages/SchedulerPage';
import LayoutPage from '../../pages/LayoutPage';
import CreateEntry from '../../pages/CreateEntry';
import { useAppDispatch } from '../../utils/hooks';
import { setUser } from '../../store/appSlice';

import styles from './app.module.scss';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser());
    }, []);

    return (
        <div className={styles.root}>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<SchedulerPage />} />
                    <Route path="/create-entry" element={<CreateEntry />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
