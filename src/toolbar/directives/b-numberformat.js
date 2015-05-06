/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bNumberformat', ['$translate', function ($translate) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onselect: '&'
        },
        templateUrl: 'template/toolbar/tabs/start/numberformat.html',
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onselect || angular.noop;

            var types = [
                "general",
                "number",
                "currency",
                "shortdate",
                "longdate",
                "time",
                "percentage",
                "scientific",
                "text"
            ];

            $scope.types = types;

            $scope.select = function (index) {
                hook({
                    type: types[index]
                });
            };
        }
    };
}]);