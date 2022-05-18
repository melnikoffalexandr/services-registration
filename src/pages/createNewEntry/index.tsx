import React, { useState, useRef, useEffect } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import stylesPicker from 'react-day-picker/dist/style.module.css';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

import { ReactComponent as CalendarImg } from '../../assets/img/calendar.svg';
// import { ReactComponent as TimeImg } from '../../assets/img/time.svg';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

import { useDisableBodyScroll } from '../../utils/useDisableBodyScroll';

import styles from './createNewEntry.module.scss';


export const CreateNewEntry = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);

    const [calendarPopup, setCalendarPopup] = useState({ isOpen: false, top: 0, left: 0 });
    const [timePopup, setTimePopup] = useState({ isOpen: false, width: 0, top: 0, left: 0 });
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateValue, setDateValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>('');


    useDisableBodyScroll(timePopup.isOpen);
    useOnClickOutside(calendarPopup.isOpen, calendarRef, () => setCalendarPopup({ ...calendarPopup, isOpen: false }));
    useOnClickOutside(timePopup.isOpen, timeRef, () => setTimePopup({ ...timePopup, isOpen: false }));

    const classNames: ClassNames = {
        ...stylesPicker,
        caption_label: styles.captionLabel,
        day_selected: styles.daySelected,
        day_outside: styles.dayOutside,
        button: cls(stylesPicker.button, styles.button),
        nav_button: cls(stylesPicker.nav_button, styles.navButton)
    };

    const timeArr = ['8:00', '8:30', '9:00','9:30','10:00','10:30','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30', '19:00','19:30','20:00'];

    useEffect(() => {
        const el = document.getElementById('selected');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [timePopup.isOpen]);

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
                        onClick={(event) => {
                            const el = event.currentTarget;
                            const { top, left } = el.getBoundingClientRect();
                            setCalendarPopup({ isOpen: true, top: top, left: left });
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
                    {/*<div
                        className={styles.inputWrapper}
                        onClick={(event) => {
                            const el = event.currentTarget;
                            const { top, left, width } = el.getBoundingClientRect();
                            setTimePopup({ isOpen: true, width: width, top: window.pageYOffset + top, left });
                            // @ts-ignore
                            window.Telegram.WebApp.expand();
                        }}
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
                    </div>*/}
                    <select
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                    >
                        <option value="default" disabled>
                          Время
                        </option>
                        {timeArr.map(item => <option value={item}>{item}</option>)}
                    </select>
                </div>
            </div>


            {calendarPopup.isOpen && createPortal(
                <div
                    ref={calendarRef}
                    style={{
                        top: calendarPopup.top,
                        left: calendarPopup.left
                    }}
                    className={styles.calendarWrapper}
                >
                    <DayPicker
                        classNames={classNames}
                        showOutsideDays
                        defaultMonth={selectedDate}
                        locale={ru}
                        mode="single"
                        selected={selectedDate}
                        onDayClick={(date) => {
                            if (date) {
                                setSelectedDate(date);
                                setDateValue(format(date, 'dd.MM.yyyy'));
                                setCalendarPopup({ ...calendarPopup, isOpen: false });
                            }
                        }}
                    />
                </div>, document.body
            )}



            {timePopup.isOpen && createPortal(
                <div
                    ref={timeRef}
                    style={{
                        width: timePopup.width,
                        top: timePopup.top,
                        left: timePopup.left
                    }}
                    className={styles.timeRoot}>
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
                                        setTimePopup({ ...timePopup, isOpen: false });
                                    }
                                }}
                            >
                                {item}
                            </div>)
                        )}
                    </div>
                </div>, document.body
            )}
        </div>
    );
};

export default CreateNewEntry;
