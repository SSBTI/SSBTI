import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const Editor = dynamic(
  () => import('../components/review/Board/update'),
  { ssr: false }
)

function reviewBoard() {
  return (
    <div>
      <Layout pageTitle="Board">
        <Editor />
      </Layout>
    </div>
  )
}

export default reviewBoard;
