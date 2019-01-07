import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import CookieConsent from "react-cookie-consent"

const ConsentWrapper = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: ${style.palette.zone_highlighted_background};
    color: ${style.palette.zone_heading_foreground};
    flex-direction: column;
    align-items: stretch;
    font-size: 0.95em;
    line-height: 30px;
    box-sizing: border-box;

    -webkit-box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.2);
    box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.2);

    button
    {
        text-align: right;
        color: #fff;
        cursor: pointer;
        text-align: center;
        background: #00a2b8;
        border: none;
        padding: 10px;

        :hover {
            background: ${style.palette.nav_hover};
        }
    }

    > .cookieConsent
    {
        margin: 10px;
        position: relative !important;
        bottom: auto !important;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    ${style.media.sm`
        flex-direction: row;
        line-height: 30px;

        > .cookieConsent > div
        {
            flex-grow: 5;
    		flex-basis: 0;
        }

        > .cookieConsent
        {
            flex-direction: row;
        }

        button
        {
            margin-left: 20px;
            flex-grow: 1;
            flex-basis: 0;
        }
    `}
`;

class CookieConsentHtml extends React.Component{
    render(){
        return (
        <ConsentWrapper>
            <CookieConsent
                disableStyles={true}
                buttonText="I agree"
                cookieName="kacookieconsent"
                >
            <p>Kentico uses small cookies to improve your website experience. You may disable them from your browser settings at any time. <a href="https://kentico.com/Kentico-com-Privacy-Policy">Learn more</a></p>
            </CookieConsent>
        </ConsentWrapper>
        )
    }
}

export default CookieConsentHtml