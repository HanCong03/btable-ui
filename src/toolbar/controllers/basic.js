/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ToolbarBasicController', [
    '$scope',
    'toolbarNotify',
    'cellformatModalNotify',
    'btableService',
    'sheetlistService',

    function ($scope, toolbarNotify, cellformatModalNotify, btableService, sheetlistService) {

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
            }
        };
    }
]);