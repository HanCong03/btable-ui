/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('toolbarNotify', ['btableService', function (btableService) {

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
                    btableService.execCommand(arguments);
                    break;

                case 'undo':
                    btableService.execCommand(['undo']);
                    break;

                case 'redo':
                    btableService.execCommand(['redo']);
                    break;

                case 'thousandth':
                    btableService.execCommand(['numberformat', '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ ']);
                    break;

                case 'cellstyle':
                    if (arguments[2]) {
                        btableService.execCommand(['builtincellstyle', arguments[1]]);
                    } else {
                        //console.error('未处理自定义cellstyle的问题');
                        //btableService.execCommand(['cellstyle', arguments[1]]);
                    }
                    break;

                case 'border':
                    //console.log('borderchange')
                    break;

                case 'merge':
                    btableService.execCommand([args]);
                    break;
            }

            btableService.execCommand(['inputfocus']);
        }
    };

}]);