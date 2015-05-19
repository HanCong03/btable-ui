/*!
 * ====================================================
 * BTable Number Format - v1.0.0 - 2015-05-19
 * https://github.com/kitygraph/formula
 * GitHub: https://github.com/kitygraph/formula.git 
 * Copyright (c) 2015 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
var _p = {
    r: function(index) {
        if (_p[index].inited) {
            return _p[index].value;
        }
        if (typeof _p[index].value === "function") {
            var module = {
                exports: {}
            }, returnValue = _p[index].value(null, module.exports, module);
            _p[index].inited = true;
            _p[index].value = returnValue;
            if (returnValue !== undefined) {
                return returnValue;
            } else {
                for (var key in module.exports) {
                    if (module.exports.hasOwnProperty(key)) {
                        _p[index].inited = true;
                        _p[index].value = module.exports;
                        return module.exports;
                    }
                }
            }
        } else {
            _p[index].inited = true;
            return _p[index].value;
        }
    }
};

//src/analyzer/analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[0] = {
    value: function(require) {
        var VALUE_TYPE = _p.r(18);
        var NumberAnalyzer = _p.r(7);
        var CurrencyAnalyzer = _p.r(1);
        var DateTimeAnalyzer = _p.r(4);
        var PercentageAnalyzer = _p.r(8);
        var FractionAnalyzer = _p.r(6);
        return {
            analyze: function(input, code) {
                var value = input.trim();
                // 数字分析（包含对科学计数法的分析）
                var result = NumberAnalyzer.analyze(value);
                if (result) {
                    return result;
                }
                // 货币分析
                result = CurrencyAnalyzer.analyze(value);
                if (result) {
                    return result;
                }
                // 日期分析
                result = DateTimeAnalyzer.analyze(value);
                if (result) {
                    return result;
                }
                // 分数分析
                result = FractionAnalyzer.analyze(value);
                if (result) {
                    return result;
                }
                // 百分比分析
                result = PercentageAnalyzer.analyze(value);
                if (result) {
                    return result;
                }
                // 都不匹配，则判定为文本类型
                return {
                    type: VALUE_TYPE.TEXT,
                    value: input
                };
            }
        };
    }
};

//src/analyzer/currency.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[1] = {
    value: function(require) {
        var Utils = _p.r(9);
        var VALUE_TYPE = _p.r(18);
        var CURRENCY_SYMBOL = _p.r(14);
        return {
            analyze: function(input) {
                var symbol = input.match(/^[^0-9\.]/);
                if (!symbol) {
                    return null;
                }
                symbol = symbol[0];
                if (!CURRENCY_SYMBOL[symbol]) {
                    return null;
                }
                var numberText = input.substring(symbol.length);
                if (Utils.isNumber(numberText)) {
                    return {
                        type: VALUE_TYPE.CURRENCY,
                        symbol: symbol,
                        value: parseFloat(numberText) + ""
                    };
                }
                return null;
            }
        };
    }
};

//src/analyzer/date-time/checker.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[2] = {
    value: function() {
        var MONTH_DAY = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        return {
            checkDate: function(info) {
                var yearStr = info.year;
                var monthStr = info.month;
                var dayStr = info.day;
                var year = +yearStr;
                var month = +monthStr;
                var day = +dayStr;
                if (!formatYear()) {
                    return null;
                }
                if (!formatMonth()) {
                    return null;
                }
                if (!formatDay()) {
                    return null;
                }
                if (!checkLeapYear(year, month, day)) {
                    return null;
                }
                return {
                    type: "date",
                    year: year,
                    month: month,
                    day: day
                };
                function formatYear() {
                    var yearLength = yearStr.length;
                    switch (yearLength) {
                      case 1:
                        yearStr = "200" + yearStr;
                        year = +yearStr;
                        break;

                      case 2:
                        if (year < 50) {
                            yearStr = "20" + yearStr;
                        } else {
                            yearStr = "19" + yearStr;
                        }
                        year = +yearStr;
                        break;

                      case 4:
                        break;

                      default:
                        return false;
                    }
                    if (year < 1900 || year > 9999) {
                        return false;
                    }
                    return true;
                }
                function formatMonth() {
                    if (monthStr.length > 2) {
                        return false;
                    }
                    if (month > 12 || month === 0) {
                        return false;
                    }
                    return true;
                }
                function formatDay() {
                    if (dayStr.length > 2) {
                        return false;
                    }
                    if (day > MONTH_DAY[month] || day === 0) {
                        return false;
                    }
                    return true;
                }
            },
            checkTime: function(info) {
                var hourStr = info.hour;
                var minuteStr = info.minute;
                var secondStr = info.second;
                var hour = +hourStr;
                var minute = +minuteStr;
                var second = +secondStr;
                if (hourStr.length > 2 || hour > 23) {
                    return null;
                }
                if (minuteStr.length > 2 || minuteStr > 59) {
                    return null;
                }
                if (secondStr.length > 2 || second > 59) {
                    return null;
                }
                return {
                    type: "time",
                    hour: hour,
                    minute: minute,
                    second: second
                };
            }
        };
        // 闰年检测
        function checkLeapYear(year, month, day) {
            if (month === 2) {
                // 闰年
                if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {} else if (day > 28) {
                    // 非闰年且2月天数大于28，则返回false
                    return false;
                }
            }
            return true;
        }
    }
};

//src/analyzer/date-time/custom.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[3] = {
    value: function(require) {
        var DATE_SYMBOL = _p.r(15);
        var TIME_SYMBOL = _p.r(16);
        var CustomAnalyzer = {
            analyze: function(numbers, delimiters) {
                var delimiter = delimiters.join("");
                var symbol;
                // 日期匹配
                for (var i = 0, len = DATE_SYMBOL.length; i < len; i++) {
                    symbol = DATE_SYMBOL[i];
                    if (symbol.indexOf(delimiter) === -1) {
                        continue;
                    }
                    if (delimiters[0] === symbol.charAt(0)) {
                        return CustomAnalyzer.analyzeDate(numbers, true);
                    } else {
                        return CustomAnalyzer.analyzeDate(numbers, false);
                    }
                }
                // 时间匹配
                for (var i = 0, len = TIME_SYMBOL.length; i < len; i++) {
                    symbol = TIME_SYMBOL[i];
                    if (symbol.indexOf(delimiter) === -1) {
                        continue;
                    }
                    if (delimiters[0] === symbol.charAt(0)) {
                        return CustomAnalyzer.analyzeTime(numbers, true);
                    } else {
                        return CustomAnalyzer.analyzeTime(numbers, false);
                    }
                }
                return null;
            },
            /**
         * @param numbers 值列表
         * @param isBeginYear 是否由年份开始解释。
         *                      如果该值为false，则将把numbers中的第一个元素解释为月份。
         *                      否则，解释为年份。
         */
            analyzeDate: function(numbers, isBeginYear) {
                var date = new Date();
                if (isBeginYear) {
                    return {
                        type: "date",
                        year: numbers[0],
                        month: numbers[1],
                        day: numbers[2] || "1"
                    };
                }
                return {
                    type: "date",
                    year: date.getFullYear() + "",
                    month: numbers[0],
                    day: numbers[1]
                };
            },
            /**
         * 分析时间，参数解释参考analyzeDate方法
         */
            analyzeTime: function(numbers, isBeginHour) {
                var date = new Date();
                if (isBeginHour) {
                    return {
                        type: "time",
                        hour: numbers[0],
                        minute: numbers[1],
                        second: numbers[2] || "0"
                    };
                }
                return {
                    type: "time",
                    hour: date.getHours() + "",
                    minute: numbers[0],
                    second: numbers[1]
                };
            }
        };
        return CustomAnalyzer;
    }
};

