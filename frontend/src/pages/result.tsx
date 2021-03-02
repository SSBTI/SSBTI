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

function result() {
    const router = useRouter();
    const MBTI = router.query;
    const score = [];
    let i = 0;
    for(const [key, value] of Object.entries(MBTI)) {
        score[i++] = Number(value);
    }
    const [mbti, setMBTI] = useState<object>({
        type: '',
        desc: '',
        name: '',
        lovers: [],
        haters: [],
        products: []
    });

    // let mbti = {
    //     type: '',
    //     desc: '',
    //     name: '',
    //     lovers: [],
    //     haters: [],
    //     products: []
    // }

    useEffect(() => {
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
                // setMBTI(res.data);
            })
            .catch((err) => { console.log(err) })
    }, []);
    // axios.get('http://localhost:8080/mbti/result', {
    //     params: {
    //         IE: score[0],
    //         NS: score[1],
    //         FT: score[2],
    //         JP: score[3],
    //     }
    // })
    //     .then((res) => {
    //         // console.log(res.data);
    //         setMBTI(res.data);
    //         console.log(mbti);
    //     })
    // .catch((err) => { console.log(err) })
    
    const description = mbti.desc.split("|");
    const descriptions = description.map((str, idx) => <Desc desc={str} key={idx}/>)
    const src0 = '/microwave.png'
    const lover = mbti.lovers[0].name
    console.log('lover: ' + mbti.lovers[0]);
    const src1 = '/tab.jpg'
    const hater = mbti.haters[0].name
    const src2 = '/robo.jpg'
    const products = ["/microwave.jpg", "/tab.jpg", "/robo.jpg"]

    return (
        <div>
            <Header />
            <Layout pageTitle="Result">
                <div className={styles.wrapper}>
                    <Title name={mbti.name} />
                    <img src={src0} alt="" width="100" height="100" />
                    <ul>
                        {descriptions}
                    </ul>
                    <Pair type="환상" name={lover} src={src1} />
                    <Pair type="환장" name={hater} src={src2} />
                    <Recommend name={mbti.name} products={mbti.products}/>
                </div>
            </Layout>
        </div>
    )
}

export default result