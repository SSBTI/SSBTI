import React, { useState } from 'react';
import styles from '../../../styles/commentList.module.css';

function commentList() {
    type comment = {
        author: string,
        time: string,
        content: string,
    }

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [commentList, setList] = useState<Array<comment>>([
        {
            author: '익명1',
            time: '21-03-24 17:18',
            content: '예시입니다.'
        },
        {
            author: '익명2',
            time: '21-03-24 17:19',
            content: '예시2입니다.'
        }
    ]);

    const constructor = () => {
        if (constructorHasRun) return;
        setConstructorHasRun(true);
    }

    const list = commentList.map((cmt, idx) => 
        <div key={idx} className={styles.cmtWrapper}>
            <div className={styles.author}>
                {cmt.author}
            </div>
            <div className={styles.time}>
                {cmt.time}
            </div>
            <div className={styles.content}>
                {cmt.content}
            </div>
        </div>
    );
    return (
        <div className={styles.wrapper}>
            {list}
        </div>
    )
}

export default commentList;