//src/analyzer/date-time/date-time.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[4] = {
    value: function(require) {
        var VALUE_TYPE = _p.r(18);
        // 系统日期时间pattern
        var SYSTEM_PATTERN = /^([0-9]+)([-/:])([0-9]+)(?:\2([0-9]+))?$/;
        // 扩展日期时间patter（国际化日期时间）
        var EXT_PATTERN = /^([0-9]+)([^0-9])([0-9]+)([^0-9])(?:([0-9]+)([^0-9]))?$/;
        var SystemAnalyzer = _p.r(5);
        var CustomAnalyzer = _p.r(3);
        var Checker = _p.r(2);
        var DateTimeConverter = _p.r(10);
        return {
            analyze: function(input) {
                input = input.split(/\s+/);
                if (input.length > 2) {
                    return null;
                }
                if (input.length === 1) {
                    return analyzeDateOrTime(input[0]);
                } else {
                    return analyzeDateTime(input[0], input[1]);
                }
            }
        };
        function analyzeDateOrTime(input) {
            var result = null;
            if (SYSTEM_PATTERN.test(input)) {
                result = SystemAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$4 ], RegExp.$2);
            } else if (EXT_PATTERN.test(input)) {
                result = CustomAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$5 ], [ RegExp.$2, RegExp.$4, RegExp.$6 ]);
            }
            if (!result) {
                return null;
            }
            if (result.type === "date") {
                result = Checker.checkDate(result);
            } else {
                result = Checker.checkTime(result);
            }
            if (!result) {
                return null;
            }
            if (result.type === "date") {
                return {
                    type: VALUE_TYPE.DATE,
                    value: DateTimeConverter.dateToNumber(result.year, result.month, result.day)
                };
            }
            return {
                type: VALUE_TYPE.TIME,
                value: DateTimeConverter.timeToNumber(result.hour, result.minute, result.second)
            };
        }
        function analyzeDateTime(dateInput, timeInput) {
            var dateResult = _analyzeDate(dateInput);
            var timeResult = _analyzeTime(timeInput);
            if (dateResult === null || timeResult === 0) {
                return null;
            }
            return {
                type: VALUE_TYPE.DATETIME,
                value: dateResult + timeResult
            };
        }
        // 日期分析
        function _analyzeDate(input) {
            var result;
            if (SYSTEM_PATTERN.test(input)) {
                result = SystemAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$4 ], RegExp.$2);
            } else if (EXT_PATTERN.test(input)) {
                result = CustomAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$5 ], [ RegExp.$2, RegExp.$4, RegExp.$6 ]);
            } else {
                return null;
            }
            if (!result || result.type !== "date") {
                return null;
            }
            result = Checker.checkDate(result);
            if (!result) {
                return null;
            }
            return DateTimeConverter.dateToNumber(result.year, result.month, result.day);
        }
        // 时间分析
        function _analyzeTime(input) {
            var result;
            // 日期分析
            if (SYSTEM_PATTERN.test(input)) {
                result = SystemAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$4 ], RegExp.$2);
            } else if (EXT_PATTERN.test(input)) {
                result = CustomAnalyzer.analyze([ RegExp.$1, RegExp.$3, RegExp.$5 ], [ RegExp.$2, RegExp.$4, RegExp.$6 ]);
            } else {
                return null;
            }
            if (!result || result.type !== "time") {
                return null;
            }
            result = Checker.checkTime(result);
            if (!result) {
                return null;
            }
            return DateTimeConverter.timeToNumber(result.hour, result.minute, result.second);
        }
    }
};

//src/analyzer/date-time/system.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[5] = {
    value: function() {
        var SystemAnalyzer = {
            analyze: function(numbers, delimiter) {
                if (delimiter === "/" || delimiter === "-") {
                    return SystemAnalyzer.analyzeDate(numbers);
                } else {
                    return SystemAnalyzer.analyzeTime(numbers);
                }
            },
            /**
         * 日期分析
         */
            analyzeDate: function(numbers) {
                if (!numbers[numbers.length - 1]) {
                    return parseTwoPartDate();
                }
                return parseFullDate();
                function parseTwoPartDate() {
                    var date = new Date();
                    if (numbers[0] <= 12) {
                        return {
                            type: "date",
                            year: date.getFullYear() + "",
                            month: numbers[0],
                            day: numbers[1]
                        };
                    } else {
                        return {
                            type: "date",
                            year: numbers[0],
                            month: numbers[1],
                            day: "1"
                        };
                    }
                }
                function parseFullDate() {
                    return {
                        type: "date",
                        year: numbers[0],
                        month: numbers[1],
                        day: numbers[2]
                    };
                }
            },
            /**
         * 时间分析
         */
            analyzeTime: function(numbers) {
                if (!numbers[numbers.length - 1]) {
                    return {
                        type: "time",
                        hour: numbers[0],
                        minute: numbers[1],
                        second: "0"
                    };
                }
                return {
                    type: "time",
                    hour: numbers[0],
                    minute: numbers[1],
                    second: numbers[2]
                };
            }
        };
        return SystemAnalyzer;
    }
};

//src/analyzer/fraction.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[6] = {
    value: function(require) {
        var Utils = _p.r(9);
        var VALUE_TYPE = _p.r(18);
        var CURRENCY_SYMBOL = _p.r(14);
        return {
            analyze: function(input) {
                return null;
            }
        };
    }
};

//src/analyzer/number.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[7] = {
    value: function(require) {
        var Utils = _p.r(9);
        var VALUE_TYPE = _p.r(18);
        return {
            analyze: function(input) {
                if (Utils.isNumber(input)) {
                    if (/[Ee]/.test(input)) {
                        return {
                            type: VALUE_TYPE.SCIENTIFIC,
                            value: parseFloat(input) + ""
                        };
                    }
                    return {
                        type: VALUE_TYPE.NUMBER,
                        value: parseFloat(input) + ""
                    };
                }
                input = input.replace(/^\(|\)$/g, "");
                if (input.charAt(0) === "+" || input.charAt(0) === "-") {
                    return null;
                }
                if (Utils.isNumber(input)) {
                    return {
                        type: VALUE_TYPE.NUMBER,
                        value: -parseFloat(input) + ""
                    };
                }
            }
        };
    }
};

//src/analyzer/percentage.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[8] = {
    value: function(require) {
        var Utils = _p.r(9);
        var VALUE_TYPE = _p.r(18);
        return {
            analyze: function(input) {
                if (!/^\s*%|%\s*$/.test(input)) {
                    return null;
                }
                input = input.replace("%", "").trim();
                if (Utils.isNumber(input) && !/[Ee]/.test(input)) {
                    return {
                        TYPE: VALUE_TYPE.PERCENTAGE,
                        value: parseFloat(input) + ""
                    };
                }
                return null;
            }
        };
    }
};

//src/analyzer/utils.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[9] = {
    value: function() {
        return {
            isNumber: function(value) {
                return !isNaN(parseFloat(value)) && isFinite(value);
            }
        };
    }
};

//src/converter/date-time.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[10] = {
    value: function() {
        var START_DATE = Date.UTC(1900, 0, 0);
        var DAY_STEP = 24 * 60 * 60 * 1e3;
        var SECOND_OF_HOUR = 60 * 60;
        var SECOND_OF_DAY = 24 * 60 * 60;
        var SECOND_UNIT = 1 / SECOND_OF_DAY;
        return {
            dateToNumber: function(year, month, day) {
                var diff = Date.UTC(year, month - 1, day) - START_DATE;
                return diff / DAY_STEP;
            },
            timeToNumber: function(hour, minute, second) {
                return (hour * SECOND_OF_HOUR + minute * 60 + second) * SECOND_UNIT;
            },
            numberToDate: function(number) {
                number = parseInt(number, 10);
                var date = new Date(number * DAY_STEP + START_DATE);
                return {
                    year: date.getUTCFullYear(),
                    month: date.getUTCMonth() + 1,
                    day: date.getUTCDate(),
                    weekday: date.getUTCDay()
                };
            },
            numberToTime: function(number) {
                var dayCount = parseInt(number, 10);
                number = number - dayCount;
                var result;
                var totalSecond = Math.round(number / SECOND_UNIT);
                var hour = Math.floor(totalSecond / SECOND_OF_HOUR);
                if (number === 0) {
                    result = {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        am: true,
                        hour12: 0
                    };
                } else {
                    result = {
                        hour: hour,
                        minute: Math.floor(totalSecond % SECOND_OF_HOUR / 60),
                        second: totalSecond % 60,
                        am: hour < 12,
                        hour12: hour < 12 ? hour : hour - 12
                    };
                }
                totalSecond += SECOND_OF_DAY * dayCount;
                result.totalSecond = totalSecond;
                result.totalMinute = Math.floor(totalSecond / 60);
                result.totalHour = Math.floor(totalSecond / SECOND_OF_HOUR);
                return result;
            }
        };
    }
};

