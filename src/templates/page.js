import React from "react"
import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import Helmet from 'react-helmet'
import Teaser from "../components/teaser"
import ContentZone from "../components/content-zone"
import Breadcrumbs from "../components/breadcrumbs"
import {graphql} from 'gatsby'
import References from "../components/references"

export default ({data}) => {
    const page = data.allKenticoCloudItemPage.edges[0].node;

    return (
        <Layout pageId={page.system.id}>
            <Helmet>
                <title>{page.elements.title.value}</title>
            </Helmet>
            
            <Breadcrumbs pageId={page.system.id} />
            
            <main>
                <Jumbotron
                    className="jumbotron-content-page violet"
                    page={page.elements.url.value}
                    header={page.elements.title.value}
                />

                <Teaser>
                    <span dangerouslySetInnerHTML={{__html: page.elements.teaser.value}}></span>
                </Teaser>

                <ContentZone>
                    <div dangerouslySetInnerHTML={{__html: page.elements.content.resolvedHtml}}></div>
                </ContentZone>
                
                {page.elements.references && Array.isArray(page.elements.references) && page.elements.references.length > 0 &&
                    <ContentZone>
                        <References data={page.elements.references} />
                    </ContentZone>
                }
            </main>
        </Layout>
        );
    }

export const query = graphql`
    query($id: String!) {
        allKenticoCloudItemPage (filter: {system: {id: {eq: $id}}}) {
            edges {
                node {
                    elements {
                        title {
                        value
                        }
                        url {
                        value
                        }
                        content {
                            value
                            resolvedHtml
                        }
                        teaser{
                            value
                        }
                        references
                        {
                            system { id }
                            elements{
                                title { value }
                                url { value }
                            }
                        }
                    }
                    system {
                        id
                    }
                }
            }
        }
    }
`