import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import axios from 'axios';
import MenuIcon from 'mdi-react/MenuIcon';
import styles from '../styles/reviewDetail.module.css';
import Router from 'next/router';
import DeleteIcon from 'mdi-react/TrashCanOutlineIcon';
import UpdateIcon from 'mdi-react/EditOutlineIcon';
import Alert from '../components/Alert';
import Menu from '../components/review/List/Menu';

function reviewDetail() {
    const router = useRouter();
    const id = router.query;
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    type review = {
        id: number,
        author: string,
        title: string,
        content: [string],
        img: [string]
    }

    const [reviewDetail, setDetail] = useState<review>({
        id: 0,
        author: '관리자',
        title: '[삼성 노트북] 이온 2020 리뷰',
        content: ['안녕하세요 반갑습니다.<br/> 오늘은 삼성의 노트북 이온을 리뷰하려고 합니다.<br/> 이온은 가벼운 무게와 우수한 성능 세련된 디자인을 장점으로 꼽을 수 있는데요,<br/> 특히 베젤이 얇아 작은 사이즈이지만 화면이 정말 넓다는 것을 느낄 수 있습니다.'],
        img: ['https://ssafyprojectbucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20210218_092007883.jpg']
    });

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_REVIEW_API}/review/detail/${id}`)
        .then((res) => {
            let data = res.data;
            data.content = data.content.split(process.env.NEXT_PUBLIC_SEPARATOR);
            setDetail(data);
        })
        .catch((err) => { console.log(err) });
        setConstructorHasRun(true);
    }
    constructor();

    const content = reviewDetail.content.map((str, idx) =>
        <div key={idx} className={styles.contentArea}>
            <div dangerouslySetInnerHTML={{ __html: str }}
                className={styles.content}></div>
            <div className={styles.imgWrapper}>
                <img src={reviewDetail.img[idx]} width="200" alt=""
                    className={styles.img}/>
            </div>
        </div>
    )

    const [isAlert, setAlert] = useState<Boolean>(false);

    const closeAlert = () => {
        setAlert(false);
        Router.push('/reviewList');
    };

    const deleteReview = () => {
        setAlert(true);
        
        // axios.delete(`${process.env.NEXT_PUBLIC_REVIEW_API}/review/detail/${id}`)
        // .then((res) => {
        //     setAlert(true);
        // })
        // .catch((err) => { console.log(err) });
    };

    const [isMenu, setMenu] = useState<Boolean>(false);

    const closeMenu = () => {
        setMenu(false);
    };

    const showMenu = () => {
        setMenu(true);
    };

    return (
        <div className={styles.wrapper}>
            <Layout pageTitle="Detail">
                <button className={styles.menuIcon} onClick={showMenu}>
                    <MenuIcon />
                </button>
                <hr className={styles.hr}/>
                <div className={styles.detailArea}>
                    <div className={styles.title}>
                        {reviewDetail.title}
                    </div>
                    <div className={styles.author}>
                        {reviewDetail.author}
                    </div>
                    <hr className={styles.hr}/>
                    {content}
                    <hr className={styles.hr}/>
                    <button className={styles.detailBtn} onClick={deleteReview}>
                        <DeleteIcon size='20'/>
                    </button>
                    <button className={styles.detailBtn} onClick={() => Router.push('/reviewUpdate')}>
                        <UpdateIcon size='20'/>
                    </button>
                </div>
                <hr className={styles.bottomLine}/>
            </Layout>
            <Alert content="삭제가 완료되었습니다." isOpen={isAlert} close={closeAlert}/>
            <Menu isOpen={isMenu} close={closeMenu}/>
        </div>
    )
}

export default reviewDetail;