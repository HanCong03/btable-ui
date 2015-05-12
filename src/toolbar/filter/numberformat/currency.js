/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').filter('bNumberformatCurrency', function() {
    return function(input, precision, symbol) {
        precision = precision || 0;
        symbol = symbol || '';

        var source = input;

        // 构造精度字符串
        var precisionBuffer = [];

        precision -= 1;
        while (precision >= 0) {
            precisionBuffer.push(precision % 10);
            precision--;
        }

        precisionBuffer = precisionBuffer.join('');

        if (precisionBuffer.length) {
            precisionBuffer = '.' + precisionBuffer;
        }

        var result = [];
        var current;

        for (var i = 0, len = source.length; i < len; i++) {
            current = source[i];

            result.push({
                text: current.text.replace(/%p/g, precisionBuffer).replace(/%\$/g, symbol),
                color: current.color
            });
        }

        return result;
    };
});