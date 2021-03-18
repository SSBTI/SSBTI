import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/chat.module.css';
import CloseIcon from 'mdi-react/CloseIcon';
import SendIcon from 'mdi-react/SendCircleOutlineIcon';

var ws: WebSocket;

function Chat(props) {
    type chatData = {
        nickname: string,
        msg: string
    }

    const [comment, setComment] = useState<string>('');
    const [nickname, setNickname] = useState('[랜덤한 닉네임]');
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [chat, setChat] = useState<chatData[]>([]);
    const [total, setTotal] = useState<number>(0);
    const bodyRef = useRef(null);

    const constructor = () => {
        if (constructorHasRun) return;
        ws = new WebSocket(process.env.NEXT_PUBLIC_CHAT);
        ws.onopen = (e) => {
            console.log(e);
            ws.send(`{ "action": "enterroom", "data": "${props.type}" }`);
        };
        ws.onmessage = (e) => {
            console.log(JSON.parse(e.data));
            updateChat(JSON.parse(e.data));
        }
        setConstructorHasRun(true);
    }
    constructor();

    const sendChat = () => {
        ws.send(`{ "action": "sendmessage", "data": "${comment}", "roomId": "${props.type}" }`)
        setComment('');
    };

    const onChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleEnterPress = (e: any) => {
        if (e.key === 'Enter')
            sendChat();
    };

    const updateChat = (data: {id: string, msg: string}) => {
        setChat(chat => [...chat, { nickname: data.id, msg: data.msg }]);
        scrollToBottom();
    };

    const chatArea = chat.map((str, idx) =>
        <div key={idx} className={styles.chat}>
            <div className={styles.nickname}>[{str.nickname}]</div> {str.msg}
        </div>
    );

    const scrollToBottom = () => {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.notice}>현재 {total}명 참여 중</div>
                <button className={styles.closeBtn} onClick={props.close}>
                    <CloseIcon size='18'/>
                </button>
            </div>
            <div className={styles.body}
                ref={bodyRef}>
                {chatArea}
            </div>
            <div className={styles.inputWrapper}>
                <input className={styles.input} value={comment}
                    onChange={onChange} type="text"
                    onKeyPress={handleEnterPress}>
                </input>
            </div>
            <button className={styles.commentBtn} onClick={sendChat}>
                <SendIcon />
            </button>
        </div>
    )
};

export default Chat;