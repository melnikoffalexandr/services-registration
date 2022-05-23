import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import cls from 'classnames';

import Button from '../../components/Button';
import { webAppIsExpanded } from '../../utils/telegram';

import styles from './layoutPage.module.scss';

const LayoutPage = () => {
    const [height, setHeight] = useState<number>(window.Telegram.WebApp.viewportStableHeight - 90);
    const isExpanded = webAppIsExpanded();

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', () => {
            setHeight(window.Telegram.WebApp.viewportStableHeight - 90);
        });
    }, [height]);

    return (
        <div className={styles.root}>
            <Outlet />
            <div
                className={cls(styles.buttonWrapper, { [styles.expanded]: isExpanded })}
                style={{ top: !isExpanded ? height : undefined }}
            >
                <Button text="Временная кнопка, аналог главной кнопки" />
            </div>
        </div>
    );
};

export default LayoutPage;
