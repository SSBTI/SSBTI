import React from 'react'
import Image from 'next/image'

interface PairProps {
    type: string,
    name: string,
    src: string
}

const Pair: React.FC<PairProps> = ({ type, name, src }) => {
    return (
        <div style={{ marginLeft: 50 }}>
            <h2>{type}의 짝꿍<br />{name}</h2>
            <Image src={src} alt="" width="100" height="100" />
        </div>
    )
}

export default Pair