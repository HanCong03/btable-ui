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
                var state = reflect(btable);

                for (var i = 0, len = callbacks.length; i < len; i++) {
                    callbacks[i](state);
                }

            }, DELAY_TIME);

        },

        on: function (cb) {
            callbacks.push(cb);
        }
    };

    function reflect(btable) {
        var state = {
            font: btable.queryCommandValue('font'),
            fontSize: btable.queryCommandValue('fontsize'),
            color: btable.queryCommandValue('color')
        };
        //console.log(state)
    }

}]);