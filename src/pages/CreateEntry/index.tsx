import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';

import TextBox from '../../components/TextBox';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
    webAppMainButtonHide,
} from '../../utils/telegram';
import {
    setCalendar, setPost, setShowPostInput, setTime,
} from '../../store/createEntrySlice';
import DatePicker from '../../components/DatePicker';
import { ReactComponent as CalendarImg } from '../../assets/img/calendar.svg';
import { ReactComponent as TimeImg } from '../../assets/img/time.svg';

// import MainButton from '../../components/MainButton';

import styles from './createEntry.module.scss';

/* const getEntryTime = (selectDate: Date | undefined, selectTime: string) => {
    if (selectDate && selectTime.length > 0) {
        const formatDate = formatISO(selectDate);
        return `${formatDate.substring(0, formatDate.length - 14)}${selectTime}:00`;
    }
    return '';
}; */

const CreateEntry = () => {
    const dispatch = useAppDispatch();
    const {
        isShowPostInput, date, time, point,
    } = useAppSelector((state) => state.createEntry);

    const { userId } = useAppSelector((state) => state.app.user);

    const [selectedDate, setSelectedDate] = useState<Date>();

    const timeArr = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:30', '12:00',
        '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>Создаём новую запись</div>
                <Link to={`/?userId=${userId}`}>
                    <div
                        className={styles.cancel}
                        onClick={() => webAppMainButtonHide()}
                    >
                        Не создавать
                    </div>
                </Link>
            </div>
            <div className={styles.title}>Когда</div>
            <div className={styles.dateWrapper}>
                <div
                    className={styles.inputWrapper}
                    onClick={(event) => {
                        const el = event.currentTarget;
                        const { top, left } = el.getBoundingClientRect();
                        dispatch(setCalendar({ isVisible: true, position: { top, left } }));
                    }}
                >
                    <div className={styles.imageWrapper}>
                        <CalendarImg />
                    </div>
                    <input
                        readOnly
                        value={date}
                    />
                    <span className={styles.placeholder}>
                        {!date && <span>Дата</span>}
                    </span>
                </div>
                <DatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <div className={styles.inputWrapper}>
                    <div className={styles.imageWrapper}>
                        <TimeImg />
                    </div>
                    <select
                        value={time}
                        onChange={(e) => dispatch(setTime(e.target.value))}
                        className={cls(styles.time, { [styles.selectedTime]: time })}
                    >
                        <option value="" disabled hidden>Время</option>
                        {timeArr.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <div className={styles.createPostWrapper}>
                {isShowPostInput
                    ? (
                        <div className={styles.textBoxWrapper}>
                            <div className={styles.title}>Пост</div>
                            <TextBox
                                className={styles.textBox}
                                value={point}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch(setPost(event.target.value))}
                            />
                            <div className={styles.subText}>Например, «№1» или «Сход-развал». Это необязательное поле</div>
                        </div>
                    )
                    : (
                        <div className={styles.createPost} onClick={() => dispatch(setShowPostInput(true))}>
                            <span>Добавить пост</span>
                            <span className={styles.subText}>необязательно</span>
                        </div>
                    )}
            </div>
            {/* <MainButton isShow text="Тест" /> */}
        </div>
    );
};

export default CreateEntry;
