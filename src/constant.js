/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('b.const', []).constant('NUMBER_FORMAT', (function () {
    return {
        'number': {
            // 无千分位符
            'normal': [{
                code: '0%p_);[Red](0%p)',
                text: '(1234%p)',
                color: '#ff0000'
            }, {
                code: '0(%p)_);(0%p)',
                text: '(1234%p)',
                color: ''
            }, {
                code: '0%p;[Red]0%p',
                text: '1234%p ',
                color: '#ff0000'
            }, {
                code: '0%p_',
                text: '-1234%p',
                color: ''
            }, {
                code: '0%p_ ;[Red]-0%p',
                text: '-1234%p',
                color: '#ff0000'
            }],

            // 含有千分位符
            'thousandth': [{
                code: '#,##0%p_);[Red](#,##0%p)',
                text: '(1,234%p)',
                color: '#ff0000'
            }, {
                code: '#,##0%p_);(#,##0%p)',
                text: '(1,234%p)',
                color: ''
            }, {
                code: '#,##0%p;[Red]#,##0%p',
                text: '1,234%p ',
                color: '#ff0000'
            }, {
                code: '#,##0%p_',
                text: '-1,234%p',
                color: ''
            }, {
                code: '#,##0%p_ ;[Red]-#,##0%p',
                text: '-1,234%p',
                color: '#ff0000'
            }]
        },

        'currency': [{
            code: '"%$" #,##0%p_);[Red]("%$" #,##0%p)',
            text: '(%$ 1,234%p)',
            color: '#ff0000'
        }, {
            code: '"%$" #,##0%p_);("%$" #,##0%p)',
            text: '(%$ 1,234%p)',
            color: ''
        }, {
            code: '"%$" #,##0%p;[Red]"%$" #,##0%p',
            text: '%$ 1,234%p',
            color: '#ff0000'
        }, {
            code: '"%$" #,##0%p',
            text: '%$ 1,234%p',
            color: ''
        }, {
            code: '"%$" #,##0%p;[Red]-"%$" #,##0%p',
            text: '-%$ 1,234%p',
            color: '#ff0000'
        }]
    };
})()).constant('FONT_LIST', [
    "Angsana New",
    "Arial",
    "Arial Black",
    "Batang",
    "Book Antiqua",
    "Browallia New",
    "Calibri",
    "Cambria",
    "Candara",
    "Century",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Cordia New",
    "Courier",
    "Courier New",
    "DilleniaUPC",
    "Dotum",
    "仿宋",
    "Garamond",
    "Georgia",
    "Gulim",
    "GungSuh",
    "楷体",
    "JasmineUPC",
    "Malgun Gothic",
    "Mangal",
    "Meiryo",
    "Microsoft JhengHei",
    "微软雅黑",
    "MingLiu",
    "MingLiU_HKSCS",
    "MS Gothic",
    "MS Mincho",
    "MS PGothic",
    "MS PMincho",
    "PMingliU",
    "PMingLiU-ExtB",
    "黑体",
    "宋体",
    "宋体-ExtB",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Yu Gothic",
    "Yu Mincho"
]).constant('FONT_STYLE', [{
    text: '常规',
    value: 0
}, {
    text: '倾斜',
    value: 1
}, {
    text: '加粗',
    value: 2
}, {
    text: '加粗倾斜',
    value: 3
}]).constant('FONT_SIZE', [
    6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
]).constant('HORIZONTAL_ALIGNMENT', [{
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
}]).constant('VERTICAL_ALIGNMENT', [{
    text: '靠上',
    value: 'top'
}, {
    text: '靠下',
    value: 'bottom'
}, {
    text: '居中',
    value: 'middle'
}]).constant('CURRENCY', [{
    text: '$',
    value: '$'
}, {
    text: '￥',
    value: '￥'
}, {
    text: 'US$',
    value: 'US$'
}]);