//src/converter/dbnum/db.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[11] = {
    value: function() {
        var DIGITAL = "O一二三四五六七八九".split("");
        var WEEK = [ "周", "星期" ];
        var GRADE_1 = [ "十", "百", "千" ];
        var GRADE_2 = [ "万", "亿", "兆" ];
    }
};

//src/converter/dbnum/dbnum.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[12] = {
    value: function() {
        return {
            convert: function(values, dbnum, locale) {
                var result = [];
                var current;
                //if (dbnum === null) {
                for (var i = 0, len = values.length; i < len; i++) {
                    result.push(values[i].value);
                }
                return result.join("");
                //}
                var numbers = NUMS[dbnum];
                for (var i = 0, len = values.length; i < len; i++) {
                    current = values[i];
                    if (current.type === "number") {
                        result.push(translate(current.value, numbers));
                    } else {
                        result.push(current.value);
                    }
                }
                return result.join("");
            }
        };
        function translate(value, NUMBERS) {
            value = value.split("");
            for (var i = 0, len = value.length; i < len; i++) {
                value[i] = NUMBERS[value[i]];
            }
            return value.join("");
        }
    }
};

//src/converter/thousandth.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[13] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        return {
            convert: function(tokens) {
                var result = [];
                var token;
                var index = 0;
                tokens.reverse();
                var lastIndex = -1;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    result.push(token);
                    if (token.type === TOKEN_TYPE.NUMBER) {
                        index++;
                        lastIndex = -1;
                        if (index === 3) {
                            index = 0;
                            lastIndex = result.length;
                            result.push({
                                type: TOKEN_TYPE.STRING,
                                value: ","
                            });
                        }
                    }
                }
                // 清除多余的分隔符
                if (lastIndex !== -1) {
                    result.splice(lastIndex, 1);
                }
                tokens.reverse();
                return result.reverse();
            }
        };
    }
};

//src/definition/currency-symbol.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[14] = {
    value: {
        $: true,
        "¥": true,
        US$: true
    }
};

//src/definition/date-symbol.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[15] = {
    value: [ "年月日" ]
};

//src/definition/time-symbol.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[16] = {
    value: [ "时分秒" ]
};

//src/definition/token-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[17] = {
    value: {
        // 字符串
        STRING: "string",
        // 数字占位符
        NUMBER: "number",
        // 小数点
        DECIMAL: "decimal",
        // 千分位符
        THOUSANDTH: "thousandth",
        // 全引用@
        QUOTE: "quote",
        PERCENTAGE: "percentage",
        // 符号空白
        SYMBOL_SPACE: "symbol_space",
        // 重复字符
        REPEAT: "repeat",
        // 颜色值
        COLOR: "color",
        DBNUM: "dbnum",
        LOCALE: "locale",
        TIMESTAMP: "timestamp",
        DATE_YEAR: "year",
        DATE_MONTH: "month",
        DATE_DAY: "day",
        TIME_HOUR: "hour",
        TIME_MINUTE: "minute",
        TIME_SECOND: "second",
        AMPM: "AM/PM",
        SCIENTIFIC: "scientific",
        FRACTION: "fraction",
        DATE_LONG_WEEK: "long_week",
        DATE_SHORT_WEEK: "short_week"
    }
};

//src/definition/value-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[18] = {
    value: {
        NUMBER: "number",
        CURRENCY: "currency",
        DATE: "date",
        TIME: "time",
        DATETIME: "datetime",
        PERCENTAGE: "percentage",
        FRACTION: "fraction",
        SCIENTIFIC: "scientific",
        TEXT: "text",
        LOGICAL: "logical",
        ERROR: "error"
    }
};

//src/engines/structed.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[19] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        return {
            parse: function(tokens) {
                if (tokens.length === 0 || tokens.length > 4) {
                    throw new Error("illegal group");
                }
                var result = [];
                for (var i = 0, len = tokens.length; i < len; i++) {
                    result.push(parseGroup(tokens[i]));
                }
                return wrap(result);
            }
        };
        /**
     * 对结果进行标准化，使其能满足四种规则
     * @param result
     */
        function wrap(tokens) {
            var result = [];
            result[0] = tokens[0];
            switch (tokens.length) {
              case 1:
                result[1] = tokens[0];
                result[2] = tokens[0];
                result[3] = tokens[0];
                break;

              case 2:
                result[1] = tokens[1];
                result[2] = tokens[0];
                result[3] = null;
                break;

              case 3:
                result[1] = tokens[1];
                result[2] = tokens[2];
                result[3] = null;
                break;

              case 4:
                result[1] = tokens[1];
                result[2] = tokens[2];
                result[3] = tokens[3];
                break;
            }
            result.type = checkType(result);
            return result;
        }
        function checkType(tokens) {
            var group = tokens[0];
        }
        function parseGroup(tokens) {
            var result = createGroup();
            var token;
            while (token = tokens.shift()) {
                switch (token.type) {
                  case TOKEN_TYPE.THOUSANDTH:
                    result.thousandth = true;
                    break;

                  case TOKEN_TYPE.QUOTE:
                    result.text = true;
                    result.tokens.push(token);
                    break;

                  case TOKEN_TYPE.COLOR:
                    result.color = token.value;
                    break;

                  case TOKEN_TYPE.DBNUM:
                    result.dbnum = token.value;
                    break;

                  case TOKEN_TYPE.LOCALE:
                    result.locale = token.value;
                    break;

                  case TOKEN_TYPE.FRACTION:
                    result.tokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: "/"
                    });
                    result.fraction = !result.date;
                    break;

                  case TOKEN_TYPE.TIMESTAMP:
                    result.time = true;
                    result.tokens.push(token);
                    break;

                  case TOKEN_TYPE.DATE_YEAR:
                  case TOKEN_TYPE.DATE_MONTH:
                  case TOKEN_TYPE.DATE_DAY:
                  case TOKEN_TYPE.DATE_LONG_WEEK:
                  case TOKEN_TYPE.DATE_SHORT_WEEK:
                    result.date = true;
                    result.fraction = false;
                    result.tokens.push(token);
                    break;

                  case TOKEN_TYPE.TIME_HOUR:
                  case TOKEN_TYPE.TIME_MINUTE:
                  case TOKEN_TYPE.TIME_SECOND:
                    result.time = true;
                    result.tokens.push(token);
                    break;

                  case TOKEN_TYPE.AMPM:
                    result.time = true;
                    result.tokens.push(token);
                    break;

                  case TOKEN_TYPE.SCIENTIFIC:
                    result.scientific = true;
                    result.tokens.push(token);
                    break;

                  default:
                    result.tokens.push(token);
                    break;
                }
            }
            return result;
        }
        function createGroup() {
            return {
                /* ------ 控制字段 ------ */
                // 是否包含千分位
                thousandth: false,
                // 是否包含日期
                date: false,
                // 是否包含时间
                time: false,
                // 是否包含科学计数法
                scientific: false,
                // 是否包含百分比
                percentage: false,
                // 是否包含分数
                fraction: false,
                // 是否是文本类型
                text: false,
                /* ------ 值字段 ------ */
                // color值
                color: null,
                // dbnum值
                dbnum: null,
                // 区域值
                locale: null,
                // AM/PM值
                ampm: null,
                // 当前token列表
                tokens: []
            };
        }
    }
};

//src/engines/token/symbol-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[20] = {
    value: function() {
        var SymbolManager = {
            _symbols: null,
            reload: function(code) {
                SymbolManager._symbols = code.split("");
            },
            getSymbol: function() {
                return SymbolManager._symbols.shift();
            },
            hasMore: function() {
                return SymbolManager._symbols.length > 0;
            },
            matchNextSymbol: function(symbol, ignoreCase) {
                if (SymbolManager._symbols.length === 0) {
                    return false;
                }
                if (ignoreCase) {
                    return SymbolManager._symbols[0].toLowerCase() === symbol.toLowerCase();
                }
                return SymbolManager._symbols[0] === symbol;
            },
            matchNextString: function(str, ignoreCase) {
                if (SymbolManager._symbols.length === 0) {
                    return false;
                }
                var source = SymbolManager._symbols.join("");
                if (ignoreCase) {
                    source = source.toLowerCase();
                    str = str.toLowerCase();
                }
                return source.indexOf(str) === 0;
            },
            freeSymbol: function(count) {
                SymbolManager._symbols = SymbolManager._symbols.slice(count);
            }
        };
        return SymbolManager;
    }
};

