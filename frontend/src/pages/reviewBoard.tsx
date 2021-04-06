import React, { useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Loader from '../components/loader';
import Information from '../components/review/Board/information';
import CheckIsMobile from '../hooks/CheckIsMobile';

const Editor = dynamic(
  () => import('../components/review/Board/editor'),
  {
    loading: () => (
      <div>
        <Loader />
      </div>
    ),
    ssr: false
  }
)

function reviewBoard() {
  const isMobile = CheckIsMobile();

  return (
    <Layout pageTitle="Board">
      {isMobile ? 
        <Information /> :
        <Editor />}
    </Layout>
  )
}

export default reviewBoard;
