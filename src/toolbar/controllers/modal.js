/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ModalController', [
    '$scope',
    '$modalInstance',
    'errorMsg',
    'btableService',

    function ($scope, $modalInstance, errorMsg, btableService) {
        $scope.errorMsg = errorMsg;

        $scope.close = function () {
            $modalInstance.close();
            btableService.execCommand(['focus']);
        }
    }]);