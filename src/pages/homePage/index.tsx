import React from 'react';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import DaysList from '../../components/daysList';
import { getLocationSearch } from '../../utils/locationSearch';

const data = getLocationSearch();

// import styles from './homePage.module.scss';

const HomePage = () => (
    <>
        <Navbar />
        <Search />
        <DaysList />
        {data && <div>{JSON.stringify(data, null, 4)}</div>}
        <div>{JSON.stringify(data, null, 4)}</div>
    </>
);

export default HomePage;
