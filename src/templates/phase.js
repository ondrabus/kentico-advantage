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
import {graphql} from 'gatsby'
import styled from 'styled-components'
import NextPrevButtons from "../components/nextprev-buttons"

const IconContainer = styled.div`
img
{
    width: 238px;
    height: 238px;
}
`

export default ({data}) => {
    const phase = data.allKenticoCloudItemPhase.edges[0].node;
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

    
    data.allKenticoCloudItemNavigationItem.edges[0].node.elements.child_items.forEach(phaseNav => {
        if (phaseNav.elements.content_item && Array.isArray(phaseNav.elements.content_item) && phaseNav.elements.content_item.length == 1)
        {
            currentIndex++;

            if (phaseNav.elements.content_item[0].system.id === phase.system.id)
            {
                phaseIndex = currentIndex;
            }
            if (phaseNav.elements.content_item[0].elements.subphases && Array.isArray(phaseNav.elements.content_item[0].elements.subphases) && phaseNav.elements.content_item[0].elements.subphases.length > 0)
            {
                subIndex = 0;
                phaseNav.elements.content_item[0].elements.subphases.forEach(subphaseNav => {
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
                    className={'jumbotron-content-page ' + phase.elements.background.options[0].codename}
                    page={phase.elements.url.value}
                    header={index + ' ' + phase.elements.title.value}
                />

                <Teaser>
                    <span dangerouslySetInnerHTML={{__html: phase.elements.teaser.value}}></span>
                </Teaser>

                <ContentZone className="right-zone">
                    {phase.elements.icon && Array.isArray(phase.elements.icon.assets) && phase.elements.icon.assets.length === 1 &&
                        <IconContainer className="icon">
                            <img
                                src={phase.elements.icon.assets[0].url}
                                alt={phase.elements.title.value}>
                            </img>
                        </IconContainer>
                    }

                    <TableOfContents content={phase.elements.content.resolvedHtml} />
                </ContentZone>
                

                <ContentZone>
                    <div dangerouslySetInnerHTML={{__html: parseTables(addAnchors(phase.elements.content.resolvedHtml))}}></div>
                </ContentZone>

                {phase.elements.scenarios && Array.isArray(phase.elements.scenarios) && phase.elements.scenarios.length > 0 && 
                <ContentZone>
                    <Scenarios data={phase.elements.scenarios} />
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
        allKenticoCloudItemPhase (filter: {system: {id: {eq: $id}}}) {
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
                        overview {
                            value
                        }
                        teaser{
                            value
                        }
                        icon{
                            assets{
                                url
                            }
                        }
                        background{
                            options{
                                codename
                            }
                        }
                        scenarios
                        {
                            system { id }
                            elements{
                                title { value }
                                detail { value }
                            }
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
        allKenticoCloudItemNavigationItem(filter: {system: {codename: {eq: "nav_project_phases"}}}) {
            edges {
              node {
                elements {
                  child_items {
                    elements {
                      content_item {
                        system {
                          id
                        }
                        elements {
                          subphases {
                            system {
                              id
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
`