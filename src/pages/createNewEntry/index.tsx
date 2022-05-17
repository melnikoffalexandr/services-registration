import React, { useState, useRef, useEffect } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import stylesPicker from 'react-day-picker/dist/style.module.css';
import cls from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as CalendarImg } from '../../assets/img/calendar.svg';
import { ReactComponent as TimeImg } from '../../assets/img/time.svg';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

import styles from './createNewEntry.module.scss';


export const CreateNewEntry = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const [timeIsOpen, setTimeIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateValue, setDateValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>('');


    useOnClickOutside(calendarIsOpen, calendarRef, () => setCalendarIsOpen(false));
    useOnClickOutside(timeIsOpen, timeRef, () => setTimeIsOpen(false));

    const classNames: ClassNames = {
        ...stylesPicker,
        root: styles.pickerRoot,
        caption_label: styles.captionLabel,
        day_selected: styles.daySelected,
        day_outside: styles.dayOutside,
        button: cls(stylesPicker.button, styles.button),
        nav_button: cls(stylesPicker.nav_button, styles.navButton)
    };

    const handleDaySelect = (date: Date) => {
        setSelectedDate(date);
        setDateValue(format(date, 'dd.MM.yyyy'));
        setCalendarIsOpen(!calendarIsOpen);
    };

    const timeArr = ['8:00', '8:30', '9:00','9:30','10:00','10:30','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30', '19:00','19:30','20:00'];

    useEffect(() => {
        const el = document.getElementById('selected');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [timeIsOpen]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>Создаём новую запись</div>
                <Link to="/">
                    <div className={styles.cancel}>Не создавать</div>
                </Link>
            </div>
            <div className={styles.dateTitle}>Когда</div>
            <div className={styles.calendarWrapper}>
                <div className={styles.dateWrapper}>
                    <div
                        className={styles.inputWrapper}
                        onClick={() => setCalendarIsOpen(!calendarIsOpen)}
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
                        {calendarIsOpen && (
                            <div ref={calendarRef}>
                                <DayPicker
                                    classNames={classNames}
                                    showOutsideDays
                                    defaultMonth={selectedDate}
                                    locale={ru}
                                    mode="single"
                                    selected={selectedDate}
                                    onDayClick={(date) => {
                                        if (date) {
                                            handleDaySelect(date);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.inputWrapper}
                        onClick={() => setTimeIsOpen(!timeIsOpen)}
                    >
                        <div className={styles.imageWrapper}>
                            <TimeImg />
                        </div>
                        <input
                            readOnly
                            value={timeValue}
                        />
                        <span className={styles.placeholder}>
                            {!timeValue && <span>Время</span>}
                        </span>
                        {timeIsOpen && (
                            <div ref={timeRef} className={styles.timeRoot}>
                                <div className={styles.timeTitle}>Выберете время</div>
                                <div className={styles.timeWrapper}>
                                    {timeArr.map((item, index) => (
                                        <div
                                            id={item === timeValue ? 'selected' : `${index}`}
                                            key={item}
                                            className={cls(styles.time, { [styles.activeTime]: item === timeValue })}
                                            onClick={({ currentTarget }) => {
                                                if (currentTarget?.textContent) {
                                                    setTimeValue(currentTarget.textContent);
                                                    setTimeIsOpen(!timeIsOpen);
                                                }
                                            }}
                                        >
                                            {item}
                                        </div>)
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewEntry;
