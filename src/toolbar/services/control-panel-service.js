/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('ctrlPanelService', [function () {
    return {
        open: function () {
            $("#controlPanel").show();
        },
        close: function () {
            $("#controlPanel").hide();
        }
    };
}]);