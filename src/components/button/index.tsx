import React, { FC } from 'react';
import cls from 'classnames';

import { ReactComponent as Plus } from '../../assets/img/plus.svg';

import styles from './button.module.scss';

interface Props {
    text: string;
    className: string;
    withIcon: boolean;
}

const Button:FC<Props> = ({ text, className = '', withIcon = false }) => (
    <div className={cls(styles.root, className)}>
        {withIcon && <span className={styles.icon}><Plus /></span>}
        <span className={styles.text}>{text}</span>
    </div>
);

export default Button;
