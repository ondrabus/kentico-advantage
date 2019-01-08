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
        return (
            <StaticQuery
                query={graphql`
                        query Phases {
                            allKenticoCloudItemNavigationItem(filter: {system: {codename: {eq: "nav_project_phases"}}}) {
                                edges {
                                  node {
                                    elements {
                                        child_items {
                                            elements {
                                                content_item {
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
                                                    icon
                                                    {
                                                        assets { url }
                                                    }
                                                    }
                                                    system {
                                                    type
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
                            {data.allKenticoCloudItemNavigationItem.edges[0].node.elements.child_items
                                .map(item => {
                                    return item.elements.content_item.map(phase => {
                                        return (<PhaseIcon key={phase.elements.url.value} size="small" icon={phase.elements.icon.assets[0].url} url={phase.elements.url.value} title={phase.elements.title.value} overview={phase.elements.overview.value} />);
                                    })
                                })}
                        </ol>
                    </ProjectPhasesContainer>
                }
            />
        )
    }
}

export default ProjectPhases
