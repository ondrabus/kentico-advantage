import React from "react"
import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import Helmet from 'react-helmet'
import Teaser from "../components/teaser"
import ContentZone from "../components/content-zone"
import Breadcrumbs from "../components/breadcrumbs"
import TableOfContents from "../components/table-of-contents"
import Scenarios from "../components/scenarios"
import References from "../components/references"
import styled from 'styled-components'
import NextPrevButtons from "../components/nextprev-buttons"
import { RichTextElement } from "@kentico/gatsby-kontent-components"
import { graphql, Link } from "gatsby"


const IconContainer = styled.div`
img
{
    width: 238px;
    height: 238px;
}
`

export default ({data}) => {
    const phase = data.kontentItemPhase;

    var addAnchors = function(text){
        var textAfter = text.replace(/<h2/g, (() => {
            var index = 0;
            return () => {
                return '<h2 id="h' + index++ + '"';
            }
        })());
        return textAfter;
    };
    var parseTables = function(text){
        return text.replace(/(<td>)\{\.(.*?)\}+/g, '<td class="$2">');
    }

    var currentIndex = 0;
    var phaseIndex = 0;
    var subIndex = 0;
    var phaseSubIndex = 0;
    
    data.kontentItemNavigationItem.elements.child_items.value.forEach(phaseNav => {
        if (phaseNav.elements.content_item && Array.isArray(phaseNav.elements.content_item.value) && phaseNav.elements.content_item.value.length === 1)
        {
            currentIndex++;
            if (phaseNav.elements.content_item.value[0].system.id === phase.system.id)
            {
                phaseIndex = currentIndex;
            }
            if (phaseNav.elements.content_item.value[0].elements.subphases.value && Array.isArray(phaseNav.elements.content_item.value[0].elements.subphases.value) && phaseNav.elements.content_item.value[0].elements.subphases.value.length > 0)
            {
                subIndex = 0;
                phaseNav.elements.content_item.value[0].elements.subphases.value.forEach(subphaseNav => {
                    subIndex++;

                    if (subphaseNav.system.id === phase.system.id)
                    {
                        phaseIndex = currentIndex;
                        phaseSubIndex = subIndex;
                    }
                })
            }
        }
    });

    const index = phaseIndex + '.' + (phaseSubIndex > 0 ? phaseSubIndex + '.' : '');

    return (
        <Layout pageId={phase.system.id}>
            <Helmet>
                <title>{phase.elements.title.value}</title>
            </Helmet>
            
            <Breadcrumbs pageId={phase.system.id} />
            
            <main>
                <Jumbotron
                    className={'jumbotron-content-page ' + phase.elements.background.value[0].codename}
                    page={phase.elements.url.value}
                    header={index + ' ' + phase.elements.title.value}
                />

                <Teaser>
                    <span dangerouslySetInnerHTML={{__html: phase.elements.teaser.value}}></span>
                </Teaser>

                <ContentZone className="right-zone">
                    {phase.elements.icon && Array.isArray(phase.elements.icon.value) && phase.elements.icon.value.length === 1 &&
                        <IconContainer className="icon">
                            <img
                                src={phase.elements.icon.value[0].url}
                                alt={phase.elements.title.value}>
                            </img>
                        </IconContainer>
                    }

                    <TableOfContents content={phase.elements.content.value} />
                </ContentZone>
                

                <ContentZone>
                  <RichTextElement
                    value={parseTables(addAnchors(phase.elements.content.value))}
                    images={phase.elements.content.images}
                    links={phase.elements.content.links}
                    linkedItems={phase.elements.content.modular_content}
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
                    resolveLinkedItem={linkedItem => {
                      console.log(linkedItem);
                      if (linkedItem.system.type === 'phase')
                      {
                        return <React.Fragment>
                          <h2>
                            <Link to={'/' + linkedItem.elements.url.value} title={linkedItem.elements.title.value}>{linkedItem.elements.title.value}</Link>
                          </h2>
                          {!linkedItem.elements.overview.value !== '<p><br></p>' && <div dangerouslySetInnerHTML={{__html: linkedItem.elements.overview.value}}></div>}
                        </React.Fragment>
                      }
                      else if (linkedItem.system.type === 'scenario')
                      {
                        return <Scenarios data={[linkedItem]} />
                      }
                      
                      return <pre>{JSON.stringify(linkedItem, undefined, 2)}</pre>
                    }}
                  />
                    {/* <div dangerouslySetInnerHTML={{__html: parseTables(addAnchors(phase.elements.content.resolvedHtml))}}></div> */}
                </ContentZone>

                {phase.elements.scenarios && Array.isArray(phase.elements.scenarios.value) && phase.elements.scenarios.value.length > 0 && 
                <ContentZone>
                    <Scenarios data={phase.elements.scenarios.value} />
                </ContentZone>
                }

                {phase.elements.references && Array.isArray(phase.elements.references) && phase.elements.references.length > 0 &&
                <ContentZone>
                    <References data={phase.elements.references} />
                </ContentZone>
                }

                <NextPrevButtons phase={phase} />
            </main>
        </Layout>
        );
    }

export const query = graphql`
         query($id: String!) {
           kontentItemPhase(id: { eq: $id }) {
             system { id }
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
                 modular_content {
                  ... on kontent_item_phase {
                    system {
                      codename
                      type
                    }
                    elements {
                      title {
                        value
                      }
                      url {
                        value
                      }
                      overview {
                        value
                      }
                    }
                  }
                  ... on kontent_item_scenario {
                    system {
                      id
                      codename
                      type
                    }
                     elements {
                       detail {
                         value
                       }
                       title {
                         value
                       }
                     }
                  }
                }
               }
               overview {
                 value
               }
               teaser {
                 value
               }
               icon {
                 value {
                   url
                 }
               }
               background {
                 value {
                   codename
                 }
               }
               scenarios {
                 value {
                   ... on kontent_item_scenario {
                     system { id }
                     elements {
                       detail {
                         value
                       }
                       title {
                         value
                       }
                     }
                   }
                 }
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
                   }
                 }
               }
             }
             system {
               id
             }
           }
           kontentItemNavigationItem(
             system: { codename: { eq: "nav_project_phases" } }
           ) {
             elements {
               child_items {
                 value {
                   ... on kontent_item_navigation_item {
                     elements {
                       content_item {
                         value {
                           ... on kontent_item_phase {
                             system { id }
                             elements {
                               subphases {
                                 value {
                                   system { id }
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       `;