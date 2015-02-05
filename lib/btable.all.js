/*!
 * ====================================================
 * BTable - v1.0.0 - 2015-02-05
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

//src/base/clazz.js
_p[0] = {
    value: function(require) {
        var $ = _p.r(2), extend = _p.r(3);
        /**
     * 创建一个类
     * @param className 类名
     * @param defines 类定义
     * @returns {*} 根据类定义创建的构造器
     */
        function createClass(className, defines) {
            var constructor = getConstructor(defines);
            constructor = inherit(className, constructor, defines);
            return constructor;
        }
        function getConstructor(defines) {
            return defines.hasOwnProperty("constructor") ? defines.constructor : getDefaultConstructor();
        }
        function inherit(className, clazz, defines) {
            var Base = defines.base || getDefaultBaseClass(), InheritBaseClass = getInheritClass(Base), clazzChain = new InheritBaseClass(), baseFields = Base.prototype.___fields, currentFields = getFields(defines);
            // 补上缺省的__render方法
            if (!defines.__render) {
                defines.__render = function() {
                    if (this.isBadCall()) {
                        return this;
                    }
                    if (this.__rendered) {
                        return this;
                    }
                    this.callBase();
                    return this;
                };
            }
            for (var key in clazzChain) {
                if (!isOwnerFunction(key, clazzChain)) {
                    delete clazzChain[key];
                }
            }
            // 方法继承
            for (var key in defines) {
                if (defines.hasOwnProperty(key)) {
                    // 如果原型链中已经存在同名方法, 则覆盖并记录
                    if (isFunction(clazzChain[key])) {
                        defines[key].___super = clazzChain[key];
                    }
                    clazzChain[key] = defines[key];
                }
            }
            currentFields = extend({}, baseFields, currentFields);
            clazzChain.___fields = currentFields;
            clazzChain.constructor = clazz;
            clazzChain.___className = className;
            //        Base.___isConstructor = true;
            //        Base.___className = className;
            WrapperClass.___isConstructor = true;
            WrapperClass.prototype = clazzChain;
            WrapperClass.___baseClass = Base;
            WrapperClass.___className = className;
            clazz.prototype = clazzChain;
            clazz.___baseClass = Base;
            clazz.___className = className;
            function WrapperClass() {
                this.___callBase.apply(this, arguments);
                clazz.apply(this, arguments);
                this.__render && this.__render();
            }
            return WrapperClass;
        }
        /**
     * 获取继承链中的父类的代理类
     */
        function getInheritClass(baseClass) {
            function InheritBaseClass() {}
            InheritBaseClass.prototype = baseClass.prototype;
            return InheritBaseClass;
        }
        // 获取默认构造函数, 有别于getDefaultBaseClass
        function getDefaultConstructor() {
            function DefaultConstructor() {}
            DefaultConstructor.prototype = ObjectClass.prototype;
            DefaultConstructor.prototype.constructor = DefaultConstructor;
            return DefaultConstructor;
        }
        // 防止根继承时, 获取到同一个构造函数
        function getDefaultBaseClass() {
            function RootClass() {
                this.___initField();
                this.___callBase();
                this.__render && this.__render();
            }
            RootClass.prototype = ObjectClass.prototype;
            RootClass.prototype.constructor = RootClass;
            RootClass.___isConstructor = true;
            RootClass.___className = "RootClass" + +new Date();
            return RootClass;
        }
        function isOwnerFunction(key, obj) {
            if (!obj.hasOwnProperty(key)) {
                return false;
            }
            if (typeof obj[key] !== "function") {
                return false;
            }
            return true;
        }
        function isFunction(target) {
            return typeof target === "function";
        }
        function getFields(defines) {
            var fields = {};
            for (var key in defines) {
                if (defines.hasOwnProperty(key) && typeof defines[key] !== "function") {
                    fields[key] = defines[key];
                    delete defines[key];
                }
            }
            return fields;
        }
        /*---------------- 基础类定义*/
        function ObjectClass() {
            this.___initField();
            this.___callBase();
            this.__render && this.__render();
        }
        $.extend(ObjectClass.prototype, {
            /**
         * 不允许访问
         */
            ___fields: {},
            /**
         * 不允许手动调用
         * @private
         */
            ___callBase: function() {
                var constructor = arguments.callee.caller;
                if (constructor.___baseClass) {
                    constructor.___baseClass.apply(this, arguments);
                }
            },
            /**
         * 不允许手动调用
         * @private
         */
            ___initField: function() {
                var fields = this.___fields;
                extend(this, fields);
            },
            /**
         * 方法中可以调用,构造器中禁止调用该方法
         * 调用该方法可以invoke 父类的同名方法, 以实现继承super功能
         */
            callBase: function() {
                var method = arguments.callee.caller;
                if (method.___super) {
                    method.___super.apply(this, arguments);
                }
            },
            /**
         * 判定本次方法调用是否是一次不安全的调用, 如果不安全, 返回true, 否则返回false
         */
            isBadCall: function() {
                var originClass = this.___className, // 待验证方法
                verifyMethod = arguments.callee.caller, // caller
                caller = verifyMethod.caller;
                return caller.___isConstructor && originClass !== caller.___className;
            }
        });
        return {
            create: createClass
        };
    }
};

//src/base/env-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[1] = {
    value: function(require) {
        return _p.r(0).create("EnvManager", {
            context: null,
            target: null,
            constructor: function(context, target) {
                this.context = context;
                this.target = target;
                this.init();
            },
            getContext: function() {
                return this.context;
            },
            init: function() {}
        });
    }
};

//src/base/jquery.js
/**
 * jquery模块封装
 */
_p[2] = {
    value: function(require) {
        var jQuery = window.jQuery;
        jQuery._clone = function(data) {
            return JSON.parse(JSON.stringify(data));
        };
        return window.jQuery;
    }
};

//src/base/kit/extend.js
/**
 * 弥补jQuery的extend在克隆对象和数组时存在的问题
 */
_p[3] = {
    value: function(require) {
        var $ = _p.r(2);
        function extend(target) {
            var type = null, isPlainObject = false, isArray = false, sourceObj = null;
            if (arguments.length === 1) {
                return copy(target);
            }
            $.each([].slice.call(arguments, 1), function(i, source) {
                for (var key in source) {
                    sourceObj = source[key];
                    if (!source.hasOwnProperty(key)) {
                        continue;
                    }
                    isPlainObject = $.isPlainObject(sourceObj);
                    isArray = $.isArray(sourceObj);
                    if (!isPlainObject && !isArray) {
                        target[key] = source[key];
                    } else if (isPlainObject) {
                        if (!$.isPlainObject(target[key])) {
                            target[key] = {};
                        }
                        target[key] = extend(target[key], sourceObj);
                    } else if (isArray) {
                        target[key] = extend(sourceObj);
                    }
                }
            });
            return target;
        }
        function copy(target) {
            var tmp = null;
            if ($.isPlainObject(target)) {
                return extend({}, target);
            } else if ($.isArray(target)) {
                tmp = [];
                $.each(target, function(index, item) {
                    if ($.isPlainObject(item) || $.isArray(item)) {
                        tmp.push(copy(item));
                    } else {
                        tmp.push(item);
                    }
                });
                return tmp;
            } else {
                return target;
            }
        }
        return extend;
    }
};

//src/btable.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[4] = {
    value: function(require, exports, module) {
        var Context = _p.r(72);
        var BTable = _p.r(0).create("BTable", {
            context: null,
            constructor: function(target) {
                this.context = new Context(target);
            },
            execCommand: function(name) {
                return this.context.execCommand(null, name, [].slice.call(arguments, 1));
            },
            queryCommandValue: function(name) {
                return this.context.queryCommandValue(null, name, [].slice.call(arguments, 1));
            },
            on: function(evtName, evtHandler) {
                return this.context.addEventListener(evtName, evtHandler);
            }
        });
        $.extend(BTable, {
            module: function(modules) {
                Context.registerModule(modules);
            },
            command: function(commands) {
                Context.addCommand(commands);
            },
            mapEvent: function() {
                Context.mapEvent.apply(Context, arguments);
            },
            plugin: function(pluginName, pluginImpl) {
                Context.registerPlugin(pluginName, pluginImpl);
            }
        });
        return BTable;
    }
};

//src/commands.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[5] = {
    value: function(require) {
        return {
            basic: {
                undo: _p.r(70),
                redo: _p.r(69)
            },
            core: {
                init: _p.r(38),
                write: _p.r(44),
                resize: _p.r(41),
                move: _p.r(39),
                scroll: _p.r(42),
                range: _p.r(40),
                style: _p.r(43),
                clear: _p.r(36),
                "export": _p.r(37)
            },
            system: {
                sort: _p.r(115),
                input: _p.r(114)
            }
        };
    }
};

//src/common/cell.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[6] = {
    value: function(require) {
        return _p.r(0).create("Cell", {
            reference: null,
            base: _p.r(89),
            init: function() {
                this.registerCommonService({
                    "c.cell.viewrect": this.getViewRect,
                    "c.cell.compare": this.compare,
                    "c.cell.coordinate": this.getCellCoordinate
                });
            },
            getViewRect: function(struct, start, end) {
                var tmp = this.compare(start, end);
                var min = tmp.min;
                var max = tmp.max;
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                // ---------- 计算定位坐标点， 如果给定的区域已经超出当前的视窗范围（不可见的情况下）， 则返回null
                var location;
                if (min.row > viewEnd.row || max.row < viewStart.row || min.col > viewEnd.col || max.col < viewStart.col) {
                    return null;
                }
                var result = {
                    overflow: {
                        top: false,
                        left: false,
                        bottom: false,
                        right: false
                    }
                };
                // ---------- 检查是否有溢出
                if (min.row < viewStart.row) {
                    result.overflow.top = true;
                    min.row = viewStart.row;
                }
                if (min.col < viewStart.col) {
                    result.overflow.left = true;
                    min.col = viewStart.col;
                }
                if (max.row > viewEnd.row) {
                    result.overflow.bottom = true;
                    max.row = viewEnd.row;
                }
                if (max.col > viewEnd.col) {
                    result.overflow.right = true;
                    max.col = viewEnd.col;
                }
                // ----------- 计算坐标
                location = this.getCellCoordinate(struct, min.row, min.col);
                result.x = location.x;
                result.y = location.y;
                // ----------- 计算size
                result.width = this.getColumnsWidth(struct, min.col, max.col), result.height = this.getRowsHeight(struct, min.row, max.row);
                return result;
            },
            getColumnsWidth: function(struct, startCol, endCol) {
                var grid = struct.getGrid();
                var borderWidth = struct.getBorderWidth();
                var colWidth = grid.width;
                //var widths = [];
                //
                //for (var i = startCol, limit = endCol; i <= limit; i++) {
                //    if (i > )
                //}
                var widths = colWidth.slice(startCol, endCol + 1);
                return sum(widths) + (widths.length - 1) * borderWidth;
            },
            getRowsHeight: function(struct, startRow, endRow) {
                var grid = struct.getGrid();
                var borderWidth = struct.getBorderWidth();
                var rowHeights = grid.height;
                var heights = rowHeights.slice(startRow, endRow + 1);
                return sum(heights) + (heights.length - 1) * borderWidth;
            },
            getCellCoordinate: function(struct, row, col) {
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var grid = struct.getGrid();
                var borderWidth = struct.getBorderWidth();
                var offset = struct.getOffset();
                var visibleCount = struct.getVisibleCount();
                var index;
                var x;
                var y;
                // --- 横坐标
                if (row < viewStart.row) {
                    index = viewStart.row;
                    y = grid.row[0];
                    while (index > row) {
                        index--;
                        y -= grid.height[index] + borderWidth;
                    }
                } else if (row > viewEnd.row) {
                    index = viewEnd.row;
                    y = grid.row[visibleCount.row];
                    while (index < row) {
                        index++;
                        y += grid.height[index] + borderWidth;
                    }
                } else {
                    y = grid.row[row - viewStart.row];
                }
                // ---- 纵坐标
                if (col < viewStart.col) {
                    index = viewStart.col;
                    x = grid.col[0];
                    while (index > col) {
                        index--;
                        x -= grid.width[index] + borderWidth;
                    }
                } else if (col > viewEnd.col) {
                    index = viewEnd.col;
                    x = grid.col[visibleCount.col];
                    while (index < col) {
                        index++;
                        x += grid.width[index] + borderWidth;
                    }
                } else {
                    x = grid.col[col - viewStart.col];
                }
                return {
                    x: x + offset,
                    y: y + offset
                };
            },
            compare: function(start, end) {
                return {
                    min: {
                        row: Math.min(start.row, end.row),
                        col: Math.min(start.col, end.col)
                    },
                    max: {
                        row: Math.max(start.row, end.row),
                        col: Math.max(start.col, end.col)
                    }
                };
            }
        });
        function sum(arrs) {
            var sum = 0;
            for (var i = 0, len = arrs.length; i < len; i++) {
                sum += arrs[i];
            }
            return sum;
        }
    }
};

//src/common/color.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[7] = {
    value: function(require) {
        var NAMES = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        };
        return _p.r(0).create("Color", {
            base: _p.r(89),
            init: function() {
                this.registerCommonService({
                    "parse.color": this.parse
                });
            },
            parse: function(value) {
                if (!value) {
                    return undefined;
                }
                value = value.replace(/\s+/g, "");
                if (/^#[0-9a-f]{3}$/i.test(value)) {
                    value = value.split("");
                    return "#" + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
                }
                if (/^#[0-9a-f]{6}$/i.test(value)) {
                    return value;
                }
                var r;
                var g;
                var b;
                var a;
                if (/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.test(value)) {
                    r = parseInt(RegExp.$1, 10);
                    g = parseInt(RegExp.$2, 10);
                    b = parseInt(RegExp.$3, 10);
                    if (isNaN(r) || isNaN(g) || isNaN(b)) {
                        return undefined;
                    }
                    return this.__toStandardColor(r.toString(16), g.toString(16), b.toString(16));
                }
                if (/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),([0-1.]+)\)$/i.test(value)) {
                    r = parseInt(RegExp.$1, 10);
                    g = parseInt(RegExp.$2, 10);
                    b = parseInt(RegExp.$3, 10);
                    a = parseFloat(RegExp.$4);
                    if (a === 0) {
                        return undefined;
                    }
                    if (isNaN(r) || isNaN(g) || isNaN(b)) {
                        return undefined;
                    }
                    return this.__toStandardColor(r.toString(16), g.toString(16), b.toString(16));
                }
                return NAMES[value.toLowerCase()];
            },
            __toStandardColor: function(r, g, b) {
                if (r.length === 1) {
                    r = "0" + r;
                }
                if (g.length === 1) {
                    g = "0" + g;
                }
                if (b.length === 1) {
                    b = "0" + b;
                }
                return "#" + r + g + b;
            }
        });
    }
};

//src/common/content.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[8] = {
    value: function(require) {
        return _p.r(0).create("Content", {
            base: _p.r(89),
            init: function() {
                this.registerCommonService({
                    "c.encode.content": this.encodeContent,
                    "c.decode.content": this.decodeContent
                });
            },
            decodeContent: function(content) {
                if (!content) {
                    return content;
                }
                return content.replace(/\n/g, "<br>");
            },
            encodeContent: function(content) {
                if (!content) {
                    return content;
                }
                return content.replace(/<br[^>]*>/gi, "\n");
            }
        });
    }
};

//src/common/formula/analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[9] = {
    value: function(require) {
        var Parser = _p.r(23);
        var TYPE = Parser.TYPE;
        var PARSED_TYPE = _p.r(29);
        var ERROR = _p.r(14);
        var RangeAnalyzer = _p.r(27);
        var OperatorAnalyzer = _p.r(26);
        var currentTokens;
        return {
            getTokens: function(content) {
                var tokens = Parser.getTokens(content);
                currentTokens = tokens;
                return restruct(tokens);
            }
        };
        function restruct(tokens) {
            var result = [];
            var token;
            while (tokens.moveNext()) {
                token = restructToken(tokens.current());
                if (token.error) {
                    return token;
                }
                result.push(token.value);
            }
            return {
                error: false,
                value: result
            };
        }
        function restructToken(token) {
            switch (token.type) {
              case TYPE.TOK_TYPE_OPERAND:
                return RangeAnalyzer.parse(token);

              case TYPE.TOK_TYPE_OP_IN:
              case TYPE.TOK_TYPE_OP_PRE:
              case TYPE.TOK_TYPE_OP_POST:
                return OperatorAnalyzer.parse(token);

              case TYPE.TOK_TYPE_FUNCTION:
                return restructFucntion(token);

              case TYPE.TOK_TYPE_SUBEXPR:
                return restructSubexpression(token);
            }
            return token;
        }
        function restructFucntion(token) {
            var result = {
                type: PARSED_TYPE.FUNCTION,
                value: {
                    name: token.value,
                    params: []
                }
            };
            var params = [];
            var closeState = false;
            var tokens = getCurrentTokens();
            // 在参数： 函数中的每一个参数被当做一个子表达式进行处理
            var subParams = [];
            while (tokens.moveNext()) {
                token = tokens.current();
                if (token.type === TYPE.TOK_TYPE_FUNCTION) {
                    if (token.subtype === TYPE.TOK_SUBTYPE_START) {
                        token = restructFucntion(token);
                    } else {
                        closeState = true;
                        break;
                    }
                } else if (token.type === TYPE.TOK_TYPE_ARGUMENT) {
                    if (subParams.length === 1) {
                        params.push(subParams[0]);
                    } else {
                        params.push({
                            type: PARSED_TYPE.SUBEXPRESSION,
                            value: subParams
                        });
                    }
                    subParams = [];
                    continue;
                } else {
                    token = restructToken(token);
                }
                if (token.error) {
                    return token;
                }
                subParams.push(token.value);
            }
            if (subParams.length === 1) {
                params.push(subParams[0]);
            } else if (subParams.length > 1) {
                params.push({
                    type: PARSED_TYPE.SUBEXPRESSION,
                    value: subParams
                });
            }
            if (!closeState) {
                return {
                    error: true,
                    value: ERROR.SYNTAX
                };
            }
            result.value.params = params;
            return {
                error: false,
                value: result
            };
        }
        function restructSubexpression(token) {
            var result = {
                type: PARSED_TYPE.SUBEXPRESSION,
                value: null
            };
            var closeState = false;
            var tokens = getCurrentTokens();
            var subTokens = [];
            while (tokens.moveNext()) {
                token = tokens.current();
                if (token.type === TYPE.TOK_TYPE_SUBEXPR) {
                    if (token.subtype === TYPE.TOK_SUBTYPE_START) {
                        token = restructSubexpression(token);
                    } else {
                        closeState = true;
                        break;
                    }
                } else {
                    token = restructToken(token);
                }
                if (token.error) {
                    return token;
                }
                subTokens.push(token.value);
            }
            if (!closeState) {
                return {
                    error: true,
                    value: ERROR.SYNTAX
                };
            }
            result.value = subTokens;
            return {
                error: false,
                value: result
            };
        }
        function getCurrentTokens() {
            return currentTokens;
        }
    }
};

//src/common/formula/arithmetic.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[10] = {
    value: function(require) {
        var PRIORITY = {
            "op_pre_+": 7,
            "op_pre_-": 7,
            "op_post_%": 6,
            "op_in_^": 5,
            "op_in_*": 4,
            "op_in_/": 4,
            "op_in_+": 3,
            "op_in_-": 3,
            "op_in_&": 2,
            "op_in_=": 1,
            "op_in_<": 1,
            "op_in_>": 1,
            "op_in_<>": 1,
            "op_in_<=": 1,
            "op_in_>=": 1
        };
        var LOGICAL_OPERATOR = {
            "=": "==",
            "<": "<",
            ">": ">",
            "<>": "!=",
            ">=": ">=",
            "<=": "<="
        };
        var CELL_VALUE_TYPE = _p.r(68);
        var ERROR = _p.r(14);
        var TYPE = _p.r(29);
        var Stack = _p.r(25);
        function toRPN(tokens) {
            var token;
            var output = [];
            var stack = new Stack();
            var op;
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = tokens[i];
                switch (token.type) {
                  case TYPE.OP_IN:
                  case TYPE.OP_PRE:
                    processOperator(token, output, stack);
                    break;

                  default:
                    output.push(token);
                    break;
                }
            }
            while (op = stack.pop()) {
                output.push(op);
            }
            return output;
        }
        function calculate(tokens) {
            var token;
            var stack = new Stack();
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = tokens[i];
                switch (token.type) {
                  case TYPE.OP_PRE:
                    token = execUnary(token, stack);
                    if (token.error) {
                        return token;
                    }
                    stack.push(token.value);
                    break;

                  case TYPE.OP_IN:
                    token = execBinary(token, stack);
                    if (token.error) {
                        return token;
                    }
                    stack.push(token.value);
                    break;

                  default:
                    stack.push(token);
                }
            }
            if (stack.length() !== 1) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            token = stack.pop();
            if (!isFinalType(token.type)) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            return {
                error: false,
                value: token
            };
        }
        function execUnary(op, stack) {
            var operand = stack.pop();
            if (!operand) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            if (op.value === "-") {
                operand = -operand.value;
            } else {
                operand = +operand.value;
            }
            if (isNaN(operand)) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            return {
                error: false,
                value: {
                    type: TYPE.NUMERIC,
                    value: operand
                }
            };
        }
        function execBinary(op, stack) {
            if (isLogicalOperator(op)) {
                return execLogical(op, stack);
            }
            if (isJoinOperator(op)) {
                return execJoin(op, stack);
            }
            var behind = stack.pop();
            var front = stack.pop();
            if (!front || !behind) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            front = +front.value;
            behind = +behind.value;
            if (isNaN(front) || isNaN(behind)) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            if (op.value === "/" && behind === 0) {
                return {
                    error: true,
                    value: ERROR.DIV0
                };
            }
            var result = math.eval(front + op.value + behind);
            if (isNaN(result)) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            return {
                error: false,
                value: {
                    type: TYPE.NUMERIC,
                    value: result
                }
            };
        }
        function execLogical(op, stack) {
            var behind = stack.pop();
            var front = stack.pop();
            if (!front || !behind) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            op = formatLogicalOperator(op);
            if (isNaN(+front.value)) {
                front = '"' + front.value + '"';
            } else {
                front = +front.value;
            }
            if (isNaN(+behind.value)) {
                behind = behind.value + "";
            } else {
                behind = +behind.value;
            }
            return {
                error: false,
                value: {
                    type: TYPE.BOOLEAN,
                    value: (math.eval(front + op + behind) + "").toUpperCase()
                }
            };
        }
        // TODO 处理括号
        function processOperator(token, output, stack) {
            var op = stack.top();
            if (!op || compare(op, token) < 0) {
                stack.push(token);
            } else {
                output.push(stack.pop());
                processOperator(token, output, stack);
            }
        }
        function isLogicalOperator(op) {
            return !!LOGICAL_OPERATOR[op.value];
        }
        function formatLogicalOperator(op) {
            return LOGICAL_OPERATOR[op.value];
        }
        function isJoinOperator(op) {
            return op.value === "&";
        }
        function execJoin(op, stack) {
            var behind = stack.pop();
            var front = stack.pop();
            if (!front || !behind) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            front = front.value === null ? "" : front.value + "";
            behind = behind.value === null ? "" : behind.value + "";
            return {
                error: false,
                value: {
                    type: TYPE.TEXT,
                    value: front + behind
                }
            };
        }
        function compare(op1, op2) {
            return PRIORITY[op1.type + "_" + op1.value] - PRIORITY[op2.type + "_" + op2.value];
        }
        function isFinalType(type) {
            return !!CELL_VALUE_TYPE[type];
        }
        return {
            exec: function(tokens) {
                var tokens = toRPN(tokens);
                return calculate(tokens);
            },
            FUNCTION: _p.r(16)
        };
    }
};

//src/common/formula/boolean-value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[11] = {
    value: {
        TRUE: "TRUE",
        FALSE: "FALSE"
    }
};

//src/common/formula/calculator.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[12] = {
    value: function(require) {
        var ERROR = _p.r(14);
        var Linker = _p.r(22);
        var Runtime = _p.r(24);
        var execStack = {};
        var execCount = 0;
        return {
            exec: function(struct, tokens, row, col) {
                if (tokens.error) {
                    return tokens;
                }
                var execId = row + "," + col;
                if (execStack[execId]) {
                    clearStack();
                    return {
                        error: true,
                        value: ERROR.REF
                    };
                } else {
                    execCount++;
                    execStack[execId] = true;
                }
                var tokens = Linker.exec(struct, tokens.value);
                if (tokens.error) {
                    return tokens;
                }
                var result = Runtime.exec(tokens.value);
                execCount--;
                if (execCount === 0) {
                    clearStack();
                }
                return result;
            }
        };
        function clearStack() {
            execStack = {};
            execCount = 0;
        }
    }
};

//src/common/formula/error-creator.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[13] = {
    value: function(require) {
        var ERROR = _p.r(14);
        return {
            valueError: function() {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
        };
    }
};

//src/common/formula/errors.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[14] = {
    value: {
        DIV0: "#DIV/0!",
        // 当某个值不可用于函数或公式时
        NAN: "#N/A",
        // 无法识别公式中的文本时
        NAME: "#NAME?",
        // 指定两个不相交的区域的交集时
        NULL: "#NULL!",
        // 公式或函数包含无效数值时
        NUM: "#NUM!",
        // 单元格引用无效时
        REF: "#REF!",
        // 公式包含具有不同数据类型的单元格
        VALUE: "#VALUE!",
        // 解析错误
        SYNTAX: "#SYNTAX!"
    }
};

//src/common/formula/formula.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[15] = {
    value: function(require) {
        var Analyzer = _p.r(9);
        var Calculator = _p.r(12);
        return _p.r(0).create("Table", {
            base: _p.r(89),
            init: function() {
                this.registerCommonService({
                    "c.formula.parse": this.parse,
                    "c.formula.exec": this.exec
                });
            },
            parse: function(content) {
                return Analyzer.getTokens(content);
            },
            exec: function(struct, tokens, row, col) {
                return Calculator.exec(struct, tokens, row, col);
            }
        });
    }
};

//src/common/formula/func/index.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[16] = {
    value: function(require) {
        return {
            sum: _p.r(21),
            // logical
            and: _p.r(17),
            or: _p.r(20),
            not: _p.r(19),
            "if": _p.r(18)
        };
    }
};

//src/common/formula/func/logical/and.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[17] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var BOOLEAN_VALUE = _p.r(11);
        var ErrorCreator = _p.r(13);
        return {
            exec: function() {
                return exec(false, arguments);
            }
        };
        function exec(isRawValue, args) {
            var current;
            var result = -1;
            for (var i = 0, len = args.length; i < len; i++) {
                current = args[i];
                if ($.isArray(current)) {
                    result = exec.call(null, true, current);
                    if (result === 0) {
                        break;
                    }
                    continue;
                }
                if (current.type !== TYPE.NUMERIC && current.type !== TYPE.BOOLEAN) {
                    continue;
                }
                if (current.type === TYPE.NUMERIC) {
                    result = +current.value;
                } else if (current.type === TYPE.BOOLEAN) {
                    result = +(current.value === BOOLEAN_VALUE.TRUE);
                }
                if (!result) {
                    break;
                }
            }
            if (isRawValue) {
                return result;
            }
            if (result === -1) {
                return ErrorCreator.valueError();
            }
            return {
                error: false,
                value: {
                    type: TYPE.BOOLEAN,
                    value: result === 1 ? BOOLEAN_VALUE.TRUE : BOOLEAN_VALUE.FALSE
                }
            };
        }
    }
};

//src/common/formula/func/logical/if.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[18] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var BOOLEAN_VALUE = _p.r(11);
        var ErrorCreator = _p.r(13);
        return {
            exec: function(logicTest, valueIfTrue, valueIfFalse) {
                if (arguments.length !== 3) {
                    return ErrorCreator.valueError();
                }
                var type = logicTest.type;
                var result;
                if (type === TYPE.NUMERIC || type === TYPE.UNDEFINED) {
                    result = !!+logicTest.value;
                } else if (type === TYPE.BOOLEAN) {
                    result = logicTest.value === BOOLEAN_VALUE.TRUE;
                } else {
                    return ErrorCreator.valueError();
                }
                return {
                    error: false,
                    value: result ? valueIfTrue : valueIfFalse
                };
            }
        };
    }
};

//src/common/formula/func/logical/not.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[19] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var BOOLEAN_VALUE = _p.r(11);
        var ErrorCreator = _p.r(13);
        return {
            exec: function(param) {
                if ($.isArray(param) || arguments.length !== 1) {
                    return ErrorCreator.valueError();
                }
                var type = param.type;
                var result;
                if (type === TYPE.NUMERIC || type === TYPE.UNDEFINED) {
                    result = !+param.value;
                } else if (type === TYPE.BOOLEAN) {
                    result = param.value !== BOOLEAN_VALUE.TRUE;
                } else {
                    return ErrorCreator.valueError();
                }
                return {
                    error: false,
                    value: {
                        type: TYPE.BOOLEAN,
                        value: result ? BOOLEAN_VALUE.TRUE : BOOLEAN_VALUE.FALSE
                    }
                };
            }
        };
    }
};

//src/common/formula/func/logical/or.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[20] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var BOOLEAN_VALUE = _p.r(11);
        var ErrorCreator = _p.r(13);
        return {
            exec: function() {
                return exec(false, arguments);
            }
        };
        function exec(isRawValue, args) {
            var current;
            var result = -1;
            for (var i = 0, len = args.length; i < len; i++) {
                current = args[i];
                if ($.isArray(current)) {
                    result = exec.call(null, true, current);
                    if (result === 1) {
                        break;
                    }
                    continue;
                }
                if (current.type !== TYPE.NUMERIC && current.type !== TYPE.BOOLEAN) {
                    continue;
                }
                if (current.type === TYPE.NUMERIC) {
                    result = +current.value;
                } else if (current.type === TYPE.BOOLEAN) {
                    result = +(current.value === BOOLEAN_VALUE.TRUE);
                }
                if (result) {
                    break;
                }
            }
            if (isRawValue) {
                return result;
            }
            if (result === -1) {
                return ErrorCreator.valueError();
            }
            return {
                error: false,
                value: {
                    type: TYPE.BOOLEAN,
                    value: result === 1 ? BOOLEAN_VALUE.TRUE : BOOLEAN_VALUE.FALSE
                }
            };
        }
    }
};

//src/common/formula/func/math/sum.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[21] = {
    value: function(require) {
        var math = window.math;
        var ERROR = _p.r(14);
        var VALUE_TYPE = _p.r(68);
        return {
            exec: exec
        };
        function exec() {
            var args = arguments;
            var numeric = [];
            var operand;
            for (var i = 0, len = args.length; i < len; i++) {
                operand = args[i];
                if ($.isArray(operand)) {
                    operand = exec.apply(null, operand);
                    if (operand.error) {
                        return operand;
                    }
                    operand = operand.value;
                }
                if (operand.type !== VALUE_TYPE.NUMERIC) {
                    continue;
                }
                numeric.push(+operand.value);
            }
            var result;
            if (numeric.length) {
                result = math.eval(numeric.join("+"));
            } else {
                result = 0;
            }
            if (isNaN(result)) {
                return {
                    error: true,
                    value: ERROR.VALUE
                };
            }
            return {
                error: false,
                value: {
                    type: VALUE_TYPE.NUMERIC,
                    value: result
                }
            };
        }
    }
};

//src/common/formula/linker.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[22] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var VALUE_TYPE = _p.r(68);
        var ERROR = _p.r(14);
        return {
            exec: exec
        };
        function exec(struct, tokens) {
            var result = [];
            var token;
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = parse(struct, tokens[i]);
                if (token.error) {
                    return token;
                }
                result.push(token.value);
            }
            return {
                error: false,
                value: result
            };
        }
        function parse(struct, token) {
            var params;
            var subexpression;
            switch (token.type) {
              case TYPE.CELL:
                return parseCell(struct, token);

              case TYPE.RANGE:
                return parseRange(struct, token);
                break;

              case TYPE.NAME:
                return parseName(struct, token.value);
                break;

              case TYPE.OP_PRE:
              case TYPE.OP_IN:
              case TYPE.OP_POST:
                return {
                    error: false,
                    value: token
                };
                break;

              case TYPE.NUMBER:
                return {
                    error: false,
                    value: {
                        type: VALUE_TYPE.NUMERIC,
                        value: token.value
                    }
                };
                break;

              case TYPE.FUNCTION:
                params = parseParams(struct, token.value.params);
                if (params.error) {
                    return params;
                }
                return {
                    error: false,
                    value: {
                        type: TYPE.FUNCTION,
                        value: {
                            name: token.value.name,
                            params: params.value
                        }
                    }
                };
                break;

              case TYPE.SUBEXPRESSION:
                subexpression = exec(struct, token.value);
                if (subexpression.error) {
                    return subexpression;
                }
                return {
                    error: false,
                    value: {
                        type: TYPE.SUBEXPRESSION,
                        value: subexpression.value
                    }
                };

              case TYPE.TEXT:
                return {
                    error: false,
                    value: {
                        type: VALUE_TYPE.TEXT,
                        value: token.value
                    }
                };
                break;
            }
        }
        function parseCell(struct, token) {
            token = struct.getCellValueDetails(token.row, token.col);
            return token.value;
        }
        function parseParams(struct, params) {
            var result = [];
            var param;
            for (var i = 0, len = params.length; i < len; i++) {
                param = parse(struct, params[i]);
                if (param.error) {
                    return param;
                }
                result.push(param.value);
            }
            return {
                error: false,
                value: result
            };
        }
        function parseName(struct, name) {
            var cells = struct.getCellByName(name);
            if (!cells) {
                return {
                    error: true,
                    value: ERROR.REF
                };
            }
        }
        function parseRange(struct, range) {
            range = toStandardRange(range);
            var start = range.start;
            var end = range.end;
            var totalCount = struct.getTotal();
            var cells = [];
            var cellValue;
            // 行列溢出
            if (start.row < 0 || end.row >= totalCount.row || start.col < 0 || end.col >= totalCount.col) {
                return {
                    error: true,
                    value: ERROR.REF
                };
            }
            for (var i = start.row; i <= end.row; i++) {
                for (var j = start.col; j <= end.col; j++) {
                    cellValue = parseCell(struct, {
                        row: i,
                        col: j
                    });
                    if (cellValue.error) {
                        return cellValue;
                    }
                    cells.push(cellValue.value);
                }
            }
            return {
                error: false,
                value: {
                    type: TYPE.RANGE,
                    value: cells
                }
            };
        }
        function toStandardRange(range) {
            var start = range.start;
            var end = range.end;
            return {
                start: {
                    row: Math.min(start.row, end.row),
                    col: Math.min(start.col, end.col)
                },
                end: {
                    row: Math.max(start.row, end.row),
                    col: Math.max(start.col, end.col)
                }
            };
        }
    }
};

