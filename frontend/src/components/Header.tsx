import React from 'react';
import HomeIcon from 'mdi-react/HomeIcon';
import Router from 'next/router';
import styles from '../styles/result.module.css';

//  main으로 가는 버튼 포함하는 header
function Header() {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <nav>
                <button className={styles.headerIcon} onClick={() => Router.push('/')}>
                    <HomeIcon />
                </button>
            </nav>
        </header>
    );
}

export default Header;