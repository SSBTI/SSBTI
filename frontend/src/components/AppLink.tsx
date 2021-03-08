import React from 'react';
import Link from 'next/link';
import styles from '../styles/result.module.css';

//  link 이동
function AppLink(props) {
    return (
        <Link href={props.href}>
            <button className={styles.linkBtn}>{props.label}</button>
        </Link>
    );
}

export default AppLink