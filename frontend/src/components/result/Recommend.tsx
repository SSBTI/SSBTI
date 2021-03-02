import React from 'react'
import Carousel from '../SimpleSlider'

interface RecommendProps {
    name: string,
    products: string[]
}

const Recommend: React.FC<RecommendProps> = ({ name, products }) => {
    return (
        <div>
            <h2>{name}에게 추천하는 제품들</h2>
            <Carousel product={products} />
        </div>
    )
}

export default Recommend