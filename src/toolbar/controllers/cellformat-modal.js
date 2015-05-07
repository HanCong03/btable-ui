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
        }]
    ];

    $scope.status = {
        // 千分位选中状态
        thousandth: false,
        // 数值code选中位
        numericalSelected: 0
    };

    $scope.numberformatValues = numberformatValues;

}]);