import React, { useEffect } from 'react';

import DayItem from '../DayItem';
import SearchItem from '../SearchItem';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getAllList } from '../../store/schedulerSlice';
import { ReactComponent as LoaderImg } from '../../assets/img/loader.svg';

import styles from './daysList.module.scss';

const DaysList = () => {
    const dispatch = useAppDispatch();
    const { search, list, searchText } = useAppSelector((state) => state.home);

    useEffect(() => {
        dispatch(getAllList());
    }, [dispatch]);

    if (list.loading || search.loading) {
        return (
            <LoaderImg />
        );
    }

    if (search.data.length > 0 && searchText.length >= 3) {
        return (
            <>
                {search.data.map((item, index) => <div key={index} className={styles.root}><SearchItem searchItem={item} /></div>)}
            </>
        );
    }

    return (
        <>
            {list.data.map((item) => <div key={item.id} className={styles.root}>{item.entry.map((day) => <DayItem key={day.date} day={day} />)}</div>)}
        </>
    );
};

export default DaysList;
