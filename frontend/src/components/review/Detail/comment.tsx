import React, { useEffect, useState } from 'react';
import styles from '../../../styles/comment.module.css';
import axios from 'axios';
import Alert from '../../Alert';

function Comment(props) {
    type comment = {
        id: number,
        content: string,
        nickname: string
    }

    const [commentList, setList] = useState<Array<comment>>([]);
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [password, setPW] = useState<string>('');

    const getCmtList = () => {
        axios.get(`${process.env.NEXT_PUBLIC_COMMENT_API}`, {
            params: {
                review_id: props.no
            }
        }).then((res) => {
            // console.log(res.data);
            setList(res.data);
        }).catch((err) => { console.log(err) });
    };

    useEffect(() => {
        if (props.no != null)
            getCmtList();
    }, [props.no])

    const onNameChange = (e: any) => {
        setName(e.target.value);
    };

    const onPasswordChange = (e: any) => {
        setPW(e.target.value);
    };

    const onContentChange = (e: any) => {
        setContent(e.target.value);
    };

    const writeCmt = () => {
        axios.post(`${process.env.NEXT_PUBLIC_COMMENT_API}`, {
            "review_id": props.no,
            "content": content,
            "nickname": name,
            "password": password
        }).then((res) => {
            // console.log(res);
            setName('');
            setPW('');
            setContent('');
            openAlert('작성되었습니다.');
            getCmtList();
        }).catch((err) => {
            console.log(err);
            openAlert('작성에 실패했습니다.');
        });

    };

    const [isOpen, setOpen] = useState<boolean>(false);
    const [alertContent, setAlert] = useState<string>('');

    const openAlert = (str: string) => {
        setAlert(str);
        setOpen(true);
    }

    const closeAlert = () => {
        setOpen(false);
    }

    const list = commentList.map((cmt, idx) => 
        <div key={idx} className={styles.cmtWrapper}>
            <div className={styles.author}>
                {cmt.nickname}
            </div>
            <div className={styles.content}>
                {cmt.content}
            </div>
            <hr className={styles.hr} />
        </div>
    );

    return(
        <div className={styles.wrapper}>
            댓글
            <hr className={styles.hr}/>
            {list}
            <div className={styles.writeArea}>
                <input type="text" className={styles.readonly} placeholder='닉네임' value={name} onChange={onNameChange}></input>
                <input type="password" className={styles.readonly} placeholder='비밀번호' value={password} onChange={onPasswordChange}></input>
                <textarea className={styles.textArea} 
                placeholder="댓글을 작성해주세요." value={content} onChange={onContentChange}></textarea>
                <button className={styles.writeBtn} onClick={writeCmt}>작성</button>
            </div>
            <Alert close={closeAlert} isOpen={isOpen} content={alertContent}/>
        </div>
    )
}

export default Comment;
