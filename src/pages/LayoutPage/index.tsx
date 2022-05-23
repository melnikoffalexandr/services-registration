import React from 'react';
import { Outlet } from 'react-router-dom';

// import { webAppTheme } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

// const { backgroundColor, textColor } = webAppTheme();

const LayoutPage = () => (
    <div className={styles.root} style={{ background: '#420759', color: '#fff' }}>
        <Outlet />
    </div>
);

export default LayoutPage;
