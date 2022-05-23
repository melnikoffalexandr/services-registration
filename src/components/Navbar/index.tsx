import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';

import styles from './navbar.module.scss';

const Navbar = () => (
    <div className={styles.root}>
        <div className={styles.title}>Записи</div>
        <Link to="create-entry">
            <Button className={styles.button} text="Записать" withIcon />
        </Link>
    </div>
);

export default Navbar;
