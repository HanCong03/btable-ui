/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bFilepanel', ['btableService', function (btableService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            'filestatus': '&',
            'url': '='
        },
        templateUrl: 'template/toolbar/tabs/file.html',
        link: function ($scope, $ele, attrs) {
            $ele.on('mousedown', function (evt) {
                evt.stopPropagation();
            });

            btableService.onRequireCloseFilePanel(function () {
                $ele.hide();
                btableService.notify('close');
            });

            btableService.onRequireOpenFilePanel(function () {
                $ele.show();
                $ele.focus();
                btableService.notify('open');
            });

            $scope.$watch($scope.filestatus, function (opended) {
                if (opended.status) {
                    $ele.show();
                    $ele.focus();
                    btableService.notify('open');
                } else {
                    $ele.hide();
                    btableService.notify('close');
                }
            });

            $ele.on('keydown', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (evt.keyCode === 27) {
                    evt.preventDefault();
                    $ele.hide();

                    btableService.notify('close');
                    $scope.$apply();
                }
            });
        }
    };
}]);