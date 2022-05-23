import React, { FC, useEffect, useState } from 'react';
import cls from 'classnames';

import { createPortal } from 'react-dom';

import Button from '../Button';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    className?: string;
}

const MainButton:FC<Props> = ({
    isShow = false, text = 'Временная кнопка', className = '',
}) => {
    const [height, setHeight] = useState<number>(window.Telegram.WebApp.viewportStableHeight - 44);
    const isExpanded = false;

    useEffect(() => {
        window.Telegram.WebApp.onEvent('viewportChanged', () => {
            setHeight(window.Telegram.WebApp.viewportStableHeight - 44);
        });
    }, [height]);

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, className, { [styles.rootExpanded]: isExpanded })}
                style={{ top: !isExpanded ? height : undefined }}
            >
                <Button text={text} />
            </div>, document.body,
        )
    );
};

export default MainButton;
