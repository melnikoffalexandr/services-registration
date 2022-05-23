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
    isShow = false, text = 'Временная кнопка', onClick,
}) => {
    const [isExpanded, setIsExpanded] = useState(webAppIsExpanded());

    console.log(isExpanded);

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', () => {
            setIsExpanded(!isExpanded);
        });
    }, [isExpanded]);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, { [styles.rootExpanded]: isExpanded })}
                onClick={onClick}
            >
                <Button text={text} className={styles.button} />
            </div>, document.body,
        )
    );
};

export default MainButton;
