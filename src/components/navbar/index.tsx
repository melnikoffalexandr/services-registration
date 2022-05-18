import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';

import styles from './navbar.module.scss';

const Navbar = () => (
    <div className={styles.root}>
        <div className={styles.title}>Записи</div>
        <Link to="create-new-entry">
            <Button className={styles.button} text="Записать" withIcon />
        </Link>
    </div>
);

export default Navbar;
