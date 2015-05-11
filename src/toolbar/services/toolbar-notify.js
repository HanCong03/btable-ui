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
            }
        }
    };

}]);