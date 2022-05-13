import React, { useState } from 'react';
import cls from 'classnames';

import { ReactComponent as Loader } from '../../assets/img/loader.svg';

import Navbar from '../../components/navbar';
import Button from '../../components/button';
import DayItem from '../../components/dayItem';
import { daysList } from '../../tempData';

import crossImg from '../../assets/img/cross.png';

import styles from './homePage.module.scss';

export const HomePage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    const [showArchiveButton, setShowArchiveButton] = useState(true);

    return (
        <div className={styles.root}>
            <Navbar/>
            <div className={styles.actionContainer}>
                <div className={cls(styles.search, { [styles.wideSearch]: searchFocus })}>
                    <input
                        value={searchText}
                        placeholder="Поиск"
                        onChange={(e) => setSearchText(e.target.value)}
                        onFocus={() => {
                            setSearchFocus(true);
                            setShowArchiveButton(false);
                        }}
                    />
                    <img src={crossImg} onClick={() => {
                        setSearchText('');
                        setSearchFocus(false);
                        setTimeout(() => setShowArchiveButton(true), 700);
                    }}/>
                </div>
                {showArchiveButton && (
                    <Button
                        className={cls(styles.button, { [styles.hiddenButton]: searchFocus })}
                        variant="not-filled"
                        text="Архив записей"
                    />)}
            </div>
            {searchText.length > 2 ? <Loader /> : (
                <div className="daysList">
                    {daysList.map((day) => <DayItem key={day.id} day={day}/>)}
                </div>)}
        </div>
    );
};

export default HomePage;
