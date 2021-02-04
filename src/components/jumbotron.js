import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import { StaticImage } from "gatsby-plugin-image"

const JumbotronContainer = styled.div`
    position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
    min-height: 220px;
    
    ${style.media.sm`
        min-height: 380px;
        align-items: flex-end;
        flex-direction: row;
    `}
    
    ${style.media.md`
        margin-top: 60px;
    `}

    .heroImage
    {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;

        img {
            object-position: 0 0;
        }
    }

    &.jumbotron-content-page
    {
        padding: 70px 0 10px;
	    min-height: 50px;
        
        ${style.media.sm`
            min-height: auto;
            padding-bottom: 30px;
        `}
    }
    &.green
    {
        background: #538e45;
    }
    &.violet
    {
        background: #424896;
    }
    &.blue
    {
        background: #134d86;
    }
    &.brown
    {
        background: #a97a3c;
    }
    &.red
    {
        background: #de3438;
    }
    &.gray
    {
        background: #696663;
    }
    &.light_blue
    {
        background: #2794cf;
    }
    &.violet
    {
        background: #424896;
    }

    section
    {
        margin: 32px 0 16px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        z-index: 1;
        
        ${style.media.sm`
            align-items: flex-start;
            margin: 32px 10px 16px;
        `}
        
        ${style.media.md`
		    margin: 32px 16px 16px;
        `}
    }

    h1
    {
        color: ${style.palette.jumbotron_heading_foreground};
        background: ${style.palette.jumbotron_heading_background};
        font-size: 1.8em;
        line-height: 1.1em;
        font-weight: 300;
        padding: 10px 16px;

        ${style.media.sm`
            font-size: 3.2em;
            padding: 10px 20px;
        `}
    }
    
    &.jumbotron-content-page h1
    {
        color: ${style.palette.jumbotron_content_heading_foreground};
        background: ${style.palette.jumbotron_content_heading_background};
    }
    p
    {
        color: ${style.palette.jumbotron_paragraph_foreground};
        background: ${style.palette.jumbotron_paragraph_background};
        padding: 16px;
        line-height: 1.25em;
        
        ${style.media.sm`
            line-height: 1.5em;
            padding: 20px;
        `}
    }
`;

class Jumbotron extends React.Component
{
    render(){
        return (
        <JumbotronContainer className={this.props.className}>
            
            <StaticImage
                className="heroImage"
                src="../images/01.jpg"
                alt="Hero image"
                placeholder="blurred"
                layout="fullWidth"

                />

            {this.props.children ? this.props.children : 
                this.props.className === 'jumbotron-homepage' ?
                    <section>
                        <h1>{this.props.header}</h1>
                        {this.props.teaser ? <p>{this.props.teaser}</p> : ''}
                    </section>
                    :
                    <React.Fragment>                
                        <h1>{this.props.header}</h1>
                        {this.props.teaser ? <p>{this.props.teaser}</p> : ''}
                    </React.Fragment>
            }
        </JumbotronContainer>)
    }
}

export default Jumbotron