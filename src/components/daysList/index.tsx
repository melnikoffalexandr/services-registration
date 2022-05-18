import React, { useEffect } from 'react';

import DayItem from '../dayItem';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { daysListLocal } from '../../tempData';
import { fetchAllEntries } from '../../store/homeSlice';
import { ReactComponent as LoaderImg } from '../../assets/img/loader.svg';

import styles from './daysList.module.scss';

const DaysList = () => {
    const dispatch = useAppDispatch();
    const { data: daysListServer, loading } = useAppSelector((state) => state.home.entries);
    const daysList = process.env.NODE_ENV === 'development' ? daysListServer : daysListLocal;

    useEffect(() => {
        dispatch(fetchAllEntries());
    }, [dispatch]);

    if (loading) {
        return (
            <LoaderImg />
        );
    }

    return (
        <div className={styles.root}>
            {daysList.map((day) => <DayItem key={day.date} day={day} />)}
        </div>
    );
};

export default DaysList;
