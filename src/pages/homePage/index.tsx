import React from 'react';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import DaysList from '../../components/daysList';

// import styles from './homePage.module.scss';

console.log('window', window);
console.log('process', process?.env);

const HomePage = () => (
    <>
        <Navbar />
        <Search />
        <DaysList />
    </>
);

export default HomePage;
