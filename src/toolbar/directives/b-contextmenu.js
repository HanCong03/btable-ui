/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextmenu', [
    'btableService',
    'modalService',
    'cellformatModalNotify',
    'prompt',

    function (btableService, modalService, cellformatModalNotify, prompt) {

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
                },

                setColumnWidth: function () {
                    close();
                    var width = btableService.queryCommandValue('rawcolumnwidth');

                    if (width === undefined) {
                        width = btableService.queryCommandValue('rawstandardwidth');
                    }

                    prompt({
                        "title": "列宽",
                        "message": "宽度必须在0到255之间",
                        "input": true,
                        "label": "列宽",
                        "value": width,
                        "buttons": [{
                            label: "取消",
                            cancel: true
                        }, {
                            label: "确定",
                            primary: true
                        }]
                    }).then(function(result){
                        if ($.isNumeric(result) && result >= 0 && result <= 255) {
                            btableService.execCommand(['rawcolumnwidth', +result]);
                        } else {
                            alert('宽度必须在0到255之间');
                            return false;
                        }
                    });
                },

                hideColumn: function () {
                    close();
                    btableService.execCommand(['hidecolumn']);
                },

                showColumn: function () {
                    close();
                    btableService.execCommand(['showcolumn']);
                },

                setRowHeight: function () {
                    close();
                    var height = btableService.queryCommandValue('rawrowheight');

                    if (height === undefined) {
                        height = btableService.queryCommandValue('rawstandardheight');
                    }

                    prompt({
                        "title": "行高",
                        "message": "高度必须在0到409之间",
                        "input": true,
                        "label": "行高",
                        "value": height,
                        "buttons": [{
                            label: "取消",
                            cancel: true
                        }, {
                            label: "确定",
                            primary: true
                        }]
                    }).then(function(result){
                        if ($.isNumeric(result) && result >= 0 && result <= 409) {
                            btableService.execCommand(['rawrowheight', +result]);
                        } else {
                            alert('高度必须在0到409之间');
                        }
                    });
                },

                hideRow: function () {
                    close();
                    btableService.execCommand(['hiderow']);
                },

                showRow: function () {
                    close();
                    btableService.execCommand(['showrow']);
                }
            };
        }
    };
}]);