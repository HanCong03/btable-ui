/**
 * @file modal通信控制器
 * @author hancong03@baiud.com
 */

(function () {
    angular.module('app').controller('CellForamtModalController', [
        '$scope',
        'cellformatModalNotify',
        'numberformat',
        '$filter',
        'NUMBER_FORMAT',
        'FONT_LIST',
        'FONT_STYLE',
        'FONT_SIZE',
        'HORIZONTAL_ALIGNMENT',
        'VERTICAL_ALIGNMENT',
        'CURRENCY',
        'BORDERS',
        'btableNotify',

        function ($scope,
                  cellformatModalNotify,
                  numberformat,
                  $filter,
                  NUMBER_FORMAT,
                  FONT_LIST,
                  FONT_STYLE,
                  FONT_SIZE,
                  HORIZONTAL_ALIGNMENT,
                  VERTICAL_ALIGNMENT,
                  CURRENCY,
                  BORDERS,
                  btableNotify) {

            var numberformatTypes = ['normal', 'number', 'currency', 'accountant', 'date', 'time', 'percentage', 'fraction', 'scientific', 'text'];
            var tabs = ['numberformat', 'alignment', 'font', 'border', 'fill'];

            /* --- 初始化索引，用于从btable的状态反查UI索引 start --- */
            var INDEX_MAP = initIndexMap({
                hAlign: HORIZONTAL_ALIGNMENT,
                vAlign: VERTICAL_ALIGNMENT
            });
            /* --- 初始化索引，用于从btable的状态反查UI索引 end --- */

            var underline = [{
                text: '无',
                value: 'none'
            }, {
                text: '单下划线',
                value: 'single'
            }];

            var _defaultStatus = {
                // code选中索引
                code: {
                    number: 3,
                    currency: 3,
                    date: 0,
                    time: 0,
                    fraction: 0
                },

                // 默认精度
                precision: 2,
                // 千分位符开启状态
                thousandth: false,
                // 货币符号
                currency: 2,

                // 水平对齐
                hAlign: 0,
                // 垂直对齐
                vAlign: 1,
                // 自动换行
                wraptext: false,
                // 单元格禁用
                merge: false,

                // 默认字体: value
                font: FONT_LIST[0],
                // 默认字形: index
                fontstyle: 0,
                // 字号: value
                fontsize: 13,
                // 字体颜色
                color: null,
                // 下划线
                underline: 0,
                // 贯穿线
                throughline: false,

                // border type
                borderType: 0,
                // border color
                borderColor: null,
                // 边框应用记录
                borders: {
                    left: null,
                    center: null,
                    right: null,
                    top: null,
                    middle: null,
                    bottom: null
                },

                // fill color
                fillColor: null
            };

            // btable 当前状态
            var btableStatus = null;
            // 当前的未发生改变的状态快照
            var statusSnapshot;

            btableNotify.on(function (status) {
                btableStatus = status;
            });

            /* filter */
            var numberFormatFilter = $filter('bNumberformatNumber');
            var currencyFormatFilter = $filter('bNumberformatCurrency');

            /* ---------- scope 挂载 ---------- */
            var _status = {
                tabSelected: [true],

                formatSelected: [true],

                // 格式code信息
                format: {
                    date: NUMBER_FORMAT.date,
                    time: NUMBER_FORMAT.time,
                    fraction: NUMBER_FORMAT.fraction,
                    number: numberFormatFilter(NUMBER_FORMAT.number, _defaultStatus.precision, !!_defaultStatus.thousandth),
                    currency: currencyFormatFilter(NUMBER_FORMAT.currency, _defaultStatus.precision, CURRENCY[_defaultStatus.currency].value)
                },

                // 各种类别的默认选中索引
                _default: _defaultStatus
            };

            var status = $.extend(true, {}, _status);

            $scope.status = status;

            $scope.horizontalAlign = HORIZONTAL_ALIGNMENT;
            $scope.verticalAlign = VERTICAL_ALIGNMENT;
            $scope.fontStyle = FONT_STYLE;
            $scope.fontSize = FONT_SIZE;
            $scope.underline = underline;
            $scope.borderStyle = BORDERS;
            $scope.fonts = FONT_LIST;
            $scope.currencyList = CURRENCY;

            $scope.$watchGroup(['status._default.precision', 'status._default.thousandth'], function () {
                $scope.status.format.number = numberFormatFilter(NUMBER_FORMAT.number, status._default.precision, !!status._default.thousandth);
            });

            $scope.$watchGroup(['status._default.precision', 'status._default.currency'], function () {
                $scope.status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, status._default.precision, CURRENCY[status._default.currency].value);
            });

            $scope.modalOkClick = function (evt) {
                evt.preventDefault();

                var commands = checkChange();
                btableNotify.execCommand([commands]);

                $("#cellFormatModal").modal('hide');
            };

            /* ---------- 监听open消息 --------- */
            cellformatModalNotify.onMessage('open', function (type) {
                var index = tabs.indexOf(type)

                if (index === -1) {
                    index = 0;
                }

                // 在打开前根据当前的单元格信息重置状态
                resetCurrentStatus();

                status.tabSelected = [];
                status.tabSelected[index] = true;
                $("#cellFormatModal").modal('show');
            });

            $("#cellFormatModal").on('hidden.bs.modal', function () {
                //var commands = checkChange();
                //btableNotify.execCommand([commands]);
            });

            /* ----- 边框控制 ----- */
            $scope.builtinBorderChange = function (type) {
                if (status._default.borderType === 0) {
                    $scope.clearBorder(type);
                } else {
                    addBorder(type, getCurrentBorderStyels());
                }

                function addBorder(type, styles) {
                    switch (type) {
                        case 'all':
                            status._default.borders.left = {
                                left: styles,
                                center: styles,
                                right: styles,
                                top: styles,
                                middle: styles,
                                bottom: styles
                            };
                            break;

                        case 'outer':
                            status._default.borders.left = styles;
                            status._default.borders.right = styles;
                            status._default.borders.top = styles;
                            status._default.borders.bottom = styles;
                            break;

                        case 'inner':
                            status._default.borders.center = styles;
                            status._default.borders.middle = styles;
                            break;
                    }
                }
            };

            $scope.clearBorder = function (type) {
                switch (type) {
                    case 'all':
                        status._default.borders = {
                            left: null,
                            center: null,
                            right: null,
                            top: null,
                            middle: null,
                            bottom: null
                        };
                        break;

                    case 'outer':
                        status._default.borders.left = null;
                        status._default.borders.right = null;
                        status._default.borders.top = null;
                        status._default.borders.bottom = null;
                        break;

                    case 'inner':
                        status._default.borders.center = null;
                        status._default.borders.middle = null;
                        break;
                }
            }

            $scope.borderChange = function (type) {
                if (status._default.borderType === 0) {
                    status._default.borders[type] = null;
                    return;
                }

                var styles = getCurrentBorderStyels();

                if (!status._default.borders[type]) {
                    status._default.borders[type] = styles;
                    return;
                }

                if (JSON.stringify(status._default.borders[type]) === JSON.stringify(styles)) {
                    status._default.borders[type] = null;
                } else {
                    status._default.borders[type] = styles;
                }
            };

            /**
             * 重置初始状态
             */
            function resetCurrentStatus() {
                // 用默认配置覆盖现有配置
                $.extend(status, $.extend(true, {}, _status));

                var _default = status._default;

                resetNumberformat();

                resetAlignment();
                resetFont();
                resetBorder();
                resetFill();

                // 刷新快照
                statusSnapshot = $.extend(true, {}, status);

                // 重置数字格式
                function resetNumberformat() {
                    if (!btableStatus.numberformat) {
                        return;
                    }

                    var formatCodeInfo = numberformat.match(btableStatus.numberformat);

                    if (formatCodeInfo) {
                        status.formatSelected = [];
                        status.formatSelected[numberformatTypes.indexOf(formatCodeInfo.info.type)] = true;

                        _default.thousandth = formatCodeInfo.info.thousandth;
                        _default.code[formatCodeInfo.info.type] = formatCodeInfo.info.index;

                        if (formatCodeInfo.precision !== -1) {
                            _default.precision = formatCodeInfo.precision;
                        }

                        if (formatCodeInfo.currency !== -1) {
                            _default.currency = formatCodeInfo.currency;
                        }

                        status.format.number = numberFormatFilter(NUMBER_FORMAT.number, _default.precision, !!_default.thousandth);
                        status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, _default.precision, CURRENCY[_default.currency].value);
                    }
                }

                // 重置对齐
                function resetAlignment() {
                    _default.hAlign = getIndex('hAlign', btableStatus.horizontal, _defaultStatus.hAlign);
                    _default.vAlign = getIndex('vAlign', btableStatus.vertical, _defaultStatus.vAlign);
                    _default.wraptext = !!btableStatus.wraptext;
                    _default.merge = !!btableStatus.merge;
                }

                function resetFont() {
                    var italic = btableStatus.italic ? 1 : 0;
                    var bold = btableStatus.bold ? 2 : 0;

                    _default.font = btableStatus.font || '宋体';
                    _default.fontsize = btableStatus.fontsize || 13;
                    _default.fontstyle = italic | bold;
                    _default.color = btableStatus.color || null;
                    _default.underline = btableStatus.underline ? 1 : 0;
                    _default.throughline = btableStatus.throughline;
                }

                function resetBorder() {
                    /*
                     borderType: 0,
                     // border color
                     borderColor: null,
                     // 边框应用记录
                     borders: {
                     left: null,
                     center: null,
                     right: null,
                     top: null,
                     middle: null,
                     bottom: null
                     },
                     */
                }

                function resetFill() {
                    _default.fillColor = btableStatus.fill || null;
                }
            }

            function getCurrentBorderStyels() {
                return {
                    'border-width': BORDERS[status._default.borderType].width + 'px',
                    'border-style': BORDERS[status._default.borderType].type,
                    'border-color': status._default.borderColor
                };
            }

            function getIndex(type, value, defaultValue) {
                var index = INDEX_MAP[type][value];

                if (index === undefined) {
                    return defaultValue;
                }

                return index;
            }

            /* --- 检查更新值 --- */
            function checkChange() {
                var commands = [];

                checkNumberformat();
                checkAlign();
                checkFont();
                checkFill();

                return commands;

                /**
                 * 检查nubmerformat的更新，如果有新的变更，则生成对应的命令
                 */
                function checkNumberformat() {
                    var index = 0;

                    for (var i = 0, len = status.formatSelected.length; i < len; i++) {
                        if (status.formatSelected[i]) {
                            index = i;
                            break;
                        }
                    }

                    var code = numberformat.getNumberformatCode(index, status);

                    if (btableStatus.numberformat !== code) {
                        if (code) {
                            commands.push({
                                command: 'numberformat',
                                args: [code]
                            });
                        } else {
                            commands.push({
                                command: 'clearnumberformat',
                                args: []
                            });
                        }
                    }
                }

                /**
                 * 检查对齐面板的更新，如果有变化，则生成更新命令
                 */
                function checkAlign() {
                    // 竖直对齐检查
                    if (statusSnapshot._default.vAlign !== status._default.vAlign) {
                        commands.push({
                            command: 'vertical',
                            args: [VERTICAL_ALIGNMENT[status._default.vAlign].value]
                        });
                    }

                    // 水平对齐检查
                    if (statusSnapshot._default.hAlign !== status._default.hAlign) {
                        commands.push({
                            command: 'horizontal',
                            args: [HORIZONTAL_ALIGNMENT[status._default.hAlign].value]
                        });
                    }

                    // 自动换行检查
                    if (statusSnapshot._default.wraptext !== status._default.wraptext) {
                        commands.push({
                            command: 'wraptext',
                            args: []
                        });
                    }
                }

                /**
                 * 检查字体面板的更新，如果有变化，则生成更新命令
                 */
                function checkFont() {
                    // 字体检查
                    if (statusSnapshot._default.font !== status._default.font) {
                        commands.push({
                            command: 'font',
                            args: [status._default.font]
                        });
                    }

                    // 字形检查
                    if (statusSnapshot._default.fontstyle !== status._default.fontstyle) {
                        if ((status._default.fontstyle & 1) !== (statusSnapshot._default.fontstyle & 1)) {
                            commands.push({
                                command: 'italic',
                                args: []
                            });
                        }

                        if ((status._default.fontstyle & 2) !== (statusSnapshot._default.fontstyle & 2)) {
                            commands.push({
                                command: 'bold',
                                args: []
                            });
                        }
                    }

                    // 字号检查
                    if (statusSnapshot._default.fontsize !== status._default.fontsize) {
                        commands.push({
                            command: 'fontsize',
                            args: [status._default.fontsize]
                        });
                    }

                    // 颜色检查
                    if (statusSnapshot._default.color !== status._default.color) {
                        commands.push({
                            command: 'color',
                            args: [status._default.color]
                        });
                    }

                    // 下划线检查
                    if (statusSnapshot._default.underline !== status._default.underline) {
                        commands.push({
                            command: 'underline',
                            args: []
                        });
                    }

                    // 删除线检查
                    if (statusSnapshot._default.throughline !== status._default.throughline) {
                        commands.push({
                            command: 'throughline',
                            args: []
                        });
                    }
                }

                /**
                 * 检查填充面板的更新，如果有变化，则生成更新命令
                 */
                function checkFill() {
                    // 填充色检查
                    if (statusSnapshot._default.fillColor !== status._default.fillColor) {
                        commands.push({
                            command: 'fill',
                            args: [status._default.fillColor]
                        });
                    }
                }
            }
        }
    ]);

    function initIndexMap(mapData) {
        var map = {};
        var current;
        var currentMap;

        for (var type in mapData) {
            if (!mapData.hasOwnProperty(type)) {
                continue;
            }

            current = mapData[type];
            currentMap = {};
            map[type] = currentMap;

            for (var i = 0, len = current.length; i < len; i++) {
                currentMap[current[i].value] = i;
            }
        }

        return map;
    }
})();