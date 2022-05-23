import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layoutPage.module.scss';

const LayoutPage = () => (
    <div className={styles.root}>
        <Outlet />
    </div>
);

export default LayoutPage;
