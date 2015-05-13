/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bHorizontalalign', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            value: '@?'
        },
        templateUrl: 'template/toolbar/widget/horizontalalign.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;

            $scope.left = "left";
            $scope.center = "center";
            $scope.right = "right";
            $scope.__initValue = null;

            $scope.$watch('value', function (newValue) {
                $scope.__initValue = newValue;
            });

            $scope.alignChange = function (mode) {
                if ($scope.__initValue === mode) {
                    $scope.__initValue = null;
                } else {
                    $scope.__initValue = mode;
                }

                hook({
                    status: $scope.__initValue
                });
            };
        }
    };
}]);