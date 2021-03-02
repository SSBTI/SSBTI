import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    pageTitle: string
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
    return (
        <>
            <Head>
                <title>SSBTI | {pageTitle}</title>
            </Head>
            <div>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout