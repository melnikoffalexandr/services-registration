import React, { FC } from 'react';

import dayjs from '../../utils/dayjs';
import { pluralize } from '../../utils/pluralize';
import { Entry } from '../../types/entries';

import styles from './dayItem.module.scss';

interface Props {
    day: Entry;
}

const DayItem: FC<Props> = ({ day }) => {
    const isToday = dayjs(day.date).isToday();
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.dateWrapper}>
                    <span className={styles.weekDay}>{dayjs(day.date).format('dd')}</span>
                    <span className={styles.date}>{dayjs(day.date).format('DD MMMM')}</span>
                </div>
                {isToday && <div className={styles.todayMark}>это сегодня</div>}
            </div>
            <div className={styles.count}>{pluralize(day.count, ['запись', 'записи', 'записей'])}</div>
        </div>
    );
};

export default DayItem;
