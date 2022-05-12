import React from 'react';

import Navbar from '../../components/navbar';

import Button from '../../components/button';

import styles from './home.module.scss';

export const Home = () => (
    <div className={styles.root}>
        <Navbar />
        <div className={styles.actionContainer}>
            <Button className={styles.button} variant="not-filled" text="Поиск" />
            <Button className={styles.button} variant="not-filled" text="Архив записей" />
        </div>
    </div>
);

export default Home;
