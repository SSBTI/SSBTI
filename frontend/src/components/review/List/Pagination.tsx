import React from 'react';
import LeftIcon from 'mdi-react/ChevronLeftIcon';
import RightIcon from 'mdi-react/ChevronRightIcon';
import styles from '../../../styles/pagenation.module.css';

function Pagination(props) {

    return (
        <div className={styles.wrapper}>
            <button className={props.now==1? styles.disabled : styles.arrowBtn} onClick={props.moveToLeft}>
                <LeftIcon />
            </button>
            <div className={styles.pageNum}>
                {props.now}
            </div>
            <button className={props.now==props.total? styles.disabled : styles.arrowBtn} onClick={props.moveToRight}>
                <RightIcon />
            </button>
        </div>
    )
};

export default Pagination;