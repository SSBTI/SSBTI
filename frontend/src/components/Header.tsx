import React from 'react';
import AppLink from './AppLink';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <AppLink href="/" label="Home" />
            <nav>
                <AppLink href="/result" label="Result" />
            </nav>
        </header>
    )
}

export default Header;