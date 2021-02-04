import React from "react"
import styled from "styled-components"
import * as style from '../styles'

const TableOfContentsContainer = styled.div`
    ol
    {
        background: ${style.palette.toc_background};
        margin: 0;
        padding: 10px 10px 5px 15px;
        list-style-type: none;
    }
`;

class TableOfContents extends React.Component
{
    render(){
        const headings = this.getHeadingsFromText(this.props.content);

        return (
            <TableOfContentsContainer>
                <p>On this page:</p>
                <ol>
                    {headings.map((heading, index) => <li key={index}><a key={index} href={'#h' + index} title={heading}>{heading}</a></li>)}
                </ol>
            </TableOfContentsContainer>
        );
    }

    getHeadingsFromText(text){
        var headings = []; 
        var regex = /<h2>((<a(.*?)>)*(.*?)(<\/a>)*)<\/h2>/gim;
        var found = regex.exec(text);

        while (found != null) {
            headings.push(found[4]);
            found = regex.exec(text);
        }

        return headings;
    }
}

export default TableOfContents