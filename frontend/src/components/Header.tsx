import React from 'react';
import AppLink from './AppLink';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <nav>
                <AppLink href="/" label="Home" />
            </nav>
        </header>
    )
}

export default Header;