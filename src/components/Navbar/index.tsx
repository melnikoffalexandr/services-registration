import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { useAppSelector } from '../../utils/hooks';

import styles from './navbar.module.scss';

const Navbar = () => {
    const { userId } = useAppSelector((state) => state.app.user);
    return (
        <div className={styles.root}>
            <div className={styles.title}>Записи</div>
            <Link to={`create-entry/?${userId}`}>
                <Button className={styles.button} text="Записать" withIcon />
            </Link>
        </div>
    );
};

export default Navbar;
