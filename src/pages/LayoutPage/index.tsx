import React from 'react';

import { Outlet } from 'react-router-dom';

import { createPortal } from 'react-dom';

import Button from '../../components/Button';

import styles from './layoutPage.module.scss';

const LayoutPage = () => (
    <div className={styles.root}>
        <Outlet />
        {createPortal(
            <div
                className={styles.buttonWrapper}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>, document.body)}
    </div>
);

export default LayoutPage;
