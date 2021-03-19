import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/result.module.css';

//  main에서 16가지 mbti 유형 조회
function ListMBTI() {
    type mbtiAll = {
        type: '',
        percent: '',
        img: ''
    }

    const [mbti, setMBTI] = useState<Array<mbtiAll>>([{
        type: '',
        percent: '',
        img: ''
    }]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);

    // 모든 mbti 유형 불러와 setMBTI
    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/land`)
            .then((res) => {
                setMBTI(res.data);
                setConstructorHasRun(true);
            })
            .catch((err) => { console.log(err) });
    };
    constructor();

    //  mbti 유형별 요소 mapping
    const list = mbti.map((li, idx) => <div key={idx} className={styles.mbtiDiv}>
        <img src={li.img} width="80"></img>
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