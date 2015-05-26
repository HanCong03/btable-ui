/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bPastebtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/pastebtn.html',
        link: function ($scope, $ele) {
            //var client = new ZeroClipboard($ele);
            //
            //client.on("ready", function (readyEvent) {
            //    var text = client.getData("text/plain");
            //    client.on("copy", function (event) {
            //        //var clipboard = event.clipboardData;
            //        //var copyData = btableService.execCommand(['execcopy']);
            //        //
            //        //if (!copyData) {
            //        //    return null;
            //        //}
            //        //
            //        //clipboard.setData("text/plain", copyData.string);
            //        //clipboard.setData("text/html", copyData.html);
            //        //console.log(client.getData('text/plain'))
            //    });
            //});
        }
    };
}]);