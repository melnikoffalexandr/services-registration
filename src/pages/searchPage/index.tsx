import React from 'react';

import Navbar from '../../components/navbar';

import styles from './searchPage.module.scss';

export const SearchPage = () => (
    <div className={styles.root}>
        <Navbar />
        <div className="searchList">
            SearchList
        </div>
    </div>
);

export default SearchPage;
