import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import { withPrefix, graphql, StaticQuery, Link } from 'gatsby'

const LeftBar = styled.div.attrs({
        className: 'closed'
    })`
    position: fixed;
	width: 250px;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	background: #fff;
	top: 0;
	z-index: 10;
	-webkit-box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.2);
	box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.2);
	
	transition: all 0.3s;
	-webkit-transition: all 0.3s;
	
    overflow-y: auto;

    &.closed
    {
        left: -300px;
    }
    &.open
    {
        left: 0px;
    }

    header
    {
        display: flex;
        flex-shrink: 0;

        a
        {
            padding: 20px;
            flex-grow: 1;

            img {
                width: 100%;
            }
        }
    }
    
    .close
    {
        align-self: left;
        margin-bottom: -20px;
    }

    .close a
    {
        text-align: right;
        color: @mobile-bar-foreground;
        font-size: 150%;
        padding: 10px 20px;
        line-height: 40px;
        display: inline-block;
    }

    .active
    {
        font-weight: bold;
    }

    ${style.media.md`
        left: 0 !important;
        box-shadow: none;
        -webkit-box-shadow: none;
        border-right: 1px solid #ddd;

        .close
        {
            display: none;
        }
    `}
`;

const PoweredBy = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: flex-end;
    text-align: center;
    padding-bottom: 15px;

    a
    {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
    }
`;

class Menu extends React.Component
{
    render(){
        return (<StaticQuery
                    query={graphql`
                    {
                        allKenticoCloudItemNavigationItem(filter: {elements: {url: {value: {eq: "~"}}}}) {
                          edges {
                            node {
                              elements {
                                child_items {
                                  system {
                                    id
                                  }
                                  elements {
                                    title {
                                      value
                                    }
                                    content_item {
                                      system {
                                        id
                                      }
                                      elements {
                                        url {
                                          value
                                        }
                                      }
                                    }
                                    child_items {
                                      system {
                                        id
                                      }
                                      elements {
                                        title {
                                          value
                                        }
                                        content_item {
                                          system {
                                            id
                                          }
                                          elements {
                                            url {
                                              value
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        allKenticoCloudItemPhase {
                          edges {
                            node {
                              system {
                                id
                              }
                              elements {
                                subphases {
                                  system {
                                    id
                                  }
                                }
                              }
                            }
                          }
                        }
                      }                      
                    `}
                    render={data => {
                        var menu = data.allKenticoCloudItemNavigationItem.edges[0].node.elements.child_items.map(node => {
                            var childItems = node.elements.child_items.map(childNode => {

                                var isActive = false;
                                if (this.props.activePageId && Array.isArray(childNode.elements.content_item) && childNode.elements.content_item.length === 1)
                                {
                                    if (this.props.activePageId === childNode.elements.content_item[0].system.id)
                                    {
                                        isActive = true;
                                    }
                                    else
                                    {
                                        const phase = data.allKenticoCloudItemPhase.edges.filter(phaseEdge => phaseEdge.node.system.id === childNode.elements.content_item[0].system.id);
                                        if (phase.length === 1 && phase[0].node.elements.subphases.filter(subPhase => subPhase.system.id === this.props.activePageId).length > 0)
                                        {
                                            isActive = true;
                                        }
                                    }
                                }
                                
                                return <li key={childNode.system.id}>
                                    <Link to={childNode.elements.content_item[0].elements.url.value} className={isActive ? 'active' : ''} title={childNode.elements.title.value}>{childNode.elements.title.value}</Link>
                                </li>
                            });

                            if (childItems)
                            {
                                childItems = <ul>{childItems}</ul>
                            }
                            
                            var link = node.elements.title.value;
                            if (node.elements.content_item.length === 1)
                            {
                                link = <Link to={node.elements.content_item[0].elements.url.value} title={node.elements.title.value}>{link}</Link>
                            }
                            return (<li key={node.system.id}>
                                {link}
                                {childItems}
                            </li>);
                        });

                        return (
                                <LeftBar className={this.props.menuVisible ? 'open' : 'closed'}>
                                    <div className="close">
                                        <a href="javascript:;" title="Close" className="left-bar-button" onClick={this.props.onMenuButtonClick}>
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                    <header>
                                        <a href="/">
                                            <img
                                                src={withPrefix('/assets/img/kentico_rgb_small.png')}
                                                alt="Kentico Advantage" />
                                        </a>
                                    </header>
                                    <nav>
                                        <ul>
                                            {menu}
                                        </ul>
                                    </nav>
                                    
                                    <PoweredBy>
                                        <a href="https://kenticocloud.com">
                                            <img src="../assets/img/powered-by-kc@1x.png" alt="KC" />
                                        </a>
                                    </PoweredBy>
                                </LeftBar>
                        )
                    }}
                />)
    }
}

export default Menu
