import Router from 'next/router';
import React from 'react';
import styles from '../../../styles/reviewList.module.css';
import CloseIcon from 'mdi-react/CloseIcon';

function Menu(props) {
    return (
        <>
            {props.isOpen ? (
                <div className={styles.menuWrapper}>
                    <div onClick={props.close}>
                        <div className={styles.modal}>
                            <button className={styles.closeBtn} onClick={props.close}>
                                <CloseIcon />
                            </button>
                            <button className={styles.menuBtn} onClick={() => Router.push('/')}>홈</button>
                            <button className={styles.menuBtn} onClick={() => Router.push('/reviewBoard')}>리뷰 작성</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Menu;