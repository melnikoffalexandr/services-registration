import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { ReactComponent as BackArrowImg } from '../../assets/img/backArrow.svg';

import { getAllList, setLayout } from '../../store/schedulerSlice';

import styles from './navbar.module.scss';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const { app, home: { layout } } = useAppSelector((state) => state);
    const { user } = app;
    const { userId } = user;

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
            <div className={styles.title}>📋 Записи</div>
            <Link to={`create-entry/?userId=${userId}`}>
                <Button type="big" text="Записать" withIcon />
            </Link>
        </div>
    );
};

export default Navbar;
