
var KC = require('kentico-cloud-delivery');

module.exports = class Phase extends KC.ContentItem {
    constructor() {
        super({
            linkResolver: (link, context) => {
                return '/' + link.urlSlug;
            }
        });
    }
}
