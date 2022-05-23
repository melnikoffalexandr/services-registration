import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button';

import styles from './mainButton.module.scss';

interface Props {
    isShow: boolean;
    text: string;
    onClick: (event: any) => void;
}

const MainButton:FC<Props> = ({
    isShow = false, text = 'Временная кнопка', onClick,
}) => {
    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={styles.root}
                onClick={onClick}
            >
                <Button text={text} />
            </div>, document.body,
        )
    );
};

export default MainButton;
