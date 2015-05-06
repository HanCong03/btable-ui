/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ToolbarBasicController', ['$scope', 'toolbarNotify', function ($scope, toolbarNotify) {
    $scope.btnState = {
        pasteOpen: false,
        fontfamilyOpen: false,
        fontsizeOpen: false,
        colorOpen: false,
        bgcolorOpen: false,
        mergeOpen: false
    };

    var res = {
        valignValue: null,
        alignValue: null
    };

    $scope.res = res;

    $scope.values = {
        fontsize: 12,
        fontfamily: 'Arial'
    };

    $scope.initValue = {
        fontfamily: ["Angsana New", "Arial", "Arial Black", "Batang", "Book Antiqua", "Browallia New", "Calibri", "Cambria", "Candara", "Century", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "Courier", "Courier New", "DilleniaUPC", "Dotum", "仿宋", "Garamond", "Georgia", "Gulim", "GungSuh", "楷体", "JasmineUPC", "Malgun Gothic", "Mangal", "Meiryo", "Microsoft JhengHei", "微软雅黑", "MingLiu", "MingLiU_HKSCS", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "PMingliU", "PMingLiU-ExtB", "黑体", "宋体", "宋体-ExtB", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Verdana", "Yu Gothic", "Yu Mincho"],
        fontsize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 36, 48, 72]
    };

    $scope.handler = {
        btnclick: function (evt) {
            console.log(evt.delegateTarget.getAttribute('data-name'))
        },
        fontSelect: function (val) {
            toolbarNotify.emit('font-family', val);
        },

        fontsizeSelect: function (val) {
            toolbarNotify.emit('font-size', val);
        },

        mergechange: function (mode, value) {
            console.log(mode, value)
        },

        valignChange: function (mode) {
            if (res.valignValue == mode) {
                console.log('null')
            } else {
                console.log(mode)
            }
        },

        pressChange: function () {
            console.log(arguments)
        },

        alignChange: function (mode) {
            if (res.alignValue == mode) {
                console.log('null')
            } else {
                console.log(mode)
            }
        }
    };
}]);