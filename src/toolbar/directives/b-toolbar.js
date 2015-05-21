/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bToolbar', [function () {

    return {
        restrict: 'A',
        scope: {
        },
        link: {
            post: function ($scope, $ele) {
                $ele.on('mousedown', function (evt) {
                    evt.preventDefault();
                });
            }
        }
    };
}]);