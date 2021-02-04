import React from "react"
import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import Helmet from 'react-helmet'
import Teaser from "../components/teaser"
import ContentZone from "../components/content-zone"
import Breadcrumbs from "../components/breadcrumbs"
import References from "../components/references"
import { RichTextElement } from "@kentico/gatsby-kontent-components"
import { graphql, Link } from "gatsby"

export default ({data}) => {
    const page = data.allKontentItemPage.edges[0].node;

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
                    {/* <div dangerouslySetInnerHTML={{__html: page.elements.content.resolvedHtml}}></div> */}
                    <RichTextElement
                    value={page.elements.content.value}
                    images={page.elements.content.images}
                    links={page.elements.content.links}
                    resolveImage={image => {
                      return (
                        <img
                          src={image.url}
                          alt={image.description}
                        />
                      )
                    }}
                    resolveLink={(link, domNode) => {
                      return (
                        <Link to={`/${link.url_slug}`}>
                          {domNode.children[0].data}
                        </Link>
                      )
                    }}
                  />
                </ContentZone>
                
                {page.elements.references && Array.isArray(page.elements.references.value) && page.elements.references.value.length > 0 &&
                    <ContentZone>
                        <References data={page.elements.references.value} />
                    </ContentZone>
                }
            </main>
        </Layout>
        );
    }
export const query = graphql`
    query($id: String!) {
        allKontentItemPage(filter: {id: {eq: $id}}) {
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
            images {
              image_id
              url
              description
            }
            links {
              link_id
              url_slug
            }
          }
          teaser {
            value
          }
          references {
            value {
              ... on kontent_item_link {
                elements {
                  title {
                    value
                  }
                  url {
                    value
                  }
                }
                system {
                  id
                }
              }
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