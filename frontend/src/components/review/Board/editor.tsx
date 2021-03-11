import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Router from 'next/router';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from '../../../styles/reviewBoard.module.css';

function TuiEditor() {
    const editorRef = useRef<Editor>();

    function getContent() {
        const editorInstance = editorRef.current.getInstance();
        const htmlContext = editorInstance.getHtml();
        console.log(htmlContext);
    }

    return (
        <div className={styles.boardWrapper}>
            <label className={styles.titleLabel}>제목 </label>
            <div className={styles.inputWrapper}>
                <input type="text" className={styles.titleInput}></input>
            </div>
            <label className={styles.contentLabel}>본문</label>
            <div className={styles.contentEditor}>
                <Editor
                    initialValue="삼성 제품 리뷰를 작성해주세요:)"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
            </div>
            <button className={styles.writeBtn} onClick={()=> Router.push('/')}>돌아가기</button>
            <button className={styles.writeBtn} onClick={getContent}>작성</button>
        </div>
    );
}

export default TuiEditor;