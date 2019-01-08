import React from "react"
import styled from 'styled-components'
import * as style from '../styles'

const ContentZoneContainer = styled.section`

    padding: 10px 20px;

    ${style.media.sm`
        padding: 10px 20px;
    `}
    ${style.media.md`
        padding: 16px 278px 16px 20px;
    `}

    &.highlighted
    {
        background: ${style.palette.zone_highlighted_background};
        margin: 0px auto 0px;
        padding: 20px;
            
        ${style.media.sm`
            padding: 32px 20px 32px;
        `}
        ${style.media.md`
            padding: 16px 278px 16px 20px;
        `}
    }

    ${style.media.md`
        &.right-zone
        {
            display: block;
            float: right;
            width: 238px;
            padding: 32px 20px 32px;
        }
    `}

    &.right-zone .icon
    {
        display: none;

        ${style.media.md`
            display: block;
            width: 238px;
            height: 238px;
            background-size: contain;
            margin: -80px 0 30px 0;
        `}
    }


    h2
    {
        margin: 0 0 15px;
        font-size: 1.8em;
        line-height: 1.1em;
        color: ${style.palette.zone_heading_foreground};
        font-weight: bold;

        ${style.media.md`
            font-size: 2.8em;
            margin: 15px 0 15px;
        `}
    }

    h3
    {
        font-size: 1.4em;
        color: ${style.palette.zone_heading_foreground};
        font-weight: bold;
        line-height: 1.5em;
    }

    p
    {
        line-height: 1.5em;
        margin: auto auto 16px;
    }

    p:last-of-type
    {
        margin: auto;
    }

    ul
    {
        list-style-type: none;
        margin: 0;
        line-height: 1.5em;
        margin: 15px 15px 15px 30px;
    }

    ol
    {
        list-style-type: decimal;
        margin: 15px 15px 15px 30px;
        line-height: 1.5em;
    }
    
    ul li::before
    {
        display: inline-block;
        content: "•";
        margin-left: -15px;
        width: 15px;
        color: ${style.palette.zone_list_bullet_foreground};
    }

    ul li, .zone ol li
    {
        margin: 0;
        color: ${style.palette.zone_content_foreground};
    }

    ol li
    {
        margin-bottom: 10px;
    }

    table
    {
        border: 1px solid #e0e8ea;
        margin: 24px 0;
        width: 100%;
    }
    table th, table tr:first-of-type td
    {
        background: #e6ecee;
        font-weight: 700;
        text-align: left;
    }
    table td,
    table th
    {
        padding: 10px;
        border: 1px solid #c8d1d1;
    }
    table td.red
    {
        background: #FFE7E7;
    }
    table td.green
    {
        background: #DDFADE;
    }
    table td.yellow
    {
        background: #FFD;
    }
    table td.lightgray
    {
        background: #F5F8F8;
    }
`;

class ContentZone extends React.Component
{
    render(){
        return (
        <ContentZoneContainer className={this.props.className}>
            {this.props.children}
        </ContentZoneContainer>
        );
    }
}

export default ContentZone
