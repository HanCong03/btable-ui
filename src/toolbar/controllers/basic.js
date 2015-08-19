/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ToolbarBasicController', [
    '$scope',
    'toolbarNotify',
    'cellformatModalNotify',
    'btableService',
    '$modal',
    'prompt',

    function ($scope, toolbarNotify, cellformatModalNotify, btableService, $modal, prompt) {
        window.onresize = function () {
            btableService.execCommand(['resize']);
        };

        $scope.isShowGridline = true;
        $scope.isShowHeader = true;
        $scope.hasPane = false;

        btableService.ready(function () {
            btableService.on('error', function (key, msg) {
                $modal.open({
                    animation: false,
                    templateUrl: 'template/widget/error.html',
                    controller: 'ModalController',
                    size: 'sm',
                    resolve: {
                        errorMsg: function () {
                            return msg;
                        }
                    }
                });

                setTimeout(function () {
                    $("#errorModalHiddenInput").focus();
                    $("#errorModalBtn").focus();
                }, 1);
            });

            btableService.on('dataready', function () {
                $scope.isShowGridline = btableService.queryCommandValue('gridline');
                $scope.isShowHeader = btableService.queryCommandValue('header');
                $scope.hasPane = !!btableService.queryCommandValue('pane');
            });
        });

        $scope.closeModal = function () {
            $modalInstance.close();
        };

        $scope.btnState = {
            pasteOpen: false,
            fontfamilyOpen: false,
            fontsizeOpen: false,
            colorOpen: false,
            bgcolorOpen: false,
            mergeOpen: false,
            underlienOpen: false
        };

        var res = {
            valignValue: null,
            alignValue: null,
            merge: false
        };

        var status = {
            bold: false,
            italic: false,
            underline: false,
            throughline: false,

            font: '正文字体(宋体)',
            fontsize: 11,
            color: null,
            fill: null,
            horizontal: null,
            vertical: null,
            wraptext: false
        };

        btableService.onchange(function (btableStatus) {
            status.bold = btableStatus.bold;
            status.italic = btableStatus.italic;
            status.underline = btableStatus.underline;

            status.vertical = btableStatus.vertical;
            status.horizontal = btableStatus.horizontal;
            status.wraptext = btableStatus.wraptext;
            // TODO 对默认值的处理需要优化
            status.font = btableStatus.fontdetail.value;
            status.isMajor = btableStatus.fontdetail.type === 'major';
            status.isMinor = btableStatus.fontdetail.type === 'minor';
            status.fontsize = btableStatus.fontsize;
            status.color = btableStatus.colordetail.value;
            status.fill = btableStatus.filldetail ? btableStatus.filldetail.value : null;
            status.merge = !!btableStatus.mergecell;

            $scope.isShowGridline = btableService.queryCommandValue('gridline');
            $scope.isShowHeader = btableService.queryCommandValue('header');
            $scope.hasPane = !!btableService.queryCommandValue('pane');

            $scope.$apply();
        });

        $scope.status = status;

        $scope.res = res;

        $scope.values = {
            fontsize: 12,
            fontfamily: 'Arial'
        };

        $scope.borderStyle = [
            'none', 'thin', 'dashed', 'dotted'
        ];

        $scope.border = {
            style: 'thin',
            color: '#000000'
        };

        $scope.initValue = {
            major: '宋体',
            minor: '宋体',
            fontfamily: ["Angsana New", "Arial", "Arial Black", "Batang", "Book Antiqua", "Browallia New", "Calibri", "Cambria", "Candara", "Century", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "Courier", "Courier New", "DilleniaUPC", "Dotum", "仿宋", "Garamond", "Georgia", "Gulim", "GungSuh", "楷体", "JasmineUPC", "Malgun Gothic", "Mangal", "Meiryo", "Microsoft JhengHei", "微软雅黑", "MingLiu", "MingLiU_HKSCS", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "PMingliU", "PMingLiU-ExtB", "黑体", "宋体", "宋体-ExtB", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Verdana", "Yu Gothic", "Yu Mincho"],
            fontsize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 36, 48, 72]
        };

        $scope.controlClick = function () {
            $scope.$emit('b-file-click');
        };

        $scope.handler = {
            btnclick: function (evt) {
                var buttonType = evt.delegateTarget.getAttribute('data-name');
                toolbarNotify.emit(buttonType);
            },

            fontSelect: function (val) {
                toolbarNotify.emit('font', val);
            },

            fontsizeSelect: function (val) {
                toolbarNotify.emit('fontsize', val);
            },

            mergechange: function (mode) {
                var command = {
                    'center': 'centermergecell',
                    'across': 'horizontalmergecell',
                    'merge': 'mergecell',
                    'cancel': 'unmergecell'
                };

                toolbarNotify.emit('merge', command[mode]);
            },

            underlineChange: function (mode) {
                toolbarNotify.emit('underline', mode);
            },

            borderStyle: function (index) {
                $scope.border.style = $scope.borderStyle[index];
            },

            borderColor: function (color) {
                $scope.border.color = color;
                $scope.$apply();
            },

            pressChange: function (type, status) {
                toolbarNotify.emit(type);
            },

            valignChange: function (status) {
                toolbarNotify.emit('vertical', status);
            },

            alignChange: function (status) {
                toolbarNotify.emit('horizontal', status);
            },

            colorChange: function (type, color) {
                if (type === 'foreground') {
                    toolbarNotify.emit('color', color);
                } else {
                    toolbarNotify.emit('fill', color);
                }
            },

            borderSelect: function (type) {
                var args = ['setborder'];
                var borderStyle = $scope.border.style;
                var borderColor = $scope.border.color;

                switch (type) {
                    case 'none':
                        args = ['clearborder'];
                        break;

                    case 'top':
                        if (borderStyle === 'none') {
                            args = ['cleartopborder'];
                        } else {
                            args = ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'bottom':
                        if (borderStyle === 'none') {
                            args = ['clearbottomborder'];
                        } else {
                            args = ['bottomborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'left':
                        if (borderStyle === 'none') {
                            args = ['clearleftborder'];
                        } else {
                            args = ['leftborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'right':
                        if (borderStyle === 'none') {
                            args = ['clearrightborder'];
                        } else {
                            args = ['rightborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'outer':
                        if (borderStyle === 'none') {
                            args = ['clearouterborder'];
                        } else {
                            args = ['outerborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'top-bottom':
                        if (borderStyle === 'none') {
                            toolbarNotify.emit('border', ['cleartopborder']);
                            toolbarNotify.emit('border', ['clearbottomborder']);
                        } else {
                            toolbarNotify.emit('border', ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                            toolbarNotify.emit('border', ['bottomborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                        }
                        // 注意，此处直接返回
                        return;

                    case 'top-bottom-medium':
                        if (borderStyle === 'none') {
                            toolbarNotify.emit('border', ['cleartopborder']);
                        } else {
                            toolbarNotify.emit('border', ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                        }

                        toolbarNotify.emit('border', ['bottomborder', {
                            style: 'medium',
                            color: borderColor
                        }]);
                        // 注意，此处直接返回
                        return;

                    case 'outermedium':
                        args = ['outerborder', {
                            style: 'medium',
                            color: borderColor
                        }]
                        break;

                    case 'bottommedium':
                        args = ['bottomborder', {
                            style: 'medium',
                            color: borderColor
                        }]
                        break;

                    case 'all':
                        if (borderStyle === 'none') {
                            args = ['clearborder'];
                        } else {
                            args = ['border', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;
                }

                toolbarNotify.emit('border', args);
            },

            formatSelect: function (code) {
                toolbarNotify.emit('numfmt', code);
            },

            selectCellstyle: function (id, isBuiltin) {
                toolbarNotify.emit('cellstyle', id);
            },

            openCellFormat: function (type) {
                cellformatModalNotify.notify('open', type);
            },

            insertRightCell: function () {
                toolbarNotify.emit('insertleftcell');
            },

            insertBottomCell: function () {
                toolbarNotify.emit('inserttopcell');
            },

            insertRow: function () {
                toolbarNotify.emit('insertrow');
            },

            insertColumn: function () {
                toolbarNotify.emit('insertcolumn');
            },

            insertSheet: function () {
                toolbarNotify.emit('insertsheet');
            },

            setRowHeight: function () {
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
                        toolbarNotify.emit('rawrowheight', +result);
                    } else {
                        alert('高度必须在0到409之间');
                    }
                });
            },

            setColumnWidth: function () {
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
                        toolbarNotify.emit('rawcolumnwidth', +result);
                    } else {
                        alert('宽度必须在0到255之间');
                        return false;
                    }
                });
            },

            setBestfitRowHeight: function () {
                toolbarNotify.emit('bestfitrowheight');
            },

            setBestfitColumnWidth: function () {
                toolbarNotify.emit('bestfitcolumnwidth');
            },

            setDefaultColumnWidth: function () {
                var width = btableService.queryCommandValue('rawdefaultcolumnwidth');

                if (width === undefined) {
                    width = btableService.queryCommandValue('rawstandardwidth');
                }

                prompt({
                    "title": "标准列宽",
                    "message": "宽度必须在0到255之间",
                    "input": true,
                    "label": "标准列宽",
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
                        toolbarNotify.emit('rawdefaultcolumnwidth', +result);
                    } else {
                        alert('宽度必须在0到255之间');
                        return false;
                    }
                });
            },

            hideRow: function () {
                toolbarNotify.emit('hiderow');
            },

            hideColumn: function () {
                toolbarNotify.emit('hidecolumn');
            },

            showRow: function () {
                toolbarNotify.emit('showrow');
            },

            showColumn: function () {
                toolbarNotify.emit('showcolumn');
            },

            namechange: function () {
                console.log('namechange')
            },

            toggleHeader: function () {
                toolbarNotify.emit('header');
            },

            toggleGridline: function () {
                toolbarNotify.emit('gridline');
            },

            frozen: function () {
                toolbarNotify.emit('frozen');
            },

            frozenRow: function () {
                toolbarNotify.emit('frozenfirstrow');
            },

            frozenColumn: function () {
                toolbarNotify.emit('frozenfirstcolumn');
            },

            cancelFrozen: function () {
                toolbarNotify.emit('cancelfrozen');
            }
        };
    }
]);