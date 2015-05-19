/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('toolbarNotify', ['btableNotify', function (btableNotify) {

    return {
        emit: function (type, args) {
            switch (type) {
                case 'bold':
                case 'italic':
                case 'underline':

                case 'font':
                case 'fontsize':

                case 'color':
                case 'fill':

                case 'vertical':
                case 'horizontal':

                case 'numberformat':
                case 'wraptext':
                    btableNotify.execCommand(arguments);
                    break;

                case 'thousandth':
                    btableNotify.execCommand(['numberformat', '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ ']);
                    break;

                case 'cellstyle':
                    if (arguments[2]) {
                        btableNotify.execCommand(['builtincellstyle', arguments[1]]);
                    } else {
                        console.error('未处理自定义cellstyle的问题');
                        //btableNotify.execCommand(['cellstyle', arguments[1]]);
                    }

            }
        }
    };

}]);