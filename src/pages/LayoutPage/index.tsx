import React from 'react';

import { Outlet } from 'react-router-dom';

import Button from '../../components/Button';

import useWindowDimensions from '../../utils/hooks/useWindowDimension';

import styles from './layoutPage.module.scss';

const LayoutPage = () => {
    const { height } = useWindowDimensions();

    const percent = (innerHeight: number): number => {
        console.log('test');
        return (innerHeight / 100) * 60 - 48;
    };
    return (
        <div className={styles.root}>
            <Outlet />
            <div
                className={styles.buttonWrapper}
                style={{ top: percent(height) }}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>
        </div>
    );
};

export default LayoutPage;
