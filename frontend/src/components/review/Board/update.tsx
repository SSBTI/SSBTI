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
    type review = {
        id: number,
        author: string,
        title: string,
        content: string,
    }
    
    const [reviewUpdate, setUpdate] = useState<review>({
        id: 0,
        author: '',
        title: '',
        content: '',
    });

    const onChange = (e: any) => {
        setUpdate({
            id: reviewUpdate.id,
            author: reviewUpdate.author,
            title: e.target.value,
            content: reviewUpdate.content
        });
    }

    const updateReview = () => {
        const editorInstance = editorRef.current.getInstance();
        const htmlContext = editorInstance.getHtml();

        axios.put(`${process.env.NEXT_PUBLIC_REVIEW_API}/review`, {
            id: reviewUpdate.id,
            title: reviewUpdate.title,
            content: htmlContext
        })
            .then((res) => {
                setAlert(true);
        })
        .catch((err) => { console.log(err) })
    };

    const [constructorHasRun, setConstructorHasRun] = useState(false);

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_REVIEW_API}/review/detail/${reviewUpdate.id}`)
        .then((res) => {
            let data = res.data;
            data.content = data.content.split(process.env.NEXT_PUBLIC_SEPARATOR);
            setUpdate(data);
            let content = data.map((d, idx) => {
                d.content[idx] + d.img[idx];
            });
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setHtml(content);
            setConstructorHasRun(true);
        })
        .catch((err) => {
            console.log(err);
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setHtml(reviewUpdate.content);
        })
    };
    constructor();
    
    const [isAlert, setAlert] = useState<Boolean>(false);

    const closeAlert = () => {
        setAlert(false);
        Router.push('/reviewList');
    };

    return (
        <div className={styles.boardWrapper}>
            <label className={styles.titleLabel}>제목 </label>
            <div className={styles.inputWrapper}>
                <input type="text" className={styles.titleInput} value={reviewUpdate.title} onChange={onChange}></input>
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
            <button className={styles.writeBtn} onClick={()=> Router.push('/reviewList')}>목록</button>
            <button className={styles.writeBtn} onClick={updateReview}>수정</button>
        
            <Alert content="수정이 완료되었습니다." isOpen={isAlert} close={closeAlert}/>
        </div>
    );
}

export default TuiEditor;