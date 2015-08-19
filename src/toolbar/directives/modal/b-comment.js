/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bComment', ['btableService', 'modalService', function (btableService, modalService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
        },
        templateUrl: 'template/modal/comment.html',
        link: function ($scope, $ele, $attr) {
            $scope.comment = null;

            var $mask = $('<div class="b-modal-box"></div>');
            var commentInput = $("#commentInput", $ele[0]);

            $mask.append($ele);
            $ele[0].ownerDocument.body.appendChild($mask[0]);

            modalService.register('comment', {
                open: function () {
                    $scope.comment = btableService.queryCommandValue('comment');
                    $mask.show();
                    commentInput.focus();
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
                btableService.execCommand(['comment', $scope.comment]);
            };

            $scope.cancel = function () {
                $mask.hide();
            };
        }
    };
}]);