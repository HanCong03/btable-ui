/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('toolbarNotify', ['btableNotify', function (btableNotify) {

    return {
        emit: function (type, args) {
            console.log(arguments)

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

                case 'wraptext':
                    btableNotify.execCommand(arguments);
                    break;

                case 'thousandth':
                    btableNotify.execCommand(['format', '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * “-“??_ ;_ @_']);
                    break;

                case 'cellstyle':
                    if (arguments[2]) {
                        btableNotify.execCommand(['builtincellstyle', arguments[1]]);
                    } else {
                        alert(3)
                        //btableNotify.execCommand(['cellstyle', arguments[1]]);
                    }

            }
        }
    };

}]);