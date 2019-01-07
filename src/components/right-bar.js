import React from "react"
import styled from "styled-components"
import * as style from '../styles'

const RightBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    main
    {
        flex-grow: 1;
    }

    ${style.media.md`
        margin: 0 0 0 250px;    
    `}
`;
const Footer = styled.div`
	margin: 40px 0 0;
	color: ${style.palette.footer_foreground};
	background: ${style.palette.footer_background};
	padding: 20px 0;
	text-align: center;

    a
    {
        color: ${style.palette.footer_foreground};
    }
`;

class RightBar extends React.Component
{
    render(){
        return (
        <RightBarContainer>
            {this.props.children}
                        
            <Footer>
                <p>
                    Copyright &copy; {(new Date().getFullYear())} Kentico Software. All rights reserved.
                </p>
                <ul>
                    <li>
                        <a href="http://www.kentico.com" title="Kentico.com" target="_blank" rel="noopener noreferrer">Kentico main website</a>
                    </li>
                </ul>
            </Footer>
        </RightBarContainer>);
    }
}

export default RightBar