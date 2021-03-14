import React, { useState } from 'react';
import styles from '../styles/reviewList.module.css';
import MenuIcon from 'mdi-react/MenuIcon';
import axios from 'axios';
import Layout from '../components/Layout';
import Router from 'next/router';

function ReviewList() {
    type review = {
        id: number,
        author: string,
        title: string,
        content: string,
        img: [string]
    }

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    
    const [reviewList, setList] = useState<Array<review>>([{
        id: 0,
        author: '관리자',
        title: '[삼성 노트북] 이온 2020 리뷰',
        content: '안녕하세요 반갑습니다 오늘은 삼성의 노트북 이온을 리뷰하려고 합니다 이온은 가벼운 무게와 우수한 성능 세련된 디자인을 장점으로 꼽을 수 있는데요 특히 베젤이 얇아 작은 사이즈이지만 화면이 정말 넓다는 것을 느낄 수 있습니다',
        img: ['https://ssafyprojectbucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20210218_092007883.jpg']
    }]);

    const getPageData = (page) => {
        axios.get(`${process.env.NEXT_PUBLIC_REVIEW_API}/review/${page}`)
            .then((res) => {
                res.data.forEach(el => {
                    el.content = el.content.replaceAll(process.env.NEXT_PUBLIC_SEPARATOR, '');
                });
                setList(res.data);
            })
            .catch((err) => { console.log(err) });
    };

    const constructor = () => {
        if (constructorHasRun) return;
        getPageData(0);
        setConstructorHasRun(true);
    }
    constructor();

    const routeToDetail = (id) => {
        Router.push({
            pathname: '/reviewDetail',
            query: id.toString()
        });
    };

    const len = reviewList.length;

    const list = reviewList.map((li, idx) =>
        <div key={idx} className={styles.listWrapper}>
            <a className={styles.a} onClick={() => routeToDetail(li.id)}>
                <div className={styles.listTitle}>{li.title}</div>
                <div className={styles.listContent}>
                    <div className={styles.listText}>{li.content}</div>
                    <img src={li.img[0]} width="100" alt=""
                        className={styles.listImg} />
                </div>
            </a>
            {
                idx != len - 1
                ? <hr className={styles.hr} />
                : null
            }
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <Layout pageTitle="List">
                <MenuIcon className={styles.menuIcon} />
                <div className={styles.title}>
                    삼성 제품 리뷰
                </div>
                <div className={styles.listArea}>
                    <div className={styles.total}>
                        전체 글
                    </div>
                    {list}
                </div>
            </Layout>
        </div>
    );
}

export default ReviewList;