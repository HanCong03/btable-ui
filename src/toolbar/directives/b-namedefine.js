/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bNamedefine', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&change'
        },
        templateUrl: 'template/toolbar/widget/namedefine.html',
        link: function ($scope, $ele, $attr) {
            var inputNode = $('.b-input-select-input', $ele)[0];
            var hook = $scope.onchange || angular.noop;

            updateName();
            reset();

            btableService.on('namedefinechange', function () {
                updateName();
                $scope.$apply();
            });

            btableService.on('rangechange', function () {
                reset();
            });

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                //$scope.update(this.getAttribute('data-value'));
                console.log('select')
            });

            $(inputNode).on('mousedown', function (e) {
                e.stopPropagation();
            }).on('keydown', function (e) {
                e.stopPropagation();
                var value = this.value;
                //
                console.log(3)
                //if (e.keyCode !== 13) {
                //    return;
                //}
                //
                //if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                //    value = +value;
                //} else {
                //    value = $scope.selectValue;
                //}
                //
                //$scope.update(value);
            });

            function updateName() {
                var names = btableService.queryCommandValue('names');
                var result = [];

                for (var key in names) {
                    if (!names.hasOwnProperty(key)) {
                        continue;
                    }

                    result.push(key);
                }

                $scope.names = result;
            }

            function reset() {
                var range = btableService.queryCommandValue('range');
                var rowTitle = range.entry.row + 1;
                var columnTitle = btableService.queryCommandValue('columntitle', range.entry.col);
                inputNode.value = columnTitle + rowTitle;
            }
        }
    };
}]);