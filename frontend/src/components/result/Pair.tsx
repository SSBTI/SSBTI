import React from 'react';
import styles from '../../styles/result.module.css';

//  결과에 맞는 궁합
function Pair(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles.pairTitle}>{props.type}의 짝꿍<br />{props.name}</div>
            <img src={props.src} alt="" width="300" height="300" />
        </div>
    );
}

export default Pair