/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSubmenu', function () {
    return {
        restrict: 'A',
        link: function ($scope, $ele, attrs) {
            $ele.parent().hover(function () {
                $ele.addClass('b-show');
            }, function () {
                $ele.removeClass('b-show');
            });
        }
    };
});