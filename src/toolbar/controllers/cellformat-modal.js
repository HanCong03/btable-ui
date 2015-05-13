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

            var numberformatTypes = ['normal', 'number', 'currency', 'accounting', 'date', 'time', 'percentage', 'fraction', 'scientific', 'text'];
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
                    time: 0
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
                autowrap: false,
                // 单元格禁用
                merge: false,

                // 默认字体: value
                font: FONT_LIST[0],
                // 默认字形: index
                fontstyle: 0,
                // 字号: index
                fontsize: 6,
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

            /* ---------- scope 挂载 ---------- */
            var status = {
                tabSelected: [true],

                formatSelected: [true],

                // 格式code信息
                format: {
                    date: NUMBER_FORMAT.date,
                    time: NUMBER_FORMAT.time
                },

                // 各种类别的默认选中索引
                _default: $.extend(true, {}, _defaultStatus)
            };

            $scope.status = status;

            $scope.horizontalAlign = HORIZONTAL_ALIGNMENT;
            $scope.verticalAlign = VERTICAL_ALIGNMENT;
            $scope.fontStyle = FONT_STYLE;
            $scope.fontSize = FONT_SIZE;
            $scope.underline = underline;
            $scope.borderStyle = BORDERS;
            $scope.fonts = FONT_LIST;
            $scope.currencyList = CURRENCY;


            status.format.date = NUMBER_FORMAT.date;
            status.format.time = NUMBER_FORMAT.time;

            /* filter */
            var numberFormatFilter = $filter('bNumberformatNumber');
            var currencyFormatFilter = $filter('bNumberformatCurrency');

            $scope.$watchGroup(['status._default.precision', 'status._default.thousandth'], function () {
                $scope.status.format.number = numberFormatFilter(NUMBER_FORMAT.number, status._default.precision, !!status._default.thousandth);
            });

            $scope.$watchGroup(['status._default.precision', 'status._default.currency'], function () {
                $scope.status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, status._default.precision, CURRENCY[status._default.currency].value);
            });

            /* ---------- 监听open消息 --------- */
            cellformatModalNotify.onMessage('open', function (type) {
                var index = tabs.indexOf(type)

                if (index === -1) {
                    index = 0;
                }

                status.tabSelected[index] = true;

                // 在打开前根据当前的单元格信息重置状态
                resetCurrentStatus();

                $("#cellFormatModal").modal({
                    'show': true
                });
            });

            $("#cellFormatModal").on('hidden.bs.modal', function () {
                checkChange();

                status.tabSelected = [true, false, false, false, false];
                $scope.$apply();
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
                status._default = $.extend(true, {}, _defaultStatus);

                var _default = status._default;

                resetNumberformat();
                resetAlignment();

                // 刷新快照
                statusSnapshot = $.extend(true, {}, status);

                // 重置数字格式
                function resetNumberformat() {
                    var formatCodeInfo = numberformat.match('#,##0.000_);[Red](#,##0.000)');

                    if (formatCodeInfo) {
                        status.formatSelected = [];
                        status.formatSelected[numberformatTypes.indexOf(formatCodeInfo.info.type)] = true;

                        _default.thousandth = formatCodeInfo.info.thousandth;
                        _default.precision = formatCodeInfo.precision;
                        _default.code[formatCodeInfo.info.type] = formatCodeInfo.info.index;
                    }
                }

                // 重置对齐
                function resetAlignment() {
                    _default.hAlign = getIndex('hAlign', btableStatus.horizontal, _defaultStatus.hAlign);
                    _default.vAlign = getIndex('vAlign', btableStatus.vertical, _defaultStatus.vAlign);
                    _default.autowrap = !!btableStatus.wraptext;
                    _default.merge = !!btableStatus.merge;

                    //
                    //    // 默认字体: value
                    //    font: FONT_LIST[0],
                    //    // 默认字形: index
                    //    fontstyle: 0,
                    //    // 字号: index
                    //    fontsize: 6,
                    //    // 字体颜色
                    //    color: null,
                    //    // 下划线
                    //    underline: 0,
                    //    // 贯穿线
                    //    throughline: false,
                    //
                    //    // border type
                    //    borderType: 0,
                    //    // border color
                    //    borderColor: null,
                    //    // 边框应用记录
                    //    borders: {
                    //    left: null,
                    //        center: null,
                    //        right: null,
                    //        top: null,
                    //        middle: null,
                    //        bottom: null
                    //},
                    //
                    //// fill color
                    //fillColor: null
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


                // 检查numberformat是否有change
                function checkNumberformat() {
                    var index;

                    for (var i = 0, len = status.formatSelected.length; i < len; i++) {
                        
                    }
                    //var type =
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