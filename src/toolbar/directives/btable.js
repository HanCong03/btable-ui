/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('btable', ['btableNotify', function (btableNotify) {

    return {
        restrict: 'A',
        scope: {
            onchange: '&oncolorchange',
            ngModel: '='
        },
        link: function ($scope, $ele, $attr, $controller) {
            $(document).ready(function () {
                var btable = new BTable($ele[0]);

                btable.on('change', function () {
                    btableNotify.emit(btable);
                });

                btable.on('sheetschange', function () {

                });

                btableNotify.oncommand(function (args) {
                    btable.execCommand.apply(btable, args);
                });

                btable.execCommand('init');
            });;
        }
    };
}]);