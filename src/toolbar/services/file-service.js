/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('fileService', [function () {
    var openCbs = [];
    var closeCbs = [];
    var changeCb = function () {};

    return {
        onopen: function (cb) {
            openCbs.push(cb);
        },

        onclose: function (cb) {
            closeCbs.push(cb);
        },

        setFileTemplate: function (url) {
            changeCb(url);
        },

        onTemplateChange: function (cb) {
            changeCb = cb;
        },

        notify: function (type) {
            if (type === 'open') {
                for (var i = 0, len = openCbs.length; i < len; i++) {
                    openCbs[i]();
                }
            } else {
                for (var i = 0, len = openCbs.length; i < len; i++) {
                    closeCbs[i]();
                }
            }
        }
    };
}]);