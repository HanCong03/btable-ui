/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('numberformat', ['NUMBER_FORMAT', function (NUMBER_FORMAT) {

    /* ---- 初始化内置code start ---- */
    /*
     * 内置CODE，code中的'%p'是占位符，代表小数位数的占位
     * */
    var CODES = NUMBER_FORMAT;

    // code表
    var CODE_TABLE = [];
    // code结构，方便获取信息
    var CODE_MAP = {};

    /* --- 初始化表 start --- */

    // 初始化 数值类code
    (function () {
        var current = CODES.number.normal;
        var item;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'number',
                index: i,
                thousandth: false,
                code: item.code,
                color: item.color
            });
        }

        current = CODES.number.thousandth;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'number',
                index: i,
                thousandth: true,
                code: item.code,
                color: item.color
            });
        }
    })();
    /* --- 初始化表 end --- */

    /* ---- 初始化内置code end ---- */

    return {
        /**
         * 根据给定的code，获取匹配该code的内置code信息；如果不匹配内置code，则返回null。
         * @param code
         */
        match: function (code) {
            // 移除所有小数位后进行比较
            var newCode = code.replace(/\.(0+)/g, '%p');
            var index = CODE_MAP[newCode];

            if (index === undefined) {
                return null;
            }

            var precision = /\.(0+)/.test(code) && RegExp['$1'].length;

            return {
                // code 结构信息
                info: CODE_TABLE[index],
                // 精度信息
                precision: precision
            };
        }
    };

}]);