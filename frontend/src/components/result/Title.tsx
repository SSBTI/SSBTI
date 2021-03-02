import React from 'react'

interface TitleProps {
    name: string,
}

const Title: React.FC<TitleProps> = ({ name }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>당신은</h1>
            <h1>"{name}"입니다.</h1>
        </div>
    )
}

export default Title