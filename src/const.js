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
})());