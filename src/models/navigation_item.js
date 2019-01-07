
var KC = require('kentico-cloud-delivery');

module.exports = class NavigationItem extends KC.ContentItem {
        constructor() {
        super({
            propertyResolver: ((fieldName) => {
                if (fieldName === 'content_item') {
                    return 'contentItem';
                }
                if (fieldName === 'child_items') {
                    return 'childItems';
                }
                if (fieldName === 'custom_url') {
                    return 'customUrl';
                }
                return fieldName;
            })
        });
    }
}