//src/engines/token/token.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[21] = {
    value: function(require) {
        var SymbolManager = _p.r(20);
        var TOKEN_TYPE = _p.r(17);
        // 合法color值
        var COLOR = [ "black", "green", "white", "blue", "magenta", "yellow", "cyan", "red" ];
        // 最近访问到的日期时间token预设状态位
        var DATE_TIME_STATUS = {
            NONE: 0,
            YEAR: 1,
            DAY: 2,
            HOUR: 4,
            SECOND: 8
        };
        // 类型待定的月份/分钟 token引用
        var pendingMonthMinute = null;
        // 当前最近访问到的日期时间状态位
        var lastDateTimeStatus = DATE_TIME_STATUS.NONE;
        return {
            parse: function(code) {
                // 初始化
                SymbolManager.reload(code);
                return process();
            }
        };
        function createNewGroup(contianer) {
            contianer.push([]);
            pendingMonthMinute = null;
            lastDateTimeStatus = DATE_TIME_STATUS.NONE;
            return contianer[contianer.length - 1];
        }
        function process() {
            var result = [];
            var group = createNewGroup(result);
            var c;
            while (c = SymbolManager.getSymbol()) {
                switch (c) {
                  case "\\":
                    processEscape(group, c);
                    break;

                  case '"':
                    processString(group, c);
                    break;

                  case "#":
                  case "?":
                  case "0":
                    processPlaceholder(group, c);
                    break;

                  case ".":
                    processDecimal(group, c);
                    break;

                  case ",":
                    processThousandth(group, c);
                    break;

                  case "@":
                    processQuote(group, c);
                    break;

                  case "_":
                    processSymbolSpace(group, c);
                    break;

                  case "*":
                    processRepeat(group, c);
                    break;

                  case "[":
                    processCtrl(group, c);
                    break;

                  case "y":
                  case "Y":
                    processYear(group, c);
                    break;

                  case "m":
                  case "M":
                    processM(group, c);
                    break;

                  case "d":
                  case "D":
                    processDay(group, c);
                    break;

                  case "h":
                  case "H":
                    processHour(group, c);
                    break;

                  case "s":
                  case "S":
                    processSecond(group, c);
                    break;

                  case "a":
                  case "A":
                    processWeek(group, c);
                    break;

                  case "E":
                    processScientific(group, c);
                    break;

                  case "%":
                    processPercentage(group, c);
                    break;

                  case "/":
                    processFraction(group, c);
                    break;

                  case "1":
                  case "2":
                  case "3":
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                  case "8":
                  case "9":
                    parseNumber(group, c);
                    break;

                  case ";":
                    // 结束对当前part的处理
                    group = createNewGroup(result);
                    break;

                  case "$":
                  case "¥":
                  case "+":
                  case "(":
                  case ":":
                  case "^":
                  case "'":
                  case "{":
                  case "<":
                  case "=":
                  case "-":
                  case ")":
                  case "!":
                  case "&":
                  case "~":
                  case "}":
                  case ">":
                  case " ":
                    processLiteral(group, c);
                    break;

                  // 如果不能被处理成AM/PM格式，则抛出异常
                    default:
                    if (!processAM(group, c)) {
                        throw new Error("Illegal symbol: " + c);
                    }
                }
            }
            return result;
        }
        function processEscape(group) {
            var c = SymbolManager.getSymbol();
            if (!c) {
                throw new Error("escape symbol not found");
            }
            var prevElement = group[group.length - 1];
            // 向前合并字符串
            if (prevElement && prevElement.type === TOKEN_TYPE.STRING) {
                prevElement.value += c;
            } else {
                group.push({
                    type: TOKEN_TYPE.STRING,
                    value: c
                });
            }
        }
        function processString(group) {
            var str = [];
            var c;
            while (c = SymbolManager.getSymbol()) {
                if (c === '"') {
                    break;
                }
                str.push(c);
            }
            // empty
            if (!str.length) {
                return;
            }
            str = str.join("");
            var prevElement = group[group.length - 1];
            // 向前合并字符串
            if (prevElement && prevElement.type === TOKEN_TYPE.STRING) {
                prevElement.value += str;
            } else {
                group.push({
                    type: TOKEN_TYPE.STRING,
                    value: str
                });
            }
        }
        function parseNumber(group, c) {
            group.push({
                type: TOKEN_TYPE.STRING,
                value: c
            });
        }
        function processLiteral(group, c) {
            var prevElement = group[group.length - 1];
            // 向前合并字符串
            if (prevElement && prevElement.type === TOKEN_TYPE.STRING) {
                prevElement.value += c;
            } else {
                group.push({
                    type: TOKEN_TYPE.STRING,
                    value: c
                });
            }
        }
        function processPlaceholder(group, c) {
            group.push({
                type: TOKEN_TYPE.NUMBER,
                value: c
            });
        }
        function processDecimal(group, c) {
            group.push({
                type: TOKEN_TYPE.DECIMAL,
                value: c
            });
        }
        function processThousandth(group, c) {
            group.push({
                type: TOKEN_TYPE.THOUSANDTH,
                value: c
            });
        }
        function processQuote(group, c) {
            group.push({
                type: TOKEN_TYPE.QUOTE,
                value: c
            });
        }
        function processSymbolSpace(group) {
            var c = SymbolManager.getSymbol();
            if (!c) {
                throw new Error("space symbol not found");
            }
            group.push({
                type: TOKEN_TYPE.SYMBOL_SPACE,
                value: c
            });
        }
        function processRepeat(group) {
            var c = SymbolManager.getSymbol();
            if (!c) {
                throw new Error("repeat symbol not found");
            }
            group.push({
                type: TOKEN_TYPE.REPEAT,
                value: c
            });
        }
        function processCtrl(group) {
            var content = [];
            var c;
            var isEnd = false;
            while (c = SymbolManager.getSymbol()) {
                if (c === "]") {
                    isEnd = true;
                    break;
                }
                content.push(c);
            }
            if (!isEnd) {
                throw new Error('directive "[]" is incomplete');
            }
            content = content.join("");
            // color
            if (COLOR.indexOf(content.toLowerCase()) !== -1) {
                group.push({
                    type: TOKEN_TYPE.COLOR,
                    value: _ucfirst(content)
                });
            } else if (/^dbnum([12])$/i.test(content)) {
                group.push({
                    type: TOKEN_TYPE.DBNUM,
                    value: +RegExp.$1
                });
            } else if (/^\$-([48]04)$/.test(content)) {
                group.push({
                    type: TOKEN_TYPE.LOCALE,
                    value: +RegExp.$1
                });
            } else if (/^(h{1,2}|m{1,2}|s{1,2})$/i.test(content)) {
                group.push({
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: RegExp.$1.toLowerCase()
                });
            } else {}
        }
        /* -------------------- 日期时间处理 start -------------------- */
        function processYear(group) {
            // 年份位总会清除"之前存在的未决的月份/分钟 token"
            pendingMonthMinute = null;
            lastDateTimeStatus = DATE_TIME_STATUS.YEAR;
            group.push({
                type: TOKEN_TYPE.DATE_YEAR,
                value: _getSameString("y")
            });
        }
        function processDay(group) {
            if (pendingMonthMinute) {
                pendingMonthMinute.type = TOKEN_TYPE.DATE_MONTH;
                // 解决了未决的月份/分钟值，则清除相关记录
                pendingMonthMinute = null;
            }
            // 日期位总会清除当前最近访问到的日期时间状态位。
            lastDateTimeStatus = DATE_TIME_STATUS.NONE;
            group.push({
                type: TOKEN_TYPE.DATE_DAY,
                value: _getSameString("d")
            });
        }
        function processHour(group) {
            // 小时位总会清除"之前存在的未决的月份/分钟 token"
            pendingMonthMinute = null;
            lastDateTimeStatus = DATE_TIME_STATUS.HOUR;
            group.push({
                type: TOKEN_TYPE.TIME_HOUR,
                value: _getSameString("h")
            });
        }
        function processSecond(group) {
            if (pendingMonthMinute) {
                pendingMonthMinute.type = TOKEN_TYPE.TIME_MINUTE;
                // 解决了未决的月份/分钟值，则清除相关记录
                pendingMonthMinute = null;
                // 同时清除最近访问到的日期时间状态位
                lastDateTimeStatus = DATE_TIME_STATUS.NONE;
            } else {
                lastDateTimeStatus = DATE_TIME_STATUS.SECOND;
            }
            group.push({
                type: TOKEN_TYPE.TIME_SECOND,
                value: _getSameString("s")
            });
        }
        function processWeek(group, c) {
            var str = [ c ];
            while (SymbolManager.matchNextString("a", true)) {
                str.push("a");
                SymbolManager.freeSymbol(1);
            }
            if (str.length === 3) {
                group.push({
                    type: TOKEN_TYPE.DATE_SHORT_WEEK,
                    value: "aaa"
                });
            } else if (str.length > 3) {
                group.push({
                    type: TOKEN_TYPE.DATE_LONG_WEEK,
                    value: "aaaa"
                });
            } else if (!processAM(group, c)) {
                throw new Error("Illegal symbol: " + c);
            }
        }
        function processM(group) {
            var mStr = _getSameString("m");
            var token = {
                type: TOKEN_TYPE.DATE_MONTH,
                value: mStr
            };
            group.push(token);
            // 长度大于2的M序列直接可判定为月份
            if (mStr.length > 2) {
                return;
            }
            // 记录最近访问的token记录的副本
            var tmpStatus = lastDateTimeStatus;
            // 清除前一个未决的token
            pendingMonthMinute = null;
            // 清除最近遇到的token记录
            lastDateTimeStatus = DATE_TIME_STATUS.NONE;
            switch (tmpStatus) {
              // 未遇到可消歧义的token
                case DATE_TIME_STATUS.NONE:
                pendingMonthMinute = token;
                break;

              case DATE_TIME_STATUS.YEAR:
                token.type = TOKEN_TYPE.DATE_MONTH;
                break;

              case DATE_TIME_STATUS.DAY:
                // ignore
                // 日期位无意义
                break;

              case DATE_TIME_STATUS.HOUR:
                token.type = TOKEN_TYPE.TIME_MINUTE;
                break;

              case DATE_TIME_STATUS.SECOND:
                token.type = TOKEN_TYPE.TIME_MINUTE;
                break;
            }
        }
        function _getSameString(symbol) {
            symbol = symbol.toLowerCase();
            var str = [ symbol ];
            while (SymbolManager.matchNextSymbol(symbol, true)) {
                SymbolManager.getSymbol();
                str.push(symbol);
            }
            return str.join("");
        }
        /* -------------------- 日期时间处理 end -------------------- */
        /* -------------- am/pm处理 start -------------- */
        function processAM(group, c) {
            var match = null;
            if (c === "a" || c === "A") {
                if (SymbolManager.matchNextString("m/pm", true)) {
                    match = [];
                    match[0] = c + SymbolManager.getSymbol();
                    SymbolManager.freeSymbol(1);
                    match[1] = SymbolManager.getSymbol() + SymbolManager.getSymbol();
                } else if (SymbolManager.matchNextString("/p", true)) {
                    match = [];
                    match[0] = c;
                    SymbolManager.freeSymbol(1);
                    match[1] = SymbolManager.getSymbol();
                }
            } else if (c === "上") {
                if (SymbolManager.matchNextString("午/下午", true)) {
                    match = [ "上午", "下午" ];
                    SymbolManager.freeSymbol(4);
                }
            }
            if (match === null) {
                return false;
            }
            group.push({
                type: TOKEN_TYPE.AMPM,
                value: match
            });
            return true;
        }
        /* -------------- am/pm处理 end -------------- */
        function processScientific(group, c) {
            var next = SymbolManager.getSymbol();
            if (next === "+") {
                group.push({
                    type: TOKEN_TYPE.SCIENTIFIC,
                    value: "E+"
                });
            } else if (next) {
                group.push({
                    type: TOKEN_TYPE.SCIENTIFIC,
                    value: "E-"
                });
            } else {
                throw new Error("Illegal symbol: " + c);
            }
        }
        /* ---------- 百分比处理 ----------- */
        function processPercentage(group) {
            group.push({
                type: TOKEN_TYPE.PERCENTAGE,
                value: "%"
            });
        }
        function processFraction(group) {
            group.push({
                type: TOKEN_TYPE.FRACTION,
                value: "/"
            });
        }
        function _ucfirst(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }
    }
};

