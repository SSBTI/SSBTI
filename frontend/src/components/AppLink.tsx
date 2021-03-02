import React from 'react'
import Link, { LinkProps } from 'next/link'
import styles from '../styles/result.module.css'

interface AppLinkProps extends LinkProps {
    label: string
}

const AppLink: React.FC<AppLinkProps> = ({ href, label }) => {
    return (
        <Link href={href}>
            <button className={styles.linkBtn}>{label}</button>
        </Link>
    )
}

export default AppLink