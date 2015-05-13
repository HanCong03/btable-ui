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
            type: '@buttontype',
            pressed: '=?'
        },
        templateUrl: 'template/toolbar/widget/pressbutton.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;
            $scope.isPressed = !!$scope.pressed;

            $scope.toggle = function () {
                $scope.isPressed = !$scope.isPressed;
                hook({
                    status: $scope.isPressed
                });
            };
        }
    };
}]);