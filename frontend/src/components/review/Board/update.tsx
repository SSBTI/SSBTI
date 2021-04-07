import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Router, { useRouter } from 'next/router';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from '../../../styles/reviewBoard.module.css';
import axios from 'axios';
import Alert from '../../Alert';

function TuiEditor() {
    const editorRef = useRef<Editor>();
    type reviewResult = {
        no: number,
        title: string,
        author: string,
        img: string[],
        content: string,
        time: string
    }

    const [reviewUpdate, setUpdate] = useState<reviewResult>({
        no: 0,
        title: '',
        author: '',
        img: [],
        content: '',
        time: ''
    });

    const onChange = (e: any) => {
        setUpdate({
            no: reviewUpdate.no,
            title: e.target.value,
            author: reviewUpdate.author,
            img: reviewUpdate.img,
            content: reviewUpdate.content,
            time: reviewUpdate.time
        });
    }

    const updateReview = () => {
        const editorInstance = editorRef.current.getInstance();
        const htmlContext = editorInstance.getHtml();

        if (reviewUpdate.title.length==0 || htmlContext.length==0) {
            setEmptyAlert(true);
            return;
        }

        // console.log(htmlContext);
        const token = localStorage.getItem('token');
        // console.log(token);

        axios.put(`${process.env.NEXT_PUBLIC_API}/review/detail/${no}`, {
                title: reviewUpdate.title,
                content: htmlContext
            },{
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

    const [constructorHasRun, setConstructorHasRun] = useState(false);

    const router = useRouter();
    const no = router.query.no;

    const constructor = () => {
        if (constructorHasRun) return;
        axios.get(`${process.env.NEXT_PUBLIC_API}/review/detail/${no}`)
        .then((res) => {
            setUpdate(res.data);

            let arr = [];
            let data: reviewResult = res.data;
            
            arr = data.content.split(process.env.NEXT_PUBLIC_SEPARATOR);
            let htmlTag = '';
            let last = arr.length-1;
            
            arr.map((d, idx) => {
                if(idx != last)
                    htmlTag += d + '<img src="' + data.img[idx] + '" alt="image">';
                else
                    htmlTag += d;
            });
            const editorInstance = editorRef.current.getInstance();
            if (htmlTag.length != 0){
                editorInstance.setHtml(htmlTag);
            }
        })
        .catch((err) => {
            console.log(err);
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setHtml(reviewUpdate.content);
        })
        setConstructorHasRun(true);
    };
    constructor();
    
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
            <button className={styles.writeBtn} onClick={moveToList}>목록</button>
            <button className={styles.writeBtn} onClick={updateReview}>수정</button>
        
            <Alert content="수정이 완료되었습니다." isOpen={isAlert} close={closeAlert}/>
            <Alert content="제목과 내용은 필수입니다." isOpen={isEmpty} close={closeEmptyAlert}/>
        </div>
    );
}

export default TuiEditor;