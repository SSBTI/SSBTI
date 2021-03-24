import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/survey.module.css';

type Question = {
  question: string;
  type: string;
  answers: string[];
};

type Questions = Question[];
  
function Survey() {
  
  const [MBTIscore, setMBTIscore] = useState<object>({IE:0,SN:0,TF:0,JP:0});
  const [Step,setStep] = useState<number>(0);
  const last_step :number = 11;
  const Former :number = 0;
  const Latter :number = 1;
  const Questions :Questions = [
    {question: '모처럼 여유 있는 주말을 맞이했다. 당신이 선호하는 계획은?', type: 'IE', answers:['"주말에 무슨 나들이야..." 하루종일 집에서 푹 쉰다.','"집에만 있으면 너무 답답해!" 친구들과 밖에서 같이 논다.']},
    {question: '친구가 "만약에 복권 1등 당첨됐어. 너 뭐할거야?" 라고 묻는다. 당신의 반응은?', type: 'SN', answers:['"어차피 당첨 안 됐는데 그게 무슨 의미가 있어?"','"나는 일단 바로 회사 퇴사하고, 집 사고 차 사고 ... " 행복한 상상을 늘어놓는다.']},
    {question: '새로운 가전제품을 사려고 디지털프라자에 왔다. 당신의 행동은?', type: 'JP', answers:['내가 필요한 건 저기 있네, 저쪽으로 가자.','여기 전시된 상품 좋아 보인다! 좀 더 구경해볼까?']},
    {question: '친구와 전화하던 중 "나 오늘 기분 안 좋아서 족발시켰어!" 라는 말을 들었다. 당신의 반응은?', type: 'TF', answers:['"족발? 어디 족발시켰어? 대자로 시킴? 우울했는데 나아져서 다행이네."','"헐!!! 무슨 우울한 일 있었어? 누가 기분 안좋게 했어!"']},
    {question: '일을 잘 해서 직장 상사가 칭찬을 해 줬다! 이때 당신의 마음에 더 드는 칭찬은?', type: 'TF', answers:['일을 금방 배우네요. 맡은 일을 잘 해내시고 계세요. ㅇㅇ씨 업무 스타일이 아주 마음에 듭니다.','ㅇㅇ씨는 우리 부서에 꼭 필요한 사람이에요. 앞으로도 이대로 진행 부탁드리겠습니다.']},
    {question: '주말에 해야할 일이 있다. 당신의 계획은?', type: 'JP', answers:['ㅇ시까지는 해야겠구나! 우선순위대로 처리한다.','ㅇ시까지는 놀아도 되겠다ㅎㅎ 마감까지 최대한 미룬다.']},
    {question: '삼성전자에서 야심차게 준비한 새로운 제품이 출시되었다. 이 소식을 들은 당신은?', type: 'SN', answers:['지금 나에게 이 제품이 왜 필요한지 먼저 생각한다.','이 제품을 사용하고 있는 나의 모습을 상상한다.']},
    {question: '처음 보는 사람들이 많은 모임에 가게 되었다. 당신의 행동은?', type: 'IE', answers:['"아 빨리 집에 가고싶다..." 적당히 있다가 집에 갈 타이밍을 모색한다.','"안녕하세요 저는 ㅇㅇ입니다~" 친해지고 싶은 사람에게 먼저 다가가 말을 건다.']},
    {question: '새 학기 새 단톡방에 초대되었다. 당신의 행동은?', type: 'IE', answers:['이 사람들 언제 인사 시작하는거지? 눈치를 보면서 인사할 타이밍을 기다린다.','온갖 화려한 이모티콘과 함께 가장 먼저 인사를 건낸다.']},
    {question: '출시된 제품을 구매한 당신! 함께 동봉된 설명서를 어떻게 읽을 것인가?', type: 'SN', answers:['사용하고 싶었던 기능을 찾아 꼼꼼히 읽어본다.','대충 어떤 기능들이 있는지 휙휙 넘겨본다.']},
    {question: '가려고 했던 식당이 문을 닫았을 때 당신은?', type: 'JP', answers:['음 그럼 제일 가까우면서 염두에 뒀던 곳 다시 찾아보자.','오.. 아까 지나오면서 봤던 곳도 괜찮던데 가볼까?']},
    {question: '얼떨결에 나간 소개팅, 상대방이 나를 마음에 들어 하는 것 같다! 당신이 이렇게 생각한 이유는?', type: 'TF', answers:['상대방이 나에게 많은 것을 물어본다! 좋아하는 영화 장르부터, 그 영화를 좋아하는 이유까지.','상대방이 나의 말에 리액션을 잘 해 준다! 내가 그때 느꼈을 감정을 같이 느끼면서 웃어주고 공감해준다.']}
  ];
  

  const onAnswer = (pick: number) => {
    
    // mbti 점수 변경
    const type = Questions[Step].type;
    const BeforeTypeScore = MBTIscore[type];
    const changedMBTIscore = {...MBTIscore};
    if(pick === Former) {
      changedMBTIscore[type] += 1;
    } else {
      changedMBTIscore[type] -= 1;
    }
    
    // console.log(changedMBTIscore);
    setMBTIscore(changedMBTIscore);
    
    if(Step < last_step) {
      setStep(Step+1);
      //게이지 변경
      const GaugeCircle:HTMLElement = document.querySelector("#GaugeCircle");
      const GaugeCirclePos = (Step+1)*440/12+10;
      GaugeCircle.style.left = `${GaugeCirclePos}px`;
    } else {
      console.log(changedMBTIscore);
      let MBTI = '';
      if(changedMBTIscore['IE'] > 0) {
        MBTI += 'I'
      } else {
        MBTI += 'E'
      }
      if(changedMBTIscore['SN'] > 0) {
        MBTI += 'S'
      } else {
        MBTI += 'N'
      }
      if(changedMBTIscore['TF'] > 0) {
        MBTI += 'T'
      } else {
        MBTI += 'F'
      }
      if(changedMBTIscore['JP'] > 0) {
        MBTI += 'J'
      } else {
        MBTI += 'P'
      }
      Router.push(
        '/result',
        `/result/${MBTI}`,
        changedMBTIscore,
      );
      // 얘를 결과창으로 보내주자
    }
    
    
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.QuestionGauge}>
        <div id="GaugeCircle" className={styles.GaugeCircle}><span>{Step+1}</span></div>
        <div className={styles.GaugeLine}></div>
      </div>
      <div className={styles.QuestionText}>{Questions[Step].question}</div>
      <button className={styles.AnswerButton} onClick={()=>onAnswer(Former)}>A. {Questions[Step].answers[Former]}</button>
      <button className={styles.AnswerButton} onClick={()=>onAnswer(Latter)}>B. {Questions[Step].answers[Latter]}</button>
    </div>
  );
}

export default Survey;