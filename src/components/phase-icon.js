import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import { Link } from 'gatsby'

const PhaseIconContainer = styled.li`
    display: block;
    min-height: (76px + (2*24px));
    padding-left: 100px;
    background-repeat: no-repeat;
    background-position: left center;

    h3
    {
        margin: 0;
        font-size: 2em;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: bold;
        white-space: nowrap;
        margin: auto auto 4px;
    }
    
    h3 span::before
    {
        counter-increment: section;
        content: counter(section) ". ";
    }

    p
    {
        margin: 0;
        color: ${style.palette.project_phases_foreground};
        line-height: 1.2em;
    }

    ${style.media.sm`
        h3
        {
            margin: auto auto 6px;
        }
    `}
`;

const IconContainer = styled.span`
    display: block;
    float: left;
    width: 76px;
    margin-right: 24px;
`;

class PhaseIcon extends React.Component
{
    render(){
        return (
            <PhaseIconContainer>
                <Link to={this.props.url} title={this.props.title}>
                    <IconContainer>
                        <img
                            src={this.props.icon}
                            alt={this.props.title}
                        />
                    </IconContainer>
                    <h3><span>{this.props.title}</span></h3>
                    <span dangerouslySetInnerHTML={{__html: this.props.overview}}></span>
                </Link>
            </PhaseIconContainer>)
    }
}

export default PhaseIcon