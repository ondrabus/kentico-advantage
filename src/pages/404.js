import React from "react"
import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import Helmet from 'react-helmet'
import ContentZone from '../components/content-zone'

export default () => (
    <Layout>
        <Helmet>
            <title>Not found</title>
        </Helmet>
        <main>
            <Jumbotron
                className="jumbotron-content-page violet"
                header="Page not found"
            />
            
            <ContentZone>
                <p>Sorry, the page you were looking for was not found. Please try searching for similar page in the search bar above.</p>
            </ContentZone>
        </main>
    </Layout>
)