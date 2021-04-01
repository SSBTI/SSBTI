import React, { useRef, useState } from 'react';
import styles from '../../styles/chat.module.css';
import CloseIcon from 'mdi-react/CloseIcon';
import SendIcon from 'mdi-react/SendCircleOutlineIcon';
import axios from 'axios';

var ws: WebSocket;

function Chat(props) {
    type chatData = {
        nickname: string,
        msg: string
    }

    const [comment, setComment] = useState<string>('');
    const [nickname, setNickname] = useState('');
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [chat, setChat] = useState<chatData[]>([]);
    const bodyRef = useRef(null);

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_MBTI_API}/chatlog`, {
            params: {
                type: props.type
            }
        })
        .then((res) => {
            const logs = res.data;
            const logs_len = logs.length
            for (var i = 0; i < logs_len; i++) {
                updateChat(logs[i]);
            }
        })
        .catch((err) => console.log(err));

        ws = new WebSocket(process.env.NEXT_PUBLIC_CHAT);
        ws.onopen = (e) => {
            // console.log(e);
            ws.send(`{ "action": "enterroom", "data": "${props.type}" }`);
            axios.get(`${process.env.NEXT_PUBLIC_NICKNAME_API}/language_generator`)
                .then(res => setNickname(res.data))
                .catch(err => console.log(err))
        };
        ws.onmessage = (e) => {
            // console.log(JSON.parse(e.data));
            updateChat(JSON.parse(e.data));
        };
        ws.onclose = (e) => {
            // console.log(e);
        };
        setConstructorHasRun(true);
    }
    constructor();

    const sendChat = () => {
        if (comment.length == 0)
            return;
        const modified = comment.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        if (modified != null)
            ws.send(`{ "action": "sendmessage", "data": "${modified}", "roomId": "${props.type}", "nickname":"${nickname}" }`)
        setComment('');
    };

    const onChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleEnterPress = (e: any) => {
        if (e.key === 'Enter')
            sendChat();
    };

    const updateChat = (data: {nickname: string, msg: string}) => {
        setChat(chat => [...chat, { nickname: data.nickname, msg: data.msg }]);
        scrollToBottom();
    };

    const chatArea = chat.map((str, idx) =>
        <div key={idx} className={styles.chat}>
            <div className={str.nickname === nickname ? styles.myname : styles.nickname}>[{str.nickname}]</div> {str.msg}
        </div>
    );

    const scrollToBottom = () => {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    };

    const closeChat = () => {
        ws.close();
        props.close();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.notice}>{props.name}의 방</div>
                <button className={styles.closeBtn} onClick={closeChat}>
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
                <button className={styles.commentBtn} onClick={sendChat}>
                    <SendIcon />
                </button>
            </div>
            
        </div>
    )
};

export default Chat;
