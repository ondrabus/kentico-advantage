import React from "react"
import styled, { createGlobalStyle } from 'styled-components'
import * as style from '../styles'
import reset from 'styled-reset'
import Helmet from 'react-helmet'

import CookieConsentHtml from './cookie-consent-html'
import MobileBar from './mobile-bar'
import LargeBar from './large-bar'
import Menu from './menu'
import RightBar from './right-bar'

const GlobalStyle = createGlobalStyle`
    ${reset}

    body, html
    {
        width: 100%;
        font-family: 'Source Sans Pro', sans-serif;
        counter-reset: section;
    }

    a
    {
        color: ${style.palette.a_foreground};
        text-decoration: underline;
    }
    a:hover
    {
        color: ${style.palette.a_foreground};
        text-decoration: none;
    }
    .visible
    {
        display: block;
    }
    .hidden
    {
        display: none;
    }
    strong
    {
        font-weight: bold;
    }
    nav
    {
        padding: 0 20px;
        flex-shrink: 0;

        a
        {
            display: block;
            text-decoration: none;
            color: ${style.palette.nav_foreground};
            line-height: 2em;

            transition: all 0.3s;
            -webkit-transition: all 0.3s;

            :hover
            {
                color: ${style.palette.nav_hover};
            }
        }

        ul
        {
            margin: 5px 0 10px 20px;
            list-style-type: none;

            li
            {
                font-weight: bold;

                ul li
                {
                    font-weight: normal;
                }
            }
        }
    }
`;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    ${style.media.md`
        flex-direction: row;
    `}
`;



class Layout extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {menuVisible: false};
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
    }

    toggleMenuVisibility() {
        this.setState({
            menuVisible: !this.state.menuVisible
        });
    }

    render(){
        return (
        <React.Fragment>
            <Helmet>    
                <link rel="canonical" href="http://advantage.kentico.com"></link>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"></meta>
                
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,400italic&amp;subset=latin,latin-ext" media="all"></link>

                <link rel="shortcut icon" type="image/ico" href="/favicon.ico"></link>
                <title>Kentico Advantage</title>
            </Helmet>

            <GlobalStyle />
            
            <BodyContainer>
                <MobileBar onMenuButtonClick={this.toggleMenuVisibility} />
                <LargeBar />
        
                <Menu activePageId={this.props.pageId} menuVisible={this.state.menuVisible} onMenuButtonClick={this.toggleMenuVisibility} />
                
                <RightBar children={this.props.children} />
            </BodyContainer>

            <CookieConsentHtml />
    
            {/*<CookieConsent />*/}
    
        </React.Fragment>);
    }
}

export default Layout