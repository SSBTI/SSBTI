import React from 'react';
import styles from '../styles/alert.module.css';

function Alert(props) {
    return (
        <>
            {props.isOpen ? (
                <div className={styles.background}>
                    <div onClick={props.close}>
                        <div className={styles.modal}>
                            <div className={styles.content}>
                                {props.content}
                            </div>
                            <button className={styles.alertBtn} onClick={props.close}>확인</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Alert;