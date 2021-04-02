import Router from 'next/router';
import React, { useState } from 'react';
import styles from '../../../styles/reviewList.module.css';
import CloseIcon from 'mdi-react/CloseIcon';

function Menu(props) {

    const isToken = props.token != null ? true : false;

    const goToSSBTI = () => {
        logout();
        Router.push('/');
    }
    
    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
    <>
        {props.isOpen ? (
            <div className={styles.menuWrapper}>
                <div onClick={props.close}>
                    <div className={styles.modal}>
                        <button className={styles.closeBtn} onClick={props.close}>
                            <CloseIcon />
                        </button>
                        <button className={styles.menuBtn} onClick={goToSSBTI}>ssbti 검사하기</button>
                            {isToken ? <div>
                                    <button className={styles.menuBtn} onClick={() => Router.push('/reviewBoard')}>리뷰 작성하기</button>
                                    <button className={styles.menuBtn} onClick={logout}>로그아웃</button>
                                </div>
                        : <button className={styles.menuBtn} onClick={props.openLogin}>관리자 로그인</button>}
                    </div>
                </div>
            </div>
        ) : null}
    </>
    );
}

export default Menu;