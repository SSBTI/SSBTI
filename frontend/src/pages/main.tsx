import React, { useState } from 'react';
import styles from '../styles/main.module.css';
import Router from 'next/router';
import List from '../components/ListMBTI';
import axios from 'axios';

function Main() {
  type mbtiAll = {
      type: string,
      percent: string,
  }

  const [mbti, setMBTI] = useState<Array<mbtiAll>>([{
      type: 'INTJ',
      percent: '0.00%',
  },{
    type: 'INTP',
    percent: '0.00%',
},{
  type: 'ENTJ',
  percent: '0.00%',
},{
  type: 'ENTP',
  percent: '0.00%',
},{
  type: 'INFJ',
  percent: '0.00%',
},{
  type: 'INFP',
  percent: '0.00%',
},{
  type: 'ISTJ',
  percent: '0.00%',
},{
  type: 'ISFJ',
  percent: '0.00%',
},{
  type: 'ESTJ',
  percent: '0.00%',
},{
  type: 'ESFJ',
  percent: '0.00%',
},{
  type: 'ENFJ',
  percent: '0.00%',
},{
  type: 'ENFP',
  percent: '0.00%',
},{
  type: 'ISTP',
  percent: '0.00%',
},{
  type: 'ISFP',
  percent: '0.00%',
},{
  type: 'ESTP',
  percent: '0.00%',
},{
  type: 'ESFP',
  percent: '0.00%',
}]);

  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [total, setTotal] = useState(0);
  
  // 모든 mbti 유형 불러와 setMBTI
  const constructor = () => {
    if (constructorHasRun) return;
    axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/land`)
    .then((res) => {
      const list = res.data;
      setMBTI(list.slice(0, 16));
      setTotal(list.slice(16));
      setConstructorHasRun(true);
    })
    .catch((err) => { console.log(err) });
  };
  constructor();

  //api 만들어지면 몇명이 이용했는지 받아온 다음 버튼에 출력
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>SSBTI 테스트</div>
      <div className={styles.description}>내가 만약에..... 삼성 가전이라면?</div>
      <List mbti={mbti}/>
      <button className={styles.startButton} onClick={()=> Router.push('/survey')}>
        테스트로 알아보기
        <div className={styles.total}>지금까지 {total} 명이 참여했어요.</div>
      </button>
    </div>
  );
};

export default Main;