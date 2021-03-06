import React, {
    FC, useEffect, useRef, useState,
} from 'react';
import cls from 'classnames';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
    clearSearchResult, getAllList, getSchedulerSearch, setSearchText,
} from '../../store/schedulerSlice';
import useDebouncedCallback from '../../utils/hooks/useDebounce';
import { setLayout } from '../../store/navbarSlice';

import { ReactComponent as SearchImg } from '../../assets/img/search.svg';
import { ReactComponent as ArrowImg } from '../../assets/img/arrow.svg';
import { ReactComponent as CrossImg } from '../../assets/img/cross.svg';

import styles from './search.module.scss';

const Search:FC = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchFocus, setSearchFocus] = useState(false);

    const { home, navbar } = useAppSelector((state) => state);
    const { searchText } = home;
    const { layout } = navbar;

    const getSearch = useDebouncedCallback(() => {
        dispatch(getSchedulerSearch({ searchText }));
    }, 600);

    useEffect(() => {
        if (searchText.length >= 3) {
            getSearch();
        }
    }, [searchText]);

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
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                        onFocus={() => {
                            setSearchFocus(true);
                        }}
                    />
                    {searchText.length > 0 && searchText.length < 3 && searchFocus && (
                        <span
                            className={styles.placeholder}
                            style={{
                                left: !searchText.length ? 24 : 24 + 7 * searchText.length,
                            }}
                        >
                            — введите не менее 3 символов
                        </span>
                    )}
                    {searchFocus && (
                        <div
                            className={styles.crossImageWrapper}
                            onClick={() => {
                                dispatch(setSearchText(''));
                                dispatch(clearSearchResult());
                                setSearchFocus(false);
                            }}
                        >
                            <CrossImg />
                        </div>
                    )}
                </div>
                {layout === 'entries' && (
                    <div
                        className={cls(styles.archiveButton, { [styles.archiveHiddenButton]: searchFocus })}
                        onClick={() => {
                            dispatch(setLayout('archive'));
                            dispatch(getAllList());
                        }}
                    >
                        <span>Архив</span>
                        <ArrowImg />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
