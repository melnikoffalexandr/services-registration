import React, { FC } from 'react';
import { isToday, format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { pluralize } from '../../utils/pluralize';
import { Entry } from '../../types/entries';

import styles from './dayItem.module.scss';

interface Props {
    day: Entry;
}

const DayItem: FC<Props> = ({ day }) => {
    const isCurrentToday = isToday(new Date(day.date));
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.dateWrapper}>
                    <span className={styles.weekDay}>{format(new Date(day.date), 'cccccc', { locale: ru })}</span>
                    <span className={styles.date}>{format(new Date(day.date), 'dd MMMM', { locale: ru })}</span>
                </div>
                {isCurrentToday && <div className={styles.todayMark}>это сегодня</div>}
            </div>
            <div className={styles.count}>{pluralize(day.count, ['запись', 'записи', 'записей'])}</div>
        </div>
    );
};

export default DayItem;
