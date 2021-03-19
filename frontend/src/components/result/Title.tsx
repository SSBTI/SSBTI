import React from 'react';
import styles from '../../styles/result.module.css';

// 검사 결과 제목
function Title(props) {
    return (
        <div>
            <div className={styles.title}>
                당신은<br/>
                "{props.name}"입니다.
            </div>
            <div className={styles.statistics}>
                같은 유형의 사람이 총 <div className={styles.bold}>{props.count}</div>명 있습니다.<br />
                이 검사를 실시한 사람 중 <div className={styles.bold}>{props.ratio}%</div>에 해당합니다.
            </div>
        </div>
    );
}

export default Title