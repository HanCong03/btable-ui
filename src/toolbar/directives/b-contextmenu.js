/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextmenu', ['btableService', 'modalService', function (btableService, modalService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'template/toolbar/widget/contextmenu.html',
        link: function ($scope, $ele, $attr) {
            $scope.type = 'cell';
            var $contextment = $(".b-contextmenu", $ele);

            btableService.on('contextmenu', function (type, location) {
                $scope.type = type;

                $contextment.css({
                    top: location.clientY,
                    left: location.clientX
                });

                open();

                $scope.$apply();
            });

            $ele.on('mousedown', function () {
                close();
            }).on('keydown', function (evt) {
                // esc
                if (evt.keyCode === 27) {
                    close();
                }
            });

            function open() {
                $ele.show().focus();
            }

            function close() {
                $ele.hide();
            }

            $contextment.on('mousedown keydown', function (evt) {
                evt.stopPropagation();
            });


            $scope.handler = {
                insertComment: function () {
                    modalService.open('comment');
                    close();
                },

                insertHyperlink: function () {
                    modalService.open('hyperlink');
                    close();
                }
            };
        }
    };
}]);