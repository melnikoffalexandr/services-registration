import React from 'react';
import { Outlet } from 'react-router-dom';

import { webAppTheme } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

const { colorScheme } = webAppTheme();

const LayoutPage = () => (
    <div className={styles.root} style={{ background: colorScheme }}>
        <Outlet />
    </div>
);

export default LayoutPage;
