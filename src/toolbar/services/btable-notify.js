/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('btableNotify', [function () {
    var DELAY_TIME = 50;
    var timer = null;

    var callbacks = [];
    var commandRequestList = [];

    return {
        execCommand: function (args) {
            for (var i = 0, len = commandRequestList.length; i < len; i++) {
                commandRequestList[i](args);
            }
        },

        oncommand: function (cb) {
            commandRequestList.push(cb);
        },

        emit: function (btable) {
            if (timer !== null) {
                return;
            }

            timer = setTimeout(function () {
                timer = null;
                var status = reflect(btable);

                for (var i = 0, len = callbacks.length; i < len; i++) {
                    callbacks[i](status);
                }

            }, DELAY_TIME);

        },

        on: function (cb) {
            callbacks.push(cb);
        },

        sheetchange: function () {

        }
    };

    function reflect(btable) {
        return btable.queryCommandValue([
            'font',
            'fontsize',
            'color',
            'bold',
            'italic',
            'fill',
            'horizontal',
            'vertical',
            'underline',
            'throughline',
            'wraptext'
        ]);
    }

}]);