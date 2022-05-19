import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/homePage';
import LayoutPage from '../../pages/layoutPage';
import CreateNewEntry from '../../pages/createNewEntry';
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
                    <Route index element={<HomePage />} />
                    <Route path="/create-new-entry" element={<CreateNewEntry />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
