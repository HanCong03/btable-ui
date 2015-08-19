/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('toolbarNotify', ['btableService', function (btableService) {

    return {
        emit: function (type, args) {
            switch (type) {
                case 'undo':
                    btableService.execCommand(['undo']);
                    break;

                case 'redo':
                    btableService.execCommand(['redo']);
                    break;

                case 'thousandth':
                    btableService.execCommand(['numfmt', '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ ']);
                    break;

                case 'cellstyle':
                    btableService.execCommand(['cellstyle', arguments[1]]);
                    break;

                case 'border':
                    btableService.execCommand(args);
                    break;

                case 'underline':
                    btableService.execCommand(['toggleunderline', args]);
                    break;

                case 'merge':
                    btableService.execCommand([args]);
                    break;

                /*
                 case 'bold':
                 case 'italic':

                 case 'font':
                 case 'fontsize':

                 case 'color':
                 case 'fill':

                 case 'vertical':
                 case 'horizontal':

                 case 'numfmt':
                 case 'wraptext':

                 case 'insertleftcell':
                 case 'inserttopcell':
                 case 'insertrow':
                 case 'insertcolumn':
                 case 'insertsheet':
                 case 'rawrowheight':
                 case 'rawcolumnwidth':
                 case 'bestfitrowheight':
                 case 'bestfitcolumnwidth':
                 case 'rawdefaultcolumnwidth':
                 case 'hiderow':
                 case 'hidecolumn':
                 case "showrow":
                 case "showcolumn":
                 case "header":
                 case "gridline":
                 */
                default:
                    btableService.execCommand(arguments);
                    break;
            }

            btableService.execCommand(['focus']);
        }
    };

}]);