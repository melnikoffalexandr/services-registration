import React, { useEffect } from 'react';

import DayItem from '../dayItem';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchAllEntries } from '../../store/homeSlice';
import { ReactComponent as LoaderImg } from '../../assets/img/loader.svg';

import styles from './daysList.module.scss';

const DaysList = () => {
    const dispatch = useAppDispatch();
    const { data: daysList, loading } = useAppSelector((state) => state.home.entries);

    useEffect(() => {
        dispatch(fetchAllEntries());
    }, [dispatch]);

    if (loading) {
        return (
            <LoaderImg />
        );
    }

    return (
        <>
            {daysList.map((list) => (
                <div className={styles.root}>
                    {list.entry.map((day) => <DayItem key={day.date} day={day} />)}
                </div>
            ))}
        </>
    );
};

export default DaysList;