//src/common/formula/parser.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[23] = {
    value: function() {
        var TOK_TYPE_NOOP = "noop";
        var TOK_TYPE_OPERAND = "operand";
        var TOK_TYPE_FUNCTION = "function";
        var TOK_TYPE_SUBEXPR = "subexpression";
        var TOK_TYPE_ARGUMENT = "argument";
        var TOK_TYPE_OP_PRE = "operator-prefix";
        var TOK_TYPE_OP_IN = "operator-infix";
        var TOK_TYPE_OP_POST = "operator-postfix";
        var TOK_TYPE_WSPACE = "white-space";
        var TOK_TYPE_UNKNOWN = "unknown";
        var TOK_SUBTYPE_START = "start";
        var TOK_SUBTYPE_STOP = "stop";
        var TOK_SUBTYPE_TEXT = "text";
        var TOK_SUBTYPE_NUMBER = "number";
        var TOK_SUBTYPE_LOGICAL = "logical";
        var TOK_SUBTYPE_ERROR = "error";
        var TOK_SUBTYPE_RANGE = "range";
        var TOK_SUBTYPE_MATH = "math";
        var TOK_SUBTYPE_CONCAT = "concatenate";
        var TOK_SUBTYPE_INTERSECT = "intersect";
        var TOK_SUBTYPE_UNION = "union";
        function f_token(value, type, subtype) {
            this.value = value;
            this.type = type;
            this.subtype = subtype;
        }
        function f_tokens() {
            this.items = new Array();
            this.add = function(value, type, subtype) {
                if (!subtype) subtype = "";
                token = new f_token(value, type, subtype);
                this.addRef(token);
                return token;
            };
            this.addRef = function(token) {
                this.items.push(token);
            };
            this.index = -1;
            this.reset = function() {
                this.index = -1;
            };
            this.BOF = function() {
                return this.index <= 0;
            };
            this.EOF = function() {
                return this.index >= this.items.length - 1;
            };
            this.moveNext = function() {
                if (this.EOF()) return false;
                this.index++;
                return true;
            };
            this.current = function() {
                if (this.index == -1) return null;
                return this.items[this.index];
            };
            this.next = function() {
                if (this.EOF()) return null;
                return this.items[this.index + 1];
            };
            this.previous = function() {
                if (this.index < 1) return null;
                return this.items[this.index - 1];
            };
        }
        function f_tokenStack() {
            this.items = new Array();
            this.push = function(token) {
                this.items.push(token);
            };
            this.pop = function() {
                var token = this.items.pop();
                return new f_token("", token.type, TOK_SUBTYPE_STOP);
            };
            this.token = function() {
                return this.items.length > 0 ? this.items[this.items.length - 1] : null;
            };
            this.value = function() {
                return this.token() ? this.token().value : "";
            };
            this.type = function() {
                return this.token() ? this.token().type : "";
            };
            this.subtype = function() {
                return this.token() ? this.token().subtype : "";
            };
        }
        function getTokens(formula) {
            var tokens = new f_tokens();
            var tokenStack = new f_tokenStack();
            var offset = 0;
            var currentChar = function() {
                return formula.substr(offset, 1);
            };
            var doubleChar = function() {
                return formula.substr(offset, 2);
            };
            var nextChar = function() {
                return formula.substr(offset + 1, 1);
            };
            var EOF = function() {
                return offset >= formula.length;
            };
            var token = "";
            var inString = false;
            var inPath = false;
            var inRange = false;
            var inError = false;
            while (formula.length > 0) {
                if (formula.substr(0, 1) == " ") formula = formula.substr(1); else {
                    if (formula.substr(0, 1) == "=") formula = formula.substr(1);
                    break;
                }
            }
            var regexSN = /^[1-9]{1}(\.[0-9]+)?E{1}$/;
            while (!EOF()) {
                // state-dependent character evaluation (order is important)
                // double-quoted strings
                // embeds are doubled
                // end marks token
                if (inString) {
                    if (currentChar() == '"') {
                        if (nextChar() == '"') {
                            token += '"';
                            offset += 1;
                        } else {
                            inString = false;
                            tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_TEXT);
                            token = "";
                        }
                    } else {
                        token += currentChar();
                    }
                    offset += 1;
                    continue;
                }
                // single-quoted strings (links)
                // embeds are double
                // end does not mark a token
                if (inPath) {
                    if (currentChar() == "'") {
                        if (nextChar() == "'") {
                            token += "'";
                            offset += 1;
                        } else {
                            inPath = false;
                        }
                    } else {
                        token += currentChar();
                    }
                    offset += 1;
                    continue;
                }
                // bracked strings (range offset or linked workbook name)
                // no embeds (changed to "()" by Excel)
                // end does not mark a token
                if (inRange) {
                    if (currentChar() == "]") {
                        inRange = false;
                    }
                    token += currentChar();
                    offset += 1;
                    continue;
                }
                // error values
                // end marks a token, determined from absolute list of values
                if (inError) {
                    token += currentChar();
                    offset += 1;
                    if (",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,".indexOf("," + token + ",") != -1) {
                        inError = false;
                        tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_ERROR);
                        token = "";
                    }
                    continue;
                }
                // scientific notation check
                if ("+-".indexOf(currentChar()) != -1) {
                    if (token.length > 1) {
                        if (token.match(regexSN)) {
                            token += currentChar();
                            offset += 1;
                            continue;
                        }
                    }
                }
                // independent character evaulation (order not important)
                // establish state-dependent character evaluations
                if (currentChar() == '"') {
                    if (token.length > 0) {
                        // not expected
                        tokens.add(token, TOK_TYPE_UNKNOWN);
                        token = "";
                    }
                    inString = true;
                    offset += 1;
                    continue;
                }
                if (currentChar() == "'") {
                    if (token.length > 0) {
                        // not expected
                        tokens.add(token, TOK_TYPE_UNKNOWN);
                        token = "";
                    }
                    inPath = true;
                    offset += 1;
                    continue;
                }
                if (currentChar() == "[") {
                    inRange = true;
                    token += currentChar();
                    offset += 1;
                    continue;
                }
                if (currentChar() == "#") {
                    if (token.length > 0) {
                        // not expected
                        tokens.add(token, TOK_TYPE_UNKNOWN);
                        token = "";
                    }
                    inError = true;
                    token += currentChar();
                    offset += 1;
                    continue;
                }
                // mark start and end of arrays and array rows
                if (currentChar() == "{") {
                    if (token.length > 0) {
                        // not expected
                        tokens.add(token, TOK_TYPE_UNKNOWN);
                        token = "";
                    }
                    tokenStack.push(tokens.add("ARRAY", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                    tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                    offset += 1;
                    continue;
                }
                if (currentChar() == ";") {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.addRef(tokenStack.pop());
                    tokens.add(",", TOK_TYPE_ARGUMENT);
                    tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                    offset += 1;
                    continue;
                }
                if (currentChar() == "}") {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.addRef(tokenStack.pop());
                    tokens.addRef(tokenStack.pop());
                    offset += 1;
                    continue;
                }
                // trim white-space
                if (currentChar() == " ") {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.add("", TOK_TYPE_WSPACE);
                    offset += 1;
                    while (currentChar() == " " && !EOF()) {
                        offset += 1;
                    }
                    continue;
                }
                // multi-character comparators
                if (",>=,<=,<>,".indexOf("," + doubleChar() + ",") != -1) {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.add(doubleChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_LOGICAL);
                    offset += 2;
                    continue;
                }
                // standard infix operators
                if ("+-*/^&=><".indexOf(currentChar()) != -1) {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.add(currentChar(), TOK_TYPE_OP_IN);
                    offset += 1;
                    continue;
                }
                // standard postfix operators
                if ("%".indexOf(currentChar()) != -1) {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.add(currentChar(), TOK_TYPE_OP_POST);
                    offset += 1;
                    continue;
                }
                // start subexpression or function
                if (currentChar() == "(") {
                    if (token.length > 0) {
                        tokenStack.push(tokens.add(token, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                        token = "";
                    } else {
                        tokenStack.push(tokens.add("", TOK_TYPE_SUBEXPR, TOK_SUBTYPE_START));
                    }
                    offset += 1;
                    continue;
                }
                // function, subexpression, array parameters
                if (currentChar() == ",") {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    if (!(tokenStack.type() == TOK_TYPE_FUNCTION)) {
                        tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
                    } else {
                        tokens.add(currentChar(), TOK_TYPE_ARGUMENT);
                    }
                    offset += 1;
                    continue;
                }
                // stop subexpression
                if (currentChar() == ")") {
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.addRef(tokenStack.pop());
                    offset += 1;
                    continue;
                }
                // token accumulation
                token += currentChar();
                offset += 1;
            }
            // dump remaining accumulation
            if (token.length > 0) tokens.add(token, TOK_TYPE_OPERAND);
            // move all tokens to a new collection, excluding all unnecessary white-space tokens
            var tokens2 = new f_tokens();
            while (tokens.moveNext()) {
                token = tokens.current();
                if (token.type == TOK_TYPE_WSPACE) {
                    if (tokens.BOF() || tokens.EOF()) {} else if (!(tokens.previous().type == TOK_TYPE_FUNCTION && tokens.previous().subtype == TOK_SUBTYPE_STOP || tokens.previous().type == TOK_TYPE_SUBEXPR && tokens.previous().subtype == TOK_SUBTYPE_STOP || tokens.previous().type == TOK_TYPE_OPERAND)) {} else if (!(tokens.next().type == TOK_TYPE_FUNCTION && tokens.next().subtype == TOK_SUBTYPE_START || tokens.next().type == TOK_TYPE_SUBEXPR && tokens.next().subtype == TOK_SUBTYPE_START || tokens.next().type == TOK_TYPE_OPERAND)) {} else tokens2.add(token.value, TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT);
                    continue;
                }
                tokens2.addRef(token);
            }
            // switch infix "-" operator to prefix when appropriate, switch infix "+" operator to noop when appropriate, identify operand
            // and infix-operator subtypes, pull "@" from in front of function names
            while (tokens2.moveNext()) {
                token = tokens2.current();
                if (token.type == TOK_TYPE_OP_IN && (token.value == "-" || token.value == "+")) {
                    if (tokens2.BOF()) token.type = TOK_TYPE_OP_PRE; else if (tokens2.previous().type == TOK_TYPE_FUNCTION && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_OP_POST || tokens2.previous().type == TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH; else token.type = TOK_TYPE_OP_PRE;
                    continue;
                }
                if (token.type == TOK_TYPE_OP_IN && token.value == "+") {
                    if (tokens2.BOF()) token.type = TOK_TYPE_NOOP; else if (tokens2.previous().type == TOK_TYPE_FUNCTION && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_OP_POST || tokens2.previous().type == TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH; else token.type = TOK_TYPE_NOOP;
                    continue;
                }
                if (token.type == TOK_TYPE_OP_IN && token.subtype.length == 0) {
                    if ("<>=".indexOf(token.value.substr(0, 1)) != -1) token.subtype = TOK_SUBTYPE_LOGICAL; else if (token.value == "&") token.subtype = TOK_SUBTYPE_CONCAT; else token.subtype = TOK_SUBTYPE_MATH;
                    continue;
                }
                if (token.type == TOK_TYPE_OPERAND && token.subtype.length == 0) {
                    if (isNaN(parseFloat(token.value))) if (token.value == "TRUE" || token.value == "FALSE") token.subtype = TOK_SUBTYPE_LOGICAL; else token.subtype = TOK_SUBTYPE_RANGE; else token.subtype = TOK_SUBTYPE_NUMBER;
                    continue;
                }
                if (token.type == TOK_TYPE_FUNCTION) {
                    if (token.value.substr(0, 1) == "@") token.value = token.value.substr(1);
                    continue;
                }
            }
            tokens2.reset();
            // move all tokens to a new collection, excluding all noops
            tokens = new f_tokens();
            while (tokens2.moveNext()) {
                if (tokens2.current().type != TOK_TYPE_NOOP) tokens.addRef(tokens2.current());
            }
            tokens.reset();
            return tokens;
        }
        return {
            getTokens: getTokens,
            TYPE: {
                TOK_TYPE_NOOP: "noop",
                TOK_TYPE_OPERAND: "operand",
                TOK_TYPE_FUNCTION: "function",
                TOK_TYPE_SUBEXPR: "subexpression",
                TOK_TYPE_ARGUMENT: "argument",
                TOK_TYPE_OP_PRE: "operator-prefix",
                TOK_TYPE_OP_IN: "operator-infix",
                TOK_TYPE_OP_POST: "operator-postfix",
                TOK_TYPE_WSPACE: "white-space",
                TOK_TYPE_UNKNOWN: "unknown",
                TOK_SUBTYPE_START: "start",
                TOK_SUBTYPE_STOP: "stop",
                TOK_SUBTYPE_TEXT: "text",
                TOK_SUBTYPE_NUMBER: "number",
                TOK_SUBTYPE_LOGICAL: "logical",
                TOK_SUBTYPE_ERROR: "error",
                TOK_SUBTYPE_RANGE: "range",
                TOK_SUBTYPE_MATH: "math",
                TOK_SUBTYPE_CONCAT: "concatenate",
                TOK_SUBTYPE_INTERSECT: "intersect",
                TOK_SUBTYPE_UNION: "union"
            }
        };
    }
};

//src/common/formula/runtime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[24] = {
    value: function(require) {
        var TYPE = _p.r(29);
        var Arithmetic = _p.r(10);
        return {
            exec: exec
        };
        function exec(tokens) {
            var tokens = stringify(tokens);
            if (tokens.error) {
                return tokens;
            }
            return Arithmetic.exec(tokens.value);
        }
        function stringify(tokens) {
            var result = [];
            var token;
            for (var i = 0, len = tokens.length; i < len; i++) {
                token = parse(tokens[i]);
                if (token.error) {
                    return token;
                }
                result.push(token.value);
            }
            return {
                error: false,
                value: result
            };
        }
        function parse(token) {
            if (token.type === TYPE.SUBEXPRESSION) {
                return exec(token.value);
            } else {
                return parseToScalar(token);
            }
        }
        function parseToScalar(token) {
            switch (token.type) {
              case TYPE.FUNCTION:
                return parseFunction(token.value);

              case TYPE.RANGE:
                return parseRange(token.value);
            }
            return {
                error: false,
                value: token
            };
        }
        function parseRange(token) {
            return {
                error: false,
                value: token
            };
        }
        function parseFunction(token) {
            var func = token.name;
            var params = token.params;
            var paramValues = [];
            var param;
            for (var i = 0, len = params.length; i < len; i++) {
                param = parse(params[i]);
                if (param.error) {
                    return param;
                }
                paramValues.push(param.value);
            }
            return Arithmetic.FUNCTION[func].exec.apply(null, paramValues);
        }
    }
};

//src/common/formula/stack.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[25] = {
    value: function(require) {
        return _p.r(0).create("Stack", {
            stack: [],
            pop: function() {
                return this.stack.pop() || null;
            },
            top: function() {
                return this.stack[this.stack.length - 1];
            },
            push: function(val) {
                this.stack.push(val);
            },
            length: function() {
                return this.stack.length;
            }
        });
    }
};

//src/common/formula/subanalyzer/operator.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[26] = {
    value: function(require) {
        var TYPE = _p.r(23).TYPE;
        var NEW_TYPE = _p.r(29);
        return {
            parse: function(token) {
                /*
             var TOK_TYPE_OP_PRE    = "operator-prefix";
             var TOK_TYPE_OP_IN     = "operator-infix";
             var TOK_TYPE_OP_POST   = "operator-postfix";
            */
                switch (token.type) {
                  case TYPE.TOK_TYPE_OP_PRE:
                    return {
                        error: false,
                        value: {
                            type: NEW_TYPE.OP_PRE,
                            value: token.value
                        }
                    };

                  case TYPE.TOK_TYPE_OP_IN:
                    return {
                        error: false,
                        value: {
                            type: NEW_TYPE.OP_IN,
                            value: token.value
                        }
                    };

                  case TYPE.TOK_TYPE_OP_POST:
                    return {
                        error: false,
                        value: {
                            type: NEW_TYPE.OP_POST,
                            value: token.value
                        }
                    };
                }
            }
        };
    }
};

//src/common/formula/subanalyzer/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[27] = {
    value: function(require) {
        var TYPE = _p.r(23).TYPE;
        var ERROR = _p.r(14);
        var NEW_TYPE = _p.r(29);
        var title2index = _p.r(28);
        var PATTERN = {
            A1_REF: /^[a-z]+[\d]+$/i,
            RANGE: /^[^:]+:[^:]+$/
        };
        var COL_ROW_PATTERN = /([a-z]+)([\d]+)/i;
        return {
            parse: function(token) {
                /*
             TOK_SUBTYPE_TEXT: "text",
             TOK_SUBTYPE_NUMBER: "number",
             TOK_SUBTYPE_LOGICAL: "logical",
             TOK_SUBTYPE_ERROR: "error",
             TOK_SUBTYPE_RANGE: "range",
             * */
                switch (token.subtype) {
                  case TYPE.TOK_SUBTYPE_RANGE:
                    return parseRange(token.value);

                  case TYPE.TOK_SUBTYPE_NUMBER:
                    return {
                        error: false,
                        value: {
                            type: NEW_TYPE.NUMBER,
                            value: token.value
                        }
                    };

                  case TYPE.TOK_SUBTYPE_TEXT:
                    return {
                        error: false,
                        value: {
                            type: NEW_TYPE.TEXT,
                            value: token.value
                        }
                    };
                }
            }
        };
        function parseRange(content) {
            if (content.match(PATTERN.A1_REF)) {
                return parseA1Ref(content);
            } else if (content.match(PATTERN.RANGE)) {
                return parseCellRange(content);
            } else {
                return {
                    error: false,
                    value: {
                        type: NEW_TYPE.NAME,
                        value: content
                    }
                };
            }
        }
        function parseA1Ref(content) {
            content = COL_ROW_PATTERN.exec(content);
            return {
                error: false,
                value: {
                    type: NEW_TYPE.CELL,
                    row: +content[2] - 1,
                    col: title2index(content[1])
                }
            };
        }
        function parseCellRange(content) {
            content = content.split(":");
            var first = parseRange(content[0]);
            var second = parseRange(content[1]);
            if (first.error || second.error) {
                return {
                    error: true,
                    value: ERROR.REF
                };
            }
            return {
                error: false,
                value: {
                    type: NEW_TYPE.RANGE,
                    start: {
                        row: first.value.row,
                        col: first.value.col
                    },
                    end: {
                        row: second.value.row,
                        col: second.value.col
                    }
                }
            };
        }
    }
};

//src/common/formula/title2index.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[28] = {
    value: function(require) {
        var titles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var MAPPing = {};
        for (var i = 0, len = titles.length; i < len; i++) {
            MAPPing[titles[i]] = i + 1;
        }
        return function(title) {
            var count = 0;
            var sum = 0;
            title = title.toUpperCase().split("");
            for (var i = len = title.length - 1; i >= 0; i--) {
                sum += MAPPing[title[i]] * Math.pow(26, count);
                count++;
            }
            return sum - 1;
        };
    }
};

//src/common/formula/types.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[29] = {
    value: function(require) {
        return $.extend({}, {
            // compile type
            CELL: "cell",
            RANGE: "range",
            NAME: "name",
            OP_PRE: "op_pre",
            OP_IN: "op_in",
            OP_POST: "op_post",
            NUMBER: "number",
            TEXT: "text",
            VALUE: "value",
            FUNCTION: "function",
            SUBEXPRESSION: "subexpression"
        }, _p.r(68));
    }
};

//src/common/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[30] = {
    value: function(require) {
        return _p.r(0).create("Cell", {
            reference: null,
            base: _p.r(89),
            init: function() {
                this.registerCommonService({
                    "style.to.text": this.toCssText
                });
            },
            toCssText: function(style) {
                var text = [];
                for (var key in style) {
                    if (!style.hasOwnProperty(key) || !style[key]) {
                        continue;
                    }
                    text.push(toCssName(key) + ": " + style[key]);
                }
                return text.join("; ");
            }
        });
        function toCssName(key) {
            return key.replace(/[A-Z]/g, function(match) {
                return "-" + match.toLowerCase();
            });
        }
    }
};

//src/common/title.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[31] = {
    value: function(require) {
        return _p.r(0).create("Title", {
            titles: null,
            indexMapping: {},
            charMapping: {},
            base: _p.r(89),
            init: function() {
                this.initTitles();
                this.registerCommonService({
                    "c.title.index2char": this.indexToChar,
                    "c.title.char2index": this.chartToIndex
                });
            },
            initTitles: function() {
                var titles = " ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                var index;
                for (var i = 0, len = titles.length; i < len; i++) {
                    index = i.toString(len);
                    this.indexMapping[index] = titles[i];
                    this.charMapping[titles[i]] = i;
                }
                this.titles = titles;
            },
            indexToChar: function(index) {
                var title = [];
                index += 1;
                index = index.toString(this.titles.length).split("");
                for (var i = 0, len = index.length; i < len; i++) {
                    title[i] = this.indexMapping[index[i]];
                }
                return title.join("");
            },
            chartToIndex: function(title) {
                var index = [];
                title = "AA";
                title = title.toUpperCase().split("");
                for (var i = 0, len = title.length; i < len; i++) {
                    index[i] = this.charMapping[title[i]];
                }
                return parseInt(index.join(""), 10) - 1;
            }
        });
    }
};

//src/config/local.js
/**
 * @file 系统缺省样式
 * @author hancong03@baiud.com
 */
_p[32] = {
    value: {
        style: {
            // color
            color: "#000000",
            // fill color
            backgroundColor: "#ffffff",
            textAlign: "left",
            verticalAlign: "bottom",
            textDecoration: "none",
            // font
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 13,
            lineHeight: 1.2,
            fontFamily: "宋体"
        },
        maxColCount: 26,
        maxRowCount: 1e4
    }
};

//src/config/sys.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[33] = {
    value: {
        head: {
            width: 50,
            height: 25,
            color: "#000000",
            focusColor: "#dddddd",
            font: "12px/1 宋体"
        },
        scrollbar: {
            width: 9,
            background: "#f8f8f8"
        },
        cell: {
            width: 100,
            height: 22
        },
        border: {
            width: 1,
            color: "#cccccc"
        },
        canvas: {
            background: "#ffffff"
        },
        background: "#f8f8f8",
        enableScroll: true,
        ZOOM: Math.ceil(window.devicePixelRatio),
        // 栈长度
        stack: 50
    }
};

//src/core/actuary.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[34] = {
    value: function(require) {
        var Actuary = _p.r(0).create("Actuary", {
            cell: null,
            dataAccess: null,
            reverse: null,
            cellConfig: null,
            base: _p.r(87),
            init: function(dataAccess, cell) {
                this.dataAccess = dataAccess;
                this.cell = cell;
                this.initData();
                this.plug(this.calculate);
                this.initMessageHook();
            },
            reinit: function() {
                this.initData();
            },
            initData: function() {
                var config = this.getConfig();
                var borderConfig = config.border;
                var borderOffset = borderConfig.width % 2 === 0 ? 0 : .5;
                this.reverse = {};
                this.cellConfig = config.cell;
                this.dataAccess.setOffset(borderOffset);
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.row.calculation.reverse": this.reverseRow,
                    "c.col.calculation.reverse": this.reverseColumn
                });
            },
            calculate: function() {
                var dataAccess = this.dataAccess;
                var size = this.getContentSize();
                this.dataAccess.setSpace(size.width, size.height);
                var grid = this.genGrid();
                var boundary = this.getBoundary(grid);
                dataAccess.setGrid(grid);
                dataAccess.setVisibleCount(grid.row.length - 1, grid.col.length - 1);
                var viewStart = this.dataAccess.getViewStart();
                dataAccess.setViewEnd(viewStart.row + grid.row.length - 2, viewStart.col + grid.col.length - 2);
                dataAccess.setBoundary(boundary.width, boundary.height);
                this.postMessage("c.refresh");
            },
            genGrid: function() {
                var dataAccess = this.dataAccess;
                var cell = this.cell;
                var grid = {};
                var cellConfig = this.cellConfig;
                var space = dataAccess.getSpace();
                var total = dataAccess.getTotal();
                var borderWidth = dataAccess.getBorderWidth();
                var defaultCellWidth = cellConfig.width;
                var defaultCellHeight = cellConfig.height;
                var viewStart = dataAccess.getViewStart();
                var viewEnd = dataAccess.getViewEnd();
                var offset = dataAccess.getOffset();
                // row point
                var points = [ offset ];
                var length = [];
                var inc = offset;
                var overflow;
                if (this.reverse.row) {
                    inc = borderWidth;
                    // 防止单个单元格的宽度超过整个可视空间的宽度时，起始点错误的问题
                    viewStart.row = viewEnd.row;
                    for (var i = viewEnd.row; i >= 0; i--) {
                        inc += borderWidth + Math.max(dataAccess.getRowHeight(i) || defaultCellHeight, cell.getAutoSize(i));
                        if (inc > space.height) {
                            break;
                        }
                        viewStart.row = i;
                    }
                } else {
                    overflow = true;
                    inc = offset;
                    // 检测起始值viewStart是否有溢出
                    for (var i = viewStart.row, len = total.row; i < len; i++) {
                        inc += borderWidth + Math.max(dataAccess.getRowHeight(i) || defaultCellHeight, cell.getAutoSize(i));
                        if (inc > space.height) {
                            // 无溢出
                            overflow = false;
                            break;
                        }
                    }
                    // 修复溢出
                    if (overflow) {
                        overflow = space.height - inc;
                        inc = 0;
                        for (var i = viewStart.row - 1; i >= 0; i--) {
                            inc += borderWidth + Math.max(dataAccess.getRowHeight(i) || defaultCellHeight, cell.getAutoSize(i));
                            if (inc > overflow) {
                                break;
                            }
                            viewStart.row = i;
                        }
                    }
                }
                inc = offset;
                for (var i = viewStart.row, len = total.row; i < len; i++) {
                    length[i] = Math.max(dataAccess.getRowHeight(i) || defaultCellHeight, cell.getAutoSize(i));
                    inc += borderWidth + length[i];
                    points.push(inc);
                    if (inc > space.height) {
                        break;
                    }
                }
                grid.row = points;
                grid.height = length;
                // col point
                points = [ offset ];
                length = [];
                inc = offset;
                if (this.reverse.col) {
                    inc = borderWidth;
                    viewStart.col = viewEnd.col;
                    for (var i = viewEnd.col; i >= 0; i--) {
                        inc += borderWidth + dataAccess.getColumnWidth(i) || defaultCellWidth;
                        if (inc > space.width) {
                            break;
                        }
                        viewStart.col = i;
                    }
                } else {
                    overflow = true;
                    inc = offset;
                    // 检测起始值viewStart是否有溢出
                    for (var i = viewStart.col, len = total.col; i < len; i++) {
                        inc += borderWidth + dataAccess.getColumnWidth(i) || defaultCellWidth;
                        if (inc > space.width) {
                            // 无溢出
                            overflow = false;
                            break;
                        }
                    }
                    // 修复溢出
                    if (overflow) {
                        overflow = space.width - inc;
                        inc = 0;
                        for (var i = viewStart.col - 1; i >= 0; i--) {
                            inc += borderWidth + dataAccess.getColumnWidth(i) || defaultCellWidth;
                            if (inc > overflow) {
                                break;
                            }
                            viewStart.col = i;
                        }
                    }
                }
                inc = offset;
                for (var i = viewStart.col, len = total.col; i < len; i++) {
                    length[i] = dataAccess.getColumnWidth(i) || defaultCellWidth;
                    inc += borderWidth + length[i];
                    points.push(inc);
                    if (inc > space.width) {
                        break;
                    }
                }
                grid.col = points;
                grid.width = length;
                // 重置计算方式的标识
                this.reverse.row = false;
                this.reverse.col = false;
                return grid;
            },
            reverseRow: function() {
                this.reverse.row = true;
            },
            reverseColumn: function() {
                this.reverse.col = true;
            },
            getBoundary: function(grid) {
                var offset = this.dataAccess.getOffset();
                var size = this.getContentSize();
                return {
                    width: Math.min(size.width, grid.col[grid.col.length - 1] + offset),
                    height: Math.min(size.height, grid.row[grid.row.length - 1] + offset)
                };
            }
        });
        Actuary.deps = [ "dataAccess", "cell" ];
        return Actuary;
    }
};

//src/core/cell.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[35] = {
    value: function(require) {
        var $ = _p.r(2);
        var Cell = _p.r(0).create("Cell", {
            contentPanel: null,
            $contentPanel: null,
            style: null,
            dataAccess: null,
            valueModule: null,
            base: _p.r(87),
            init: function(dataAccess, valueModule, style) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.style = style;
                this.contentPanel = this.createElement("div", "btb-core-content");
                this.$contentPanel = $(this.contentPanel);
                this.getContentContainer().appendChild(this.contentPanel);
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.cell.row.size": this.getRowSize,
                    "c.cell.col.size": this.getColSize,
                    "c.exchange.row": this.exchangeRow,
                    "c.exchange.column": this.exchangeColumn,
                    "c.resize.column": this.resizeCol,
                    "c.resize.row": this.resizeRow
                });
            },
            getAutoSize: function(row) {
                var dataAccess = this.dataAccess;
                var autoSize = dataAccess.getAutoSize(row);
                if (autoSize) {
                    return autoSize;
                }
                autoSize = this.__calculateAutoSize(row);
                dataAccess.setAutoSize(autoSize, row);
                return autoSize;
            },
            resizeRow: function(size, row) {
                this.dataAccess.setRowHeight(size, row);
                this.coreRefresh(true);
            },
            resizeCol: function(size, col) {
                this.dataAccess.setColumnWidth(size, col);
                this.coreRefresh(true);
            },
            getRowSize: function(index) {
                return this.dataAccess.getRowHeight(index);
            },
            getColSize: function(index) {
                return this.dataAccess.getColumnWidth(index);
            },
            exchangeRow: function(index, range) {
                this.dataAccess.exchangeRow(index, range);
            },
            // TODO 优化底层存储后再实现
            exchangeColumn: function(index, range) {
                debugger;
            },
            __calculateAutoSize: function(row) {
                var currentStyle;
                var currentValue;
                var contents = [];
                var $contentPanel = $(this.contentPanel);
                var contentStyle = this.contentPanel.style;
                var total = this.dataAccess.getTotal();
                for (var i = 0, len = total.col; i < len; i++) {
                    currentValue = this.valueModule.getDisplayValue(row, i);
                    if (currentValue) {
                        $contentPanel.css(this.style.getStyle(row, i));
                        contents.push('<div style="' + contentStyle.cssText + '">' + currentValue + "&nbsp;" + "</div>");
                        contentStyle.cssText = "";
                    }
                }
                if (!contents.length) {
                    return 1;
                }
                this.contentPanel.innerHTML = contents.join("");
                var size = this.contentPanel.getBoundingClientRect();
                return size.height + 2 * 2;
            }
        });
        Cell.deps = [ "dataAccess", "value", "style" ];
        return Cell;
    }
};

//src/core/commands/clear.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[36] = {
    value: function(require) {
        return _p.r(0).create("ClearCommand", {
            name: "clearcontent clearformat",
            base: _p.r(90),
            execBefore: function(name, row, col) {
                var ranges = this.__getRanges(row, col);
                return [ ranges ];
            },
            execute: function(name) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            /**
         * clearconent()
         * clearcontent(row, col)
         * clearcontent(start, end)
         * clearcontent([range1, range2])
         */
            clearcontent: function(ranges) {
                this.rs("c.clear.content", ranges);
            },
            clearformat: function(ranges) {
                this.rs("c.clear.style", ranges);
            },
            __getRanges: function(row, col) {
                var range;
                if (row === undefined) {
                    range = this.rs("c.range");
                    return range.getAllSelection();
                }
                if (!isNaN(+row)) {
                    return [ {
                        start: {
                            row: row,
                            col: col
                        },
                        end: {
                            row: row,
                            col: col
                        }
                    } ];
                }
                if ($.isArray(row)) {
                    return row;
                }
                return [ {
                    start: row,
                    end: col
                } ];
            }
        });
    }
};

//src/core/commands/export.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[37] = {
    value: function(require) {
        return _p.r(0).create("InitCommand", {
            base: _p.r(83),
            execute: function(commandName, hasDetails) {
                return this.rs("c.struct").export(hasDetails);
            }
        });
    }
};

//src/core/commands/init.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[38] = {
    value: function(require) {
        return _p.r(0).create("InitCommand", {
            base: _p.r(83),
            name: "init load",
            execute: function(commandName, data) {
                this.rs("c.load", data);
            }
        });
    }
};

//src/core/commands/move.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[39] = {
    value: function(require) {
        return _p.r(0).create("MoveCommand", {
            base: _p.r(83),
            name: "moveright moveup movedown moveleft",
            execute: function(name, count) {
                this[name](count);
            },
            moveright: function(count) {
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var viewEnd = struct.getViewEnd();
                var viewStart = struct.getViewStart();
                var total = struct.getTotal();
                var row = focus.row;
                var col = focus.col + count;
                if (col >= total.col) {
                    return;
                }
                if (row >= viewEnd.row) {
                    this.execCommand("scrollrowto", row, true);
                } else if (row < viewStart.row) {
                    this.execCommand("scrollrowto", row, false);
                }
                if (col >= viewEnd.col) {
                    this.execCommand("scrollcolumnto", col, true);
                } else if (col < viewStart.col) {
                    this.execCommand("scrollcolumnto", col, false);
                }
                this.rs("c.range.right", count);
            },
            moveleft: function(count) {
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var row = focus.row;
                var col = focus.col - count;
                if (col < 0) {
                    return;
                }
                if (row >= viewEnd.row) {
                    this.execCommand("scrollrowto", row, true);
                } else if (row < viewStart.row) {
                    this.execCommand("scrollrowto", row, false);
                }
                if (col >= viewEnd.col) {
                    this.execCommand("scrollcolumnto", col, true);
                } else if (col < viewStart.col) {
                    this.execCommand("scrollcolumnto", col, false);
                }
                this.rs("c.range.left", count);
            },
            moveup: function(count) {
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var row = focus.row - count;
                var col = focus.col;
                if (row < 0) {
                    return;
                }
                if (row >= viewEnd.row) {
                    this.execCommand("scrollrowto", row, true);
                } else if (row < viewStart.row) {
                    this.execCommand("scrollrowto", row, false);
                }
                if (col >= viewEnd.col) {
                    this.execCommand("scrollcolumnto", col, true);
                } else if (col < viewStart.col) {
                    this.execCommand("scrollcolumnto", col, false);
                }
                this.rs("c.range.up", count);
            },
            movedown: function(count) {
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var total = struct.getTotal();
                var row = focus.row + count;
                var col = focus.col;
                if (row >= total.row) {
                    return;
                }
                if (row >= viewEnd.row) {
                    this.execCommand("scrollrowto", row, true);
                } else if (row < viewStart.row) {
                    this.execCommand("scrollrowto", row, false);
                }
                if (col >= viewEnd.col) {
                    this.execCommand("scrollcolumnto", col, true);
                } else if (col < viewStart.col) {
                    this.execCommand("scrollcolumnto", col, false);
                }
                this.rs("c.range.down", count);
            }
        });
    }
};

//src/core/commands/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[40] = {
    value: function(require) {
        return _p.r(0).create("MoveCommand", {
            base: _p.r(83),
            name: "focus expandright expandleft expanddown expandup",
            execute: function(name) {
                this[name].apply(this, [].slice.call(arguments, 1));
            },
            focus: function(row, col) {
                this.__update(row, col);
                this.rs("c.range.focus", row, col);
            },
            expandright: function(count) {
                this.rs("c.selection.expand.right", count);
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var range = this.rs("c.range");
                var start = range.getStart();
                var end = range.getEnd();
                if (start.col === focus.col) {
                    this.__update(end.row, end.col);
                } else {
                    this.__update(start.row, start.col);
                }
            },
            expandleft: function(count) {
                this.rs("c.selection.expand.left", count);
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var range = this.rs("c.range");
                var start = range.getStart();
                var end = range.getEnd();
                if (start.col === focus.col) {
                    this.__update(end.row, end.col);
                } else {
                    this.__update(start.row, start.col);
                }
            },
            expanddown: function(count) {
                this.rs("c.selection.expand.down", count);
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var range = this.rs("c.range");
                var start = range.getStart();
                var end = range.getEnd();
                if (start.row === focus.row) {
                    this.__update(end.row, end.col);
                } else {
                    this.__update(start.row, start.col);
                }
            },
            expandup: function(count) {
                this.rs("c.selection.expand.up", count);
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var range = this.rs("c.range");
                var start = range.getStart();
                var end = range.getEnd();
                if (start.row === focus.row) {
                    this.__update(end.row, end.col);
                } else {
                    this.__update(start.row, start.col);
                }
            },
            __update: function(row, col) {
                var range = this.rs("c.range");
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var commands = [];
                // 如果输入框不在视野内， 请求执行滚动
                if (row < viewStart.row) {
                    commands.push({
                        command: "scrollrowto",
                        args: [ row ]
                    });
                } else if (row >= viewEnd.row) {
                    commands.push({
                        command: "scrollrowto",
                        args: [ row, true ]
                    });
                }
                if (col < viewStart.col) {
                    commands.push({
                        command: "scrollcolumnto",
                        args: [ col ]
                    });
                } else if (col >= viewEnd.col) {
                    commands.push({
                        command: "scrollcolumnto",
                        args: [ col, true ]
                    });
                }
                if (commands.length) {
                    this.execCommand(commands);
                }
            }
        });
    }
};

//src/core/commands/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[41] = {
    value: function(require) {
        return _p.r(0).create("ResizeCommand", {
            name: "resizerow resizecol",
            base: _p.r(90),
            execute: function(name, size, index) {
                if (name === "resizerow") {
                    return this.rs("c.resize.row", size, index);
                } else {
                    return this.rs("c.resize.column", size, index);
                }
            },
            unexecute: function(name, size, index) {
                return this.execute(name, size, index);
            },
            getStackInfo: function(name, size, index) {
                var size;
                if (name === "resizerow") {
                    size = this.rs("c.cell.row.size", index);
                } else {
                    size = this.rs("c.cell.col.size", index);
                }
                return [ size, index ];
            }
        });
    }
};

//src/core/commands/scroll.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[42] = {
    value: function(require) {
        return _p.r(0).create("MoveCommand", {
            base: _p.r(83),
            name: "scrollrowto scrollcolumnto scrollrow scrollcolumn",
            execute: function(name, count, toEnd) {
                this[name](count, toEnd);
            },
            scrollrowto: function(count, toEnd) {
                return this.rs("c.row.scrollto", count, !!toEnd);
            },
            scrollcolumnto: function(count, toEnd) {
                return this.rs("c.col.scrollto", count, !!toEnd);
            },
            scrollrow: function(count) {
                return this.rs("c.row.scroll", count);
            },
            scrollcolumn: function(count) {
                return this.rs("c.col.scroll", count);
            }
        });
    }
};

//src/core/commands/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[43] = {
    value: function(require) {
        return _p.r(0).create("StyleCommand", {
            name: "color fontsize font bold italic fill horizontal vertical",
            base: _p.r(90),
            execBefore: function(name) {
                var args = [];
                var data;
                switch (name) {
                  case "bold":
                  case "italic":
                    data = this.__getCells(arguments[1], arguments[2]);
                    args[0] = data.start;
                    args[1] = data.end;
                    break;

                  default:
                    data = this.__getCells(arguments[2], arguments[3]);
                    args[0] = arguments[1];
                    args[1] = data.start;
                    args[2] = data.end;
                    break;
                }
                return args;
            },
            queryValueBefore: function(name) {
                if (arguments[1] !== undefined) {
                    return [ arguments[1], arguments[2] ];
                }
                var focus = this.rs("c.range").getFocus();
                return [ focus.row, focus.col ];
            },
            execute: function(name) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            queryValue: function(name) {
                return this["query" + name].apply(this, [].slice.call(arguments, 1));
            },
            color: function(val, start, end) {
                this.rs("c.setstyle", "color", val, start, end);
            },
            fontsize: function(val, start, end) {
                this.rs("c.setstyle", "fontSize", val, start, end);
            },
            font: function(val, start, end) {
                this.rs("c.setstyle", "fontFamily", val, start, end);
            },
            italic: function(start, end) {
                var struct = this.rs("c.struct");
                if (struct.getUserStyle(start.row, start.col).fontStyle === "italic") {
                    this.rs("c.setstyle", "fontStyle", undefined, start, end);
                } else {
                    this.rs("c.setstyle", "fontStyle", "italic", start, end);
                }
            },
            bold: function(start, end) {
                var struct = this.rs("c.struct");
                if (struct.getUserStyle(start.row, start.col).fontWeight === "bold") {
                    this.rs("c.setstyle", "fontWeight", undefined, start, end);
                } else {
                    this.rs("c.setstyle", "fontWeight", "bold", start, end);
                }
            },
            fill: function(val, start, end) {
                this.rs("c.setstyle", "backgroundColor", val, start, end);
            },
            horizontal: function(val, start, end) {
                this.rs("c.setstyle", "textAlign", val, start, end);
            },
            vertical: function(val, start, end) {
                this.rs("c.setstyle", "verticalAlign", val, start, end);
            },
            /* ------------ query -----------*/
            queryfont: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.fontFamily;
            },
            querycolor: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.color;
            },
            queryfontsize: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.fontSize;
            },
            querybold: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.fontWeight === "bold";
            },
            queryitalic: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.fontStyle === "italic";
            },
            queryfill: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.backgroundColor;
            },
            queryhorizontal: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.textAlign;
            },
            queryvertical: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle(row, col);
                return value.verticalAlign;
            },
            __getCells: function(start, end) {
                if (start === undefined) {
                    var range = this.rs("c.range");
                    if (!range.isValid()) {
                        return null;
                    }
                    return {
                        start: range.getStart(),
                        end: range.getEnd()
                    };
                }
                if ($.isNumeric(start)) {
                    return {
                        start: {
                            row: start,
                            col: end
                        },
                        end: {
                            row: start,
                            col: end
                        }
                    };
                }
                var data = this.cs("c.cell.compare", start, end);
                return {
                    start: data.min,
                    end: data.max
                };
            }
        });
    }
};

