import React from 'react';
import Head from 'next/head';
import Footer from './Footer';

//  기본 레이아웃 (header + main + footer)
function Layout(props) {
    return (
        <>
            <Head>
                <title>SSBTI | {props.pageTitle}</title>
            </Head>
            <div>
                <main>{props.children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout