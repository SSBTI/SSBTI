import React from 'react';
import styles from '../../styles/result.module.css';

//  검사 결과에 해당하는 설명
function Desc(props) {
    return (
        <li className={styles.li}>{props.desc}</li>
    );
}

export default Desc