//src/core/commands/write.js
/**
 * @file 单元格写入命令的实现
 * @author hancong03@baiud.com
 */
_p[44] = {
    value: function(require) {
        return _p.r(0).create("WriteCommand", {
            base: _p.r(90),
            /**
         * 命令执行入口
         * @param name 当前运行的命令名称
         * @param content 将要写入的内容
         * @param row 写入的单元格所在的行索引
         * @param col 写入的单元格所在的列索引
         */
            execute: function(name, content, row, col) {
                var cell = this.__getCells(row, col);
                if (!cell) {
                    return false;
                }
                this.rs("c.write", content, cell.row, cell.col);
            },
            /**
         * 撤销写入操作
         * @param name 当前运行的命令名称
         * @param content 上一次命令之前的内容
         * @param row 发生撤销操作的单元格所在的行索引
         * @param col 发生撤销操作的单元格所在的列索引
         */
            unexecute: function(name, content, row, col) {
                this.rs("c.write", content, row, col);
            },
            /**
         * 获取命令执行前的快照，该快照的内容将用于undo操作的参数
         * 该方法由系统自动调用
         * @param name 当前运行命令的名称
         * @param content 即将写入的内容
         * @param row 即将写入的目标单元格的行索引
         * @param col 即将写入的目标单元格的列索引
         * @returns {*[]} 返回撤销写入命令执行时所需的参数列表
         */
            getStackInfo: function(name, content, row, col) {
                // 获取写入前，单元格的内容
                var struct = this.rs("c.struct");
                content = struct.getRawValue(row, col);
                return [ content, row, col ];
            },
            /**
         * 参数补全
         * @private
         */
            __getCells: function(row, col) {
                if (row === undefined) {
                    var range = this.rs("c.range");
                    if (!range.isValid()) {
                        return null;
                    }
                    return range.getFocus();
                }
                if (!isNaN(+row)) {
                    return {
                        row: row,
                        col: col
                    };
                }
            }
        });
    }
};

//src/core/data/basic.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[45] = {
    value: function(require) {
        return $.extend({
            // 自动大小
            auto: {},
            // 公式
            formula: {},
            // 单元格临时类型
            type: {},
            /* --- 计算 --- */
            viewStart: {
                row: 0,
                col: 0
            },
            viewEnd: {
                row: 0,
                col: 0
            },
            grid: {},
            effective: {
                row: 0,
                col: 0
            },
            // 当前可见的行列数
            visibleCount: {},
            // 单元格坐标偏移
            offset: 0,
            borderWidth: 1,
            boundary: {},
            space: {},
            local: {}
        }, _p.r(91));
    }
};

//src/core/data/data-access.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[46] = {
    value: function(require) {
        var basic = _p.r(45);
        var DataHelper = _p.r(47);
        var KernelHelper = _p.r(94);
        var CONFIG = _p.r(33);
        return _p.r(0).create("DataAccess", $.extend({
            base: _p.r(87),
            data: null,
            localData: null,
            init: function() {
                this.data = $._clone(basic);
                this.__initStaticData();
            },
            reload: function(source) {
                this.data = $._clone(basic);
                $.extend(this.data, source);
                this.__resetLocalData(this.localConfig);
                this.__initStaticData();
            },
            __initStaticData: function() {
                this.data.borderWidth = CONFIG.border.width;
            },
            initLocalData: function(localConfig) {
                this.localConfig = localConfig;
                this.__resetLocalData(localConfig);
            },
            __resetLocalData: function(localConfig) {
                this.data.local = localConfig.style;
                this.data.total = {
                    row: localConfig.maxRowCount,
                    col: localConfig.maxColCount
                };
            },
            /* --- 读取 --- */
            getGrid: function() {
                return this.data.grid;
            },
            getOffset: function() {
                return this.data.offset;
            },
            getViewStart: function() {
                return this.data.viewStart;
            },
            getViewEnd: function() {
                return this.data.viewEnd;
            },
            getVisibleCount: function() {
                return this.data.visibleCount;
            },
            getBorderWidth: function() {
                return this.data.borderWidth;
            },
            getTotal: function() {
                return this.kernelGetTotal();
            },
            getBoundary: function() {
                return this.data.boundary;
            },
            getSpace: function() {
                return this.data.space;
            },
            getAutoSize: function(row) {
                var index = this.indexToKey(row, 0);
                return this.data.auto[index];
            },
            getColumnWidth: function(col) {
                return this.kernelGetColumnWidth(col);
            },
            getRowHeight: function(row) {
                return this.kernelGetRowHeight(row);
            },
            getType: function(row, col) {
                return this.data.type[this.indexToKey(row, col)];
            },
            getFormula: function(row, col) {
                return this.data.formula[this.indexToKey(row, col)];
            },
            getFormat: function(row, col) {
                return this.kernelGetFormat(row, col);
            },
            getLocalStyle: function() {
                return this.data.local;
            },
            //getCellByName: function (name) {
            //    return this.data.grid;
            //},
            getValue: function(row, col) {
                return this.kernelGetValue(row, col);
            },
            getStyle: function(row, col) {
                return this.kernelGetStyle(row, col);
            },
            getDefaultStyle: function() {
                return $.extend({}, this.localDefaultStyle, this.kernelGetDefaultStyle());
            },
            getEffectiveIndex: function() {
                var effectiveIndex = this.data.effective;
                return {
                    row: effectiveIndex.row,
                    col: effectiveIndex.col
                };
            },
            /* ---- setter ---- */
            clearContent: function(ranges) {
                this.kernelClearValue(ranges);
                var end;
                var rows = [];
                var cols = [];
                for (var i = 0, len = ranges.length; i < len; i++) {
                    end = ranges[0].end;
                    rows[i] = end.row;
                    cols[i] = end.col;
                }
                this.data.effective = DataHelper.updateEffective(this.data, Math.max.apply(null, rows), Math.max.apply(null, cols));
            },
            clearStyle: function(ranges) {
                this.kernelClearStyle(ranges);
            },
            setTotal: function(row, col) {
                this.kernelSetTotal(row, col);
            },
            setOffset: function(offset) {
                this.data.offset = offset;
            },
            setSpace: function(width, height) {
                this.data.space = {
                    width: width,
                    height: height
                };
            },
            setGrid: function(grid) {
                this.data.grid = grid;
            },
            setVisibleCount: function(row, col) {
                this.data.visibleCount = {
                    row: row,
                    col: col
                };
            },
            setViewStart: function(row, col) {
                this.data.viewStart = {
                    row: row,
                    col: col
                };
            },
            setViewEnd: function(row, col) {
                this.data.viewEnd = {
                    row: row,
                    col: col
                };
            },
            setBoundary: function(width, height) {
                this.data.boundary = {
                    width: width,
                    height: height
                };
            },
            setType: function(type, row, col) {
                this.data.type[this.indexToKey(row, col)] = type;
            },
            setValue: function(content, row, col) {
                var effectiveIndex = this.data.effective;
                this.kernelSetValue(content, row, col);
                if (content) {
                    effectiveIndex.row = Math.max(effectiveIndex.row, row);
                    effectiveIndex.col = Math.max(effectiveIndex.col, col);
                    return;
                }
                this.data.effective = DataHelper.updateEffective(this.data, row, col);
            },
            setStyle: function(styleName, styleValue, start, end) {
                this.kernelSetStyle(styleName, styleValue, start, end);
            },
            batchSetStyle: function(styles, start, end) {
                this.kernelBatchSetStyle(styles, start, end);
            },
            setAutoSize: function(size, row) {
                this.data.auto[this.indexToKey(row, 0)] = size || undefined;
            },
            setColumnWidth: function(size, col) {
                this.kernelSetColumnWidth(size, col);
            },
            setRowHeight: function(size, col) {
                this.kernelSetRowHeight(size, col);
            },
            setFormula: function(formula, row, col) {
                this.data.formula[this.indexToKey(row, col)] = formula || undefined;
            },
            exchangeRow: function(index, range) {
                var autoData = this.data.auto;
                this.kernelExchangeRow(index, range);
                KernelHelper.exchangeRow(this.data.type, index, range);
                KernelHelper.exchangeRow(this.data.formula, index, range);
                // clear auto size
                for (var i = range.start.row, limit = range.end.row; i <= limit; i++) {
                    autoData[i] = undefined;
                }
            },
            "export": function(hasDetails) {
                return this.kernelExport(hasDetails);
            }
        }, _p.r(104)));
    }
};

//src/core/data/helper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[47] = {
    value: function(require) {
        var MAX_COLUMN_COUNT = Math.pow(26, 3);
        return {
            updateEffective: function(data, row, col) {
                var valueData = data.value;
                var oldMaxData = data.effective;
                var newMaxData = {
                    row: oldMaxData.row,
                    col: oldMaxData.col
                };
                var tmp;
                var colIndexList = [];
                if (oldMaxData.row === row) {
                    for (var key in valueData) {
                        if (!valueData[key]) {
                            continue;
                        }
                        tmp = key;
                    }
                    if (tmp) {
                        newMaxData.row = Math.floor(tmp / MAX_COLUMN_COUNT);
                    }
                }
                if (oldMaxData.col === col) {
                    for (var key in valueData) {
                        if (!valueData[key]) {
                            continue;
                        }
                        colIndexList.push(key % MAX_COLUMN_COUNT);
                    }
                    if (colIndexList.length) {
                        newMaxData.col = Math.max.apply(null, colIndexList);
                    }
                }
                return newMaxData;
            }
        };
    }
};

//src/core/datetime/datetime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[48] = {
    value: function(require) {
        var ONE_DAY = 24 * 3600 * 1e3;
        var START_POINT = new Date(Date.UTC(1899, 11, 31, 0, 0, 0));
        return _p.r(0).create("DateTime", {
            base: _p.r(87),
            init: function() {},
            dateValueOf: function(dateStr) {
                var date = new Date(dateStr);
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
                return (date - START_POINT) / ONE_DAY + 1;
            }
        });
    }
};

//src/core/device.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[49] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("Device", {
            contentPanel: null,
            $contentPanel: null,
            style: null,
            dataAccess: null,
            valueModule: null,
            base: _p.r(87),
            init: function() {
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.zoom.refresh": this.refreshZoom,
                    "c.update.viewport": this.updateViewport
                });
            },
            refreshZoom: function() {
                var currentZoom = Math.ceil(window.devicePixelRatio);
                var config = this.getConfig();
                if (config.ZOOM === currentZoom) {
                    return;
                }
                config.ZOOM = currentZoom;
                this.postMessage("c.container.resize");
                this.coreRefresh(true);
            },
            updateViewport: function() {
                this.resizeContianer();
                this.postMessage("c.container.resize");
                this.coreRefresh(true);
            }
        });
    }
};

//src/core/range/range-facade.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[50] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("RangeFacade", {
            info: null,
            base: _p.r(87),
            reload: function(rangeInfo) {
                this.info = $.extend(true, {}, rangeInfo);
            },
            getFocus: function() {
                return $._clone(this.info.focus);
            },
            getStart: function() {
                return $._clone(this.info.start);
            },
            getEnd: function() {
                return $._clone(this.info.end);
            },
            getAllSelection: function() {
                return [ $._clone({
                    start: this.info.start,
                    end: this.info.end
                }) ];
            },
            isMultiple: function() {
                var focus = this.info.focus;
                var start = this.info.start;
                var end = this.info.end;
                return start.row !== focus.row || start.col !== focus.col || end.row !== focus.row || end.col !== focus.col;
            },
            isValid: function() {
                return this.info.focus.row >= 0 && this.info.focus.col >= 0;
            }
        });
    }
};

//src/core/range/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[51] = {
    value: function(require) {
        var RangeFacade = _p.r(50);
        var Range = _p.r(0).create("Range", {
            dataAccess: null,
            original: {},
            focus: {},
            start: {},
            end: {},
            base: _p.r(87),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.registerService({
                    // setter
                    "c.range.focus": this.setFocus,
                    "c.range.selection": this.setSelection,
                    "c.range.disable": this.disable,
                    "c.range.set": this.setRange,
                    // getter
                    "c.range": this.getRange,
                    "c.range.down": this.moveDown,
                    "c.range.up": this.moveUp,
                    "c.range.left": this.moveLeft,
                    "c.range.right": this.moveRight,
                    "c.selection.expand.down": this.expandDown,
                    "c.selection.expand.right": this.expandRight,
                    "c.selection.expand.up": this.expandUp,
                    "c.selection.expand.left": this.expandLeft
                });
            },
            setRange: function(focus, start, end) {
                // 传递的是一个RangeFacade对象
                if (!start) {
                    end = focus.getEnd();
                    start = focus.getStart();
                    focus = focus.getFocus();
                }
                this.setFocus(focus.row, focus.col);
                this.setSelection(start, end);
                this.postMessage("c.range.change");
            },
            setFocus: function(row, col) {
                if (row === this.focus.row && col === this.focus.col) {
                    return;
                }
                this.focus = {
                    row: row,
                    col: col
                };
                this.start = {
                    row: row,
                    col: col
                };
                this.end = {
                    row: row,
                    col: col
                };
                this.postMessage("c.focus.change");
                this.postMessage("c.range.change");
            },
            setSelection: function(start, end) {
                var tmp = this.cs("c.cell.compare", start, end);
                start = tmp.min;
                end = tmp.max;
                var rangeStart = this.start;
                var rangeEnd = this.end;
                if (rangeStart.row === start.row && rangeStart.col == start.col && rangeEnd.row === end.row && rangeEnd.col === end.col) {
                    return;
                }
                this.start.row = start.row;
                this.start.col = start.col;
                this.end.row = end.row;
                this.end.col = end.col;
                this.postMessage("c.range.change");
            },
            expandDown: function(count) {
                var start = this.start;
                var focus = this.focus;
                var end = this.end;
                var limit = this.dataAccess.getTotal().row - 1;
                if (start.row === focus.row) {
                    end.row += count;
                    if (end.row > limit) {
                        end.row = limit;
                    }
                } else {
                    start.row += count;
                    if (start.row > limit) {
                        start.row = limit;
                    }
                }
                var tmp = this.cs("c.cell.compare", start, end);
                this.start = tmp.min;
                this.end = tmp.max;
                this.postMessage("c.range.change");
            },
            expandRight: function(count) {
                var start = this.start;
                var focus = this.focus;
                var end = this.end;
                var limit = this.dataAccess.getTotal().col - 1;
                if (start.col === focus.col) {
                    end.col += count;
                    if (end.col > limit) {
                        end.col = limit;
                    }
                } else {
                    start.col += count;
                    if (start.col > limit) {
                        start.col = limit;
                    }
                }
                var tmp = this.cs("c.cell.compare", start, end);
                this.start = tmp.min;
                this.end = tmp.max;
                this.postMessage("c.range.change");
            },
            expandUp: function(count) {
                var start = this.start;
                var focus = this.focus;
                var end = this.end;
                if (start.row === focus.row) {
                    end.row -= count;
                    if (end.row < 0) {
                        end.row = 0;
                    }
                } else {
                    start.row -= count;
                    if (start.row < 0) {
                        start.row = 0;
                    }
                }
                var tmp = this.cs("c.cell.compare", start, end);
                this.start = tmp.min;
                this.end = tmp.max;
                this.postMessage("c.range.change");
            },
            expandLeft: function(count) {
                var start = this.start;
                var focus = this.focus;
                var end = this.end;
                if (start.col === focus.col) {
                    end.col -= count;
                    if (end.col < 0) {
                        end.col = 0;
                    }
                } else {
                    start.col -= count;
                    if (start.col < 0) {
                        start.col = 0;
                    }
                }
                var tmp = this.cs("c.cell.compare", start, end);
                this.start = tmp.min;
                this.end = tmp.max;
                this.postMessage("c.range.change");
            },
            disable: function() {
                this.original = {};
                this.focus = {};
                this.start = {};
                this.end = {};
                this.postMessage("c.range.disabled");
            },
            getRange: function() {
                var facade = this.createComponent(RangeFacade);
                facade.reload({
                    focus: this.focus,
                    start: this.start,
                    end: this.end
                });
                return facade;
            },
            moveDown: function(count) {
                var limit = this.dataAccess.getTotal().row - 1;
                count = count | 0;
                if (count <= 0 || this.focus.row >= limit) {
                    return;
                }
                count += this.focus.row;
                if (count > limit) {
                    count = limit;
                }
                this.setFocus(count, this.focus.col);
                this.postMessage("c.range.change");
            },
            moveUp: function(count) {
                if (count <= 0 || this.focus.row === 0) {
                    return;
                }
                count = this.focus.row - count;
                if (count < 0) {
                    count = 0;
                }
                this.setFocus(count, this.focus.col);
                this.postMessage("c.range.change");
            },
            moveLeft: function(count) {
                if (count <= 0 || this.focus.col === 0) {
                    return;
                }
                count = this.focus.col - count;
                if (count < 0) {
                    count = 0;
                }
                this.setFocus(this.focus.row, count);
                this.postMessage("c.range.change");
            },
            moveRight: function(count) {
                var limit = this.dataAccess.getTotal().col - 1;
                count = count | 0;
                if (count <= 0 || this.focus.col >= limit) {
                    return;
                }
                count += this.focus.col;
                if (count > limit) {
                    count = limit;
                }
                this.setFocus(this.focus.row, count);
                this.postMessage("c.range.change");
            }
        });
        Range.deps = [ "dataAccess" ];
        return Range;
    }
};

//src/core/struct/parser.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[52] = {
    value: function(require) {
        return _p.r(0).create("Parser", {
            base: _p.r(84),
            parse: function(source) {
                return source;
            }
        });
    }
};

//src/core/struct/struct-facade.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[53] = {
    value: function(require) {
        return _p.r(0).create("Struct", {
            dataAccess: null,
            valueModule: null,
            style: null,
            init: function(dataAccess, valueModule, style) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.style = style;
            },
            getGrid: function() {
                return this.dataAccess.getGrid();
            },
            getOffset: function() {
                return this.dataAccess.getOffset();
            },
            getViewStart: function() {
                return this.dataAccess.getViewStart();
            },
            getViewEnd: function() {
                return this.dataAccess.getViewEnd();
            },
            getVisibleCount: function() {
                return this.dataAccess.getVisibleCount();
            },
            getBorderWidth: function() {
                return this.dataAccess.getBorderWidth();
            },
            getTotal: function() {
                return this.dataAccess.getTotal();
            },
            getBoundary: function() {
                return this.dataAccess.getBoundary();
            },
            getSpace: function() {
                return this.dataAccess.getSpace();
            },
            getCellByName: function(name) {
                return this.dataAccess.getCellByName();
            },
            getComputedStyle: function(row, col) {
                return this.style.getStyle(row, col);
            },
            getUserStyle: function(row, col) {
                return this.style.getUserStyle(row, col);
            },
            getSystemStyle: function() {
                return this.dataAccess.getLocalStyle();
            },
            getDisplayValue: function(row, col, isDecode) {
                return this.valueModule.getDisplayValue(row, col, isDecode);
            },
            getComputedValueInfo: function(row, col) {
                return this.valueModule.getComputedValueInfo(row, col);
            },
            getRawValue: function(row, col) {
                return this.valueModule.getRawValue(row, col);
            },
            getDefaultStyle: function() {
                return this.dataAccess.getDefaultStyle();
            },
            getEffectiveIndex: function() {
                return this.dataAccess.getEffectiveIndex();
            },
            "export": function(hasDetails) {
                return this.dataAccess.export(hasDetails);
            }
        });
    }
};

//src/core/struct/struct.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[54] = {
    value: function(require) {
        var StructFacade = _p.r(53);
        var Parser = _p.r(52);
        var basic = _p.r(45);
        var LOCAL_CONFIG = _p.r(32);
        var Struct = _p.r(0).create("Struct", {
            base: _p.r(87),
            //-------- component
            actuary: null,
            dataAccess: null,
            init: function(dataAccess, actuary, valueModule, style) {
                this.dataAccess = dataAccess;
                this.dataAccess.initLocalData(LOCAL_CONFIG);
                this.actuary = actuary;
                this.structFacade = this.createComponent(StructFacade, dataAccess, valueModule, style);
                this.parser = this.createComponent(Parser);
                this.initService();
            },
            load: function(source) {
                if (source) {
                    source = this.parser.parse(source);
                    this.dataAccess.reload(source);
                    this.actuary.reinit();
                }
                this.actuary.calculate();
            },
            getStruct: function() {
                return this.structFacade;
            },
            initService: function() {
                this.registerService({
                    "c.struct": this.getStruct,
                    "c.load": this.load
                });
            }
        });
        Struct.deps = [ "dataAccess", "actuary", "value", "style" ];
        return Struct;
    }
};

//src/core/style/defaults.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[55] = {
    value: {
        format: {
            // 精度, 小数位数
            precision: 2,
            // 千位分隔符
            delimiter: false,
            pattern: {
                NUMERIC: [ "($number)", "($number)", "$number", "-$number", "-$number" ]
            }
        },
        // 默认pattern设置
        DEFAULT_PATTERN: {
            NUMERIC: 3
        },
        style: {
            // 水平对齐
            textAlign: "left",
            // 垂直对齐
            verticalAlign: "bottom",
            // 默认首选字体
            fontFamily: "Hiragino Sans GB",
            // 字形
            fontStyle: "normal",
            // 字体加粗
            fontWeight: "normal",
            // 字体大小
            fontSize: 11,
            // 字体颜色
            color: "#000",
            // 背景填充色
            backgroundColor: "#FFF",
            // 文本内容的划线
            textDecoration: "none",
            // 行高
            lineHeight: 1.2
        },
        // 候选字体
        candidateFont: [ "arial", "sans", "sans-serif" ].join(","),
        // 边框
        // TODO 未实现
        border: {}
    }
};

//src/core/style/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[56] = {
    value: function(require) {
        var DEFAULT_FORMAT = _p.r(55);
        var TYPE_STYLE = _p.r(57);
        var Style = _p.r(0).create("Style", {
            dataAccess: null,
            valueModule: null,
            base: _p.r(87),
            init: function(dataAccess, valueModule) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.setstyle": this.setStyle,
                    "c.batch.setstyle": this.batchSetStyle,
                    "c.clear.style": this.clearStyle
                });
            },
            /**
         * 获取指定单元格的计算后的样式表
         * @param row
         * @param col
         */
            getStyle: function(row, col) {
                var userStyle = this.dataAccess.getStyle(row, col);
                var typeStyle = this.getTypeStyle(row, col);
                var style = $.extend({}, this.dataAccess.getLocalStyle(), typeStyle, userStyle);
                return this.repairStyle(style);
            },
            getUserStyle: function(row, col) {
                var userStyle = this.dataAccess.getStyle(row, col);
                if (userStyle.fontSize) {
                    userStyle.fontSize += "px";
                }
                return userStyle;
            },
            /**
         * 修复样式值， 使其符合css规范
         * @param style
         * @returns {*}
         */
            repairStyle: function(style) {
                style.fontSize += "px";
                style.fontFamily += "," + DEFAULT_FORMAT.candidateFont;
                return style;
            },
            setStyle: function(styleName, styleValue, start, end) {
                this.dataAccess.setStyle(styleName, styleValue, start, end);
                if (!isNaN(+start)) {
                    this.dataAccess.setAutoSize(null, start);
                } else {
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        this.dataAccess.setAutoSize(null, i);
                    }
                }
                this.coreRefresh(true);
            },
            clearStyle: function(ranges) {
                var range;
                var start;
                var end;
                this.dataAccess.clearStyle(ranges);
                for (var i = 0, len = ranges.length; i < len; i++) {
                    range = ranges[i];
                    start = range.start;
                    end = range.end;
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        this.dataAccess.setAutoSize(null, i);
                    }
                }
                this.coreRefresh(true);
            },
            /**
         * 批量设置style
         * @param styles
         * @param start
         * @param end
         */
            batchSetStyle: function(styles, start, end) {
                this.dataAccess.batchSetStyle(styles, start, end);
                if (!isNaN(+start)) {
                    this.dataAccess.setAutoSize(null, start);
                } else {
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        this.dataAccess.setAutoSize(null, i);
                    }
                }
                this.coreRefresh(true);
            },
            /**
         * 根据值的类型获取样式
         */
            getTypeStyle: function(row, col) {
                var valueInfo = this.valueModule.getComputedValueInfo(row, col);
                return TYPE_STYLE[valueInfo.type];
            }
        });
        Style.deps = [ "dataAccess", "value" ];
        return Style;
    }
};

//src/core/style/type-styles.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[57] = {
    value: {
        TEXT: {
            textAlign: "left"
        },
        NUMERIC: {
            textAlign: "right"
        },
        BOOLEAN: {
            textAlign: "center"
        },
        UNDEFINED: {
            textAlign: "left"
        },
        DATE: {
            textAlign: "right"
        },
        TIME: {
            textAlign: "right"
        },
        ERROR: {
            textAlign: "center"
        }
    }
};

//src/core/value/format/analyzer/analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[58] = {
    value: function(require) {
        var CELL_VALUE_TYPE = _p.r(68);
        var CELL_MODEL = _p.r(59);
        var BOOLEAN_VALUE = _p.r(67);
        var GeneralFormatter = _p.r(62);
        var NumericFormatter = _p.r(63);
        return {
            //getType: function (row, col) {
            //
            //    var cellType = this.dataAccess.getCellType(row, col);
            //
            //    if (cellType) {
            //        return cellType;
            //    }
            //
            //    var content = this.dataAccess.getValue(row, col);
            //    cellType = this.format(content);
            //    cellType = cellType.type;
            //
            //    this.dataAccess.setCellType(cellType, row, col);
            //
            //    return cellType;
            //
            //},
            /**
         * 对传递进来的内容进行格式化，并返回格式化后的值和类型
         * @param content
         * @returns {*}
         */
            analyze: function(content) {
                if (!content) {
                    return {
                        type: CELL_VALUE_TYPE.UNDEFINED,
                        value: undefined
                    };
                }
                if ($.isNumeric(content)) {
                    return {
                        type: CELL_VALUE_TYPE.NUMERIC,
                        value: +content + ""
                    };
                }
                var upperContnet = content.toUpperCase();
                if (upperContnet === BOOLEAN_VALUE.TRUE || upperContnet === BOOLEAN_VALUE.FALSE) {
                    return {
                        type: CELL_VALUE_TYPE.BOOLEAN,
                        value: upperContnet
                    };
                }
                return GeneralFormatter.format(content);
            }
        };
    }
};

//src/core/value/format/cell-model.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[59] = {
    value: {
        // 常规
        DEFAULT: "DEFAULT",
        // 数值
        NUMERIC: "NUMERIC",
        // 科学计数法
        SCIENTIFIC: "SCIENTIFIC",
        // 百分比
        PERCENTAGE: "PERCENTAGE",
        // 日期
        DATE: "DATE",
        // 时间
        TIME: "TIME",
        // 文本
        TEXT: "TEXT",
        // 货币
        CURRENCY: "CURRENCY",
        // 会计
        ACCOUNTANT: "ACCOUNTANT",
        // 分数
        FRACTION: "FRACTION"
    }
};

//src/core/value/format/defaults.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[60] = {
    value: {
        format: {
            // 精度, 小数位数
            precision: 2,
            // 千位分隔符
            delimiter: false,
            pattern: {
                NUMERIC: [ "($number)", "($number)", "$number", "-$number", "-$number" ]
            }
        },
        // 默认pattern设置
        DEFAULT_PATTERN: {
            NUMERIC: 3
        },
        //pattern: {
        //    // 数字前缀：货币
        //    prefix: ['￥', '$'],
        //    // 日期格式
        //    date: ['$yyyy/$m/$d', '$yyyy/$mm/$dd', '$yyyy年$mm月$dd日'],
        //    // 大写H表示24小时格式， 小写h表示12小时格式
        //    time: ['$H:$m:$s', '$HH:$mm:$ss', '$H:$m', '$HH:$mm', '$h:$m:$s', '$hh:$mm:$ss', '$h:$m', '$hh:$mm'],
        //    // 自动换行
        //    wrap: false
        //},
        style: {
            // 水平对齐
            textAlign: "left",
            // 垂直对齐
            verticalAlign: "bottom",
            // 默认首选字体
            fontFamily: "Hiragino Sans GB",
            // 字形
            fontStyle: "normal",
            // 字体加粗
            fontWeight: "normal",
            // 字体大小
            fontSize: 11,
            // 字体颜色
            color: "#000",
            // 背景填充色
            backgroundColor: "#FFF",
            // 文本内容的划线
            textDecoration: "none",
            // 行高
            lineHeight: 1.2
        },
        // 候选字体
        candidateFont: [ "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3" ].join(","),
        // 边框
        // TODO 未实现
        border: {}
    }
};

//src/core/value/format/format.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[61] = {
    value: function(require) {
        var FormatAnalyzer = _p.r(58);
        var Format = _p.r(0).create("Format", {
            dataAccess: null,
            base: _p.r(84),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
            },
            getFormatValue: function(row, col) {
                return this.dataAccess.getValue(row, col);
            },
            getCellType: function(row, col) {
                return this.analyzer.getType(row, col);
            },
            formatValue: function(content) {
                return FormatAnalyzer.analyze(content);
            }
        });
        Format.deps = [ "dataAccess" ];
        return Format;
    }
};

//src/core/value/format/formatter/general.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[62] = {
    value: function(require) {
        var CELL_VALUE_TYPE = _p.r(68);
        var CURRENT_YEAR = new Date().getFullYear();
        return {
            format: function(content) {
                var parsedValue;
                if ($.isNumeric(content)) {
                    return {
                        type: CELL_VALUE_TYPE.NUMERIC,
                        value: +content + ""
                    };
                }
                /* ----- 日期 -----*/
                parsedValue = dataFormat(content);
                if (parsedValue) {
                    return {
                        type: CELL_VALUE_TYPE.DATE,
                        value: parsedValue
                    };
                }
                /* ----- 时间 -----*/
                parsedValue = timeFormat(content);
                if (parsedValue) {
                    return {
                        type: CELL_VALUE_TYPE.TIME,
                        value: parsedValue
                    };
                }
                /* ---- text ----*/
                return {
                    type: CELL_VALUE_TYPE.TEXT,
                    value: content
                };
            }
        };
        function dataFormat(content) {
            var delimiter = "-";
            var tokens = content.split(delimiter);
            var year;
            var month;
            var day;
            if (tokens.length > 3 || tokens.length < 2) {
                delimiter = "/";
                tokens = content.split(delimiter);
            }
            if (tokens.length > 3 || tokens.length < 2) {
                return;
            }
            var count = tokens.length;
            // day
            day = +tokens[count - 1];
            if (!day || day > 31) {
                return;
            }
            // month
            month = +tokens[count - 2];
            if (!month || month > 12) {
                return;
            }
            // year
            if (tokens.length === 2) {
                return CURRENT_YEAR + delimiter + month + delimiter + day;
            }
            year = +tokens[count - 3];
            if (!year || year > 3e3 || year < 1e3) {
                return;
            }
            return year + delimiter + month + delimiter + day;
        }
        function timeFormat(content) {
            if (!/\d\d?:\d\d?\d\d?/.test(content)) {
                return;
            }
            var tokens = content.split(":");
            var count = tokens.length;
            var hour;
            var minute;
            var second;
            if (count > 3 || count < 2) {
                return;
            }
            if (tokens[0].length === 0) {
                return;
            }
            hour = +tokens[0];
            if (hour >= 24) {
                return;
            }
            hour = hour < 10 ? "0" + hour : hour;
            if (tokens[1].length === 0) {
                return;
            }
            minute = +tokens[1];
            if (minute >= 60) {
                return;
            }
            minute = minute < 10 ? "0" + minute : minute;
            if (!tokens[2]) {
                second = 0;
            } else {
                second = +tokens[2];
            }
            if (second >= 60) {
                return;
            }
            second = second < 10 ? "0" + second : second;
            return hour + ":" + minute + ":" + second;
        }
    }
};

//src/core/value/format/formatter/numeric.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[63] = {
    value: function(require) {
        return {
            format: function(value, option) {
                var integer;
                var suffix;
                var target;
                value = +value;
                var isNegative = value < 0;
                value = (+value).toFixed(option.precision) + "";
                if (option.delimiter) {
                    target = [];
                    integer = (+value).toFixed(0) + "";
                    suffix = value.substring(integer.length);
                    integer = integer.split("");
                    // 条件是大于零， 需要注意一下
                    for (var i = integer.length - 1; i > 0; i--) {
                        target.push(integer[i]);
                        if (i % 3 === 0) {
                            target.push(",");
                        }
                    }
                    target.push(integer[0]);
                    value = target.reverse().join("") + suffix;
                }
                if (isNegative) {
                    return option.pattern.replace("$number", value);
                }
                return value;
            },
            toExponential: function(value, precision) {
                return ((+value).toExponential(precision) + "").toUpperCase();
            }
        };
    }
};

//src/core/value/format/type-styles.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[64] = {
    value: {
        TEXT: {
            textAlign: "left"
        },
        NUMERIC: {
            textAlign: "right"
        },
        BOOLEAN: {
            textAlign: "center"
        },
        UNDEFINED: {
            textAlign: "left"
        },
        DATE: {
            textAlign: "right"
        },
        TIME: {
            textAlign: "right"
        },
        ERROR: {
            textAlign: "center"
        }
    }
};

//src/core/value/value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[65] = {
    value: function(require) {
        var $ = _p.r(2);
        var CELL_VALUE_TYPE = _p.r(68);
        var Format = _p.r(61);
        var Value = _p.r(0).create("Value", {
            dataAccess: null,
            format: null,
            base: _p.r(87),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.format = this.createComponent(Format, dataAccess);
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.write": this.writeCell,
                    "c.clear.content": this.clearCotnent
                });
            },
            writeCell: function(content, row, col) {
                this.corePrepareRefresh();
                this.clearFormula(row, col);
                this.dataAccess.setAutoSize(null, row);
                if (!content) {
                    this.dataAccess.setValue(null, row, col);
                    this.coreRefresh();
                    return;
                }
                // 在写入前对内容进行格式化
                var content = this.cs("c.encode.content", content);
                var formatData = this.format.formatValue(content);
                this.dataAccess.setValue(formatData.value, row, col);
                this.dataAccess.setType(formatData.type, row, col);
                if (formatData.type === CELL_VALUE_TYPE.TEXT && formatData.value.charAt(0) === "=" && formatData.value.trim().length > 1) {
                    this.recordFormula(formatData.value, row, col);
                }
                this.coreRefresh();
            },
            clearCotnent: function(ranges) {
                var range;
                var start;
                var end;
                this.dataAccess.clearContent(ranges);
                for (var i = 0, len = ranges.length; i < len; i++) {
                    range = ranges[i];
                    start = range.start;
                    end = range.end;
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            this.clearFormula(i, j);
                        }
                        this.dataAccess.setAutoSize(null, i);
                    }
                }
                this.coreRefresh(true);
            },
            /**
         * 获取用于显示的值
         * 用于显示的值是经过格式化后的值
         */
            getDisplayValue: function(row, col, isDecode) {
                if (isDecode === false) {
                    return this.getComputedValueInfo(row, col).value;
                }
                return this.cs("c.decode.content", this.getComputedValueInfo(row, col).value);
            },
            /**
         * 返回单元格进过计算后的值的信息， 包含计算后的值和该值的类型
         * 该方法计算单元格的值不同于getRawValue的地方在于：
         * 如果单元格为公式，则getComputedValueInfo()方法会计算该公式，然后返回计算结果作为值，且以计算后结果的类型作为最终的类型
         * @param row
         * @param col
         * @returns {{type: *, value: *}}
         */
            getComputedValueInfo: function(row, col) {
                var valueType = this.getRawType(row, col);
                if (valueType === CELL_VALUE_TYPE.TEXT) {
                    var formula = this.dataAccess.getFormula(row, col);
                    if (formula) {
                        debugger;
                    }
                }
                return {
                    type: valueType,
                    value: this.getRawValue(row, col)
                };
            },
            getRawValue: function(row, col) {
                return this.dataAccess.getValue(row, col);
            },
            getRawType: function(row, col) {
                var type = this.dataAccess.getType(row, col);
                if (type) {
                    return type;
                }
                var rawValue = this.dataAccess.getValue(row, col);
                rawValue = this.format.formatValue(rawValue);
                this.dataAccess.setType(rawValue.type, row, col);
                return rawValue.type;
            },
            recordFormula: function(content, row, col) {
                var tokens = this.cs("c.formula.parse", content);
                this.dataAccess.setFormula(tokens, row, col);
            },
            clearFormula: function(row, col) {
                this.dataAccess.setFormula(null, row, col);
            }
        });
        Value.deps = [ "dataAccess" ];
        return Value;
    }
};

