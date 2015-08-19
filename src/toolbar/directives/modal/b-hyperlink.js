/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bHyperlink', ['btableService', 'modalService', function (btableService, modalService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
        },
        templateUrl: 'template/modal/hyperlink.html',
        link: function ($scope, $ele, $attr) {
            $scope.hyperlink = null;
            $scope.text = null;

            var $mask = $('<div class="b-modal-box"></div>');
            var hyperlinkTextInput = $("#hyperlinkTextInput", $ele[0]);

            $mask.append($ele);
            $ele[0].ownerDocument.body.appendChild($mask[0]);

            modalService.register('hyperlink', {
                open: function () {
                    $scope.hyperlink = btableService.queryCommandValue('hyperlink');
                    $scope.text = btableService.queryCommandValue('content');
                    $mask.show();
                    hyperlinkTextInput.focus();
                }
            });

            $mask.on('mousedown', function () {
                $mask.hide();
            });

            $ele.on('mousedown', function (evt) {
                evt.stopPropagation();
            });

            $scope.ok = function () {
                $mask.hide();
                btableService.execCommand(['hyperlink', $scope.text || $scope.hyperlink, $scope.hyperlink]);
            };

            $scope.cancel = function () {
                $mask.hide();
            };
        }
    };
}]);