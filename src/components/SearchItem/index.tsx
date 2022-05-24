import React, { FC, useEffect } from 'react';
import { isToday, differenceInCalendarDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Search } from '../../types/entries';

import styles from './searchItem.module.scss';

interface Props {
    searchItem: Search;
}

const SearchItem: FC<Props> = ({ searchItem }) => {
    const isCurrentToday = isToday(new Date(searchItem.date));
    const isCurrentBefore = differenceInCalendarDays(new Date(searchItem.date), new Date()) > 0;

    useEffect(() => {
        const highlightList = document.querySelectorAll('.textYellowBackground');
        highlightList.forEach((item) => {
            // @ts-ignore
            item.style.backgroundColor = '#FFE923';
        });
    }, []);
    return (
        <div className={styles.root}>
            <div className={styles.searchInfo}>
                <div className={styles.date}>{format(new Date(searchItem.date), 'dd MMMM · HH:mm', { locale: ru })}</div>
                <div className={styles.name} dangerouslySetInnerHTML={{ __html: searchItem.client }} />
                <div className={styles.car} dangerouslySetInnerHTML={{ __html: searchItem.autoModel }} />
                {searchItem.works?.map((item) => <span className={styles.work} dangerouslySetInnerHTML={{ __html: item }} />)}
                {searchItem.additionalInfo?.map((item) => <div className={styles.info} dangerouslySetInnerHTML={{ __html: item }} />)}
            </div>
            {(isCurrentToday || isCurrentBefore) && (
                <div className={styles.badge}>
                    {isCurrentToday && 'Сегодня'}
                    {isCurrentBefore && 'Предстоит'}
                </div>
            )}
        </div>
    );
};

export default SearchItem;
