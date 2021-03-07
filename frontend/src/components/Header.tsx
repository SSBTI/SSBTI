import React from 'react';
import AppLink from './AppLink';

//  main으로 가는 버튼 포함하는 header
function Header() {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <nav>
                <AppLink href="/" label="Home" />
            </nav>
        </header>
    );
}

export default Header;