//src/core/view.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[66] = {
    value: function(require) {
        var View = _p.r(0).create("View", {
            dataAccess: null,
            base: _p.r(87),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.scrollto": this.scrollTo,
                    "c.row.scrollto": this.scrollRowTo,
                    "c.col.scrollto": this.scrollColTo,
                    "c.row.scroll": this.scrollRow,
                    "c.col.scroll": this.scrollCol
                });
            },
            scrollRowTo: function(row, toEnd) {
                if (!toEnd) {
                    return this.__resetRowToStart(row);
                } else {
                    return this.__resetRowToEnd(row);
                }
            },
            scrollColTo: function(col, toEnd) {
                if (!toEnd) {
                    return this.__resetColumnToStart(col);
                } else {
                    return this.__resetColumnToEnd(col);
                }
            },
            scrollTo: function(row, col) {
                this.__resetRowToStart(row);
                this.__resetColumnToStart(col);
            },
            scrollRow: function(row) {
                var viewStart = this.dataAccess.getViewStart();
                return this.__resetRowToStart(row + viewStart.row);
            },
            scrollCol: function(col) {
                var viewStart = this.dataAccess.getViewStart();
                return this.__resetColumnToStart(col + viewStart.col);
            },
            __resetRowToStart: function(row) {
                var total = this.dataAccess.getTotal();
                if (row < 0) {
                    row = 0;
                } else if (row >= total.row) {
                    row = total.row - 1;
                }
                var viewStart = this.dataAccess.getViewStart();
                if (row === viewStart.row) {
                    return;
                }
                this.dataAccess.setViewStart(row, viewStart.col);
                this.coreRefresh(true);
            },
            __resetRowToEnd: function(row) {
                var total = this.dataAccess.getTotal();
                if (row < 0) {
                    row = 0;
                } else if (row >= total.row) {
                    row = total.row - 1;
                }
                var viewEnd = this.dataAccess.getViewEnd();
                this.dataAccess.setViewEnd(row, viewEnd.col);
                // 建议actuary在下一次计算时执行逆序计算
                this.postMessage("c.row.calculation.reverse");
                this.coreRefresh(true);
            },
            __resetColumnToStart: function(col) {
                var total = this.dataAccess.getTotal();
                if (col < 0) {
                    col = 0;
                } else if (col >= total.col) {
                    col = total.col - 1;
                }
                var viewStart = this.dataAccess.getViewStart();
                if (col === viewStart.col) {
                    return;
                }
                this.dataAccess.setViewStart(viewStart.row, col);
                this.coreRefresh(true);
            },
            __resetColumnToEnd: function(col) {
                var total = this.dataAccess.getTotal();
                if (col < 0) {
                    col = 0;
                } else if (col >= total.col) {
                    col = total.col - 1;
                }
                var viewEnd = this.dataAccess.getViewEnd();
                this.dataAccess.setViewEnd(viewEnd.row, col);
                // 建议actuary在下一次计算时执行逆序计算
                this.postMessage("c.col.calculation.reverse");
                this.coreRefresh(true);
            }
        });
        View.deps = [ "dataAccess" ];
        return View;
    }
};

//src/definition/boolean-value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[67] = {
    value: {
        TRUE: "TRUE",
        FALSE: "FALSE"
    }
};

//src/definition/cell-value-types.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[68] = {
    value: {
        TEXT: "TEXT",
        NUMERIC: "NUMERIC",
        BOOLEAN: "BOOLEAN",
        UNDEFINED: "UNDEFINED",
        DATE: "DATE",
        TIME: "TIME",
        ERROR: "ERROR"
    }
};

//src/env/commands/redo.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[69] = {
    value: function(require) {
        return _p.r(0).create("RedoCommand", {
            base: _p.r(83),
            execute: function() {
                return this.____ctx.redo();
            }
        });
    }
};

//src/env/commands/undo.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[70] = {
    value: function(require) {
        return _p.r(0).create("UndoCommand", {
            base: _p.r(83),
            execute: function() {
                return this.____ctx.undo();
            }
        });
    }
};

//src/env/configure.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[71] = {
    value: function(require) {
        var config = _p.r(33);
        var $ = _p.r(2);
        return _p.r(0).create("Configure", {
            constructor: function() {
                this.config = $.extend(true, {}, config);
            },
            getConfig: function(key) {
                if (!key) {
                    return this.config;
                }
                return this.config[key] || null;
            }
        });
    }
};

//src/env/context.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[72] = {
    value: function(require) {
        var Container = _p.r(75);
        var ElementFactory = _p.r(76);
        var Service = _p.r(79);
        var Command = _p.r(74);
        var Message = _p.r(77);
        var RefreshManager = _p.r(78);
        var Configure = _p.r(71);
        var ModuleLoader = _p.r(80);
        var PluginWrapper = _p.r(81);
        var Context = _p.r(0).create("Context", {
            target: null,
            config: null,
            loader: null,
            ____type: "core",
            manager: {},
            constructor: function(target) {
                this.target = target;
                this.config = new Configure();
                this.loader = new ModuleLoader(this);
                this.init();
                this.initModuleLoadListener();
                this.manager.command.startBasic();
                this.loader.start();
                this.ready();
            },
            getConfig: function(key) {
                return this.config.getConfig(key);
            },
            getDocument: function() {
                return this.manager.element.getDocument();
            },
            getContainer: function(type) {
                return this.manager.container.getContainer(type);
            },
            getSize: function(type) {
                return this.manager.container.getSize(type);
            },
            resizeContianer: function() {
                return this.manager.container.resize();
            },
            createElement: function(ele, opt) {
                return this.manager.element.createElement(ele, opt);
            },
            execCommand: function(type, name, args) {
                return this.manager.command.execCommand(type, name, args);
            },
            queryCommandValue: function(type, name, args) {
                return this.manager.command.queryCommandValue(type, name, args);
            },
            undo: function() {
                return this.manager.command.undo();
            },
            redo: function() {
                return this.manager.command.redo();
            },
            /*----------------------- service*/
            registerService: function(provider, name, handler) {
                return this.manager.service.registerService(provider.____type, provider, name, handler);
            },
            rs: function(caller, name, args) {
                return this.manager.service.rs(caller.____type, name, args);
            },
            registerCommonService: function(provider, name, handler) {
                return this.manager.service.registerCommonService(provider, name, handler);
            },
            cs: function(name, args) {
                return this.manager.service.cs(name, args);
            },
            /*----------------------- message*/
            onMessage: function(listener, name, handler) {
                return this.manager.message.onMessage(listener.____type, listener, name, handler);
            },
            postMessage: function(publisher, name, args) {
                return this.manager.message.postMessage(publisher.____type, name, args);
            },
            closeMessage: function() {
                this.manager.message.close();
            },
            openMessage: function() {
                this.manager.message.open();
            },
            addEventListener: function() {
                return this.manager.message.addEventListener.apply(this.manager.message, arguments);
            },
            on: function(subscriber, name, handler) {
                return this.manager.message.addInternalListener.apply(this.manager.message, arguments);
            },
            prepareRefresh: function() {
                this.manager.refresh.prepareRefresh();
            },
            refresh: function(isIgnore) {
                this.manager.refresh.refresh(isIgnore);
            },
            plug: function(provider, handler) {
                this.manager.refresh.plug(provider, handler);
            },
            init: function() {
                var target = this.target;
                this.manager.element = new ElementFactory(this, target);
                this.manager.container = new Container(this, target);
                this.manager.service = new Service(this, target);
                this.manager.command = new Command(this, target);
                this.manager.message = new Message(this, target);
                this.manager.refresh = new RefreshManager(this, target);
            },
            initModuleLoadListener: function() {
                var _self = this;
                this.loader.onBeforeLoad(function(type) {
                    _self.manager.command.start(type);
                });
            },
            ready: function() {
                this.target.appendChild(this.getContainer("main"));
            }
        });
        // TODO 插件机制需要再完善
        $.extend(Context, {
            registerModule: function(modules) {
                ModuleLoader.register(modules);
            },
            addCommand: function(commands) {
                Command.add(commands);
            },
            mapEvent: function() {
                Message.map.apply(Message, arguments);
            },
            registerPlugin: function(name, impl) {
                ModuleLoader.registerPlugin(name, PluginWrapper.wrap(name, impl));
            }
        });
        return Context;
    }
};

//src/env/manager/command/command-stack.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[73] = {
    value: function(require) {
        return _p.r(0).create("CommandStack", {
            stack: [],
            max: 50,
            topIndex: -1,
            validIndex: -1,
            stackItem: [],
            // 是否暂停记录命令执行
            hold: false,
            commandCount: 0,
            constructor: function(max) {
                this.max = max;
            },
            pop: function() {
                var index = this.topIndex;
                if (index < 0) {
                    return null;
                }
                this.topIndex--;
                return this.stack[index];
            },
            push: function(command, args) {
                if (this.hold) {
                    return;
                }
                this.stackItem.push({
                    command: command,
                    args: args
                });
            },
            holdOn: function() {
                this.hold = true;
            },
            goOn: function() {
                this.hold = false;
            },
            begin: function() {
                this.commandCount++;
            },
            end: function() {
                this.commandCount--;
            },
            moveUp: function() {
                if (this.topIndex >= this.validIndex) {
                    return null;
                }
                this.topIndex++;
                return this.stack[this.topIndex];
            },
            complete: function() {
                if (this.hold) {
                    return;
                }
                if (this.commandCount !== 0) {
                    return;
                }
                this.topIndex++;
                this.validIndex = this.topIndex;
                this.stack[this.topIndex] = this.stackItem;
                this.stackItem = [];
            }
        });
    }
};

//src/env/manager/command/command.js
/**
 * @file 命令管理器
 * @author hancong03@baiud.com
 */
_p[74] = {
    value: function(require) {
        var CommandStack = _p.r(73);
        var $ = _p.r(2);
        var COMMAND_POOL = {
            core: {},
            system: {},
            ext: {},
            basic: {}
        };
        var CommandManager = _p.r(0).create("Command", {
            base: _p.r(1),
            // 命令调用栈
            stack: null,
            // 当前BTable实例中的命令对象
            commands: null,
            executeLock: 0,
            init: function() {
                this.commands = $.extend(true, {}, COMMAND_POOL);
                this.stack = new CommandStack(this.getContext().getConfig("stack"));
            },
            /**
         * 启动基本命令：undo和redo
         * 由于undo和redo命令太过特殊，它们需要监控所有命令的执行过程，
         * 所以要求此类命令必须在其他命令加载之前先加载
         */
            startBasic: function() {
                this.start("basic");
            },
            /**
         * 开始Command对象的装载过程，实例化指定类型的Command对象
         * @param type 当前装载的Command类型
         */
            start: function(type) {
                var commands = COMMAND_POOL[type];
                var context = this.getContext();
                var command;
                var pattern = /\s+/;
                var currentTypeCommands = this.commands[type];
                $.each(commands, function(name, CommandConstructor) {
                    command = new CommandConstructor(context);
                    if (command.name) {
                        name = command.name.trim().split(pattern);
                    } else {
                        name = [ name ];
                    }
                    command.____type = type;
                    command.init();
                    for (var i = 0, len = name.length; i < len; i++) {
                        currentTypeCommands[name[i]] = command;
                    }
                });
            },
            /**
         * 执行命令的接口
         * 该接口允许对命令进行批量调用
         * @param invokerType 调用者所属的类型
         * @param name 命令名称
         * @param args 命令要求的参数
         * @returns {*} 如果执行的是非批量调用，则返回命令执行结果， 否则，什么也不返回
         */
            execCommand: function(invokerType, name, args) {
                var result = null;
                if (typeof name !== "string") {
                    for (var i = 0, len = name.length; i < len; i++) {
                        this.__execCommand(invokerType, name[i].command, name[i].args);
                    }
                } else {
                    result = this.__execCommand(invokerType, name, args);
                }
                return result;
            },
            queryCommandValue: function(invokerType, name, args) {
                var targetCommand = this.__getCommand(invokerType, name);
                if (!targetCommand) {
                    throw new Error("command notfound: " + name);
                }
                args.unshift(name);
                args = targetCommand.queryValueBefore.apply(targetCommand, args);
                args.unshift(name);
                return targetCommand.queryValue.apply(targetCommand, args);
            },
            /**
         * 执行单条命令的实际方法
         * @param invokerType 调用者所属的类型
         * @param name 命令名称
         * @param args 命令要求的参数
         * @returns {*} 命令执行结果
         * @private
         */
            __execCommand: function(invokerType, name, args) {
                var targetCommand = this.__getCommand(invokerType, name);
                var stackInfo;
                if (!targetCommand) {
                    throw new Error("command notfound: " + name);
                }
                // 获取规范化后的参数
                args = targetCommand.execBefore.apply(targetCommand, [ name ].concat(args));
                args = [ name ].concat(args);
                var hasUndo = !!targetCommand.unexecute;
                this.stack.begin();
                this.lock();
                if (hasUndo) {
                    stackInfo = targetCommand.getStackInfo.apply(targetCommand, args);
                    stackInfo = $._clone([ name ].concat(stackInfo));
                    this.stack.push(targetCommand, {
                        redo: $._clone(args),
                        undo: stackInfo,
                        range: targetCommand.getRange()
                    });
                }
                var result = targetCommand.execute.apply(targetCommand, args);
                this.stack.end();
                if (hasUndo) {
                    this.stack.complete();
                }
                this.unlock();
                this.emitCommandExecute(args);
                return result;
            },
            /**
         * undo命令内置实现
         * @returns {boolean} undo命令执行是否成功
         */
            undo: function() {
                var historyList = this.stack.pop();
                var history;
                var command;
                if (historyList == null) {
                    return false;
                }
                // undo操作不用进入记录栈
                this.stack.holdOn();
                for (var i = 0, len = historyList.length; i < len; i++) {
                    history = historyList[i];
                    command = history.command;
                    command.unexecute.apply(command, history.args.undo);
                    command.resetRange(history.args.range);
                }
                this.stack.goOn();
                return true;
            },
            /**
         * redo命令内置实现
         * @returns {boolean} redo命令执行是否成功
         */
            redo: function() {
                var historyList = this.stack.moveUp();
                var history;
                var command;
                if (historyList == null) {
                    return false;
                }
                // redo操作不用进入记录栈
                this.stack.holdOn();
                for (var i = 0, len = historyList.length; i < len; i++) {
                    history = historyList[i];
                    command = history.command;
                    command.execute.apply(command, history.args.redo);
                    command.resetRange(history.args.range);
                }
                this.stack.goOn();
                return true;
            },
            /**
         * 为命令执行时的消息传递加锁，防止嵌套命令重复触发消息
         */
            lock: function() {
                this.executeLock++;
            },
            /**
         * 释放执行命令的消息锁
         */
            unlock: function() {
                this.executeLock--;
            },
            /**
         * 根据给定的调用类型和Command名称，返回Command对象
         * @param type 命令调用者的级别
         * @param name 命令名称
         * @returns {*} 如果找到对应的Command对象，则返回该对象，否则返回null
         * @private
         */
            __getCommand: function(type, name) {
                var commands = [];
                var targetCommand;
                // 外部调用，可以视为ext调用
                if (type === null) {
                    type = "ext";
                }
                switch (type) {
                  case "ext":
                    commands.push(this.commands.ext);

                  // break; // 故意省略
                    case "system":
                    commands.push(this.commands.system);

                  // break; // 故意省略
                    case "core":
                    commands.push(this.commands.core);

                  // break; // 故意省略
                    case "basic":
                    commands.push(this.commands.basic);
                }
                for (var i = 0, len = commands.length; i < len; i++) {
                    targetCommand = commands[i][name];
                    if (targetCommand) {
                        return targetCommand;
                    }
                }
                return null;
            },
            /**
         * 触发命令执行消息
         * @param args 命令执行时的参数列表
         */
            emitCommandExecute: function(args) {
                if (this.executeLock === 0) {
                    this.getContext().postMessage(this.getContext(), "c.command.exec", $._clone(args));
                }
            }
        });
        $.extend(CommandManager, {
            /**
         * 对外接口，用于向系统注册Command
         * @param commands Command对象Map
         */
            add: function(commands) {
                $.extend(true, COMMAND_POOL, commands);
            }
        });
        return CommandManager;
    }
};

//src/env/manager/container.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[75] = {
    value: function(require) {
        return _p.r(0).create("Container", {
            base: _p.r(1),
            containers: {},
            size: {},
            init: function() {
                this.__initContainer();
                this.resize();
                this.initEvent();
            },
            getContainer: function(type) {
                if (type === "scroll") {
                    return {
                        h: this.containers.scrollbarBottom,
                        v: this.containers.scrollbarRight
                    };
                }
                return this.containers[type];
            },
            getSize: function(type) {
                return $.extend({}, this.size[type]);
            },
            resize: function() {
                this.__refreshSize();
                var size = this.size;
                $(this.containers.main).css({
                    width: size.main.width,
                    height: size.main.height
                });
                $(this.containers.left).css({
                    width: size.left.width,
                    height: size.left.height
                });
                $(this.containers.top).css({
                    width: size.top.width,
                    height: size.top.height
                });
                $(this.containers.content).css({
                    width: size.content.width,
                    height: size.content.height
                });
                $(this.containers.scrollbarRight).css({
                    height: size.scroll.v.height
                });
                $(this.containers.scrollbarBottom).css({
                    width: size.scroll.h.width
                });
            },
            initEvent: function() {
                $(this.containers.main).on("mousedown", function(e) {
                    e.preventDefault();
                });
                $(this.containers.main).on("contextmenu", function(e) {
                    e.preventDefault();
                });
            },
            __initContainer: function() {
                var headConfig = this.context.getConfig("head");
                var scrollbarConfig = this.context.getConfig("scrollbar");
                var background = this.context.getConfig("background");
                var borderConfig = this.context.getConfig("border");
                var borderWidth = borderConfig.width;
                var borderColor = borderConfig.color;
                this.containers = {
                    main: this.createElement("btb-main-container", {
                        background: background
                    }),
                    left: this.createElement("btb-left-container", {
                        top: headConfig.height
                    }),
                    top: this.createElement("btb-top-container", {
                        left: headConfig.width
                    }),
                    content: this.createElement("btb-content-container", {
                        top: headConfig.height,
                        left: headConfig.width
                    }),
                    scrollbarRight: this.createElement("btb-scrollbar-v-container", {
                        width: scrollbarConfig.width,
                        top: headConfig.height,
                        right: 0,
                        borderWidth: borderWidth,
                        borderColor: borderColor,
                        backgroundColor: scrollbarConfig.background
                    }),
                    scrollbarBottom: this.createElement("btb-scrollbar-h-container", {
                        height: scrollbarConfig.width,
                        bottom: 0,
                        left: headConfig.width,
                        borderWidth: borderWidth,
                        borderColor: borderColor,
                        backgroundColor: scrollbarConfig.background
                    })
                };
                this.containers.main.appendChild(this.containers.top);
                this.containers.main.appendChild(this.containers.left);
                this.containers.main.appendChild(this.containers.content);
                this.containers.main.appendChild(this.containers.scrollbarRight);
                this.containers.main.appendChild(this.containers.scrollbarBottom);
            },
            __refreshSize: function() {
                var headConfig = this.context.getConfig("head");
                var scrollbarConfig = this.context.getConfig("scrollbar");
                var background = this.context.getConfig("background");
                var borderConfig = this.context.getConfig("border");
                var borderWidth = borderConfig.width;
                var targetSize = {
                    width: this.target.clientWidth,
                    height: this.target.clientHeight
                };
                var availableSize = {
                    width: targetSize.width - scrollbarConfig.width,
                    height: targetSize.height - scrollbarConfig.width
                };
                var contentSize = {
                    width: availableSize.width - headConfig.width,
                    height: availableSize.height - headConfig.height
                };
                var topSize = {
                    width: contentSize.width,
                    height: headConfig.height
                };
                var leftSize = {
                    width: headConfig.width,
                    height: contentSize.height
                };
                this.size = {
                    main: targetSize,
                    left: leftSize,
                    top: topSize,
                    content: contentSize,
                    scroll: {
                        h: {
                            width: contentSize.width - 2 * borderWidth,
                            height: scrollbarConfig.width
                        },
                        v: {
                            width: scrollbarConfig.width,
                            height: contentSize.height - 2 * borderWidth
                        }
                    }
                };
            },
            createElement: function(className, styles) {
                return this.context.createElement("div", {
                    attr: {
                        "class": "btb-container " + className
                    },
                    style: styles
                });
            }
        });
    }
};

//src/env/manager/element-factory.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[76] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("ElementFactory", {
            base: _p.r(1),
            doc: null,
            createElement: function(eleName, opt) {
                var ele = this.doc.createElement(eleName);
                if (typeof opt === "string") {
                    ele.className = opt;
                    return ele;
                }
                if (opt) {
                    if (opt.attr) {
                        $(ele).attr(opt.attr);
                    }
                    if (opt.inner) {
                        ele.innerHTML = opt.inner;
                    }
                    if (opt.style) {
                        $(ele).css(opt.style);
                    }
                }
                return ele;
            },
            getDocument: function() {
                return this.doc;
            },
            init: function() {
                this.doc = this.target.ownerDocument;
            }
        });
    }
};

//src/env/manager/message.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[77] = {
    value: function(require) {
        var $ = _p.r(2);
        var EVENT_MAP = {};
        var MessageManager = _p.r(0).create("Message", {
            base: _p.r(1),
            pool: {
                core: {},
                system: {},
                ext: {}
            },
            eventPool: {},
            internalEventPool: {},
            chain: {},
            count: 0,
            state: true,
            addEventListener: function(evtName, evtHandler) {
                var opt = {};
                var pool = this.eventPool;
                if (evtHandler) {
                    opt[evtName] = evtHandler;
                } else {
                    opt = evtName;
                }
                for (var name in opt) {
                    if (!opt.hasOwnProperty(name)) {
                        continue;
                    }
                    if (!pool[name]) {
                        pool[name] = [];
                    }
                    pool[name].push(opt[name]);
                }
            },
            addInternalListener: function(subscriber, eventName, eventHandler) {
                var opt = {};
                var pool = this.internalEventPool;
                if (eventHandler) {
                    opt[eventName] = eventHandler;
                } else {
                    opt = eventName;
                }
                for (var name in opt) {
                    if (!opt.hasOwnProperty(name)) {
                        continue;
                    }
                    if (!pool[name]) {
                        pool[name] = [];
                    }
                    pool[name].push({
                        subscriber: subscriber,
                        handler: opt[name]
                    });
                }
            },
            onMessage: function(type, listener, name, handler) {
                var map = {};
                var currentPool = this.pool[type];
                if (typeof name === "string") {
                    map[name] = handler;
                } else {
                    map = name;
                }
                for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                        if (!currentPool[key]) {
                            currentPool[key] = [];
                        }
                        currentPool[key].push({
                            listener: listener,
                            handler: map[key]
                        });
                    }
                }
            },
            postMessage: function(type, name, args) {
                if (!this.state) {
                    return;
                }
                var handlerList = [];
                var handlers;
                if (this.chain[name]) {
                    delete this.chain[name];
                    return;
                } else {
                    this.chain[name] = true;
                }
                switch (type) {
                  case "core":
                    handlerList.push(this.pool.core);

                  case "system":
                    handlerList.push(this.pool.system);

                  case "ext":
                    handlerList.push(this.pool.ext);
                }
                try {
                    for (var i = 0, len = handlerList.length; i < len; i++) {
                        handlers = handlerList[i][name];
                        if (!handlers) {
                            continue;
                        }
                        for (var j = 0, jlen = handlers.length; j < jlen; j++) {
                            handlers[j].handler.apply(handlers[j].listener, args);
                        }
                    }
                } finally {
                    delete this.chain[name];
                    if (EVENT_MAP[name]) {
                        this.emit(EVENT_MAP[name], args);
                    }
                }
            },
            emit: function(eventName, args) {
                var internalPool = this.internalEventPool[eventName] || [];
                var pool = this.eventPool[eventName] || [];
                args = [ eventName ].concat(args);
                // 内部传递
                for (var i = 0, len = internalPool.length; i < len; i++) {
                    internalPool[i].handler.apply(internalPool[i].subscriber, $._clone(args));
                }
                // 外部传递
                for (var i = 0, len = pool.length; i < len; i++) {
                    pool[i].apply(null, $._clone(args));
                }
            },
            close: function() {
                this.count++;
                this.state = false;
            },
            open: function() {
                this.count--;
                if (this.count === 0) {
                    this.state = true;
                }
            }
        });
        MessageManager.map = function(messageName, eventName) {
            var map = {};
            if (eventName) {
                map[messageName] = eventName;
            } else {
                map = messageName;
            }
            $.extend(EVENT_MAP, $._clone(map));
        };
        return MessageManager;
    }
};

//src/env/manager/refresh.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[78] = {
    value: function(require) {
        return _p.r(0).create("Refresh", {
            provider: null,
            handler: null,
            count: 0,
            base: _p.r(1),
            prepareRefresh: function() {
                this.count++;
            },
            refresh: function(isIgnore) {
                if (!isIgnore) {
                    this.count--;
                }
                if (this.count === 0 && this.handler) {
                    this.handler.call(this.provider);
                }
            },
            plug: function(provider, handler) {
                this.provider = provider;
                this.handler = handler;
            }
        });
    }
};

//src/env/manager/service.js
/**
 * @file 服务管理器
 * @author hancong03@baiud.com
 */
_p[79] = {
    value: function(require) {
        return _p.r(0).create("Service", {
            base: _p.r(1),
            // 通用服务对象池
            commonPool: {},
            // 普通服务对象池
            pool: {
                core: {},
                system: {},
                ext: {}
            },
            /**
         * 注册服务接口
         * @param type 服务级别
         * @param provider 服务提供者
         * @param name 服务名称
         * @param handler 具体的服务方法
         */
            registerService: function(type, provider, name, handler) {
                var map = {};
                var currentPool = this.pool[type];
                if (typeof name === "string") {
                    map[name] = handler;
                } else {
                    map = name;
                }
                for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                        currentPool[key] = {
                            provider: provider,
                            handler: map[key]
                        };
                    }
                }
            },
            /**
         * 请求服务接口
         * @param reqType 请求者的级别， 该级别限制了请求者所能访问的服务种类。
         * @param name 所请求的服务的名称
         * @param args 传递给服务的参数数组， 该参数必须满足当前所请求服务的参数要求
         * @returns {*|boolean} 返回服务执行结果
         * @throws 如果请求的服务不存在，则抛出错误对象
         */
            rs: function(reqType, name, args) {
                var services = [];
                var targetService;
                switch (reqType) {
                  case "ext":
                    services.push(this.pool.ext);

                  case "system":
                    services.push(this.pool.system);

                  case "core":
                    services.push(this.pool.core);
                }
                for (var i = 0, len = services.length; i < len; i++) {
                    targetService = services[i][name];
                    if (targetService) {
                        break;
                    }
                }
                if (!targetService) {
                    throw new Error("service not found: " + name);
                }
                return targetService.handler.apply(targetService.provider, args);
            },
            /**
         * 注册公共服务接口
         * 公共服务和普通的服务不同，该类型的服务不限制请求者级别，任何模块都可以请求该类型的服务。
         * 同时，公共服务也是无状态的服务。此种类型的服务不应该保存于系统核心相关的任何状态。
         * @param provider 服务提供者
         * @param name 服务名称
         * @param handler 提供服务的具体方法
         */
            registerCommonService: function(provider, name, handler) {
                var map = {};
                var pool = this.commonPool;
                if (typeof name === "string") {
                    map[name] = handler;
                } else {
                    map = name;
                }
                for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                        pool[key] = {
                            provider: provider,
                            handler: map[key]
                        };
                    }
                }
            },
            /**
         * 调用公共服务的接口
         * @param name 服务名称
         * @param args 服务所要求的参数数组
         * @returns {*|boolean} 服务执行的结果
         * @throws 如果请求的服务不存在，则抛出错误对象
         */
            cs: function(name, args) {
                var service = this.commonPool[name];
                if (!service) {
                    throw new Error("common service not found: " + name);
                }
                return service.handler.apply(service.provider, args);
            }
        });
    }
};

//src/env/module-loader.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[80] = {
    value: function(require) {
        /**
     * 当前系统已知的模块缓存
     */
        var MODULE_POOL = {
            common: {},
            core: {},
            system: {},
            ext: {}
        };
        var $ = _p.r(2);
        var ModuleLoader = _p.r(0).create("ModuleLoader", {
            context: null,
            // 当前BTable对象所加载的模块实例
            instances: {
                common: [],
                core: [],
                system: [],
                ext: []
            },
            // 模块启动前置监听器列表
            beforeListeners: [],
            // 模块启动后置监听器列表
            afterListeners: [],
            constructor: function(context) {
                this.context = context;
            },
            /**
         * 根据给定的模块实例获取其所属的类型
         * @param module 模块实例
         * @returns {string} 模块所属的类型
         */
            getType: function(module) {
                return module.____type;
            },
            /**
         * 根据给定的参数创建模块内的组件对象
         * @param module 模块对象
         * @param args 组件对象参数数组， 该数组的第1项是组件对象的构造器，其后的项将作为该组件对象的初始化参数依次传入
         * @returns {Component} 刚创建的组件实例
         */
            createComponent: function(module, args) {
                var Component = args[0];
                var comp = new Component(this.context);
                args = args.slice(1);
                comp.____type = typeof module !== "string" ? module.____type : module;
                comp.init.apply(comp, args);
                return comp;
            },
            /**
         * 注册前置监听器
         * @param cb
         */
            onBeforeLoad: function(cb) {
                this.beforeListeners.push(cb);
            },
            /**
         * 启动模块加载器
         * 该启动器会首先启动通用模块，然后再按模块类别顺序加载模块
         */
            start: function() {
                this.startupCommonModule();
                this.startupModules("core");
                this.startupModules("system");
                this.startupModules("ext");
            },
            /**
         * 启动通用模块方法
         */
            startupCommonModule: function() {
                var modules = MODULE_POOL["common"];
                var commonInstance = this.instances["common"];
                var moduleInstance = null;
                var context = this.context;
                for (var key in modules) {
                    if (modules.hasOwnProperty(key)) {
                        moduleInstance = new modules[key](context);
                        moduleInstance.init();
                        commonInstance.push(moduleInstance);
                    }
                }
            },
            /**
         * 根据指定的类型，启动对应的模块
         * @param type 需要启动的模块的类型
         */
            startupModules: function(type) {
                this.emitBefore(type);
                var started = {};
                var modules = MODULE_POOL[type];
                var currentInstaces = this.instances[type];
                for (var key in modules) {
                    if (modules.hasOwnProperty(key)) {
                        this.initModule(started, modules[key], type, key);
                    }
                }
                for (var i = 0, len = currentInstaces.length; i < len; i++) {
                    currentInstaces[i].run();
                }
                this.emitAfter(type);
            },
            /**
         * 触发模块启动前置监听器
         * @param type 即将启动的模块类型
         */
            emitBefore: function(type) {
                this.emit(this.beforeListeners, type);
            },
            /**
         * 触发模块启动后置监听器
         * @param type 刚启动完成的模块类型
         */
            emitAfter: function(type) {
                this.emit(this.afterListeners, type);
            },
            /**
         * 触发器实现
         */
            emit: function(pool, type) {
                for (var i = 0, len = pool.length; i < len; i++) {
                    pool[i].call(null, type);
                }
            },
            /**
         * 初始化模块，该方法将在模块实例创建后完成对应模块的初始化工作
         * @param started 当前已启动的模块Map
         * @param module 当前需要初始化的模块实例
         * @param type 模块所属的类型
         * @param moduleName 模块名称
         */
            initModule: function(started, module, type, moduleName) {
                if (started[moduleName]) {
                    return;
                }
                var depName;
                var deps = [];
                var modules = MODULE_POOL[type];
                if (module.deps) {
                    for (var i = 0, len = module.deps.length; i < len; i++) {
                        depName = module.deps[i];
                        if (started[depName]) {
                            deps[i] = started[depName];
                        } else if (modules[depName]) {
                            deps[i] = this.initModule(started, modules[depName], type, depName);
                        } else {
                            throw new Error("notfound module: " + depName);
                        }
                    }
                }
                var instance = new module(this.context);
                instance.____type = type;
                instance.____loader = this;
                instance.init.apply(instance, deps);
                started[moduleName] = instance;
                this.instances[type].push(instance);
                return instance;
            }
        });
        $.extend(ModuleLoader, {
            /**
         * 注册模块
         * 该方法为系统内部所用，外界无法访问该方法
         * @param modules
         */
            register: function(modules) {
                $.extend(true, MODULE_POOL, modules);
            },
            /**
         * 注册插件模块
         * 使用户自定义的插件能够被容器感知到，并管理其生命周期。
         * @param name 注册的插件名
         * @param plugin 插件实现
         */
            registerPlugin: function(name, plugin) {
                MODULE_POOL.ext[name] = plugin;
            }
        });
        return ModuleLoader;
    }
};

//src/env/plugin-wrapper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[81] = {
    value: function(require) {
        var clazz = _p.r(0);
        var Plugin = _p.r(88);
        return {
            wrap: function(name, pluginImpl) {
                pluginImpl.base = Plugin;
                return clazz.create("Plugin-" + name, pluginImpl);
            }
        };
    }
};

//src/events.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[82] = {
    value: function(require) {
        return {
            "c.focus.change": "focuschange",
            "c.range.disabled": "focusout",
            "c.command.exec": "commandexecute",
            "s.input.statechange": "inputmodelchange",
            "c.refresh": "refresh"
        };
    }
};

//src/interface/command.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[83] = {
    value: function(require) {
        return _p.r(0).create("Command", {
            base: _p.r(84),
            execBefore: function() {
                return [].slice.call(arguments, 1);
            },
            execute: function() {},
            queryValue: function() {}
        });
    }
};

//src/interface/component.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[84] = {
    value: function(require) {
        return _p.r(0).create("Component", {
            base: _p.r(85),
            registerService: function(name, handler) {
                return this.____ctx.registerService(this, name, handler);
            },
            execCommand: function(name) {
                return this.____ctx.execCommand(this.____type, name, [].slice.call(arguments, 1));
            },
            corePrepareRefresh: function() {
                this.____ctx.prepareRefresh();
            },
            coreRefresh: function(isIgnore) {
                this.____ctx.refresh(isIgnore);
            },
            plug: function(handler) {
                this.____ctx.plug(this, handler);
            }
        });
    }
};

//src/interface/functional.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[85] = {
    value: function(require) {
        return _p.r(0).create("Functional", {
            ____ctx: null,
            ____type: null,
            base: _p.r(86),
            constructor: function(context) {
                this.____ctx = context;
            },
            getDocument: function() {
                return this.____ctx.getDocument();
            },
            getConfig: function(key) {
                return this.____ctx.getConfig(key);
            },
            rs: function(name) {
                var args = [].slice.call(arguments, 1);
                return this.____ctx.rs(this, name, args);
            },
            cs: function(name) {
                var args = [].slice.call(arguments, 1);
                return this.____ctx.cs(name, args);
            },
            createElement: function(ele, opt) {
                return this.____ctx.createElement(ele, opt);
            },
            postMessage: function(name) {
                return this.____ctx.postMessage(this, name, [].slice.call(arguments, 1));
            },
            onMessage: function(name, handler) {
                return this.____ctx.onMessage(this, name, handler);
            },
            closeMessage: function() {
                return this.____ctx.closeMessage();
            },
            openMessage: function() {
                return this.____ctx.openMessage();
            },
            getMainContainer: function() {
                return this.____ctx.getContainer("main");
            },
            getTopContainer: function() {
                return this.____ctx.getContainer("top");
            },
            getLeftContainer: function() {
                return this.____ctx.getContainer("left");
            },
            getContentContainer: function() {
                return this.____ctx.getContainer("content");
            },
            resizeContianer: function() {
                return this.____ctx.resizeContianer();
            },
            getScrollContainer: function() {
                return this.____ctx.getContainer("scroll");
            },
            getTopSize: function() {
                return this.____ctx.getSize("top");
            },
            getLeftSize: function() {
                return this.____ctx.getSize("left");
            },
            getContentSize: function() {
                return this.____ctx.getSize("content");
            },
            getScrollSize: function() {
                return this.____ctx.getSize("scroll");
            }
        });
    }
};

//src/interface/lifecycle.js
/**
 * 生命周期
 * 控制组件的生命周期
 */
_p[86] = {
    value: function(require) {
        return _p.r(0).create("Lifecycle", {
            init: function() {},
            destroy: function() {}
        });
    }
};

//src/interface/module.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[87] = {
    value: function(require) {
        return _p.r(0).create("Module", {
            ____loader: null,
            base: _p.r(84),
            run: function() {},
            createComponent: function(Component) {
                return this.____loader.createComponent(this, [].slice.call(arguments, 0));
            }
        });
    }
};

//src/interface/plugin.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[88] = {
    value: function(require) {
        return _p.r(0).create("Plugin", {
            base: _p.r(87),
            on: function(eventName, handler) {
                this.____ctx.on(this, eventName, handler);
            }
        });
    }
};

//src/interface/service.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[89] = {
    value: function(require) {
        return _p.r(0).create("Component", {
            base: _p.r(86),
            constructor: function(context) {
                this.____ctx = context;
            },
            init: function() {},
            registerCommonService: function(name, handler) {
                this.____ctx.registerCommonService(this, name, handler);
            }
        });
    }
};

