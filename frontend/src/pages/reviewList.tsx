import React, { useState, useEffect } from 'react';
import styles from '../styles/reviewList.module.css';
import MenuIcon from 'mdi-react/MenuIcon';
import axios from 'axios';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import Menu from '../components/review/List/Menu';
import Pagination from '../components/review/List/Pagination';
import Login from '../components/review/List/Login';
import Alert from '../components/Alert';


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
        axios.get(`${process.env.NEXT_PUBLIC_API}/review/${page}`)
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
    const [total, setTotal] = useState<number>(1);
    const [token, setToken] = useState<string>('');
    const [start, setStart] = useState<number>(1);
    const [end, setEnd] = useState<number>(1);

    useEffect(() => {
        if (router.isReady) {
            let num = parseInt(page[0]);
            if(total>num+2)
            setEnd(num+2);
            else
            setEnd(total);
            
            if(1<num-2)
            setStart(num-2);
            else
            setStart(1);
            getPageData(page);

        }
        if(page === undefined){
            Router.push({
                pathname: '/reviewList',
                query: { page: 1 }
            })
        }
    }, [page, total]);

    const [isLogin, setLogin] = useState<Boolean>(false);
    const openLogin = () => {
        setLogin(true);
    }
    
    const closeLogin = (str: string) => {
        setLogin(false);
        showModal(str);
    }

    const justCloseLogin = () => {
        setLogin(false);
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    })

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_API}/review/page`)
        .then((res) => {
            setTotal(Math.ceil(res.data.pageTotal/5));
        })
        .catch((err) => { console.log(err) });
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
        <div key={idx}>
            <a className={styles.a} onClick={() => routeToDetail(li.no)}>
                <div className={styles.listItem}>
                    <div className={styles.listTitle}>{li.title}</div>
                    <div>
                        <div className={styles.textDisplay}>
                            <div dangerouslySetInnerHTML={{ __html: li.content }}
                                className={styles.listText}></div>
                        </div>
                        {li.img.length > 0 ?
                            <img src={li.img[0]} alt=""
                            className={styles.listImg} /> :
                            <img src='icons/image_icon.png' alt=""
                            className={styles.listImg} /> }
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
        if (int < total) {
            int += 1;
            Router.push({
                pathname: '/reviewList',
                query: { page: int }
            })
        }
    }

    const movePage = (num: string) => {
        let int = parseInt(num);
        Router.push({
            pathname: '/reviewList',
            query: { page: int }
        })
    }

    const [isModal, setModal] = useState<Boolean>(false);

    const closeModal = () => {
        setModal(false);
    };
    
    const [content, setContent] = useState<string>('');

    const showModal = (str: string) => {
        setContent(str);
        setModal(true);
    };


    return (
        <Layout pageTitle="List">
            <div className={styles.wrapper}>
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
                <Pagination now={page} total={total} end={end} start={start}
                moveToLeft={moveToLeft} moveToRight={moveToRight} btnClick={movePage}/>

                <Menu isOpen={isMenu} close={closeMenu} token={token} openLogin={openLogin} openAlert={showModal}/>
                <Login isOpen={isLogin} close={closeLogin} justclose={justCloseLogin}/>
                <Alert isOpen={isModal} close={closeModal} content={content}/>
            </div>
        </Layout>
    );
}

export default ReviewList;