/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCutbtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/cutbtn.html',
        link: function ($scope, $ele) {
            var client = new ZeroClipboard($ele);

            client.on("ready", function (readyEvent) {
                client.on("copy", function (event) {
                    var clipboard = event.clipboardData;
                    var copyData = btableService.execCommand(['execcut']);

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