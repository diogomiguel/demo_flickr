var aux = require('../modules/aux');

var LOCALSTORAGE_SELECTION_KEY = 'picturesArray';

function getImageData() {
    var imageSavedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_SELECTION_KEY));

    if(imageSavedData === null) {
        imageSavedData = {};
    }

    return imageSavedData;
}

module.exports = {
    appendImageData: function(img) {
        // Get localstorage object and parse into JSON
        var imageSavedData = getImageData();
        var imgKey = img.getAttribute('data-id');

        if (aux.hasClass(img, 'selected')) {
            // Add img 
            imageSavedData[imgKey] = { // Prevent duplicates
                id: imgKey,
                title: img.alt,
                media: {
                    m: img.src
                } 
            };
        } else {
            // Remove img
            if (imageSavedData.hasOwnProperty(imgKey)) {
                delete imageSavedData[imgKey];
            }
        }

        // Save object back to localstorage
        localStorage.setItem(LOCALSTORAGE_SELECTION_KEY, JSON.stringify(imageSavedData));

    },

    getImageData: getImageData
};