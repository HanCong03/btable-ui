/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').filter('bNumberformatNumber', function() {
    return function(input, precision, thousandth) {
        precision = precision || 0;
        thousandth = !!thousandth;

        var source;

        if (thousandth) {
            source = input['thousandth'];
        } else {
            source = input['normal'];
        }

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
                text: current.text.replace(/%p/g, precisionBuffer),
                color: current.color
            });
        }

        return result;
    };
});