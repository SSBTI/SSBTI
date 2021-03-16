import React, { useState } from 'react';
import styles from '../../styles/chat.module.css';
import CloseIcon from 'mdi-react/CloseIcon';
import SendIcon from 'mdi-react/SendCircleOutlineIcon';
import axios from 'axios';

function Chat(props) {
    const [state, setComment] = useState({
        comment: '',
        comments: ''
    });
    const [nickname, setNickname] = useState('[랜덤한 닉네임]');
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(``)
        .then((res) => {
            setNickname('['+res.data+']');
        })
        .catch((err) => {
            console.log(err);
            setComment({comment: '', comments: nickname});
        });
        setConstructorHasRun(true);
    }
    constructor();

    const sendChat = () => {
        axios.post(``, {
            nickname: nickname,
            comment: state.comments,
        })
        .then((res) => {
            setComment({comment: '', comments: ''});
        })
        .catch((err) => { console.log(err); })
            
    };

    const handleChange = (event) => {
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button className={styles.closeBtn} onClick={props.close}>
                    <CloseIcon size='18'/>
                </button>
            </div>
            <div className={styles.body}>

            </div>
            <div className={styles.inputWrapper}>
                <input className={styles.input} value={state.comments}
                onChange={handleChange} type="text"></input>
            </div>
            <button className={styles.commentBtn} onClick={sendChat}>
                <SendIcon />
            </button>
        </div>
    )
};

export default Chat;