import { ReactNode, FC } from 'react';

import refreshImg from '../assets/img/refresh.png';

import styles from './layout.module.scss';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.actionButton} onClick={() => console.log('Закрыть')}>Закрыть</div>
                <div className={styles.middleHeader}>
                    <span>Сервисы ROSSKO</span>
                    <span>бот</span>
                </div>
                <img src={refreshImg} width={22} height={22} onClick={() => console.log('Обновить')} alt=""/>
            </div>
            {children}
        </div>
    );
};

export default Layout;
