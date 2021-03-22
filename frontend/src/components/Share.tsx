import React, { useState, useEffect } from 'react';
import styles from '../styles/share.module.css';
import Swal from 'sweetalert2';

function Share() {
  // useEffect(() => {
  //   createKakaoButton()
  // }, [])
  //링크 복사기능
  const CopyLink = () => {
    const urlText = document.createElement('textarea');
    urlText.value = window.location.href;
    document.body.appendChild(urlText);

    urlText.select();
    document.execCommand('copy');
    document.body.removeChild(urlText);
    Swal.fire({
      showConfirmButton: false,
      title: '링크가 복사되었습니다',
      width: 450,
      padding: '1em',
      icon: 'success',
    })
  }
  //네이버 공유기능
  const NaverShare = () => {
    let url = encodeURI(window.location.href);
    let title = encodeURI('SSBTI 결과');
    let shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    window.open(shareURL);
  }
  const sendKakaoLink = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window["Kakao"]) {
      const kakao = window["Kakao"]
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        
        kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_KEY}`)
      }
      kakao.Link.sendDefault({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        // container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: 'SSBTI 결과',
          description: '#MBTI #삼성',
          imageUrl: 'IMAGE_URL', // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          }
        ],
      })
    }
  }
  return (
    <div>
      <div className={styles.shareTitle}>
         사람들에게 결과를 공유해 보세요!
      </div>
      <div className={styles.shareButtons}>
        <button id="kakao-link-btn" className={styles.shareButton} onClick={()=>sendKakaoLink()}>
          <img src="/icons/kakaolink_btn_medium.png" alt="" className={styles.shareButtonImg}/>
        </button>
        <button id="naver-link-btn" className={styles.shareButton} onClick={()=>NaverShare()}>
          <img src="/icons/Naverlink_btn.png" alt="" className={styles.shareButtonImg}/>
        </button>
        <button id="copy-url-btn" className={styles.shareButton} onClick={()=>CopyLink()}>
          <img src="/icons/copyURL_btn.png" alt="" className={styles.shareButtonImg}/>
        </button>
      </div>
    </div>
  )
}

export default Share