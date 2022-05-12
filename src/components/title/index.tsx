import React, { FC } from 'react';

import noteImg from '../../assets/img/note.png';

import styles from './title.module.scss';

interface Props {
  text?: string
}

export const Title:FC<Props> = ({ text }) => (
    <div className={styles.root}>
        <img src={noteImg} />
        {text && <span>{text}</span>}
    </div>
);

export default Title;
