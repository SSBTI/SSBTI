import React, { useState } from 'react';
import styles from '../../../styles/login.module.css';
import CloseIcon from 'mdi-react/CloseIcon';

function Login(props) {

    const [id, setId] = useState<string>('');
    const onChangeId = (e: any) => {
        setId(e.target.value);
    }

    const [pw, setPW] = useState<string>('');
    const onChangePW = (e: any) => {
        setPW(e.target.value);
    }
    return (
        <>
            {props.isOpen ? (
                <div className={styles.background}>
                    <div onClick={props.close}>
                        <div className={styles.modal}>
                            <button className={styles.alertBtn} onClick={props.close}>
                                <CloseIcon size='16'/>
                            </button>
                            <div className={styles.title}>
                                관리자 로그인
                            </div>
                            <label className={styles.label}>아이디 </label>
                            <div className={styles.inputWrapper}>
                                <input type="text" className={styles.titleInput} value={id} onChange={onChangeId}></input>
                            </div>
                            <label className={styles.label}>비밀번호 </label>
                            <div className={styles.inputWrapper}>
                                <input type="password" className={styles.titleInput} value={pw} onChange={onChangePW}></input>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Login;