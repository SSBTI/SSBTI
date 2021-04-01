import React, { useState } from 'react';
import styles from '../../../styles/login.module.css';
import axios from 'axios';

function Login(props) {

    const [id, setId] = useState<string>('');
    const onChangeId = (e: any) => {
        setId(e.target.value);
    }

    const [pw, setPW] = useState<string>('');
    const onChangePW = (e: any) => {
        setPW(e.target.value);
    }

    const login = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API}/admin/login`, {
            'password': pw,
            'userId': id
        })
        .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
            console.log(localStorage.getItem('token'));
            props.close();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const close = () => {
        setId('');
        setPW('');
        props.close();
    }

    return (
        <>
            {props.isOpen ? (
                <div className={styles.background}>
                    <div>
                        <div className={styles.modal}>
                            <div className={styles.title}>
                                관리자 로그인
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>아이디 </label>
                                <input type="text" className={styles.input} value={id} onChange={onChangeId}></input>
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>비밀번호 </label>
                                <input type="password" className={styles.input} value={pw} onChange={onChangePW}></input>
                            </div>
                            <button className={styles.alertBtn} onClick={login}>
                                로그인
                            </button>
                            <button className={styles.alertBtn} onClick={close}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Login;