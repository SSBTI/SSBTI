import React, { useState } from 'react';
import styles from '../../../styles/commentWrite.module.css';

function commentWrite() {
    const [name, setName] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [password, setPW] = useState<string>('');

    const onNameChange = (e: any) => {
        setName(e.target.value);
    }

    const onPasswordChange = (e: any) => {
        setPW(e.target.value);
    }

    const onCommentChange = (e: any) => {
        setComment(e.target.value);
    }

    return(
        <div className={styles.wrapper}>
            <input type="text" className={styles.readonly} placeholder='닉네임' value={name} onChange={onNameChange}></input>
            <input type="password" className={styles.readonly} placeholder='비밀번호' value={password} onChange={onPasswordChange}></input>
            <textarea type="text" className={styles.textArea} 
            placeholder="댓글을 작성해주세요." value={comment} onChange={onCommentChange}></textarea>
            <button className={styles.writeBtn}>작성</button>
        </div>
    )
}

export default commentWrite;