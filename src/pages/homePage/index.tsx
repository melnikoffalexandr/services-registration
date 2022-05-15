import React from 'react';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import DaysList from '../../components/daysList';

import styles from './homePage.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.root}>
            <Navbar />
            <Search />
            <DaysList />
        </div>
    );
};

export default HomePage;
