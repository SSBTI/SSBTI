import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('../components/review/Board/editor'),
  { ssr: false }
)

function reviewBoard() {
  return (
    <div>
      <Editor />
    </div>
  )
}

export default reviewBoard;
