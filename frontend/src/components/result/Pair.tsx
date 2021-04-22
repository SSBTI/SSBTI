import React from 'react';
import styles from '../../styles/result.module.css';
import style from '../../styles/image.module.css';

//  결과에 맞는 궁합
function Pair(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles.pairTitle}>{props.type}의 짝꿍<br />{props.name}</div>
            <img src={props.src} alt="" className={style.img}/>
        </div>
    );
}

export default Pair