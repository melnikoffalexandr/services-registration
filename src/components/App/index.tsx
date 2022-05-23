import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import LayoutPage from '../../pages/LayoutPage';
import CreateEntry from '../../pages/CreateEntry';
import { useAppDispatch } from '../../utils/hooks';
import { setUser } from '../../store/appSlice';

import { webAppTheme } from '../../utils/telegram';

import styles from './app.module.scss';

const { colorScheme } = webAppTheme();

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser());
    }, []);

    return (
        <div className={styles.root} style={{ background: colorScheme }}>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/create-entry" element={<CreateEntry />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