//src/formatter/formatter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[22] = {
    value: function(require) {
        var NumberForamt = _p.r(23);
        return {
            format: function(value, tokens) {
                var group;
                /* ---- 数字处理 ---- */
                if (typeof value === "number") {
                    if (value > 0) {
                        group = tokens[0];
                    } else if (value < 0) {
                        group = tokens[1];
                    } else {
                        group = tokens[2];
                    }
                    if (!group) {
                        return value;
                    }
                    if (group.tokens.length === 0) {
                        return "";
                    }
                    // 所有数字都按非负数处理
                    value = Math.abs(value);
                    return NumberForamt.exec(value, group);
                }
                /* ---- 文本处理 ---- */
                value += "";
                group = tokens[3];
                if (!group) {
                    return value;
                }
                if (group.tokens.length === 0) {
                    return "";
                }
            }
        };
    }
};

//src/formatter/number/number.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[23] = {
    value: function(require) {
        var DateTime = _p.r(25);
        var Scientific = _p.r(28);
        var Numerical = _p.r(27);
        var Fraction = _p.r(26);
        var VALUE_TYPE = _p.r(18);
        return {
            exec: function(value, group) {
                if (!group) {
                    return {
                        type: VALUE_TYPE.NUMBER,
                        color: null,
                        value: value
                    };
                }
                if (group.tokens.length === 0) {
                    return {
                        type: VALUE_TYPE.NUMBER,
                        color: null,
                        value: ""
                    };
                }
                group = $.extend(true, {}, group);
                // 时间日期
                if (group.date || group.time) {
                    return DateTime.exec(value, group);
                }
                // 科学计数法
                if (group.scientific) {
                    return Scientific.exec(value, group);
                }
                if (group.fraction) {
                    return Fraction.exec(value, group);
                }
                // 数值处理（货币也归类到数字里）
                return Numerical.exec(value, group);
            }
        };
    }
};

//src/formatter/number/standard-fraction.js
/**
 * @file 用连分数解法获取一个数的分式。该分式的分母具有指定的位数
 * @author hancong03@baiud.com
 */
_p[24] = {
    value: function() {
        return {
            /**
         * 获取指定值的分数表示值。该分数具有count指定的位数
         * 返回的结果值是一个数组，其中数组的每个元素解释如下：
         * 0 -> 分数的整数部分
         * 1 -> 分数的分子部分
         * 2 -> 分数的分母部分
         * @param value 需要转换的小数值
         * @param count 指定分母的位数
         * @returns {*}
         */
            getFraction: function(value, count) {
                var tokens = getTokens(value);
                return parse(tokens, count);
            }
        };
        function parse(tokens, count) {
            // 结果： 元素0代表整数部分，元素1代表分子，元素2代表分母
            var result = [ tokens.shift() ];
            return result.concat(parseFraction(tokens, count));
        }
        function parseFraction(tokens, count) {
            var max = Math.pow(10, count) - 1;
            return checkMax(tokens, max);
        }
        function getTokens(value, count) {
            var decimal = (value + "").replace(/^-?\d+\./, "");
            var integer = Math.pow(10, decimal.length);
            decimal = parseInt(decimal, 10);
            var result = gcd(integer, decimal);
            result.unshift(Math.floor(value));
            return result;
        }
        function checkMax(tokens, max) {
            if (tokens[0] > max) {
                return [ 0, 0 ];
            }
            var result;
            while ((result = calculate(tokens, max)) === null) {
                tokens.pop();
            }
            return result;
        }
        function calculate(tokens, max) {
            if (tokens.length === 1) {
                return [ 1, tokens[0] ];
            }
            var tmp;
            var numerator = 1;
            var denominator = tokens[tokens.length - 1];
            for (var i = tokens.length - 2; i >= 0; i--) {
                tmp = tokens[i] * denominator + numerator;
                if (tmp > max) {
                    return null;
                }
                numerator = denominator;
                denominator = tmp;
            }
            return [ numerator, denominator ];
        }
        function gcd(a, b) {
            var result = [];
            var t;
            var max = 20;
            while (b != 0 && max > 0) {
                max--;
                t = b;
                result.push(Math.floor(a / b));
                b = a % b;
                a = t;
            }
            return result;
        }
    }
};

