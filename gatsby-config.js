var KC = require('kentico-cloud-delivery');
var phase = require('./src/models/phase')
var navigationItem = require('./src/models/navigation_item')
var link = require('./src/models/link')
var scenario = require('./src/models/scenario')

module.exports = {
    siteMetadata: {
        title: `Kentico Advantage`
    },
    plugins: [
        {
            resolve: `gatsby-source-kentico-cloud`,
            options: {
                deliveryClientConfig: {
                    projectId: 'c1b57fce-743a-0048-c4ee-4f8c42ea3ab8',
                    typeResolvers: [
                        new KC.TypeResolver('navigation-item', () => new navigationItem()),
                        new KC.TypeResolver('link', () => new link()),
                        new KC.TypeResolver('phase', () => new phase()),
                        new KC.TypeResolver('scenario', () => new scenario()),
                    ],
                    enablePreviewMode: false,
                },
				languageCodenames: [
					'default',
				],
				queryConfig: {
					usePreviewMode: true,
				}
            }
        },
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
              id: "GTM-NRNTQFM",
              includeInDevelopment: false,
            },
          },
    ],
    pathPrefix: `/docs`
}