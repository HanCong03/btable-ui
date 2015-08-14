/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bFontselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            values: '=',
            major: '=',
            minor: '=',
            ismajor: '=',
            isminor: '=',
            selectValue: '=',
            onlyNumber: '=',
            onchange: '&change'
        },
        templateUrl: 'template/toolbar/widget/fontselect.html',
        link: function ($scope, $ele, $attr) {
            var $input = $('.b-input-select-input', $ele);
            var hook = $scope.onchange || angular.noop;

            $scope.isOpen = false;
            $scope.classname = $attr.classname || '';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.update = function (newValue, type) {
                if (type === 'major') {
                    console.log(3)
                } else if (type === 'minor') {
                    console.log(4)
                } else {
                    console.log(5)
                }

                $scope.selectValue = newValue;

                hook({value: newValue, type: type});
            };

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                $scope.update(this.getAttribute('data-value'), this.getAttribute('data-type'));
            });

            $input.on('mousedown', function (e) {
                e.stopPropagation();
            }).on('keydown', function (e) {
                var value = this.value;

                if (e.keyCode !== 13) {
                    return;
                }

                if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                    value = +value;
                } else {
                    value = $scope.selectValue;
                }

                $scope.update(value);
            });
        }
    };
}]);