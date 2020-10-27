import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import { graphql, StaticQuery, Link } from "gatsby"


const NextPrevButtonsContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;

    a
    {
        padding: 15px 25px;
        background: ${style.palette.nextprev_button_background};
        color: ${style.palette.nextprev_button_foreground};
        width: 110px;
        text-align: center;
        text-decoration: none;
    }

    .prev
    {
        margin-right: auto;
    }

    .next
    {
        margin-left: auto;
    }

    a:hover
    {
        color: ${style.palette.nextprev_button_hover_foreground};
        background: ${style.palette.nextprev_button_hover_background};
    }

    ${style.media.md`
        padding-right: 0;
        margin-right: 278px;
    `}
`;



class NextPrevButtons extends React.Component
{
    render(){
        return (
        <StaticQuery
            query={graphql`
{
  allKontentItemNavigationItem(filter: {system: {codename: {eq: "nav_project_phases"}}}) {
    edges {
      node {
        elements {
          child_items {
            value {
              ... on kontent_item_navigation_item {
                elements {
                  content_item {
                    value {
                      ... on kontent_item_phase {
                        system {
                          id
                        }
                        elements {
                          subphases {
                            value {
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
        }
      }
    }
  }
  allKontentItemPhase {
    edges {
      node {
        system {
          id
        }
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
                `}
            render={data => {
                const phasesList = [];
                data.allKontentItemNavigationItem.edges[0].node.elements.child_items.value.forEach(phase => {
                    if (phase.elements.content_item && Array.isArray(phase.elements.content_item.value) && phase.elements.content_item.value.length === 1)
                    {
                        // add main phase ID
                        phasesList.push(phase.elements.content_item.value[0].system.id);
                        // process subphases
                        
                        if (phase.elements.content_item.value[0].elements.subphases && Array.isArray(phase.elements.content_item.value[0].elements.subphases.value) && phase.elements.content_item.value[0].elements.subphases.value.length > 0)
                        {
                            phase.elements.content_item.value[0].elements.subphases.value.forEach(subphase => {
                                phasesList.push(subphase.system.id);
                            })
                        }
                    }
                })

                const phases = [];
                data.allKontentItemPhase.edges.forEach(phase => {
                    phases.push(({id: phase.node.system.id, title: phase.node.elements.title.value, url: phase.node.elements.url.value}));
                });

                const currentPhaseIndex = phasesList.indexOf(this.props.phase.system.id);
                const prevPhase = currentPhaseIndex > 0 ? phases.find(p => p.id === phasesList[currentPhaseIndex-1]) : null;
                const nextPhase = currentPhaseIndex+1 < phasesList.length ? phases.find(p => p.id === phasesList[currentPhaseIndex+1]) : null;

                return (
                <NextPrevButtonsContainer>
                    {prevPhase && 
                        <Link to={"/" + prevPhase.url} title={prevPhase.title} className="prev">Previous</Link>
                    }
                    {nextPhase &&
                        <Link to={"/" + nextPhase.url} title={nextPhase.title} className="next">Next</Link>
                    }
                </NextPrevButtonsContainer>
                );
            }}
            />
        );
    }
}

export default NextPrevButtons