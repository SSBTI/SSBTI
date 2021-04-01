import Router from 'next/router';
import React, { useState } from 'react';
import styles from '../../../styles/reviewList.module.css';
import CloseIcon from 'mdi-react/CloseIcon';
import axios from 'axios';
import Login from '../List/Login';

function Menu(props) {

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_API}/admin/authentication`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => { console.log(err) });
        setConstructorHasRun(true);
      };
      constructor();

    const [isLogin, setLogin] = useState<Boolean>(false);
    const openLogin = () => {
        setLogin(true);
    }
    
    const closeLogin = () => {
        setLogin(false);
        Router.push('/reviewBoard');
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
                            <button className={styles.menuBtn} onClick={() => Router.push('/')}>홈</button>
                            <button className={styles.menuBtn} onClick={openLogin}>리뷰 작성</button>
                        </div>
                    </div>
                </div>
            ) : null}

            <Login isOpen={isLogin} close={closeLogin}/>
        </>
    );
}

export default Menu;