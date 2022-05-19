import React, {
    ChangeEvent,
    FC, useRef, useState,
} from 'react';
import cls from 'classnames';

import { useOnClickOutside } from '../../utils/useOnClickOutside';

import styles from './TextBox.module.scss';

interface Props {
    className?: string;
    type?: 'text' | 'password';
    value?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextBox:FC<Props> = ({
    className = '', type = 'text', value, placeholder, onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);

    useOnClickOutside(isFocused, inputRef, () => setIsFocused(false));

    return (
        <div className={cls(styles.root, className, { [styles.rootFocused]: isFocused })}>
            <input
                ref={inputRef}
                type={type}
                value={value}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onChange={onChange}
            />
        </div>
    );
};

export default TextBox;
