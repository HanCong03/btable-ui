/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('b.const', []).constant('NUMBER_FORMAT', (function () {
    return {
        'normal': 'General',

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

        'currency': [
            {
                code: '"%$"#,##0%p_);("%$"#,##0%p)',
                text: '(%$1,234%p)',
                color: '#ff0000'
            }, {
                code: '"%$"#,##0%p_);("%$"#,##0%p)',
                text: '(%$1,234%p)',
                color: ''
            }, {
                code: '"%$"#,##0%p;[Red]"%$"#,##0%p',
                text: '%$1,234%p',
                color: '#ff0000'
            }, {
                code: '"%$"#,##0%p;-"%$"#,##0%p',
                text: '-%$1,234%p',
                color: ''
            }, {
                code: '"%$"#,##0%p;[Red]-"%$"#,##0%p',
                text: '-%$1,234%p',
                color: '#ff0000'
            }
        ],
        
        'date': [
            {
                code: '[DBNum1][$-804]yyyy\'年\'m\'月\'d\'日\';@',
                text: '二O一二年三月十四日',
                color: ''
            },
            {
                code: '[DBNum1][$-804]yyyy\'年\'m\'月\';@',
                text: '二O一二年三月',
                color: ''
            },
            {
                code: '[DBNum1][$-804]m\'月\'d\'日\';@',
                text: '三月十四日',
                color: ''
            },
            {
                code: 'yyyy\'年\'m\'月\'dquot;日\';@',
                text: '2012年3月14日',
                color: ''
            },
            {
                code: 'yyyy\'年\'m\'月\';@',
                text: '2012年3月',
                color: ''
            },
            {
                code: 'm\'月\'d\'日\';@',
                text: '3月14日',
                color: ''
            },
            {
                code: '[$-804]aaaa;@',
                text: '星期三',
                color: ''
            },
            {
                code: '[$-804]aaa;@',
                text: '周三',
                color: ''
            },
            {
                code: '[$-409]yyyy/m/d h:mm AM/PM;@',
                text: '2012/3/14 1:30 PM',
                color: ''
            },
            {
                code: 'yyyy/m/d h:mm;@',
                text: '2012/3/14 13:30',
                color: ''
            },
            {
                code: 'yy/m/d;@',
                text: '2012/3/14',
                color: ''
            },
            {
                code: 'm/d;@',
                text: '3/14',
                color: ''
            },
            {
                code: 'm/d/yy;@',
                text: '3/14/12',
                color: ''
            },
            {
                code: 'mm/dd/yy;@',
                text: '03/14/12',
                color: ''
            },
            {
                code: '[$-409]d-mmm;@',
                text: '14-Mar',
                color: ''
            },
            {
                code: '[$-409]d-mmm-yy;@',
                text: '14-Mar-12',
                color: ''
            },
            {
                code: '[$-409]dd-mmm-yy;@',
                text: '14-Mar-12',
                color: ''
            },
            {
                code: '[$-409]mmm-yy;@',
                text: 'Mar-12',
                color: ''
            },
            {
                code: '[$-409]mmmm-yy;@',
                text: 'March-12',
                color: ''
            },
            {
                code: '[$-409]mmmmm;@',
                text: 'M',
                color: ''
            },
            {
                code: '[$-409]mmmmm-yy;@',
                text: 'M-12',
                color: ''
            }
        ],

        'time': [
            {
                code: 'h:mm;@',
                text: '13:30',
                color: ''
            },
            {
                code: '[$-409]h:mm AM/PM;@',
                text: '1:30 PM',
                color: ''
            },
            {
                code: 'h:mm:ss;@',
                text: '13:30:55',
                color: ''
            },
            {
                code: '[$-409]h:mm:ss AM/PM;@',
                text: '1:30:55 PM',
                color: ''
            },
            {
                code: 'h"时"mm"分";@',
                text: '13时30分',
                color: ''
            },
            {
                code: 'h"时"mm"分"ss"秒";@',
                text: '13时30分55秒',
                color: ''
            },
            {
                code: '上午/下午h"时"mm"分";@',
                text: '下午1时30分',
                color: ''
            },
            {
                code: '上午/下午h"时"mm"分"ss"秒";@',
                text: '下午1时30分55秒',
                color: ''
            },
            {
                code: '[DBNum1][$-804]h"时"mm"分";@',
                text: '十三时三十分',
                color: ''
            },
            {
                code: '[DBNum1][$-804]上午/下午h"时"mm"分";@',
                text: '下午一时三十分',
                color: ''
            }
        ],

        'percentage': '0%p%',

        'scientific': '0%pE+00',

        'text': '@'
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
    text: '无',
    value: ''
}, {
    text: '$',
    value: '$'
}, {
    text: '￥',
    value: '￥'
}, {
    text: 'US$',
    value: 'US$'
}]).constant('BORDERS', [{
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
}]);