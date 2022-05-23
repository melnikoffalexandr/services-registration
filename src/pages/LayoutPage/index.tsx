import React, { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import Button from '../../components/Button';

// import { webAppViewportStableHeight } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

const LayoutPage = () => {
    const [height, setHeight] = useState<number>(window.Telegram.WebApp.viewportStableHeight - 90);

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', () => {
            setHeight(window.Telegram.WebApp.viewportStableHeight - 90);
        });
    }, [height]);
    return (
        <div className={styles.root}>
            <div>{height}</div>
            <Outlet />
            <div
                className={styles.buttonWrapper}
                style={{ top: height }}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>
        </div>
    );
};

export default LayoutPage;
