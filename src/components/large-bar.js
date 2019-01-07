import React from "react"
import styled from "styled-components"
import * as style from '../styles'


const LargeBarContainer = styled.div`
    display: none;
    position: fixed;
    align-items: flex-end;
    flex-direction: column;
    z-index: 2;
    width: 100%;
    flex-shrink: 0;
    height: 60px;
    line-height: 40px;
    font-size: 125%;
    color: ${style.palette.large_bar_foreground};
    background: ${style.palette.large_bar_background};
    top: 0;
        
    -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.2);
    
    transition: all 0.3s;
    -webkit-transition: all 0.3s;

    input[type=submit]
    {
        font-family: FontAwesome;
        display: inline-block;
        color: ${style.palette.mobile_bar_foreground};
        padding: 10px 20px;
        background: none;
        border: 0;
        cursor: pointer;
        font-size: 1em;
    }

    input[type=text]
    {
        height: 30px;
        font-size: 75%;
        border: 0;
        border-bottom: 2px solid ${style.palette.search_box_underline};
        
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
    }

    ${style.media.md`
        display: flex;
    `}

    &.closed
    {
        top: -70px;
    }
`;

const Search = styled.div`
    flex-grow: 1;
    text-align: center;
    line-height: 60px; 
    
    input[type=text]:focus
    {
        outline: none;
	    border-color: #4a4d4d;
    }
`;



class LargeBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {barVisible: true};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(e){
        if (this.state.barVisible && window.pageYOffset > 250)
        {
            this.setState(state => ({
                barVisible: false
            }));
        }
        if (!this.state.barVisible && window.pageYOffset <= 250)
        {
            this.setState(state => ({
                barVisible: true
            }));
        }
    }

    render(){
        return (
        <LargeBarContainer className={this.state.barVisible ? 'open' : 'closed'}>
            <Search>
                <form action="/search" method="get">
                    <input type="text" name="s" />
                    <input type="submit" value="&#xf002;" />
                </form>
            </Search>
        </LargeBarContainer>);
    }
}

export default LargeBar