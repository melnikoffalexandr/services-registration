import React, { FC, useRef } from 'react';
import cls from 'classnames';
import { createPortal } from 'react-dom';
import { ClassNames, DayPicker } from 'react-day-picker';
import { differenceInCalendarDays, format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import stylesPicker from 'react-day-picker/dist/style.module.css';

import { setCalendar, setDate } from '../../store/createEntrySlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useOnClickOutside } from '../../utils/hooks/useOnClickOutside';

import styles from './datePicker.module.scss';

const calendarClassNames: ClassNames = {
    ...stylesPicker,
    root: styles.pickerRoot,
    caption_label: styles.captionLabel,
    day_selected: styles.daySelected,
    day_outside: styles.dayOutside,
    button: cls(stylesPicker.button, styles.button),
    nav_button: cls(stylesPicker.nav_button, styles.navButton),
};

interface Props {
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date) => void;
}

const DatePicker:FC<Props> = ({ selectedDate, setSelectedDate }) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const { calendar } = useAppSelector((state) => state.createEntry);
    const { isVisible, position } = calendar;

    const closeCalendar = () => dispatch(setCalendar({ ...calendar, isVisible: false }));

    useOnClickOutside(calendar.isVisible, calendarRef, () => closeCalendar());

    return (
        <div>
            {isVisible && createPortal(
                <div
                    ref={calendarRef}
                    style={{
                        top: position.top + 47,
                        left: position.left,
                    }}
                    className={styles.calendarWrapper}
                >
                    <DayPicker
                        classNames={calendarClassNames}
                        showOutsideDays
                        disabled={(value) => differenceInCalendarDays(value, new Date()) < 0}
                        defaultMonth={selectedDate}
                        locale={ru}
                        mode="single"
                        selected={selectedDate}
                        onSelect={(value) => {
                            if (value) {
                                setSelectedDate(value);
                                dispatch(setDate(format(value, 'dd.MM.yyyy')));
                                closeCalendar();
                            }
                        }}
                    />
                </div>, document.body,
            )}
        </div>
    );
};

export default DatePicker;
