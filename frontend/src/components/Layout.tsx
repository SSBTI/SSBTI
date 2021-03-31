import React, { useDebugValue } from 'react';
import Head from 'next/head';
import Footer from './Footer';

//  기본 레이아웃 (header + main + footer)
function Layout(props) {
    const value = true;
    return (
        <>
            <Head>
                <title>SSBTI | {props.pageTitle}</title>
            </Head>
            <div>
                <main>{props.children}</main>
                <Footer />
            </div>
            <style 
            dangerouslySetInnerHTML={{__html: `
                body {
                    // height:100vh;
                    position:relative;
                    background: url("backgrounds/appliances_background3.png");
                    background-repeat: repeat repeat;
                    // background-position:center;
                    // background-size: cover;
                    height:100%;
                    font-family: CookieRun-Regular;
                }
                @font-face {
                    font-family: 'CookieRun-Regular';
                    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
            `}}/>
                
                

            
        </>
    )
}

export default Layout