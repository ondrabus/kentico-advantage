
var KC = require('kentico-cloud-delivery');

module.exports = class Phase extends KC.ContentItem {
    constructor() {
        super({
            richTextResolver: (item, context) => {
                var output = `<h2><a href="/${item.elements.url.value}">${item.elements.title.value}</a></h2>`;
                if (item.overview.value !== '<p><br></p>')
                {
                    output+= item.overview.value;
                }
                return output;
            },
            linkResolver: (link, context) => {
                return '/' + link.urlSlug;
            }
        });
    }
}
