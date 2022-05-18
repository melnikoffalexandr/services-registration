import React, { useState, useRef } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';
import ru from 'date-fns/locale/ru';
import { differenceInCalendarDays, format } from 'date-fns';
import stylesPicker from 'react-day-picker/dist/style.module.css';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

import { ReactComponent as CalendarImg } from '../../assets/img/calendar.svg';
import { ReactComponent as TimeImg } from '../../assets/img/time.svg';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

import styles from './createNewEntry.module.scss';

const CreateNewEntry = () => {
    const calendarRef = useRef<HTMLDivElement>(null);

    const [calendarPopup, setCalendarPopup] = useState({ isOpen: false, top: 0, left: 0 });
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateValue, setDateValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>('');

    useOnClickOutside(calendarPopup.isOpen, calendarRef, () => setCalendarPopup({ ...calendarPopup, isOpen: false }));

    const classNames: ClassNames = {
        ...stylesPicker,
        root: styles.pickerRoot,
        caption_label: styles.captionLabel,
        day_selected: styles.daySelected,
        day_outside: styles.dayOutside,
        button: cls(stylesPicker.button, styles.button),
        nav_button: cls(stylesPicker.nav_button, styles.navButton),
    };

    const timeArr = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>Создаём новую запись</div>
                <Link to="/">
                    <div className={styles.cancel}>Не создавать</div>
                </Link>
            </div>
            <div className={styles.dateTitle}>Когда</div>
            <div className={styles.dateWrapper}>
                <div
                    className={styles.inputWrapper}
                    onClick={(event) => {
                        const el = event.currentTarget;
                        const { top, left } = el.getBoundingClientRect();
                        setCalendarPopup({ isOpen: true, top, left });
                    }}
                >
                    <div className={styles.imageWrapper}>
                        <CalendarImg />
                    </div>
                    <input
                        readOnly
                        value={dateValue}
                    />
                    <span className={styles.placeholder}>
                        {!dateValue && <span>Дата</span>}
                    </span>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.imageWrapper}>
                        <TimeImg />
                    </div>
                    <select
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                        className={cls(styles.time, { [styles.selectedTime]: timeValue })}
                    >
                        <option value="" disabled hidden>Время</option>
                        {timeArr.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            {calendarPopup.isOpen && createPortal(
                <div
                    ref={calendarRef}
                    style={{
                        top: calendarPopup.top + 47,
                        left: calendarPopup.left,
                    }}
                    className={styles.calendarWrapper}
                >
                    <DayPicker
                        classNames={classNames}
                        showOutsideDays
                        disabled={(date) => differenceInCalendarDays(date, new Date()) < 0}
                        defaultMonth={selectedDate}
                        locale={ru}
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            if (date) {
                                setSelectedDate(date);
                                setDateValue(format(date, 'dd.MM.yyyy'));
                                setCalendarPopup({ ...calendarPopup, isOpen: false });
                            }
                        }}
                    />
                </div>, document.body,
            )}
        </div>
    );
};

export default CreateNewEntry;
