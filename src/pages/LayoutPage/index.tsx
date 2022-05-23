import React from 'react';

import { Outlet } from 'react-router-dom';

import Button from '../../components/Button';

import { webAppViewportStableHeight } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

const LayoutPage = () => {
    // const { height } = useWindowDimensions();
    const height = webAppViewportStableHeight();

    // const percent = (innerHeight: number): number => (innerHeight / 100) * 60 - 48;
    return (
        <div className={styles.root}>
            <div>{height}</div>
            <Outlet />
            <div
                className={styles.buttonWrapper}
                style={{ top: height - 56 }}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>
        </div>
    );
};

export default LayoutPage;
