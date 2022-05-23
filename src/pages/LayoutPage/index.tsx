import React from 'react';
import { Outlet } from 'react-router-dom';

import { webAppTheme } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

const { backgroundColor } = webAppTheme();

const LayoutPage = () => (
    <div className={styles.root} style={{ background: backgroundColor }}>
        <Outlet />
    </div>
);

export default LayoutPage;