//src/interface/undoable-command.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[90] = {
    value: function(require) {
        return _p.r(0).create("UndoableCommand", {
            base: _p.r(83),
            unexecute: function() {},
            getStackInfo: function() {},
            getRange: function() {
                return this.rs("c.range");
            },
            resetRange: function(range) {
                this.rs("c.range.set", range);
            }
        });
    }
};

//src/kernel/data.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[91] = {
    value: function(require) {
        var map = _p.r(92);
        var data = {
            total: {
                row: 26,
                col: 1e4
            },
            // 手动调整行高记录
            row: {},
            // 主动调整列宽记录
            column: {},
            value: {},
            // 命名单元格vi
            name: {},
            // 格式
            format: {},
            // 样式
            style: {},
            defaultStyle: {}
        };
        var style = data.style;
        for (var key in map) {
            if (!map.hasOwnProperty(key)) {
                continue;
            }
            style[map[key]] = {};
        }
        return data;
    }
};

//src/kernel/escape-map.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[92] = {
    value: {
        color: "c",
        backgroundColor: "b",
        textAlign: "h",
        verticalAlign: "v",
        textDecoration: "d",
        // font
        fontStyle: "f",
        fontWeight: "w",
        fontSize: "s",
        fontFamily: "m"
    }
};

//src/kernel/hash.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[93] = {
    value: function(require) {
        var MAX_COLUMN_COUNT = Math.pow(26, 3);
        return {
            indexToKey: function(row, col) {
                return row * MAX_COLUMN_COUNT + col;
            },
            keyToIndex: function(key) {
                return {
                    row: Math.floor(key / MAX_COLUMN_COUNT),
                    col: key % MAX_COLUMN_COUNT
                };
            }
        };
    }
};

//src/kernel/helper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[94] = {
    value: function(require) {
        var ExchangeHelper = _p.r(95);
        return {
            exchangeRow: function(data, index, range) {
                ExchangeHelper.exchangeRow(data, index, range);
            }
        };
    }
};

//src/kernel/helpers/exchange-helper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[95] = {
    value: function(require) {
        var HASH = _p.r(93);
        function exchangeRow(data, index, range) {
            // result index
            var keys;
            // original index
            var originalKeys;
            var startRow = range.start.row;
            for (var i = range.start.col, limit = range.end.col; i <= limit; i++) {
                keys = [];
                originalKeys = [];
                for (var j = 0, jlen = index.length; j < jlen; j++) {
                    keys.push(HASH.indexToKey(index[j], i));
                    originalKeys.push(HASH.indexToKey(startRow + j, i));
                }
                exchange(data, keys, originalKeys);
            }
        }
        function exchange(source, index, originalIndex) {
            var cache = {};
            var from;
            var to;
            for (var i = 0, len = index.length; i < len; i++) {
                from = index[i];
                to = originalIndex[i];
                if (from === to) {
                    continue;
                }
                cache[to] = source[to];
                if (from < to) {
                    source[to] = cache[from];
                } else {
                    source[to] = source[from];
                    source[from] = undefined;
                }
            }
        }
        return {
            exchangeRow: exchangeRow
        };
    }
};

//src/kernel/interpreter/command.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[96] = {
    value: function(require) {
        return $.extend({
            bind: function(data) {
                this.data = data;
            }
        }, _p.r(104));
    }
};

//src/kernel/interpreter/commands/clear.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[97] = {
    value: function(require) {
        function ClearCommand() {}
        $.extend(ClearCommand, $.extend({
            exec: function(commandName, ranges) {
                this.kernelClearValue(ranges);
            }
        }, _p.r(96)));
        return ClearCommand;
    }
};

//src/kernel/interpreter/commands/export.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[98] = {
    value: function(require) {
        function ExportCommand() {}
        $.extend(ExportCommand, $.extend({
            exec: function(commandName, hasDetails) {
                return this.kernelExport(hasDetails);
            }
        }, _p.r(96)));
        return ExportCommand;
    }
};

//src/kernel/interpreter/commands/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[99] = {
    value: function(require) {
        function ResizeCommand() {}
        $.extend(ResizeCommand, $.extend({
            exec: function(commandName, size, index) {
                if (commandName === "resizerow") {
                    this.kernelSetRowHeight(size, index);
                } else {
                    this.kernelSetColumnWidth(size, index);
                }
            }
        }, _p.r(96)));
        return ResizeCommand;
    }
};

//src/kernel/interpreter/commands/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[100] = {
    value: function(require) {
        function StyleCommand() {}
        $.extend(StyleCommand, $.extend({
            exec: function(commandName) {
                this[commandName].apply(this, [].slice.call(arguments, 1));
            },
            color: function(val, start, end) {
                this.kernelSetStyle("color", val, start, end);
            },
            fontsize: function(val, start, end) {
                this.kernelSetStyle("fontSize", val, start, end);
            },
            font: function(val, start, end) {
                this.kernelSetStyle("fontFamily", val, start, end);
            },
            italic: function(start, end) {
                if (this.kernelGetStyle(start.row, start.col).fontStyle === "italic") {
                    this.kernelSetStyle("fontStyle", undefined, start, end);
                } else {
                    this.kernelSetStyle("fontStyle", "italic", start, end);
                }
            },
            bold: function(start, end) {
                if (this.kernelGetStyle(start.row, start.col).fontWeight === "bold") {
                    this.kernelSetStyle("fontWeight", undefined, start, end);
                } else {
                    this.kernelSetStyle("fontWeight", "bold", start, end);
                }
            },
            fill: function(val, start, end) {
                this.kernelSetStyle("backgroundColor", val, start, end);
            },
            horizontal: function(val, start, end) {
                this.kernelSetStyle("textAlign", val, start, end);
            },
            vertical: function(val, start, end) {
                this.kernelSetStyle("verticalAlign", val, start, end);
            }
        }, _p.r(96)));
        return StyleCommand;
    }
};

//src/kernel/interpreter/commands/write.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[101] = {
    value: function(require) {
        function WriteCommand() {}
        $.extend(WriteCommand, $.extend({
            exec: function(commandName, content, row, col) {
                this.kernelSetValue(content, row, col);
            }
        }, _p.r(96)));
        return WriteCommand;
    }
};

//src/kernel/interpreter/interpreter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[102] = {
    value: function(require) {
        var COMMAND_MAP = _p.r(103);
        function Interpreter() {}
        $.extend(Interpreter.prototype, {
            exec: function(data, commandArgs) {
                var commandName = commandArgs[0];
                var command = COMMAND_MAP[commandName];
                if (!command) {
                    return;
                }
                command.bind(data);
                return command.exec.apply(command, commandArgs);
            },
            createSheet: function() {
                return $.clone(_p.r(91), true);
            }
        });
        return Interpreter;
    }
};

//src/kernel/interpreter/map.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[103] = {
    value: function(require) {
        var StyleCommand = _p.r(100);
        var ResizeCommand = _p.r(99);
        var ClearCommand = _p.r(97);
        var WriteCommand = _p.r(101);
        var ExportCommand = _p.r(98);
        return {
            write: WriteCommand,
            clearcontent: ClearCommand,
            color: StyleCommand,
            bold: StyleCommand,
            font: StyleCommand,
            fontsize: StyleCommand,
            italic: StyleCommand,
            vertical: StyleCommand,
            horizontal: StyleCommand,
            resizecol: ResizeCommand,
            resizerow: ResizeCommand,
            fill: StyleCommand,
            "export": ExportCommand
        };
    }
};

//src/kernel/kernel.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[104] = {
    value: function(require) {
        var MIN_SIZE = 5;
        var ESCAPE_MAP = _p.r(92);
        var UNESCAPE_MAP = _p.r(105);
        var HASH = _p.r(93);
        var KernelHelper = _p.r(94);
        return $.extend({
            kernelGetCellByName: function(name) {},
            kernelGetValue: function(row, col) {
                return this.data.value[HASH.indexToKey(row, col)];
            },
            kernelGetFormat: function(row, col) {
                return this.data.format[HASH.indexToKey(row, col)];
            },
            kernelGetRowHeight: function(row) {
                return this.data.row[HASH.indexToKey(row, 0)];
            },
            kernelGetColumnWidth: function(col) {
                return this.data.column[HASH.indexToKey(0, col)];
            },
            kernelGetDefaultStyle: function() {
                return this.__kernelUnescape(this.data.defaultStyle);
            },
            kernelGetTotal: function() {
                return this.data.total;
            },
            kernelClearValue: function(ranges) {
                var data = this.data.value;
                var _self = this;
                var total = this.data.total;
                for (var i = 0, len = ranges.length; i < len; i++) {
                    if (clear(ranges[i].start, ranges[i].end)) {
                        break;
                    }
                }
                function clear(start, end) {
                    var allCount = total.row * total.col;
                    var clearCount = (end.row - start.row + 1) * (end.col - start.col + 1);
                    var index;
                    // 全部清除
                    if (allCount === clearCount) {
                        _self.data.value = {};
                        return true;
                    }
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            index = HASH.indexToKey(i, j);
                            if (data[index]) {
                                data[index] = undefined;
                            }
                        }
                    }
                    return false;
                }
            },
            kernelClearStyle: function(ranges) {
                var data = this.data.style;
                var defaultStyle = this.data.defaultStyle;
                var _self = this;
                var total = this.data.total;
                for (var i = 0, len = ranges.length; i < len; i++) {
                    if (clear(ranges[i].start, ranges[i].end)) {
                        break;
                    }
                }
                function clear(start, end) {
                    var data = _self.data.style;
                    var allCount = total.row * total.col;
                    var clearCount = (end.row - start.row + 1) * (end.col - start.col + 1);
                    var index;
                    // 全部清除
                    if (allCount === clearCount) {
                        _self.data.style = {};
                        data = _self.data.style;
                        for (var key in UNESCAPE_MAP) {
                            data[key] = {};
                        }
                        _self.data.defaultStyle = {};
                        return true;
                    }
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            index = HASH.indexToKey(i, j);
                            for (var key in UNESCAPE_MAP) {
                                if (defaultStyle[key]) {
                                    data[key][index] = defaultStyle[key];
                                } else if (data[key][index]) {
                                    data[key][index] = undefined;
                                }
                            }
                        }
                    }
                    return false;
                }
            },
            kernelSetValue: function(value, row, col) {
                var data = this.data.value;
                var index = HASH.indexToKey(row, col);
                if (!value) {
                    if (data[index]) {
                        data[index] = undefined;
                    }
                } else {
                    data[index] = value;
                }
            },
            kernelSetFormat: function(name, value, row, col) {
                var data = this.data.format;
                var index = HASH.indexToKey(row, col);
                if (!value && data[index] && data[index][name]) {
                    data[index] = undefined;
                } else {
                    if (!data[index]) {
                        data[index] = {};
                    }
                    data[index][name] = value;
                }
            },
            kernelSetTotal: function(row, col) {
                this.data.total = {
                    row: row,
                    col: col
                };
            },
            kernelSetStyle: function(styleName, styleValue, start, end) {
                styleName = ESCAPE_MAP[styleName];
                var data = this.data.style[styleName];
                var defualtStyle = this.data.defaultStyle[styleName];
                var total = this.data.total;
                var index;
                if (!isNaN(+start)) {
                    index = HASH.indexToKey(start, end);
                    // 清除时，如果默认值存在，则设置对应的位置的值为'none'
                    if (!styleValue && defualtStyle) {
                        data[index] = "none";
                    } else {
                        // 否则，直接设置即可
                        if (!data[index] && styleValue === defualtStyle) {
                            return;
                        }
                        data[index] = styleValue || undefined;
                    }
                    return;
                }
                var allCount = total.row * total.col;
                var updateCount = (end.row - start.row + 1) * (end.col - start.col + 1);
                if (updateCount === allCount) {
                    // 完成全选处理
                    this.data.style[styleName] = {};
                    this.data.defaultStyle[styleName] = styleValue || undefined;
                    return;
                }
                // 非全选且为多选的情况下
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        index = HASH.indexToKey(i, j);
                        if (!styleValue) {
                            if (defualtStyle) {
                                data[index] = "none";
                            } else {
                                data[index] = undefined;
                            }
                        } else {
                            if (data[index] || styleValue !== defualtStyle) {
                                data[index] = styleValue;
                            }
                        }
                    }
                }
            },
            kernelBatchSetStyle: function(styles, start, end) {
                for (var key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        this.kernelSetStyle(key, styles[key], start, end);
                    }
                }
            },
            kernelGetStyle: function(row, col) {
                var data = this.data.style;
                var defaultStyle = this.data.defaultStyle;
                var result = {};
                var index = HASH.indexToKey(row, col);
                var value;
                for (var key in UNESCAPE_MAP) {
                    if (UNESCAPE_MAP.hasOwnProperty(key)) {
                        value = data[key][index];
                        if (value) {
                            result[UNESCAPE_MAP[key]] = value;
                        } else {
                            result[UNESCAPE_MAP[key]] = defaultStyle[key] || undefined;
                        }
                    }
                }
                return result;
            },
            kernelSetColumnWidth: function(value, col) {
                if (!value) {
                    this.data.column[HASH.indexToKey(0, col)] = undefined;
                } else {
                    this.data.column[HASH.indexToKey(0, col)] = Math.max(value, MIN_SIZE);
                }
            },
            kernelSetRowHeight: function(value, row) {
                if (!value) {
                    this.data.row[HASH.indexToKey(row, 0)] = undefined;
                } else {
                    this.data.row[HASH.indexToKey(row, 0)] = Math.max(value, MIN_SIZE);
                }
            },
            kernelExchangeRow: function(index, range) {
                var data = this.data;
                var styleData = data.style;
                KernelHelper.exchangeRow(data.value, index, range);
                KernelHelper.exchangeRow(data.format, index, range);
                var keys = Object.keys(UNESCAPE_MAP);
                keys.forEach(function(key) {
                    KernelHelper.exchangeRow(styleData[key], index, range);
                });
            },
            kernelExport: function(hasDetails) {
                var value = this.__kernelToArray(this.data.value);
                if (!hasDetails) {
                    return value;
                }
                var result = {
                    value: value,
                    row: this.__kernelToRowArray(this.data.row),
                    column: this.__kernelToColumnArray(this.data.column),
                    style: {},
                    defaultStyle: {}
                };
                var styleData = this.data.style;
                var styleResult = result.style;
                for (var key in styleData) {
                    if (!styleData.hasOwnProperty(key)) {
                        continue;
                    }
                    styleResult[UNESCAPE_MAP[key]] = this.__kernelToArray(styleData[key]);
                }
                var defaultStyleData = this.data.defaultStyle;
                for (var key in defaultStyleData) {
                    if (!defaultStyleData.hasOwnProperty(key)) {
                        continue;
                    }
                    result.defaultStyle[UNESCAPE_MAP[key]] = defaultStyleData[key];
                }
                return result;
            },
            kernelSetCellName: function() {},
            __kernelEscape: function(styles) {
                if (!styles) {
                    return styles;
                }
                var result = {};
                for (var key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        result[ESCAPE_MAP[key]] = styles[key];
                    }
                }
                return result;
            },
            __kernelUnescape: function(styles) {
                if (!styles) {
                    return styles;
                }
                var result = {};
                for (var key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        result[UNESCAPE_MAP[key]] = styles[key];
                    }
                }
                return result;
            },
            __kernelToArray: function(obj, ignoreCol) {
                var result = [];
                var index;
                var temp;
                obj = JSON.parse(JSON.stringify(obj));
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    index = HASH.keyToIndex(key);
                    temp = {
                        r: index.row,
                        c: index.col,
                        v: obj[key]
                    };
                    result.push(temp);
                }
                return result;
            },
            __kernelToRowArray: function(obj) {
                var result = [];
                var index;
                var temp;
                obj = JSON.parse(JSON.stringify(obj));
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    index = HASH.keyToIndex(key);
                    temp = {
                        r: index.row,
                        v: obj[key]
                    };
                    result.push(temp);
                }
                return result;
            },
            __kernelToColumnArray: function(obj) {
                var result = [];
                var index;
                var temp;
                obj = JSON.parse(JSON.stringify(obj));
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    index = HASH.keyToIndex(key);
                    temp = {
                        c: index.col,
                        v: obj[key]
                    };
                    result.push(temp);
                }
                return result;
            }
        }, _p.r(93));
    }
};

//src/kernel/unescape-map.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[105] = {
    value: function(require) {
        var data = {};
        var ESCAPE_MAP = _p.r(92);
        for (var key in ESCAPE_MAP) {
            if (ESCAPE_MAP.hasOwnProperty(key)) {
                data[ESCAPE_MAP[key]] = key;
            }
        }
        return data;
    }
};

//src/modules.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[106] = {
    value: function(require) {
        return {
            common: {
                cell: _p.r(6),
                title: _p.r(31),
                formula: _p.r(15),
                content: _p.r(8),
                color: _p.r(7),
                style: _p.r(30)
            },
            core: {
                struct: _p.r(54),
                dataAccess: _p.r(46),
                actuary: _p.r(34),
                range: _p.r(51),
                value: _p.r(65),
                datetime: _p.r(48),
                cell: _p.r(35),
                view: _p.r(66),
                style: _p.r(56),
                device: _p.r(49)
            },
            system: {
                screen: _p.r(139),
                scrollbar: _p.r(142),
                cover: _p.r(116),
                position: _p.r(126),
                input: _p.r(124),
                selection: _p.r(143),
                resize: _p.r(127),
                formulacontent: _p.r(120),
                rowcolumn: _p.r(128),
                sort: _p.r(144),
                viewport: _p.r(145),
                clipboard: _p.r(108)
            }
        };
    }
};

//src/system/clipboard/blacklist.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[107] = {
    value: {
        area: true,
        audio: true,
        base: true,
        bdi: true,
        bdo: true,
        body: true,
        canvas: true,
        cite: true,
        command: true,
        datalist: true,
        details: true,
        dfn: true,
        embed: true,
        figcaption: true,
        figure: true,
        footer: true,
        form: true,
        head: true,
        hr: true,
        html: true,
        iframe: true,
        img: true,
        input: true,
        ins: true,
        kbd: true,
        keygen: true,
        link: true,
        map: true,
        mark: true,
        meta: true,
        meter: true,
        noscript: true,
        object: true,
        optgroup: true,
        option: true,
        output: true,
        param: true,
        progress: true,
        rp: true,
        ruby: true,
        script: true,
        select: true,
        source: true,
        style: true,
        summary: true,
        tbody: true,
        textarea: true,
        tfoot: true,
        th: true,
        thead: true,
        title: true,
        track: true,
        "var": true,
        video: true,
        wbr: true
    }
};

//src/system/clipboard/clipboard.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[108] = {
    value: function(require) {
        var $ = _p.r(2);
        var Filter = _p.r(111);
        var Fax = _p.r(110);
        var KEY_CODE = _p.r(119);
        var Clipboard = _p.r(0).create("Clipboard", {
            base: _p.r(87),
            inputModule: null,
            filter: null,
            tipNode: null,
            $tipNode: null,
            state: false,
            cutState: false,
            start: null,
            end: null,
            init: function(inputModule) {
                this.inputModule = inputModule;
                this.filter = this.createComponent(Filter);
                this.fax = this.createComponent(Fax);
                this.tipNode = this.createElement("div", "btb-copy-tip");
                this.$tipNode = $(this.tipNode);
                this.initEvent();
                this.initMessageHook();
            },
            run: function() {
                this.getContentContainer().appendChild(this.tipNode);
            },
            initEvent: function() {
                var _self = this;
                $(this.getMainContainer()).on("paste", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!_self.inputModule.isActive()) {
                        _self.paste(e.originalEvent.clipboardData);
                    } else {
                        _self.pasteToInput(e.originalEvent.clipboardData);
                    }
                }).on("copy", function(e) {
                    if (_self.inputModule.isActive()) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    _self.copy(e.originalEvent.clipboardData);
                }).on("cut", function(e) {
                    if (_self.inputModule.isActive()) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    _self.cut(e.originalEvent.clipboardData);
                }).on("keydown", function(e) {
                    if (e.keyCode === KEY_CODE.ESC && _self.state) {
                        _self.hide();
                        _self.cutState = false;
                    }
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.refresh
                });
            },
            paste: function(clipboardData) {
                var types = clipboardData.types;
                this.corePrepareRefresh();
                // remove cut cells
                if (this.cutState) {
                    this.cutState = false;
                    this.execCommand("clearcontent", this.start, this.end);
                    this.execCommand("clearformat", this.start, this.end);
                }
                this.hide();
                if (types.indexOf("text/html") !== -1) {
                    this.writeHTML(clipboardData.getData("text/html"));
                } else if (types.indexOf("text/plain") !== -1) {
                    this.writeStr(clipboardData.getData("text/plain"));
                }
                this.coreRefresh();
            },
            copy: function(clipboardData) {
                var range = this.rs("c.range");
                var focus;
                var start;
                var end;
                var htmlSource;
                var strSource;
                this.show(range.getStart(), range.getEnd());
                clipboardData.clearData();
                if (!range.isMultiple()) {
                    focus = range.getFocus();
                    htmlSource = this.fax.getSingleCellHTML(focus.row, focus.col);
                    strSource = this.fax.getSingleCellString(focus.row, focus.col);
                } else {
                    start = range.getStart();
                    end = range.getEnd();
                    htmlSource = this.fax.getMultiCellHTML(start, end);
                    strSource = this.fax.getMultiCellString(start, end);
                }
                if (!htmlSource) {
                    return;
                }
                clipboardData.setData("text/html", htmlSource);
                clipboardData.setData("text/plain", strSource);
            },
            cut: function(clipboardData) {
                this.cutState = true;
                this.copy(clipboardData);
            },
            pasteToInput: function(clipboardData) {
                var types = clipboardData.types;
                if (types.indexOf("text/plain") === -1) {
                    return;
                }
                this.writeToInput(clipboardData.getData("text/plain"));
            },
            writeHTML: function(html) {
                var layout = this.filter.parseHTML(html);
                var rowLayout;
                var range = this.rs("c.range");
                var rangeStart = range.getStart();
                var rowStart = rangeStart.row;
                var colStart = rangeStart.col;
                var row;
                var col;
                var maxCol = 0;
                for (var i = 0, len = layout.length; i < len; i++) {
                    rowLayout = layout[i];
                    row = rowStart + i;
                    if (rowLayout.isBr) {
                        continue;
                    }
                    maxCol = Math.max(maxCol, rowLayout.length);
                    for (var j = 0, jlen = rowLayout.length; j < jlen; j++) {
                        col = colStart + j;
                        this.execCommand("write", rowLayout[j].content, row, col);
                        if (rowLayout[j].style) {
                            this.rs("c.batch.setstyle", rowLayout[j].style, row, col);
                        }
                    }
                }
                this.__changeSelection({
                    row: rowStart,
                    col: colStart
                }, {
                    row: rowStart + layout.length - 1,
                    col: colStart + maxCol - 1
                });
            },
            writeToInput: function(str) {
                str = str.replace(/\n/g, "<br>");
                this.inputModule.inesert(str);
            },
            writeStr: function(str) {
                var range = this.rs("c.range");
                var rangeStart = range.getStart();
                var startRow = rangeStart.row;
                var startCol = rangeStart.col;
                var layout = this.filter.parseString(str);
                var rowLayout;
                for (var i = 0, len = layout.length; i < len; i++) {
                    rowLayout = layout[i];
                    for (var j = 0, jlen = rowLayout.length; j < jlen; j++) {
                        this.execCommand("write", rowLayout[j], startRow + i, startCol + j);
                    }
                }
            },
            show: function(start, end) {
                this.state = true;
                this.start = {
                    row: start.row,
                    col: start.col
                };
                this.end = {
                    row: end.row,
                    col: end.col
                };
                this.refresh();
            },
            hide: function() {
                this.state = false;
                this.start = null;
                this.end = null;
                this.$tipNode.css("display", "none");
            },
            refresh: function() {
                if (!this.state) {
                    return;
                }
                var struct = this.rs("c.struct");
                var rect = this.cs("c.cell.viewrect", struct, this.start, this.end);
                if (!rect) {
                    this.$tipNode.css("display", "none");
                    return;
                }
                var overflow = rect.overflow;
                this.$tipNode.css({
                    top: rect.y,
                    left: rect.x,
                    width: rect.width,
                    height: rect.height,
                    borderLeftColor: overflow.left ? "transparent" : "",
                    borderRightColor: overflow.right ? "transparent" : "",
                    borderTopColor: overflow.top ? "transparent" : "",
                    borderBottomColor: overflow.bottom ? "transparent" : "",
                    display: "block"
                });
            },
            __changeSelection: function(start, end) {
                this.rs("c.range.set", {
                    row: start.row,
                    col: start.col
                }, {
                    row: start.row,
                    col: start.col
                }, {
                    row: end.row,
                    col: end.col
                });
            }
        });
        Clipboard.deps = [ "input" ];
        return Clipboard;
    }
};

//src/system/clipboard/default-element-style.js
_p[109] = {
    value: function(require) {
        var BASE_FONT_SIZE = _p.r(32).style.fontSize;
        return {
            th: {
                fontWeight: "bold",
                textAlign: "center",
                verticalAlign: "middle"
            },
            caption: {
                textAlign: "center"
            },
            h1: {
                fontSize: Math.ceil(2 * BASE_FONT_SIZE),
                fontWeight: "bold"
            },
            h2: {
                fontSize: Math.ceil(1.5 * BASE_FONT_SIZE),
                fontWeight: "bold"
            },
            h3: {
                fontSize: Math.ceil(1.17 * BASE_FONT_SIZE),
                fontWeight: "bold"
            },
            h4: {
                fontWeight: "bold"
            },
            h5: {
                fontSize: Math.ceil(.83 * BASE_FONT_SIZE),
                fontWeight: "bold"
            },
            h6: {
                fontSize: Math.ceil(.75 * BASE_FONT_SIZE),
                fontWeight: "bold"
            },
            b: {
                fontWeight: "bold"
            },
            strong: {
                fontWeight: "bold"
            },
            i: {
                fontStyle: "italic"
            },
            cite: {
                fontStyle: "italic"
            },
            em: {
                fontStyle: "italic"
            },
            "var": {
                fontStyle: "italic"
            },
            address: {
                fontStyle: "italic"
            },
            big: {
                fontSize: Math.ceil(1.17 * BASE_FONT_SIZE)
            },
            small: {
                fontSize: Math.ceil(.83 * BASE_FONT_SIZE)
            },
            sub: {
                fontSize: Math.ceil(.83 * BASE_FONT_SIZE)
            },
            sup: {
                fontSize: Math.ceil(.83 * BASE_FONT_SIZE)
            },
            td: {
                verticalAlign: "middle"
            },
            s: {
                textDecoration: "line-through"
            },
            strike: {
                textDecoration: "line-through"
            },
            del: {
                textDecoration: "line-through"
            },
            u: {
                textDecoration: "underline"
            },
            ins: {
                textDecoration: "underline"
            },
            center: {
                textAlign: "center"
            }
        };
    }
};

//src/system/clipboard/fax.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[110] = {
    value: function(require) {
        return _p.r(0).create("Fax", {
            base: _p.r(84),
            isolatedNode: null,
            getMultiCellHTML: function(start, end) {
                var struct = this.rs("c.struct");
                var effectiveIndex = struct.getEffectiveIndex();
                var values = [];
                var styles = [];
                var effectiveRow = Math.min(end.row, effectiveIndex.row);
                var effectiveCol = Math.min(end.col, effectiveIndex.col);
                for (var i = start.row, rowCount = 0, limit = effectiveRow; i <= limit; i++, rowCount++) {
                    values[rowCount] = [];
                    styles[rowCount] = [];
                    for (var j = start.col, colCount = 0, jlimit = effectiveCol; j <= jlimit; j++, colCount++) {
                        values[rowCount][colCount] = struct.getRawValue(i, j);
                        styles[rowCount][colCount] = struct.getUserStyle(i, j);
                    }
                }
                var trs = [];
                var tds = [];
                var currentValue;
                for (var i = 0, len = values.length; i < len; i++) {
                    currentValue = values[i];
                    tds = [];
                    for (var j = 0, jlen = currentValue.length; j < jlen; j++) {
                        tds.push('<td style="' + this.cs("style.to.text", styles[i][j]) + '">' + (currentValue[j] || "") + "</td>");
                    }
                    trs.push(tds.join(""));
                }
                return "<table><tbody><tr>" + trs.join("</tr><tr>") + "</tr></tbody></table>";
            },
            getMultiCellString: function(start, end) {
                var struct = this.rs("c.struct");
                var effectiveIndex = struct.getEffectiveIndex();
                var effectiveRow = Math.min(end.row, effectiveIndex.row);
                var effectiveCol = Math.min(end.col, effectiveIndex.col);
                var values = [];
                var colValues;
                for (var i = start.row, rowCount = 0, limit = effectiveRow; i <= limit; i++, rowCount++) {
                    colValues = [];
                    for (var j = start.col, colCount = 0, jlimit = effectiveCol; j <= jlimit; j++, colCount++) {
                        colValues.push(struct.getRawValue(i, j) || "");
                    }
                    values.push(colValues.join("	"));
                }
                return values.join("\n");
            },
            getSingleCellHTML: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getRawValue(row, col) || "";
                var style = struct.getUserStyle(row, col);
                style = this.cs("style.to.text", style);
                return '<span style="' + style + '">' + value + "</span>";
            },
            getSingleCellString: function(row, col) {
                var struct = this.rs("c.struct");
                return struct.getDisplayValue(row, col) || "";
            }
        });
    }
};

//src/system/clipboard/filter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[111] = {
    value: function(require) {
        var StandardStyle = _p.r(113);
        var INLINE_ELEMENTS = _p.r(112);
        var ELEMENT_BLACKLIST = _p.r(107);
        var DEFAULT_ELEMENT_STYLE = _p.r(109);
        var LOCAL_STYLE = _p.r(32).style;
        var BASE_FONT_SIZE = LOCAL_STYLE.fontSize;
        var BACKGROUND_COLOR = LOCAL_STYLE.backgroundColor;
        return _p.r(0).create("PasteHtmlFilter", {
            base: _p.r(84),
            isolatedNode: null,
            init: function() {
                this.isolatedNode = this.createElement("div", "btb-isolated");
                this.range = this.getDocument().createRange();
            },
            parseHTML: function(html) {
                html = html.replace(/\n*?\r*?\s*?</g, "<").replace(/>\s*\n*?\r*?/, ">");
                var isolatedNode = this.isolatedNode;
                isolatedNode.innerHTML = html;
                var tableLayout = [ [] ];
                var rowLayout = tableLayout[0];
                this.__parseLayout(tableLayout, isolatedNode, rowLayout);
                return this.restructLayout(tableLayout);
            },
            parseString: function(str) {
                var layout = [];
                var columnStr;
                str = str.split("\n");
                for (var i = 0, len = str.length; i < len; i++) {
                    columnStr = str[i].split("	");
                    layout[i] = [];
                    for (var j = 0, jlen = columnStr.length; j < jlen; j++) {
                        layout[i][j] = columnStr[j].trim();
                    }
                }
                return layout;
            },
            __parseLayout: function(tableLayout, node, rowLayout) {
                var childs = node.childNodes;
                var currentNode;
                var nodeName;
                var nodeType;
                // empty node
                if (childs.length === 0) {
                    if (rowLayout.length === 0) {
                        rowLayout.push([ {
                            isEmpty: true,
                            node: node
                        } ]);
                    } else {
                        rowLayout[rowLayout.length - 1].push({
                            isEmpty: true,
                            node: node
                        });
                    }
                    return;
                }
                for (var i = 0, len = childs.length; i < len; i++) {
                    currentNode = childs[i];
                    nodeName = currentNode.nodeName.toLowerCase();
                    nodeType = currentNode.nodeType;
                    // 黑名单
                    if (ELEMENT_BLACKLIST[nodeName]) {
                        continue;
                    }
                    if (nodeType === 1 && !INLINE_ELEMENTS[nodeName]) {
                        if (nodeName === "br") {
                            if (rowLayout.length === 0) {
                                tableLayout[tableLayout.length - 1] = {
                                    isBr: true
                                };
                            }
                            rowLayout = [];
                            tableLayout.push(rowLayout);
                        } else if (nodeName === "table") {
                            rowLayout = [];
                            tableLayout.push(rowLayout);
                            this.__parseTableLayout(tableLayout, currentNode, rowLayout);
                        } else {
                            rowLayout = [];
                            tableLayout.push(rowLayout);
                            this.__parseLayout(tableLayout, currentNode, rowLayout);
                        }
                    } else if (nodeType !== 1 && nodeType !== 3) {
                        continue;
                    } else {
                        if (nodeType === 3) {
                            if (rowLayout.length === 0) {
                                rowLayout.push([ currentNode ]);
                            } else {
                                rowLayout[rowLayout.length - 1].push(currentNode);
                            }
                        } else {
                            this.__parseLayout(tableLayout, currentNode, rowLayout);
                        }
                    }
                }
            },
            __parseTableLayout: function(tableLayout, node, rowLayout) {
                var rows = node.rows;
                var cells;
                for (var i = 0, len = rows.length; i < len; i++) {
                    rowLayout = [];
                    tableLayout.push(rowLayout);
                    cells = rows[i].cells;
                    for (var j = 0, jlen = cells.length; j < jlen; j++) {
                        rowLayout.push({
                            isCell: true,
                            content: cells[j].innerText,
                            node: cells[j].firstChild || cells[j]
                        });
                    }
                }
            },
            restructLayout: function(layout) {
                var result = [];
                var rowLayout;
                var columnLayout;
                var contents;
                for (var i = 0, len = layout.length; i < len; i++) {
                    rowLayout = layout[i];
                    if (rowLayout.length === 0) {
                        continue;
                    }
                    result[i] = [];
                    if (rowLayout.isBr) {
                        result[i] = rowLayout;
                        continue;
                    }
                    for (var j = 0, jlen = rowLayout.length; j < jlen; j++) {
                        columnLayout = rowLayout[j];
                        // table cell
                        if (columnLayout.isCell) {
                            result[i][j] = {
                                content: columnLayout.content,
                                style: this.__getStyle(columnLayout.node)
                            };
                            continue;
                        }
                        // 普通行
                        contents = [];
                        for (var k = 0, klen = columnLayout.length; k < klen; k++) {
                            if (columnLayout[k].isEmpty) {
                                contents[k] = "";
                            } else {
                                contents[k] = columnLayout[k].nodeValue.trim();
                            }
                        }
                        result[i][j] = {
                            content: contents.join(" "),
                            style: this.__getStyle(columnLayout[0].isEmpty ? columnLayout[0].node : columnLayout[0])
                        };
                    }
                }
                // 删除所有非显式换行的空行
                return this.__clearEmptyLine(result);
            },
            __clearEmptyLine: function(layout) {
                var result = [];
                for (var i = 0, len = layout.length; i < len; i++) {
                    if (layout[i]) {
                        result.push(layout[i]);
                    }
                }
                return result;
            },
            __getStyle: function(node) {
                while (node && node.nodeType === 3) {
                    node = node.parentNode;
                }
                var cssStyle = node.style;
                var nodeName = node.nodeName.toLowerCase();
                var result = {};
                var defaultStyle = DEFAULT_ELEMENT_STYLE[nodeName] || {};
                var fontFamily = cssStyle.fontFamily;
                if (fontFamily === "sans-serif" || fontFamily === "serif") {
                    fontFamily = undefined;
                }
                var fontSize = cssStyle.fontSize;
                if (fontSize && fontSize.lastIndexOf("em") !== -1) {
                    fontSize = Math.floor(parseFloat(fontSize) * BASE_FONT_SIZE);
                } else if (fontSize && fontSize.lastIndexOf("%") !== -1) {
                    fontSize = Math.floor(parseFloat(fontSize) / 100 * BASE_FONT_SIZE);
                }
                var fontWeight = cssStyle.fontWeight;
                if (fontWeight === "normal") {
                    fontWeight = undefined;
                } else if (fontWeight) {
                    fontWeight = "bold";
                }
                var backgroundColor = this.cs("parse.color", cssStyle.backgroundColor);
                var color = this.cs("parse.color", cssStyle.color);
                if (color === BACKGROUND_COLOR && !backgroundColor) {
                    while (node && !backgroundColor || backgroundColor === "inherit") {
                        node = node.parentNode;
                        if (node) {
                            backgroundColor = node.style.backgroundColor;
                        }
                    }
                    backgroundColor = this.cs("parse.color", backgroundColor);
                }
                if (color === BACKGROUND_COLOR && (!backgroundColor || backgroundColor === BACKGROUND_COLOR)) {
                    color = undefined;
                }
                result.fontFamily = fontFamily ? fontFamily.split(",")[0] : undefined;
                result.fontWeight = fontWeight || defaultStyle.fontWeight;
                result.fontStyle = StandardStyle.fontStyle[cssStyle.fontStyle] || defaultStyle.fontStyle;
                result.fontSize = fontSize ? Math.ceil(parseInt(fontSize, 10)) : defaultStyle.fontSize;
                result.textAlign = StandardStyle.halign[cssStyle.textAlign] || defaultStyle.textAlign;
                result.verticalAlign = StandardStyle.valign[cssStyle.verticalAlign] || defaultStyle.verticalAlign;
                result.color = this.cs("parse.color", color);
                result.backgroundColor = this.cs("parse.color", backgroundColor);
                return result;
            }
        });
    }
};

//src/system/clipboard/inline-elements.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[112] = {
    value: {
        b: true,
        big: true,
        i: true,
        small: true,
        tt: true,
        abbr: true,
        acronym: true,
        cite: true,
        code: true,
        dfn: true,
        em: true,
        kbd: true,
        strong: true,
        samp: true,
        "var": true,
        a: true,
        bdo: true,
        img: true,
        map: true,
        object: true,
        q: true,
        script: true,
        span: true,
        sub: true,
        sup: true,
        button: true,
        input: true,
        label: true,
        select: true,
        textarea: true
    }
};

//src/system/clipboard/standard-style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[113] = {
    value: {
        fontWeight: {
            bold: "bold",
            bolder: "bold"
        },
        valign: {
            baseline: "bottom",
            "text-bottom": "bottom",
            "text-top": "top",
            sub: "bottom",
            "super": "top"
        },
        fontStyle: {
            italic: "italic"
        },
        halign: {
            left: "left",
            center: "center",
            right: "right"
        }
    }
};

//src/system/commands/input.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[114] = {
    value: function(require) {
        return _p.r(0).create("InputLockCommand", {
            base: _p.r(83),
            name: "lockinput unlockinput inputfocus",
            execute: function(name) {
                switch (name) {
                  case "lockinput":
                    this.rs("s.input.lock");
                    break;

                  case "unlockinput":
                    this.rs("s.input.unlock");
                    break;

                  case "inputfocus":
                    this.rs("s.input.focus");
                    break;
                }
            }
        });
    }
};

//src/system/commands/sort.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[115] = {
    value: function(require) {
        return _p.r(0).create("SortCommand", {
            base: _p.r(83),
            name: "sortcolumnbyasc sortcolumnbydesc sortrowbyasc sortrowbydesc",
            execBefore: function(name) {
                if (arguments.length === 3) {
                    return [].slice.call(arguments, 1);
                }
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var index;
                switch (name) {
                  case "sortcolumnbyasc":
                  case "sortcolumnbydesc":
                    index = focus.col;
                    break;

                  case "sortrowbyasc":
                  case "sortrowbydesc":
                    index = focus.row;
                    break;
                }
                return [ index, {
                    start: range.getStart(),
                    end: range.getEnd()
                } ];
            },
            execute: function(name, index, range) {
                this[name](index, range);
            },
            sortcolumnbyasc: function(index, range) {
                return this.rs("c.sort.column.asc", index, range);
            },
            sortcolumnbydesc: function(index, range) {
                return this.rs("c.sort.column.desc", index, range);
            },
            sortrowbyasc: function(index, range) {
                return this.rs("c.sort.row.asc", index, range);
            },
            sortrowbydesc: function(index, range) {
                return this.rs("c.sort.row.desc", index, range);
            }
        });
    }
};

//src/system/cover/cover.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[116] = {
    value: function(require) {
        var $ = _p.r(2);
        var Cover = _p.r(0).create("Cover", {
            position: null,
            panel: null,
            queue: {
                mousedown: [],
                mousemove: [],
                mouseup: [],
                dblclick: []
            },
            base: _p.r(87),
            init: function(position) {
                this.position = position;
                this.panel = this.createPanel();
                this.initEvent();
            },
            initEvent: function() {
                var position = this.position;
                var _self = this;
                var state = false;
                $(this.panel).on("mousedown dblclick", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    if (evt.type !== "dblclick") {
                        state = true;
                    }
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.emit(evt.type, index.row, index.col);
                });
                $(this.panel).on("mouseup", function(evt) {
                    if (!state) {
                        return;
                    }
                    state = false;
                    evt.stopPropagation();
                    evt.preventDefault();
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.emit(evt.type, index.row, index.col);
                });
                $(this.panel).on("mousemove", function(evt) {
                    if (!state) {
                        return;
                    }
                    evt.stopPropagation();
                    evt.preventDefault();
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.emit(evt.type, index.row, index.col);
                });
            },
            emit: function(type) {
                var queue = this.queue[type];
                var args = [].slice.call(arguments, 1);
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i].handler.apply(queue[i].provider, args);
                }
            },
            onmousedown: function(provider, handler) {
                this.queue.mousedown.push({
                    provider: provider,
                    handler: handler
                });
            },
            onmouseup: function(provider, handler) {
                this.queue.mouseup.push({
                    provider: provider,
                    handler: handler
                });
            },
            onmousemove: function(provider, handler) {
                this.queue.mousemove.push({
                    provider: provider,
                    handler: handler
                });
            },
            ondblclick: function(provider, handler) {
                this.queue.dblclick.push({
                    provider: provider,
                    handler: handler
                });
            },
            run: function() {
                this.getContentContainer().appendChild(this.panel);
            },
            createPanel: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-cover"
                    }
                });
            }
        });
        Cover.deps = [ "position" ];
        return Cover;
    }
};

//src/system/definition/color.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[117] = {
    value: [ {
        color: "rgba(247, 152, 29, 0.1)",
        border: "#D78E30"
    }, {
        color: "rgba(60, 160, 232, 0.1)",
        border: "#3B8ECA"
    }, {
        color: "rgba(180, 77, 192, 0.1)",
        border: "rgb(180, 77, 192)"
    }, {
        color: "rgba(58, 189, 37, 0.1)",
        border: "#3ABD25"
    }, {
        color: "rgba(115, 213, 202, 0.1)",
        border: "rgb(115, 213, 202)"
    } ]
};

//src/system/definition/formula-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[118] = {
    value: {
        OPERAND: "operand",
        OPERATOR: "operator",
        REFERENCE: "reference",
        CONSTANT: "constant"
    }
};

//src/system/definition/keycode.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[119] = {
    value: {
        ENTER: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        TAB: 9,
        ESC: 27,
        BACKSPACE: 8,
        DELETE: 46
    }
};

//src/system/formula-content/content.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[120] = {
    value: function(require) {
        var $ = _p.r(2);
        var Editor = _p.r(121);
        var TEXT_SPACE = 2;
        var FormulaAnalyzer = _p.r(122);
        var FormulaContent = _p.r(0).create("FormulaContent", {
            cover: null,
            wrapper: null,
            container: null,
            editor: null,
            analyzer: null,
            controlState: false,
            base: _p.r(87),
            init: function(position) {
                this.position = position;
                this.wrapper = this.createWrapper();
                this.container = this.createEditorContainer();
                this.cover = this.createFormulaCover();
                this.editor = this.createComponent(Editor);
                this.analyzer = this.createComponent(FormulaAnalyzer);
                this.editor.setAnalyzer(this.analyzer);
                this.initMessageHook();
                this.initEvent();
            },
            run: function() {
                this.editor.appendTo(this.container);
                this.editor.appendToCover(this.cover);
                this.wrapper.appendChild(this.container);
                this.getContentContainer().appendChild(this.wrapper);
                this.getContentContainer().appendChild(this.cover);
            },
            initMessageHook: function() {
                this.onMessage({
                    "s.formula.model.open": this.start,
                    "s.formula.controlstatechange": this.changeControlState,
                    "s.formula.exit": this.exit
                });
            },
            initEvent: function() {
                var _self = this;
                var index;
                var viewStart;
                $(this.cover).on("mousedown", function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    viewStart = _self.rs("c.struct").getViewStart();
                    index = _self.position.toIndex(evt.clientX, evt.clientY);
                    if (!_self.controlState) {
                        _self.exit();
                    }
                    _self.execCommand("focus", viewStart.row + index.row, viewStart.col + index.col);
                });
            },
            start: function() {
                this.showCover();
                this.resize();
                this.showInput();
                this.editor.reset();
            },
            exit: function() {
                this.hideCover();
                this.hideInput();
                this.editor.exit();
                this.postMessage("s.formula.model.close");
            },
            changeControlState: function(state) {
                this.controlState = state;
            },
            showCover: function() {
                this.cover.style.display = "block";
            },
            hideCover: function() {
                this.cover.style.display = "none";
            },
            showInput: function() {
                this.wrapper.style.display = "block";
            },
            hideInput: function() {
                this.wrapper.style.display = "none";
            },
            resize: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var borderWidth = struct.getBorderWidth();
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var coordinate = this.cs("c.cell.coordinate", struct, focus.row, focus.col);
                $(this.container).css({
                    minWidth: grid.width[focus.col] - 2 * borderWidth - 2 * TEXT_SPACE,
                    minHeight: grid.height[focus.row] - 2 * borderWidth - 2 * TEXT_SPACE
                });
                $(this.wrapper).css({
                    top: coordinate.y - borderWidth,
                    left: coordinate.x - borderWidth
                });
            },
            createFormulaCover: function() {
                return this.createElement("div", "btb-formula-cover");
            },
            createWrapper: function() {
                return this.createElement("div", "btb-formula-wrapper");
            },
            createEditorContainer: function() {
                return this.createElement("div", "btb-editor-container");
            }
        });
        FormulaContent.deps = [ "position" ];
        return FormulaContent;
    }
};

//src/system/formula-content/editor.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[121] = {
    value: function(require) {
        var $ = _p.r(2);
        var KEY_CODE = _p.r(119);
        var COLOR = _p.r(117);
        var TYPE = _p.r(118);
        return _p.r(0).create("Editor", {
            input: null,
            $input: null,
            tooltip: null,
            $tooltip: null,
            templateSelection: null,
            templatePart: null,
            placeholder: null,
            analyzer: null,
            total: null,
            doc: null,
            parts: [],
            blocks: [],
            selections: [],
            snapshot: null,
            focusIndex: 0,
            originalCell: null,
            controlState: true,
            imeState: false,
            workState: false,
            tipState: false,
            index: 0,
            base: _p.r(84),
            init: function() {
                this.input = this.createInput();
                this.$input = $(this.input);
                this.doc = this.getDocument();
                this.tooltip = this.createTooltip();
                this.$tooltip = $(this.tooltip);
                this.container = this.createContainer();
                this.placeholder = this.doc.createTextNode("﻿");
                this.templatePart = this.createTemplatePart();
                this.templateSelection = this.createTemplateSelection();
                this.initEvent();
                this.initMessageHook();
            },
            setAnalyzer: function(analyzer) {
                this.analyzer = analyzer;
            },
            reset: function() {
                this.total = this.rs("c.struct").getTotal();
                this.originalCell = this.rs("c.range").getFocus();
                this.workState = true;
                this.tipState = true;
                this.index = 0;
                this.input.innerHTML = "<span>=</span>";
                this.placeholder.textContent = "﻿";
                this.changeControlState(true);
                this.input.appendChild(this.placeholder);
                this.input.appendChild(this.tooltip);
                this.toNodeInnerEnd(this.placeholder);
            },
            exit: function() {
                this.workState = false;
                this.blocks = [];
                this.selections = [];
                this.parts = [];
                this.input.blur();
                this.container.innerHTML = "";
            },
            flush: function(moveUp) {
                var content = this.input.innerText.replace("﻿", "");
                this.transferControl();
                this.execCommand("write", content, this.originalCell.row, this.originalCell.col);
                if (moveUp) {
                    this.execCommand("moveup", 1);
                } else {
                    this.execCommand("movedown", 1);
                }
            },
            transferControl: function() {
                this.postMessage("s.formula.exit");
                this.execCommand("focus", this.originalCell.row, this.originalCell.col);
            },
            initEvent: function() {
                var _self = this;
                this.$input.on("keydown", function(evt) {
                    switch (evt.keyCode) {
                      case KEY_CODE.ENTER:
                        evt.preventDefault();
                        _self.flush(evt.shiftKey);
                        return;

                      case KEY_CODE.ESC:
                        evt.preventDefault();
                        _self.transferControl();
                        return;
                    }
                    if (!_self.controlState || _self.imeState) {
                        return;
                    }
                    switch (evt.keyCode) {
                      case KEY_CODE.LEFT:
                        _self.leftMove(evt);
                        break;

                      case KEY_CODE.RIGHT:
                        _self.rightMove(evt);
                        break;

                      case KEY_CODE.UP:
                        _self.upMove(evt);
                        break;

                      case KEY_CODE.DOWN:
                        _self.downMove(evt);
                        break;

                      case KEY_CODE.DELETE:
                      case KEY_CODE.BACKSPACE:
                        _self.keyDelete();
                        break;
                    }
                }).on("compositionstart", function(evt) {
                    _self.imeState = true;
                }).on("compositionend", function(evt) {
                    _self.imeState = false;
                }).on("input", function() {
                    if (_self.imeState) {
                        return;
                    }
                    _self.restruct();
                }).on("blur", function() {
                    if (_self.workState) {
                        _self.flush();
                        _self.postMessage("s.formula.blur");
                    }
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.update,
                    "c.range.change": this.update
                });
            },
            update: function() {
                if (!this.workState) {
                    return;
                }
                var struct = this.rs("c.struct");
                var range = this.rs("c.range");
                var selections = this.selections;
                selections[this.index] = {
                    start: range.getStart(),
                    end: range.getEnd()
                };
                this.focusIndex = this.index;
                this.refreshSelection();
                this.updatePart(range);
                this.hintSelection();
            },
            refreshSelection: function() {
                var struct = this.rs("c.struct");
                var borderWidth = struct.getBorderWidth();
                var selections = this.selections;
                var blocks = this.blocks;
                var rect;
                var currentSelection;
                for (var i = 0, len = selections.length; i < len; i++) {
                    currentSelection = selections[i];
                    rect = this.cs("c.cell.viewrect", struct, currentSelection.start, currentSelection.end);
                    if (!blocks[i]) {
                        blocks[i] = this.getNewSelection(i);
                    }
                    if (rect) {
                        blocks[i].css({
                            width: rect.width - 2 * borderWidth,
                            height: rect.height - 2 * borderWidth,
                            top: rect.y - borderWidth,
                            left: rect.x - borderWidth,
                            background: "none",
                            display: "block"
                        });
                    } else {
                        blocks[i].css("display", "none");
                    }
                }
            },
            hintSelection: function() {
                var blocks = this.blocks;
                if (this.focusIndex !== -1) {
                    blocks[this.focusIndex].css("backgroundColor", this.getColor(this.focusIndex).color);
                }
            },
            updatePart: function(range) {
                if (range.isMultiple()) {
                    return;
                }
                var selection = this.selections[this.index];
                var color;
                var title = this.cs("c.title.index2char", selection.start.col);
                var part = this.parts[this.index];
                if (!part) {
                    color = this.getColor();
                    this.parts[this.index] = this.templatePart.cloneNode(true);
                    part = this.parts[this.index];
                    part.style.color = color.border;
                    this.insertNodeBeforeStart(part);
                }
                part.innerHTML = title + (selection.start.row + 1);
            },
            keyDelete: function() {
                this.toNodeBefore(this.placeholder);
            },
            hideTooltip: function() {
                this.$tooltip.remove();
                this.tipState = false;
            },
            restruct: function() {
                var content = this.input.innerText.replace(/\uFEFF/g, "");
                this.saveRangeSnapshot();
                var result = this.analyzer.analyze(this.total, content);
                if (!result) {
                    this.transferControl();
                    this.postMessage("s.toinput", content);
                    return;
                }
                this.reload(result);
                this.refreshSelection();
                this.hintSelection();
            },
            saveRangeSnapshot: function() {
                var range = this.doc.getSelection().getRangeAt(0);
                this.snapshot = {
                    container: range.startContainer,
                    offset: range.startOffset,
                    commonAncestorContainer: range.commonAncestorContainer
                };
            },
            reload: function(parts) {
                var part;
                this.index = 0;
                var segments = [];
                this.free();
                this.parts = [];
                this.selections = [];
                this.blocks = [];
                for (var i = 0, len = parts.length; i < len; i++) {
                    part = parts[i];
                    switch (part.type) {
                      case TYPE.REFERENCE:
                        segments[i] = this.createReferencePart(part.content);
                        this.parts[this.index] = segments[i];
                        this.selections[this.index] = part.value;
                        this.index++;
                        break;

                      case TYPE.CONSTANT:
                        segments[i] = this.createConstantPart(part.content);
                        break;

                      case TYPE.OPERATOR:
                        segments[i] = this.createOperatorPart(part.content);
                    }
                }
                segments.unshift(this.createElement("span", {
                    inner: "="
                }));
                var replaceRange = this.getReplaceRange(segments);
                if (replaceRange.focus > 0 && parts[replaceRange.focus - 1].type === TYPE.REFERENCE) {
                    this.focusIndex = parts[replaceRange.focus - 1].index;
                } else {
                    this.focusIndex = -1;
                }
                this.input.innerHTML = "";
                for (var i = 0, len = segments.length; i < len; i++) {
                    this.input.appendChild(segments[i]);
                }
                if (parts.length === 0 || parts[parts.length - 1].type === TYPE.OPERATOR) {
                    $(this.placeholder).remove();
                    $(this.tooltip).remove();
                    this.placeholder.textContent = "﻿";
                    if (replaceRange.container.parentNode !== this.input) {
                        $(this.placeholder).insertAfter(replaceRange.container.parentNode);
                    } else {
                        $(this.placeholder).insertAfter(replaceRange.container);
                    }
                    $(this.tooltip).insertAfter(this.placeholder);
                    this.tipState = true;
                    this.changeControlState(true);
                    this.toNodeInnerEnd(this.placeholder);
                } else {
                    this.tipState = false;
                    this.changeControlState(false);
                    this.replaceRange(replaceRange);
                }
            },
            changeControlState: function(state) {
                this.controlState = state;
                this.postMessage("s.formula.controlstatechange", state);
            },
            getReplaceRange: function(segments) {
                var count = this.getFocusBeforeCount();
                var currentCount;
                var container;
                var offset;
                var focus = 0;
                for (var i = 0, len = segments.length; i < len; i++) {
                    currentCount = segments[i].textContent.length;
                    if (count > currentCount) {
                        focus++;
                        count -= currentCount;
                        continue;
                    } else {
                        container = segments[i].firstChild || segments[i];
                        offset = count;
                        break;
                    }
                }
                return {
                    container: container,
                    offset: offset,
                    focus: focus
                };
            },
            getFocusBeforeCount: function() {
                var snapshot = this.snapshot;
                var focusNode = snapshot.container;
                var offset = snapshot.offset;
                var slice = [].slice;
                if (focusNode.parentNode !== this.input) {
                    focusNode = focusNode.parentNode;
                }
                var template = this.input.cloneNode(true);
                var childNodes = template.childNodes;
                var count;
                var index = slice.call(this.input.childNodes).indexOf(focusNode);
                var newFocus = childNodes[index];
                for (var i = childNodes.length - 1; i >= index; i--) {
                    template.removeChild(childNodes[i]);
                }
                count = template.innerText.replace("﻿").length;
                var text = newFocus.textContent.split("");
                for (var i = 0, len = offset; i < len; i++) {
                    if (text[i] === "﻿") {
                        continue;
                    }
                    count++;
                }
                return count;
            },
            replaceRange: function(simpleRange) {
                var selection = this.doc.getSelection();
                var range = selection.getRangeAt(0);
                range = range.cloneRange();
                range.setEnd(simpleRange.container, simpleRange.offset);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            free: function() {
                this.container.innerHTML = "";
            },
            createReferencePart: function(content) {
                var color = this.getColor();
                var node = this.templatePart.cloneNode(true);
                node.style.color = color.border;
                node.style.textDecoration = "none";
                node.innerHTML = content;
                return node;
            },
            createConstantPart: function(content) {
                return this.createElement("span", {
                    inner: content
                });
            },
            createOperatorPart: function(content) {
                return this.doc.createTextNode(content);
            },
            leftMove: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.resetCellRange();
                this.hideTooltip();
                this.execCommand("moveleft", 1);
            },
            rightMove: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.resetCellRange();
                this.hideTooltip();
                this.execCommand("moveright", 1);
            },
            upMove: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.resetCellRange();
                this.hideTooltip();
                this.execCommand("moveup", 1);
            },
            downMove: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.resetCellRange();
                this.hideTooltip();
                this.execCommand("movedown", 1);
            },
            resetCellRange: function() {
                if (!this.selections[this.index]) {
                    this.rs("c.range.focus", this.originalCell.row, this.originalCell.col);
                }
            },
            getColor: function(index) {
                index = index === undefined ? this.index : index;
                return COLOR[index % COLOR.length];
            },
            getNewSelection: function(index) {
                var selection = this.createSelection(index);
                selection.appendTo(this.container);
                return selection;
            },
            createSelection: function(index) {
                var color = this.getColor(index);
                var block = this.templateSelection.cloneNode(false);
                return $(block).css({
                    borderColor: color.border
                });
            },
            insertNodeBeforeStart: function(node) {
                var range = this.doc.getSelection().getRangeAt(0);
                var startContainer = range.startContainer;
                if (startContainer.nodeType === 1) {
                    startContainer.insertBefore(node, startContainer.childNodes[range.startOffset]);
                } else {
                    startContainer.parentNode.insertBefore(node, startContainer);
                }
            },
            toNodeBefore: function(node) {
                var range = this.doc.createRange();
                var selection = this.doc.getSelection();
                var parent = node.parentNode;
                range.setEnd(parent, [].slice.call(parent.childNodes, 0).indexOf(node));
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            toNodeAfter: function(node) {
                var range = this.doc.createRange();
                var selection = this.doc.getSelection();
                range.setEndAfter(node);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            toNodeInnerEnd: function(node) {
                var range = this.doc.createRange();
                var selection = this.doc.getSelection();
                if (node.nodeType === 1) {
                    var target = node.childNodes;
                    range.setEndAfter(target[target.length - 1]);
                } else {
                    range.setEnd(node, node.textContent.length);
                }
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            toNodeInnerStart: function(node) {
                var range = this.doc.createRange();
                var selection = this.doc.getSelection();
                range.setStart(node, 0);
                range.setEnd(node, 0);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            appendToCover: function(cover) {
                cover.appendChild(this.container);
            },
            appendTo: function(container) {
                container.appendChild(this.input);
            },
            createInput: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-formula-editor",
                        contenteditable: true,
                        spellcheck: false
                    }
                });
            },
            createContainer: function() {
                return this.createElement("div", "btb-formula-selection");
            },
            createTooltip: function() {
                return this.createElement("span", "btb-formula-tooltip");
            },
            createTemplatePart: function() {
                return this.createElement("span", "btb-formula-part");
            },
            createTemplateSelection: function() {
                return this.createElement("div", "btb-formula-part-block");
            }
        });
    }
};

//src/system/formula-content/formula-analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[122] = {
    value: function(require) {
        var $ = _p.r(2);
        var TYPE = _p.r(118);
        var COL_PATTERN = /[\sA-Z]+/i;
        return _p.r(0).create("FormulaAnalyzer", {
            base: _p.r(84),
            analyze: function(totalCount, content) {
                if (content.charAt(0) !== "=") {
                    return null;
                }
                if (content === "=") {
                    return [];
                }
                var original = content.substring(1);
                var unit;
                var pattern = /([^+*\/^-]+)|([+*\/^-])/g;
                var parts = [];
                while (unit = pattern.exec(original)) {
                    if (unit[1] !== undefined) {
                        parts.push({
                            type: TYPE.OPERAND,
                            content: unit[1]
                        });
                    } else {
                        parts.push({
                            type: TYPE.OPERATOR,
                            content: unit[2]
                        });
                    }
                }
                return this.analyzePart(totalCount, parts);
            },
            analyzePart: function(totalCount, parts) {
                var result = [];
                var currentPart;
                var index = 0;
                for (var i = 0, len = parts.length; i < len; i++) {
                    currentPart = parts[i];
                    if (currentPart.type === TYPE.OPERATOR) {
                        result[i] = currentPart;
                    } else {
                        currentPart = currentPart.content;
                        if (currentPart.indexOf(":") !== -1) {
                            result[i] = this.parseMultiPart(totalCount, currentPart);
                        } else {
                            result[i] = this.parseSinglePart(totalCount, currentPart);
                        }
                        if (result[i].type === TYPE.REFERENCE) {
                            result[i].index = index;
                            index++;
                        }
                    }
                }
                return result;
            },
            parseSinglePart: function(totalCount, content) {
                var colIndex = COL_PATTERN.exec(content);
                var rowIndex;
                if (!colIndex) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                }
                colIndex = colIndex[0];
                rowIndex = content.substring(colIndex.length);
                if (colIndex + rowIndex !== content) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                }
                colIndex = colIndex.trim();
                rowIndex = rowIndex.trim();
                if (colIndex.length === 0 || rowIndex.length === 0) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                }
                var colNumber = this.cs("c.title.char2index", colIndex.trim());
                if (!$.isNumeric(rowIndex)) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                }
                // 行号和实际的索引之间有1个单位的差距
                var rowNumber = parseInt(rowIndex, 10) - 1;
                if (colNumber >= totalCount.col || rowNumber >= totalCount.row) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                }
                return {
                    type: TYPE.REFERENCE,
                    content: content,
                    value: {
                        start: {
                            row: rowNumber,
                            col: colNumber
                        },
                        end: {
                            row: rowNumber,
                            col: colNumber
                        }
                    }
                };
            },
            parseMultiPart: function(totalCount, content) {
                var parts = content.split(":", 2);
                var first = this.parseSinglePart(totalCount, parts[0]);
                var second = this.parseSinglePart(totalCount, parts[1]);
                if (first.type !== TYPE.REFERENCE || second.type !== TYPE.REFERENCE) {
                    return {
                        type: TYPE.CONSTANT,
                        content: content
                    };
                } else {
                    return {
                        type: TYPE.REFERENCE,
                        content: content,
                        value: {
                            start: first.value.start,
                            end: second.value.start
                        }
                    };
                }
            }
        });
    }
};

//src/system/input/input-shadow-man.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[123] = {
    value: function(require) {
        var $ = _p.r(2);
        var THRESHOLD = 20;
        return _p.r(0).create("InputShadowMan", {
            inputNode: null,
            $inputNode: null,
            padding: 0,
            borderWidth: 0,
            diff: 0,
            base: _p.r(84),
            init: function() {
                this.inputNode = this.createElement("div", {
                    attr: {
                        "class": "btb-shadow-input"
                    }
                });
                this.$inputNode = $(this.inputNode);
            },
            appendTo: function(container) {
                container.appendChild(this.inputNode);
                this.diff = 2 * (this.padding + this.borderWidth - this.rs("c.struct").getBorderWidth());
            },
            setPadding: function(padding) {
                this.padding = padding;
                this.diff = 2 * (this.padding + this.borderWidth - this.rs("c.struct").getBorderWidth());
            },
            setBorderWidth: function(borderWidth) {
                this.borderWidth = borderWidth;
            },
            resetStyle: function(style) {
                this.inputNode.innerHTML = "";
                this.inputNode.style.cssText = "";
                this.$inputNode.css(style);
            },
            // TODO 处理高度时需要重构
            getSize: function(content, align, size, index) {
                this.inputNode.innerHTML = content;
                var contentSize = {
                    width: size.width - 2 * this.padding,
                    height: size.height - 2 * this.padding
                };
                var currentSize = this.inputNode.getBoundingClientRect();
                var threshold = THRESHOLD + this.padding * 2;
                // 当前宽度和高度足够， 则不重新计算
                if (currentSize.width < contentSize.width - threshold && currentSize.height < contentSize.height) {
                    return null;
                }
                switch (align) {
                  case "left":
                    return this.__getLeftAlignWidth(index, size, currentSize, contentSize, threshold);

                  case "right":
                    return this.__getRightAlignWidth(index, size, currentSize, contentSize, threshold);

                  case "center":
                    return this.__getCenterAlignWidth(index, size, currentSize, contentSize, threshold);
                }
            },
            /**
         * 左对齐：向右扩展
         * @private
         */
            __getLeftAlignWidth: function(index, size, currentSize, contentSize, threshold) {
                var newSize = {};
                if (currentSize.width > contentSize.width - threshold) {
                    newSize.width = this.__getWidth(currentSize, index);
                    // 发生了变化， 需要更新数据
                    currentSize = this.inputNode.getBoundingClientRect();
                } else {
                    newSize.width = size.width;
                }
                if (currentSize.height > contentSize.height) {
                    newSize.height = this.__getHeight(currentSize.height, index.row);
                } else {
                    newSize.height = size.height;
                }
                return {
                    start: index.col,
                    size: newSize
                };
            },
            /**
         * 右对齐：向左扩展
         * @private
         */
            __getRightAlignWidth: function(index, size, currentSize, contentSize, threshold) {
                var newSize = {};
                var result = {};
                if (currentSize.width > contentSize.width - threshold) {
                    result = this.__getNewWidthByRight(currentSize, index, threshold);
                    newSize.width = result.width;
                    // 发生了变化， 需要更新数据
                    currentSize = this.inputNode.getBoundingClientRect();
                } else {
                    newSize.width = size.width;
                }
                if (currentSize.height > contentSize.height) {
                    newSize.height = this.__getHeight(currentSize.height, index.row);
                } else {
                    newSize.height = size.height;
                }
                return {
                    start: result.start,
                    size: newSize
                };
            },
            /**
         * 居中对齐：向两端扩展
         * @private
         */
            __getCenterAlignWidth: function(index, size, currentSize, contentSize, threshold) {
                var newSize = {};
                var result = {};
                if (currentSize.width > contentSize.width - threshold) {
                    result = this.__getNewWidthByCenter(currentSize, index, threshold);
                    newSize.width = result.width;
                    // 发生了变化， 需要更新数据
                    currentSize = this.inputNode.getBoundingClientRect();
                } else {
                    result.start = index.col;
                    newSize.width = size.width;
                }
                if (currentSize.height > contentSize.height) {
                    newSize.height = this.__getHeight(currentSize.height, index.row);
                } else {
                    newSize.height = size.height;
                }
                return {
                    start: result.start,
                    size: newSize
                };
            },
            __getWidth: function(size, index) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var colPoints = grid.col;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var maxSize = this.getContentSize();
                var col = index.col;
                var width = size.width + colPoints[col];
                var result = 0;
                var threshold = THRESHOLD + this.padding * 2;
                var max = maxSize.width - colPoints[index.col] - offset - borderWidth;
                col += 1;
                if (width > maxSize.width - threshold) {
                    result = max;
                } else {
                    while (width > colPoints[col] - offset - threshold) {
                        col++;
                        if (col >= visibleCount.col) {
                            break;
                        }
                    }
                    result = Math.min(colPoints[col] - offset, maxSize.width - borderWidth) - colPoints[index.col] - offset;
                }
                if (result === max) {
                    this.inputNode.style.width = max + "px";
                }
                return result;
            },
            /**
         * 获取右对齐情况下的新宽度
         * @private
         */
            __getNewWidthByRight: function(size, index, threshold) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var colWidth = grid.width;
                var minWidth = size.width + threshold;
                var borderWidth = struct.getBorderWidth();
                var width = 0;
                var overflow = false;
                for (var i = index.col; i >= 0; i--) {
                    width += colWidth[i];
                    if (width >= minWidth) {
                        break;
                    }
                    if (i === 0) {
                        overflow = true;
                        break;
                    }
                    width += borderWidth;
                }
                if (overflow) {
                    this.inputNode.style.width = width + "px";
                }
                return {
                    start: i,
                    width: width
                };
            },
            __getNewWidthByCenter: function(size, index, threshold) {
                var col = index.col;
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount().col;
                var colWidth = grid.width;
                var colPoint = grid.col;
                var minWidth = size.width + threshold;
                var borderWidth = struct.getBorderWidth();
                var boundary = struct.getBoundary();
                colWidth = [].concat(colWidth);
                var width = colWidth[col];
                var overflow = false;
                // 最后可显示的列的可见宽度
                var lastWidth = colWidth[visibleCount - 1] - (colPoint[visibleCount] - boundary.width);
                // 更新最后一列的宽度为可显示宽度
                colWidth[visibleCount - 1] = lastWidth;
                if (col !== 0) {
                    width += borderWidth + colWidth[col - 1];
                }
                if (col + 1 <= visibleCount) {
                    width += borderWidth + colWidth[col + 1];
                }
                if (width >= minWidth) {
                    return {
                        start: col < 1 ? 0 : col - 1,
                        width: width
                    };
                }
                var leftIndex = 0;
                var rightIndex = 0;
                var currentLeftIndex;
                var currentRightIndex;
                width = colWidth[col];
                while (width < minWidth) {
                    leftIndex += 1;
                    rightIndex += 1;
                    currentLeftIndex = col - leftIndex;
                    currentRightIndex = col + rightIndex;
                    if (currentLeftIndex < 0 && currentRightIndex >= visibleCount) {
                        overflow = true;
                        break;
                    }
                    if (currentLeftIndex >= 0) {
                        width += colWidth[currentLeftIndex] + borderWidth;
                    } else {
                        leftIndex -= 1;
                    }
                    if (currentRightIndex < visibleCount) {
                        width += colWidth[currentRightIndex] + borderWidth;
                    }
                }
                if (overflow) {
                    this.inputNode.style.width = width + "px";
                }
                return {
                    start: col - leftIndex < 0 ? 0 : col - leftIndex,
                    width: width
                };
            },
            /**
         * 溢出的情况下计算高度
         * @private
         */
            __getHeight: function(height, row) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var rowPoints = grid.row;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var maxSize = this.getContentSize();
                var threshold = this.padding * 2;
                var originalRow = row;
                height += rowPoints[row];
                if (height > maxSize.height) {
                    return maxSize.height;
                }
                row += 1;
                while (height > rowPoints[row] - threshold) {
                    row++;
                    if (row >= visibleCount.row) {
                        break;
                    }
                }
                return Math.min(rowPoints[row] - offset, maxSize.height - borderWidth) - rowPoints[originalRow] - offset;
            }
        });
    }
};

