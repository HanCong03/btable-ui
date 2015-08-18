/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('btable', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'template/widget/btable.html',
        link: function ($scope, $ele) {
            var btable = btableService.createBtable($ele.find('.btable-container')[0]);
            $("#btableOuterInput").on("mousedown", function (evt) {
                evt.stopPropagation();
            });

            btable.execCommand('bindinput', $("#btableOuterInput")[0]);
            btable.execCommand('init');
        }
    };
}]);