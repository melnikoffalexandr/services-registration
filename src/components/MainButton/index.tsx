import React, { FC } from 'react';
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
    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, className)}
            >
                <Button text={text} />
            </div>, document.body,
        )
    );
};

export default MainButton;
