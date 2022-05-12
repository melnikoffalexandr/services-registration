import React from 'react';

import Title from '../title';

import Button from '../button';

import styles from './navbar.module.scss';

export const Navbar = () => (
    <div className={styles.root}>
        <Title text="Записи" />
        <Button text="+ Записать" />
    </div>
);

export default Navbar;
