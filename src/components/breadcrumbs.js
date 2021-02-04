import React from "react"
import * as style from '../styles'
import styled from "styled-components"
import { graphql, StaticQuery, Link } from "gatsby"


const BreadcrumbsContainer = styled.nav`
    position: absolute;
	z-index: 1;
	display: flex;
	align-items: rows;
	text-shadow: 0 1px 5px #424545;
	color: ${style.palette.breadcrumbs_foreground};
	padding-top: 10px;
    
    ${style.media.md`
        top: 60px;
    `}
	
	a
	{
		margin-right: 6px;
		color: ${style.palette.breadcrumbs_foreground};
		text-decoration: underline;
	}
	
	a:last-of-type { text-decoration: none; }
	
	a:hover
	{
		color: ${style.palette.breadcrumbs_foreground};
		text-decoration: none;
	}
	
	a+a::before
	{
		display: inline-block;
		margin-right: 6px;
		content: "/";
	}  
`;

class Breadcrumbs extends React.Component
{
    render(){
      
        return (
            <StaticQuery 
                query={graphql`
                {
  allKontentItemNavigationItem(filter: {elements: {url: {value: {eq: "~"}}}}) {
    edges {
      node {
        elements {
          child_items {
            value {
              ... on kontent_item_navigation_item {
                system {
                  id
                }
                elements {
                  title {
                    value
                  }
                  content_item {
                    value {
                      ... on kontent_item_phase {
                        system {
                          id
                        }
                        elements {
                          title {
                            value
                          }
                          url {
                            value
                          }
                        }
                      }
                      ... on kontent_item_page {
                        system {
                          id
                        }
                        elements {
                          title {
                            value
                          }
                          url {
                            value
                          }
                        }
                      }
                    }
                  }
                  child_items {
                    value {
                      ... on kontent_item_navigation_item {
                        system {
                          id
                        }
                        elements {
                          content_item {
                            value {
                              ... on kontent_item_phase {
                                system {
                                  id
                                  type
                                }
                                elements {
                                  title {
                                    value
                                  }
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
            }
          }
        }
      }
    }
  }
  allKontentItemPhase {
    edges {
      node {
        system {
          id
        }
        elements {
          subphases {
            value {
              ... on kontent_item_phase {
                system {
                  id
                }
                elements {
                  title {
                    value
                  }
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
                `}
                render={data => {
                    const contentItemId = this.props.pageId;
                    const rootNode = data.allKontentItemNavigationItem.edges[0].node;
                    var breadcrumbItems = [
                        <Link to="/" title="Introduction" key="0">Introduction</Link>
                    ];

                    var currentItems = rootNode.elements.child_items.value;
                    var foundFirstLevelItem = this.findItem(currentItems, contentItemId);

                    if (foundFirstLevelItem)
                    {
                        breadcrumbItems.push(this.getLink(foundFirstLevelItem));
                    }
                    else
                    {
                        // find in sublevel
                        for (var i = 0; i < currentItems.length; i++)
                        {
                            var secondLevelCurrentItems = currentItems[i].elements.child_items.value;
                            var foundSecondLevelItem = this.findItem(secondLevelCurrentItems, contentItemId);
                            if (foundSecondLevelItem)
                            {
                                breadcrumbItems.push(this.getLink(currentItems[i]));
                                breadcrumbItems.push(this.getLink(foundSecondLevelItem));

                                break;
                            }
                            else
                            {
                                // check third level if phase
                                var secondLevelCurrentItemsPhase = secondLevelCurrentItems.filter(item => item.elements.content_item && Array.isArray(item.elements.content_item.value) && item.elements.content_item.value.length === 1 && item.elements.content_item.value[0].system.type === 'phase');

                                for (var j = 0; j < secondLevelCurrentItemsPhase.length; j++)
                                {
                                    let phaseId = secondLevelCurrentItems[j].elements.content_item.value[0].system.id
                                    // get phase reference
                                    var phase = data.allKontentItemPhase.edges.filter(edge => edge.node.system.id === phaseId);

                                    // search subphases
                                    var foundSubPhase = phase[0].node.elements.subphases.value.filter(item => item.system.id === contentItemId);

                                    if (foundSubPhase.length === 1)
                                    {
                                        breadcrumbItems.push(this.getLink(currentItems[i]));
                                        breadcrumbItems.push(this.getLink(secondLevelCurrentItems[j]));
                                        breadcrumbItems.push(<Link key={foundSubPhase[0].system.id} to={foundSubPhase[0].elements.url.value} title={foundSubPhase[0].elements.title.value}>{foundSubPhase[0].elements.title.value}</Link>);

                                        break;
                                    }
                                }
                            }
                        }
                    }

                    return (
                        <BreadcrumbsContainer>
                            {breadcrumbItems.map(item => item)}
                        </BreadcrumbsContainer>
                        );
                }}
            />
        )
    }

    findItem(items, contentItemId)
    {
        console.log(items);
        var currentItem = items.filter(navItem =>
          navItem.elements.content_item &&
          Array.isArray(navItem.elements.content_item.value) &&
          navItem.elements.content_item.value.length === 1 &&
          navItem.elements.content_item.value[0].system.id === contentItemId);
        if (currentItem.length === 1)
            return currentItem[0];

        return null;
    }
    getLink(item)
    {
        if (item.elements.content_item.value.length === 1)
        {
            return <Link key={item.system.id} to={"/" + item.elements.content_item.value[0].elements.url.value} title={item.elements.content_item.value[0].elements.title.value}>{item.elements.content_item.value[0].elements.title.value}</Link>
        }
        else
        {
            return <Link key={item.system.id} to="/" title={item.elements.title.value}>{item.elements.title.value}</Link>
        }
    }
}

export default Breadcrumbs