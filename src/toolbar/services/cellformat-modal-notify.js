/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('cellformatModalNotify', [function () {

    var listeners = {};

    return {
        notify: function (message, args) {
            if (!listeners[message]) {
                return;
            }

            var queue = listeners[message];

            for (var i = 0, len = queue.length; i < len; i++) {
                queue[i](args);
            }
        },

        onMessage: function (message, cb) {
            if (!listeners[message]) {
                listeners[message] = [];
            }

            listeners[message].push(cb);
        }
    };

}]);