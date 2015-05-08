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

    $scope.status = {
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
        timeSelected: 0
    };

    $scope.config = {
        currency: ['￥', '$', 'US$']
    };

    $scope.numberformatValues = numberformatValues;

}]);