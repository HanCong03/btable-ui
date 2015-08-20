/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextmenu', ['btableService', 'modalService', 'cellformatModalNotify', function (btableService, modalService, cellformatModalNotify) {

    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'template/toolbar/widget/contextmenu.html',
        link: function ($scope, $ele, $attr) {
            $scope.type = 'cell';
            $scope.hasHyperlink = false;
            $scope.hasComment = false;

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
                $scope.hasHyperlink = !!btableService.queryCommandValue('containhyperlink');
                $scope.focusHasHyperlink = !!btableService.queryCommandValue('hyperlink');
                $scope.hasComment = !!btableService.queryCommandValue('containcomment');
                $scope.focusHasComment = !!btableService.queryCommandValue('comment');

                $scope.$apply();

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
                    close();
                    modalService.open('comment');
                },

                removeComment: function () {
                    close();
                    btableService.execCommand(['clearcomment']);
                },

                insertHyperlink: function () {
                    close();
                    modalService.open('hyperlink');
                },

                removeHyperlink: function () {
                    close();
                    btableService.execCommand(['clearhyperlink']);
                },

                cellformat: function () {
                    close();
                    cellformatModalNotify.notify('open', 'fonts');
                },

                clearContent: function () {
                    close();
                    btableService.execCommand(['clearcontent']);
                },

                insertRight: function () {
                    close();
                    btableService.execCommand(['insertleftcell']);
                },

                insertBottom: function () {
                    close();
                    btableService.execCommand(['inserttopcell']);
                },

                insertRow: function () {
                    close();
                    btableService.execCommand(['insertrow']);
                },

                insertColumn: function () {
                    close();
                    btableService.execCommand(['insertcolumn']);
                }
            };
        }
    };
}]);