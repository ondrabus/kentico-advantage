require(`@babel/polyfill`);
const _ = require(`lodash`);
const deliveryClient = require(`kentico-cloud-delivery`);
const normalize = require(`./normalize`);
const {parse, stringify} = require(`flatted/cjs`);
const defaultLanguageLiteral = `default`;
//const navigation = require(`../../src/helpers/navigation`)

exports.sourceNodes =
  async ({actions, createNodeId},
    {deliveryClientConfig, languageCodenames}) => {
    console.info(`The 'sourceNodes' API implementation starts.
projectId: ${deliveryClientConfig.projectId},
typeResolvers: ${deliveryClientConfig.typeResolvers.length}
languageCodenames: ${languageCodenames}.`);

    const {createNode} = actions;
    const client = new deliveryClient.DeliveryClient(deliveryClientConfig);
    //global.DeliveryClient = client;
    //global.AdvantageNavigation = await navigation();
    
    const contentTypesResponse = await client.types().getPromise();
    const typesFlatted = parse(stringify(contentTypesResponse.types));

    const contentTypeNodes = typesFlatted.map(
        (contentType) => {
          try {
            return normalize.createContentTypeNode(createNodeId, contentType);
          } catch (error) {
            console.error(error);
          }
        }
    );

    const contentItemsResponse = await client.items().getPromise();
    
    // resolve rich text elements
    contentItemsResponse.items.forEach((item) => {
      // go over each element of item and see if it is rich_text
      // if it is, resolve into new property with suffix _html
      Object
        .keys(item)
        .filter((key) => _.has(item[key], `type`) && item[key].type === `rich_text`)
        .forEach((key) => {
          item.elements[key].resolvedHtml = item[key].getHtml();
        });
    });

    const itemsFlatted = parse(stringify(contentItemsResponse.items));
    
    let defaultLanguageCodename = defaultLanguageLiteral;

    if (_.has(contentItemsResponse, `items[0].system.language`)
        && _.isString(contentItemsResponse.items[0].system.language)) {
      defaultLanguageCodename = contentItemsResponse.items[0].system.language;
    }

    let contentItemNodes = itemsFlatted.map(
        (contentItem) => {
          try {
            return normalize.createContentItemNode(
                createNodeId, contentItem, contentTypeNodes
            );
          } catch (error) {
            console.error(error);
          }
        }
    );
    

    let nonDefaultLanguagePromises = languageCodenames
        .filter((languageCodename) =>
          languageCodename !== defaultLanguageCodename
        )
        .map((languageCodename) =>
          client.items().languageParameter(languageCodename).getPromise()
        );

    const languageResponses = await Promise.all(nonDefaultLanguagePromises);
    let nonDefaultLanguageItemNodes = new Map();

    languageResponses.forEach((languageResponse) => {
      const languageItemsFlatted = parse(stringify(languageResponse.items));
      let allNodesOfCurrentLanguage = [];
      let languageCodename;

    
      contentItemNodes.forEach((contentItemNode) => {
        const languageVariantItem = languageItemsFlatted.find((variant) => {
          return contentItemNode.system.codename === variant.system.codename
            && contentItemNode.system.type === variant.system.type;
        });

        if (languageVariantItem
          && _.has(languageVariantItem, `system.language`)
          && _.isString(languageVariantItem.system.language)) {
          languageCodename = languageVariantItem.system.language;
          let languageVariantNode;

          try {
            languageVariantNode =
              normalize.createContentItemNode(
                  createNodeId, languageVariantItem, contentTypeNodes
              );
          } catch (error) {
            console.error(error);
          }

          if (languageVariantNode) {
            try {
              normalize.decorateItemNodeWithLanguageVariantLink(
                  languageVariantNode, contentItemNodes
              );
            } catch (error) {
              console.error(error);
            }

            allNodesOfCurrentLanguage.push(languageVariantNode);
          }
        }
      });

      if (languageCodename && _.isString(languageCodename)) {
        nonDefaultLanguageItemNodes.set(
            languageCodename, allNodesOfCurrentLanguage
        );
      }
    });

    for (let [languageCodename, currentLanguageNodes]
      of nonDefaultLanguageItemNodes) {
      contentItemNodes.forEach((contentItemNode) => {
        try {
          normalize.decorateItemNodeWithLanguageVariantLink(
              contentItemNode, currentLanguageNodes
          );
        } catch (error) {
          console.error(error);
        }
      });

      for (let [otherLanguageCodename, otherLanguageNodes]
        of nonDefaultLanguageItemNodes) {
        if (otherLanguageCodename !== languageCodename) {
          currentLanguageNodes.forEach((contentItemNode) => {
            try {
              normalize.decorateItemNodeWithLanguageVariantLink(
                  contentItemNode, otherLanguageNodes
              );

              normalize.decorateItemNodeWithLanguageVariantLink(
                  contentItemNode, contentItemNodes
              );
            } catch (error) {
              console.error(error);
            }
          });
        }
      }

      try {
        normalize.decorateTypeNodesWithItemLinks(
            currentLanguageNodes, contentTypeNodes
        );
      } catch (error) {
        console.error(error);
      }
    }

    try {
      normalize.decorateTypeNodesWithItemLinks(
          contentItemNodes, contentTypeNodes
      );
    } catch (error) {
      console.error(error);
    }

    contentItemNodes.forEach((itemNode) => {
      try {
        normalize.decorateItemNodeWithLinkedItemsLinks(
            itemNode, contentItemNodes
        );
      } catch (error) {
        console.error(error);
      }
    });

    nonDefaultLanguageItemNodes.forEach((languageNodes) => {
      languageNodes.forEach((itemNode) => {
        try {
          normalize.decorateItemNodeWithLinkedItemsLinks(
              itemNode, languageNodes
          );
        } catch (error) {
          console.error(error);
        }
      });
    });

    contentItemNodes.forEach((itemNode) => {
      try {
        normalize.decorateItemNodeWithRichTextLinkedItemsLinks(
            itemNode, contentItemNodes);
      } catch (error) {
        console.error(error);
      }
    });

    nonDefaultLanguageItemNodes.forEach((languageNodes) => {
      languageNodes.forEach((itemNode) => {
        try {
          normalize.decorateItemNodeWithRichTextLinkedItemsLinks(
              itemNode, languageNodes
          );
        } catch (error) {
          console.error(error);
        }
      });
    });

    try {
      contentTypeNodes.forEach(
          (contentTypeNode) => {
            console.info(
                `The 'createNode' API is called.
contentTypeNode.id: ${contentTypeNode.id}`
            );

            createNode(contentTypeNode);
          }
      );
    } catch (error) {
      console.error(
          `Error when creating content type nodes. Details: ${error}`
      );
    }

    console.info(`The 'createNode' API is called for content item nodes.`);
    try {
      contentItemNodes.forEach(
          (contentItemNode) => {
            if (contentItemNode.elements.title.value==='Gathering')
            {
            console.log(contentItemNode);
            }
            console.info(
                `The 'createNode' API is called.
contentItemNode.id: ${contentItemNode.id}`
            );

            createNode(contentItemNode);
          }
      );
    } catch (error) {
      console.error(
          `Error when creating content item nodes. Details: ${error}`
      );
    }

    nonDefaultLanguageItemNodes.forEach((languageNodes) => {
      languageNodes.forEach((languageVariantNode) => {
        try {
          createNode(languageVariantNode);

          console.info(
              `The 'createNode' API is called.
languageVariantNode.id: ${languageVariantNode.id}`
          );
        } catch (error) {
          console.error(
              `Error when creating language variant nodes. Details: ${error}`
          );
        }
      });
    });

    console.info(`The 'sourceNodes' API implementation exits.`);
    return;
  };
