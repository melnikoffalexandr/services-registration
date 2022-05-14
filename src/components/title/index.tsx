import React, { FC } from 'react';

import styles from './title.module.scss';

interface Props {
  text?: string
}

export const Title:FC<Props> = ({ text }) => (
    <div className={styles.root}>
        {text}
    </div>
);

export default Title;
