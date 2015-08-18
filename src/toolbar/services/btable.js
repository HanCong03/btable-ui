/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('btableService', [function () {
    var DELAY_TIME = 50;
    var timer = null;
    var callbacks = [];
    var btable;
    var readyList = [];

    return {
        createBtable: function (ele) {
            if (btable) {
                return btable;
            }

            btable = new BTable(ele);

            btable.on('refresh', function () {
                emit();
            });

            for (var i = 0, len = readyList.length; i < len; i++) {
                readyList[i]();
            }

            return btable;
        },

        onchange: function (cb) {
            callbacks.push(cb);
        },

        ready: function (cb) {
            readyList.push(cb);
        },

        on: function () {
            btable.on.apply(btable, arguments);
        },

        execCommand: function (args) {
            return btable.execCommand.apply(btable, args);
        },

        queryCommandValue: function () {
            return btable.queryCommandValue.apply(btable, arguments);
        }
    };

    function emit () {
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
    }

    function reflect() {
        return btable.queryCommandValue({
            'fontdetail': null,
            'fontsize': null,
            'colordetail': null,
            'bold': null,
            'italic': null,
            'filldetail': null,
            'horizontal': null,
            'vertical': null,
            'underline': null,
            'throughline': null,
            'wraptext': null,
            'numfmt': null,
            'mergecell': null
        });
    }

}]);