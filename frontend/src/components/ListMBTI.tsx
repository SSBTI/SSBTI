import React from 'react';
import styles from '../styles/result.module.css';

//  main에서 16가지 mbti 유형 조회
function ListMBTI(props) {

    const imgSrc = (str: string) => {
        return '/mbti/' + str + '.png';
    }
    //  mbti 유형별 요소 mapping
    const list = props.mbti.map((li, idx) => <div key={idx} className={styles.mbtiDiv}>
        <img src={imgSrc(li.type)} width="80"></img>
        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{li.type}</div>
        <div style={{ fontSize: '10px' }}>{li.percent}</div>
    </div>);

    return (
        <div style={{ marginBottom: '50px'}}>
            {list}
        </div>
    );
}

export default ListMBTI;