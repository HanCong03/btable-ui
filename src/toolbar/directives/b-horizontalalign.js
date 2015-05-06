/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bHorizontalalign', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&'
        },
        templateUrl: 'template/toolbar/tabs/start/horizontalalign.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;

            $scope.left = "left";
            $scope.center = "center";
            $scope.right = "right";

            var value = $scope.$eval($attr.value);
            $scope.alignValue = angular.isDefined(value) ? value : null;
            $scope.value = $scope.alignValue;

            $scope.alignChange = function (mode) {
                if ($scope.alignValue === mode) {
                    $scope.alignValue = null;
                } else {
                    $scope.alignValue = mode;
                }

                hook({
                    status: $scope.alignValue
                });
            };
        }
    };
}]);