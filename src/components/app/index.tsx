import React from 'react';

import Home from '../../pages/home';

import styles from './app.module.scss';

export const App = () => (
    <div className={styles.root}>
        <Home />
    </div>
);

export default App;
