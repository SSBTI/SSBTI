import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Loader from '../components/loader';
import Information from '../components/review/Board/information';
import CheckIsMobile from '../hooks/checkIsMobile';

const Editor = dynamic(
  () => import('../components/review/Board/update'),
  { 
    loading: () => (
      <div>
        <Loader />
      </div>
    ),
    ssr: false 
  }
)

function reviewUpdate() {
  const isMobile = CheckIsMobile();
  
  return (
    <Layout pageTitle="Update">
      {isMobile ? 
        <Information /> :
        <Editor />}
    </Layout>
  )
}

export default reviewUpdate;
