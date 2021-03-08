import React from 'react';

// 공통으로 사용되는 img 스타일
function Image(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={props.src} alt="" width="300" height="300" style={{ display: 'inline' }} />
        </div>
    );
}

export default Image