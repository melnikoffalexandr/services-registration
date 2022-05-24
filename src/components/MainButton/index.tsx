import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cls from 'classnames';

import Button from '../Button';

import { webAppIsExpanded } from '../../utils/telegram';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    onClick?: (event: any) => void;
}

const MainButton:FC<Props> = ({
    isShow = false, onClick,
}) => {
    const { viewportStableHeight } = window.Telegram.WebApp;
    const [height, setHeight] = useState(viewportStableHeight);

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', ({ isStateStable }) => {
            if (isStateStable) {
                setHeight(viewportStableHeight);
            }
        });
    }, [webAppIsExpanded()]);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root)}
                onClick={onClick}
                style={{ position: 'sticky', top: height, transition: '0.5' }}
            >
                <Button text="Test" className={styles.button} />
            </div>, document.body,
        )
    );
};

export default MainButton;
