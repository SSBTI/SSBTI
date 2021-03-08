import React from 'react';
import styles from '../styles/result.module.css';

//  copyright 적어놓은 footer
function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; MoSS {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer