import React from 'react'
import styles from '../styles/result.module.css'


interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; MoSS {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer