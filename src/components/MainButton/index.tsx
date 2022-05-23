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
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (window.Telegram.WebApp.isExpanded) setExpanded(true);
        if (!window.Telegram.WebApp.isExpanded) setExpanded(false);
    }, [window.Telegram.WebApp.isExpanded]);

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
