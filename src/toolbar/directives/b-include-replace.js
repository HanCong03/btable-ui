/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bIncludeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function ($scope, $ele) {
            $ele.replaceWith($ele.children());
        }
    };
});