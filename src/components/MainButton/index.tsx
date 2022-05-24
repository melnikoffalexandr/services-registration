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
    const [exp, setExp] = useState(window.Telegram.WebApp.isExpanded);

    useEffect(() => {
        const isExpanded = webAppIsExpanded();
        if (!window.Telegram.WebApp.isExpanded) {
            setExp(isExpanded);
        }
    }, [window.Telegram.WebApp.isExpanded]);

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
