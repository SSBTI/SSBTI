import React, { useState, useEffect } from 'react'
import styles from '../styles/result.module.css'
import Layout from '../components/Layout'
import Desc from '../components/result/Desc'
import Title from '../components/result/Title'
import Pair from '../components/result/Pair'
import Recommend from '../components/result/Recommend'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import axios from 'axios'

type mbtiResult = {
    type: string,
    desc: string,
    name: string,
    img: '',
    lovers: [{}],
    haters: [{}],
    products: [{}]
}

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
        lovers: [{}],
        haters: [{}],
        products: [{}]
    });

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get('http://localhost:8080/mbti/result', {
            params: {
                IE: score[0],
                SN: score[1],
                TF: score[2],
                JP: score[3],
            }
        })
        .then((res) => {
            console.log(res.data);
            setMBTI(res.data);
        })
        .catch((err) => { console.log(err) })
        setConstructorHasRun(true);
    };
    constructor();

    const description = mbtiResult.desc.split("|");
    const descriptions = description.map((str, idx) => <Desc desc={str} key={idx}/>)
    console.log('lover: ' + mbtiResult.lovers[0].name);

    return (
        <div>
            <Header />
            <Layout pageTitle="Result">
                <div className={styles.wrapper}>
                    <Title name={mbtiResult.name} />
                    <img src={mbtiResult.img} alt="" width="300" height="300" />
                    <ul>
                        {descriptions}
                    </ul>
                    <Pair type="환상" name={mbtiResult.lovers[0].name} src={mbtiResult.lovers[0].img} />
                    <Pair type="환장" name={mbtiResult.haters[0].name} src={mbtiResult.haters[0].img} />
                    <Recommend name={mbtiResult.name} products={mbtiResult.products}/>
                </div>
            </Layout>
        </div>
    )
}

export default result