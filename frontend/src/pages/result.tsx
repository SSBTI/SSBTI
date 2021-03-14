import React, { useState } from 'react';
import styles from '../styles/result.module.css';
import Layout from '../components/Layout';
import Desc from '../components/result/Desc';
import Title from '../components/result/Title';
import Pair from '../components/result/Pair';
import Recommend from '../components/result/Recommend';
import Header from '../components/Header';
import Image from '../components/Image';
import { useRouter } from 'next/router';
import axios from 'axios';

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
    products: [{
        id: 0,
        goodsId: '',
        goodsNm: '',
        mdlCode: '',
        mdlNm: '',
        salePrice: 0,
        imgPath1: '',
        grpPath: '',
        colors: '',
        category: '',
        ctgRank: 1,
        reviewGrade: 5,
        reviewCount: 1,
        goodsDetailUrl: '',
        uspDesc: '',
        goodsPrcNo: 0
      }]
}

//  검사 결과
function result() {
    const router = useRouter();
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const MBTI = router.query;
    const score = [];
    let i = 0;
    for(const [key, value] of Object.entries(MBTI)) {
        score[i++] = Number(value);
    }

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
        products: [{
            id: 0,
            goodsId: '',
            goodsNm: '',
            mdlCode: '',
            mdlNm: '',
            salePrice: 0,
            imgPath1: '',
            grpPath: '',
            colors: '',
            category: '',
            ctgRank: 1,
            reviewGrade: 5,
            reviewCount: 1,
            goodsDetailUrl: '',
            uspDesc: '',
            goodsPrcNo: 0
        }]
    });

    //  survey에서 보낸 mbti 일치하는 유형 받아옴
    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/mbti/result`, {
            params: {
                IE: score[0],
                SN: score[1],
                TF: score[2],
                JP: score[3],
            }
        })
        .then((res) => {
            setMBTI(res.data);
            setConstructorHasRun(true);
        })
        .catch((err) => { console.log(err) })
        setConstructorHasRun(true);
    };
    constructor();

    //  유형에 맞는 설명 split
    const description = mbtiResult.desc.split("|");
    const descriptions = description.map((str, idx) => <Desc desc={str} key={idx} />);

    return (
        <div>
            <Header />
            <Layout pageTitle="Result">
                <div className={styles.wrapper}>
                    <Title name={mbtiResult.name} />
                    <Image src={mbtiResult.img} />
                    <ul>
                        {descriptions}
                    </ul>
                    <Pair type="환상" name={mbtiResult.lovers[0].name} src={mbtiResult.lovers[0].img} />
                    <Pair type="환장" name={mbtiResult.haters[0].name} src={mbtiResult.haters[0].img} />
                    <div className={styles.recommend}>
                        <Recommend name={mbtiResult.name} products={mbtiResult.products} />
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default result