import React, {
    useState, useRef, ChangeEvent, /* , useEffect, */
} from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';
import ru from 'date-fns/locale/ru';
import { differenceInCalendarDays, format } from 'date-fns';
import stylesPicker from 'react-day-picker/dist/style.module.css';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import dayjs from 'dayjs';

import { ReactComponent as CalendarImg } from '../../assets/img/calendar.svg';
import { ReactComponent as TimeImg } from '../../assets/img/time.svg';
import { useOnClickOutside } from '../../utils/useOnClickOutside';
import TextBox from '../../components/TextBox';

import { fetchAddEntryRequest } from '../../api';

import styles from './createNewEntry.module.scss';

const calendarClassNames: ClassNames = {
    ...stylesPicker,
    root: styles.pickerRoot,
    caption_label: styles.captionLabel,
    day_selected: styles.daySelected,
    day_outside: styles.dayOutside,
    button: cls(stylesPicker.button, styles.button),
    nav_button: cls(stylesPicker.nav_button, styles.navButton),
};

const CreateNewEntry = () => {
    const calendarRef = useRef<HTMLDivElement>(null);

    const [calendarPopup, setCalendarPopup] = useState({ isOpen: false, top: 0, left: 0 });
    const [isShowPostInput, setIsShowPostInput] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [postValue, setPostValue] = useState('');

    // useEffect(() => {
    //     if (dateValue !== '' && timeValue !== '') {
    //         // @ts-ignore
    //         window.Telegram.WebApp.MainButton.show();
    //     }
    // }, [dateValue, timeValue]);

    // @ts-ignore
    //

    useOnClickOutside(calendarPopup.isOpen, calendarRef, () => setCalendarPopup({ ...calendarPopup, isOpen: false }));

    const timeArr = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

    const parsedDate = dayjs(selectedDate).format(`YYYY-MM-DDT${timeValue.length > 0 ? timeValue : '00:00'}:00Z`);

    return (
        <div className={styles.root}>
            <button
                type="button"
                onClick={() => {
                    fetchAddEntryRequest({ userId: '51673', date: parsedDate, post: postValue });
                }}
            >
                Отправить тест
            </button>
            <div>{parsedDate}</div>

            <div className={styles.header}>
                <div className={styles.title}>Создаём новую запись</div>
                <Link to="/">
                    <div className={styles.cancel}>Не создавать</div>
                </Link>
            </div>
            <div className={styles.title}>Когда</div>
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
            <div className={styles.createPostWrapper}>
                {isShowPostInput
                    ? (
                        <div className={styles.textBoxWrapper}>
                            <div className={styles.title}>Пост</div>
                            <TextBox
                                className={styles.textBox}
                                value={postValue}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPostValue(event.target.value)}
                            />
                            <div className={styles.subText}>Например, «№1» или «Сход-развал». Это необязательное поле</div>
                        </div>
                    )
                    : (
                        <div className={styles.createPost} onClick={() => setIsShowPostInput(true)}>
                            <span>Добавить пост</span>
                            <span className={styles.subText}>необязательно</span>
                        </div>
                    )}
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
                        classNames={calendarClassNames}
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
