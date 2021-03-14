import React from 'react';
import styles from '../styles/result.module.css';

//  copyright 적어놓은 footer
function Footer() {
    return (
        <footer className={styles.footer}>
            <hr className={styles.hr} />
            <p>&copy; MoSS {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer