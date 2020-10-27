const path = require('path')

exports.createPages = ({graphql, actions}) => {
    const { createPage, createRedirect } = actions

    createRedirect({ fromPath: '/gathering/functional-requirements', toPath: '/gathering-functional-requirements' });
    createRedirect({ fromPath: '/gathering/environment-requirements', toPath: '/gathering-environment-requirements' });
    createRedirect({ fromPath: '/developing/developing-in-a-team', toPath: '/developing-developing-in-a-team' });
    createRedirect({ fromPath: '/developing/implementing-best-practices', toPath: '/developing-implementing-best-practices' });
    createRedirect({ fromPath: '/planning/mapping-requirements', toPath: '/planning-mapping-requirements' });
    createRedirect({ fromPath: '/planning/picking-a-project-type-and-development-model', toPath: '/planning-picking-a-project-type-and-development-model' });
    createRedirect({ fromPath: '/planning/planning-content-management', toPath: '/planning-planning-content-management' });
    createRedirect({ fromPath: '/planning/identifying-data-structures', toPath: '/planning-identifying-data-structures' });

    return new Promise((resolve, reject) => {
        graphql(`{
            allKontentItemPhase
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
            allKontentItemPage
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

            result.data.allKontentItemPhase.edges.forEach(edge => {
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

            result.data.allKontentItemPage.edges.forEach(edge => {
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
