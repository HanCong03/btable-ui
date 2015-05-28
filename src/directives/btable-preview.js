/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('btablePreview', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'template/widget/btable-preview.html',
        link: function ($scope, $ele) {
            var btable = btableService.createBtable($ele.find('.btable-container')[0]);
            $("#btableOuterInput").on("mousedown", function (evt) {
                evt.stopPropagation();
            });

            btable.execCommand('init');
            btable.execCommand('readonly', true);
        }
    };
}]);