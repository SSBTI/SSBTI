import React from 'react'
import Carousel from '../SimpleSlider'

interface RecommendProps {
    name: string,
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

const Recommend: React.FC<RecommendProps> = ({ name, products }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>{name}에게 추천하는 제품들</h2>
            <Carousel product={products} />
        </div>
    )
}

export default Recommend