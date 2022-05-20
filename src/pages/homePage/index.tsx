import React from 'react';

import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import DaysList from '../../components/DaysList';

// import styles from './homePage.module.scss';

const HomePage = () => (
    <>
        <Navbar />
        <Search />
        <DaysList />
    </>
);

export default HomePage;
