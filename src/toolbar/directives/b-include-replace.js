/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bIncludeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});