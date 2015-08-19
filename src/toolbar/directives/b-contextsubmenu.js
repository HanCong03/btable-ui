/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextsubmenu', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        replace: true,
        scope: {
        },
        link: function ($scope, $ele, $attr) {
            $ele.parent().hover(function () {
                $ele.show();
            }, function () {
                $ele.hide();
            });
        }
    };
}]);