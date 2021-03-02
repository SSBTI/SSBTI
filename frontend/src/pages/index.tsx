import Main from "./main";
import Survey from "./survey";
import Layout from '../components/Layout'

export default function Home() {
    return (
        <Layout pageTitle="Home">
            <Survey />
        </Layout>
    )
}