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
    {question: "모처럼 여유 있는 주말에 나는?", type: "IE", answers:["하루종일 집에서 푹 쉰다","친구들과 밖에서 같이 논다"]},
    {question: "처음 가는 모임에서 나는?", type: "IE", answers:["사람들이 말을 걸어줄 때까지 기다린다","친구들과 밖에서 같이 논다"]},
    {question: "친구들과 만날 때 나는?", type: "IE", answers:["시끄러운건 싫어.. 소수의 친구들과 소소한 대화를 나눈다","사람이 많고 시끄럽고 신나는 분위기가 좋다"]},
    {question: "새로운 가전제품을 사려고 할 때 나는?", type: "JP", answers:["내가 필요한 건 저기있네, 저쪽으로 가자","여기 전시된 상품 좋아보인다! 좀 더 구경해볼까?"]},
    {question: "과제가 생겼을 때 나는?", type: "JP", answers:["이때까지는 해야겠구나! 우선순위대로 처리한다","이때까지는 놀아도 되겠다ㅎㅎ 마감까지 최대한 미룬다"]},
    {question: "가려고 했던 식당이 문을 닫았을 때 나는?", type: "JP", answers:["음 그럼 제일 가까우면서 염두에 뒀던 곳 다시 찾아보자","오.. 아까 지나오면서 봤던 곳도 괜찮던데 가볼까?"]},
    {question: '친구와 전화하던 중 "나 오늘 기분 안좋아서 족발시켰어!" 라는 말을 들었다. 당신의 반응은?', type: "TF", answers:["족발? 어디 족발시켰어? 대자로 시킴? 우울했는데 나아져서 다행이네","헐!!! 무슨 우울한 일 있었어! 누가 기분 안좋게 했어!"]},
    {question: "일을 잘 해서 직장 상사가 칭찬을 해 줬다! 이때 당신의 마음에 더 드는 칭찬은?", type: "TF", answers:["다음에도 ㅇㅇ씨랑 일하고 싶네요. 일을 금방 배우네요. 맡은 일을 잘 해내시고 계세요. ㅇㅇ씨 업무 스타일이 아주 마음에 듭니다.","일을 되게 열심히 하시네요. ㅇㅇ씨는 우리 부서에 꼭 필요한 사람이에요. 앞으로도 이대로 진행 부탁드리겠습니다."]},
    {question: "얼떨결에 나간 소개팅, 상대방이 나를 마음에 들어 하는 것 같다! 당신이 이렇게 생각한 이유는?", type: "TF", answers:["상대방이 나에게 많은 것을 물어본다! 좋아하는 영화 장르부터, 그 영화를 좋아하는 이유까지.","상대방이 나의 말에 리액션을 잘 해 준다! 내가 그때 느꼈을 감정을 같이 느끼면서 웃어주고 공감해준다."]},
    {question: "만약 복권에 당첨된다면 가장 먼저 무엇을 하고 싶나요?", type: "SN", answers:["이런 질문이 무슨 의미가 있을까 생각한다","돈을 어떻게 쓸지 상상만으로 행복하다"]},
    {question: "삼성 전자에서 야심차게 준비한 새로운 제품이 출시되었다.", type: "SN", answers:["지금 나에게 이 제품이 왜 필요한지 먼저 생각한다","이 제품을 사용하고 있는 나의 모습을 상상한다"]},
    {question: "새로운 제품을 구매한 당신! 함께 동봉된 설명서를 어떻게 읽을것인가?", type: "SN", answers:["사용하고 싶었던 기능에 대해 자세히 읽어본다","대충 어떤 기능들이 있는지 휙휙 넘겨본다"]}
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
      Router.push({
        pathname: '/result',
        query: changedMBTIscore,
      });
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