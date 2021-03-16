import React, { useState } from 'react';
import styles from '../styles/reviewList.module.css';
import MenuIcon from 'mdi-react/MenuIcon';
import axios from 'axios';
import Layout from '../components/Layout';
import Router from 'next/router';
import Menu from '../components/review/List/Menu';
import { useRouter } from 'next/router';

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
        author: '',
        title: '',
        content: '',
        img: ['']
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

    const router = useRouter();
    const page = router.query.page;

    const constructor = () => {
        if (constructorHasRun) return;
        getPageData(page);
        setConstructorHasRun(true);
    }
    constructor();

    const routeToDetail = (id: number) => {
        Router.push({
            pathname: '/reviewDetail',
            query: {
                id: 1
            }
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

    const [isMenu, setMenu] = useState<Boolean>(false);

    const closeMenu = () => {
        setMenu(false);
    };

    const showMenu = () => {
        setMenu(true);
    };

    return (
        <div className={styles.wrapper}>
            <Layout pageTitle="List">
                <button className={styles.menuIcon} onClick={showMenu}>
                    <MenuIcon />
                </button>
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

            <Menu isOpen={isMenu} close={closeMenu}/>
        </div>
    );
}

export default ReviewList;