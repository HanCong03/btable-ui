/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bPressbutton', ['$parse', function ($parse) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            text: '@text',
            type: '@buttontype'
        },
        templateUrl: 'template/toolbar/tabs/start/pressbutton.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;

            var pressed = $scope.$eval($attr.pressed);
            $scope.isPressed = angular.isDefined(pressed) ? pressed : false;
            $scope.status = $scope.isPressed;

            $scope.toggle = function () {
                $scope.isPressed = !$scope.isPressed;
                hook({
                    status: $scope.isPressed
                });
            };
        }
    };
}]);