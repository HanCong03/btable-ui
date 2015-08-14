/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bMergeselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            checked: '=?'
        },
        templateUrl: 'template/toolbar/widget/buttonselect.html',
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop();

            $scope.isSelected = !!$scope.checked;
            $scope.isOpen = false;

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.$watch('checked', function (value) {
                $scope.isSelected = !!value;
            });

            $scope.changeModel = function (mode) {
                $scope.isSelected = false;

                hook({
                    mode: mode,
                    value: $scope.isSelected
                });
            };
        }
    };
}]);