import React, { FC } from 'react';
import cls from 'classnames';
import { createPortal } from 'react-dom';

import Button from '../Button';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    className?: string;
    onClick: (event: any) => void;
}

const MainButton:FC<Props> = ({
    isShow = false, text = 'Временная кнопка', className = '', onClick,
}) => {
    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, className)}
                onClick={onClick}
            >
                <Button text={text} />
            </div>, document.body,
        )
    );
};

export default MainButton;