//src/system/input/input.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[124] = {
    value: function(require) {
        var $ = _p.r(2);
        var KEY_CODE = _p.r(119);
        var InputShadowMan = _p.r(123);
        var TextHelper = _p.r(125);
        var BORDER_WIDTH = 2;
        var PADDING = 2;
        var Input = _p.r(0).create("Input", {
            cover: null,
            textHelper: null,
            shadowMan: null,
            inputNode: null,
            $inputNode: null,
            inputWrapper: null,
            $inputWrapper: null,
            workState: true,
            shadowWrapper: null,
            $shadowWrapper: null,
            label: null,
            $label: null,
            active: false,
            quick: true,
            contentchanged: false,
            writable: false,
            style: null,
            lockState: false,
            labelState: false,
            inputLockState: false,
            index: {},
            inputSize: {
                width: 0,
                height: 0
            },
            base: _p.r(87),
            init: function(cover) {
                this.cover = cover;
                this.borderWidth = this.rs("c.struct").getBorderWidth();
                this.shadowMan = this.createComponent(InputShadowMan);
                this.shadowMan.setPadding(PADDING);
                this.shadowMan.setBorderWidth(BORDER_WIDTH);
                this.inputWrapper = this.createWrapper();
                this.$inputWrapper = $(this.inputWrapper);
                this.shadowWrapper = this.inputWrapper.cloneNode(false);
                this.$shadowWrapper = $(this.shadowWrapper);
                this.$shadowWrapper.addClass("btb-shadow-wrapper");
                this.inputNode = this.createInput();
                this.$inputNode = $(this.inputNode);
                this.label = this.createLabel();
                this.$label = $(this.label);
                this.textHelper = this.createComponent(TextHelper);
                this.initMessageHook();
                this.initEvent();
                this.initService();
            },
            run: function() {
                this.textHelper.bind(this.inputNode);
                this.inputWrapper.appendChild(this.inputNode);
                this.inputWrapper.appendChild(this.label);
                this.getContentContainer().appendChild(this.inputWrapper);
                this.getContentContainer().appendChild(this.shadowWrapper);
                this.shadowMan.appendTo(this.inputWrapper);
            },
            initEvent: function() {
                var _self = this;
                this.cover.onmousedown(this, this.onmousedown);
                this.cover.ondblclick(this, this.ondblclick);
                this.$inputNode.on("blur", function() {
                    if (!_self.workState || _self.inputLockState) {
                        return;
                    }
                    _self.flush();
                    _self.disable();
                }).on("input", function() {
                    if (_self.isFormulaModel()) {
                        _self.exitInput();
                        _self.offline();
                        _self.postMessage("s.formula.model.open");
                    } else {
                        _self.toggleToInput();
                        _self.inputResize();
                        _self.contentchanged = true;
                        _self.postMessage("s.input.contentchange", _self.inputNode.innerHTML);
                    }
                }).on("keydown", function(evt) {
                    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 65) {
                        _self.selectAll(evt);
                        return;
                    }
                    switch (evt.keyCode) {
                      case KEY_CODE.ENTER:
                        _self.__keyEnter(evt);
                        break;

                      case KEY_CODE.LEFT:
                        _self.__keyLeft(evt);
                        break;

                      case KEY_CODE.RIGHT:
                        _self.__keyRight(evt);
                        break;

                      case KEY_CODE.UP:
                        _self.__keyUp(evt);
                        break;

                      case KEY_CODE.DOWN:
                        _self.__keyDown(evt);
                        break;

                      case KEY_CODE.TAB:
                        _self.__keyTab(evt);
                        break;

                      case KEY_CODE.ESC:
                        _self.__keyEsc(evt);
                        break;

                      case KEY_CODE.DELETE:
                      case KEY_CODE.BACKSPACE:
                        _self.__keyDelete(evt);
                        break;
                    }
                }).on("mousedown contextmenu", function(evt) {
                    if (_self.workState && _self.active) {
                        evt.stopPropagation();
                    }
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.range.change": this.change,
                    "c.refresh": this.change,
                    "c.range.disabled": this.rangeFailed,
                    "s.formula.model.close": this.online,
                    "s.formula.blur": this.disable,
                    "s.toinput": this.tryToInputModel
                });
            },
            initService: function() {
                this.registerService({
                    "s.input.lock": this.lockInput,
                    "s.input.unlock": this.unlockInput,
                    "s.input.focus": this.focusEnd,
                    "s.input.open": this.openInput,
                    "s.input.close": this.closeInput,
                    "s.input.sync": this.syncInput
                });
            },
            onmousedown: function(row, col) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                this.flush();
                this.toggleToUninput();
                this.rs("c.range.focus", viewStart.row + row, viewStart.col + col);
            },
            lock: function() {
                this.lockState = true;
            },
            unlock: function() {
                this.lockState = false;
            },
            isLock: function() {
                return this.lockState;
            },
            isFormulaModel: function() {
                return this.inputNode.innerText.indexOf("=") === 0;
            },
            lockInput: function() {
                this.inputLockState = true;
            },
            unlockInput: function() {
                this.inputLockState = false;
            },
            change: function() {
                if (!this.workState) {
                    return;
                }
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var focus = range.getFocus();
                var row = focus.row;
                var col = focus.col;
                this.resetShadowWrapper(row, col);
                if (this.active) {
                    this.showLabel(row, col);
                    return;
                }
                this.hideLabel();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                if (row > viewEnd.row || row < viewStart.row || col > viewEnd.col || col < viewStart.col) {
                    this.hide();
                    return;
                }
                this.toggleToUninput();
                this.reset();
                this.index.row = row;
                this.index.col = col;
                var style = struct.getComputedStyle(focus.row, focus.col);
                var grid = struct.getGrid();
                this.resetStyle(style);
                this.relocation(row, col);
                this.resize(struct.getBorderWidth(), grid.width[col], grid.height[row]);
                this.enable();
                this.focus();
            },
            ondblclick: function() {
                var struct = this.rs("c.struct");
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var value = struct.getRawValue(focus.row, focus.col);
                if (!value) {
                    value = "";
                }
                this.dblclick(value);
            },
            dblclick: function(value, isChanged) {
                if (value && value.indexOf("=") === 0) {
                    this.exitInput();
                    this.offline();
                    this.postMessage("s.formula.model.open");
                    return;
                }
                this.quick = false;
                this.toggleToInput();
                if (value !== null) {
                    this.inputNode.innerHTML = value;
                    this.inputResize();
                    this.textHelper.focus();
                    this.contentchanged = isChanged;
                }
            },
            openInput: function(value) {
                this.quick = false;
                this.toggleToInput(false);
                if (value !== null) {
                    this.inputNode.innerHTML = value;
                    this.inputResize();
                    this.contentchanged = true;
                }
            },
            closeInput: function() {
                this.toggleToUninput();
                this.flush();
            },
            syncInput: function(content) {
                this.inputNode.innerHTML = content || "";
                this.inputResize();
                this.contentchanged = true;
            },
            toggleToInput: function(autoFocus) {
                if (this.active) {
                    return;
                }
                var commands = this.checkFocusInvisible();
                if (commands) {
                    this.lock();
                    this.execCommand(commands);
                    this.unlock();
                }
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var style = struct.getComputedStyle(focus.row, focus.col);
                this.relocation(focus.row, focus.col);
                this.active = true;
                this.$inputWrapper.addClass("btb-input-active");
                this.inputWrapper.style.backgroundColor = style.backgroundColor;
                if (autoFocus !== false) {
                    this.focus();
                }
                this.postMessage("s.input.statechange", true);
            },
            toggleToUninput: function() {
                if (!this.active) {
                    return;
                }
                this.active = false;
                this.quick = true;
                this.$inputWrapper.removeClass("btb-input-active");
                this.inputWrapper.style.backgroundColor = "";
                this.postMessage("s.input.statechange", false);
            },
            isActive: function() {
                return this.active;
            },
            checkFocusInvisible: function() {
                var range = this.rs("c.range");
                var focus = range.getFocus();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var commands = [];
                // 如果输入框不在视野内， 请求执行滚动
                if (focus.row < viewStart.row) {
                    commands.push({
                        command: "scrollrowto",
                        args: [ focus.row ]
                    });
                } else if (focus.row >= viewEnd.row) {
                    commands.push({
                        command: "scrollrowto",
                        args: [ focus.row, true ]
                    });
                }
                if (focus.col < viewStart.col) {
                    commands.push({
                        command: "scrollcolumnto",
                        args: [ focus.col ]
                    });
                } else if (focus.col >= viewEnd.col) {
                    commands.push({
                        command: "scrollcolumnto",
                        args: [ focus.col, true ]
                    });
                }
                return commands.length ? commands : null;
            },
            showLabel: function(row, col) {
                if (this.labelState) {
                    return;
                }
                this.labelState = true;
                this.$label.text(this.cs("c.title.index2char", col) + "" + (row + 1)).show();
            },
            hideLabel: function() {
                if (!this.labelState) {
                    return;
                }
                this.labelState = false;
                this.$label.hide();
            },
            resetStyle: function(style) {
                this.style = style;
                this.inputNode.style.cssText = "";
                this.$inputNode.css(style);
                this.shadowMan.resetStyle(style);
            },
            offline: function() {
                this.workState = false;
            },
            online: function() {
                this.inputNode.innerHTML = "";
                this.workState = true;
            },
            reset: function() {
                this.active = false;
                this.quick = true, this.contentchanged = false;
                this.writable = false;
                this.index = {};
                this.inputSize = {
                    width: 0,
                    height: 0
                };
                this.style = null;
            },
            flush: function() {
                if (!this.contentchanged) {
                    this.clear();
                    return;
                }
                var content = this.getContent();
                var index = this.index;
                this.clear();
                this.contentchanged = false;
                this.execCommand("write", content, index.row, index.col);
            },
            getContent: function() {
                return this.inputNode.innerHTML;
            },
            clear: function() {
                this.inputNode.innerHTML = "";
            },
            /**
         * 非编辑状态下的输入框定位
         * @param row
         * @param col
         */
            relocation: function(row, col) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var grid = struct.getGrid();
                var offset = struct.getOffset();
                this.$inputWrapper.css({
                    top: grid.row[row - viewStart.row] - offset,
                    left: grid.col[col - viewStart.col] - offset
                });
            },
            /**
         * 该方法专用于编辑状态下的输入框定位
         */
            updateLocation: function(index) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var offset = struct.getOffset();
                this.$inputWrapper.css({
                    left: grid.col[index] - offset
                });
            },
            resize: function(borderWidth, width, height) {
                var diff = 2 * (BORDER_WIDTH - borderWidth);
                // 记录输入框所占用空间大小
                this.inputSize.width = width;
                this.inputSize.height = height;
                this.$inputWrapper.css({
                    width: width - diff,
                    height: height - diff
                });
                this.$inputNode.css({
                    width: width - diff - PADDING * 2,
                    height: height - diff - PADDING * 2
                });
            },
            inesert: function(html) {
                this.textHelper.insert(html);
                this.$inputNode.trigger("input");
            },
            resetShadowWrapper: function(row, col) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var grid = struct.getGrid();
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var diff = 2 * (BORDER_WIDTH - borderWidth);
                if (row < viewStart.row || row > viewEnd.row || col < viewStart.col || col > viewEnd.col) {
                    this.$shadowWrapper.hide();
                    return;
                }
                this.$shadowWrapper.css({
                    display: "block",
                    top: grid.row[row - viewStart.row] - offset,
                    left: grid.col[col - viewStart.col] - offset,
                    width: grid.width[col] - diff,
                    height: grid.height[row] - diff
                });
            },
            exitInput: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var range = this.rs("c.range");
                var focus = range.getFocus();
                this.toggleToUninput();
                this.clear();
                this.resize(struct.getBorderWidth(), grid.width[focus.col], grid.height[focus.row]);
            },
            inputResize: function() {
                var content = this.getContent();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var index = {
                    row: this.index.row - viewStart.row,
                    col: this.index.col - viewStart.col
                };
                var size = this.shadowMan.getSize(content, this.style.textAlign, this.inputSize, index);
                if (!size) {
                    return;
                }
                index = size.start;
                size = size.size;
                this.resize(this.borderWidth, size.width, size.height);
                this.updateLocation(index, size.width);
            },
            tryToInputModel: function(initContent) {
                if (!this.workState) {
                    return;
                }
                this.dblclick(initContent, !!initContent);
            },
            selectAll: function(evt) {
                if (!this.workState) {
                    return;
                }
                if (this.active) {
                    return;
                }
                evt.stopPropagation();
                evt.preventDefault();
                var struct = this.rs("c.struct");
                var total = struct.getTotal();
                this.rs("c.range.selection", {
                    row: 0,
                    col: 0
                }, {
                    row: total.row - 1,
                    col: total.col - 1
                });
            },
            focus: function() {
                this.inputNode.focus();
            },
            focusEnd: function() {
                this.textHelper.focus();
            },
            enable: function() {
                this.$inputWrapper.show();
                this.writable = true;
            },
            disable: function() {
                this.rs("c.range.disable");
            },
            hide: function() {
                this.$inputWrapper.css({
                    top: -1e4,
                    left: -1e5
                });
            },
            rangeFailed: function() {
                this.$inputWrapper.hide();
                this.$shadowWrapper.hide();
                this.toggleToUninput();
                this.reset();
            },
            createWrapper: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-input-wrapper " + (this.writable ? "btb-input-writable" : "")
                    },
                    style: {
                        "border-width": BORDER_WIDTH + "px"
                    }
                });
            },
            createInput: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-input",
                        contenteditable: true,
                        spellcheck: false
                    },
                    style: {
                        borderWidth: BORDER_WIDTH + "px",
                        top: PADDING,
                        left: PADDING
                    }
                });
            },
            createLabel: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-input-label"
                    },
                    style: {
                        left: -BORDER_WIDTH
                    }
                });
            },
            __keyEnter: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                if (evt.metaKey || evt.altKey) {
                    // 成功换行主动更新一下输入框大小
                    if (this.textHelper.newline()) {
                        this.inputResize();
                        this.contentchanged = true;
                    }
                    return;
                }
                if (!this.active) {
                    this.ondblclick();
                    return;
                }
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("movedown", 1);
                } else {
                    this.execCommand("moveup", 1);
                }
            },
            isNormalEditMode: function() {
                return this.active && !this.quick;
            },
            __keyDown: function(evt) {
                // 正常编辑模式，交由平台处理
                if (this.isNormalEditMode()) {
                    return;
                }
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("movedown", 1);
                } else {
                    this.execCommand("expanddown", 1);
                }
            },
            __keyUp: function(evt) {
                if (this.isNormalEditMode()) {
                    return;
                }
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("moveup", 1);
                } else {
                    this.execCommand("expandup", 1);
                }
            },
            __keyLeft: function(evt) {
                if (this.isNormalEditMode()) {
                    return;
                }
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("moveleft", 1);
                } else {
                    this.execCommand("expandleft", 1);
                }
            },
            __keyRight: function(evt) {
                if (this.isNormalEditMode()) {
                    return;
                }
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("moveright", 1);
                } else {
                    this.execCommand("expandright", 1);
                }
            },
            __keyTab: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleToUninput();
                this.flush();
                if (!evt.shiftKey) {
                    this.execCommand("moveright", 1);
                } else {
                    this.execCommand("moveleft", 1);
                }
            },
            __keyEsc: function(evt) {
                evt.preventDefault();
                if (!this.active) {
                    return;
                }
                evt.stopPropagation();
                this.exitInput();
            },
            __keyDelete: function(evt) {
                if (this.active) {
                    return;
                }
                evt.preventDefault();
                evt.stopPropagation();
                this.execCommand("clearcontent");
            }
        });
        Input.deps = [ "cover" ];
        return Input;
    }
};

//src/system/input/text-helper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[125] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("TextHelper", {
            inputNode: null,
            doc: null,
            tmpNode: null,
            placeholder: null,
            base: _p.r(87),
            init: function() {
                this.doc = this.getDocument();
                var tmpNode = this.createElement("div");
                tmpNode.innerHTML = "&#xFEFF;";
                this.tmpNode = tmpNode;
                this.placeholder = tmpNode.firstChild;
            },
            bind: function(inputNode) {
                this.inputNode = inputNode;
            },
            newline: function() {
                var selection = this.doc.getSelection();
                if (selection.rangeCount === 0) {
                    return false;
                }
                var range = selection.getRangeAt(0);
                range = range.cloneRange();
                var splitNode = this.createElement("br");
                var placeholderNode = this.placeholder.cloneNode(false);
                range.surroundContents(splitNode);
                $(placeholderNode).insertAfter(splitNode);
                range.selectNode(placeholderNode);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                return true;
            },
            focus: function() {
                var selection = this.doc.getSelection();
                var range = selection.getRangeAt(0);
                range = range.cloneRange();
                range.setEnd(this.inputNode, this.inputNode.childNodes.length);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            },
            insert: function(html) {
                var selection = this.doc.getSelection();
                if (selection.rangeCount === 0) {
                    return false;
                }
                this.tmpNode.innerHTML = html;
                var fragment = this.getDocument().createDocumentFragment();
                var range = selection.getRangeAt(0);
                var childs = this.tmpNode.childNodes;
                range = range.cloneRange();
                range.deleteContents();
                while (childs.length) {
                    fragment.appendChild(childs[0]);
                }
                range.insertNode(fragment);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    }
};

//src/system/position.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[126] = {
    value: function(require) {
        return _p.r(0).create("Position", {
            reference: null,
            base: _p.r(87),
            init: function() {
                this.reference = this.getContentContainer();
            },
            toIndex: function(x, y) {
                var location = this.getLocation();
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var count = struct.getVisibleCount();
                var colPoint = grid.col;
                var rowPoint = grid.row;
                var index = {
                    row: -1,
                    col: -1
                };
                var finded = false;
                x -= location.left;
                y -= location.top;
                for (var i = 1, len = count.row; i <= len; i++) {
                    if (y < rowPoint[i]) {
                        index.row = i - 1;
                        finded = true;
                        break;
                    }
                }
                if (!finded) {
                    index.row = count.row - 1;
                }
                finded = false;
                for (var i = 1, len = count.col; i <= len; i++) {
                    if (x < colPoint[i]) {
                        index.col = i - 1;
                        finded = true;
                        break;
                    }
                }
                if (!finded) {
                    index.col = count.col - 1;
                }
                return index;
            },
            getLocation: function() {
                return this.reference.getBoundingClientRect();
            }
        });
    }
};

//src/system/resize/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[127] = {
    value: function(require) {
        var $ = _p.r(2);
        // 单元格最小size
        var MIN_SPACE = 5;
        var BUTTON_SIZE = 5;
        // TODO 所有按钮的位置更新可以做延迟优化
        return _p.r(0).create("Resize", {
            base: _p.r(87),
            wrapper: null,
            templateColumnNode: null,
            templateRowNode: null,
            colBtns: [],
            rowBtns: [],
            rowState: false,
            columnState: false,
            init: function() {
                this.wrapper = this.createElement("div", "btb-resize-wrap");
                this.initTemplateNode();
                this.initEvent();
                this.initMessageHook();
            },
            run: function() {
                this.getMainContainer().appendChild(this.wrapper);
            },
            initTemplateNode: function() {
                var headConfig = this.getConfig("head");
                var borderWidth = this.rs("c.struct").getBorderWidth();
                this.templateColumnNode = this.createElement("div", {
                    attr: {
                        "class": "btb-resize-btn btb-resize-column-btn"
                    },
                    style: {
                        height: headConfig.height + borderWidth
                    },
                    inner: '<div class="btb-resize-line btb-resize-column-line"></div>'
                });
                this.templateRowNode = this.createElement("div", {
                    attr: {
                        "class": "btb-resize-btn btb-resize-row-btn"
                    },
                    style: {
                        width: headConfig.width + borderWidth
                    },
                    inner: '<div class="btb-resize-line btb-resize-row-line"></div>'
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.reset
                });
            },
            initEvent: function() {
                var _self = this;
                $(this.wrapper).delegate(".btb-resize-column-btn", "mousedown", function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    _self.startResizeColumn(this, evt.clientX, evt.clientY);
                }).delegate(".btb-resize-row-btn", "mousedown", function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    _self.startResizeRow(this, evt.clientX, evt.clientY);
                });
                $(this.getTopContainer()).on("mouseenter", function() {
                    _self.updateColResizeBtn();
                });
                $(this.getLeftContainer()).on("mouseenter", function() {
                    _self.updateRowResizeBtn();
                });
            },
            reset: function() {
                this.columnState = false;
                this.rowState = false;
            },
            startResizeColumn: function(btnNode, x, y) {
                var _self = this;
                var $btnNode = $(btnNode);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewStart = struct.getViewStart();
                var colPoints = grid.col;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var index = +btnNode.getAttribute("data-index");
                var max = struct.getSpace().width - BUTTON_SIZE - borderWidth;
                var min = colPoints[index] + offset + MIN_SPACE - 3;
                var headOffset = this.getConfig("head").width;
                var original = colPoints[index + 1] - offset - 2;
                // 最终单元格的位置
                var left;
                $btnNode.addClass("btb-resizing");
                $(this.getDocument()).on("mousemove.resize", function(evt) {
                    var distance = evt.clientX - x;
                    left = original + distance;
                    left = Math.min(left, max);
                    left = Math.max(left, min);
                    $btnNode.css("left", headOffset + left);
                }).one("mouseup.resize", function() {
                    $btnNode.removeClass("btb-resizing");
                    $(this).off("mousemove.resize");
                    _self.execCommand("resizecol", Math.abs(left - (colPoints[index] - offset - 2)), index + viewStart.col);
                });
            },
            startResizeRow: function(btnNode, x, y) {
                var _self = this;
                var $btnNode = $(btnNode);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewStart = struct.getViewStart();
                var rowPoints = grid.row;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var index = +btnNode.getAttribute("data-index");
                var max = struct.getSpace().height - BUTTON_SIZE - borderWidth;
                var min = rowPoints[index] + offset + MIN_SPACE - 3;
                var headOffset = this.getConfig("head").height;
                var original = rowPoints[index + 1] - offset - 2;
                // 最终单元格的位置
                var top;
                $btnNode.addClass("btb-resizing");
                $(this.getDocument()).on("mousemove.resize", function(evt) {
                    var distance = evt.clientY - y;
                    top = original + distance;
                    top = Math.min(top, max);
                    top = Math.max(top, min);
                    $btnNode.css("top", headOffset + top);
                }).one("mouseup.resize", function() {
                    $btnNode.removeClass("btb-resizing");
                    $(this).off("mousemove.resize");
                    _self.execCommand("resizerow", Math.abs(top - (rowPoints[index] - offset - 2)), index + viewStart.row);
                });
            },
            updateColResizeBtn: function() {
                if (this.columnState) {
                    return;
                }
                this.columnState = true;
                var headConfig = this.getConfig("head");
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var offset = struct.getOffset();
                var colPoints = grid.col;
                var btns = this.getColBtns(visibleCount.col);
                for (var i = 1, len = visibleCount.col; i < len; i++) {
                    btns[i - 1].style.left = headConfig.width + colPoints[i] - 2 - offset + "px";
                }
            },
            getColBtns: function(count) {
                var btns = this.colBtns;
                var wrapper = this.wrapper;
                if (btns.length < count) {
                    for (var i = 0, len = count - btns.length; i < len; i++) {
                        btns.push(this.templateColumnNode.cloneNode(true));
                        btns[i].setAttribute("data-index", i);
                        wrapper.appendChild(btns[i]);
                    }
                } else {
                    for (var i = count, len = btns.length; i < len; i++) {
                        btns[i].style.display = "none";
                    }
                }
                return btns;
            },
            updateRowResizeBtn: function() {
                if (this.rowState) {
                    return;
                }
                this.rowState = true;
                var headConfig = this.getConfig("head");
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var offset = struct.getOffset();
                var rowPoints = grid.row;
                var btns = this.getRowBtns(visibleCount.row);
                for (var i = 1, len = visibleCount.row; i < len; i++) {
                    btns[i - 1].style.top = headConfig.height + rowPoints[i] - 2 - offset + "px";
                }
            },
            getRowBtns: function(count) {
                var btns = this.rowBtns;
                var wrapper = this.wrapper;
                if (btns.length < count) {
                    for (var i = 0, len = count - btns.length; i < len; i++) {
                        btns.push(this.templateRowNode.cloneNode(true));
                        btns[i].setAttribute("data-index", i);
                        wrapper.appendChild(btns[i]);
                    }
                } else {
                    for (var i = count, len = btns.length; i < len; i++) {
                        btns[i].style.display = "none";
                    }
                }
                return btns;
            }
        });
    }
};

//src/system/row-column.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[128] = {
    value: function(require) {
        var $ = _p.r(2);
        var RowColumnSelector = _p.r(0).create("RowColumnSelector", {
            position: null,
            base: _p.r(87),
            init: function(position) {
                this.position = position;
                var _self = this;
                $(this.getTopContainer()).on("click", function(e) {
                    _self.selectColumn(e.clientX);
                });
                $(this.getLeftContainer()).on("click", function(e) {
                    _self.selectRow(e.clientY);
                });
            },
            selectColumn: function(x) {
                var index = this.position.toIndex(x, 0);
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var total = struct.getTotal();
                this.rs("c.range.set", {
                    row: 0,
                    col: index.col + viewStart.col
                }, {
                    row: 0,
                    col: index.col + viewStart.col
                }, {
                    row: total.row - 1,
                    col: index.col + viewStart.col
                });
            },
            selectRow: function(y) {
                var index = this.position.toIndex(0, y);
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var total = struct.getTotal();
                this.rs("c.range.set", {
                    row: index.row + viewStart.row,
                    col: 0
                }, {
                    row: index.row + viewStart.row,
                    col: 0
                }, {
                    row: index.row + viewStart.row,
                    col: total.col - 1
                });
            }
        });
        RowColumnSelector.deps = [ "position" ];
        return RowColumnSelector;
    }
};

//src/system/screen/body/body-screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[129] = {
    value: function(require) {
        var Canvas = _p.r(136);
        var ContentPainter = _p.r(133);
        var SYS_CONFIG = _p.r(33);
        return _p.r(0).create("BodyScreen", {
            panel: null,
            width: 0,
            height: 0,
            canvas: null,
            contentPainter: null,
            base: _p.r(84),
            init: function() {
                this.panel = this.createElement("div", "btb-body-screen");
                this.canvas = new Canvas(this.getDocument(), this.width, this.height);
                this.canvas.appendTo(this.panel);
                this.contentPainter = new ContentPainter(this.getDocument(), this.getContentSize());
            },
            appendTo: function(contianer) {
                contianer.appendChild(this.panel);
            },
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                this.canvas.resize(width, height, this.getConfig("ZOOM"));
                this.contentPainter.resize(width, height, this.getConfig("ZOOM"));
            },
            clear: function() {
                this.canvas.clear();
            },
            render: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var count = struct.getVisibleCount();
                var viewStart = struct.getViewStart();
                var rowPoints = grid.row;
                var colPoints = grid.col;
                var colWidth = grid.width;
                var rowHeight = grid.height;
                var offset = struct.getOffset();
                var canvas = this.canvas;
                var painter = this.contentPainter;
                var rowOffset = viewStart.row;
                var colOffset = viewStart.col;
                var defaultBgColor = struct.getDefaultStyle().backgroundColor;
                var currentRow = -1;
                var currentCol = -1;
                var contents = [];
                var widths = [];
                var heights = [];
                var points = [];
                var styles = [];
                var userStyles = [];
                var rowContent;
                for (var i = 0, len = count.row; i < len; i++) {
                    contents[i] = [];
                    points[i] = [];
                    userStyles[i] = [];
                    currentRow = rowOffset + i;
                    heights[i] = rowHeight[currentRow];
                    for (var j = 0, jlen = count.col; j < jlen; j++) {
                        currentCol = colOffset + j;
                        contents[i][j] = struct.getDisplayValue(currentRow, currentCol, false);
                        widths[j] = colWidth[currentCol];
                        points[i][j] = {
                            x: colPoints[j] + offset,
                            y: rowPoints[i] + offset
                        };
                        userStyles[i][j] = struct.getUserStyle(currentRow, currentCol);
                    }
                }
                for (var i = 0, len = count.row; i < len; i++) {
                    currentRow = rowOffset + i;
                    rowContent = contents[i];
                    styles[i] = [];
                    for (var j = 0, jlen = count.col; j < jlen; j++) {
                        if (!rowContent[j]) {
                            continue;
                        }
                        styles[i][j] = struct.getComputedStyle(currentRow, colOffset + j);
                    }
                }
                var viewImage = painter.getViewImage(userStyles, contents, widths, heights, points, styles, defaultBgColor);
                canvas.drawImage(viewImage, 0, 0, viewImage.width, viewImage.height, 0, 0, this.width, this.height);
                this.__drawBoxBorder(struct, offset);
            },
            __drawBoxBorder: function(struct, offset) {
                var canvas = this.canvas;
                var space = struct.getSpace();
                var boundray = struct.getBoundary();
                var borderWidth = SYS_CONFIG.border.width;
                canvas.strokeStyle(SYS_CONFIG.border.color);
                canvas.lineWidth(SYS_CONFIG.border.width);
                canvas.strokeRect(offset, offset, boundray.width - borderWidth, boundray.height - borderWidth);
                canvas.beginPath();
                // space bottom border
                canvas.moveTo(offset, space.height - offset);
                canvas.lineTo(space.width, space.height - offset);
                // space right brder
                canvas.moveTo(space.width - offset, offset);
                canvas.lineTo(space.width - offset, space.height);
                canvas.closePath();
                canvas.stroke();
            }
        });
    }
};

//src/system/screen/body/cell-fill.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[130] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(33);
        var BORDER_WIDTH = SYS_CONFIG.border.width;
        var TWO_BORDER_WIDTH = 2 * BORDER_WIDTH;
        return {
            draw: function(context, layout, userStyles, contents, widths, heights, points, styles, defaultBgColor) {
                var columnCount = widths.length;
                var rowStyles;
                var rowPoints;
                var fillColor;
                for (var i = 0, len = heights.length; i < len; i++) {
                    rowStyles = userStyles[i];
                    rowPoints = points[i];
                    for (var j = 0, jlen = columnCount; j < jlen; j++) {
                        fillColor = rowStyles[j].backgroundColor;
                        if (fillColor) {
                            fill(context, rowPoints[j], fillColor, widths[j], heights[i]);
                        }
                    }
                }
            }
        };
        function fill(context, points, fillColor, width, height) {
            context.fillStyle = fillColor;
            context.fillRect(points.x - BORDER_WIDTH, points.y - BORDER_WIDTH, width + TWO_BORDER_WIDTH, height + TWO_BORDER_WIDTH);
        }
    }
};

//src/system/screen/body/content-fill.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[131] = {
    value: function(require) {
        var LOCAL_COFNIG = _p.r(32);
        // 默认fill颜色
        var DEFAULT_FILL_COLOR = LOCAL_COFNIG.style.backgroundColor;
        return {
            draw: function(context, textLayout, heights) {
                context.save();
                // context init
                context.fillStyle = DEFAULT_FILL_COLOR;
                context.globalCompositeOperation = "destination-over";
                var rowTextLayouts;
                var currentTextLayout;
                var layout;
                var height;
                for (var i = 0, len = textLayout.length; i < len; i++) {
                    rowTextLayouts = textLayout[i];
                    height = heights[i];
                    for (var j = 0, jlen = rowTextLayouts.length; j < jlen; j++) {
                        currentTextLayout = rowTextLayouts[j];
                        if (!currentTextLayout) {
                            continue;
                        }
                        layout = currentTextLayout.layout;
                        switch (layout.type) {
                          case "left":
                            drawLeft(context, layout, currentTextLayout.width + 4, height);
                            break;

                          case "right":
                            drawRight(context, layout, currentTextLayout.width + 4, height);
                            break;

                          case "center":
                            drawCenter(context, layout, currentTextLayout.width + 4, height);
                            break;
                        }
                    }
                }
                context.restore();
            }
        };
        function drawLeft(context, layout, width, height) {
            context.fillRect(layout.x, layout.y, Math.min(layout.width, width), height);
        }
        function drawRight(context, layout, width, height) {
            width = Math.min(layout.width, width);
            var x = layout.x + (layout.width - width);
            context.fillRect(x, layout.y, width, height);
        }
        function drawCenter(context, layout, width, height) {
            var halfTextWidth = width / 2;
            var halfCellWidth = layout.cellWidth / 2;
            var leftWidth = layout.leftWidth + halfCellWidth;
            var rightWidth = layout.rightWidth + halfCellWidth;
            // center point
            var x = layout.x + leftWidth;
            leftWidth = Math.min(leftWidth, halfTextWidth);
            rightWidth = Math.min(rightWidth, halfTextWidth);
            // draw point
            x -= leftWidth;
            // draw width
            width = leftWidth + rightWidth;
            context.fillRect(x, layout.y, width, height);
        }
    }
};

//src/system/screen/body/content-layout.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[132] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(33);
        //
        var BORDER_WIDTH = SYS_CONFIG.border.width;
        var tempNode = $(document.createElement("div"));
        function analyze(contents, widths, heights, points, styles) {
            var layout = [];
            var rowContents;
            var rowStyles;
            var rowPoints;
            var count;
            for (var i = 0, len = heights.length; i < len; i++) {
                layout[i] = {};
                rowContents = contents[i];
                rowStyles = styles[i];
                rowPoints = points[i];
                count = 0;
                for (var j = 0, jlen = widths.length; j < jlen; j++) {
                    if (!rowContents[j]) {
                        count++;
                        continue;
                    }
                    layout[i][j] = getCellInfo(count, j, rowContents, widths, rowPoints, rowStyles[j]);
                    count = 0;
                }
            }
            return layout;
        }
        function getCellInfo(count, columnIndex, contents, widths, points, style) {
            switch (style.textAlign) {
              case "left":
                return getLeftCellInfo(columnIndex, contents, widths, points, style);
                break;

              case "right":
                return getRightCellInfo(count, columnIndex, contents, widths, points, style);
                break;

              case "center":
                return getCenterCellInfo(count, columnIndex, contents, widths, points, style);
                break;
            }
        }
        /**
     * 获取左对齐单元格布局
     */
        function getLeftCellInfo(columnIndex, contents, widths, points, style) {
            var count = 0;
            for (var i = columnIndex + 1, len = contents.length; i < len; i++) {
                if (contents[i]) {
                    break;
                }
                count++;
            }
            var start = columnIndex;
            var end = columnIndex + count;
            var width = sum(widths.slice(start, end + 1));
            return {
                type: "left",
                start: start,
                end: end,
                width: width,
                style: style,
                content: contents[columnIndex],
                cellWidth: widths[columnIndex],
                x: points[start].x,
                y: points[start].y
            };
        }
        /**
     * 获取右对齐单元格布局
     */
        function getRightCellInfo(leftCount, columnIndex, contents, widths, points, style) {
            var start = columnIndex - leftCount;
            var end = columnIndex;
            var width = sum(widths.slice(start, end + 1));
            return {
                type: "right",
                start: start,
                end: end,
                width: width,
                style: style,
                content: contents[columnIndex],
                cellWidth: widths[columnIndex],
                x: points[start].x,
                y: points[start].y
            };
        }
        /**
     * 获取居中对齐单元格布局
     */
        function getCenterCellInfo(leftCount, columnIndex, contents, widths, points, style) {
            var count = 0;
            for (var i = columnIndex + 1, len = contents.length; i < len; i++) {
                if (contents[i]) {
                    break;
                }
                count++;
            }
            var start = columnIndex - leftCount;
            var end = columnIndex + count;
            var leftWidth = sum(widths.slice(start, columnIndex));
            var rightWidth = sum(widths.slice(columnIndex + 1, end + 1));
            if (leftWidth > 0) {
                leftWidth += BORDER_WIDTH;
            }
            if (rightWidth > 0) {
                rightWidth += BORDER_WIDTH;
            }
            var cellWidth = widths[columnIndex];
            var width = leftWidth + rightWidth + cellWidth;
            return {
                type: "center",
                start: start,
                end: end,
                width: width,
                style: style,
                content: contents[columnIndex],
                cellWidth: cellWidth,
                leftWidth: leftWidth,
                rightWidth: rightWidth,
                x: points[start].x,
                y: points[start].y
            };
        }
        function sum(values) {
            var sum = 0;
            if (values.length === 0) {
                return 0;
            }
            for (var i = 0, len = values.length; i < len; i++) {
                sum += values[i];
            }
            return sum + (values.length - 1) * BORDER_WIDTH;
        }
        function getCotnentSize(content, style) {
            tempNode.css(style).html(content);
            return tempNode.clientWidth;
        }
        return {
            analyze: analyze
        };
    }
};

//src/system/screen/body/content-painter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[133] = {
    value: function(require) {
        var SYS_CONF = _p.r(33);
        var ContentLayoutAnalyzer = _p.r(132);
        var ContentFillPainter = _p.r(131);
        var CellFillPainter = _p.r(130);
        var ContentPainter = _p.r(134);
        return _p.r(0).create("ContentPainter", {
            canvas: null,
            context: null,
            zoom: 0,
            svgContent: [],
            constructor: function(currentDocument, size) {
                this.canvas = currentDocument.createElement("canvas");
                this.canvas.width = size.width;
                this.canvas.height = size.height;
                this.context = this.canvas.getContext("2d");
            },
            resize: function(width, height, zoom) {
                this.zoom = zoom;
                this.canvas.width = width * zoom;
                this.canvas.height = height * zoom;
                this.context.scale(zoom, zoom);
            },
            getViewImage: function(userStyles, contents, widths, heights, points, styles, defaultBgColor) {
                var layout = ContentLayoutAnalyzer.analyze(contents, widths, heights, points, styles);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                CellFillPainter.draw(this.context, layout, userStyles, contents, widths, heights, points, styles, defaultBgColor);
                var textLayout = ContentPainter.draw(this.context, this.zoom, layout, contents, widths, heights, points, styles, defaultBgColor);
                ContentFillPainter.draw(this.context, textLayout, heights);
                return this.canvas;
            }
        });
    }
};

//src/system/screen/body/content.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[134] = {
    value: function(require) {
        var Printer = _p.r(135);
        var printer = new Printer();
        return {
            draw: function(context, zoom, layout, contents, widths, heights, points, styles) {
                var columnCount = widths.length;
                var textLayout = [];
                for (var i = 0, len = heights.length; i < len; i++) {
                    textLayout[i] = drawRow(context, zoom, layout[i], columnCount, heights[i], styles[i]);
                }
                return textLayout;
            }
        };
        function drawRow(context, zoom, layout, columnCount, rowHeight, styles) {
            var currentLayout;
            var viewImage;
            var textLayout = [];
            for (var i = 0, len = columnCount; i < len; i++) {
                currentLayout = layout[i];
                if (!currentLayout) {
                    continue;
                }
                printer.reset(zoom, styles[i], currentLayout.width - 4, rowHeight - 4);
                textLayout[i] = {
                    width: printer.print(currentLayout),
                    layout: currentLayout
                };
                viewImage = printer.getViewImage();
                context.drawImage(viewImage, 0, 0, viewImage.width, viewImage.height, currentLayout.x + 2, currentLayout.y + 2, currentLayout.width - 4, rowHeight - 4);
            }
            return textLayout;
        }
    }
};

//src/system/screen/body/printer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[135] = {
    value: function(require) {
        // TODO 计算offset和heights的代码可优化
        return _p.r(0).create("Printer", {
            canvas: null,
            context: null,
            style: null,
            constructor: function() {
                this.canvas = document.createElement("canvas");
                this.context = this.canvas.getContext("2d");
            },
            reset: function(zoom, style, width, height) {
                this.canvas.width = width * zoom;
                this.canvas.height = height * zoom;
                this.context.scale(zoom, zoom);
                this.width = width;
                this.height = height;
                this.style = style;
                this.__initStyle(style);
            },
            print: function(layout) {
                switch (layout.type) {
                  case "left":
                    return this.__printLeft(layout);

                  case "center":
                    return this.__printCenter(layout);

                  case "right":
                    return this.__printRight(layout);
                }
            },
            getViewImage: function() {
                return this.canvas;
            },
            __initStyle: function(style) {
                var context = this.context;
                var fontStyle = [ style.fontStyle, style.fontWeight, style.fontSize + "/" + style.lineHeight, style.fontFamily ];
                context.fillStyle = style.color;
                context.font = fontStyle.join(" ");
                context.textBaseline = "top";
                context.textAlign = style.textAlign;
            },
            __printLeft: function(layout) {
                var contents = layout.content.split(/\n/);
                var style = this.style;
                var offsets = [];
                var heights = [];
                var style = this.style;
                var offset = 0;
                var lineHeight = Math.floor(parseInt(style.fontSize) * style.lineHeight);
                for (var i = 0, len = contents.length; i < len; i++) {
                    offsets.push(offset);
                    heights.push(lineHeight);
                    offset += lineHeight;
                }
                switch (this.style.verticalAlign) {
                  case "bottom":
                    return this.__drawBottom(0, contents, heights, offsets);

                  case "middle":
                    return this.__drawMiddle(0, contents, heights, offsets);

                  case "top":
                    return this.__drawTop(0, contents, heights, offsets);
                }
            },
            __printCenter: function(layout) {
                var contents = layout.content.split(/\n/);
                var style = this.style;
                var offsets = [];
                var heights = [];
                var offset = 0;
                var lineHeight = Math.floor(parseInt(style.fontSize) * style.lineHeight);
                for (var i = 0, len = contents.length; i < len; i++) {
                    offsets.push(offset);
                    heights.push(lineHeight);
                    offset += lineHeight;
                }
                var x = layout.leftWidth + layout.cellWidth / 2 - 2;
                switch (this.style.verticalAlign) {
                  case "bottom":
                    return this.__drawBottom(x, contents, heights, offsets);

                  case "middle":
                    return this.__drawMiddle(x, contents, heights, offsets);

                  case "top":
                    return this.__drawTop(x, contents, heights, offsets);
                }
            },
            __printRight: function(layout) {
                var contents = layout.content.split(/\n/);
                var style = this.style;
                var offsets = [];
                var heights = [];
                var offset = 0;
                var lineHeight = Math.floor(parseInt(style.fontSize) * style.lineHeight);
                for (var i = 0, len = contents.length; i < len; i++) {
                    offsets.push(offset);
                    heights.push(lineHeight);
                    offset += lineHeight;
                }
                var x = this.width;
                switch (this.style.verticalAlign) {
                  case "bottom":
                    return this.__drawBottom(x, contents, heights, offsets);

                  case "middle":
                    return this.__drawMiddle(x, contents, heights, offsets);

                  case "top":
                    return this.__drawTop(x, contents, heights);
                }
            },
            __drawBottom: function(x, contents, heights, offsets) {
                var context = this.context;
                var diff = this.height - (offsets[offsets.length - 1] + heights[heights.length - 1]);
                var maxWidth = 0;
                for (var i = 0, len = contents.length; i < len; i++) {
                    context.fillText(contents[i], x, diff + offsets[i]);
                    maxWidth = Math.max(maxWidth, context.measureText(contents[i]).width);
                }
                return maxWidth;
            },
            __drawMiddle: function(x, contents, heights, offsets) {
                var context = this.context;
                var topDiff = offsets[0];
                var bottomDiff = this.height - (offsets[offsets.length - 1] + heights[heights.length - 1]);
                var diff = (topDiff + bottomDiff) / 2;
                var maxWidth = 0;
                for (var i = 0, len = contents.length; i < len; i++) {
                    context.fillText(contents[i], x, offsets[i] + diff);
                    maxWidth = Math.max(maxWidth, context.measureText(contents[i]).width);
                }
                return maxWidth;
            },
            __drawTop: function(x, contents, heights, offsets) {
                var context = this.context;
                var maxWidth = 0;
                for (var i = 0, len = contents.length; i < len; i++) {
                    context.fillText(contents[i], x, offsets[i]);
                    maxWidth = Math.max(maxWidth, context.measureText(contents[i]).width);
                }
                return maxWidth;
            }
        });
    }
};

