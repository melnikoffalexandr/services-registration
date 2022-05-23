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
    const [expanded, setExpanded] = useState(webAppIsExpanded());

    useEffect(() => {
        const isExpanded = webAppIsExpanded();
        if (isExpanded) {
            setExpanded(false);
        }
        if (!isExpanded) {
            setExpanded(true);
        }
    }, [expanded, webAppIsExpanded()]);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, { [styles.rootExpanded]: expanded })}
                onClick={onClick}
            >
                <Button text={text} className={styles.button} />
            </div>, document.body,
        )
    );
};

export default MainButton;
