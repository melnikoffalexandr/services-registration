import React from 'react';
// import cls from 'classnames';

// import { ReactComponent as Loader } from '../../assets/img/loader.svg';

import Navbar from '../../components/navbar';
import Search from '../../components/search';

import styles from './homePage.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.root}>
            <Navbar />
            <Search />

            {/* {searchText.length > 2 ? <Loader /> : (
                <div className="daysList">
                    {daysList.map((day) => <DayItem key={day.id} day={day}/>)}
                </div>)}*/}
        </div>
    );
};

export default HomePage;
