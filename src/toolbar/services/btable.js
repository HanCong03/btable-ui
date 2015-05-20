/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('btableService', [function () {
    var DELAY_TIME = 50;
    var timer = null;
    var changeCblist = [];
    var callbacks = [];
    var btable;

    return {
        createBtable: function (ele) {
            if (btable) {
                return btable;
            }

            btable = new BTable(ele);

            btable.on('change', function () {
                emit();
            });

            btable.on('')

            return btable;
        },

        onchange: function (cb) {
            callbacks.push(cb);
        },

        on: function () {
            btable.on.apply(btable, arguments);
        },

        execCommand: function (args) {
            btable.execCommand.apply(btable, args);
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
            'wraptext',
            'numberformat',
            'merge'
        ]);
    }

}]);