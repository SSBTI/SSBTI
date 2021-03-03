import React from 'react';
import styles from '../styles/main.module.css';
import Router from 'next/router';

function Main() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>SSBTI 테스트</div>
      <div className={styles.description}>내가 만약에..... 삼성 가전이라면?</div>
      <button className={styles.startButton} onClick={()=> Router.push('/survey')}>
        테스트로 알아보기
        {/* 현재 총 20억명이 참여했어요. */}
      </button>
    </div>
  );
};

export default Main;