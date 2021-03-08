import React from 'react';
import styles from '../../styles/result.module.css';

// 검사 결과 제목
function Title(props) {
    return (
        <div className={styles.title}>
            당신은<br/>
            "{props.name}"입니다.
        </div>
    );
}

export default Title