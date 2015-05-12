/**
 * @file modal通信控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('CellForamtModalController', [
    '$scope',
    'cellformatModalNotify',
    'numberformat',
    '$filter',
    'NUMBER_FORMAT',

    function ($scope,
              cellformatModalNotify,
              numberformat,
              $filter,
              NUMBER_FORMAT) {

        var numberformatTypes = ['normal', 'number', 'currency', 'accounting', 'date', 'time', 'percentage', 'fraction', 'scientific', 'text'];

        var horizontalAlign = [{
            text: '常规',
            value: 'none'
        }, {
            text: '左对齐',
            value: 'left'
        }, {
            text: '右对齐',
            value: 'right'
        }, {
            text: '居中',
            value: 'center'
        }];

        var varticalAlign = [{
            text: '靠上',
            value: 'top'
        }, {
            text: '靠下',
            value: 'bottom'
        }, {
            text: '居中',
            value: 'middle'
        }];

        var fonts = [{
            name: '宋体',
            value: '宋体'
        }, {
            name: 'Arial',
            value: 'Arial'
        }, {
            name: '微软雅黑',
            value: '微软雅黑'
        }];

        var fontStyle = [{
            name: '常规',
            value: 0
        }, {
            name: '倾斜',
            value: 1
        }, {
            name: '加粗',
            value: 2
        }, {
            name: '加粗倾斜',
            value: 3
        }];

        var fontSize = [
            6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
        ];

        var underline = [{
            text: '无',
            value: 'none'
        }, {
            text: '单下划线',
            value: 'single'
        }];

        var borderStyle = [{
            text: '无',
            width: 0,
            type: 'none',
            value: 'none'
        }, {
            text: '',
            width: 1,
            type: 'solid',
            value: 'thin'
        }, {
            text: '',
            width: 1,
            type: 'dashed',
            value: 'dashed'
        }, {
            text: '',
            width: 1,
            type: 'dotted',
            value: 'dotted'
        }, {
            text: '',
            width: 2,
            type: 'solid',
            value: 'medium'
        }];

        /* ---------- scope 挂载 ---------- */
        var status = {
            tabs: ['numberformat', 'alignment', 'font', 'border', 'fill'],
            tabSelected: [
                true, false, false, false, false
            ],
            formatSelected: [true],
            // 精度
            precision: 2,
            // 千分位选中状态
            thousandth: false,
            // 数值code选中位
            numericalSelected: 0,
            // 货币符号
            currencySymbol: 0,
            // 货币code选中位
            currencySelected: 0,
            // 日期code选中
            dateSelected: 0,
            // 时间code选中
            timeSelected: 0,

            // 水平对齐选中
            hAlignSelected: 0,
            // 垂直对齐选中
            vAlignSelected: 1,
            // 自动换行
            autowrap: false,
            // 合并单元格
            merge: false,

            // 字体
            font: fonts[0].name,
            // 字形
            fontstyle: 0,
            // 字号
            fontsize: fontSize[6],
            // 字体颜色
            color: '#000000',
            // 下划线
            underline: 0,
            // 贯穿线
            throughline: false,

            // border type
            borderType: 0,
            // border color
            borderColor: '#000000',
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
            fillColor: '#000000',

            format: {}
        };

        $scope.status = status;

        $scope.config = {
            currency: ['￥', '$', 'US$']
        };

        $scope.horizontalAlign = horizontalAlign;
        $scope.varticalAlign = varticalAlign;
        $scope.fonts = fonts;
        $scope.fontStyle = fontStyle;
        $scope.fontSize = fontSize;
        $scope.underline = underline;
        $scope.borderStyle = borderStyle;

        /* filter */
        var numberFormatFilter = $filter('bNumberformatNumber');
        var currencyFormatFilter = $filter('bNumberformatCurrency');

        $scope.$watchGroup(['status.precision', 'status.thousandth'], function () {
            $scope.status.format.number = numberFormatFilter(NUMBER_FORMAT.number, status.precision, status.thousandth);
        });

        $scope.$watchGroup(['status.precision', 'status.currencySymbol'], function () {
            $scope.status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, status.precision, $scope.config.currency[status.currencySymbol]);
        });

        /* ---------- 监听通知消息 --------- */
        cellformatModalNotify.onMessage('open', function (type) {
            var index = status.tabs.indexOf(type)

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
            status.tabSelected = [true, false, false, false, false];
            $scope.$apply();
        });


        $scope.builtinBorderChange = function (type) {
            if (status.borderType === 0) {
                $scope.clearBorder(type);
            } else {
                addBorder(type, getCurrentBorderStyels());
            }

            function addBorder(type, styles) {
                switch (type) {
                    case 'all':
                        status.borders.left = styles;
                        status.borders.center = styles;
                        status.borders.right = styles;
                        status.borders.top = styles;
                        status.borders.middle = styles;
                        status.borders.bottom = styles;
                        break;

                    case 'outer':
                        status.borders.left = styles;
                        status.borders.right = styles;
                        status.borders.top = styles;
                        status.borders.bottom = styles;
                        break;

                    case 'inner':
                        status.borders.center = styles;
                        status.borders.middle = styles;
                        break;
                }
            }
        };

        $scope.clearBorder = function (type) {
            switch (type) {
                case 'all':
                    status.borders.left = null;
                    status.borders.center = null;
                    status.borders.right = null;
                    status.borders.top = null;
                    status.borders.middle = null;
                    status.borders.bottom = null;
                    break;

                case 'outer':
                    status.borders.left = null;
                    status.borders.right = null;
                    status.borders.top = null;
                    status.borders.bottom = null;
                    break;

                case 'inner':
                    status.borders.center = null;
                    status.borders.middle = null;
                    break;
            }
        }

        $scope.borderChange = function (type) {
            if (status.borderType === 0) {
                status.borders[type] = null;
                return;
            }

            var styles = getCurrentBorderStyels();

            if (!status.borders[type]) {
                status.borders[type] = styles;
                return;
            }

            if (JSON.stringify(status.borders[type]) === JSON.stringify(styles)) {
                status.borders[type] = null;
            } else {
                status.borders[type] = styles;
            }
        };

        function resetCurrentStatus() {
            var formatCodeInfo = numberformat.match('#,##0.000_);[Red](#,##0.000)');

            if (formatCodeInfo) {
                status.thousandth = formatCodeInfo.info.thousandth;
                status.formatSelected = [];
                status.formatSelected[numberformatTypes.indexOf(formatCodeInfo.info.type)] = true;
                status.precision = formatCodeInfo.precision;
            } else {
                status.formatSelected = [true];
                status.thousandth = false;
                status.precision = 2;
            }
        }

        function getCurrentBorderStyels() {
            return {
                'border-width': borderStyle[status.borderType].width + 'px',
                'border-style': borderStyle[status.borderType].type,
                'border-color': status.borderColor
            };
        }
    }
]);