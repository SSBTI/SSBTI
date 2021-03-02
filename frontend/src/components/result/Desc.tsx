import React from 'react'

interface DescProps {
    desc: string
}

const Desc: React.FC<DescProps> = ({ desc }) => {
    return (
        <li>{desc}</li>
    )
}

export default Desc