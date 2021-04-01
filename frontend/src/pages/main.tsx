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
      percent: '',
  },{
    type: 'INTP',
    percent: '',
},{
  type: 'ENTJ',
  percent: '',
},{
  type: 'ENTP',
  percent: '',
},{
  type: 'INFJ',
  percent: '',
},{
  type: 'INFP',
  percent: '',
},{
  type: 'ISTJ',
  percent: '',
},{
  type: 'ISFJ',
  percent: '',
},{
  type: 'ESTJ',
  percent: '',
},{
  type: 'ESFJ',
  percent: '',
},{
  type: 'ENFJ',
  percent: '',
},{
  type: 'ENFP',
  percent: '',
},{
  type: 'ISTP',
  percent: '',
},{
  type: 'ISFP',
  percent: '',
},{
  type: 'ESTP',
  percent: '',
},{
  type: 'ESFP',
  percent: '',
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