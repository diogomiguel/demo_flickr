// Mostly for cross browser compatibility
module.exports = {
    addEventListener: function(el, eventname, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventname, handler);
        } else {
            el.attachEvent('on' + eventname, function(){
                handler.call(el);
            });
        }
    },
    // Get Flickr Image Id from it's src.
    getImageIdFromPath: function(path) {
        var pathArr = path.split('/');
        var imageName = pathArr[pathArr.length - 1];
        var indexOfUnderscore = imageName.indexOf('_');
                
        if (indexOfUnderscore >= 0) {
            return imageName.substr(0, indexOfUnderscore);
        } else {
            return imageName;
        }
    },
    hasClass: function(el, classname) {
        if (el.classList) {
            return el.classList.contains(classname);
        } else {
            return new RegExp('(^| )' + classname + '( |$)', 'gi').test(el.className);
        }
    },
    toggleClass: function(el, classname) {
        if (el.classList) {
            el.classList.toggle(classname);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = -1;
            for (var i = classes.length; i--;) {
                if (classes[i] === classname) {
                    existingIndex = i;
                }
            }

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(classname);
            }

            el.className = classes.join(' ');
        }
    }
};