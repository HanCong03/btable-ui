/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bTooltip', ['$translate', function ($translate) {

    return {
        restrict: 'A',
        scope: {
            title: "@bTooltip"
        },
        link: function ($scope, $ele) {
            $translate($scope.title).then(function (text) {
                $ele.tooltip({
                    delay: {
                        show: 500,
                        hide: 0
                    },
                    placement: 'bottom',
                    title: text
                });
            });
        }
    };
}]);