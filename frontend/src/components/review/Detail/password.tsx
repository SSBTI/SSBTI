import React, { useState } from 'react';
import styles from '../../../styles/password.module.css';

function Password(props) {
    const [pw, setPW] = useState<string>('');
    const onChangePW = (e: any) => {
        setPW(e.target.value);
    }

    const passPwd = () => {
        setPW('');
        props.setPwd(pw);
        props.close();
    }

    return (
        <>
            {props.isOpen ? (
                <div className={styles.background}>
                    <div>
                        <div className={styles.modal}>
                            <div className={styles.title}>
                                댓글 작성 시 입력했던 비밀번호를 입력해주세요.
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>비밀번호 </label>
                                <input type="password" className={styles.input} value={pw} onChange={onChangePW}></input>
                            </div>
                            <button className={styles.alertBtn} onClick={passPwd}>
                                입력
                            </button>
                            <button className={styles.alertBtn} onClick={props.close}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Password;