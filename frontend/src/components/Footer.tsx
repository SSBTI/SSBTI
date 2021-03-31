import React from 'react';
import styles from '../styles/result.module.css';

//  copyright 적어놓은 footer
function Footer() {
    return (
        <footer className={styles.footer}>
            &copy; MoSS {new Date().getFullYear()}
        </footer>
    );
}

export default Footer