//src/system/screen/canvas.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[136] = {
    value: function(require) {
        return _p.r(0).create("Canvas", {
            width: 0,
            height: 0,
            node: null,
            context: null,
            constructor: function(doc, width, height) {
                this.node = doc.createElement("canvas");
                this.context = this.node.getContext("2d");
                this.resize(width, height);
                this.clear();
            },
            getNode: function() {
                return this.node;
            },
            appendTo: function(container) {
                container.appendChild(this.node);
            },
            resize: function(width, height, zoom) {
                this.width = width;
                this.height = height;
                this.node.width = Math.ceil(this.width * zoom);
                this.node.height = Math.ceil(this.height * zoom);
                this.node.style.width = width + "px";
                this.node.style.height = height + "px";
                this.context.scale(zoom, zoom);
            },
            clear: function() {
                this.context.clearRect(0, 0, this.width, this.height);
            },
            font: function(val) {
                return this.__set("font", val);
            },
            textAlign: function(val) {
                return this.__set("textAlign", val);
            },
            textBaseline: function(val) {
                return this.__set("textBaseline", val);
            },
            fillStyle: function(val) {
                return this.__set("fillStyle", val);
            },
            strokeStyle: function(val) {
                return this.__set("strokeStyle", val);
            },
            lineWidth: function(val) {
                return this.__set("lineWidth", val);
            },
            putImageData: function(image, x, y) {
                this.context.putImageData(image, x, y);
            },
            drawImage: function(image, x, y) {
                return this.context.drawImage.apply(this.context, arguments);
            },
            fillRect: function(x, y, w, h) {
                x = x || 0;
                y = y || 0;
                w = w || this.width;
                h = h || this.height;
                this.context.fillRect(x, y, w, h);
                return this;
            },
            strokeRect: function(x, y, w, h) {
                x = x || 0;
                y = y || 0;
                w = w || this.width;
                h = h || this.height;
                this.context.strokeRect(x, y, w, h);
                return this;
            },
            beginPath: function() {
                this.context.beginPath();
                return this;
            },
            closePath: function() {
                this.context.closePath();
                return this;
            },
            moveTo: function(x, y) {
                this.context.moveTo(x, y);
                return this;
            },
            lineTo: function(x, y) {
                this.context.lineTo(x, y);
                return this;
            },
            stroke: function() {
                this.context.stroke();
                return this;
            },
            fill: function() {
                this.context.fill();
                return this;
            },
            save: function() {
                this.context.save();
                return this;
            },
            restore: function() {
                this.context.restore();
                return this;
            },
            fillText: function(text, x, y, maxWidth) {
                if (maxWidth === undefined) {
                    this.context.fillText(text, x, y);
                } else {
                    this.context.fillText(text, x, y, maxWidth);
                }
                return this;
            },
            strokeText: function() {
                this.context.strokeText();
                return this;
            },
            measureText: function() {
                return this.context.measureText();
            },
            __set: function(name, val) {
                if (val === undefined) {
                    return this.context[name];
                }
                this.context[name] = val;
                return this;
            }
        });
    }
};

//src/system/screen/grid-screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[137] = {
    value: function(require) {
        var Canvas = _p.r(136);
        return _p.r(0).create("BodyScreen", {
            width: 0,
            height: 0,
            canvas: null,
            contentPainter: null,
            base: _p.r(84),
            init: function() {
                this.canvas = new Canvas(this.getDocument(), this.width, this.height);
            },
            appendTo: function(contianer) {
                contianer.appendChild(this.canvas.getNode());
            },
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                this.canvas.resize(width, height, this.getConfig("ZOOM"));
            },
            clear: function() {
                this.canvas.clear();
            },
            render: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var config = this.getConfig();
                var count = struct.getVisibleCount();
                var rowPoints = grid.row;
                var colPoints = grid.col;
                var borderWidth = struct.getBorderWidth();
                var offset = struct.getOffset();
                var width = Math.min(this.width - borderWidth, grid.col[count.col] + offset);
                var height = Math.min(this.height - borderWidth, grid.row[count.row] + offset);
                var sysStyle = struct.getSystemStyle();
                var point = null;
                var canvas = this.canvas;
                canvas.fillStyle(sysStyle.backgroundColor);
                canvas.fillRect(0, 0, width, height);
                canvas.strokeStyle(config.border.color);
                canvas.lineWidth(borderWidth);
                canvas.beginPath();
                for (var i = 1, len = rowPoints.length; i < len; i++) {
                    point = rowPoints[i];
                    canvas.moveTo(0, point);
                    canvas.lineTo(width, point);
                }
                for (var i = 1, len = colPoints.length; i < len; i++) {
                    point = colPoints[i];
                    canvas.moveTo(point, 0);
                    canvas.lineTo(point, height);
                }
                canvas.closePath();
                canvas.stroke();
            }
        });
    }
};

//src/system/screen/left-screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[138] = {
    value: function(require) {
        var Canvas = _p.r(136);
        return _p.r(0).create("LeftScreen", {
            width: 0,
            height: 0,
            canvas: null,
            base: _p.r(84),
            init: function() {
                this.canvas = new Canvas(this.getDocument(), this.width, this.height);
                this.onMessage({
                    "c.range.change": this.rerender,
                    "c.refresh": this.rerender,
                    "c.range.disabled": this.rerender
                });
                this.registerService({
                    "s.left.selection.patch": this.drawSelectionPatch
                });
            },
            appendTo: function(contianer) {
                contianer.appendChild(this.canvas.getNode());
            },
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                this.canvas.resize(width, height, this.getConfig("ZOOM"));
                this.canvas.font(this.getConfig("head").font);
            },
            rerender: function() {
                this.clear();
                this.render();
            },
            clear: function() {
                this.canvas.clear();
            },
            render: function() {
                this.drawStableSelection();
                this.drawGrid();
            },
            drawSelectionPatch: function(start, end) {
                this.clear();
                this.drawSelection($._clone(start), $._clone(end));
                this.drawGrid();
            },
            drawStableSelection: function() {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var selection = range.getAllSelection()[0];
                this.drawSelection(selection.start, selection.end);
            },
            drawSelection: function(start, end) {
                var struct = this.rs("c.struct");
                var headConfig = this.getConfig("head");
                var viewStart = struct.getViewStart();
                var canvas = this.canvas;
                start.col = viewStart.col;
                end.col = viewStart.col;
                var rect = this.cs("c.cell.viewrect", struct, start, end);
                if (!rect) {
                    return;
                }
                canvas.fillStyle(headConfig.focusColor);
                canvas.fillRect(0, rect.y, headConfig.width, rect.height);
            },
            drawGrid: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewStart = struct.getViewStart();
                var config = this.getConfig();
                var count = struct.getVisibleCount();
                var offset = struct.getOffset();
                var rowPoints = grid.row;
                var colPoints = grid.col;
                var canvas = this.canvas;
                var width = this.width;
                var height = this.height;
                var borderWidth = struct.getBorderWidth();
                var point = null;
                var headWidth = config.head.width;
                var rowStart = struct.getViewStart().row;
                canvas.strokeStyle(config.border.color);
                canvas.lineWidth(borderWidth);
                canvas.textAlign("center");
                canvas.textBaseline("middle");
                canvas.fillStyle(config.head.color);
                canvas.beginPath();
                canvas.strokeRect(-borderWidth, colPoints[0], width + 3 * borderWidth, height - borderWidth);
                for (var i = 0, index = viewStart.row, len = count.row; i < len; i++, index++) {
                    point = rowPoints[i + 1];
                    canvas.moveTo(0, point);
                    canvas.lineTo(width, point);
                    canvas.fillText(rowStart + i + 1, headWidth / 2, point - offset - grid.height[index] / 2 + 1);
                }
                canvas.closePath();
                canvas.stroke();
            }
        });
    }
};

//src/system/screen/screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[139] = {
    value: function(require) {
        var BodyScreen = _p.r(129);
        var TopScreen = _p.r(140);
        var LeftScreen = _p.r(138);
        var GridScreen = _p.r(137);
        return _p.r(0).create("Screen", {
            bodyScreen: null,
            gridScreen: null,
            panel: null,
            base: _p.r(87),
            init: function() {
                this.bodyScreen = this.createComponent(BodyScreen);
                this.gridScreen = this.createComponent(GridScreen);
                this.topScreen = this.createComponent(TopScreen);
                this.leftScreen = this.createComponent(LeftScreen);
                this.resize();
                this.onMessage("c.refresh", this.render);
                this.onMessage("c.container.resize", this.resize);
            },
            run: function() {
                this.gridScreen.appendTo(this.getContentContainer());
                this.bodyScreen.appendTo(this.getContentContainer());
                this.topScreen.appendTo(this.getTopContainer());
                this.leftScreen.appendTo(this.getLeftContainer());
            },
            render: function() {
                this.gridScreen.clear();
                this.gridScreen.render();
                this.bodyScreen.clear();
                this.bodyScreen.render();
                this.topScreen.clear();
                this.topScreen.render();
                this.leftScreen.clear();
                this.leftScreen.render();
            },
            resize: function() {
                this.__resize(this.getContentSize(), this.getTopSize(), this.getLeftSize());
            },
            __resize: function(contentSize, topSize, leftSize) {
                this.bodyScreen.resize(contentSize.width, contentSize.height);
                this.gridScreen.resize(contentSize.width, contentSize.height);
                this.topScreen.resize(topSize.width, topSize.height);
                this.leftScreen.resize(leftSize.width, leftSize.height);
            }
        });
    }
};

//src/system/screen/top-screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[140] = {
    value: function(require) {
        var Canvas = _p.r(136);
        return _p.r(0).create("TopScreen", {
            width: 0,
            height: 0,
            canvas: null,
            base: _p.r(84),
            init: function() {
                this.canvas = new Canvas(this.getDocument(), this.width, this.height);
                this.onMessage({
                    "c.range.change": this.rerender,
                    "c.refresh": this.rerender,
                    "c.range.disabled": this.rerender
                });
                this.registerService({
                    "s.top.selection.patch": this.drawSelectionPatch
                });
            },
            appendTo: function(contianer) {
                contianer.appendChild(this.canvas.getNode());
            },
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                this.canvas.resize(width, height, this.getConfig("ZOOM"));
                this.canvas.font(this.getConfig("head").font);
            },
            rerender: function() {
                this.clear();
                this.render();
            },
            clear: function() {
                this.canvas.clear();
            },
            render: function() {
                this.drawStableSelection();
                this.drawGrid();
            },
            drawSelectionPatch: function(start, end) {
                this.clear();
                this.drawSelection($._clone(start), $._clone(end));
                this.drawGrid();
            },
            drawStableSelection: function() {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var selection = range.getAllSelection()[0];
                this.drawSelection(selection.start, selection.end);
            },
            drawSelection: function(start, end) {
                var struct = this.rs("c.struct");
                var headConfig = this.getConfig("head");
                var viewStart = struct.getViewStart();
                var canvas = this.canvas;
                start.row = viewStart.row;
                end.row = viewStart.row;
                var rect = this.cs("c.cell.viewrect", struct, start, end);
                if (!rect) {
                    return;
                }
                canvas.fillStyle(headConfig.focusColor);
                canvas.fillRect(rect.x, 0, rect.width, headConfig.height);
            },
            drawGrid: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewStart = struct.getViewStart();
                var count = struct.getVisibleCount();
                var offset = struct.getOffset();
                var config = this.getConfig();
                var colPoints = grid.col;
                var canvas = this.canvas;
                var width = this.width;
                var height = this.height;
                var borderWidth = struct.getBorderWidth();
                var point = null;
                var headHeight = config.head.height;
                var colStart = struct.getViewStart().col;
                canvas.strokeStyle(config.border.color);
                canvas.lineWidth(borderWidth);
                canvas.textAlign("center");
                canvas.textBaseline("middle");
                canvas.fillStyle(config.head.color);
                canvas.beginPath();
                canvas.strokeRect(colPoints[0], -borderWidth, width - borderWidth, height + 3 * borderWidth);
                for (var i = 0, index = viewStart.col, len = count.col; i < len; i++, index++) {
                    point = colPoints[i + 1];
                    canvas.moveTo(point, 0);
                    canvas.lineTo(point, height);
                    canvas.fillText(this.cs("c.title.index2char", colStart + i), point - offset - grid.width[index] / 2, headHeight / 2);
                }
                canvas.closePath();
                canvas.stroke();
            }
        });
    }
};

//src/system/scrollbar/scroll-event-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[141] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("ScrollEventManager", {
            base: _p.r(84),
            x: 0,
            y: 0,
            lastTimeStamp: 0,
            init: function() {
                this.initEvent();
            },
            initEvent: function() {
                var _self = this;
                $(this.getMainContainer()).on("mousewheel DOMMouseScroll", function(e) {
                    _self.update(e);
                });
            },
            update: function(evt) {
                evt.preventDefault();
                var e = evt.originalEvent;
                this.x = e.deltaX;
                this.y = e.deltaY;
                if (e.timeStamp - this.lastTimeStamp < 20) {
                    return;
                }
                var yDirection = this.y >= 0 ? 1 : -1;
                var xDirection = this.x >= 0 ? 1 : -1;
                this.rs("c.row.scroll", yDirection * Math.ceil(Math.abs(this.y) / 10));
                this.rs("c.col.scroll", xDirection * Math.ceil(Math.abs(this.x) / 10));
                this.x = 0;
                this.y = 0;
                this.lastTimeStamp = e.timeStamp;
            }
        });
    }
};

//src/system/scrollbar/scrollbar.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[142] = {
    value: function(require) {
        var $ = _p.r(2);
        var BAR_MIN_LENGTH = 50;
        var ScrollEventManager = _p.r(141);
        return _p.r(0).create("Scrollbar", {
            hSlider: null,
            vSlider: null,
            hSlidway: null,
            vSlidway: null,
            endIndex: null,
            // 滑道长度
            hWayLength: 0,
            vWayLength: 0,
            // 滑道单位长度
            hUnitLength: 0,
            vUnitLength: 0,
            hBarSize: 0,
            vBarSize: 0,
            hOffset: 0,
            hold: false,
            vOffset: 0,
            base: _p.r(87),
            init: function() {
                var size = this.getScrollSize();
                this.hWayLength = size.h.width - 2;
                this.vWayLength = size.v.height - 2;
                this.createHorizontalBar(size.h);
                this.createVerticalBar(size.v);
                if (this.getConfig("enableScroll")) {
                    this.createComponent(ScrollEventManager);
                }
                this.initMessageHook();
            },
            run: function() {
                var container = this.getScrollContainer();
                container.h.appendChild(this.hSlidway);
                container.v.appendChild(this.vSlidway);
                this.initEvent();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.update
                });
            },
            update: function() {
                if (this.isLock()) {
                    return;
                }
                this.refresh();
            },
            /**
         * 刷新滚动条的各项数据
         */
            refresh: function() {
                var struct = this.rs("c.struct");
                var total = struct.getTotal();
                var visibleCount = struct.getVisibleCount();
                var viewStart = struct.getViewStart();
                this.endIndex = total;
                this.vBarSize = Math.max(Math.floor(this.vWayLength * (visibleCount.row - 1) / total.row), BAR_MIN_LENGTH);
                this.hBarSize = Math.max(Math.floor(this.hWayLength * (visibleCount.col - 1) / total.col), BAR_MIN_LENGTH);
                this.hSlider.style.width = this.hBarSize + "px";
                this.vSlider.style.height = this.vBarSize + "px";
                // 减去首尾两端的单元格
                this.hUnitLength = (this.hWayLength - this.hBarSize) / (total.col - visibleCount.col);
                this.vUnitLength = (this.vWayLength - this.vBarSize) / (total.row - visibleCount.row);
                this.hOffset = Math.floor(viewStart.col * this.hUnitLength);
                this.vOffset = Math.floor(viewStart.row * this.vUnitLength);
                this.hSlider.style.left = this.hOffset + "px";
                this.vSlider.style.top = this.vOffset + "px";
            },
            initEvent: function() {
                var _self = this;
                $(this.hSlider).on("mousedown", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    _self.lock();
                    _self.hMoveStart(evt);
                });
                $(this.vSlider).on("mousedown", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    _self.lock();
                    _self.vMoveStart(evt);
                });
            },
            hMoveStart: function(evt) {
                var x = evt.clientX;
                var distance = 0;
                var _self = this;
                var maxLength = _self.hWayLength - this.hBarSize;
                var $sliderWay = $(this.hSlidway);
                $sliderWay.addClass("btb-active");
                $(this.getDocument()).on("mousemove.scroll", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    distance = evt.clientX - x + _self.hOffset;
                    if (distance > maxLength) {
                        distance = maxLength;
                    } else if (distance < 0) {
                        distance = 0;
                    }
                    _self.hSlider.style.left = distance + "px";
                    var count = 0;
                    if (distance === 0) {
                        count = 0;
                    } else if (distance === maxLength) {
                        count = _self.endIndex.col;
                    } else {
                        count = Math.floor(distance / _self.hUnitLength);
                    }
                    _self.rs("c.col.scrollto", count);
                }).one("mouseup", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    $sliderWay.removeClass("btb-active");
                    $(this).off("mousemove.scroll");
                    _self.hOffset = distance;
                    _self.unlock();
                });
            },
            lock: function() {
                this.hold = true;
            },
            unlock: function() {
                this.hold = false;
            },
            isLock: function() {
                return this.hold;
            },
            vMoveStart: function(evt) {
                var y = evt.clientY;
                var distance = 0;
                var _self = this;
                var maxLength = _self.vWayLength - this.vBarSize;
                var $sliderWay = $(this.vSlidway);
                $sliderWay.addClass("btb-active");
                $(this.getDocument()).on("mousemove.scroll", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    distance = evt.clientY - y + _self.vOffset;
                    if (distance > maxLength) {
                        distance = maxLength;
                    } else if (distance < 0) {
                        distance = 0;
                    }
                    _self.vSlider.style.top = distance + "px";
                    var count = 0;
                    if (distance === 0) {
                        count = 0;
                    } else if (distance === maxLength) {
                        count = _self.endIndex.row;
                    } else {
                        count = Math.floor(distance / _self.vUnitLength);
                    }
                    _self.rs("c.row.scrollto", count);
                }).one("mouseup", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    $sliderWay.removeClass("btb-active");
                    $(this).off("mousemove.scroll");
                    _self.vOffset = distance;
                    _self.unlock();
                });
            },
            createHorizontalBar: function(size) {
                var width = size.width;
                var height = size.height;
                this.hSlidway = this.createElement("div", {
                    attr: {
                        "class": "btb-slidway"
                    },
                    style: {
                        width: width - 2,
                        height: height - 2,
                        top: 1,
                        left: 1
                    }
                });
                this.hSlider = this.createElement("div", {
                    attr: {
                        "class": "btb-slider"
                    },
                    style: {
                        width: BAR_MIN_LENGTH,
                        height: "100%",
                        left: this.hOffset
                    }
                });
                this.hSlidway.appendChild(this.hSlider);
            },
            createVerticalBar: function(size) {
                var width = size.width;
                var height = size.height;
                this.vSlidway = this.createElement("div", {
                    attr: {
                        "class": "btb-slidway"
                    },
                    style: {
                        width: width - 2,
                        height: height - 2,
                        top: 1,
                        left: 1
                    }
                });
                this.vSlider = this.createElement("div", {
                    attr: {
                        "class": "btb-slider"
                    },
                    style: {
                        width: "100%",
                        height: BAR_MIN_LENGTH,
                        top: this.vOffset
                    }
                });
                this.vSlidway.appendChild(this.vSlider);
            }
        });
    }
};

//src/system/selection/selection.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[143] = {
    value: function(require) {
        var $ = _p.r(2);
        var Selection = _p.r(0).create("Selection", {
            cover: null,
            position: null,
            selectionNode: null,
            $selectionNode: null,
            $borderNode: null,
            selectionControl: null,
            state: {},
            workState: true,
            base: _p.r(87),
            init: function(cover, position) {
                this.cover = cover;
                this.position = position;
                this.resetState();
                this.selectionNode = this.createSelectionNode();
                this.$selectionNode = $(this.selectionNode);
                this.$borderNode = $(this.selectionNode).find(".btb-selection-border");
                this.selectionControl = this.createSelectionControl();
                this.initEvent();
                this.initMessageHook();
            },
            run: function() {
                this.selectionNode.appendChild(this.selectionControl);
                this.getContentContainer().appendChild(this.selectionNode);
            },
            initEvent: function() {
                this.cover.onmousedown(this, this.onmousedown);
                this.cover.onmousemove(this, this.onmousemove);
                this.cover.onmouseup(this, this.listenEnd);
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.range.change": this.refreshSelection,
                    "c.refresh": this.refreshSelection,
                    "c.range.disabled": this.disable,
                    "s.input.statechange": this.toggleController,
                    "s.formula.model.open": this.offline,
                    "s.formula.model.close": this.online
                });
            },
            refreshSelection: function() {
                if (!this.workState) {
                    return;
                }
                if (this.state.hold) {
                    return;
                }
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    this.disable();
                    return;
                }
                var viewRect = this.cs("c.cell.viewrect", this.rs("c.struct"), range.getStart(), range.getEnd());
                if (!viewRect) {
                    this.disable();
                    return;
                }
                this.$selectionNode.addClass("btb-selection btb-selection-stable");
                if (range.isMultiple()) {
                    this.$selectionNode.addClass("btb-multi-selection");
                } else {
                    this.$selectionNode.removeClass("btb-multi-selection");
                }
                this.$selectionNode.css({
                    width: viewRect.width,
                    height: viewRect.height,
                    top: viewRect.y,
                    left: viewRect.x
                });
                this.$borderNode[0].style.cssText = "";
                // 'undefined' 表示 给定一个无效值
                this.$borderNode.css({
                    borderLeftColor: viewRect.overflow.left ? "transparent" : "undefined",
                    borderRightColor: viewRect.overflow.right ? "transparent" : "undefined",
                    borderBottomColor: viewRect.overflow.bottom ? "transparent" : "undefined",
                    borderTopColor: viewRect.overflow.top ? "transparent" : "undefined"
                });
                this.enable();
            },
            offline: function() {
                this.workState = false;
                this.disable();
            },
            online: function() {
                this.workState = true;
            },
            toggleController: function(state) {
                if (state) {
                    this.$selectionNode.addClass("btb-no-control");
                } else {
                    this.$selectionNode.removeClass("btb-no-control");
                }
            },
            resetState: function() {
                this.state = {
                    listen: false,
                    start: {
                        row: 0,
                        col: 0
                    },
                    end: {
                        row: 0,
                        col: 0
                    },
                    hold: false
                };
            },
            onmousedown: function(row, col) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                this.resetState();
                this.state.listen = true;
                this.state.start = {
                    row: row + viewStart.row,
                    col: col + viewStart.col
                };
                this.state.end = {
                    row: row + viewStart.row,
                    col: col + viewStart.col
                };
                this.$selectionNode.removeClass("btb-selection-stable btb-multi-selection");
                this.listenStart();
            },
            toStable: function() {
                this.state.listen = false;
                this.$selectionNode.addClass("btb-selection-stable");
                this.rs("c.range.selection", this.state.start, this.state.end);
            },
            onmousemove: function(row, col) {
                if (!this.state.listen) {
                    return;
                }
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var end = this.state.end;
                row += viewStart.row;
                col += viewStart.col;
                if (end.row === row && end.col == col) {
                    return;
                }
                end.row = row;
                end.col = col;
                this.update();
            },
            listenStart: function() {
                var _self = this;
                var container = this.getContentContainer();
                var $container = $(container);
                var location = container.getBoundingClientRect();
                var struct = this.rs("c.struct");
                var mouseLocation = {
                    x: 0,
                    y: 0
                };
                $container.on("mouseleave.selection", function() {
                    _self.state.hold = true;
                    overflowUpdate();
                }).on("mouseenter.selection", function() {
                    _self.state.hold = false;
                });
                $(this.getDocument()).on("mousemove.selection", function(evt) {
                    mouseLocation.x = evt.clientX;
                    mouseLocation.y = evt.clientY;
                }).one("mouseup.selection", function() {
                    _self.listenEnd();
                });
                function overflowUpdate() {
                    setTimeout(function() {
                        if (!_self.state.hold) {
                            return;
                        }
                        var x = mouseLocation.x;
                        var y = mouseLocation.y;
                        switch (true) {
                          case y < location.top:
                            _self.execCommand("scrollrow", -1);
                            _self.refreshUnstableSelectionRow(-1);
                            break;

                          case y > location.bottom:
                            _self.execCommand("scrollrow", 1);
                            _self.refreshUnstableSelectionRow(1);
                            break;

                          case x > location.right:
                            _self.execCommand("scrollcolumn", 1);
                            _self.refreshUnstableSelectionCol(1);
                            break;

                          case x < location.left:
                            _self.execCommand("scrollcolumn", -1);
                            _self.refreshUnstableSelectionCol(-1);
                            break;
                        }
                        var index = _self.position.toIndex(x, y);
                        var viewStart = struct.getViewStart();
                        _self.state.end = {
                            row: index.row + viewStart.row,
                            col: index.col + viewStart.col
                        };
                        _self.update();
                        overflowUpdate();
                    }, 50);
                }
            },
            listenEnd: function() {
                this.state.hold = false;
                $(this.getContentContainer()).off("mouseleave.selection mouseenter.selection");
                $(this.getDocument()).off("mousemove.selection mouseup.selection");
                this.toStable();
            },
            refreshUnstableSelectionRow: function(count) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var end;
                if (count > 0) {
                    end = {
                        row: viewEnd.row,
                        col: this.state.end.col
                    };
                } else {
                    end = {
                        row: viewStart.row,
                        col: this.state.end.col
                    };
                }
                this.state.end = end;
                var rect = this.cs("c.cell.viewrect", struct, this.state.start, end);
                this.$selectionNode.css({
                    width: rect.width,
                    height: rect.height,
                    top: rect.y,
                    left: rect.x
                });
            },
            refreshUnstableSelectionCol: function(count) {
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var end;
                if (count > 0) {
                    end = {
                        row: this.state.end.row,
                        col: viewEnd.col
                    };
                } else {
                    end = {
                        row: this.state.end.row,
                        col: viewStart.col
                    };
                }
                this.state.end = end;
                var rect = this.cs("c.cell.viewrect", struct, this.state.start, end);
                if (!rect) {
                    return;
                }
                this.$selectionNode.css({
                    width: rect.width,
                    height: rect.height,
                    top: rect.y,
                    left: rect.x
                });
            },
            enable: function() {
                this.$selectionNode.show();
            },
            disable: function() {
                this.disabled = true;
                this.$selectionNode.hide();
            },
            update: function() {
                var start = this.state.start;
                var end = this.state.end;
                if (start.row !== end.row || start.col !== end.col) {
                    this.$selectionNode.addClass("btb-multi-selection");
                } else {
                    this.$selectionNode.removeClass("btb-multi-selection");
                }
                var viewRect = this.cs("c.cell.viewrect", this.rs("c.struct"), start, end);
                this.rs("s.top.selection.patch", start, end);
                this.rs("s.left.selection.patch", start, end);
                this.$selectionNode.css({
                    width: viewRect.width,
                    height: viewRect.height,
                    top: viewRect.y,
                    left: viewRect.x
                });
                this.$borderNode[0].style.cssText = "";
                this.$borderNode.css({
                    borderLeftColor: viewRect.overflow.left ? "transparent" : "undefined",
                    borderRightColor: viewRect.overflow.right ? "transparent" : "undefined",
                    borderBottomColor: viewRect.overflow.bottom ? "transparent" : "undefined",
                    borderTopColor: viewRect.overflow.top ? "transparent" : "undefined"
                });
            },
            createSelectionNode: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-selection"
                    },
                    inner: '<div class="btb-selection-bg"></div><div class="btb-selection-border"></div>'
                });
            },
            createSelectionControl: function() {
                return this.createElement("div", "btb-selection-control");
            }
        });
        Selection.deps = [ "cover", "position" ];
        return Selection;
    }
};

//src/system/sort/sort.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[144] = {
    value: function(require) {
        var $ = _p.r(2);
        var CELL_VALUE_TYPE = _p.r(68);
        var BOOLEAN_VALUE = _p.r(67);
        return _p.r(0).create("Cell", {
            base: _p.r(87),
            init: function() {
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.sort.column.asc": this.sortColumnByAsc,
                    "c.sort.column.desc": this.sortColumnByDesc,
                    "c.sort.row.asc": this.sortRowAsc,
                    "c.sort.row.desc": this.sortRowDesc
                });
            },
            sortColumnByAsc: function(sortIndex, range) {
                var index = this.__getSortColumnIndex(sortIndex, range);
                this.rs("c.exchange.row", index, range);
                this.coreRefresh(true);
            },
            sortColumnByDesc: function(sortIndex, range) {
                var index = this.__getSortColumnIndex(sortIndex, range);
                index = index.reverse();
                this.rs("c.exchange.row", index, range);
                this.coreRefresh(true);
            },
            sortRowAsc: function(sortIndex, range) {
                var index = this.__getSortRowIndex(sortIndex, range);
                this.rs("c.exchange.column", index, range);
                this.coreRefresh(true);
            },
            sortRowDesc: function(sortIndex, range) {
                var index = this.__getSortRowIndex(sortIndex, range);
                index = index.reverse();
                this.rs("c.exchange.column", index, range);
                this.coreRefresh(true);
            },
            __getSortColumnIndex: function(sortIndex, range) {
                var start = range.start;
                var end = range.end;
                var struct = this.rs("c.struct");
                var values = [];
                var numeric = [];
                var text = [];
                var error = [];
                var booleans = [];
                var numericMap = {};
                var textMap = {};
                var errorMap = {};
                var booleanMap = {};
                var valueInfo;
                var valueType;
                var value;
                // Limited range
                var effectiveIndex = struct.getEffectiveIndex();
                end.row = Math.min(effectiveIndex.row, range.end.row);
                end.col = Math.min(effectiveIndex.col, range.end.col);
                if (sortIndex < start.col || sortIndex > end.col) {
                    return;
                }
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    valueInfo = struct.getComputedValueInfo(i, sortIndex);
                    valueType = valueInfo.type;
                    value = valueInfo.value;
                    if (valueType === CELL_VALUE_TYPE.UNDEFINED) {
                        continue;
                    }
                    if (valueType === CELL_VALUE_TYPE.TEXT) {
                        value = value.toLowerCase();
                        text.push(value);
                        if (!textMap[value]) {
                            textMap[value] = [];
                        }
                        textMap[value].push(i);
                    } else if (valueType === CELL_VALUE_TYPE.ERROR) {
                        error.push(value);
                        if (!errorMap[value]) {
                            errorMap[value] = [];
                        }
                        errorMap[value].push(i);
                    } else if (valueType === CELL_VALUE_TYPE.BOOLEAN) {
                        value = value === BOOLEAN_VALUE.TRUE ? 1 : 0;
                        if (!booleanMap[value]) {
                            booleanMap[value] = [];
                        }
                        booleans.push(value);
                        booleanMap[value].push(i);
                    } else {
                        switch (valueType) {
                          case CELL_VALUE_TYPE.NUMERIC:
                            value = +value;
                            break;

                          // 时间日期取原始值
                            case CELL_VALUE_TYPE.DATE:
                          case CELL_VALUE_TYPE.TIME:
                            // 未处理日期
                            debugger;
                            value = +struct.getRawValue(i, sortIndex);
                            break;
                        }
                        numeric.push(value);
                        if (!numericMap[value]) {
                            numericMap[value] = [];
                        }
                        numericMap[value].push(i);
                    }
                }
                // 数字类型排序
                var index = [];
                var sorted = {};
                numeric.sort(function(a, b) {
                    return a - b;
                });
                // 排序数字类型的数据
                for (var i = 0, len = numeric.length; i < len; i++) {
                    value = numeric[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = numericMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                text.sort();
                sorted = {};
                // 排序文本类型的数据
                for (var i = 0, len = text.length; i < len; i++) {
                    value = text[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = textMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                // 排序boolean类型数据
                booleans.sort();
                sorted = {};
                for (var i = 0, len = booleans.length; i < len; i++) {
                    value = booleans[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = booleanMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                // 排序错误类型数据
                error.sort();
                sorted = {};
                // 排序文本类型的数据
                for (var i = 0, len = error.length; i < len; i++) {
                    value = error[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = errorMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                return index;
            },
            __getSortRowIndex: function(sortIndex, range) {
                var start = range.start;
                var end = range.end;
                var struct = this.rs("c.struct");
                var values = [];
                var rawValues = [];
                var numeric = [];
                var text = [];
                var error = [];
                var booleans = [];
                var numericMap = {};
                var textMap = {};
                var errorMap = {};
                var booleanMap = {};
                var cell;
                var value;
                // Limited range
                var effectiveIndex = struct.getEffectiveIndex();
                end.row = Math.min(effectiveIndex.row, range.end.row);
                end.col = Math.min(effectiveIndex.col, range.end.col);
                if (sortIndex < start.col || sortIndex > end.col) {
                    return;
                }
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    cell = struct.getComputedCell(i, sortIndex);
                    if (cell.type === CELL_VALUE_TYPE.UNDEFINED) {
                        continue;
                    }
                    rawValues[i] = struct.getRawValue(i, sortIndex);
                    if (cell.type === CELL_VALUE_TYPE.TEXT) {
                        value = cell.value;
                        text.push(value);
                        if (!textMap[value]) {
                            textMap[value] = [];
                        }
                        textMap[value].push(i);
                    } else if (cell.type === CELL_VALUE_TYPE.ERROR) {
                        value = cell.value;
                        error.push(value);
                        if (!errorMap[value]) {
                            errorMap[value] = [];
                        }
                        errorMap[value].push(i);
                    } else if (cell.type === CELL_VALUE_TYPE.BOOLEAN) {
                        value = cell.value === BOOLEAN_VALUE.TRUE ? 1 : 0;
                        if (!booleanMap[value]) {
                            booleanMap[value] = [];
                        }
                        booleans.push(value);
                        booleanMap[value].push(i);
                    } else {
                        switch (cell.type) {
                          case CELL_VALUE_TYPE.NUMERIC:
                            value = +cell.value;
                            break;

                          // 时间日期取原始值
                            case CELL_VALUE_TYPE.DATE:
                          case CELL_VALUE_TYPE.TIME:
                            value = +rawValues[i];
                            break;
                        }
                        numeric.push(value);
                        if (!numericMap[value]) {
                            numericMap[value] = [];
                        }
                        numericMap[value].push(i);
                    }
                }
                // 排序
                var index = [];
                var sorted = {};
                numeric.sort(function(a, b) {
                    return a - b;
                });
                // 排序数字类型的数据
                for (var i = 0, len = numeric.length; i < len; i++) {
                    value = numeric[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = numericMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                text.sort();
                sorted = {};
                // 排序文本类型的数据
                for (var i = 0, len = text.length; i < len; i++) {
                    value = text[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = textMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                // 排序boolean类型数据
                booleans.sort();
                sorted = {};
                for (var i = 0, len = booleans.length; i < len; i++) {
                    value = booleans[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = booleanMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                // 排序错误类型数据
                error.sort();
                sorted = {};
                // 排序文本类型的数据
                for (var i = 0, len = error.length; i < len; i++) {
                    value = error[i];
                    if (sorted[value]) {
                        continue;
                    }
                    sorted[value] = true;
                    value = errorMap[value];
                    for (var j = 0, jlen = value.length; j < jlen; j++) {
                        index.push(value[j]);
                    }
                }
                return index;
            }
        });
    }
};

//src/system/viewport.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[145] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("Viewport", {
            base: _p.r(87),
            init: function() {
                this.initEvent();
            },
            initEvent: function() {
                var _self = this;
                $(this.getDocument().defaultView).on("resize", function() {
                    _self.updateViewport();
                });
            },
            updateViewport: function() {
                this.rs("c.zoom.refresh");
                this.rs("c.update.viewport");
            }
        });
    }
};

//dev-lib/exports.js
/*!
 * 模块暴露
 */
_p[146] = {
    value: function(require) {
        var BTalbe = _p.r(4);
        BTalbe.command(_p.r(5));
        BTalbe.module(_p.r(106));
        BTalbe.mapEvent(_p.r(82));
        BTalbe.Interpreter = _p.r(102);
        window.BTable = BTalbe;
    }
};

var moduleMapping = {
    "kf.start": 146
};

function use(name) {
    return _p.r([ moduleMapping[name] ]);
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