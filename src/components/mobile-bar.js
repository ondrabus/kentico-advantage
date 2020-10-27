import React from "react"
import styled from "styled-components"
import * as style from '../styles'


const MobileBarContainer = styled.div`
	display: flex;
	flex-shrink: 0;
	height: 60px;
	line-height: 40px;
	font-size: 125%;
    color: ${style.palette.mobile_bar_foreground};
    
    a
    {
        display: inline-block;
        color: ${style.palette.mobile_bar_foreground};
        padding: 10px 20px;
    }

    > div
    {
        flex-basis: 0;
    }

    form
    {
        width: 100%;
    }

    input
    {
        height: 30px;
        font-size: 75%;
        border: 0;
        border-bottom: 2px solid ${style.palette.search_box_underline};
        
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        
        :focus
        {
            border-color: ${style.palette.search_box_focus_underline};
        }
    }

    ${style.media.md`
        display: none;
    `}
`;

const MenuButton = styled.div`
    flex-grow: 0;
`;

const Search = styled.div`
    flex-grow: 1;
    text-align: right;
    
    input[type=text]:focus
    {
        outline: none;
        border-color: #4a4d4d;
    }
`;



class MobileBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {visible: false};
        this.toggleVisiblity = this.toggleVisibility.bind(this);
    }

    toggleVisibility = event => {
        this.setState(state => ({visible: !state.visible}));
    }

    render(){
        return (
        <MobileBarContainer>
            <MenuButton>
                <a title="Open menu" className="left-bar-button" onClick={this.props.onMenuButtonClick} href="#!">
                    <i className="fa fa-bars"></i>
                </a>
            </MenuButton>
            <Search>
                {!this.state.visible &&
                    <div>
                        <a onClick={this.toggleVisibility} title="Search" href="#!">
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                }
                {this.state.visible && 
                    <div>
                        <form action="/search" method="get">
                            <input type="text" name="s" ref={(input) => { if (input){ input.focus(); }}} />
                            <a title="Close" onClick={this.toggleVisibility} href="#!">
                                <i className="fa fa-times"></i>
                            </a>
                        </form>
                    </div>
                }
            </Search>
        </MobileBarContainer>);
    }
}

export default MobileBar