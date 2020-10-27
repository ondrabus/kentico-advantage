import React from "react"

import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"
import * as style from '../styles'
import PhaseIcon from './phase-icon'

const ProjectPhasesContainer = styled.section`
    ol
    {
        list-style-type: none;
    }
    ol li::before
    {
        content: "";
    }
    li a {
        display: block;
        text-decoration: none;
        padding: 24px 0 24px 16px;
        min-height: 76px;
    }
    li
    {
        margin: -10px;
        padding: 10px;
        border-bottom: 1px solid #ececec;
        background-position: 12px;
    }
    li:last-child
    {
        border-bottom:0;
    }
    ol li
    {
        margin: 0;
    }
    li:hover
    {
        background-color: ${style.palette.project_phases_background};
    }
    p
    {
        padding: 0;
    }
`;

class ProjectPhases extends React.Component
{
    render(){
            return <StaticQuery
                query={graphql`
                        query Phases {
                            kontentItemNavigationItem(system: {codename: {eq: "nav_project_phases"}}) {
                                elements {
                                child_items {
                                    value {
                                    ... on kontent_item_navigation_item {
                                        elements {
                                        content_item {
                                            value {
                                            ... on kontent_item_phase {
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
                                                icon {
                                                    value {
                                                    url
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
                    `}
                render={data => 
                    <ProjectPhasesContainer>
                        <ol>
                            {data.kontentItemNavigationItem.elements.child_items.value
                                .map(item => {
                                    return item.elements.content_item.value.map(phase => {
                                        return (<PhaseIcon key={phase.elements.url.value} size="small" icon={phase.elements.icon.value[0].url} url={phase.elements.url.value} title={phase.elements.title.value} overview={phase.elements.overview.value} />);
                                    })
                                })}
                        </ol>
                    </ProjectPhasesContainer>
                }
            />
    }
}

export default ProjectPhases
