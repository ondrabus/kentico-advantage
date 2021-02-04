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

    .powered-by-title {
      margin: 24px;
      font-size: 14px;
    }

    img {
      height:60px
    }

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
                      navigationItems: allKontentItem(filter: {system: {type: {eq: "navigation_item"}}}) {
                        nodes {
                          ... on kontent_item_navigation_item {
                            elements {
                              title {
                                value
                              }
                              url {
                                value
                              }
                              child_items {
                                value {
                                  id
                                }
                              }
                              content_item {
                                value {
                                  system {
                                    id
                                    type
                                  }
                                }
                              }
                            }
                          }
                          id
                        }
                      }
                      phases: allKontentItem(filter: {system: {type: {eq: "phase"}}}) {
                        nodes {
                          id
                          ... on kontent_item_phase {
                            system { id }
                            elements {
                              subphases {
                                value {
                                  system { id }
                                }
                              }
                              url {
                                value
                              }
                            }
                          }
                        }
                      }
                      pages: allKontentItem(filter: {system: {type: {eq: "page"}}}) {
                        nodes {
                          id
                          ... on kontent_item_page {
                            system { id }
                            elements {
                              url {
                                value
                              }
                            }
                          }
                        }
                      }
                    }
                    `}
                    render={data => {
                        let navigationItems = {};
                        data.navigationItems.nodes.forEach(item => navigationItems[item.id] = item);
                        let phases = {};
                        let pages = {};
                        data.phases.nodes.forEach(item => phases[item.system.id] = item);
                        data.pages.nodes.forEach(item => pages[item.system.id] = item);

                        let rootItem = data.navigationItems.nodes.find(n => n.elements.url.value === "~");
                        rootItem.children = rootItem.elements.child_items.value.map(i => navigationItems[i.id]);
                        rootItem.children.forEach(menuItem => menuItem.children = menuItem.elements.child_items.value.map(subMenuItem => navigationItems[subMenuItem.id]));

                        let menu = rootItem.children.map(menuItem => {
                          let subMenu = menuItem.children && <ul>
                            {menuItem.children.map(subMenuItem => {
                              let currentPhase = phases[subMenuItem.elements.content_item.value[0].system.id];
                              let isActive = false;
                              if (currentPhase.system.id === this.props.activePageId || currentPhase.elements.subphases.value.some(subphase => subphase.system.id === this.props.activePageId))
                              {
                                isActive = true;
                              }
                              return (<li key={currentPhase.elements.url.value}>
                              <Link className={isActive ? 'active' : ''} to={`/${currentPhase.elements.url.value}`} title={subMenuItem.elements.title.value}>{subMenuItem.elements.title.value}</Link>
                              </li>
                            )})}
                            </ul>
                          let item = menuItem.elements.title.value;
                          if (menuItem.elements.content_item.value.length > 0)
                          {
                            let currentDocumentId = menuItem.elements.content_item.value[0].system.id;
                            let currentDocument = Object.keys(phases).includes(currentDocumentId) ? phases[currentDocumentId] : pages[currentDocumentId];
                            item = <Link className={currentDocument.system.id === this.props.activePageId ? 'active' : ''} to={`/${currentDocument.elements.url.value}`} title={menuItem.elements.title.value}>{item}</Link>
                          }
                          return (<li key={menuItem.elements.url.value}>{item}{subMenu}</li>)
                        });

                        return (
                                <LeftBar className={this.props.menuVisible ? 'open' : 'closed'}>
                                    <div className="close">
                                        <a title="Close" className="left-bar-button" onClick={this.props.onMenuButtonClick} href="#!">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                    <header>
                                        <Link to="/">
                                            <img
                                                src={withPrefix('/assets/img/kentico_rgb_small.png')}
                                                alt="Kentico Advantage" />
                                        </Link>
                                    </header>
                                    <nav>
                                        <ul>
                                            {menu}
                                        </ul>
                                    </nav>
                                    
                                    <PoweredBy>
                                      <div className="powered-by-title">
                                        Powered by
                                      </div>
                                        <a href="https://kontent.ai/">
                                            <img src="../assets/img/powered-by-kk.png" alt="KK"/>
                                        </a>
                                    </PoweredBy>
                                </LeftBar>
                        )
                    }}
                />)
    }
}

export default Menu
