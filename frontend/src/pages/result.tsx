import React, { useEffect, useState } from 'react';
import styles from '../styles/result.module.css';
import Layout from '../components/Layout';
import Desc from '../components/result/Desc';
import Title from '../components/result/Title';
import Pair from '../components/result/Pair';
import Recommend from '../components/result/Recommend';
import Image from '../components/Image';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Chat from '../components/result/Chat';
import Share from '../components/Share';
import Loader from '../components/loader';

type mbtiResult = {
    type: string,
    desc: string,
    name: string,
    img: '',
    lovers: [{
        name: '',
        img: ''
    }],
    haters: [{
        name: '',
        img: ''
    }],
    count: 0,
    total: 0
}

type productData = {
    "id": number,
    "goods_detail_url": string,
    "goods_nm": string,
    "img_path1": string,
    "usp_desc": string,
}

//  검사 결과
function result() {
    //카카오 공유를 위한 script 추가
    useEffect(()=> {
        const script = document.createElement('script')
        script.src= 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async =true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const router = useRouter();
    const [isLoading,setIsLoading] = useState(true);
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const mbtiname = router.asPath.slice(8,12);
    
    const [mbtiResult, setMBTI] = useState<mbtiResult>({
        type: '',
        desc: '',
        name: '',
        img: '',
        lovers: [{
            name: '',
            img: ''
        }],
        haters: [{
            name: '',
            img: ''
        }],
        count: 0,
        total: 0
    });

    const [products, setProd] = useState<productData[]>([]);

    //  survey에서 보낸 mbti 일치하는 유형 받아옴
    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/test`, {
            params: {
                type: mbtiname
            }
        })
        .then((res) => {
            console.log(res.data);
            setMBTI(res.data);
        })
        .catch((err) => { console.log(err) });
        axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/randomProduct`)
        .then((res) => {
            res.data.forEach(element => {
                setProd(products => [...products, element]);
            });
            setIsLoading(false);
        })
        .catch((err) => console.log(err));
        setConstructorHasRun(true);
    };
    if(mbtiname.length > 0)
        constructor();
        

    //  유형에 맞는 설명 split
    const description = mbtiResult.desc.split("|");
    const descriptions = description.map((str, idx) => <Desc desc={str} key={idx} />);
    const ratio = Math.ceil((mbtiResult.count / mbtiResult.total)*100);

    const [isChat, setChat] = useState<Boolean>(false);

    const closeChat = () => {
        setChat(false);
    };

    const openChat = () => {
        setChat(true);
    };

    return (
        <Layout pageTitle="Result">
            {  
                function() {
                    if(isLoading) return <Loader/>
                }()
            }
            <div className={styles.wrapper}>
                <Title name={mbtiResult.name} count={mbtiResult.count} ratio={ratio}/>
                <Image src={mbtiResult.img} />
                <ul>
                    {descriptions}
                </ul>
                <Pair type="환상" name={mbtiResult.lovers[0].name} src={mbtiResult.lovers[0].img} />
                <Pair type="환장" name={mbtiResult.haters[0].name} src={mbtiResult.haters[0].img} />
                <div className={styles.recommend}>
                    <Recommend name={mbtiResult.name} products={products} />
                </div>

                {!isChat && <div className={styles.btnWrapper}>
                    <button className={styles.chatBtn} onClick={openChat}>
                        {mbtiResult.name}끼리 채팅하기
                    </button>
                </div>}
                {isChat && <Chat close={closeChat} type={mbtiResult.type} name={mbtiResult.name}/>}
                <Share imgUrl={mbtiResult.img}/>
                <div className={styles.btnWrapper}>
                    <button className={styles.routeBtn} onClick={()=>Router.push({
                        pathname: '/reviewList',
                        query: { page: 1 }
                    })}>
                        삼성 제품 리뷰 보러가기
                    </button>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.routeBtn} onClick={() => Router.push('/')}>SSBTI 검사하기</button>
                </div>
            </div>
        </Layout>
    );
}

export default result