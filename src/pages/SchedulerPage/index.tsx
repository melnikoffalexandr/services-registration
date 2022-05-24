import React from 'react';

import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import DaysList from '../../components/DaysList';

// import styles from './schedulerPage.module.scss';

const SchedulerPage = () => (
    <>
        <Navbar />
        <Search />
        <DaysList />
    </>
);

export default SchedulerPage;
