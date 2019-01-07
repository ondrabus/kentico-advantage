const path = require('path')

exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        graphql(`{
            allKenticoCloudItemPhase
            {
              edges{
                node{
                  system{
                    id
                  }
                  elements{
                    url{
                      value
                    }
                  }
                }
              }
            }
            allKenticoCloudItemPage
            {
              edges{
                node{
                  system{
                    id
                  }
                  elements{
                    url{
                      value
                    }
                  }
                }
              }
            }
          }
            `
        ).then(result => {
            if (result.errors){
                reject(result.errors);
            }

            result.data.allKenticoCloudItemPhase.edges.forEach(edge => {
                if (edge.node.system.id !== '8152a11a-0dc1-4dc2-a0f1-652b933c8f42')
                {
                    createPage({
                        path: edge.node.elements.url.value,
                        component: path.resolve(`src/templates/phase.js`),
                        context: {
                            id: edge.node.system.id,
                        },
                    });
                }
            });

            result.data.allKenticoCloudItemPage.edges.forEach(edge => {
                createPage({
                    path: edge.node.elements.url.value,
                    component: path.resolve(`src/templates/page.js`),
                    context: {
                        id: edge.node.system.id
                    }
                })
            })

            resolve()
        })
    })
}