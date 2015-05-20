/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('btable', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        scope: {
            onchange: '&oncolorchange',
            ngModel: '='
        },
        link: function ($scope, $ele, $attr, $controller) {
            var btable = btableService.createBtable($ele[0]);
            btable.execCommand('init');
        }
    };
}]);