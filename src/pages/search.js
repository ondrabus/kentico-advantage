import React from "react"
import Layout from "../components/layout"
import Helmet from 'react-helmet'
import SearchResults from "../components/search-results"

export default (pageData) => {
    var searchQuery = pageData.location.search.replace("?s=", "");
    if (searchQuery.includes("?"))
    {
        searchQuery = null;
    }
    return (<Layout>
        <Helmet>
            <title>Search results</title>
        </Helmet>
        <main>
            <SearchResults searchQuery={searchQuery} />
        </main>
    </Layout>);
}