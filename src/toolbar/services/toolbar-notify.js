/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('toolbarNotify', [function () {

    return {
        emit: function (type, args) {
            console.log(type)
        }
    };

}]);