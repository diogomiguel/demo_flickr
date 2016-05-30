var Conf = {
    elemImageClassname: 'flickr-pic', // class name for the returned images
    elemWrapperClassname: 'col col-xs-6 col-sm-4 col-md-3 col-lg-2', // class name for images wrappers
    rowClassname: 'row', // class name for image wrappers rows
    rowMaxOffset: 12, // start a new row after this amount of elements
    selectedClassname: 'selected',
    wrapperId: 'js-container' // id of wrapper to place returned images
};

var _ = require('lodash');
var aux = require('../modules/aux');

// Bind event handlers
function setHandlers(container, onClick) {

    var bindClick = function(e) {
        var el = e.target;

        // Detect click on children images
        if (el && aux.hasClass(el, Conf.elemImageClassname)) {
            aux.toggleClass(el, Conf.selectedClassname);
            // Run default callback
            if (onClick && typeof onClick === 'function') {
                onClick.call(e, el);
            }
        }
    };

    // Add Event to gallery container
    aux.addEventListener(container, 'click', bindClick);
}

module.exports = {
    
    /*
     * args.title (Container title)
     * args.containerClassname (Container class name)
     * args.items (Images array)
     * args.emptyText (If no images found message.)
     * args.setImagesSelected (Object: match against object keys or Boolean: false is default)
     * args.onClick (Picture onClick handler function)
     */
    build: function(args) { 
        var curRow;
        var len;

        var parentWrapper = document.getElementById(Conf.wrapperId);
        var galleryContainer;
        var titleH2;
        var noTextP;
        var isImageSelected;


        // Check images selected logic
        if (args.setImagesSelected && typeof args.setImagesSelected === 'object') {
            isImageSelected = function(key) {
                // Check whether src is a key
                return args.setImagesSelected.hasOwnProperty(key);
            };
        } else {
            isImageSelected = function() {
                return args.setImagesSelected ? args.setImagesSelected : false;
            };
        }

        var n = 0;

        // Create gallery container
        galleryContainer = document.createElement('div');
        galleryContainer.className = args.containerClassname || 'container';

        if (args.title) {
            titleH2 = document.createElement('h2');
            titleH2.appendChild(document.createTextNode(args.title));
            galleryContainer.appendChild(titleH2);
        }

        len = Object.keys(args.items).length;

        // No images
        if (len === 0 && args.emptyText) {
            noTextP = document.createElement('p');
            noTextP.appendChild(document.createTextNode(args.emptyText));
            galleryContainer.appendChild(noTextP);
        } else {
            // On images click
            setHandlers(galleryContainer, args.onClick);
        }

        // Loop through returned json and display data as pictures.
        _.forEach(args.items, function(elem) {
            var div, img, imgId;

            // index is 0 or multiple of rowMaxOffset. Construct a new inner row
            if (n % Conf.rowMaxOffset === 0) {
                curRow = document.createElement('div');
                curRow.className = Conf.rowClassname;
            }

            // Form DOM elements
            div = document.createElement('div');
            img = document.createElement('img');

            div.className = Conf.elemWrapperClassname;
            img.src = elem.media.m;

            imgId = aux.getImageIdFromPath(img.src);
            img.setAttribute('data-id', imgId);
            
            img.alt = img.title = elem.title;
            img.className = Conf.elemImageClassname;

            if (isImageSelected(imgId)) {
                img.className = img.className + " " + Conf.selectedClassname;
            }

            // Append image DOM element
            div.appendChild(img);
            // Append image to ccurrent row
            curRow.appendChild(div);

            // If last element or right before reaching defined rowMaxOffset, append the current row element to DOM
            if (len - 1 === n || (n + 1) % Conf.rowMaxOffset === 0) {

                galleryContainer.appendChild(curRow);
            }

            n++;

        });

        parentWrapper.appendChild(galleryContainer);
    }
};