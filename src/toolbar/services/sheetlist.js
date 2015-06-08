/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('sheetlistService', [function () {
    var handler = null;

    return {
        setHandler: function (h) {
            handler = h;
        },

        removeHandler: function () {
            handler = null;
        },

        getHandler: function () {
            return handler;
        }
    };
}]);