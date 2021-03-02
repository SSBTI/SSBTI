import React from 'react'

interface PairProps {
    type: string,
    name: string,
    src: string
}

const Pair: React.FC<PairProps> = ({ type, name, src }) => {
    return (
        <div style={{ marginLeft: 50 }}>
            <h2>{type}의 짝꿍<br />{name}</h2>
            <img src={src} alt="" width="300" height="300" />
        </div>
    )
}

export default Pair