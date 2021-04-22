import React from 'react';
import styles from '../styles/image.module.css';

// 공통으로 사용되는 img 스타일
function Image(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={props.src} alt="" className={styles.img} />
        </div>
    );
}

export default Image