import React from 'react';
import styles from '../../../styles/information.module.css';

function Information() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.text}>
                이 화면은 가로 500px 이상의 해상도에 적절합니다.
            </div>
            <img src='/mbti/INTP.png' className={styles.img} />
        </div>
    )
}

export default Information;