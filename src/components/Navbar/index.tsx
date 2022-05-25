import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import cls from 'classnames';

import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getAllList } from '../../store/schedulerSlice';
import { setLayout } from '../../store/navbarSlice';

import { ReactComponent as BackArrowImg } from '../../assets/img/backArrow.svg';

import styles from './navbar.module.scss';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const { app: { user }, navbar: { layout } } = useAppSelector((state) => state);
    const { userId } = user;
    const [entry, setEntry] = useState(true);

    if (layout === 'archive') {
        return (
            <div className={styles.root}>
                <Link
                    to={`/?userId=${userId}`}
                    onClick={() => {
                        dispatch(setLayout('entries'));
                        dispatch(getAllList());
                    }}
                >
                    <div className={styles.backButton}>
                        <BackArrowImg />
                    </div>
                </Link>
                <div className={styles.title}>Архив записей</div>
                <Link to={`create-entry/?userId=${userId}`}>
                    <Button type="small" />
                </Link>
            </div>
        );
    }
    return (
        <div className={styles.root}>
            <div className={cls(styles.actionWrapper, { [styles.actionWrapperRevert]: !entry })}>
                <div
                    className={cls(styles.title, { [styles.titleRevert]: !entry })}
                    onClick={() => setEntry(true)}
                >
                    {entry && <span>📋</span>}
                    Записи
                </div>
                <Button
                    type="inline"
                    text="Клиенты"
                    className={cls({ [styles.buttonRevert]: !entry })}
                    onClick={() => setEntry(false)}
                />
            </div>
            <Link to={`create-entry/?userId=${userId}`}>
                <Button type="big" text="Записать" withIcon />
            </Link>
        </div>
    );
};

export default Navbar;
