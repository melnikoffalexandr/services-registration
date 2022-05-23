import React from 'react';

import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import DaysList from '../../components/DaysList';
import MainButton from '../../components/MainButton';

// import styles from './HomePage.module.scss';

const HomePage = () => (
    <>
        <Navbar />
        <Search />
        <DaysList />
        <MainButton isShow text="Test" />
    </>
);

export default HomePage;
