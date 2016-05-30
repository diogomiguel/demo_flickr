
var PHOTO_API_URL = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=demoFlickr.buildFlickr&tags=';

module.exports = {
    load: function (tags) {
        // Load API by appending script to header
        var script = document.createElement('script');
        script.src = PHOTO_API_URL + tags;
        document.head.appendChild(script);
    }
};