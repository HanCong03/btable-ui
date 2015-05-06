/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bMergeselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&'
        },
        templateUrl: 'template/toolbar/tabs/start/buttonselect.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop();

            $scope.isSelected = !!$attr.merge;
            $scope.isOpen = false;

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.changeModel = function (mode) {
                switch (mode) {
                    case 'center':
                        $scope.isSelected = !$scope.isSelected;
                        break;

                    case 'merge':
                        $scope.isSelected = true;
                        break;

                    case 'across':
                        $scope.isSelected = true;
                        break;

                    case 'cancel':
                        $scope.isSelected = false;
                        break;
                }

                hook({
                    mode: mode,
                    value: $scope.isSelected
                });
            };
        }
    };
}]);