import React from 'react';
import Carousel from '../SimpleSlider';
import styles from '../../styles/result.module.css';

//  유형별 추천하는 제품 목록
function Recommend(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles.pairTitle}>{props.name}에게 추천하는 제품들</div>
            <Carousel product={props.products} />
        </div>
    );
}

export default Recommend