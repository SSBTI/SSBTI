import React from 'react';
import LeftIcon from 'mdi-react/ChevronLeftIcon';
import RightIcon from 'mdi-react/ChevronRightIcon';
import styles from '../../../styles/pagenation.module.css';

function Pagination(props) {

    const list = [];

    for(let i=props.start;i<=props.end;i++)
        list.push(i);

    const buttons = list.map((li, idx)=>
        <div key={idx} className={styles.btnWrapper}>
            <button className={li == props.now ? styles.btnClicked : styles.btnNotClicked}
            onClick={() => props.btnClick(li)}>
                {li}</button>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <button className={props.now==1? styles.disabled : styles.arrowBtn} onClick={props.moveToLeft}>
                <LeftIcon />
            </button>
            {buttons}
            <button className={props.now==props.total? styles.disabled : styles.arrowBtn} onClick={props.moveToRight}>
                <RightIcon />
            </button>
        </div>
    )
};

export default Pagination;