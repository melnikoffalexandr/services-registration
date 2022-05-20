import React, { useEffect } from 'react';

import DayItem from '../DayItem';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getAllEntries } from '../../store/homeSlice';
import { ReactComponent as LoaderImg } from '../../assets/img/loader.svg';

import styles from './daysList.module.scss';

const DaysList = () => {
    const dispatch = useAppDispatch();
    const { search, entries, searchText } = useAppSelector((state) => state.home);

    useEffect(() => {
        dispatch(getAllEntries());
    }, [dispatch]);

    if (entries.loading || search.loading) {
        return (
            <LoaderImg />
        );
    }

    return (
        <div>
            {search.data.length > 0 && searchText.length >= 3
                ? search.data.map((item) => <div key={item.date} className={styles.root}>{item.postName}</div>)
                : entries.data.map((list) => <div key={list.id} className={styles.root}>{list.entry.map((day) => <DayItem key={day.date} day={day} />)}</div>)}
        </div>
    );
};

export default DaysList;
