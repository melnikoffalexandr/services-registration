import React, { FC, useEffect, useState } from 'react';
import cls from 'classnames';

import { createPortal } from 'react-dom';

import { ReactComponent as Plus } from '../../assets/img/plus.svg';

import { webAppIsExpanded } from '../../utils/telegram';

import styles from './button.module.scss';

interface Props {
    type: 'main' | 'small' | 'big' | 'inline';
    text?: string;
    className?: string;
    withIcon?: boolean;
    onClick?: any;
    isShow?: boolean;
    color?: 'blue' | 'red';
}

const Button:FC<Props> = ({
    type,
    text = 'big',
    className = '',
    withIcon = false,
    onClick,
    isShow = false,
    color = 'blue',
}) => {
    if (type === 'main') {
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

        return (createPortal(
            <div
                className={cls(styles.root, styles.mainRoot, { [styles.mainRootExpanded]: exp })}
                onClick={onClick}
            >
                <span className={styles.text}>{text}</span>
            </div>, document.body,
        )

        );
    }

    if (type === 'small') {
        return (
            <div className={styles.root} onClick={onClick}>
                <Plus />
            </div>
        );
    }

    if (type === 'inline') {
        return (
            <div className={cls(styles.rootInline, { [styles.rootInlineRed]: color === 'red' })} onClick={onClick}>
                {text}
            </div>
        );
    }

    return (
        <div className={cls(styles.root, className)} onClick={onClick}>
            {withIcon && <Plus />}
            <span className={styles.text}>{text}</span>
        </div>
    );
};

export default Button;
