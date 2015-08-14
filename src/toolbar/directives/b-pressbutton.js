/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bPressbutton', [function () {

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
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop;
            $scope.isPressed = !!$scope.pressed;

            $scope.toggle = function () {
                $scope.isPressed = false;
                hook({
                    status: $scope.isPressed
                });
            };
        }
    };
}]);