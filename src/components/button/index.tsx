import React, { FC } from 'react';
import cls from 'classnames';

import styles from './button.module.scss';

interface Props {
  text?: string;
  variant?: 'filled' | 'not-filled';
  className?: string;
}

export const Button:FC<Props>= ({ variant = 'filled', text='Text', className }) => (
    <div className={cls(styles.root, className, { [styles.rootNotFilled]: variant === 'not-filled' })}>
        {text}
    </div>
);

export default Button;
