import React, { useState } from 'react';
import styles from '../../../styles/commentWrite.module.css';
import axios from 'axios';

function commentWrite(props) {
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

    const writeCmt = () => {
        axios.post(`${process.env.NEXT_PUBLIC_COMMENT_API}`, {
            "review_id": props.no,
            "content": comment,
            "nickname": name,
            "password": password
        }).then((res) => {
            console.log(res);
        }).catch((err) => { console.log(err) });

    }

    return(
        <div className={styles.wrapper}>
            <input type="text" className={styles.readonly} placeholder='닉네임' value={name} onChange={onNameChange}></input>
            <input type="password" className={styles.readonly} placeholder='비밀번호' value={password} onChange={onPasswordChange}></input>
            <textarea className={styles.textArea} 
            placeholder="댓글을 작성해주세요." value={comment} onChange={onCommentChange}></textarea>
            <button className={styles.writeBtn} onClick={writeCmt}>작성</button>
        </div>
    )
}

export default commentWrite;