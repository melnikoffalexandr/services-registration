import React, { FC } from 'react';
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
    isShow = false, text = 'Временная кнопка', onClick,
}) => {
    // const [height, setHeight] = useState<number>(window.Telegram.WebApp.viewportStableHeight - 61);
    const isExpanded = false;

    /* useEffect(() => {
        if (!isExpanded) {
            window.Telegram.WebApp.onEvent('viewportChanged', () => {
                setHeight(window.Telegram.WebApp.viewportStableHeight - 61);
            });
        }
    }, [height, isExpanded]); */

    if (!isShow) {
        return null;
    }

    return (
        createPortal(
            <div
                className={cls(styles.root, { [styles.rootExpanded]: isExpanded })}
                // style={{ top: !isExpanded ? height : undefined }}
                onClick={onClick}
            >
                <Button text={text} />
            </div>, document.body,
        )
    );
};

export default MainButton;
