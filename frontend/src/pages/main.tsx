import React from 'react';
import styles from '../styles/main.module.css';
import Router from 'next/router';
import List from '../components/ListMBTI';
import AppLink from '../components/AppLink';

function Main() {
  //api 만들어지면 몇명이 이용했는지 받아온다음 버튼에 출력
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>SSBTI 테스트</div>
      <div className={styles.description}>내가 만약에..... 삼성 가전이라면?</div>
      <List />
      <button className={styles.startButton} onClick={()=> Router.push('/survey')}>
        테스트로 알아보기
        <div className={styles.total}>지금까지 20억 명이 참여했어요.</div>
      </button>
      <div>
        <AppLink href="/reviewBoard" label="ReviewCreate" />
      </div>
    </div>
  );
};

export default Main;