import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cls from 'classnames';

import Button from '../Button';

// import { webAppIsExpanded } from '../../utils/telegram';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    onClick?: (event: any) => void;
}

const MainButton:FC<Props> = ({
    isShow = false, onClick,
}) => {
    const { viewportHeight } = window.Telegram.WebApp;
    const [exp, setExp] = useState(window.Telegram.WebApp.isExpanded);

    useEffect(() => {
        const { viewportStableHeight } = window.Telegram.WebApp;
        if (viewportHeight < viewportStableHeight) {
            setExp(true);
        }

        if (viewportHeight === viewportStableHeight) {
            setExp(false);
        }
        window.addEventListener('scroll', () => {
            setExp(true);
        });
        // const isExpanded = webAppIsExpanded();
        // if (!window.Telegram.WebApp.isExpanded) {
        //     setExp(isExpanded);
        // }
    }, [viewportHeight]);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, { [styles.rootExpanded]: exp })}
                onClick={onClick}
            >
                <Button text="Test" className={styles.button} />
            </div>, document.body,
        )
    );
};

export default MainButton;
