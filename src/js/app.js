var api = require('./modules/api');
var gallery = require('./modules/gallery');
var storage = require('./modules/storage');

var savedImageData;
module.exports = (function() {

    function init() {
        savedImageData = storage.getImageData();
        // TODO: Make this dynamic
        api.load('london');

        // Build Saved Image data gallery if images saved
        if (savedImageData && Object.keys(savedImageData).length) {
            gallery.build({
                containerClassname: 'container',
                containerId: 'js-saved-container',
                items: savedImageData,
                onClick: storage.appendImageData,
                setImagesSelected: true,
                title: 'Your Saved Images',
            });
        }

    }

    function buildFlickr(data) {
        // Build Gallery out of Flickrs API latest images
        if (data && data.hasOwnProperty('items')) {
            gallery.build({
                containerClassname: 'container',
                containerId: 'js-flickr-container',
                items: data.items,
                onClick: storage.appendImageData,
                setImagesSelected: savedImageData,
                title: 'Recent Flickr Images'
            });
        }
    }

    return {
        init: init,
        buildFlickr: buildFlickr
    };
})();