import React from 'react'
import styles from '../styles/result.module.css'
import Layout from '../components/Layout'
import Desc from '../components/result/Desc'
import Title from '../components/result/Title'
import Pair from '../components/result/Pair'
import Recommend from '../components/result/Recommend'
import { useRouter } from 'next/router';

interface resultProps {}

const result: React.FC<resultProps> = () => {
    const router = useRouter();
    const MBTI = router.query;
    for(const [key,value] of Object.entries(MBTI)) {
        MBTI[key] = Number(value);
    }
    const title = "만능재주꾼 전자레인지"
    const description = [
        "무엇을 만드는 데 타고난 재능이 있어요",
        "인간관계에서 선이 뚜렷하고 타인의 일에 무관심해요",
        "노력에 비해 일할 때 효율이 좋아요",
        "즉흥적인 성격이라 활동적이고 자유로운 것을 좋아해요",
        "말 많고 감성적인 사람과는 별로 안 맞아요",
        "관심있는 분야는 분석하고 좋아하고 잘해요"
    ]
    const descriptions = description.map((str, idx) => <Desc desc={str} key={idx}/>)
    const src0 = 'http://www.easypub.co.kr/images/logo_footer.png'
    const lover = '할 말은 한다! 오디오'
    const src1 = '/tab.jpg'
    const hater = '롸벗청소기'
    const src2 = '/robo.jpg'
    const products = ["/microwave.jpg", "/tab.jpg", "/robo.jpg"]
    return (
        <Layout pageTitle="Result">
            <div className={styles.wrapper}>
                <Title title={title} />
                <img src={src0} alt="" width="100" height="100" />
                <ul>
                    {descriptions}
                </ul>
                <Pair type="환상" name={lover} src={src1} />
                <Pair type="환장" name={hater} src={src2} />
                <Recommend name={title} products={products}/>
            </div>
        </Layout>
    )
}

export default result