//src/formatter/number/types/date-time.js
/**
 * @file 日期时间解析器
 * @author hancong03@baiud.com
 */
_p[25] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        var DateTimeConverter = _p.r(10);
        var DBNumConverter = _p.r(12);
        var MEDIUM_MONTH = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var SHORT_MONTH = [ "", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ];
        var FULL_MONTH = [ "", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var SHORT_WEEKDAY = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
        var FULL_WEEKDAY = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday" ];
        var SHORT_LOCALE_WEEK = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
        var LONG_LOCALE_WEEK = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
        var VALUE_TYPE = _p.r(18);
        return {
            exec: function(value, group) {
                if (value < 0) {
                    return "######";
                }
                var dateValue;
                var timeValue;
                if (group.date) {
                    dateValue = DateTimeConverter.numberToDate(value);
                }
                if (group.time) {
                    timeValue = DateTimeConverter.numberToTime(value);
                }
                var result = [];
                var tokens = group.tokens;
                var token;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    switch (token.type) {
                      case TOKEN_TYPE.STRING:
                        result.push({
                            type: TOKEN_TYPE.STRING,
                            value: token.value
                        });
                        break;

                      case TOKEN_TYPE.SYMBOL_SPACE:
                        result.push({
                            type: TOKEN_TYPE.STRING,
                            value: " "
                        });
                        break;

                      case TOKEN_TYPE.THOUSANDTH:
                      case TOKEN_TYPE.REPEAT:
                        // ingore
                        break;

                      case TOKEN_TYPE.TIMESTAMP:
                        result.push(parseTimestamp(timeValue, token.value));
                        break;

                      case TOKEN_TYPE.DATE_YEAR:
                        result.push(parseYear(dateValue, token.value));
                        break;

                      case TOKEN_TYPE.DATE_MONTH:
                        result.push(parseMonth(dateValue, token.value));
                        break;

                      case TOKEN_TYPE.DATE_DAY:
                        result.push(parseDay(dateValue, token.value));
                        break;

                      case TOKEN_TYPE.DATE_LONG_WEEK:
                      case TOKEN_TYPE.DATE_SHORT_WEEK:
                        result.push(parseWeek(dateValue, token.value));
                        break;

                      case TOKEN_TYPE.TIME_HOUR:
                        result.push(parseHour(timeValue, token.value));
                        break;

                      case TOKEN_TYPE.TIME_MINUTE:
                        result.push(parseMinute(timeValue, token.value));
                        break;

                      case TOKEN_TYPE.TIME_SECOND:
                        result.push(parseSecond(timeValue, token.value));
                        break;

                      case TOKEN_TYPE.AMPM:
                        result.push(parseAM(timeValue, token.value));
                        break;

                      default:
                        throw new Error("error code");
                    }
                }
                value = DBNumConverter.convert(result, group.dbnum, group.locale);
                var type;
                if (group.date && group.time) {
                    type = VALUE_TYPE.DATETIME;
                } else if (group.date) {
                    type = VALUE_TYPE.DATE;
                } else {
                    type = VALUE_TYPE.TIME;
                }
                return {
                    type: type,
                    color: group.color || null,
                    value: value
                };
            }
        };
        /* ----------- 日期解析函数 ------------ */
        function parseYear(dateValue, symbol) {
            if (symbol === "yy") {
                return {
                    type: TOKEN_TYPE.DATE_YEAR,
                    value: dateValue.year % 100 + ""
                };
            } else if (symbol === "yyyy") {
                return {
                    type: TOKEN_TYPE.DATE_YEAR,
                    value: dateValue.year + ""
                };
            }
        }
        function parseMonth(dateValue, symbol) {
            switch (symbol) {
              case "m":
                return {
                    type: TOKEN_TYPE.DATE_MONTH,
                    value: dateValue.month + ""
                };

              case "mm":
                return {
                    type: TOKEN_TYPE.DATE_MONTH,
                    value: dateValue.month < 10 ? "0" + dateValue.month : "" + dateValue.month
                };

              case "mmm":
                return {
                    type: TOKEN_TYPE.STRING,
                    value: MEDIUM_MONTH[dateValue.month]
                };
                break;

              case "mmmmm":
                return {
                    type: TOKEN_TYPE.STRING,
                    value: SHORT_MONTH[dateValue.month]
                };
                break;

              // 缺省格式
                case "mmmm":
              default:
                return {
                    type: TOKEN_TYPE.STRING,
                    value: FULL_MONTH[dateValue.month]
                };
                break;
            }
        }
        function parseDay(dateValue, symbol) {
            switch (symbol) {
              case "d":
                return {
                    type: TOKEN_TYPE.DATE_DAY,
                    value: dateValue.day + ""
                };

              case "dd":
                return {
                    type: TOKEN_TYPE.DATE_DAY,
                    value: dateValue.day < 10 ? "0" + dateValue.day : "" + dateValue.day
                };

              case "ddd":
                return {
                    type: TOKEN_TYPE.STRING,
                    value: SHORT_WEEKDAY[dateValue.weekday]
                };
                break;

              // 缺省格式
                case "dddd":
              default:
                return {
                    type: TOKEN_TYPE.STRING,
                    value: FULL_WEEKDAY[dateValue.weekday]
                };
                break;
            }
        }
        function parseWeek(dateValue, symbol) {
            switch (symbol) {
              case "aaa":
                return {
                    type: TOKEN_TYPE.STRING,
                    value: SHORT_LOCALE_WEEK[dateValue.weekday]
                };

              case "aaaa":
                return {
                    type: TOKEN_TYPE.STRING,
                    value: LONG_LOCALE_WEEK[dateValue.weekday]
                };
            }
        }
        /* ------------ 时间解析函数 ------------ */
        function parseHour(timeValue, symbol) {
            var hour = timeValue.am ? timeValue.hour12 : timeValue.hour;
            switch (symbol) {
              case "h":
                return {
                    type: TOKEN_TYPE.TIME_HOUR,
                    value: hour + ""
                };

              case "hh":
              default:
                return {
                    type: TOKEN_TYPE.TIME_HOUR,
                    value: hour < 10 ? "0" + hour : "" + hour
                };
            }
        }
        function parseMinute(timeValue, symbol) {
            switch (symbol) {
              case "m":
                return {
                    type: TOKEN_TYPE.TIME_MINUTE,
                    value: timeValue.minute + ""
                };

              case "mm":
              default:
                return {
                    type: TOKEN_TYPE.HOUR,
                    value: timeValue.minute < 10 ? "0" + timeValue.minute : "" + timeValue.minute
                };
            }
        }
        function parseSecond(timeValue, symbol) {
            switch (symbol) {
              case "s":
                return {
                    type: TOKEN_TYPE.TIME_SECOND,
                    value: timeValue.second + ""
                };

              case "ss":
              default:
                return {
                    type: TOKEN_TYPE.TIME_SECOND,
                    value: timeValue.second < 10 ? "0" + timeValue.second : "" + timeValue.second
                };
            }
        }
        function parseAM(timeValue, symbol) {
            return {
                type: TOKEN_TYPE.STRING,
                value: timeValue.am ? symbol[0] : symbol[1]
            };
        }
        function parseTimestamp(timeValue, symbol) {
            switch (symbol) {
              case "s":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalSecond
                };

              case "ss":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalSecond < 10 ? "0" + timeValue.totalSecond : "" + timeValue.totalSecond
                };

              case "m":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalMinute
                };

              case "mm":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalMinute < 10 ? "0" + timeValue.totalMinute : "" + timeValue.totalMinute
                };

              case "h":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalHour
                };

              case "hh":
                return {
                    type: TOKEN_TYPE.TIMESTAMP,
                    value: timeValue.totalHour < 10 ? "0" + timeValue.totalHour : "" + timeValue.totalHour
                };
            }
        }
    }
};

