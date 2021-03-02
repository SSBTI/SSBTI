import React from 'react'

interface TitleProps {
    title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>당신은</h1>
            <h1>"{title}"입니다.</h1>
        </div>
    )
}

export default Title