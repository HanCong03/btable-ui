/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').filter('bCurrency', function() {
    return function(input, symbol) {
        return input.replace(/\$/g, symbol);
    };
});