//src/formatter/number/types/fraction.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[26] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        var StandardFraction = _p.r(24);
        var Utils = _p.r(29);
        var VALUE_TYPE = _p.r(18);
        return {
            exec: function(value, group) {
                var info = {
                    // 整数部分占位符个数
                    integer: 0,
                    // 分子
                    numerator: 0,
                    // 分母
                    denominator: 0,
                    // 分母指定值
                    value: []
                };
                var tokens = analyzeTokens(group.tokens, info);
                var result;
                // 无整数部分
                if (info.integer === 0) {
                    result = applyCodeNoInteger(value, tokens, info);
                } else {
                    result = applyCode(value, tokens, info);
                }
                return {
                    type: VALUE_TYPE.FRACTION,
                    color: group.color || null,
                    value: result
                };
            }
        };
        function applyCodeNoInteger(value, tokens, info) {
            var numerator;
            var denominator;
            var tmp;
            // 整数可直接确定分子和分母
            if (Number.isInteger(value)) {
                numerator = value;
                denominator = 1;
            } else {
                if (info.value.length) {
                    denominator = +info.value.join("");
                    numerator = Math.round(value * denominator);
                } else {
                    tmp = StandardFraction.getFraction(value, info.denominator);
                    denominator = tmp[2];
                    numerator = tmp[0] * denominator + tmp[1];
                }
            }
            return replace(tokens, [ "", numerator + "", denominator + "" ]);
        }
        function applyCode(value, tokens, info) {
            var numerator;
            var denominator;
            var integer;
            var tmp;
            // 整数可直接确定分子和分母
            if (Number.isInteger(value)) {
                integer = value;
                numerator = value;
                denominator = 1;
            } else {
                if (info.value.length) {
                    denominator = +info.value.join("");
                    integer = Math.floor(value);
                    numerator = Math.round((value - integer) * denominator);
                } else {
                    tmp = StandardFraction.getFraction(value, info.denominator);
                    integer = tmp[0];
                    numerator = tmp[1];
                    denominator = tmp[2];
                }
            }
            if (integer === 0) {
                integer = "";
            }
            return replace(tokens, [ integer + "", numerator + "", denominator + "" ]);
        }
        /* ------- code替换 ------- */
        function replace(tokens, values) {
            var result = [];
            _replaceInteger(tokens.integer, values[0]);
            _replaceNumerator(tokens.numerator, values[1]);
            _replaceDenominator(tokens.denominator, values[2]);
            for (var i = 0, len = result.length; i < len; i++) {
                result[i] = result[i].value;
            }
            return result.join("");
            function _replaceNumerator(currentTokens, value) {
                result = result.concat(Utils.parseInteger(currentTokens, value.split("")));
            }
            function _replaceDenominator(currentTokens, value) {
                result = result.concat(Utils.parseDecimal(currentTokens, value.split("")));
            }
            function _replaceInteger(currentTokens, value) {
                result = result.concat(Utils.parseInteger(currentTokens, value.split("")));
            }
        }
        /* --------- 分析格式token，便于计算显示的值 ------- */
        function analyzeTokens(tokens, info) {
            var newTokens = {
                integer: [],
                numerator: [],
                denominator: []
            };
            //tokens.reverse();
            /* ---- 分析分母部分 --- */
            analyzeDenominator(newTokens, tokens, info);
            /* ---- 分析分子部分 --- */
            analyzeNumerator(newTokens, tokens, info);
            ///* ---- 分析整数部分 --- */
            analyzerInteger(newTokens, tokens, info);
            return newTokens;
        }
        function analyzeDenominator(newTokens, tokens, info) {
            for (var i = 0, len = tokens.length; i < len; i++) {
                if (tokens[i].value === "/") {
                    break;
                }
            }
            tokens = tokens.splice(i);
            var checked = false;
            var currentTokens = newTokens.denominator;
            var isContinue = true;
            var token;
            var denominators = [];
            // 获取分母
            while (isContinue && (token = tokens.shift())) {
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                    if ("123456789".indexOf(token.value) !== -1) {
                        denominators.push(token.value);
                        break;
                    }
                    if (denominators.length > 0) {
                        isContinue = false;
                        checkDenominator();
                        currentTokens.push(token);
                        break;
                    }
                    currentTokens.push(token);
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.NUMBER:
                    denominators.push(token.value);
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    currentTokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
            // 获取剩余的字符串：所有token都看做字符串
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = tokens[i];
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                  case TOKEN_TYPE.NUMBER:
                    currentTokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: token.value
                    });
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    currentTokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
            if (!checked) {
                checkDenominator();
            }
            function checkDenominator() {
                checked = true;
                var v = +denominators.join("");
                // 视为占位符
                if (isNaN(v) || v === 0) {
                    info.denominator = denominators.length;
                    for (var i = 0, len = denominators.length; i < len; i++) {
                        currentTokens.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: denominators[i]
                        });
                    }
                } else {
                    info.value = denominators;
                    info.denominator = denominators.length;
                    // 添加相应个数的占位符
                    for (var i = 0, len = denominators.length; i < len; i++) {
                        currentTokens.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: "0"
                        });
                    }
                }
            }
        }
        function analyzeNumerator(newTokens, tokens, info) {
            var currentTokens = newTokens.numerator;
            var tmp = [];
            var token;
            for (var i = tokens.length - 1; i >= 0; i--) {
                token = tokens[i];
                if (token.type === TOKEN_TYPE.STRING && token.value.indexOf(" ") !== -1) {
                    tokens.splice(i + 1);
                    break;
                }
                tmp.push(token);
            }
            tokens = tmp;
            while (token = tokens.shift()) {
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                    currentTokens.push(token);
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.NUMBER:
                    info.numerator++;
                    currentTokens.push(token);
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    currentTokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
        }
        function analyzerInteger(newTokens, tokens, info) {
            var currentTokens = newTokens.integer;
            var token;
            while (token = tokens.shift()) {
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                    currentTokens.push(token);
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.NUMBER:
                    info.integer++;
                    currentTokens.push(token);
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    currentTokens.push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
        }
    }
};

//src/formatter/number/types/numerical.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[27] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        var DBNumConverter = _p.r(12);
        var ThousandthConverter = _p.r(13);
        var Utils = _p.r(29);
        var VALUE_TYPE = _p.r(18);
        return {
            exec: function(value, group) {
                var info = {
                    integer: 0,
                    decimal: 0
                };
                var tokens = analyzeTokens(group.tokens, info);
                value = Utils.toFixed(value, info.decimal).split(".");
                /* ------ 处理token替换 ------- */
                var integerResult = parseInteger(tokens.integer, group.thousandth, value[0]);
                var decimalResult = parseDecimal(tokens.decimal, value[1]);
                /* ------- 合并结果，并交由DBNum处理 --------- */
                return {
                    type: VALUE_TYPE.NUMBER,
                    color: group.color || null,
                    value: DBNumConverter.convert(integerResult.concat(decimalResult))
                };
            }
        };
        function parseInteger(tokens, hasThousandth, value) {
            var result = Utils.parseInteger(tokens, value.split(""));
            if (hasThousandth) {
                result = ThousandthConverter.convert(result);
            }
            return result;
        }
        function parseDecimal(tokens, value) {
            return Utils.parseDecimal(tokens, (value || "").split(""));
        }
        function analyzeTokens(tokens, info) {
            var type = "integer";
            var newTokens = {
                integer: [],
                decimal: []
            };
            var token;
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = tokens[i];
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.DECIMAL:
                    type = "decimal";
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.NUMBER:
                    info[type]++;
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.QUOTE:
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    newTokens[type].push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  case TOKEN_TYPE.REPEAT:
                    // ingore
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
            return newTokens;
        }
    }
};

