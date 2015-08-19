/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('modalService', [function () {
    var instace = {};

    return {
        open: function (name, cb) {
            instace[name].open(cb);
        },

        register: function (name, handler) {
            instace[name] = handler;
        }
    };
}]);