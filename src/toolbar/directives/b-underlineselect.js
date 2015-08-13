/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bUnderlineselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            checked: '=?'
        },
        templateUrl: 'template/toolbar/widget/underlineselect.html',
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop();

            $scope.isSelected = !!$scope.checked;
            $scope.isOpen = false;
            $scope.current = 'single';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.$watch('checked', function (value) {
                $scope.isSelected = !!value;
            });

            $scope.changeModel = function (mode) {
                switch (mode) {
                    case 'single':
                        $scope.current = 'single';
                        break;

                    case 'double':
                        $scope.current = 'double';
                        break;
                }

                hook({
                    mode: mode
                });
            };
        }
    };
}]);