import React, { useState } from 'react';
import styles from '../styles/reviewList.module.css';
import MenuIcon from 'mdi-react/MenuIcon';
import axios from 'axios';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import Menu from '../components/review/List/Menu';
import Pagination from '../components/review/List/Pagination';

function ReviewList() {
    type review = {
        no: number,
        author: string,
        title: string,
        content: string,
        img: [string],
    }

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    
    const [reviewList, setList] = useState<Array<review>>([{
        no: 0,
        author: '',
        title: '',
        content: '',
        img: [''],
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

    const routeToDetail = (no: number) => {
        Router.push({
            pathname: '/reviewDetail',
            query: {
                no: no
            }
        });
    };

    const len = reviewList.length;

    const list = reviewList.map((li, idx) =>
        <div key={idx} className={styles.listWrapper}>
            <a className={styles.a} onClick={() => routeToDetail(li.no)}>
                <div className={styles.listItem}>
                    <div className={styles.listTitle}>{li.title}</div>
                    <div className={styles.listContent}>
                        <div className={styles.listText}>{li.content}</div>
                        <img src={li.img[0]} width="100" alt=""
                            className={styles.listImg} />
                    </div>
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

    const moveToLeft = () => {
        let int = parseInt(page[0], 10);
        if (int > 1) {
            int -= 1;
            Router.push({
                pathname: '/reviewList',
                query: { page: int }
            })
        }
    }

    const moveToRight = () => {
        let int = parseInt(page[0], 10);
        if (int < 10) {
            int += 1;
            Router.push({
                pathname: '/reviewList',
                query: { page: int }
            })
        }
    }

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
                <Pagination now={page} moveToLeft={moveToLeft} moveToRight={moveToRight}/>
            </Layout>

            <Menu isOpen={isMenu} close={closeMenu}/>
        </div>
    );
}

export default ReviewList;