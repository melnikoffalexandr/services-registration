import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cls from 'classnames';

import Button from '../Button';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    onClick?: (event: any) => void;
}

const MainButton:FC<Props> = ({
    isShow = false, onClick,
}) => {
    const tg = window.Telegram.WebApp;
    const [expanded, setExpanded] = useState(tg.isExpanded);

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', ({ isStateStable }) => {
            if (isStateStable) {
                setExpanded(true);
            }
        });
    }, []);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, { [styles.rootExpanded]: expanded })}
                onClick={onClick}
            >
                <Button text={expanded ? 'expanded' : 'not expanded'} className={styles.button} />
            </div>, document.body,
        )
    );
};

export default MainButton;
