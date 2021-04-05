import React, { useState } from 'react';
import List from '../components/ListMBTI';
import Layout from '../components/Layout';
import styles from '../styles/dashboard.module.css';
import axios from "axios";
import Router from 'next/router';

export default function dashboard() {
  type mbtiAll = {
    type: string,
    percent: string,
  }
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [mbticloudwatch, setMbticloudwatch] = useState('');
  const [chatmetricvisualizer,setChatmetricvisualizer] = useState('');
  const [chatvisualizer,setChatvisualizer] = useState([]);  
  const [total,setTotal] = useState(0);
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
  const constructor = async() => {
    if(constructorHasRun) return;
    // MBTI cloudwatch
    try {
    const mbti_cloudwatch = await axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/cloudwatch`, {responseType: 'blob'});
    const mbticloudwatchURL = URL.createObjectURL(mbti_cloudwatch.data);
    setMbticloudwatch(mbticloudwatchURL);
    //chat metricvisualizer
    const chat_metric_visualizer = await axios.get(`${process.env.NEXT_PUBLIC_NICKNAME_API}/metricvisualizer`, {responseType: 'blob'});
    const chat_metric_visualizerURL = URL.createObjectURL(chat_metric_visualizer.data);
    setChatmetricvisualizer(chat_metric_visualizerURL);

    //chat log 
    const chat_log_res = await axios.get(`${process.env.NEXT_PUBLIC_NICKNAME_API}/visualizer`);
    const chat_log = (chat_log_res.data.results);
    const chat_visual = [];
    chat_log.forEach((msg) => {
      let temp = '';
      temp += msg[0].value + " " + msg[1].value;
      chat_visual.push(temp);
    })
    // console.log(chat_visual);
    setChatvisualizer(chat_visual);
    //total
    const landInfo = await axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/land`);
    // console.log(landInfo.data.slice(16));
    setMBTI(landInfo.data.slice(0, 16));
    setTotal(landInfo.data.slice(16));
    // console.log(total);
    
    setConstructorHasRun(true);
    }
    catch(error) {
      console.error(error)
    }
    
  };
  

  const goReview = () => {
    Router.push('/reviewList');
  };

  const goHome = () => {
    Router.push('/');
  }

  constructor();
  return (
    <Layout>
      <div className={styles.navbar}>
        <div className={styles.title}>
          대시보드
        </div>
        <div className={styles.buttons}>
          <div className={styles.homebutton} onClick={()=>goHome()}>홈</div>
          <div className={styles.reviewbutton} onClick={()=>goReview()}>리뷰</div>
        </div>
      </div>
      <div className={styles.whole}>
        <div className={styles.visits}>
          <div className={styles.totalVisit}>
            <div className={styles.totalVisit__title}>총 방문자 수</div>
            <div className={styles.totalVisit__cnt}>{total}</div>
          </div>
          <div className={styles.todayVisit}>
            <div className={styles.todayVisit__title}>오늘 방문자 수</div>
            <div className={styles.todayVisit__cnt}>{total}</div>
          </div>
        </div>
        <div className={styles.infos}>
          <div className={styles.serverless}>
            <div className={styles.subtitle}>서버</div>
            <div className={styles.mbti__title}>MBTI 결과 요청</div>
            <div className={styles.graph__frame}>
              <img className={styles.mbti__graph} src = {mbticloudwatch}></img>
            </div>
            <div className={styles.chat__title}>채팅 참여 요청</div>
            <div className={styles.graph__frame}>
              <img className={styles.chat__graph} src= {chatmetricvisualizer}/>
            </div>
          </div>
          
          
          <div className={styles.typeInfo}>
            <div className={styles.typeInfo__title}>성향 정보</div>
            <div className={styles.typeInfo__info}>
              <List mbti={mbti}/>
            </div>
          </div>
        </div>
        <div className={styles.log}>
          <div className={styles.chat__title}>채팅 서버 로그</div>
          <div className={styles.graph__frame}>
            <div>
              {chatvisualizer.map((each,idx) => {
                return <div key={idx}>{each}</div>
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}