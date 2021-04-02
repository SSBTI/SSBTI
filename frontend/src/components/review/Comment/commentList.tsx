import React, { useState } from 'react';
import styles from '../../../styles/commentList.module.css';
import axios from 'axios';

function commentList(props) {
    type comment = {
        author: string,
        time: string,
        content: string,
    }

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [commentList, setList] = useState<Array<comment>>([]);

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_COMMENT_API}`, {
            params: {
                review_id: props.no
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((err)=> { console.log(err) });
        setConstructorHasRun(true);
    }
    constructor();

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