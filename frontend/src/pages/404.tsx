import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

function Custom404() {
    return (
        <Layout pageTitle='404Page'>
            <div className={styles.wrapper}>
                <h1>잘못된 경로의 접근입니다.</h1>
                <img src="/mbti/INTJ.png" width="200" height="200"></img>
            </div>
        </Layout>
    )
}

export default Custom404;