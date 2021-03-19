import React from 'react';
import styles from '../styles/main.module.css';
import Router from 'next/router';
import List from '../components/ListMBTI';

function Main() {
  // 리뷰 목록 조회 시 첫 페이지 번호
  const page = 1;

  //api 만들어지면 몇명이 이용했는지 받아온 다음 버튼에 출력
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
        <button className={styles.startButton} onClick={()=>Router.push({
          pathname: '/reviewList',
          query: { page: 1 }
        })}>
          삼성 제품 리뷰 보러가기
        </button>
      </div>
    </div>
  );
};

export default Main;