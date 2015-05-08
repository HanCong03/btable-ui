/**
 * @file modal通信控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('CellForamtModalController', ['$scope', 'toolbarNotify', function ($scope, toolbarNotify) {
    var numberformatValues = [
        // 数值
        [{
            style: 'color: red',
            text: '(1234.00)',
            code: ''
        }, {
            style: '',
            text: '(1234.00)',
            code: ''
        }, {
            style: 'color: red',
            text: '1234.00',
            code: ''
        }, {
            style: '',
            text: '-1234.00',
            code: ''
        }, {
            style: 'color: red',
            text: '-1234.00',
            code: ''
        }],

        // 货币
        [{
            style: 'color: red',
            text: '($1234.00)',
            code: ''
        }, {
            style: '',
            text: '($1234.00)',
            code: ''
        }, {
            style: 'color: red',
            text: '$1234.00',
            code: ''
        }, {
            style: '',
            text: '-$1234.00',
            code: ''
        }, {
            style: 'color: red',
            text: '-$1234.00',
            code: ''
        }],

        // 会计
        [],

        // 日期
        [{
            text: '2012年3月14日',
            code: ''
        }, {
            text: '2012年3月',
            code: ''
        }, {
            text: '3月14日',
            code: ''
        }, {
            text: '星期三',
            code: ''
        }, {
            text: '周三',
            code: ''
        }, {
            text: '2012/3/14',
            code: ''
        }, {
            text: '2012/3/14 1:30 PM',
            code: ''
        }, {
            text: '2012/3/14 13:30',
            code: ''
        }, {
            text: '12/3/14',
            code: ''
        }, {
            text: '3/14',
            code: ''
        }, {
            text: '3/14/12',
            code: ''
        }, {
            text: '03/14/12',
            code: ''
        }],

        // 时间
        [{
            text: '13:30',
            code: ''
        }, {
            text: '1:30 PM',
            code: ''
        }, {
            text: '13:30:55',
            code: ''
        }, {
            text: '1:30:55 PM',
            code: ''
        }, {
            text: '13时30分',
            code: ''
        }, {
            text: '13时30分55秒',
            code: ''
        }]
    ];

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
        }
    };

    $scope.status = status;

    $scope.config = {
        currency: ['￥', '$', 'US$']
    };

    $scope.numberformatValues = numberformatValues;
    $scope.horizontalAlign = horizontalAlign;
    $scope.varticalAlign = varticalAlign;
    $scope.fonts = fonts;
    $scope.fontStyle = fontStyle;
    $scope.fontSize = fontSize;
    $scope.underline = underline;
    $scope.borderStyle = borderStyle;

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


    function getCurrentBorderStyels() {
        return {
            'border-width': borderStyle[status.borderType].width + 'px',
            'border-style': borderStyle[status.borderType].type,
            'border-color': status.borderColor
        };
    }
}]);