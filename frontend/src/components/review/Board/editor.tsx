import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Router from 'next/router';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from '../../../styles/reviewBoard.module.css';
import axios from 'axios';
import Alert from '../../Alert';

function TuiEditor() {
    const editorRef = useRef<Editor>();
    const [title, setTitle] = useState<string>('');

    const onChange = (e: any) => {
        setTitle(e.target.value);
    }
    
    const createReview = () => {
        const editorInstance = editorRef.current.getInstance();
        const htmlContext = editorInstance.getHtml();
        
        if (title.length==0 || htmlContext.length==0) {
            setEmptyAlert(true);
            return;
        }

        console.log(htmlContext);
        const token = localStorage.getItem('token');
        console.log(token);
        
        axios.post(`${process.env.NEXT_PUBLIC_API}/review`, {
            title: title,
            content: htmlContext
        }, {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            setAlert(true);
        })
            .catch((err) => {
                console.log(err.response);
                console.log(err.request);
                console.log(err.message);
            })
    };

    const [isAlert, setAlert] = useState<Boolean>(false);
    const [isEmpty, setEmptyAlert] = useState<Boolean>(false);

    const closeAlert = () => {
        setAlert(false);
        moveToList();
    };

    const closeEmptyAlert = () => {
        setEmptyAlert(false);
    };

    const moveToList = () => {
        Router.push({
            pathname: '/reviewList',
            query: { page: 1 }
        });
    }

    return (
        <div className={styles.boardWrapper}>
            <label className={styles.titleLabel}>제목 </label>
            <div className={styles.inputWrapper}>
                <input type="text" className={styles.titleInput} value={title} onChange={onChange}></input>
            </div>
            <label className={styles.contentLabel}>본문</label>
            <div className={styles.contentEditor}>
                <Editor
                    initialValue="삼성 제품 리뷰를 작성해주세요:)"
                    previewStyle="vertical"
                    height="500px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
            </div>
            <button className={styles.writeBtn} onClick={createReview}>작성</button>
            <button className={styles.writeBtn} onClick={moveToList}>목록</button>
        
            <Alert content="작성이 완료되었습니다." isOpen={isAlert} close={closeAlert}/>
            <Alert content="제목과 내용은 필수입니다." isOpen={isEmpty} close={closeEmptyAlert}/>
        </div>
    );
}

export default TuiEditor;