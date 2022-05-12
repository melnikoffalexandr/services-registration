import React from 'react';

import styles from './search.module.scss';

export const Search = () => (
    <div className={styles.root}>
        <input type="text" placeholder="Поиск" />
    </div>
);

export default Search;
