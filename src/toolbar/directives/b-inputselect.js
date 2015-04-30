/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bInputselect', ['$translate', function ($translate) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            values: '=',
            selectValue: '=',
            onlyNumber: '='
        },
        templateUrl: 'template/toolbar/tabs/start/inputselect.html',
        link: function ($scope, $ele, $attr) {
            var $input = $('.b-input-select-input', $ele);

            $scope.isOpen = false;
            $scope.classname = $attr.classname || '';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.update = function (newValue) {
                $scope.selectValue = newValue;
            };

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                $scope.update(this.getAttribute('data-value'));
            });

            $input.on('keydown', function (e) {
                var value = this.value;

                if (e.keyCode !== 13) {
                    return;
                }

                if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                    $scope.update(+value);
                } else {
                    console.log(this.value)
                    this.value = $scope.selectValue;
                }
            });
        }
    };
}]);