import React from 'react'

function Image(props) {

    return (
        <div style={{ textAlign: 'center' }}>
            <img src={props.src} alt="" width="300" height="300" style={{ display: 'inline' }}/>
        </div>
    )
}

export default Image