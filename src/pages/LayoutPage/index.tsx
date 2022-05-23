import React from 'react';

import { Outlet } from 'react-router-dom';

import Button from '../../components/Button';

import useWindowDimensions from '../../utils/hooks/useWindowDimension';

import styles from './layoutPage.module.scss';

const LayoutPage = () => {
    const { height } = useWindowDimensions();
    return (
        <div className={styles.root}>
            <Outlet />
            <div
                className={styles.buttonWrapper}
                style={{ top: height - 48 }}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>
        </div>
    );
};

export default LayoutPage;