//src/formatter/number/types/scientific.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[28] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        var ThousandthConverter = _p.r(13);
        var Utils = _p.r(29);
        var VALUE_TYPE = _p.r(18);
        return {
            // 注意：科学计数法忽略DBNum的处理，但是仍然受千分位的影响
            exec: function(value, group) {
                var tokens = group.tokens;
                var info = {
                    // 整数位数
                    integer: 0,
                    // 小数位数
                    decimal: 0,
                    // 指数位数
                    exponent: 0
                };
                tokens = analyzeTokens(tokens, info);
                value = formatValue(value, info);
                var intStr = parseInteger(tokens.integer, group.thousandth, value.integer);
                var decimalStr = parseDecimal(tokens.decimal, value.decimal);
                var exponentStr = parseExponent(tokens.exponent, group.thousandth, value.exponent);
                // 合并结果并返回
                return {
                    type: VALUE_TYPE.SCIENTIFIC,
                    color: group.color || null,
                    value: intStr + decimalStr + exponentStr
                };
            }
        };
        function parseInteger(tokens, hasThousandth, values) {
            var result = Utils.parseInteger(tokens, values);
            if (hasThousandth) {
                result = ThousandthConverter.convert(result);
            }
            return stringify(result);
        }
        function parseDecimal(tokens, values) {
            var result = [];
            var token;
            var type;
            var v;
            while (tokens.length) {
                token = tokens.shift();
                type = token.type;
                // 遇到科学计数法符号，则停止处理整数
                if (type === TOKEN_TYPE.SCIENTIFIC) {
                    tokens.unshift(token);
                    break;
                }
                if (type !== TOKEN_TYPE.NUMBER) {
                    result.push(token);
                    continue;
                }
                v = values.shift();
                switch (token.value) {
                  case "0":
                    result.push({
                        type: TOKEN_TYPE.NUMBER,
                        value: v || "0"
                    });
                    break;

                  case "#":
                    if (v !== undefined) {
                        result.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: v
                        });
                    }
                    break;

                  case "?":
                    if (v !== undefined) {
                        result.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: v
                        });
                    } else {
                        result.push({
                            type: TOKEN_TYPE.STRING,
                            value: " "
                        });
                    }
                    break;
                }
            }
            // 小数部分不受千分位符影响
            return stringify(result);
        }
        function parseExponent(tokens, hasThousandth, exponentValue) {
            // 记法符号
            var sign = tokens.shift();
            if (sign.value === "E+") {
                if (exponentValue < 0) {
                    sign = "E-";
                } else {
                    sign = "E+";
                }
            } else {
                if (exponentValue < 0) {
                    sign = "E-";
                } else {
                    sign = "E";
                }
            }
            var result = Utils.parseInteger(tokens, (Math.abs(exponentValue) + "").split(""));
            if (hasThousandth) {
                result = ThousandthConverter.convert(result);
            }
            return sign + stringify(result);
        }
        function analyzeTokens(tokens, info) {
            var newTokens = {
                integer: [],
                decimal: [],
                exponent: []
            };
            var type = "integer";
            var token;
            // parse int
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = tokens[i];
                switch (token.type) {
                  case TOKEN_TYPE.STRING:
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.THOUSANDTH:
                    // ignore
                    break;

                  case TOKEN_TYPE.SCIENTIFIC:
                    type = "exponent";
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.DECIMAL:
                    type = "decimal";
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.NUMBER:
                    info[type]++;
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.QUOTE:
                    newTokens[type].push(token);
                    break;

                  case TOKEN_TYPE.SYMBOL_SPACE:
                    newTokens[type].push({
                        type: TOKEN_TYPE.STRING,
                        value: " "
                    });
                    break;

                  case TOKEN_TYPE.REPEAT:
                    // ingore
                    break;

                  default:
                    throw new Error("Illegal token: " + token.value);
                }
            }
            return newTokens;
        }
        function formatValue(value, info) {
            value = (value + "").replace(/^0+/, "");
            var originalCount = value.indexOf(".");
            if (originalCount === -1) {
                originalCount = value.length;
            }
            // 整数部分
            var integer = [];
            // 小数部分
            var decimal;
            value = value.replace(".", "");
            // 记录小数有效位数到小数点的数量级之差
            var diff = value.length;
            value = +value + "";
            // 计算diff值
            diff -= value.length;
            value = value.split("");
            for (var i = 0, len = info.integer; i < len; i++) {
                integer.push(value.shift() || 0);
            }
            // 四舍五入处理
            if (value.length > info.decimal) {
                value = parseFloat(integer.join("") + "." + value.join("")).toFixed(info.decimal);
                value = value.split(".");
                integer = value[0].split("");
                decimal = value[1].split("");
            } else {
                decimal = value;
            }
            return {
                integer: integer,
                decimal: decimal,
                // 指数是数值型
                exponent: originalCount - info.integer - diff
            };
        }
        function stringify(tokens) {
            var result = [];
            for (var i = 0, len = tokens.length; i < len; i++) {
                result.push(tokens[i].value);
            }
            return result.join("");
        }
    }
};

//src/formatter/number/utils.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[29] = {
    value: function(require) {
        var TOKEN_TYPE = _p.r(17);
        return {
            /**
         * 按指定的精度count返回给定数字number格式化后的值。
         * 如果number的小数位数超过指定的count，则返回值中只包含count位小数。
         * 如果number的小数位数少于指定的count，则返回值的小数位将保持不变。
         * 注意，返回值是字符串。
         * @param value
         * @param count
         */
            toFixed: function(number, count) {
                number = (parseFloat(number) + "").split(".");
                if (number.length === 1) {
                    return number[0];
                }
                if (number[1].length < count) {
                    return number.join(".");
                }
                number = number.join(".");
                return parseFloat(number).toFixed(count);
            },
            parseInteger: function(tokens, values) {
                var result = [];
                var token;
                var val;
                var lastNumberIndex = -1;
                tokens.reverse();
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    if (token.type !== TOKEN_TYPE.NUMBER) {
                        result.push(token);
                        continue;
                    }
                    lastNumberIndex = i;
                    val = values.pop();
                    switch (token.value) {
                      case "0":
                        result.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: val || "0"
                        });
                        break;

                      case "?":
                        if (!val) {
                            result.push({
                                type: TOKEN_TYPE.STRING,
                                value: " "
                            });
                        } else {
                            result.push({
                                type: TOKEN_TYPE.NUMBER,
                                value: val
                            });
                        }
                        break;

                      case "#":
                        if (val) {
                            result.push({
                                type: TOKEN_TYPE.NUMBER,
                                value: val
                            });
                        }
                        break;
                    }
                }
                if (values.length && lastNumberIndex !== -1) {
                    for (var i = values.length - 1; i >= 0; i--) {
                        lastNumberIndex += 1;
                        result.splice(lastNumberIndex, 0, {
                            type: TOKEN_TYPE.NUMBER,
                            value: values[i]
                        });
                    }
                }
                return result.reverse();
            },
            parseDecimal: function(tokens, values) {
                var result = [];
                var token;
                var val;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    if (token.type !== TOKEN_TYPE.NUMBER) {
                        result.push(token);
                        continue;
                    }
                    val = values.shift();
                    switch (token.value) {
                      case "0":
                        result.push({
                            type: TOKEN_TYPE.NUMBER,
                            value: val || "0"
                        });
                        break;

                      case "?":
                        if (!val) {
                            result.push({
                                type: TOKEN_TYPE.STRING,
                                value: " "
                            });
                        } else {
                            result.push({
                                type: TOKEN_TYPE.NUMBER,
                                value: val
                            });
                        }
                        break;

                      case "#":
                        if (val) {
                            result.push({
                                type: TOKEN_TYPE.NUMBER,
                                value: val
                            });
                        }
                        break;
                    }
                }
                return result;
            }
        };
    }
};

//src/numfmt.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[30] = {
    value: function(require) {
        var TokenEngine = _p.r(21);
        var StructedEngine = _p.r(19);
        var Formatter = _p.r(22);
        var Analyzer = _p.r(0);
        var TOKEN_CACHE = {};
        return {
            format: function(value, code) {
                var tokens = parseCode(code);
                return Formatter.format(value, tokens);
            },
            /**
         * 分析input恰当的值和类型。
         * 如果指定了有效的code值，则该分析过程将会受到code的影响，分析结果将尽量匹配code的类型。
         * @param input 需要分析的输入字符串
         * @param code 需参考的code值
         */
            analyze: function(input, code) {
                return Analyzer.analyze(input);
            }
        };
        function parseCode(code) {
            var tokens = TOKEN_CACHE[code];
            if (!tokens) {
                tokens = TokenEngine.parse(code);
                tokens = StructedEngine.parse(tokens);
                TOKEN_CACHE[code] = tokens;
            }
            return tokens;
        }
    }
};

//dev-lib/exports.js
/*!
 * 模块暴露
 */
_p[31] = {
    value: function(require) {
        window.NumfmtCode = _p.r(30);
    }
};

var moduleMapping = {
    "kf.start": 31
};

function use(name) {
    _p.r([ moduleMapping[name] ]);
}
/**
 * 模块暴露
 */

( function ( global ) {

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();