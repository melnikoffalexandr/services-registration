import React from 'react';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import DayItem from '../../components/dayItem';

import { daysList } from '../../tempData';

import styles from './homePage.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.root}>
            <Navbar />
            <Search />
            <div className={styles.daysList}>
                {daysList.map((day) => <DayItem key={day.id} day={day}/>)}
            </div>
        </div>
    );
};

export default HomePage;
