import React, { FC } from 'react';

import dayjs from '../../utils/dayjs';

import { daysList } from '../../tempData';

import { pluralize } from '../../utils/pluralize';

import styles from './dayItem.module.scss';

interface Props {
  day: typeof daysList[0];
}

export const DayItem: FC<Props> = ({ day }) => {
    const isToday = dayjs(day.date).isToday();
    return (
        <div className={styles.root}>
            <div className={styles.dayWrapper}>
                <div className={styles.date}>{dayjs(day.date).format('DD MMMM, dd ')}</div>
                {isToday && <div className={styles.todayMark}>Сегодня</div>}
            </div>
            <div className={styles.count}>{pluralize(day.count, ['запись', 'записи', 'записей'])}</div>
        </div>
    );
};

export default DayItem;
