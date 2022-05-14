import React, { useRef, useState } from 'react';
import cls from 'classnames';

import { ReactComponent as SearchImg } from '../../assets/img/search.svg';
import { ReactComponent as ArrowImg } from '../../assets/img/arrow.svg';
import { ReactComponent as CrossImg } from '../../assets/img/cross.svg';

import styles from './search.module.scss';

export const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);

    return (
        <div className={styles.root}>
            <div className={cls(styles.search, { [styles.wideSearch]: searchFocus })}>
                <div
                    className={styles.inputWrapper}
                    onClick={() => !searchFocus && inputRef?.current?.focus()}
                >
                    {!searchFocus && (
                        <div className={styles.searchImageWrapper}>
                            <SearchImg />
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        value={searchText}
                        placeholder={searchFocus ? '' : 'Поиск записей'}
                        onChange={(e) => setSearchText(e.target.value)}
                        onFocus={() => {
                            setSearchFocus(true);
                        }}
                    />
                    {searchText.length < 3 && searchFocus && (
                        <span
                            className={styles.placeholder}
                            style={{
                                left: !searchText.length ? 24 : 24 + 7 * searchText.length
                            }}>
                      — введите не менее 3 символов
                        </span>)
                    }
                    {searchFocus && (
                        <div
                            className={styles.crossImageWrapper}
                            onClick={() => {
                                setSearchText('');
                                setSearchFocus(false);
                            }}>
                            <CrossImg/>
                        </div>
                    )}
                </div>
                <div className={cls(styles.archiveButton, { [styles.archiveHiddenButton]: searchFocus })} onClick={() => console.log('Archive')}>
                    <span>Архив</span>
                    <ArrowImg />
                </div>
            </div>
        </div>
    );
};

export default Search;
