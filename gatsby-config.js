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
        'gatsby-plugin-react-helmet',
        // {
        //     resolve: `gatsby-source-kentico-cloud`,
        //     options: {
        //         deliveryClientConfig: {
        //             projectId: 'c1b57fce-743a-0048-c4ee-4f8c42ea3ab8',
        //             typeResolvers: [
        //                 new KC.TypeResolver('navigation-item', () => new navigationItem()),
        //                 new KC.TypeResolver('link', () => new link()),
        //                 new KC.TypeResolver('phase', () => new phase()),
        //                 new KC.TypeResolver('scenario', () => new scenario()),
        //             ],
        //             enablePreviewMode: false,
        //         },
        //         languageCodenames: [
        //           'default',
        //         ],
        //         queryConfig: {
        //           usePreviewMode: true,
        //         }
        //     }
        // },
        {
          resolve: '@kentico/gatsby-source-kontent',
          options: {
            projectId: 'c1b57fce-743a-0048-c4ee-4f8c42ea3ab8', // Fill in your Project ID
            languageCodenames: [
              'default', // Languages in your project (Project settings -> Localization),
            ],
          },
        },
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
              id: "GTM-Q2DT",
              includeInDevelopment: false,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: 'Kentico Advantage',
              short_name: 'Kentico Advantage',
              start_url: '/',
              background_color: '#F05A22',
              theme_color: '#F05A22',
              display: 'minimal-ui',
              icon: 'static/assets/img/apple_touch/favicon-32x32.png', // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-styled-components`,
        {
            resolve: 'gatsby-plugin-offline',
            options: {
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/assets-us-01.kc-usercontent.com\//,
                  handler: 'staleWhileRevalidate',
                  options: {
                    cacheableResponse: {
                      statuses: [0, 200]
                    },
                    cacheName: 'kc-assets-data'
                  }
                },
                {
                  urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                  handler: 'staleWhileRevalidate',
                  options: {
                    cacheableResponse: {
                      statuses: [0, 200]
                    },
                    cacheName: 'google-fonts-stylesheets'
                  }
                },
                {
                  urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                  handler: 'cacheFirst',
                  options: {
                    cacheableResponse: {
                      statuses: [0, 200]
                    },
                    cacheName: 'google-fonts-webfonts',
                    expiration: {
                      maxAgeSeconds: 60 * 60,
                      maxEntries: 30
                    }
                  }
                }
              ]
            }
        },
        'gatsby-plugin-meta-redirect',
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            name: `images`,
            path: `${__dirname}/src/images/`,
          },
        },
        'gatsby-transformer-sharp',
    ],
    pathPrefix: `/docs`
}