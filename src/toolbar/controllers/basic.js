/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ToolbarBasicController', ['$scope', 'toolbarNotify', 'cellformatModalNotify', function ($scope, toolbarNotify, cellformatModalNotify) {
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
        alignValue: null,
        merge: false
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
            var buttonType = evt.delegateTarget.getAttribute('data-name');
            toolbarNotify.emit('buttonclick', buttonType);
        },

        fontSelect: function (val) {
            toolbarNotify.emit('fontfamily', val);
        },

        fontsizeSelect: function (val) {
            toolbarNotify.emit('fontsize', val);
        },

        mergechange: function (mode, status) {
            toolbarNotify.emit('merge', mode, status);
        },

        pressChange: function (type, status) {
            toolbarNotify.emit(type, status);
        },

        valignChange: function (status) {
            toolbarNotify.emit('verticalalign', status);
        },

        alignChange: function (status) {
            toolbarNotify.emit('horizontalalign', status);
        },

        colorChange: function (type, color) {
            toolbarNotify.emit(type, color);
        },

        borderSelect: function (type) {
            toolbarNotify.emit('border', type);
        },

        formatSelect: function (type) {
            toolbarNotify.emit('numberformat', type);
        },

        selectCellstyle: function (id, isBuiltin) {
            toolbarNotify.emit('cellstyle', id, isBuiltin);
        },

        openCellFormat: function (type) {
            cellformatModalNotify.notify('open', type);
        }
    };
}]);