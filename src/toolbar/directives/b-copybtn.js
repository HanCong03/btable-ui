/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCopybtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/copybtn.html',
        link: function ($scope, $ele) {
            var client = new ZeroClipboard($ele);

            client.on("ready", function (readyEvent) {
                client.on("copy", function (event) {
                    var clipboard = event.clipboardData;
                    var copyData = btableService.execCommand(['execcopy']);

                    if (!copyData) {
                        return null;
                    }

                    clipboard.setData("text/plain", copyData.string);
                    clipboard.setData("text/html", copyData.html);

                    btableService.execCommand(['focus']);
                });
            });
        }
    };
}]);