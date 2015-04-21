/*!
 * ====================================================
 * BTable - v1.0.0 - 2015-04-21
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
    value: function() {
        var jQuery = window.jQuery;
        jQuery._clone = function(data) {
            var tmp = {
                _: data
            };
            return JSON.parse(JSON.stringify(tmp))._;
        };
        jQuery._extend = function(target, source) {
            var args = arguments;
            var tmp;
            for (var i = 1, len = args.length; i < len; i++) {
                source = args[i];
                if (!source) {
                    continue;
                }
                for (var key in source) {
                    if (!source.hasOwnProperty(key)) {
                        continue;
                    }
                    tmp = source[key];
                    if (tmp === undefined || tmp === "none") {
                        continue;
                    }
                    target[key] = source[key];
                }
            }
            return target;
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
        var Context = _p.r(131);
        var FORMAT_CODE = _p.r(124);
        var LOCAL_CONFIG = _p.r(13);
        var codes = {};
        for (var key in FORMAT_CODE) {
            if (FORMAT_CODE.hasOwnProperty(key) && key !== "_default") {
                codes[key] = FORMAT_CODE[key];
            }
        }
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
            },
            FORMAT_CODE: codes,
            config: function(conf) {
                $.extend(true, LOCAL_CONFIG, conf);
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
                undo: _p.r(129),
                redo: _p.r(128)
            },
            core: {
                init: _p.r(29),
                sheet: _p.r(37),
                content: _p.r(23),
                resize: _p.r(35),
                move: _p.r(31),
                scroll: _p.r(36),
                range: _p.r(33),
                style: _p.r(38),
                clear: _p.r(21),
                border: _p.r(20),
                format: _p.r(26),
                "export": _p.r(25),
                merge: _p.r(30),
                batchstyle: _p.r(19),
                numberformat: _p.r(32),
                readonly: _p.r(34),
                comments: _p.r(22),
                header: _p.r(27),
                hidden: _p.r(28),
                dataValidation: _p.r(24)
            },
            system: {
                sort: _p.r(202),
                input: _p.r(201),
                _paste: _p.r(200)
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
        // TODO common服务调用方式需要优化
        var CommonCellService = _p.r(0).create("Cell", {
            reference: null,
            base: _p.r(148),
            init: function() {
                this.registerCommonService({
                    "c.cell.viewrect": this.getViewRect,
                    "c.cell.compare": this.compare,
                    "c.cell.coordinate": this.getCellCoordinate,
                    "c.cell.global.coordinate": this.getGlobalCoordinate,
                    "c.columns.width": this.getColumnsWidth,
                    "c.rows.height": this.getRowsHeight
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
                var borderWidth = struct.getBorderWidth();
                var width = -1;
                var w;
                for (var i = startCol; i <= endCol; i++) {
                    w = struct.getColumnWidth(i);
                    if (w === 0) {
                        continue;
                    }
                    width += w + borderWidth;
                }
                if (width < 0) {
                    return 0;
                }
                return width;
            },
            getRowsHeight: function(struct, startRow, endRow) {
                var borderWidth = struct.getBorderWidth();
                var height = -1;
                var h;
                for (var i = startRow; i <= endRow; i++) {
                    h = struct.getRowHeight(i);
                    if (h === 0) {
                        continue;
                    }
                    height += h + borderWidth;
                }
                if (height < 0) {
                    return 0;
                }
                return height;
            },
            getGlobalCoordinate: function(struct, row, col) {
                var viewStart = struct.getViewStart();
                var borderWidth = struct.getBorderWidth();
                var grid = struct.getGrid();
                var coordinate = {
                    y: grid.row[0],
                    x: grid.col[0]
                };
                var width = 0;
                var height = 0;
                if (viewStart.col > col) {
                    for (var i = viewStart.col - 1; i >= col; i--) {
                        width += struct.getColumnWidth(i) + borderWidth;
                    }
                    coordinate.x -= width;
                } else if (viewStart.col < col) {
                    for (var i = viewStart.col; i < col; i++) {
                        width += struct.getColumnWidth(i) + borderWidth;
                    }
                    coordinate.x += width;
                }
                if (viewStart.row > row) {
                    for (var i = viewStart.row - 1; i >= row; i--) {
                        height += struct.getRowHeight(i) + borderWidth;
                    }
                    coordinate.y -= height;
                } else if (viewStart.row < row) {
                    for (var i = viewStart.row; i < row; i++) {
                        height += struct.getRowHeight(i) + borderWidth;
                    }
                    coordinate.y += height;
                }
                return coordinate;
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
                        y -= grid.height[index - viewStart.row] + borderWidth;
                    }
                } else if (row > viewEnd.row) {
                    index = viewEnd.row;
                    y = grid.row[visibleCount.row];
                    while (index < row) {
                        index++;
                        y += grid.height[index - viewStart] + borderWidth;
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
                        x -= grid.width[index - viewStart.col] + borderWidth;
                    }
                } else if (col > viewEnd.col) {
                    index = viewEnd.col;
                    x = grid.col[visibleCount.col];
                    while (index < col) {
                        index++;
                        x += grid.width[index - viewStart.col] + borderWidth;
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
        CommonCellService.getGlobalCoordinate = CommonCellService.prototype.getGlobalCoordinate;
        return CommonCellService;
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
            base: _p.r(148),
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

//src/common/column-name.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[8] = {
    value: function(require) {
        var NAME_TO_INDEX_MAP = {};
        (function() {
            for (var i = 1; i < 27; i++) {
                NAME_TO_INDEX_MAP[String.fromCharCode(65 + i - 1)] = i.toString(27).toUpperCase();
            }
        })();
        return {
            toName: function(index) {},
            toIndex: function(name) {
                name = name.split("").map(function(val) {
                    return NAME_TO_INDEX_MAP[val.toUpperCase()];
                });
                return parseInt(name.join(""), 26) - 1;
            }
        };
    }
};

//src/common/content.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[9] = {
    value: function(require) {
        return _p.r(0).create("Content", {
            base: _p.r(148),
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
                return content.replace(/<br[^>]*>/gi, "\n").replace(/<[^>]+>/gi, "");
            }
        });
    }
};

//src/common/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[10] = {
    value: function(require) {
        return _p.r(0).create("Cell", {
            reference: null,
            base: _p.r(148),
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
_p[11] = {
    value: function(require) {
        var KEY_COUNT = 26;
        return _p.r(0).create("Title", {
            titles: null,
            indexMapping: {},
            charMapping: {},
            carryIndexMapping: {},
            base: _p.r(148),
            init: function() {
                this.initTitles();
                this.registerCommonService({
                    "c.title.index2char": this.indexToChar,
                    "c.title.char2index": this.chartToIndex
                });
            },
            initTitles: function() {
                this.titles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            },
            indexToChar: function(index) {
                var chars = [];
                var key;
                index = index.toString(KEY_COUNT).split("");
                var lastIndex = index.length - 1;
                key = parseInt(index[lastIndex], KEY_COUNT);
                chars[lastIndex] = this.titles[key];
                for (var i = 0, len = index.length - 1; i < len; i++) {
                    key = parseInt(index[i], KEY_COUNT) - 1;
                    chars[i] = this.titles[key];
                }
                return chars.join("");
            },
            chartToIndex: function(title) {
                var index = [];
                title = title.toUpperCase().split("");
                for (var i = 0, len = title.length; i < len; i++) {
                    index[i] = this.charMapping[title[i]];
                }
                return parseInt(index.join(""), 10) - 1;
            }
        });
    }
};

//src/config/default-user.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[12] = {
    value: {
        // 是否启用输入锁： 如果启用输入锁，则在发生系统级的失焦后，选区仍然有效。
        inputlock: true
    }
};

//src/config/local.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[13] = {
    value: {
        // 单元格默认宽高
        cell: {
            width: 100,
            height: 22
        }
    }
};

//src/config/sys.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[14] = {
    value: {
        head: {
            width: 50,
            height: 25,
            color: "#000000",
            focusColor: "#dddddd",
            font: "12px/1 宋体, Arial"
        },
        scrollbar: {
            width: 9,
            background: "#f8f8f8"
        },
        border: {
            width: 1,
            color: "#cccccc",
            offset: .5
        },
        PANE_LINE_COLOR: "#999999",
        canvas: {
            background: "#ffffff",
            // 内容区域结束后的预留空间
            tailSpace: 20
        },
        COMMENTS_ICON_COLOR: "#ff0000",
        LINE_HEIGHT: 1.2,
        background: "#f8f8f8",
        enableScroll: true,
        CONTENT_PADDING: 2,
        CANDIDATE_FONT: [ "Arial", "sans", "sans-serif" ].join(","),
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
_p[15] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var TAIL_SAPACE = SYS_CONFIG.canvas.tailSpace;
        var Actuary = _p.r(0).create("Actuary", {
            cell: null,
            dataAccess: null,
            reverse: null,
            base: _p.r(146),
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
                this.reverse = {};
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
                // 倒序计算，不需要检查溢出
                if (!this.reverse.row && !this.reverse.col) {
                    this.patchGrid(grid);
                }
                var boundary = this.getBoundary(grid);
                var visibleCount = {
                    row: grid.viewHeight.length,
                    col: grid.viewWidth.length
                };
                dataAccess.setGrid(grid);
                dataAccess.setVisibleCount(visibleCount.row, visibleCount.col);
                var viewStart = dataAccess.getViewStart();
                dataAccess.setViewEnd(viewStart.row + visibleCount.row - 1, viewStart.col + visibleCount.col - 1);
                dataAccess.setBoundary(boundary.width, boundary.height);
                // clear reverse state
                this.reverse = {};
                this.postMessage("c.refresh");
            },
            genGrid: function() {
                var paneGrid = this.getPaneGrid();
                return this.getNormalGrid(paneGrid);
            },
            getPaneGrid: function() {
                var dataAccess = this.dataAccess;
                var pane = dataAccess.getPane();
                var offset = dataAccess.getOffset();
                var rowMap = [];
                var colMap = [];
                var rMap = {};
                var cMap = {};
                var viewRowPoints = [ offset ];
                var viewColPoints = [ offset ];
                var viewWidth = [];
                var viewHeight = [];
                var cellModule = this.cell;
                var grid = {
                    rowIndex: pane.row,
                    colIndex: pane.col,
                    rowMap: rowMap,
                    colMap: colMap,
                    rMap: rMap,
                    cMap: cMap,
                    viewRowPoints: viewRowPoints,
                    viewColPoints: viewColPoints,
                    viewWidth: viewWidth,
                    viewHeight: viewHeight
                };
                if (pane.row === -1 && pane.col === -1) {
                    return grid;
                }
                var dataAccess = this.dataAccess;
                var space = dataAccess.getSpace();
                var borderWidth = dataAccess.getBorderWidth();
                // row point
                var points = [];
                var length = [];
                var tmp;
                var inc = offset;
                if (pane.row !== -1) {
                    points.push(offset);
                    for (var i = 0, limit = pane.row; i <= limit; i++) {
                        tmp = cellModule.getRowHeight(i);
                        if (tmp === 0) {
                            continue;
                        }
                        inc += borderWidth + tmp;
                        length.push(tmp);
                        viewHeight.push(tmp);
                        points.push(inc);
                        viewRowPoints.push(inc);
                        rowMap[i] = i;
                        rMap[i] = i;
                        if (inc > space.height) {
                            break;
                        }
                    }
                    grid.row = points;
                    grid.height = length;
                } else {
                    grid.row = null;
                    grid.height = null;
                }
                // col point
                points = [];
                length = [];
                inc = offset;
                // 检测起始值viewStart是否有溢出
                if (pane.col !== -1) {
                    points.push(offset);
                    for (var i = 0, limit = pane.col; i <= limit; i++) {
                        tmp = cellModule.getColumnWidth(i);
                        if (tmp === 0) {
                            continue;
                        }
                        inc += borderWidth + tmp;
                        length.push(tmp);
                        viewWidth.push(tmp);
                        points.push(inc);
                        viewColPoints.push(inc);
                        colMap[i] = i;
                        cMap[i] = i;
                        if (inc > space.width) {
                            break;
                        }
                    }
                    grid.col = points;
                    grid.width = length;
                } else {
                    grid.col = null;
                    grid.width = null;
                }
                return grid;
            },
            getNormalGrid: function(paneGrid) {
                var dataAccess = this.dataAccess;
                var cellModule = this.cell;
                if (this.reverse.row) {
                    this.resetViewStartRow();
                }
                if (this.reverse.col) {
                    this.resetViewStartCol();
                }
                var space = dataAccess.getSpace();
                var total = dataAccess.getTotal();
                var borderWidth = dataAccess.getBorderWidth();
                var viewStart = dataAccess.getViewStart();
                var offset = dataAccess.getOffset();
                // row point
                var tmp;
                var rowPoints = [ offset ];
                var colPoints = [ offset ];
                var rowHeights = [];
                var colWidths = [];
                var startRow = viewStart.row;
                var startCol = viewStart.col;
                var spaceWidth = space.width;
                var spaceHeight = space.height;
                var rowMap = paneGrid.rowMap;
                var colMap = paneGrid.colMap;
                var rMap = paneGrid.rMap;
                var cMap = paneGrid.cMap;
                var viewRowPoints = paneGrid.viewRowPoints;
                var viewColPoints = paneGrid.viewColPoints;
                var viewHeight = paneGrid.viewHeight;
                var viewWidth = paneGrid.viewWidth;
                var spaceOffset = {
                    row: 0,
                    col: 0
                };
                if (paneGrid.rowIndex === -1) {
                    spaceHeight -= borderWidth;
                } else {
                    spaceOffset.row = paneGrid.row[paneGrid.row.length - 1] - offset;
                    spaceHeight -= spaceOffset.row;
                    startRow += paneGrid.rowIndex + 1;
                    if (startRow >= total.row) {
                        startRow = total.row - 1;
                    }
                }
                if (paneGrid.colIndex === -1) {
                    spaceWidth -= borderWidth;
                } else {
                    spaceOffset.col = paneGrid.col[paneGrid.col.length - 1] - offset;
                    spaceWidth -= spaceOffset.col;
                    startCol += paneGrid.colIndex + 1;
                    if (startCol >= total.col) {
                        startCol = total.col - 1;
                    }
                }
                var inc = offset;
                var diff = viewRowPoints[viewRowPoints.length - 1];
                if (diff) {
                    diff -= offset;
                }
                // row
                if (spaceHeight > 0) {
                    for (var i = startRow, len = total.row; i < len; i++) {
                        tmp = cellModule.getRowHeight(i);
                        if (tmp === 0) {
                            continue;
                        }
                        inc += borderWidth + tmp;
                        rowHeights.push(tmp);
                        viewHeight.push(tmp);
                        rowPoints.push(inc);
                        viewRowPoints.push(inc + diff);
                        rMap[i] = rowMap.length;
                        rowMap.push(i);
                        if (inc >= spaceHeight) {
                            break;
                        }
                    }
                }
                // 行下界溢出值
                var rowOverflow = spaceHeight - (inc + offset);
                inc = offset;
                diff = viewColPoints[viewColPoints.length - 1] || 0;
                if (diff) {
                    diff -= offset;
                }
                if (spaceWidth > 0) {
                    for (var i = startCol, len = total.col; i < len; i++) {
                        tmp = cellModule.getColumnWidth(i);
                        if (tmp === 0) {
                            continue;
                        }
                        inc += borderWidth + tmp;
                        colWidths.push(tmp);
                        viewWidth.push(tmp);
                        colPoints.push(inc);
                        viewColPoints.push(inc + diff);
                        cMap[i] = colMap.length;
                        colMap.push(i);
                        if (inc >= spaceWidth) {
                            break;
                        }
                    }
                }
                var colOverflow = spaceWidth - (inc + offset);
                return {
                    row: rowPoints,
                    col: colPoints,
                    width: colWidths,
                    height: rowHeights,
                    startRow: startRow,
                    startCol: startCol,
                    rowMap: rowMap,
                    colMap: colMap,
                    rMap: rMap,
                    cMap: cMap,
                    spaceOffset: spaceOffset,
                    viewRowPoints: viewRowPoints,
                    viewColPoints: viewColPoints,
                    viewWidth: viewWidth,
                    viewHeight: viewHeight,
                    paneGrid: paneGrid,
                    rowOverflow: rowOverflow,
                    colOverflow: colOverflow
                };
            },
            reverseRow: function() {
                this.reverse.row = true;
            },
            reverseColumn: function() {
                this.reverse.col = true;
            },
            resetViewStartRow: function() {
                var dataAccess = this.dataAccess;
                var space = dataAccess.getSpace();
                var total = dataAccess.getTotal();
                var borderWidth = dataAccess.getBorderWidth();
                var viewEnd = dataAccess.getViewEnd();
                var cellModule = this.cell;
                var tmp;
                var spaceHeight = space.height;
                var endRow = viewEnd.row;
                if (endRow >= total.row) {
                    endRow = total.row - 1;
                }
                if (endRow === total.row - 1) {
                    spaceHeight -= TAIL_SAPACE;
                }
                var count = 0;
                var inc = borderWidth;
                spaceHeight -= cellModule.getRowHeight(endRow) + borderWidth;
                for (var i = endRow - 1; i >= 0; i--) {
                    tmp = cellModule.getRowHeight(i);
                    if (tmp === 0) {
                        continue;
                    }
                    inc += borderWidth + tmp;
                    if (inc > spaceHeight) {
                        break;
                    }
                    count++;
                }
                dataAccess.setViewStartRow(endRow - count);
            },
            resetViewStartCol: function() {
                var dataAccess = this.dataAccess;
                var space = dataAccess.getSpace();
                var total = dataAccess.getTotal();
                var borderWidth = dataAccess.getBorderWidth();
                var viewEnd = dataAccess.getViewEnd();
                var cellModule = this.cell;
                var tmp;
                var spaceWidth = space.width;
                var endCol = viewEnd.col;
                if (endCol >= total.col) {
                    endCol = total.col - 1;
                }
                if (endCol === total.col - 1) {
                    spaceWidth -= TAIL_SAPACE;
                }
                var count = 0;
                var inc = borderWidth;
                spaceWidth -= cellModule.getColumnWidth(endCol) + borderWidth;
                for (var i = endCol - 1; i >= 0; i--) {
                    tmp = cellModule.getColumnWidth(i);
                    if (tmp === 0) {
                        continue;
                    }
                    inc += borderWidth + tmp;
                    if (inc > spaceWidth) {
                        break;
                    }
                    count++;
                }
                dataAccess.setViewStartCol(endCol - count);
            },
            getBoundary: function(grid) {
                var offset = this.dataAccess.getOffset();
                var size = this.getContentSize();
                var gridWidth = grid.viewColPoints[grid.viewColPoints.length - 1] + offset;
                var gridHeight = grid.viewRowPoints[grid.viewRowPoints.length - 1] + offset;
                return {
                    width: Math.min(size.width, gridWidth),
                    height: Math.min(size.height, gridHeight)
                };
            },
            patchGrid: function(grid) {
                var newStartRow;
                var newStartCol;
                if (grid.rowOverflow > 0) {
                    newStartRow = this.__patchRow(grid);
                    if (newStartRow !== undefined) {
                        this.dataAccess.setViewStartRow(newStartRow);
                    }
                }
                if (grid.colOverflow > 0) {
                    newStartCol = this.__patchCol(grid);
                    if (newStartCol !== undefined) {
                        this.dataAccess.setViewStartCol(newStartCol);
                    }
                }
            },
            __patchRow: function(grid) {
                var info = this.__getRowPatchInfo(grid.rowOverflow - TAIL_SAPACE, grid.startRow - 1);
                if (!info) {
                    return;
                }
                var heightList = info.heightList;
                var patchHeight = info.height;
                var paneGrid = grid.paneGrid;
                if (patchHeight === 0) {
                    return;
                }
                grid.startRow -= heightList.length;
                var borderWidth = this.dataAccess.getBorderWidth();
                var offset = this.dataAccess.getOffset();
                var startRow = grid.startRow;
                var viewRowPoints = [ offset ];
                var rowMap = [];
                var rMap = {};
                var viewHeight;
                var inc;
                if (paneGrid.rowIndex === -1) {
                    viewHeight = heightList.concat(grid.viewHeight);
                    inc = offset;
                    for (var i = 0, len = viewHeight.length; i < len; i++, startRow++) {
                        inc += viewHeight[i] + borderWidth;
                        rowMap[i] = startRow;
                        rMap[startRow] = i;
                        viewRowPoints.push(inc);
                    }
                    grid.rowMap = rowMap;
                    grid.rMap = rMap;
                    grid.viewRowPoints = viewRowPoints;
                    grid.viewHeight = viewHeight;
                } else {
                    heightList.unshift(paneGrid.rowIndex + 1, 0);
                    grid.viewHeight.splice.apply(grid.viewHeight, heightList);
                    viewHeight = grid.viewHeight;
                    rowMap = grid.rowMap;
                    rMap = grid.rMap;
                    viewRowPoints = grid.viewRowPoints;
                    inc = viewRowPoints[paneGrid.rowIndex + 1];
                    for (var i = paneGrid.rowIndex + 1, len = viewHeight.length; i < len; i++, startRow++) {
                        inc += viewHeight[i] + borderWidth;
                        rowMap[i] = startRow;
                        rMap[startRow] = i;
                        viewRowPoints[i + 1] = inc;
                    }
                }
                return grid.startRow - (paneGrid.rowIndex + 1);
            },
            __patchCol: function(grid) {
                var info = this.__getColPatchInfo(grid.colOverflow - TAIL_SAPACE, grid.startCol - 1);
                if (!info) {
                    return;
                }
                var widthList = info.widthList;
                var patchWidth = info.width;
                var paneGrid = grid.paneGrid;
                if (patchWidth === 0) {
                    return;
                }
                grid.startCol -= widthList.length;
                var borderWidth = this.dataAccess.getBorderWidth();
                var offset = this.dataAccess.getOffset();
                var startCol = grid.startCol;
                var viewColPoints = [ offset ];
                var colMap = [];
                var cMap = {};
                var viewWidth;
                var inc;
                if (paneGrid.colIndex === -1) {
                    viewWidth = widthList.concat(grid.viewWidth);
                    inc = offset;
                    for (var i = 0, len = viewWidth.length; i < len; i++, startCol++) {
                        inc += viewWidth[i] + borderWidth;
                        colMap[i] = startCol;
                        cMap[startCol] = i;
                        viewColPoints.push(inc);
                    }
                    grid.colMap = colMap;
                    grid.cMap = cMap;
                    grid.viewColPoints = viewColPoints;
                    grid.viewWidth = viewWidth;
                } else {
                    widthList.unshift(paneGrid.colIndex + 1, 0);
                    grid.viewWidth.splice.apply(grid.viewWidth, widthList);
                    viewWidth = grid.viewWidth;
                    colMap = grid.colMap;
                    cMap = grid.cMap;
                    viewColPoints = grid.viewColPoints;
                    inc = viewColPoints[paneGrid.colIndex + 1];
                    for (var i = paneGrid.colIndex + 1, len = viewWidth.length; i < len; i++, startCol++) {
                        inc += viewWidth[i] + borderWidth;
                        colMap[i] = startCol;
                        cMap[startCol] = i;
                        viewColPoints[i + 1] = inc;
                    }
                }
                return grid.startCol - (paneGrid.colIndex + 1);
            },
            __getRowPatchInfo: function(spillage, row) {
                var dataAccess = this.dataAccess;
                var borderWidth = dataAccess.getBorderWidth();
                var cell = this.cell;
                if (row < 0) {
                    return null;
                }
                var heightList = [];
                var height = 0;
                var tmp = 0;
                var h;
                for (var i = row; i >= 0; i--) {
                    h = cell.getRowHeight(i);
                    if (h === 0) {
                        continue;
                    }
                    tmp += h + borderWidth;
                    if (tmp > spillage) {
                        break;
                    }
                    height = tmp;
                    heightList.push(h);
                }
                return {
                    heightList: heightList.reverse(),
                    height: height
                };
            },
            __getColPatchInfo: function(spillage, col) {
                var dataAccess = this.dataAccess;
                var borderWidth = dataAccess.getBorderWidth();
                var cell = this.cell;
                if (col < 0) {
                    return null;
                }
                var widthList = [];
                var width = 0;
                var tmp = 0;
                var w;
                for (var i = col; i >= 0; i--) {
                    w = cell.getColumnWidth(i);
                    if (w === 0) {
                        continue;
                    }
                    tmp += w + borderWidth;
                    if (tmp > spillage) {
                        break;
                    }
                    width = tmp;
                    widthList.push(w);
                }
                return {
                    widthList: widthList.reverse(),
                    width: width
                };
            }
        });
        Actuary.deps = [ "dataAccess", "cell" ];
        return Actuary;
    }
};

//src/core/autosize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[16] = {
    value: function(require) {
        var common = _p.r(40);
        var SYS_CONFIG = _p.r(14);
        var CONTENT_PADDING = SYS_CONFIG.CONTENT_PADDING;
        var LINE_HEIGHT = SYS_CONFIG.LINE_HEIGHT;
        var Border = _p.r(0).create("AutoSize", {
            dataAccess: null,
            wraptext: null,
            styleModule: null,
            sizeRecord: [],
            base: _p.r(146),
            init: function(dataAccess, styleModule, wraptext) {
                this.dataAccess = dataAccess;
                this.wraptext = wraptext;
                this.styleModule = styleModule;
                this.initMessageHook();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.contentchange": this.__contentChange,
                    "c.stylechange": this.__styleChange,
                    "c.columnresize": this.__columnResize,
                    "c.rowresize": this.__rowResize,
                    "c.mergechange": this.__mergeChange
                });
            },
            getRowHeight: function(row) {
                var height = this.dataAccess.getAutoSize(row);
                if (height === undefined) {
                    height = this.__calculateRowHeight(row);
                    this.dataAccess.setAutoSize(height, row);
                }
                return height;
            },
            __calculateRowHeight: function(row) {
                var dimension = this.dataAccess.getDimension();
                var sizeRecord = this.sizeRecord;
                var maxColumnIndex = dimension.col;
                var height = 0;
                var content;
                var style;
                var currentHeight;
                var alignmentStyle;
                for (var i = 0; i <= maxColumnIndex; i++) {
                    content = this.wraptext.getDisplayValue(row, i);
                    if (!content) {
                        continue;
                    }
                    alignmentStyle = this.styleModule.getComputedStyle("alignments", row, i);
                    if (this.dataAccess.isMergeCell(row, i)) {
                        continue;
                    }
                    if (sizeRecord[row] && sizeRecord[row][i]) {
                        currentHeight = sizeRecord[row][i];
                    } else {
                        style = this.styleModule.getComputedStyle("fonts", row, i);
                        currentHeight = Math.ceil(style.size * LINE_HEIGHT * content.split("\n").length);
                        currentHeight += 2 * CONTENT_PADDING;
                    }
                    height = Math.max(height, currentHeight);
                }
                return height;
            },
            __contentChange: function(row, col) {
                var start = row;
                var end = col;
                if (!isNaN(+row)) {
                    this.__clear(row, col);
                } else {
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            this.__clear(i, j);
                        }
                    }
                }
            },
            __styleChange: function(start, end) {
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        this.__clear(i, j);
                    }
                }
            },
            __mergeChange: function(start, end) {
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        this.__clear(i, j);
                    }
                }
            },
            __columnResize: function(col) {
                var totalIndex = this.dataAccess.getTotalIndex();
                for (var i = 0, limit = totalIndex.row; i <= limit; i++) {
                    this.__clear(i, col);
                }
            },
            __rowResize: function(row) {
                var totalIndex = this.dataAccess.getTotalIndex();
                for (var i = 0, limit = totalIndex.col; i <= limit; i++) {
                    this.__clear(row, i);
                }
            },
            __clear: function(row, col) {
                var sizeRecord = this.sizeRecord;
                this.dataAccess.resetAutoSize(row);
                if (sizeRecord[row] && sizeRecord[row][col]) {
                    sizeRecord[row][col] = undefined;
                }
            }
        });
        Border.deps = [ "dataAccess", "style", "wraptext" ];
        return Border;
    }
};

//src/core/border.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[17] = {
    value: function(require) {
        var common = _p.r(40);
        var Border = _p.r(0).create("Border", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.set.border": this.setBorder,
                    "c.clear.border": this.clearBorder,
                    "c.outer.border": this.setOuterBorder
                });
            },
            getBorder: function(row, col) {
                return this.dataAccess.getBorder(row, col);
            },
            getBorders: function(start, end) {
                return this.dataAccess.getBorders(start, end);
            },
            setBorder: function(borderOption, start, end) {
                this.dataAccess.setBorder(borderOption, start, end);
                this.coreRefresh(true);
            },
            clearBorder: function(start, end) {
                this.dataAccess.clearBorder(start, end);
                this.coreRefresh(true);
            },
            setOuterBorder: function(borderData, row, col) {
                var range = common.formatCellIndex(row, col);
                this.dataAccess.setOuterBorder(borderData, range.start, range.end);
                this.coreRefresh(true);
            }
        });
        Border.deps = [ "dataAccess" ];
        return Border;
    }
};

//src/core/cell.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[18] = {
    value: function(require) {
        var $ = _p.r(2);
        var Cell = _p.r(0).create("Cell", {
            contentPanel: null,
            $contentPanel: null,
            style: null,
            dataAccess: null,
            valueModule: null,
            autosize: null,
            base: _p.r(146),
            init: function(dataAccess, valueModule, style, autosize) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.style = style;
                this.autosize = autosize;
                this.contentPanel = this.createElement("div", "btb-core-content");
                this.$contentPanel = $(this.contentPanel);
                this.getContentContainer().appendChild(this.contentPanel);
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.exchange.row": this.exchangeRow,
                    "c.exchange.column": this.exchangeColumn,
                    "c.resize.column": this.resizeCol,
                    "c.resize.row": this.resizeRow,
                    "c.cell.merge": this.merge,
                    "c.cell.unmerge": this.unmergeCell,
                    "c.is.merge.cell": this.isMergeCell,
                    "c.has.merge.cell": this.hasMergeCell,
                    "c.get.merge.cell": this.getMergeCell,
                    "c.standard.cell.range": this.standardCellRange,
                    "c.merge.cells.in.range": this.getMergeCellsInRange,
                    "c.set.horizontal.merge": this.horizontalMerge,
                    "c.set.vertical.merge": this.verticalMerge
                });
            },
            getAllMergeCell: function() {
                return this.dataAccess.getMergeCell();
            },
            getMergeCell: function(row, col) {
                return this.dataAccess.getMergeCell(row, col);
            },
            getMergeCellsInRange: function(range) {
                return this.dataAccess.getMergeCellsInRange(range);
            },
            merge: function(range) {
                this.dataAccess.setMerge(range);
                this.postMessage("c.mergechange", range.start, range.end);
                this.coreRefresh(true);
            },
            unmergeCell: function(range) {
                this.dataAccess.unmergeCell(range);
                this.postMessage("c.mergechange", range.start, range.end);
                this.coreRefresh(true);
            },
            horizontalMerge: function(range) {
                this.dataAccess.setHorizontalMerge(range);
                this.postMessage("c.mergechange", range.start, range.end);
                this.coreRefresh(true);
            },
            verticalMerge: function(range) {
                this.dataAccess.setVerticalMerge(range);
                this.postMessage("c.mergechange", range.start, range.end);
                this.coreRefresh(true);
            },
            getRowHeight: function(row) {
                var value = this.dataAccess.getRowHeight(row);
                if (value !== undefined) {
                    return value;
                }
                value = this.autosize.getRowHeight(row);
                return Math.max(this.getConfig("cell").height, value);
            },
            getColumnWidth: function(col) {
                var cellConfig = this.getConfig("cell");
                var value = this.dataAccess.getColumnWidth(col);
                return value === undefined ? cellConfig.width : value;
            },
            isMergeCell: function(row, col) {
                return this.dataAccess.isMergeCell(row, col);
            },
            hasMergeCell: function(range) {
                return this.dataAccess.hasMergeCell(range);
            },
            resizeRow: function(size, row) {
                this.dataAccess.setRowHeight(size, row);
                this.postMessage("c.rowresize", row);
                this.coreRefresh(true);
            },
            resizeCol: function(size, col) {
                this.dataAccess.setColumnWidth(size, col);
                this.postMessage("c.columnresize", col);
                this.coreRefresh(true);
            },
            exchangeRow: function(index, range) {
                this.dataAccess.exchangeRow(index, range);
                this.coreRefresh(true);
            },
            // TODO 优化底层存储后再实现
            exchangeColumn: function(index, range) {
                debugger;
            },
            standardCellRange: function(start, end) {
                var mergeCell;
                var startRow = start.row;
                var endRow = end.row;
                var startCol = start.col;
                var endCol = end.col;
                // scan row
                for (var i = startCol, limit = endCol; i <= limit; i++) {
                    // start row
                    mergeCell = this.getMergeCell(startRow, i);
                    if (mergeCell && mergeCell.start.row !== startRow) {
                        return this.standardCellRange({
                            row: mergeCell.start.row,
                            col: startCol
                        }, end);
                    }
                    // end row
                    mergeCell = this.getMergeCell(endRow, i);
                    if (mergeCell && mergeCell.end.row !== endRow) {
                        return this.standardCellRange(start, {
                            row: mergeCell.end.row,
                            col: endCol
                        });
                    }
                }
                // scan column
                for (var i = startRow, limit = endRow; i <= limit; i++) {
                    // start column
                    mergeCell = this.getMergeCell(i, startCol);
                    if (mergeCell && mergeCell.start.col !== startCol) {
                        return this.standardCellRange({
                            row: startRow,
                            col: mergeCell.start.col
                        }, end);
                    }
                    // end row
                    mergeCell = this.getMergeCell(i, endCol);
                    if (mergeCell && mergeCell.end.col !== endCol) {
                        return this.standardCellRange(start, {
                            row: endRow,
                            col: mergeCell.end.col
                        });
                    }
                }
                return {
                    start: {
                        row: startRow,
                        col: startCol
                    },
                    end: {
                        row: endRow,
                        col: endCol
                    }
                };
            },
            isSameMergeCell: function(args) {
                return this.dataAccess.isSameMergeCell(arguments);
            }
        });
        Cell.deps = [ "dataAccess", "value", "style", "autosize" ];
        return Cell;
    }
};

//src/core/commands/batchstyle.js
/**
 * @file 行列style
 * @author hancong03@baiud.com
 */
_p[19] = {
    value: function(require) {
        var NAMED_MAP = {
            color: "color",
            fontsize: "fontSize",
            font: "fontFamily",
            bold: "fontWeight",
            italic: "fontStyle",
            fill: "backgroundColor",
            underline: "underline",
            throughline: "throughline",
            horizontal: "textAlign",
            vertical: "verticalAlign"
        };
        return _p.r(0).create("BatchStyleCommand", {
            name: "columnstyle rowstyle",
            base: _p.r(149),
            execBefore: function() {
                var args = [].slice.call(arguments, 1);
                switch (args[0]) {
                  case "bold":
                    args[1] = args[1] ? "bold" : undefined;
                    break;

                  case "italic":
                    args[1] = args[1] ? "italic" : undefined;
                    break;
                }
                return args;
            },
            execute: function(name) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            columnstyle: function(styleName, styleValue, startIndex, endIndex) {
                styleName = NAMED_MAP[styleName];
                if (!styleName) {
                    return false;
                }
                this.rs("c.set.column.style", styleName, styleValue, startIndex, endIndex);
                this.coreRefresh(true);
            },
            rowstyle: function(styleName, styleValue, startIndex, endIndex) {
                styleName = NAMED_MAP[styleName];
                if (!styleName) {
                    return false;
                }
                this.rs("c.set.row.style", styleName, styleValue, startIndex, endIndex);
                this.coreRefresh(true);
            }
        });
    }
};

//src/core/commands/border.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[20] = {
    value: function(require) {
        return _p.r(0).create("BorderCommand", {
            name: "border clearborder outerborder",
            base: _p.r(149),
            execute: function(name) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            border: function(borderOptions, start, end) {
                var range = this.__getCells(start, end);
                this.rs("c.setstyle", "border", borderOptions, range.start, range.end);
            },
            clearborder: function(start, end) {
                var range = this.__getCells(start, end);
                this.rs("c.setstyle", "border", null, range.start, range.end);
            },
            outerborder: function(borderOption, start, end) {
                var range = this.__getCells(start, end);
                this.rs("c.outer.border", borderOption, range.start, range.end);
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
                return {
                    start: start,
                    end: end
                };
            }
        });
    }
};

//src/core/commands/clear.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[21] = {
    value: function(require) {
        return _p.r(0).create("ClearCommand", {
            name: "clearcontent clearstyle clearall",
            base: _p.r(149),
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
            clearstyle: function(ranges) {
                this.rs("c.clear.style", ranges[0].start, ranges[0].end);
            },
            clearall: function(ranges) {
                this.corePrepareRefresh();
                this.clearcontent(ranges);
                this.clearstyle(ranges);
                this.coreRefresh();
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

//src/core/commands/comments.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[22] = {
    value: function(require) {
        return _p.r(0).create("RangeCommand", {
            base: _p.r(142),
            name: "comments",
            execute: function(name, row, col, value) {
                this.rs("c.set.comments", row, col, value);
            },
            queryValue: function(name, row, col) {
                return this.rs("c.clear.comments", row, col);
            }
        });
    }
};

//src/core/commands/content.js
/**
 * @file 单元格写入命令的实现
 * @author hancong03@baiud.com
 */
_p[23] = {
    value: function(require) {
        return _p.r(0).create("WriteCommand", {
            base: _p.r(149),
            name: "content write batchwrite",
            execBefore: function(name, content, row, col) {
                var cell = this.__getCells(row, col);
                return [ content, cell.row, cell.col ];
            },
            /**
         * 命令执行入口
         * @param name 当前运行的命令名称
         * @param content 将要写入的内容
         * @param row 写入的单元格所在的行索引
         * @param col 写入的单元格所在的列索引
         */
            execute: function(name, content, row, col) {
                if (name === "write") {
                    return this.rs("c.write", content, row, col);
                } else if (name === "batchwrite") {
                    this.rs("c.batchwrite", content, row, col);
                } else {
                    return this.rs("c.content", row, col);
                }
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

//src/core/commands/data-validation.js
/**
 * @file 数据验证命令
 * @author hancong03@baiud.com
 */
_p[24] = {
    value: function(require) {
        return _p.r(0).create("RangeCommand", {
            base: _p.r(142),
            name: "datavalidation",
            execBefore: function(name, start, end) {
                var args = [];
                if (arguments.length === 4) {
                    if (typeof start === "number") {
                        args = [ {
                            row: start,
                            col: end
                        }, {
                            row: start,
                            col: end
                        }, arguments[3] ];
                    } else {
                        args = [ start, end, arguments[3] ];
                    }
                } else {
                    var range = this.rs("c.range");
                    args = [ range.getStart(), range.getEnd(), arguments[1] ];
                }
                return args;
            },
            execute: function(name) {
                this[name].apply(this, [].slice.call(arguments, 1));
            },
            datavalidation: function(start, end, options) {
                this.rs("c.set.datavalidation", start, end, options);
            }
        });
    }
};

//src/core/commands/export.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[25] = {
    value: function(require) {
        return _p.r(0).create("ExportCommand", {
            base: _p.r(142),
            name: "export",
            execute: function(commandName) {
                return this[commandName].apply(this, [].slice.call(arguments, 1));
            },
            "export": function(isOnlyData) {
                return this.rs("c.exportworkbook", isOnlyData);
            }
        });
    }
};

//src/core/commands/format.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[26] = {
    value: function(require) {
        return _p.r(0).create("FormatCommand", {
            base: _p.r(142),
            name: "format",
            execBefore: function(name, value, row, col) {
                var range = this.__getRanges(row, col);
                return [ value, range.start, range.end ];
            },
            //queryValueBefore: function (name, row, col) {
            //    var range;
            //    var focus;
            //
            //    if (row === undefined) {
            //        range = this.rs('c.range');
            //        focus = range.getFocus();
            //
            //        return [{
            //            row: focus.row,
            //            col: focus.col
            //        }];
            //    } else {
            //        range = this.__getRanges(row, col);
            //        return [{
            //            row: range.start.row,
            //            col: range.start.col
            //        }];
            //    }
            //},
            execute: function(commandName) {
                return this[commandName].apply(this, [].slice.call(arguments, 1));
            },
            //queryValue: function (name, cell) {
            //    return this['query' + name].apply(this, [].slice.call(arguments, 1));
            //},
            format: function(code, start, end) {
                this.rs("c.set.format", code, start, end);
            },
            //precision: function (value, ranges) {
            //    this.rs('c.set.format.parameter', 'precision', value, ranges);
            //},
            //
            //thousandth: function (value, ranges) {
            //    this.rs('c.set.format.parameter', 'thousandth', value, ranges);
            //},
            //
            //queryprecision: function (cell) {
            //    var result = this.rs('c.get.user.format.parameter', cell.row, cell.col);
            //
            //    if (!result) {
            //        return undefined;
            //    }
            //    return result.precision;
            //},
            __getRanges: function(start, end) {
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
                return {
                    start: start,
                    end: end
                };
            }
        });
    }
};

//src/core/commands/header.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[27] = {
    value: function(require) {
        return _p.r(0).create("ScrollCommand", {
            base: _p.r(142),
            name: "showheader hideheader",
            execute: function(name) {
                this[name]();
            },
            showheader: function() {
                return this.rs("c.show.header");
            },
            hideheader: function() {
                return this.rs("c.hide.header");
            }
        });
    }
};

//src/core/commands/hidden.js
/**
 * @file 行列隐藏
 * @author hancong03@baiud.com
 */
_p[28] = {
    value: function(require) {
        return _p.r(0).create("RangeCommand", {
            base: _p.r(142),
            name: "hiderow hidecolumn cancelhiddenrow cancelhiddencolumn",
            execBefore: function(name) {
                var args = [];
                if (arguments[1] !== undefined) {
                    args[0] = arguments[1];
                }
                if (arguments[2] !== undefined) {
                    args[1] = arguments[2];
                } else if (args.length === 1) {
                    args[1] = args[0];
                }
                if (args.length !== 0) {
                    return args;
                }
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return [];
                }
                var start = range.getStart();
                var end = range.getEnd();
                if (name === "hiderow" || name === "cancelhiddenrow") {
                    return [ start.row, end.row ];
                } else {
                    return [ start.col, end.col ];
                }
            },
            execute: function(name) {
                this[name].apply(this, [].slice.call(arguments, 1));
            },
            hiderow: function(startIndex, endIndex) {
                this.rs("c.hide.row", startIndex, endIndex);
            },
            hidecolumn: function(startIndex, endIndex) {
                this.rs("c.hide.column", startIndex, endIndex);
            },
            cancelhiddenrow: function(startIndex, endIndex) {
                this.rs("c.cancel.hidden.row", startIndex, endIndex);
            },
            cancelhiddencolumn: function(startIndex, endIndex) {
                this.rs("c.cancel.hidden.column", startIndex, endIndex);
            }
        });
    }
};

//src/core/commands/init.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[29] = {
    value: function(require) {
        return _p.r(0).create("InitCommand", {
            base: _p.r(142),
            name: "init load",
            execute: function(commandName, data) {
                this.rs("c.load", data);
            }
        });
    }
};

//src/core/commands/merge.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[30] = {
    value: function(require) {
        return _p.r(0).create("MergeCommand", {
            name: "merge verticalmerge horizontalmerge centermerge unmerge",
            base: _p.r(149),
            execBefore: function(name, row, col) {
                return [ this.__getCells(row, col) ];
            },
            execute: function(name, range) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            centermerge: function(range) {
                if (this.rs("c.has.merge.cell", range)) {
                    this.rs("c.cell.unmerge", range);
                } else {
                    this.rs("c.cell.merge", range);
                    this.execCommand("horizontal", "center", range.start, range.end);
                }
                this.rs("c.range.set", range.start, range.start, range.end);
            },
            merge: function(range) {
                this.rs("c.cell.merge", range);
            },
            unmerge: function(range) {
                this.rs("c.cell.unmerge", range);
            },
            verticalmerge: function(range) {
                this.rs("c.set.vertical.merge", range);
            },
            horizontalmerge: function(range) {
                this.rs("c.set.horizontal.merge", range);
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
                var data = this.cs("c.cell.compare", start, end);
                return {
                    start: data.min,
                    end: data.max
                };
            }
        });
    }
};

//src/core/commands/move.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[31] = {
    value: function(require) {
        return _p.r(0).create("MoveCommand", {
            base: _p.r(142),
            name: "moveright moveup movedown moveleft",
            execute: function(name, count) {
                this[name](count);
            },
            moveright: function(count) {
                var range = this.rs("c.range");
                var originalFocus = range.getOriginalFocus();
                this.corePrepareRefresh();
                var col = this.rs("c.range.right", count);
                this.__updateView(originalFocus.row, col);
                this.coreRefresh();
            },
            moveleft: function(count) {
                var range = this.rs("c.range");
                var originalFocus = range.getOriginalFocus();
                this.corePrepareRefresh();
                var col = this.rs("c.range.left", count);
                this.__updateView(originalFocus.row, col);
                this.coreRefresh();
            },
            moveup: function(count) {
                var range = this.rs("c.range");
                var originalFocus = range.getOriginalFocus();
                this.corePrepareRefresh();
                var row = this.rs("c.range.up", count);
                this.__updateView(row, originalFocus.col);
                this.coreRefresh();
            },
            movedown: function(count) {
                var range = this.rs("c.range");
                var originalFocus = range.getOriginalFocus();
                this.corePrepareRefresh();
                var row = this.rs("c.range.down", count);
                this.__updateView(row, originalFocus.col);
                this.coreRefresh();
            },
            __updateView: function(row, col) {
                var struct = this.rs("c.struct");
                switch (struct.getViewPosition(row, col)) {
                  case "leftTop":
                    this.rs("c.updateview", {
                        rowTo: row,
                        columnTo: col
                    });
                    break;

                  case "leftBottom":
                    this.rs("c.updateview", {
                        rowToEnd: row,
                        columnTo: col
                    });
                    break;

                  case "rightTop":
                    this.rs("c.updateview", {
                        rowTo: row,
                        columnToEnd: col
                    });
                    break;

                  case "rightBottom":
                    this.rs("c.updateview", {
                        rowToEnd: row,
                        columnToEnd: col
                    });
                    break;

                  case "left":
                    this.rs("c.col.scrollto", col);
                    break;

                  case "top":
                    this.rs("c.row.scrollto", row);
                    break;

                  case "bottom":
                    this.rs("c.scroll.row.to.end", row);
                    break;

                  case "right":
                    this.rs("c.scroll.column.to.end", col);
                    break;

                  case "in":
                    // nothing
                    break;
                }
            }
        });
    }
};

//src/core/commands/numberformat.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[32] = {
    value: function(require) {
        return _p.r(0).create("NumberFormatCommand", {
            base: _p.r(149),
            execBefore: function(name) {
                var args = [];
                var data;
                data = this.__getCells(arguments[2], arguments[3]);
                args[0] = arguments[1];
                args[1] = data.start;
                args[2] = data.end;
                return args;
            },
            execute: function(name, value, start, end) {
                this.rs("c.numberformat", value, start, end);
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

//src/core/commands/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[33] = {
    value: function(require) {
        return _p.r(0).create("RangeCommand", {
            base: _p.r(142),
            name: "focus expandright expandleft expanddown expandup selectall selectcolumn selectrow",
            execute: function(name) {
                this[name].apply(this, [].slice.call(arguments, 1));
            },
            focus: function(row, col) {
                this.__update(row, col);
                this.rs("c.range.focus", row, col);
            },
            selectall: function() {
                this.rs("c.select.all");
            },
            selectcolumn: function(startIndex, endIndex) {
                this.rs("c.select.column", startIndex, endIndex);
            },
            selectrow: function(startIndex, endIndex) {
                this.rs("c.select.row", startIndex, endIndex);
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

//src/core/commands/readonly.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[34] = {
    value: function(require) {
        return _p.r(0).create("FormatCommand", {
            base: _p.r(142),
            name: "readonly",
            execute: function(commandName, value) {
                this.rs("c.set.readonly", !!value);
            },
            queryValue: function() {
                return this.rs("c.is.readonly");
            }
        });
    }
};

//src/core/commands/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[35] = {
    value: function(require) {
        return _p.r(0).create("ResizeCommand", {
            name: "resizerow resizecol",
            base: _p.r(149),
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
                var struct = this.rs("c.struct");
                if (name === "resizerow") {
                    size = struct.getRawRowHeight(index);
                } else {
                    size = struct.getRawColumnWidth(index);
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
_p[36] = {
    value: function(require) {
        return _p.r(0).create("ScrollCommand", {
            base: _p.r(142),
            name: "scroll scrollto scrollrowto scrollcolumnto scrollrow scrollcolumn updateview",
            execute: function(name, count, toEnd) {
                this[name](count, toEnd);
            },
            scroll: function(rowCount, colCount) {
                return this.rs("c.scroll", rowCount, colCount);
            },
            scrollto: function(row, col) {
                return this.rs("c.scrollto", row, col);
            },
            scrollrowto: function(row, toEnd) {
                return this.rs("c.row.scrollto", row, !!toEnd);
            },
            scrollcolumnto: function(col, toEnd) {
                return this.rs("c.col.scrollto", col, !!toEnd);
            },
            scrollrow: function(count) {
                return this.rs("c.row.scroll", count);
            },
            scrollcolumn: function(count) {
                return this.rs("c.col.scroll", count);
            },
            updateview: function(viewState) {
                return this.rs("c.updateview", viewState);
            }
        });
    }
};

//src/core/commands/sheet.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[37] = {
    value: function(require) {
        return _p.r(0).create("StyleCommand", {
            name: "createsheet switchsheet sheetname sheetnames sheetindex importsheet",
            base: _p.r(149),
            execute: function(name) {
                return this[name].apply(this, [].slice.call(arguments, 1));
            },
            createsheet: function(sheetNaem) {
                this.rs("c.createsheet", sheetNaem);
            },
            switchsheet: function(index) {
                this.rs("c.switchsheet", index);
            },
            importsheet: function(index, sheetData) {
                this.rs("c.importsheet", index, sheetData);
            },
            queryValue: function(name) {
                return this["query" + name].apply(this, [].slice.call(arguments, 1));
            },
            querysheetname: function() {
                return this.rs("c.get.sheetname");
            },
            querysheetnames: function() {
                return this.rs("c.get.sheetnames");
            },
            querysheetindex: function() {
                return this.rs("c.get.sheetindex");
            }
        });
    }
};

//src/core/commands/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[38] = {
    value: function(require) {
        return _p.r(0).create("StyleCommand", {
            name: "color fontsize font bold italic fill horizontal vertical underline throughline wraptext cellstyles",
            base: _p.r(149),
            execBefore: function(name) {
                var args = [];
                var data;
                switch (name) {
                  case "bold":
                  case "underline":
                  case "throughline":
                  case "italic":
                  case "wraptext":
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
                var range = this.rs("c.range");
                // 停止命令执行
                if (!range.isValid()) {
                    return false;
                }
                var focus = range.getFocus();
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
                this.rs("c.setstyle", "size", val, start, end);
            },
            font: function(val, start, end) {
                this.rs("c.setstyle", "name", val, start, end);
            },
            italic: function(start, end) {
                var struct = this.rs("c.struct");
                var fontStyle = struct.getUserStyle("fonts", start.row, start.col);
                if (fontStyle && fontStyle.italic) {
                    this.rs("c.setstyle", "italic", false, start, end);
                } else {
                    this.rs("c.setstyle", "italic", true, start, end);
                }
            },
            bold: function(start, end) {
                var struct = this.rs("c.struct");
                var fontStyle = struct.getUserStyle("fonts", start.row, start.col);
                if (fontStyle && fontStyle.bold) {
                    this.rs("c.setstyle", "bold", false, start, end);
                } else {
                    this.rs("c.setstyle", "bold", true, start, end);
                }
            },
            wraptext: function(start, end) {
                var struct = this.rs("c.struct");
                var alignmentStyle = struct.getUserStyle("alignments", start.row, start.col);
                if (alignmentStyle && alignmentStyle.wraptext) {
                    this.rs("c.setstyle", "wraptext", false, start, end);
                } else {
                    this.rs("c.setstyle", "wraptext", true, start, end);
                }
            },
            underline: function(start, end) {
                var struct = this.rs("c.struct");
                var fontStyle = struct.getUserStyle("fonts", start.row, start.col);
                if (fontStyle && fontStyle.underline) {
                    this.rs("c.setstyle", "underline", false, start, end);
                } else {
                    this.rs("c.setstyle", "underline", true, start, end);
                }
            },
            throughline: function(start, end) {
                var struct = this.rs("c.struct");
                var fontStyle = struct.getUserStyle("fonts", start.row, start.col);
                if (fontStyle && fontStyle.throughline) {
                    this.rs("c.setstyle", "throughline", false, start, end);
                } else {
                    this.rs("c.setstyle", "throughline", true, start, end);
                }
            },
            fill: function(val, start, end) {
                this.rs("c.setstyle", "fill", val, start, end);
            },
            horizontal: function(val, start, end) {
                this.rs("c.setstyle", "horizontal", val, start, end);
            },
            vertical: function(val, start, end) {
                this.rs("c.setstyle", "vertical", val, start, end);
            },
            cellstyles: function(value, start, end) {
                var struct = this.rs("c.struct");
                this.rs("c.set.cellstyles", value, start, end);
            },
            /* ------------ query -----------*/
            queryfont: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value && value.name !== "none") {
                    return value.name;
                }
                return undefined;
            },
            querycolor: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value && value.color !== "none") {
                    return value.color;
                }
                return undefined;
            },
            queryfontsize: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value && value.size !== "none") {
                    return value.size;
                }
                return undefined;
            },
            querybold: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value) {
                    return !!value.bold;
                }
                return false;
            },
            querywraptext: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("alignments", row, col);
                if (value) {
                    return !!value.wraptext;
                }
                return false;
            },
            queryunderline: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value) {
                    return !!value.underline;
                }
                return false;
            },
            querythroughline: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value) {
                    return !!value.throughline;
                }
                return false;
            },
            queryitalic: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fonts", row, col);
                if (value) {
                    return !!value.italic;
                }
                return false;
            },
            queryfill: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("fills", row, col);
                if (value && value.fill !== "none") {
                    return value.fill;
                }
                return undefined;
            },
            queryhorizontal: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("alignments", row, col);
                if (value && value.horizontal !== "none") {
                    return value.horizontal;
                }
                return undefined;
            },
            queryvertical: function(row, col) {
                var struct = this.rs("c.struct");
                var value = struct.getUserStyle("alignments", row, col);
                if (value && value.vertical !== "none") {
                    return value.vertical;
                }
                return undefined;
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

//src/core/comments.js
/**
 * @file 控制只读模式的开闭
 * @author hancong03@baiud.com
 */
_p[39] = {
    value: function(require) {
        var Comments = _p.r(0).create("Comments", {
            cache: null,
            cellModule: null,
            base: _p.r(146),
            init: function(dataAccess, cellModule) {
                this.dataAccess = dataAccess;
                this.cellModule = cellModule;
                this.initService();
                this.initMessageHook();
            },
            initService: function() {
                this.registerService({
                    "c.set.comments": this.setComments,
                    "c.get.comments": this.getComments,
                    "c.clear.comments": this.clearComments
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.refresh
                });
            },
            refresh: function() {
                // clearcache
                this.cache = null;
            },
            getCommentsInView: function() {
                if (this.cache) {
                    return this.cache;
                }
                var cellModule = this.cellModule;
                var result = {};
                var grid = this.dataAccess.getGrid();
                var rowMap = grid.rowMap;
                var colMap = grid.colMap;
                var row;
                var col;
                var content;
                var mergeCell;
                var key;
                var record = {};
                for (var i = 0, len = rowMap.length; i < len; i++) {
                    row = rowMap[i];
                    for (var j = 0, jlen = colMap.length; j < jlen; j++) {
                        col = colMap[j];
                        mergeCell = cellModule.getMergeCell(row, col);
                        if (mergeCell) {
                            row = mergeCell.start.row;
                            col = mergeCell.start.col;
                        }
                        key = row + "," + col;
                        if (record[key]) {
                            continue;
                        }
                        record[key] = true;
                        content = this.dataAccess.getComments(row, col);
                        if (!content) {
                            continue;
                        }
                        result[row + "," + col] = {
                            row: row,
                            col: col,
                            content: content
                        };
                    }
                }
                this.cache = result;
                return result;
            },
            getComments: function(row, col) {
                return this.dataAccess.getComments(row, col);
            },
            setComments: function(row, col, content) {
                this.dataAccess.setComments(row, col, content);
                this.coreRefresh(true);
            },
            clearComments: function(row, col) {
                this.dataAccess.clearComments(row, col);
                this.coreRefresh(true);
            }
        });
        Comments.deps = [ "dataAccess", "cell" ];
        return Comments;
    }
};

//src/core/common.js
/**
 * @file core层通用函数包，提供一些常用功能，以助于减少业务代码的重复
 * @author hancong03@baiud.com
 */
_p[40] = {
    value: function(require) {
        var $ = _p.r(2);
        return {
            formatCellIndex: function(row, col) {
                if (col !== undefined) {
                    if (typeof row === "number") {
                        return {
                            row: row,
                            col: col
                        };
                    } else {
                        return {
                            start: {
                                row: row.row,
                                col: row.col
                            },
                            end: {
                                row: col.row,
                                col: col.col
                            }
                        };
                    }
                }
                return row;
            }
        };
    }
};

//src/core/data-validation.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[41] = {
    value: function(require) {
        var common = _p.r(40);
        var DataValidation = _p.r(0).create("DataValidation", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.set.datavalidation": this.setDataValidation
                });
            },
            setDataValidation: function(start, end, options) {
                this.dataAccess.setDataValidation(start, end, options);
            }
        });
        DataValidation.deps = [ "dataAccess" ];
        return DataValidation;
    }
};

//src/core/data/basic.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[42] = {
    value: function(require) {
        return {
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
            focus: {
                row: -1,
                col: -1
            },
            originalFocus: {
                row: -1,
                col: -1
            },
            selections: [],
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
            writable: false,
            boundary: {},
            space: {},
            local: {},
            wraptextRecord: {},
            computedValue: {},
            formattedValue: {},
            standardValue: {},
            formatColor: {},
            // 公式解析后token列表
            formulaToken: [],
            // 公式计算结果
            formulaValue: [],
            // 公式到单元格的引用关系
            formulaToCellRel: [],
            // 单元格到格式的引用关系
            cellToFormulaRel: {
                row: {},
                column: {},
                cell: []
            },
            // 数据有效性record map
            validationRecord: {}
        };
    }
};

//src/core/data/data-access.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[43] = {
    value: function(require) {
        var basic = _p.r(42);
        var SYS_CONFIG = _p.r(14);
        // TODO 解决引用问题
        var KernelHelper = _p.r(162);
        return _p.r(0).create("DataAccess", $.extend({
            base: _p.r(146),
            data: null,
            init: function() {
                this.importWorkbook(this.createWorkbook());
            },
            createWorkbook: function() {
                var data = this.kernelCreateWorkbook();
                this.__extendData(data);
                return data;
            },
            createSheet: function() {
                var sheetData = this.kernelCreateSheet();
                $.extend(sheetData, $._clone(basic));
                return sheetData;
            },
            importWorkbook: function(data) {
                data = this.kernelImportWorkbook(data);
                this.__extendData(data);
                this.data = data;
            },
            importSheet: function(index, sheetData) {
                sheetData = this.kernelImportSheet(sheetData);
                this.kernelInertSheet(index, sheetData);
                $.extend(sheetData, $._clone(basic));
            },
            exportWorkbook: function(isOnlyData) {
                return this.kernelExportWorkbook(isOnlyData);
            },
            __extendData: function(data) {
                var sheetsData = data.sheets;
                for (var i = 0, len = sheetsData.length; i < len; i++) {
                    $.extend(sheetsData[i], $._clone(basic));
                }
            },
            /* --- 读取 --- */
            getGrid: function() {
                return this.kernelGetActiveData().grid;
            },
            getSheetName: function() {
                return this.kernelGetSheetName();
            },
            getSheetNames: function() {
                return this.kernelGetSheetNames();
            },
            getSheetIndex: function() {
                return this.kernelGetSheetIndex();
            },
            getPane: function() {
                return this.kernelGetPane();
            },
            getOffset: function() {
                return SYS_CONFIG.border.offset;
            },
            getViewStart: function() {
                return this.kernelGetActiveData().viewStart;
            },
            getViewEnd: function() {
                return this.kernelGetActiveData().viewEnd;
            },
            getVisibleCount: function() {
                return this.kernelGetActiveData().visibleCount;
            },
            getBorderWidth: function() {
                return SYS_CONFIG.border.width;
            },
            getTotal: function() {
                return this.kernelGetTotal();
            },
            getTotalIndex: function() {
                return this.kernelGetTotalIndex();
            },
            getBoundary: function() {
                return this.kernelGetActiveData().boundary;
            },
            getSpace: function() {
                return this.kernelGetActiveData().space;
            },
            getAutoSize: function(row) {
                return this.kernelGetActiveData().auto[row];
            },
            getComputedValue: function(row, col) {
                return this.kernelGetActiveData().computedValue[this.indexToKey(row, col)];
            },
            getFormattedValue: function(row, col) {
                return this.kernelGetActiveData().formattedValue[this.indexToKey(row, col)];
            },
            getStandardValue: function(row, col) {
                return this.kernelGetActiveData().standardValue[this.indexToKey(row, col)];
            },
            getNumberFormat: function(row, col) {
                return this.kernelGetNumberFormat(row, col);
            },
            getDefaultStyle: function(classify) {
                return this.kernelGetDefaultStyle(classify);
            },
            getValue: function(row, col) {
                return this.kernelGetValue(row, col);
            },
            getStyle: function(classify, row, col) {
                return this.kernelGetStyle(classify, row, col);
            },
            isShowHeader: function() {
                return this.kernelIsShowHeader();
            },
            getStyleById: function(classify, id) {
                return this.kernelGetStyleById(classify, id);
            },
            getStyleIds: function(classify, start, end) {
                return this.kernelGetStyleIds(classify, start, end);
            },
            getEffectiveIndex: function() {
                var effectiveIndex = this.kernelGetActiveData().effective;
                return {
                    row: effectiveIndex.row,
                    col: effectiveIndex.col
                };
            },
            getDimension: function() {
                return this.kernelGetDimension();
            },
            getCellType: function(row, col) {
                return this.kernelGetCellType(row, col);
            },
            getBorder: function(row, col) {
                return this.kernelGetBorder(row, col);
            },
            getBorders: function(start, end) {
                return this.kernelGetBorders(start, end);
            },
            getMergeCell: function(row, col) {
                return this.kernelGetMergeCell(row, col);
            },
            getMergeCellsInRange: function(range) {
                return this.kernelGetMergeCellsInRange(range);
            },
            isMergeCell: function(row, col) {
                return this.kernelIsMergeCell(row, col);
            },
            isReadonly: function() {
                return this.data.readonly;
            },
            hasMergeCell: function(range) {
                return this.kernelHasMergeCellInRange(range);
            },
            isSameMergeCell: function(cells) {
                return this.kernelIsSameMergeCell(cells);
            },
            getWraptextRecord: function(row, col) {
                return this.kernelGetActiveData().wraptextRecord[this.indexToKey(row, col)];
            },
            getFormatColor: function(row, col) {
                return this.kernelGetActiveData().formatColor[this.indexToKey(row, col)];
            },
            /* ---- setter ---- */
            clearContent: function(ranges) {
                this.kernelClearValue(ranges);
            },
            switchSheet: function(index) {
                this.kernelSwitchSheet(index);
            },
            setTotal: function(row, col) {
                this.kernelSetTotal(row, col);
            },
            addSheetName: function(sheetName) {
                return this.kernelAddSheetName(sheetName);
            },
            setSpace: function(width, height) {
                this.kernelGetActiveData().space = {
                    width: width,
                    height: height
                };
            },
            setGrid: function(grid) {
                this.kernelGetActiveData().grid = grid;
            },
            setNumberFormat: function(code, start, end) {
                this.kernelSetNumberFormat(code, start, end);
            },
            clearNumberFormat: function(start, end) {
                this.kernelClearNumberFormat(start, end);
            },
            setBorder: function(borderOption, start, end) {
                this.kernelSetBorder(borderOption, start, end);
            },
            setOuterBorder: function(borderData, start, end) {
                this.kernelSetOuterBorder(borderData, start, end);
            },
            clearBorder: function(start, end) {
                this.kernelClearBorder(start, end);
            },
            setVisibleCount: function(row, col) {
                this.kernelGetActiveData().visibleCount = {
                    row: row,
                    col: col
                };
            },
            setViewStart: function(row, col) {
                this.kernelGetActiveData().viewStart = {
                    row: row,
                    col: col
                };
            },
            setViewStartRow: function(row) {
                this.kernelGetActiveData().viewStart.row = row;
            },
            setViewStartCol: function(col) {
                this.kernelGetActiveData().viewStart.col = col;
            },
            setViewEnd: function(row, col) {
                this.kernelGetActiveData().viewEnd = {
                    row: row,
                    col: col
                };
            },
            setComputedValue: function(value, row, col) {
                if (value) {
                    this.kernelGetActiveData().computedValue[this.indexToKey(row, col)] = value;
                } else {
                    this.clearComputedValue(row, col);
                }
            },
            clearComputedValue: function(row, col) {
                this.kernelGetActiveData().computedValue[this.indexToKey(row, col)] = undefined;
            },
            setFormattedValue: function(value, row, col) {
                if (value) {
                    this.kernelGetActiveData().formattedValue[this.indexToKey(row, col)] = value;
                } else {
                    this.clearFormattedValue(row, col);
                }
            },
            clearFormattedValue: function(row, col) {
                this.kernelGetActiveData().formattedValue[this.indexToKey(row, col)] = undefined;
            },
            setFormatColor: function(value, row, col) {
                if (value) {
                    this.kernelGetActiveData().formatColor[this.indexToKey(row, col)] = value;
                } else {
                    this.clearFormatColor(row, col);
                }
            },
            clearFormatColor: function(row, col) {
                this.kernelGetActiveData().formatColor[this.indexToKey(row, col)] = undefined;
            },
            setStandardValue: function(value, row, col) {
                if (value) {
                    this.kernelGetActiveData().standardValue[this.indexToKey(row, col)] = value;
                } else {
                    this.clearStandardValue(row, col);
                }
            },
            setReadonly: function(state) {
                this.data.readonly = !!state;
            },
            clearStandardValue: function(row, col) {
                this.kernelGetActiveData().standardValue[this.indexToKey(row, col)] = undefined;
            },
            setBoundary: function(width, height) {
                this.kernelGetActiveData().boundary = {
                    width: width,
                    height: height
                };
            },
            setCellType: function(type, row, col) {
                this.kernelSetCellType(type, row, col);
            },
            clearCellType: function(row, col) {
                this.kernelClearCellType(row, col);
            },
            setMerge: function(range) {
                return this.kernelSetMerge(range);
            },
            unmergeCell: function(range) {
                return this.kernelUnmerge(range);
            },
            setHorizontalMerge: function(range) {
                return this.kernelSetHorizontalMerge(range);
            },
            setVerticalMerge: function(range) {
                return this.kernelSetVerticalMerge(range);
            },
            setHeaderState: function(state) {
                this.kernelSetHeaderState(state);
            },
            setValue: function(content, row, col) {
                var effectiveIndex = this.kernelGetActiveData().effective;
                this.kernelSetValue(content, row, col);
                if (content) {
                    effectiveIndex.row = Math.max(effectiveIndex.row, row);
                    effectiveIndex.col = Math.max(effectiveIndex.col, col);
                    return;
                }
            },
            clearValue: function(row, col) {
                this.setValue(undefined, row, col);
            },
            batchSetValue: function(contents, row, col) {
                this.kernelBatchSetValue(contents, row, col);
            },
            setStyle: function(styleName, styleValue, start, end) {
                this.kernelSetStyle.apply(this, arguments);
            },
            batchSetStyle: function(styleOptions, start, end) {
                this.kernelBatchSetStyle(styleOptions, start, end);
            },
            setCellStyles: function(styleOption, start, end) {
                this.kernelSetXfStyle(styleOption, start, end);
            },
            clearStyle: function(styleName, start, end) {
                this.kernelClearStyle.apply(this, arguments);
            },
            setColumnStyle: function(styleName, styleValue, startIndex, endIndex) {
                this.kernelSetColumnStyle.apply(this, arguments);
            },
            setRowStyle: function(styleName, styleValue, startIndex, endIndex) {
                this.kernelSetRowStyle.apply(this, arguments);
            },
            setAutoSize: function(size, row) {
                this.kernelGetActiveData().auto[row] = size || undefined;
            },
            clearAutoSize: function() {
                this.kernelGetActiveData().auto = {};
            },
            resetAutoSize: function(row) {
                this.kernelGetActiveData().auto[row] = undefined;
            },
            recordWraptext: function(contents, row, col) {
                this.kernelGetActiveData().wraptextRecord[this.indexToKey(row, col)] = contents;
            },
            clearWraptextRecord: function(row, col) {
                this.kernelGetActiveData().wraptextRecord[this.indexToKey(row, col)] = undefined;
            },
            exchangeRow: function(index, range) {
                var autoData = this.kernelGetActiveData().auto;
                this.kernelExchangeRow(index, range);
                KernelHelper.exchangeRow(this.data.type, index, range);
                // clear auto size
                for (var i = range.start.row, limit = range.end.row; i <= limit; i++) {
                    autoData[i] = undefined;
                }
            }
        }, _p.r(173), _p.r(49), _p.r(47), _p.r(44), _p.r(46), _p.r(50), _p.r(48), _p.r(45)));
    }
};

//src/core/data/funs/comments.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[44] = {
    value: {
        getComments: function(row, col) {
            return this.kernelGetComments(row, col);
        },
        setComments: function(row, col, content) {
            return this.kernelSetComments(row, col, content);
        },
        clearComments: function(row, col) {
            return this.kernelClearComments(row, col);
        }
    }
};

//src/core/data/funs/data-validation.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[45] = {
    value: {
        setDataValidation: function(start, end, options) {
            this.kernelSetDataValidation(start, end, options);
        }
    }
};

//src/core/data/funs/expand.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[46] = {
    value: {
        expandRow: function(count) {
            this.kernelExpandRow(count);
        },
        expandCol: function(count) {
            this.kernelExpandCol(count);
        }
    }
};

//src/core/data/funs/formula.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[47] = {
    value: {
        getArrayReference: function(row, col) {
            return this.kernelGetArrayReference(row, col);
        },
        setArrayReference: function(start, end) {
            this.kernelSetArrayReference(start, end);
        },
        clearArrayReference: function(row, col) {
            this.kernelClearArrayReference(row, col);
        },
        getFormulaToken: function(row, col) {
            var tokenData = this.kernelGetActiveData().formulaToken;
            if (tokenData[row] && tokenData[row][col]) {
                return tokenData[row][col];
            }
            return undefined;
        },
        setFormulaToken: function(row, col, token) {
            if (!token) {
                this.clearFormulaToken(row, col);
            }
            var tokenData = this.kernelGetActiveData().formulaToken;
            var currentRow = tokenData[row];
            if (!currentRow) {
                tokenData[row] = [];
                currentRow = tokenData[row];
            }
            currentRow[col] = token;
        },
        clearFormulaToken: function(row, col) {
            var tokenData = this.kernelGetActiveData().formulaToken;
            if (tokenData[row] && tokenData[row][col]) {
                tokenData[row][col] = undefined;
            }
        },
        getFormulaValue: function(row, col) {
            var valueData = this.kernelGetActiveData().formulaValue;
            if (valueData[row] && valueData[row][col]) {
                return valueData[row][col];
            }
            return undefined;
        },
        setFormulaValue: function(row, col, value) {
            if (!value) {
                this.clearFormulaValue(row, col);
            }
            var valueData = this.kernelGetActiveData().formulaValue;
            var currentRow = valueData[row];
            if (!currentRow) {
                valueData[row] = [];
                currentRow = valueData[row];
            }
            currentRow[col] = value;
        },
        clearFormulaValue: function(row, col) {
            var valueData = this.kernelGetActiveData().formulaValue;
            if (valueData[row] && valueData[row][col]) {
                valueData[row][col] = undefined;
            }
        },
        getFormulaToCellRel: function(row, col) {
            var relData = this.kernelGetActiveData().formulaToCellRel;
            if (relData[row] && relData[row][col]) {
                return relData[row][col];
            }
            return undefined;
        },
        setFormulaToCellRel: function(row, col, rels) {
            if (!rels) {
                this.clearFormulaToCellRel(row, col);
            }
            var relData = this.kernelGetActiveData().formulaToCellRel;
            var currentRow = relData[row];
            if (!currentRow) {
                relData[row] = [];
                currentRow = relData[row];
            }
            currentRow[col] = rels;
        },
        clearFormulaToCellRel: function(row, col) {
            var relData = this.kernelGetActiveData().formulaToCellRel;
            if (relData[row] && relData[row][col]) {
                relData[row][col] = undefined;
            }
        },
        // 单元格到公式的引用关系的策略由具体模块（Formula）决定
        getCellToFormulaRel: function() {
            return this.kernelGetActiveData().cellToFormulaRel;
        }
    }
};

//src/core/data/funs/hidden.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[48] = {
    value: {
        getHiddenRow: function(row) {
            return this.kernelGetHiddenRow(row);
        },
        getHiddenColumn: function(col) {
            return this.kernelGetHiddenColumn(col);
        },
        setHiddenRow: function(row, value) {
            this.kernelSetHiddenRow(row, value);
        },
        setHiddenColumn: function(col, value) {
            this.kernelSetHiddenColumn(col, value);
        },
        clearHiddenRow: function(row) {
            this.kernelClearHiddenRow(row);
        },
        clearHiddenColumn: function(col) {
            this.kernelClearHiddenColumn(col);
        }
    }
};

//src/core/data/funs/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[49] = {
    value: {
        getFocus: function() {
            return this.kernelGetActiveData().focus;
        },
        getStart: function() {
            return this.kernelGetActiveData().selections[0].start;
        },
        getEnd: function() {
            return this.kernelGetActiveData().selections[0].end;
        },
        getSelection: function() {
            return this.kernelGetActiveData().selections;
        },
        getOriginalFocus: function() {
            return this.kernelGetActiveData().originalFocus;
        },
        setFocus: function(row, col) {
            this.kernelGetActiveData().focus = {
                row: row,
                col: col
            };
        },
        setOriginalFocus: function(row, col) {
            this.kernelGetActiveData().originalFocus = {
                row: row,
                col: col
            };
        },
        setSelection: function(start, end) {
            this.kernelGetActiveData().selections[0] = {
                start: {
                    row: start.row,
                    col: start.col
                },
                end: {
                    row: end.row,
                    col: end.col
                }
            };
        },
        getWritable: function() {
            return this.kernelGetActiveData().writable;
        },
        setWritable: function(value) {
            this.kernelGetActiveData().writable = value;
        },
        clearRange: function() {
            var activeData = this.kernelGetActiveData();
            activeData.focus = {
                row: -1,
                col: -1
            };
            activeData.originalFocus = {
                row: -1,
                col: -1
            };
            activeData.selections = [];
        }
    }
};

//src/core/data/funs/row-column.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[50] = {
    value: {
        getColumnWidth: function(col) {
            return this.kernelGetColumnWidth(col);
        },
        getRowHeight: function(row) {
            return this.kernelGetRowHeight(row);
        },
        setColumnWidth: function(size, col) {
            this.kernelSetColumnWidth(size, col);
        },
        setRowHeight: function(size, row) {
            this.kernelSetRowHeight(size, row);
        },
        clearRowHeight: function(row) {
            this.kernelClearRowHeight(row);
        },
        clearColumnWidth: function(col) {
            this.kernelClearColumnWidth(col);
        }
    }
};

//src/core/datetime/datetime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[51] = {
    value: function(require) {
        var ONE_DAY = 24 * 3600 * 1e3;
        var START_POINT = new Date(Date.UTC(1899, 11, 31, 0, 0, 0));
        return _p.r(0).create("DateTime", {
            base: _p.r(146),
            dateValueOf: function(dateStr) {
                var date = new Date(dateStr);
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
                return (date - START_POINT) / ONE_DAY + 1;
            }
        });
    }
};

//src/core/definition/fvalue-type.js
/**
 * @file 公式计算结果值类型
 * @author hancong03@baiud.com
 */
_p[52] = {
    value: {
        ARRAY: "ARRAY",
        TEXT: "TEXT",
        NUMBER: "NUMBER",
        LOGICAL: "LOGICAL",
        ERROR: "ERROR",
        UNDEFINED: "UNDEFINED"
    }
};

//src/core/definition/operand-type.js
/**
 * @file 公式计算过程中的值类型
 * @author hancong03@baiud.com
 */
_p[53] = {
    value: function(require) {
        return $.extend($._clone(_p.r(52)), {
            UNION: "UNION",
            RANGE: "RANGE"
        });
    }
};

//src/core/definition/token-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[54] = {
    value: {
        TYPE: {
            NOOP: "NOOP",
            OPERAND: "OPERAND",
            FUNCTION: "FUNCTION",
            SUBEXPR: "SUBEXPR",
            ARGUMENT: "ARGUMENT",
            OP_PRE: "OP_PRE",
            OP_IN: "OP_IN",
            OP_POST: "OP_POST",
            WSPACE: "WSPACE",
            UNKNOWN: "UNKNOWN",
            ARRAY: "ARRAY",
            ARRAYROW: "ARRAYROW",
            // ext
            LEFT_BRACKET: "(",
            RIGHT_BRACKET: ")"
        },
        SUBTYPE: {
            START: "START",
            STOP: "STOP",
            TEXT: "TEXT",
            NUMBER: "NUMBER",
            LOGICAL: "LOGICAL",
            ERROR: "ERROR",
            RANGE: "RANGE",
            MATH: "MATH",
            CONCAT: "CONCAT",
            INTERSECT: "INTERSECT",
            // 可同时用于操作符和操作数类型
            UNION: "UNION"
        }
    }
};

//src/core/device.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[55] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("Device", {
            contentPanel: null,
            $contentPanel: null,
            style: null,
            dataAccess: null,
            valueModule: null,
            base: _p.r(146),
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
                var config = this.getSystemConfig();
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

//src/core/export-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[56] = {
    value: function(require) {
        var ExportManager = _p.r(0).create("ExportManager", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.exportworkbook": this.export,
                    "c.import": this.import
                });
            },
            "export": function(isOnlyData) {
                return this.dataAccess.exportWorkbook(isOnlyData);
            },
            "import": function(data) {
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                data = $._clone(data);
                if (data && !data.styleGroup) {
                    data.cellType = this.__initCellType(data.sheets);
                }
                this.dataAccess.importWorkbook(data);
            },
            __initCellType: function(sheets) {
                var cellType = [];
                var sheetTypes;
                var currentSheetData;
                var rowSheets;
                var rowTypes;
                for (var i = 0, len = sheets.length; i < len; i++) {
                    sheetTypes = [];
                    cellType.push(sheetTypes);
                    currentSheetData = sheets[i];
                    for (var j = 0, jlen = currentSheetData.length; j < jlen; j++) {
                        rowSheets = currentSheetData[j];
                        rowTypes = [];
                        if (!rowSheets) {
                            continue;
                        }
                        for (var k = 0, klen = rowSheets.length; k < klen; k++) {
                            if (rowSheets[k]) {
                                rowTypes[k] = this.rs("c.format.type", rowSheets[k] + "");
                            }
                        }
                        sheetTypes[j] = rowTypes;
                    }
                }
                return cellType;
            }
        });
        ExportManager.deps = [ "dataAccess", "value" ];
        return ExportManager;
    }
};

//src/core/format/format.js
/**
 * @file 格式化工具
 * @author hancong03@baiud.com
 */
_p[57] = {
    value: function(require) {
        var Value = _p.r(0).create("Value", {
            base: _p.r(146),
            init: function() {},
            isNumber: function(value) {
                return $.isNumeric(value);
            },
            isDatetime: function(value) {
                var parts = value.split(/\s+/);
                if (parts.length > 2) {
                    return false;
                }
                if (parts.length === 1) {
                    parts.unshift("1970-1-1 ");
                }
                var date = new Date(parts.join(" "));
                if (!isNaN(date - 0)) {
                    return true;
                }
                return false;
            },
            isFraction: function(value) {
                return /^([\d]+ )?\d+\/\d+$/.test(value);
            }
        });
        Value.deps = [ "dataAccess", "formula", "valueSecurity" ];
        return Value;
    }
};

//src/core/formula/cell-relation.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[58] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        return {
            getCells: function(tokens) {
                var token;
                var currentCells;
                var rowCells;
                var cells = [];
                // 重复记录
                var record = {};
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    if (token.type !== TOKEN_TYPE.OPERAND) {
                        continue;
                    }
                    token = token.value;
                    if (token.type !== TOKEN_SUBTYPE.RANGE && token.type !== TOKEN_SUBTYPE.UNION) {
                        continue;
                    }
                    currentCells = token.value;
                    for (var j = 0, jlen = currentCells.length; j < jlen; j++) {
                        rowCells = currentCells[j];
                        for (var k = 0, klen = rowCells.length; k < klen; k++) {
                            cells.push(rowCells[k]);
                        }
                    }
                }
                // ------- 去重
                var current;
                var key;
                var result = [];
                for (var i = 0, len = cells.length; i < len; i++) {
                    current = cells[i];
                    key = current.row + "," + current.col;
                    if (record[key]) {
                        continue;
                    }
                    record[key] = true;
                    result.push(current);
                }
                return result;
            }
        };
    }
};

//src/core/formula/formula.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[59] = {
    value: function(require) {
        var Parser = _p.r(79);
        var CellRelation = _p.r(58);
        var MathRuntime = _p.r(73);
        var Formula = _p.r(0).create("Formula", {
            dataAccess: null,
            valueModule: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.mathRuntime = this.createComponent(MathRuntime);
            },
            bind: function(valueModule) {
                this.valueModule = valueModule;
                this.mathRuntime.bind(valueModule);
            },
            isArrayFormula: function(row, col) {
                return !!this.dataAccess.getArrayReference(row, col);
            },
            getComputedValueInfo: function(row, col) {
                var valueInfo = this.dataAccess.getFormulaValue(row, col);
                if (valueInfo) {
                    return valueInfo;
                }
                var arrayRef = this.dataAccess.getArrayReference(row, col);
                if (arrayRef) {
                    return this.__getComputedArrayValueInfo(row, col, arrayRef);
                }
                var formulaTokens = this.getTokens(row, col);
                var result = this.mathRuntime.exec(formulaTokens);
                this.dataAccess.setFormulaValue(row, col, result);
                return result;
            },
            __getComputedArrayValueInfo: function(row, col, arrayRef) {
                var startRow = arrayRef.start.row;
                var startCol = arrayRef.start.col;
                var endRow = arrayRef.end.row;
                var endCol = arrayRef.end.col;
                var formulaTokens = this.getTokens(startRow, startCol);
                var result = this.mathRuntime.execArray(formulaTokens, arrayRef.start, arrayRef.end);
                var r;
                var c;
                for (var i = 0, r = startRow, limit = endRow - startRow; i <= limit; i++, r++) {
                    for (var j = 0, c = startCol, jlimit = endCol - startCol; j <= jlimit; j++, c++) {
                        this.dataAccess.setFormulaValue(r, c, result[i][j]);
                    }
                }
                return result[row - startRow][col - startCol];
            },
            getTokens: function(row, col) {
                var tokens = this.dataAccess.getFormulaToken(row, col);
                if (tokens) {
                    return tokens;
                }
                var formulaText = this.valueModule.getRawValue(row, col);
                this.setFormula(row, col, formulaText);
                return this.dataAccess.getFormulaToken(row, col);
            },
            setArrayFormula: function(start, end, formulaText) {
                this.dataAccess.setArrayReference(start, end);
                this.setFormula(start.row, start.col, formulaText);
            },
            setFormula: function(row, col, formulaText) {
                var tokens = Parser.parse(formulaText);
                var cells = CellRelation.getCells(tokens);
                this.dataAccess.setFormulaToken(row, col, tokens);
                var cellRel = setCellToFormulaRel(this.dataAccess, row, col, cells);
                this.dataAccess.setFormulaToCellRel(row, col, cellRel);
            },
            clearFormula: function(row, col) {
                var arrayRef = this.dataAccess.getArrayReference(row, col);
                if (arrayRef) {
                    for (var i = arrayRef.start.row, limit = arrayRef.end.row; i <= limit; i++) {
                        for (var j = arrayRef.start.col, jlimit = arrayRef.end.col; j <= jlimit; j++) {
                            this.__clearFormula(i, j);
                        }
                    }
                } else {
                    this.__clearFormula(row, col);
                }
            },
            __clearFormula: function(row, col) {
                this.dataAccess.clearFormulaToken(row, col);
                var rels = this.dataAccess.getFormulaToCellRel(row, col);
                // 清除自身到其他单元格的关联关系
                this.dataAccess.clearFormulaToCellRel(row, col);
                // 清除关联到本单元格的所有关联关系，清除该关系后，其他单元格的改动不再会影响到本单元格
                clearCellToFormulaRel(this.dataAccess, row, col, rels);
                // 清除关联到当前单元格的其他单元格的公式的计算结果缓存
                clearValue(this.dataAccess, this.valueModule, row, col);
            }
        });
        function clearValue(dataAccess, valueModule, row, col) {
            var arrayRef = dataAccess.getArrayReference(row, col);
            if (arrayRef) {
                // 清除数组公式的所有计算值
                for (var i = arrayRef.start.row, limit = arrayRef.end.row; i <= limit; i++) {
                    for (var j = arrayRef.start.col, jlimit = arrayRef.end.col; j <= jlimit; j++) {
                        // 主动调用，清除同组单元格的值缓存
                        valueModule.clearCache(i, j);
                        // 清除自身的公式值
                        dataAccess.clearFormulaValue(i, j);
                        // 清除组内单元格所影响到的公式的值
                        clearAssociatedFormulaValue(dataAccess, valueModule, i, j);
                    }
                }
            } else {
                dataAccess.clearFormulaValue(row, col);
                // 清除和本单元格相关联的公式的值
                clearAssociatedFormulaValue(dataAccess, valueModule, row, col);
            }
        }
        function setCellToFormulaRel(dataAccess, row, col, cells) {
            var relData = dataAccess.getCellToFormulaRel();
            var current;
            var result = {
                row: [],
                column: [],
                cell: []
            };
            var currentCell = {
                row: row,
                col: col
            };
            var key = getKey(row, col);
            for (var i = 0, len = cells.length; i < len; i++) {
                current = cells[i];
                row = current.row;
                col = current.col;
                if (row === undefined) {
                    if (!relData.column[col]) {
                        relData.column[col] = {};
                    }
                    // 双向关系
                    relData.column[col][key] = currentCell;
                    result.column.push(col);
                } else if (col === undefined) {
                    if (!relData.row[row]) {
                        relData.row[row] = {};
                    }
                    relData.row[row][key] = currentCell;
                    result.row.push(row);
                } else {
                    if (!relData.cell[row]) {
                        relData.cell[row] = {};
                    }
                    if (!relData.cell[row][col]) {
                        relData.cell[row][col] = {};
                    }
                    relData.cell[row][col][key] = currentCell;
                    result.cell.push({
                        row: row,
                        col: col
                    });
                }
            }
            return result;
        }
        function clearCellToFormulaRel(dataAccess, row, col, rels) {
            if (!rels) {
                return;
            }
            var relData = dataAccess.getCellToFormulaRel();
            var rowRelData = rels.row;
            var columnRelData = rels.column;
            var cellRelData = rels.cell;
            var current;
            var key = getKey(row, col);
            // clear row rel
            for (var i = 0, len = rowRelData.length; i < len; i++) {
                current = rowRelData[i];
                delete relData.row[current][key];
            }
            // clear column rel
            for (var i = 0, len = columnRelData.length; i < len; i++) {
                current = columnRelData[i];
                delete relData.column[current][key];
            }
            // clear cell rel
            for (var i = 0, len = cellRelData.length; i < len; i++) {
                current = cellRelData[i];
                delete relData.cell[current.row][current.col][key];
            }
        }
        function clearAssociatedFormulaValue(dataAccess, valueModule, row, col) {
            var relData = dataAccess.getCellToFormulaRel();
            var rowRelData = relData.row;
            var columnRelData = relData.column;
            var cellRelData = relData.cell;
            var cell;
            // row update 清除依赖当前行的公式值
            if (rowRelData[row]) {
                rowRelData = rowRelData[row];
                for (var key in rowRelData) {
                    if (!rowRelData.hasOwnProperty(key)) {
                        continue;
                    }
                    cell = rowRelData[key];
                    valueModule.clearCache(cell.row, cell.col);
                    clearValue(dataAccess, valueModule, cell.row, cell.col);
                }
            }
            // column update
            if (columnRelData[row]) {
                columnRelData = columnRelData[row];
                for (var key in columnRelData) {
                    if (!columnRelData.hasOwnProperty(key)) {
                        continue;
                    }
                    cell = columnRelData[key];
                    valueModule.clearCache(cell.row, cell.col);
                    clearValue(dataAccess, valueModule, cell.row, cell.col);
                }
            }
            if (cellRelData[row] && cellRelData[row][col]) {
                cellRelData = cellRelData[row][col];
                for (var key in cellRelData) {
                    if (!cellRelData.hasOwnProperty(key)) {
                        continue;
                    }
                    cell = cellRelData[key];
                    valueModule.clearCache(cell.row, cell.col);
                    clearValue(dataAccess, valueModule, cell.row, cell.col);
                }
            }
        }
        function getKey(row, col) {
            return row + "," + col;
        }
        Formula.deps = [ "dataAccess" ];
        return Formula;
    }
};

//src/core/formula/function/impl/average.js
/**
 * @file 平均数函数
 * @author hancong03@baiud.com
 */
_p[60] = {
    value: function() {
        return {
            _all: true,
            _error: true,
            exec: function(operands, F_VALUE_TYPE, ERROR_VALUE) {
                var operand;
                var sum = 0;
                var midleValue;
                var count = 0;
                for (var i = 0, len = operands.length; i < len; i++) {
                    operand = operands[i];
                    if (operand.type === F_VALUE_TYPE.ERROR) {
                        return operand;
                    }
                    midleValue = getNumber(operand, F_VALUE_TYPE);
                    if (midleValue.type === F_VALUE_TYPE.ERROR) {
                        return midleValue;
                    }
                    sum += midleValue.value;
                    count += midleValue.count;
                }
                if (count === 0) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.DIV0
                    };
                }
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: sum / count + ""
                };
            }
        };
        function getNumber(operand, F_VALUE_TYPE) {
            var sum = 0;
            var current;
            var count = 0;
            if (operand.type === F_VALUE_TYPE.ARRAY) {
                operand = operand.value;
                for (var i = 0, len = operand.length; i < len; i++) {
                    current = operand[i];
                    switch (current.type) {
                      case F_VALUE_TYPE.NUMBER:
                        sum += +current.value;
                        count++;
                        break;

                      case F_VALUE_TYPE.ERROR:
                        return current;
                    }
                }
            } else {
                switch (operand.type) {
                  case F_VALUE_TYPE.NUMBER:
                    sum += +operand.value;
                    count++;
                    break;

                  case F_VALUE_TYPE.ERROR:
                    return operand;
                }
            }
            return {
                value: sum,
                count: count
            };
        }
    }
};

//src/core/formula/function/impl/count.js
/**
 * @file 求和函数
 * @author hancong03@baiud.com
 */
_p[61] = {
    value: function() {
        return {
            _all: true,
            _error: false,
            exec: function(operands, FormatChecker, F_VALUE_TYPE, ERROR_VALUE) {
                var operand;
                var count = 0;
                for (var i = 0, len = operands.length; i < len; i++) {
                    operand = operands[i];
                    if (operand.type === F_VALUE_TYPE.ERROR) {
                        return operand;
                    }
                    switch (operand.type) {
                      /*
                     ARRAY: "ARRAY",
                     TEXT: "TEXT",
                     NUMBER: "NUMBER",
                     LOGICAL: "LOGICAL",
                     ERROR: "ERROR",
                     */
                        case F_VALUE_TYPE.NUMBER:
                      case F_VALUE_TYPE.LOGICAL:
                        count++;
                        break;

                      case F_VALUE_TYPE.TEXT:
                        if (FormatChecker.isNumber(operand.value) || FormatChecker.isDatetime(operand.value)) {
                            count++;
                        }
                        break;
                    }
                    count += getCount(operand, F_VALUE_TYPE);
                }
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: count + ""
                };
            }
        };
        function getCount(operand, F_VALUE_TYPE) {
            var count = 0;
            if (operand.type === F_VALUE_TYPE.ARRAY) {
                operand = operand.value;
                for (var i = 0, len = operand.length; i < len; i++) {
                    if (operand[i].type === F_VALUE_TYPE.NUMBER) {
                        count++;
                    }
                }
            } else {
                if (operand.type === F_VALUE_TYPE.NUMBER) {
                    count++;
                }
            }
            console.log(count);
            return count;
        }
    }
};

//src/core/formula/function/impl/max.js
/**
 * @file 求和函数
 * @author hancong03@baiud.com
 */
_p[62] = {
    value: function() {
        return {
            _all: true,
            _error: false,
            exec: function(operands, F_VALUE_TYPE, ERROR_VALUE) {
                var operand;
                var count = 0;
                for (var i = 0, len = operands.length; i < len; i++) {
                    operand = operands[i];
                    if (operand.type === F_VALUE_TYPE.ERROR) {
                        return operand;
                    }
                    count += getCount(operand, F_VALUE_TYPE);
                }
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: count + ""
                };
            }
        };
        function getCount(operand, F_VALUE_TYPE) {
            var count = 0;
            if (operand.type === F_VALUE_TYPE.ARRAY) {
                operand = operand.value;
                for (var i = 0, len = operand.length; i < len; i++) {
                    if (operand[i].type === F_VALUE_TYPE.NUMBER) {
                        count++;
                    }
                }
            } else {
                if (operand.type === F_VALUE_TYPE.NUMBER) {
                    count++;
                }
            }
            console.log(count);
            return count;
        }
    }
};

//src/core/formula/function/impl/sum.js
/**
 * @file 求和函数
 * @author hancong03@baiud.com
 */
_p[63] = {
    value: function() {
        return {
            _all: true,
            _error: true,
            exec: function(operands, F_VALUE_TYPE, ERROR_VALUE) {
                var operand;
                var sum = 0;
                var midleValue;
                for (var i = 0, len = operands.length; i < len; i++) {
                    operand = operands[i];
                    if (operand.type === F_VALUE_TYPE.ERROR) {
                        return operand;
                    }
                    midleValue = getNumber(operand, F_VALUE_TYPE);
                    if (midleValue.type === F_VALUE_TYPE.ERROR) {
                        return midleValue;
                    }
                    sum += midleValue.value;
                }
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: sum + ""
                };
            }
        };
        function getNumber(operand, F_VALUE_TYPE) {
            var sum = 0;
            var current;
            if (operand.type === F_VALUE_TYPE.ARRAY) {
                operand = operand.value;
                for (var i = 0, len = operand.length; i < len; i++) {
                    current = operand[i];
                    switch (current.type) {
                      case F_VALUE_TYPE.NUMBER:
                        sum += +current.value;
                        break;

                      case F_VALUE_TYPE.ERROR:
                        return current;
                    }
                }
            } else {
                switch (operand.type) {
                  case F_VALUE_TYPE.NUMBER:
                    sum += +operand.value;
                    break;

                  case F_VALUE_TYPE.ERROR:
                    return operand;
                }
            }
            return {
                value: sum
            };
        }
    }
};

//src/core/formula/function/list.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[64] = {
    value: function(require) {
        return {
            SUM: _p.r(63),
            AVERAGE: _p.r(60),
            COUNT: _p.r(61),
            MAX: _p.r(62)
        };
    }
};

//src/core/formula/function/manager.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[65] = {
    value: function(require) {
        var FUNCTION_LIST = _p.r(64);
        return {
            getFunctionImplementation: function(name) {
                return FUNCTION_LIST[name.toUpperCase()];
            }
        };
    }
};

//src/core/formula/math/array-basic/basic.js
/**
 * @file 基本运算运行时
 * @author hancong03@baiud.com
 */
_p[66] = {
    value: function(require) {
        var ERROR_VALUE = _p.r(123);
        var F_VALUE_TYPE = _p.r(52);
        var OPERAND_TYPE = _p.r(53);
        var ComparisonRuntime = _p.r(67);
        var TypeCast = _p.r(74);
        var FormulaUtils = _p.r(75);
        return {
            exec: function(valueModule, operator, operands, start, end) {
                var current;
                var value;
                // 参数验证
                for (var i = 0, len = operands.length; i < len; i++) {
                    current = operands[i].value;
                    if (current.type === OPERAND_TYPE.UNION) {
                        return {
                            type: F_VALUE_TYPE.ERROR,
                            value: ERROR_VALUE.VALUE
                        };
                    }
                    if (current.type === OPERAND_TYPE.ERROR) {
                        return current;
                    }
                    if (current.type !== OPERAND_TYPE.RANGE) {
                        operands[i] = current;
                        continue;
                    }
                    // ---- range cells operand
                    value = FormulaUtils.getCellsValue(valueModule, current.value, start, end);
                    if (value === null) {
                        return {
                            type: F_VALUE_TYPE.ERROR,
                            value: ERROR_VALUE.NULL
                        };
                    }
                    operands[i] = {
                        type: F_VALUE_TYPE.ARRAY,
                        value: value
                    };
                }
                return {
                    type: F_VALUE_TYPE.ARRAY,
                    value: calculate(operator.value, operands, start, end)
                };
            }
        };
        function calculate(operator, operands, start, end) {
            switch (operator) {
              case "pre-":
                operands.unshift({
                    type: F_VALUE_TYPE.NUMBER,
                    value: "0"
                });
                operator = "-";
                break;

              case "post%":
                operands.push({
                    type: F_VALUE_TYPE.NUMBER,
                    value: "100"
                });
                operator = "/";
                break;
            }
            var op1 = operands[0];
            var op2 = operands[1];
            if (op1.type !== F_VALUE_TYPE.ARRAY) {
                op1 = [ [ op1 ] ];
            } else {
                op1 = op1.value;
            }
            if (op2.type !== F_VALUE_TYPE.ARRAY) {
                op2 = [ [ op2 ] ];
            } else {
                op2 = op2.value;
            }
            return arrayCalculate(operator, op1, op2, start, end);
        }
        function arrayCalculate(operator, op1, op2, start, end) {
            var result = [];
            var rowResult;
            var minLength;
            var isMultiColumns = false;
            // op1 is single-element array
            if (op1.length === 1 && op1[0].length === 1) {
                if (op1[0].length === 1) {
                    op1 = FormulaUtils.fillAllArray(op1, start, end);
                } else {
                    op1 = FormulaUtils.fillRowArray(op1, start, end);
                }
            } else {
                isMultiColumns = false;
                for (var i = 0, len = op1.length; i < len; i++) {
                    if (op1[i].length > 1) {
                        isMultiColumns = true;
                        break;
                    }
                }
                // one-dimensional: single column
                if (!isMultiColumns) {
                    op1 = FormulaUtils.fillColumnArray(op1, start, end);
                }
            }
            if (op2.length === 1) {
                if (op2[0].length === 1) {
                    op2 = FormulaUtils.fillAllArray(op2, start, end);
                } else {
                    op2 = FormulaUtils.fillRowArray(op2, start, end);
                }
            } else {
                isMultiColumns = false;
                for (var i = 0, len = op2.length; i < len; i++) {
                    if (op2[i].length > 1) {
                        isMultiColumns = true;
                        break;
                    }
                }
                // one-dimensional: single column
                if (!isMultiColumns) {
                    op2 = FormulaUtils.fillColumnArray(op2, start, end);
                }
            }
            minLength = Math.min(op1[0].length, op2[0].length);
            for (var i = 0, len = Math.min(op1.length, op2.length); i < len; i++) {
                rowResult = [];
                result.push(rowResult);
                for (var j = 0, jlen = minLength; j < jlen; j++) {
                    rowResult.push(cal(operator, op1[i][j], op2[i][j]));
                }
            }
            return result;
        }
        function cal(operator, op1, op2) {
            if (op1.type === OPERAND_TYPE.ERROR) {
                return op1;
            }
            if (op2.type === OPERAND_TYPE.ERROR) {
                return op2;
            }
            switch (operator) {
              case "+":
              case "-":
              case "*":
              case "/":
              case "^":
                op1 = TypeCast.getNumber(op1);
                op2 = TypeCast.getNumber(op2);
                if (isNaN(op1) || isNaN(op2)) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                break;

              case "&":
                op1 = TypeCast.getText(op1);
                op2 = TypeCast.getText(op2);

              default:
                // 其他运算符不处理
                break;
            }
            switch (operator) {
              case "+":
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: op1 + op2 + ""
                };

              case "-":
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: op1 - op2 + ""
                };

              case "*":
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: op1 * op2 + ""
                };

              case "/":
                if (op2 === 0) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.DIV0
                    };
                }
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: op1 / op2 + ""
                };

              case "^":
                return {
                    type: F_VALUE_TYPE.NUMBER,
                    value: Math.pow(op1, op2) + ""
                };

              case "&":
                return {
                    type: F_VALUE_TYPE.TEXT,
                    value: op1 + op2 + ""
                };

              default:
                // 其他运算符属于比较运算符
                return ComparisonRuntime.exec(operator, op1, op2);
                break;
            }
        }
    }
};

//src/core/formula/math/array-basic/comparison.js
/**
 * @file 比较运算runtime，该runtime属于basic runtime，是其组成部分，不允许其他runtime调用
 * @author hancong03@baiud.com
 */
_p[67] = {
    value: function(require) {
        var F_VALUE_TYPE = _p.r(52);
        var OPERAND_TYPE = _p.r(53);
        return {
            exec: function(operator, op1, op2) {
                var result = compare(op1, op2);
                switch (operator) {
                  case "=":
                    result = result === 0;
                    break;

                  case ">":
                    result = result > 0;
                    break;

                  case "<":
                    result = result < 0;
                    break;

                  case ">=":
                    result = result >= 0;
                    break;

                  case "<=":
                    result = result <= 0;
                    break;

                  case "<>":
                    result = result !== 0;
                    break;
                }
                return {
                    type: F_VALUE_TYPE.LOGICAL,
                    value: result ? "1" : "0"
                };
            }
        };
        function compare(op1, op2) {
            var type1 = op1.type;
            var type2 = op2.type;
            var value1 = op1.value;
            var value2 = op2.value;
            if (type1 === type2) {
                if (type1 === OPERAND_TYPE.UNDEFINED) {
                    return 0;
                }
                value1 = value1.toLowerCase();
                value2 = value2.toLowerCase();
                if (value1 === value2) {
                    return 0;
                } else if (value1 > value2) {
                    return 1;
                }
                return -1;
            }
            if (type1 === OPERAND_TYPE.LOGICAL) {
                return 1;
            } else if (type2 === OPERAND_TYPE.LOGICAL) {
                return -1;
            }
            if (type1 === OPERAND_TYPE.TEXT) {
                return 1;
            } else if (type2 === OPERAND_TYPE.TEXT) {
                return -1;
            }
            // NUMBER and UNDEFINED
            value1 = +(value1 || 0);
            value2 = +(value2 || 0);
            return value1 - value2;
        }
    }
};

//src/core/formula/math/array-result-analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[68] = {
    value: function(require) {
        var F_VALUE_TYPE = _p.r(52);
        var OPERAND_TYPE = _p.r(53);
        var ERROR_VALUE = _p.r(123);
        var FormulaUtils = _p.r(75);
        return {
            analyze: function(valueModule, operands, start, end) {
                if (operands.length !== 1) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                // 取出
                var operand = operands[0].value;
                if (operand.type === OPERAND_TYPE.UNION) {
                    operand = {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                } else if (operand.type === OPERAND_TYPE.RANGE) {
                    operand = getCellsValue(valueModule, operand.value, start, end);
                }
                if (operand.type !== OPERAND_TYPE.ARRAY) {
                    operand = [ [ operand ] ];
                } else {
                    operand = operand.value;
                }
                return toArray(operand, start, end);
            }
        };
        function getCellsValue(valueModule, cells, start, end) {
            var valueInfos = FormulaUtils.getCellsValue(valueModule, cells, start, end);
            var rowInfos;
            var info;
            if (valueInfos === null) {
                return {
                    type: F_VALUE_TYPE.ERROR,
                    value: ERROR_VALUE.NULL
                };
            }
            for (var i = 0, len = valueInfos.length; i < len; i++) {
                rowInfos = valueInfos[i];
                for (var j = 0, jlen = rowInfos.length; j < jlen; j++) {
                    info = rowInfos[j];
                    if (info.type === F_VALUE_TYPE.UNDEFINED) {
                        rowInfos[j] = {
                            type: F_VALUE_TYPE.NUMBER,
                            value: "0"
                        };
                    }
                }
            }
            return {
                type: F_VALUE_TYPE.ARRAY,
                value: valueInfos
            };
        }
        function toArray(values, start, end) {
            var result = [];
            var rowResult;
            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;
            var rowValues;
            var defaultValue = {
                type: F_VALUE_TYPE.ERROR,
                value: ERROR_VALUE.NAN
            };
            var rowCount = values.length;
            var isMultiColumn = false;
            if (rowCount === 1) {
                // single-element: single cell
                if (values[0].length === 1) {
                    for (var i = 0, limit = endRow - startRow; i <= limit; i++) {
                        rowResult = [];
                        result.push(rowResult);
                        for (var j = 0, jlimit = endCol - startCol; j <= jlimit; j++) {
                            rowResult.push(values[0][0]);
                        }
                    }
                } else {
                    for (var i = 0, limit = endRow - startRow; i <= limit; i++) {
                        rowResult = [];
                        result.push(rowResult);
                        for (var j = 0, jlimit = endCol - startCol; j <= jlimit; j++) {
                            rowResult.push(values[0][j] || defaultValue);
                        }
                    }
                }
            } else {
                for (var i = 0; i < rowCount; i++) {
                    if (values[i].length > 1) {
                        isMultiColumn = true;
                        break;
                    }
                }
                // one-dimensional: single column
                if (!isMultiColumn) {
                    for (var i = 0, limit = endRow - startRow; i <= limit; i++) {
                        rowValues = values[i] || [];
                        rowResult = [];
                        result.push(rowResult);
                        for (var j = 0, jlimit = endCol - startCol; j <= jlimit; j++) {
                            rowResult.push(rowValues[0] || defaultValue);
                        }
                    }
                } else {
                    for (var i = 0, limit = endRow - startRow; i <= limit; i++) {
                        rowValues = values[i] || [];
                        rowResult = [];
                        result.push(rowResult);
                        for (var j = 0, jlimit = endCol - startCol; j <= jlimit; j++) {
                            rowResult.push(rowValues[j] || defaultValue);
                        }
                    }
                }
            }
            return result;
        }
    }
};

//src/core/formula/math/basic/basic.js
/**
 * @file 基本运算运行时
 * @author hancong03@baiud.com
 */
_p[69] = {
    value: function(require) {
        var ERROR_VALUE = _p.r(123);
        var CELL_TYPE = _p.r(122);
        var TOKEN = _p.r(54);
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        var ComparisonRuntime = _p.r(70);
        var TypeCast = _p.r(74);
        return {
            exec: function(valueModule, operator, operands) {
                var current;
                // 参数验证
                for (var i = 0, len = operands.length; i < len; i++) {
                    current = operands[i];
                    // 计算过程中间结果
                    if (current.type === "RESULT") {
                        current = current.result;
                        if (current.type === CELL_TYPE.ERROR) {
                            return {
                                type: "RESULT",
                                result: current
                            };
                        }
                        operands[i] = current;
                        continue;
                    }
                    if (current.subtype !== TOKEN_SUBTYPE.RANGE) {
                        if (current.subtype === CELL_TYPE.ERROR) {
                            return {
                                type: "RESULT",
                                result: {
                                    type: CELL_TYPE.ERROR,
                                    value: current.value
                                }
                            };
                        } else {
                            operands[i] = {
                                type: current.subtype,
                                value: current.value
                            };
                        }
                        continue;
                    }
                    current = current.cells;
                    // 检查首行是否为空
                    if (current.length === 0 || current[0].length === 0) {
                        return {
                            type: "RESULT",
                            result: {
                                type: CELL_TYPE.ERROR,
                                value: ERROR_VALUE.NULL
                            }
                        };
                    }
                    // 检查是否存在空行
                    for (var j = 0, jlen = current.length; j < jlen; j++) {
                        if (current[j].length === 0) {
                            return {
                                type: "RESULT",
                                result: {
                                    type: CELL_TYPE.ERROR,
                                    value: ERROR_VALUE.NULL
                                }
                            };
                        }
                    }
                    // 检查是否是单元素数组
                    if (current.length > 1 || current[0].length > 1) {
                        return {
                            type: "RESULT",
                            result: {
                                type: CELL_TYPE.ERROR,
                                value: ERROR_VALUE.VALUE
                            }
                        };
                    }
                    current = current[0][0];
                    // 整行或整列
                    if (current.row === undefined || current.col === undefined) {
                        operands[i] = {
                            type: CELL_TYPE.NUMBER,
                            value: "0"
                        };
                        continue;
                    }
                    // 取出单元格值
                    current = valueModule.getComputedValueInfo(current.row, current.col);
                    if (current.type === CELL_TYPE.ERROR) {
                        return {
                            type: "RESULT",
                            result: current
                        };
                    }
                    operands[i] = current;
                }
                return {
                    type: "RESULT",
                    result: calculate(operator.value, operands)
                };
            }
        };
        function calculate(operator, operands) {
            var op1 = operands[0];
            var op2 = operands[1];
            switch (operator) {
              case "+":
              case "-":
              case "*":
              case "/":
              case "^":
                op1 = TypeCast.getNumber(op1);
                op2 = TypeCast.getNumber(op2);
                if (isNaN(op1) || isNaN(op2)) {
                    return {
                        type: CELL_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                break;

              case "pre-":
              case "post%":
                op1 = TypeCast.getNumber(op1);
                if (isNaN(op1)) {
                    return {
                        type: CELL_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                break;

              case "&":
                op1 = TypeCast.getText(op1);
                op2 = TypeCast.getText(op2);

              default:
                // 其他运算符不处理
                break;
            }
            switch (operator) {
              case "+":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: op1 + op2 + ""
                };

              case "-":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: op1 - op2 + ""
                };

              case "*":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: op1 * op2 + ""
                };

              case "/":
                if (op2 === 0) {
                    return {
                        type: CELL_TYPE.ERROR,
                        value: ERROR_VALUE.DIV0
                    };
                }
                return {
                    type: CELL_TYPE.NUMBER,
                    value: op1 / op2 + ""
                };

              case "^":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: Math.pow(op1, op2) + ""
                };

              case "pre-":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: -op1 + ""
                };

              case "post%":
                return {
                    type: CELL_TYPE.NUMBER,
                    value: op1 / 100 + ""
                };

              case "&":
                return {
                    type: CELL_TYPE.TEXT,
                    value: op1 + op2 + ""
                };

              default:
                // 其他运算符属于比较运算符
                return ComparisonRuntime.exec(operator, op1, op2);
                break;
            }
        }
    }
};

//src/core/formula/math/basic/comparison.js
/**
 * @file 比较运算runtime，该runtime属于basic runtime，是其组成部分，不允许其他runtime调用
 * @author hancong03@baiud.com
 */
_p[70] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        return {
            exec: function(operator, op1, op2) {
                var result = compare(op1, op2);
                switch (operator) {
                  case "=":
                    result = result === 0;
                    break;

                  case ">":
                    result = result > 0;
                    break;

                  case "<":
                    result = result < 0;
                    break;

                  case ">=":
                    result = result >= 0;
                    break;

                  case "<=":
                    result = result <= 0;
                    break;

                  case "<>":
                    result = result !== 0;
                    break;
                }
                return {
                    type: CELL_TYPE.LOGICAL,
                    value: result ? "1" : "0"
                };
            }
        };
        function compare(op1, op2) {
            var type1 = op1.type;
            var type2 = op2.type;
            var value1 = op1.value;
            var value2 = op2.value;
            if (type1 === type2) {
                if (type1 === CELL_TYPE.UNDEFINED) {
                    return 0;
                }
                value1 = value1.toLowerCase();
                value2 = value2.toLowerCase();
                if (value1 === value2) {
                    return 0;
                } else if (value1 > value2) {
                    return 1;
                }
                return -1;
            }
            if (type1 === CELL_TYPE.LOGICAL) {
                return 1;
            } else if (type2 === CELL_TYPE.LOGICAL) {
                return -1;
            }
            if (type1 === CELL_TYPE.TEXT) {
                return 1;
            } else if (type2 === CELL_TYPE.TEXT) {
                return -1;
            }
            // NUMBER and UNDEFINED
            value1 = +(value1 || 0);
            value2 = +(value2 || 0);
            return value1 - value2;
        }
    }
};

//src/core/formula/math/function.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[71] = {
    value: function(require) {
        var ERROR_VALUE = _p.r(123);
        var F_VALUE_TYPE = _p.r(52);
        var FunctionManager = _p.r(65);
        var ValueReader = _p.r(82);
        return {
            exec: function(valueModule, fun, operands, start, end) {
                var valueRange = {
                    row: end.row - start.row,
                    col: end.col - start.col
                };
                fun = FunctionManager.getFunctionImplementation(fun.name);
                if (!fun) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.NAME
                    };
                }
                // !需要注意：传递给函数的ARRAY类型的数据是一维数组，并非是公式计算中的二维数组
                operands = ValueReader.read(valueModule, fun, operands, valueRange);
                var result = fun.exec(operands, F_VALUE_TYPE, ERROR_VALUE);
                // 对结果数组进行标准化
                if (result.type === F_VALUE_TYPE.ARRAY) {
                    result.value = [ result.value ];
                }
                return result;
            }
        };
    }
};

//src/core/formula/math/result-analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[72] = {
    value: function(require) {
        var F_VALUE_TYPE = _p.r(52);
        var OPERAND_TYPE = _p.r(53);
        var ERROR_VALUE = _p.r(123);
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var FormulaUtils = _p.r(75);
        return {
            analyze: function(valueModule, operands, start, end) {
                if (operands.length !== 1) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                // 取出
                var operand = operands[0];
                if (operand.type !== TOKEN_TYPE.OPERAND) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                operand = operand.value;
                if (operand.type === OPERAND_TYPE.UNION) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                if (operand.type === OPERAND_TYPE.RANGE) {
                    operand = getCellsValue(valueModule, operand.value, start, end);
                }
                if (operand.type !== OPERAND_TYPE.ARRAY) {
                    return operand;
                }
                // array values
                operand = operand.value;
                if (operand.length === 0 || operand[0].length === 0) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.NULL
                    };
                }
                if (operand.length > 1 || operand[0].length > 1) {
                    return {
                        type: F_VALUE_TYPE.ERROR,
                        value: ERROR_VALUE.VALUE
                    };
                }
                return operand[0][0];
            }
        };
        function getCellsValue(valueModule, cells, start, end) {
            var valueInfos = FormulaUtils.getCellsValue(valueModule, cells, start, end);
            var rowInfos;
            var info;
            if (valueInfos === null) {
                return {
                    type: F_VALUE_TYPE.ERROR,
                    value: ERROR_VALUE.NULL
                };
            }
            for (var i = 0, len = valueInfos.length; i < len; i++) {
                rowInfos = valueInfos[i];
                for (var j = 0, jlen = rowInfos.length; j < jlen; j++) {
                    info = rowInfos[j];
                    if (info.type === F_VALUE_TYPE.UNDEFINED) {
                        rowInfos[j] = {
                            type: F_VALUE_TYPE.NUMBER,
                            value: "0"
                        };
                    }
                }
            }
            return {
                type: F_VALUE_TYPE.ARRAY,
                value: valueInfos
            };
        }
    }
};

//src/core/formula/math/runtime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[73] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var FunctionRuntime = _p.r(71);
        var ArrayBasicRuntime = _p.r(66);
        var ResultAnalyzer = _p.r(72);
        var ArrayResultAnalyzer = _p.r(68);
        return _p.r(0).create("MathRuntime", {
            valueModule: null,
            base: _p.r(143),
            bind: function(valueModule) {
                this.valueModule = valueModule;
            },
            exec: function(tokens) {
                var stack = [];
                var token;
                var start = {
                    row: 0,
                    col: 0
                };
                var end = {
                    row: 0,
                    col: 0
                };
                tokens = $._clone(tokens);
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    switch (token.type) {
                      case TOKEN_TYPE.OPERAND:
                        stack.push(token);
                        break;

                      case TOKEN_TYPE.FUNCTION:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: FunctionRuntime.exec(this.valueModule, token, stack.splice(stack.length - token.argCount, token.argCount), start, end)
                        });
                        break;

                      case TOKEN_TYPE.OP_IN:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: ArrayBasicRuntime.exec(this.valueModule, token, stack.splice(stack.length - 2, 2), start, end)
                        });
                        break;

                      case TOKEN_TYPE.OP_PRE:
                      case TOKEN_TYPE.OP_POST:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: ArrayBasicRuntime.exec(this.valueModule, token, stack.splice(stack.length - 1, 1), start, end)
                        });
                        break;

                      default:
                        debugger;
                        break;
                    }
                }
                // 分析最终结果
                return ResultAnalyzer.analyze(this.valueModule, stack, start, end);
            },
            execArray: function(tokens, start, end) {
                var stack = [];
                var token;
                tokens = $._clone(tokens);
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    switch (token.type) {
                      case TOKEN_TYPE.OPERAND:
                        stack.push(token);
                        break;

                      case TOKEN_TYPE.FUNCTION:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: FunctionRuntime.exec(this.valueModule, token, stack.splice(stack.length - token.argCount, token.argCount), start, end)
                        });
                        break;

                      case TOKEN_TYPE.OP_IN:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: ArrayBasicRuntime.exec(this.valueModule, token, stack.splice(stack.length - 2, 2), start, end)
                        });
                        break;

                      case TOKEN_TYPE.OP_PRE:
                      case TOKEN_TYPE.OP_POST:
                        stack.push({
                            type: TOKEN_TYPE.OPERAND,
                            value: ArrayBasicRuntime.exec(this.valueModule, token, stack.splice(stack.length - 1, 1), start, end)
                        });
                        break;

                      default:
                        debugger;
                        break;
                    }
                }
                // 分析最终结果
                return ArrayResultAnalyzer.analyze(this.valueModule, stack, start, end);
            }
        });
    }
};

//src/core/formula/math/type-caster.js
/**
 * @file 基本运算运行时
 * @author hancong03@baiud.com
 */
_p[74] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var LOGICAL_VALUE = _p.r(125);
        return {
            getNumber: function(valueInfo) {
                if (valueInfo.type === CELL_TYPE.UNDEFINED) {
                    return 0;
                }
                return parseFloat(valueInfo.value);
            },
            getText: function(valueInfo) {
                if (valueInfo.type === CELL_TYPE.UNDEFINED) {
                    return "";
                }
                if (valueInfo.type === CELL_TYPE.LOGICAL) {
                    return valueInfo.value === "1" ? LOGICAL_VALUE.TRUE : LOGICAL_VALUE.FALSE;
                }
                return valueInfo.value;
            }
        };
    }
};

//src/core/formula/math/utils.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[75] = {
    value: function(require) {
        return {
            getCellsValue: function(valueModule, cells, start, end) {
                var rowCells;
                var cell;
                var result = [];
                if (cells.length === 0) {
                    return null;
                }
                var row;
                var col;
                for (var i = 0, len = cells.length; i < len; i++) {
                    rowCells = cells[i];
                    for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                        cell = rowCells[j];
                        row = cell.row;
                        col = cell.col;
                        if (row === undefined) {
                            for (var k = 0, klimit = end.col - start.col; k <= klimit; k++) {
                                if (!result[k]) {
                                    result[k] = [];
                                }
                                result[k].push(valueModule.getComputedValueInfo(k, col));
                            }
                        } else if (col === undefined) {
                            for (var k = 0, klimit = end.row - start.row; k <= klimit; k++) {
                                if (!result[row]) {
                                    result[row] = [];
                                }
                                result[row].push(valueModule.getComputedValueInfo(row, k));
                            }
                        } else {
                            if (!result[i]) {
                                result[i] = [];
                            }
                            result[i][j] = valueModule.getComputedValueInfo(row, col);
                        }
                    }
                }
                return $._clone(result);
            },
            /**
         * 生成一个由start到end的区域大小的数组，并用给定的值value填充这个数组的每一个元素，返回该数组
         * @param value
         * @param start
         * @param end
         */
            fillAllArray: function(values, start, end) {
                var result = [];
                var rowResult;
                var value = values[0][0];
                for (var i = 0, limit = end.row - start.row; i <= limit; i++) {
                    rowResult = [];
                    result.push(rowResult);
                    for (var j = 0, jlimit = end.col - start.col; j <= jlimit; j++) {
                        rowResult.push(value);
                    }
                }
                return result;
            },
            // 填充行
            fillRowArray: function(values, start, end) {
                var result = [];
                values = values[0];
                for (var i = start.col, limit = end.col; i <= limit; i++) {
                    result.push(values);
                }
                return result;
            },
            fillColumnArray: function(values, start, end) {
                var result = [];
                var rowResult;
                var current;
                for (var i = 0, len = values.length; i < len; i++) {
                    rowResult = [];
                    result.push(rowResult);
                    current = values[i][0];
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        rowResult.push(current);
                    }
                }
                return result;
            }
        };
    }
};

//src/core/formula/parser/cell-reference.js
/**
 * @file 计算单元格引用运算符
 * 运算符有： ":"，",", " "(空格)
 * 该解析器不处理":"运算符，因为该运算符已经计算过
 * @author hancong03@baiud.com
 */
_p[76] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        return {
            parse: function(tokens) {
                var result = [];
                var token;
                var operands;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    token = tokens[i];
                    if (token.subtype === TOKEN_SUBTYPE.INTERSECT) {
                        operands = result.splice(result.length - 2, 2);
                        result.push(getIntersectCells(operands[0], operands[1]));
                    } else if (token.subtype === TOKEN_SUBTYPE.UNION) {
                        operands = result.splice(result.length - 2, 2);
                        result.push(getUnionCells(operands[0], operands[1]));
                    } else {
                        result.push(token);
                    }
                }
                return result;
            }
        };
        /**
     * 计算相交单元格
     * @param firstCell
     * @param secondCell
     */
        function getIntersectCells(firstCell, secondCell) {
            var cells1 = firstCell.cells;
            var cells2 = secondCell.cells;
            var map = getCellMap(cells1);
            var result = [];
            var rowResult;
            var cell;
            var rowCells;
            for (var i = 0, len = cells2.length; i < len; i++) {
                rowCells = cells2[i];
                rowResult = [];
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    cell = getCellsInMap(rowCells[j], map);
                    if (cell) {
                        rowResult = rowResult.concat(cell);
                    }
                }
                result.push(rowResult);
            }
            var type1 = firstCell.subtype === TOKEN_SUBTYPE.RANGE;
            var type2 = secondCell.subtype === TOKEN_SUBTYPE.RANGE;
            return {
                type: TOKEN_TYPE.OPERAND,
                subtype: type1 && type2 ? TOKEN_SUBTYPE.RANGE : TOKEN_SUBTYPE.UNION,
                cells: result
            };
        }
        /**
     * 计算联合（并集）单元格
     */
        function getUnionCells(firstCell, secondCell) {
            return {
                type: TOKEN_TYPE.OPERAND,
                subtype: TOKEN_SUBTYPE.UNION,
                cells: firstCell.cells.concat(secondCell.cells)
            };
        }
        function getCellMap(cells) {
            var map = {
                row: {},
                column: {}
            };
            var current;
            var rowCells;
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    current = rowCells[j];
                    if (current.row === undefined) {
                        map.column[current.col] = true;
                    } else if (current.col === undefined) {
                        map.column[current.row] = true;
                    } else {
                        if (!map.row[current.row]) {
                            map.row[current.row] = {};
                        }
                        if (map.row[current.row] !== true) {
                            map.row[current.row][current.col] = true;
                        }
                        if (!map.column[current.col]) {
                            map.column[current.col] = {};
                        }
                        if (map.column[current.col] !== true) {
                            map.column[current.col][current.row] = true;
                        }
                    }
                }
            }
            return map;
        }
        function getCellsInMap(cell, map) {
            var startRow;
            var startCol;
            var endRow;
            var endCol;
            var result = [];
            if (cell.type === "region") {
                startRow = cell.start.row;
                startCol = cell.start.col;
                endRow = cell.end.row;
                endCol = cell.end.col;
                if (startRow === undefined) {
                    for (var i = startCol; i <= endCol; i++) {
                        if (map.column[i] === true) {
                            result.push({
                                row: undefined,
                                col: i
                            });
                        } else if (map.column[i]) {
                            for (var key in map.column[i]) {
                                result.push({
                                    row: undefined,
                                    col: key
                                });
                            }
                        }
                    }
                } else if (startCol === undefined) {
                    for (var i = startRow; i <= endRow; i++) {
                        if (map.row[i] === true) {
                            result.push({
                                row: i,
                                col: undefined
                            });
                        } else if (map.row[i]) {
                            for (var key in map.row[i]) {
                                result.push({
                                    row: key,
                                    col: undefined
                                });
                            }
                        }
                    }
                } else {
                    for (var i = startRow; i <= endRow; i++) {
                        for (var j = startCol; j <= endCol; j++) {
                            if (map.row[i] === true) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            } else if (map.column[j] === true) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            } else if (map.row[i] && map.row[i][j]) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            }
                        }
                    }
                }
            } else {
                if (map.row[cell.row] === true) {
                    result.push({
                        row: cell.row,
                        col: cell.col
                    });
                } else if (map.column[cell.col] === true) {
                    result.push({
                        row: cell.row,
                        col: cell.col
                    });
                } else {
                    if (cell.row === undefined && map.column[cell.col]) {
                        for (var key in map.column[cell.col]) {
                            result.push({
                                row: undefined,
                                col: key
                            });
                        }
                    } else if (cell.col === undefined && map.row[cell.row]) {
                        for (var key in map.row[cell.row]) {
                            result.push({
                                row: key,
                                col: undefined
                            });
                        }
                    } else if (map.row[cell.row] && map.row[cell.row][cell.col]) {
                        result.push({
                            row: cell.row,
                            col: cell.col
                        });
                    }
                }
            }
            if (result.length > 0) {
                return result;
            }
            return null;
        }
    }
};

//src/core/formula/parser/cells.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[77] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        var ColumnNameCommonService = _p.r(8);
        var ROW_COLUMN_PATTERN = /^\$?([a-z]+)?\$?(\d+)?$/i;
        var OP_PREFIX = {};
        OP_PREFIX[TOKEN_TYPE.OP_PRE] = "pre";
        OP_PREFIX[TOKEN_TYPE.OP_IN] = "";
        OP_PREFIX[TOKEN_TYPE.OP_POST] = "post";
        return {
            parse: function(tokens) {
                var result = [];
                processExpression(tokens, result);
                return result;
            }
        };
        function processExpression(tokens, result) {
            var token;
            while (tokens.moveNext()) {
                token = tokens.current();
                switch (token.type) {
                  case TOKEN_TYPE.FUNCTION:
                    if (token.subtype === TOKEN_SUBTYPE.STOP) {
                        return;
                    } else {
                        // 开始函数处理
                        processFunction(tokens, token, result);
                    }
                    break;

                  case TOKEN_TYPE.SUBEXPR:
                    if (token.subtype === TOKEN_SUBTYPE.START) {
                        result.push({
                            type: TOKEN_TYPE.LEFT_BRACKET
                        });
                    } else {
                        result.push({
                            type: TOKEN_TYPE.RIGHT_BRACKET
                        });
                    }
                    break;

                  case TOKEN_TYPE.OPERAND:
                    if (result.count === 0) {
                        result.count = 1;
                    }
                    processOperand(tokens, token, result);
                    break;

                  case TOKEN_TYPE.NOOP:
                    debugger;
                    break;

                  case TOKEN_TYPE.OP_PRE:
                  case TOKEN_TYPE.OP_IN:
                  case TOKEN_TYPE.OP_POST:
                    result.push({
                        type: token.type,
                        subtype: token.subtype,
                        value: OP_PREFIX[token.type] + token.value
                    });
                    break;

                  case TOKEN_TYPE.ARGUMENT:
                    if (result.count === 0) {
                        result.count = 1;
                    }
                    result.count++;
                    result.push({
                        type: TOKEN_TYPE.ARGUMENT
                    });
                    break;

                  // 参数，忽略
                    case TOKEN_TYPE.WSPACE:
                    break;

                  case TOKEN_TYPE.UNKNOWN:
                    debugger;
                    break;
                }
            }
        }
        /**
     * 函数处理
     * @param tokens
     */
        function processFunction(tokens, token, result) {
            var fun = {
                type: TOKEN_TYPE.FUNCTION,
                name: token.value
            };
            result.push(fun);
            result.push({
                type: TOKEN_TYPE.LEFT_BRACKET
            });
            var args = [];
            // 参数计数
            args.count = 0;
            processExpression(tokens, args);
            args.unshift(result.length, 0);
            result.splice.apply(result, args);
            fun.argCount = args.count;
            result.push({
                type: TOKEN_TYPE.RIGHT_BRACKET
            });
        }
        function processOperand(tokens, token, result) {
            switch (token.subtype) {
              case TOKEN_SUBTYPE.RANGE:
                result.push({
                    type: TOKEN_TYPE.OPERAND,
                    subtype: token.subtype,
                    cells: getCells(token.value)
                });
                break;

              default:
                result.push({
                    type: TOKEN_TYPE.OPERAND,
                    subtype: token.subtype,
                    value: token.value
                });
            }
        }
        function getCells(text) {
            var cell;
            var groups = text.split(":");
            var tmp;
            if (groups.length === 1) {
                cell = getCellInfo(groups[0]);
            } else {
                tmp = [];
                for (var i = 0, len = groups.length; i < len; i++) {
                    tmp[i] = [ getCellInfo(groups[i]) ];
                }
                cell = getRegionCellInfos(tmp);
            }
            var result = [];
            var rowResult;
            if (cell.type === "region") {
                if (cell.start.row === undefined) {
                    rowResult = [];
                    result.push(rowResult);
                    for (var i = cell.start.col, limit = cell.end.col; i <= limit; i++) {
                        rowResult.push({
                            row: undefined,
                            col: i
                        });
                    }
                } else if (cell.start.col === undefined) {
                    for (var i = cell.start.row, limit = cell.end.row; i <= limit; i++) {
                        result.push([ {
                            row: i,
                            col: undefined
                        } ]);
                    }
                } else {
                    for (var i = cell.start.row, limit = cell.end.row; i <= limit; i++) {
                        rowResult = [];
                        result.push(rowResult);
                        for (var j = cell.start.col, jlimit = cell.end.col; j <= jlimit; j++) {
                            rowResult.push({
                                row: i,
                                col: j
                            });
                        }
                    }
                }
            } else {
                result.push([ cell ]);
            }
            return result;
        }
        function getCellInfo(cellName) {
            var row;
            var col;
            if (ROW_COLUMN_PATTERN.test(cellName)) {
                row = RegExp.$2;
                col = RegExp.$1;
                if (!row && !col) {
                    throw new Error("Invalid cell reference");
                }
                if (row) {
                    row = row - 1;
                } else {
                    row = undefined;
                }
                if (col) {
                    col = ColumnNameCommonService.toIndex(col);
                } else {
                    col = undefined;
                }
                return {
                    row: row,
                    col: col
                };
            }
            throw new Error("Invalid cell reference");
        }
        function getRegionCellInfos(cells) {
            var result = cells[0];
            for (var i = 0, len = cells.length - 1; i < len; i++) {
                result = getRegionCells(result, cells[i + 1]);
            }
            return result[0];
        }
        /**
     * 获取区域单元格信息
     * @param firstCell
     * @param secondCell
     * @returns {{start: {row: undefined, col: undefined}, end: {row: undefined, col: undefined}}}
     */
        function getRegionCells(firstCell, secondCell) {
            var firstMin = getMinCell(firstCell);
            var secondMin = getMinCell(secondCell);
            var firstMax = getMaxCell(secondCell);
            var secondMax = getMaxCell(secondCell);
            var minRow = Math.min(firstMin.row, secondMin.row);
            var minCol = Math.min(firstMin.col, secondMin.col);
            var maxRow = Math.max(firstMax.row, secondMax.row);
            var maxCol = Math.max(firstMax.col, secondMax.col);
            minRow = isNaN(minRow) ? undefined : minRow;
            minCol = isNaN(minCol) ? undefined : minCol;
            maxRow = isNaN(maxRow) ? undefined : maxRow;
            maxCol = isNaN(maxCol) ? undefined : maxCol;
            if (minRow === undefined || maxRow === undefined) {
                minRow = undefined;
                maxRow = undefined;
            }
            if (minCol === undefined || maxCol === undefined) {
                minCol = undefined;
                maxCol = undefined;
            }
            return [ {
                type: "region",
                start: {
                    row: minRow,
                    col: minCol
                },
                end: {
                    row: maxRow,
                    col: maxCol
                }
            } ];
        }
        /**
     * 获取相交单元格
     * @param firstCell
     * @param secondCell
     */
        function getIntersectCells(firstCell, secondCell) {
            var map = getCellMap(firstCell);
            var result = [];
            var tmp;
            for (var i = 0, len = secondCell.length; i < len; i++) {
                tmp = getCellsInMap(secondCell[i], map);
                if (tmp) {
                    result = result.concat(tmp);
                }
            }
            return result;
        }
        function getMinCell(cells) {
            var minRow = 99999999;
            var minCol = 99999999;
            var current;
            for (var i = 0, len = cells.length; i < len; i++) {
                current = cells[i];
                if (current.type === "region") {
                    minRow = Math.min(minRow, current.start.row);
                    minCol = Math.min(minCol, current.start.col);
                } else {
                    minRow = Math.min(minRow, current.row);
                    minCol = Math.min(minCol, current.col);
                }
            }
            if (isNaN(minRow)) {
                minRow === undefined;
            }
            if (isNaN(minCol)) {
                minCol === undefined;
            }
            return {
                row: isNaN(minRow) ? undefined : minRow,
                col: isNaN(minCol) ? undefined : minCol
            };
        }
        function getMaxCell(cells) {
            var maxRow = 0;
            var maxCol = 0;
            var current;
            for (var i = 0, len = cells.length; i < len; i++) {
                current = cells[i];
                if (current.type === "region") {
                    maxRow = Math.max(maxRow, current.end.row);
                    maxCol = Math.max(maxCol, current.end.col);
                } else {
                    maxRow = Math.max(maxRow, current.row);
                    maxCol = Math.max(maxCol, current.col);
                }
            }
            if (isNaN(maxRow)) {
                maxRow === undefined;
            }
            if (isNaN(maxCol)) {
                maxCol === undefined;
            }
            return {
                row: maxRow,
                col: maxCol
            };
        }
        function getCellMap(cells) {
            var map = {
                row: {},
                column: {}
            };
            var current;
            for (var i = 0, len = cells.length; i < len; i++) {
                current = cells[i];
                if (current.type === "region") {
                    // 列全选
                    if (current.start.row === undefined) {
                        for (var i = current.start.col, limit = current.end.col; i <= limit; i++) {
                            map.column[i] = true;
                        }
                    } else if (current.start.col === undefined) {
                        for (var i = current.start.row, limit = current.end.row; i <= limit; i++) {
                            map.row[i] = true;
                        }
                    } else {
                        for (var i = current.start.row, limit = current.end.row; i <= limit; i++) {
                            for (var j = current.start.col, jlimit = current.end.col; j <= jlimit; j++) {
                                // 标记行上单元格
                                if (!map.row[i]) {
                                    map.row[i] = {};
                                }
                                if (map.row[i] !== true) {
                                    map.row[i][j] = true;
                                }
                                // 标记列上单元格
                                if (!map.column[j]) {
                                    map.column[j] = {};
                                }
                                if (map.column[j] !== true) {
                                    map.column[j][i] = true;
                                }
                            }
                        }
                    }
                } else {
                    if (current.row === undefined) {
                        map.column[current.col] = true;
                    } else if (current.col === undefined) {
                        map.column[current.row] = true;
                    } else {
                        if (!map.row[current.row]) {
                            map.row[current.row] = {};
                        }
                        if (map.row[current.row] !== true) {
                            map.row[current.row][current.col] = true;
                        }
                        if (!map.column[current.col]) {
                            map.column[current.col] = {};
                        }
                        if (map.column[current.col] !== true) {
                            map[current.col][current.row] = true;
                        }
                    }
                }
            }
            return map;
        }
        function getCellsInMap(cell, map) {
            var startRow;
            var startCol;
            var endRow;
            var endCol;
            var result = [];
            if (cell.type === "region") {
                startRow = cell.start.row;
                startCol = cell.start.col;
                endRow = cell.end.row;
                endCol = cell.end.col;
                if (startRow === undefined) {
                    for (var i = startCol; i <= endCol; i++) {
                        if (map.column[i] === true) {
                            result.push({
                                row: undefined,
                                col: i
                            });
                        } else if (map.column[i]) {
                            for (var key in map.column[i]) {
                                result.push({
                                    row: undefined,
                                    col: key
                                });
                            }
                        }
                    }
                } else if (startCol === undefined) {
                    for (var i = startRow; i <= endRow; i++) {
                        if (map.row[i] === true) {
                            result.push({
                                row: i,
                                col: undefined
                            });
                        } else if (map.row[i]) {
                            for (var key in map.row[i]) {
                                result.push({
                                    row: key,
                                    col: undefined
                                });
                            }
                        }
                    }
                } else {
                    for (var i = startRow; i <= endRow; i++) {
                        for (var j = startCol; j <= endCol; j++) {
                            if (map.row[i] === true) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            } else if (map.column[j] === true) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            } else if (map.row[i] && map.row[i][j]) {
                                result.push({
                                    row: i,
                                    col: j
                                });
                            }
                        }
                    }
                }
            } else {
                if (map.row[cell.row] === true) {
                    result.push({
                        row: cell.row,
                        col: cell.col
                    });
                } else if (map.column[cell.col] === true) {
                    result.push({
                        row: cell.row,
                        col: cell.col
                    });
                } else {
                    if (cell.row === undefined && map.column[cell.col]) {
                        for (var key in map.column[cell.col]) {
                            result.push({
                                row: undefined,
                                col: key
                            });
                        }
                    } else if (cell.col === undefined && map.row[cell.row]) {
                        for (var key in map.row[cell.row]) {
                            result.push({
                                row: key,
                                col: undefined
                            });
                        }
                    } else if (map.row[cell.row] && map.row[cell.row][cell.col]) {
                        result.push({
                            row: cell.row,
                            col: cell.col
                        });
                    }
                }
            }
            if (result.length > 0) {
                return result;
            }
            return null;
        }
    }
};

//src/core/formula/parser/operand.js
/**
 * @file 操作数类型统一转换
 * @author hancong03@baiud.com
 */
_p[78] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        return {
            parse: function(tokens) {
                var current;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    current = tokens[i];
                    if (current.type !== TOKEN_TYPE.OPERAND) {
                        continue;
                    }
                    if (current.subtype === TOKEN_SUBTYPE.RANGE || current.subtype === TOKEN_SUBTYPE.UNION) {
                        tokens[i] = {
                            type: TOKEN_TYPE.OPERAND,
                            value: {
                                type: current.subtype,
                                value: current.cells
                            }
                        };
                    } else {
                        tokens[i] = {
                            type: TOKEN_TYPE.OPERAND,
                            value: {
                                type: current.subtype,
                                value: current.value
                            }
                        };
                    }
                }
                return tokens;
            }
        };
    }
};

//src/core/formula/parser/parser.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[79] = {
    value: function(require) {
        var TokenAnalyzer = _p.r(81);
        var CellsParser = _p.r(77);
        var RPNParser = _p.r(80);
        var CellReferenceParser = _p.r(76);
        var OperandParser = _p.r(78);
        return {
            parse: function(text) {
                var tokens = TokenAnalyzer.getTokens(text);
                tokens = CellsParser.parse(tokens);
                tokens = RPNParser.parse(tokens);
                tokens = CellReferenceParser.parse(tokens);
                tokens = OperandParser.parse(tokens);
                return tokens;
            }
        };
    }
};

//src/core/formula/parser/rpn.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[80] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var PRIORITY_LIST = {
            // 单元格引用运算符
            intersect: 111,
            ",": 110,
            "pre-": 99,
            "post%": 98,
            "^": 97,
            "*": 96,
            "/": 96,
            "+": 95,
            "-": 95,
            "&": 94,
            "=": 93,
            "<": 92,
            ">": 92,
            "<=": 91,
            ">=": 91,
            "<>": 90
        };
        return {
            parse: function(tokens) {
                var output = [];
                var opStack = [];
                var current;
                var tmp;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    current = tokens[i];
                    switch (current.type) {
                      case TOKEN_TYPE.OPERAND:
                        output.push(current);
                        break;

                      case TOKEN_TYPE.OP_IN:
                      case TOKEN_TYPE.OP_POST:
                        while (opStack.length) {
                            tmp = opStack[opStack.length - 1];
                            if (PRIORITY_LIST[current.value] <= PRIORITY_LIST[tmp.value]) {
                                output.push(opStack.pop());
                            } else {
                                break;
                            }
                        }
                        opStack.push(current);
                        break;

                      case TOKEN_TYPE.OP_PRE:
                        while (opStack.length) {
                            tmp = opStack[opStack.length - 1];
                            if (PRIORITY_LIST[current.value] < PRIORITY_LIST[tmp.value]) {
                                output.push(opStack.pop());
                            } else {
                                break;
                            }
                        }
                        opStack.push(current);
                        break;
                        debugger;

                      case TOKEN_TYPE.FUNCTION:
                        opStack.push(current);
                        break;

                      case TOKEN_TYPE.ARGUMENT:
                        // TODO 可增加括号匹配检测
                        if (opStack[opStack.length - 1].type !== TOKEN_TYPE.LEFT_BRACKET) {
                            output.push(opStack.pop());
                        }
                        break;

                      case TOKEN_TYPE.LEFT_BRACKET:
                        opStack.push(current);
                        break;

                      case TOKEN_TYPE.RIGHT_BRACKET:
                        // TODO 可增加括号匹配检测
                        tmp = opStack.pop();
                        while (tmp && tmp.type !== TOKEN_TYPE.LEFT_BRACKET) {
                            output.push(tmp);
                            tmp = opStack.pop();
                        }
                        // 函数头部出栈
                        tmp = opStack[opStack.length - 1];
                        while (tmp && tmp.type === TOKEN_TYPE.FUNCTION) {
                            output.push(opStack.pop());
                            tmp = opStack[opStack.length - 1];
                        }
                        break;
                    }
                }
                // TODO 可增加括号匹配检测
                return output.concat(opStack.reverse());
            }
        };
    }
};

//src/core/formula/parser/token.js
/**
 * @file 解析器
 * @author hancong03@baiud.com
 */
_p[81] = {
    value: function(require) {
        var TOKEN = _p.r(54);
        var TOKEN_TYPE = TOKEN.TYPE;
        var TOKEN_SUBTYPE = TOKEN.SUBTYPE;
        var TOK_TYPE_NOOP = TOKEN_TYPE.NOOP;
        var TOK_TYPE_OPERAND = TOKEN_TYPE.OPERAND;
        var TOK_TYPE_FUNCTION = TOKEN_TYPE.FUNCTION;
        var TOK_TYPE_ARRAY = TOKEN_TYPE.ARRAY;
        var TOK_TYPE_ARRAYROW = TOKEN_TYPE.ARRAYROW;
        var TOK_TYPE_SUBEXPR = TOKEN_TYPE.SUBEXPR;
        var TOK_TYPE_ARGUMENT = TOKEN_TYPE.ARGUMENT;
        var TOK_TYPE_OP_PRE = TOKEN_TYPE.OP_PRE;
        var TOK_TYPE_OP_IN = TOKEN_TYPE.OP_IN;
        var TOK_TYPE_OP_POST = TOKEN_TYPE.OP_POST;
        var TOK_TYPE_WSPACE = TOKEN_TYPE.WSPACE;
        var TOK_TYPE_UNKNOWN = TOKEN_TYPE.UNKNOWN;
        var TOK_SUBTYPE_START = TOKEN_SUBTYPE.START;
        var TOK_SUBTYPE_STOP = TOKEN_SUBTYPE.STOP;
        var TOK_SUBTYPE_TEXT = TOKEN_SUBTYPE.TEXT;
        var TOK_SUBTYPE_NUMBER = TOKEN_SUBTYPE.NUMBER;
        var TOK_SUBTYPE_LOGICAL = TOKEN_SUBTYPE.LOGICAL;
        var TOK_SUBTYPE_ERROR = TOKEN_SUBTYPE.ERROR;
        var TOK_SUBTYPE_RANGE = TOKEN_SUBTYPE.RANGE;
        var TOK_SUBTYPE_MATH = TOKEN_SUBTYPE.MATH;
        var TOK_SUBTYPE_CONCAT = TOKEN_SUBTYPE.CONCAT;
        var TOK_SUBTYPE_INTERSECT = TOKEN_SUBTYPE.INTERSECT;
        var TOK_SUBTYPE_UNION = TOKEN_SUBTYPE.UNION;
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
                    /* ------- add toUpperCase*/
                    if (",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,".indexOf("," + token.toUpperCase() + ",") != -1) {
                        inError = false;
                        token = token.toUpperCase();
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
                    tokenStack.push(tokens.add("ARRAY", TOK_TYPE_ARRAY, TOK_SUBTYPE_START));
                    tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_ARRAYROW, TOK_SUBTYPE_START));
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
                    tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_ARRAYROW, TOK_SUBTYPE_START));
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
                    if (!(tokenStack.type() == TOK_TYPE_FUNCTION || tokenStack.type() == TOK_TYPE_ARRAY || tokenStack.type() == TOK_TYPE_ARRAYROW)) {
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
                    if (tokens.BOF() || tokens.EOF()) {} else if (!((tokens.previous().type == TOK_TYPE_FUNCTION || tokens.previous().type == TOK_TYPE_ARRAY || tokens.previous().type == TOK_TYPE_ARRAYROW) && tokens.previous().subtype == TOK_SUBTYPE_STOP || tokens.previous().type == TOK_TYPE_SUBEXPR && tokens.previous().subtype == TOK_SUBTYPE_STOP || tokens.previous().type == TOK_TYPE_OPERAND)) {} else if (!((tokens.next().type == TOK_TYPE_FUNCTION || tokens.next().type == TOK_TYPE_ARRAY || tokens.next().type == TOK_TYPE_ARRAYROW) && tokens.next().subtype == TOK_SUBTYPE_START || tokens.next().type == TOK_TYPE_SUBEXPR && tokens.next().subtype == TOK_SUBTYPE_START || tokens.next().type == TOK_TYPE_OPERAND)) {} else {
                        // update
                        token.value = "intersect";
                        tokens2.add(token.value, TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT);
                    }
                    continue;
                }
                tokens2.addRef(token);
            }
            // switch infix "-" operator to prefix when appropriate, switch infix "+" operator to noop when appropriate, identify operand
            // and infix-operator subtypes, pull "@" from in front of function names
            while (tokens2.moveNext()) {
                token = tokens2.current();
                if (token.type == TOK_TYPE_OP_IN && token.value == "-") {
                    if (tokens2.BOF()) token.type = TOK_TYPE_OP_PRE; else if ((tokens2.previous().type == TOK_TYPE_FUNCTION || tokens2.previous().type == TOK_TYPE_ARRAY || tokens2.previous().type == TOK_TYPE_ARRAYROW) && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_OP_POST || tokens2.previous().type == TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH; else token.type = TOK_TYPE_OP_PRE;
                    continue;
                }
                if (token.type == TOK_TYPE_OP_IN && token.value == "+") {
                    if (tokens2.BOF()) token.type = TOK_TYPE_NOOP; else if ((tokens2.previous().type == TOK_TYPE_FUNCTION || tokens2.previous().type == TOK_TYPE_ARRAY || tokens2.previous().type == TOK_TYPE_ARRAYROW) && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP || tokens2.previous().type == TOK_TYPE_OP_POST || tokens2.previous().type == TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH; else token.type = TOK_TYPE_NOOP;
                    continue;
                }
                if (token.type == TOK_TYPE_OP_IN && token.subtype.length == 0) {
                    if ("<>=".indexOf(token.value.substr(0, 1)) != -1) token.subtype = TOK_SUBTYPE_LOGICAL; else if (token.value == "&") token.subtype = TOK_SUBTYPE_CONCAT; else token.subtype = TOK_SUBTYPE_MATH;
                    continue;
                }
                if (token.type == TOK_TYPE_OPERAND && token.subtype.length == 0) {
                    if (isNaN(parseFloat(token.value))) /* ------ update, change logical value --------- */
                    if (token.value.toUpperCase() == "TRUE" || token.value.toUpperCase() == "FALSE") {
                        token.value = token.value.toUpperCase() == "TRUE" ? "1" : "0";
                        token.subtype = TOK_SUBTYPE_LOGICAL;
                    } else {
                        token.subtype = TOK_SUBTYPE_RANGE;
                    } else token.subtype = TOK_SUBTYPE_NUMBER;
                    continue;
                }
                if (token.type == TOK_TYPE_FUNCTION || token.type == TOK_TYPE_ARRAY || token.type == TOK_TYPE_ARRAYROW) {
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
            getTokens: getTokens
        };
    }
};

//src/core/formula/value-reader.js
/**
 * @file 共函数使用的ValueReader类
 * @author hancong03@baiud.com
 */
_p[82] = {
    value: function(require) {
        var F_VALUE_TYPE = _p.r(52);
        var OPERAND_TYPE = _p.r(53);
        return {
            read: function(valueModule, fun, operands, valueRange) {
                if (fun._all) {
                    return readAll(valueModule, fun._error, operands);
                }
                return readRange(valueModule, fun._error, operands, valueRange);
            }
        };
        function readAll(valueModule, isErrorSensitive, operands) {
            var result = [];
            var operand;
            var tmp;
            for (var i = 0, len = operands.length; i < len; i++) {
                operand = operands[i].value;
                if (operand.type === OPERAND_TYPE.ARRAY) {
                    operand = operand.value;
                    tmp = [];
                    for (var j = 0, jlen = operand.length; j < jlen; j++) {
                        tmp = tmp.concat(operand[j]);
                    }
                    result.push({
                        type: OPERAND_TYPE.ARRAY,
                        value: tmp
                    });
                } else if (operand.type !== OPERAND_TYPE.RANGE && operand.type !== OPERAND_TYPE.UNION) {
                    result.push(operand);
                } else {
                    result.push(getValues(valueModule, isErrorSensitive, operand.value));
                }
            }
            return result;
        }
        function readRange(valueModule, isErrorSensitive, operands, range) {
            var result = [];
            var operand;
            var tmp;
            for (var i = 0, len = operands.length; i < len; i++) {
                operand = operands[i];
                if (operand.type === OPERAND_TYPE.ARRAY) {
                    operand = operand.value;
                    tmp = [];
                    for (var j = 0, jlen = operand.length; j < jlen; j++) {
                        tmp = tmp.concat(operand[j]);
                    }
                    result.push({
                        type: OPERAND_TYPE.ARRAY,
                        value: tmp
                    });
                } else if (operand.type !== OPERAND_TYPE.RANGE && operand.type !== OPERAND_TYPE.UNION) {
                    result.push(operand);
                } else {
                    result.push(getValuesInRange(valueModule, isErrorSensitive, operand.value, range));
                }
            }
            return result;
        }
        /* --------------------- in all ------------- */
        function getValues(valueModule, isErrorSensitive, cells) {
            if (isErrorSensitive) {
                return getValuesBlockError(valueModule, cells);
            } else {
                return getAllValuesIgnoreError(valueModule, cells);
            }
        }
        function getValuesBlockError(valueModule, cells) {
            var max = 100;
            var rowCells;
            var cell;
            var value;
            var row;
            var col;
            var result = [];
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    cell = rowCells[j];
                    row = cell.row;
                    col = cell.col;
                    if (row === undefined) {
                        for (var k = 0, klimit = max; k <= klimit; k++) {
                            value = valueModule.getComputedValueInfo(k, col);
                            if (value.type === F_VALUE_TYPE.ERROR) {
                                return value;
                            }
                            if (value.type === F_VALUE_TYPE.UNDEFINED) {
                                continue;
                            }
                            result.push(value);
                        }
                    } else if (col === undefined) {
                        for (var k = 0, klimit = max; k <= klimit; k++) {
                            value = valueModule.getComputedValueInfo(row, k);
                            if (value.type === F_VALUE_TYPE.ERROR) {
                                return value;
                            }
                            if (value.type === F_VALUE_TYPE.UNDEFINED) {
                                continue;
                            }
                            result.push(value);
                        }
                    } else {
                        value = valueModule.getComputedValueInfo(row, col);
                        if (value.type === F_VALUE_TYPE.ERROR) {
                            return value;
                        }
                        if (value.type === F_VALUE_TYPE.UNDEFINED) {
                            continue;
                        }
                        result.push(value);
                    }
                }
            }
            return {
                type: F_VALUE_TYPE.ARRAY,
                // 标记该结果是由单元格引用转化而来
                ref: true,
                value: result
            };
        }
        function getAllValuesIgnoreError(valueModule, cells) {
            var max = 100;
            var rowCells;
            var cell;
            var value;
            var row;
            var col;
            var result = [];
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    cell = rowCells[j];
                    row = cell.row;
                    col = cell.col;
                    if (row === undefined) {
                        for (var k = 0, klimit = max; k <= klimit; k++) {
                            value = valueModule.getComputedValueInfo(k, col);
                            if (value.type === F_VALUE_TYPE.UNDEFINED) {
                                continue;
                            }
                            result.push(value);
                        }
                    } else if (col === undefined) {
                        for (var k = 0, klimit = max; k <= klimit; k++) {
                            value = valueModule.getComputedValueInfo(row, k);
                            if (value.type === F_VALUE_TYPE.UNDEFINED) {
                                continue;
                            }
                            result.push(value);
                        }
                    } else {
                        value = valueModule.getComputedValueInfo(row, col);
                        if (value.type === F_VALUE_TYPE.d) {
                            continue;
                        }
                        result.push(value);
                    }
                }
            }
            return {
                type: F_VALUE_TYPE.ARRAY,
                // 标记该结果是由单元格引用转化而来
                ref: true,
                value: result
            };
        }
        /* --------------------- in range ------------- */
        function getValuesInRange(valueModule, isErrorSensitive, cells, range) {
            if (isErrorSensitive) {
                return getValuesInRangeBlockError(valueModule, cells, range);
            } else {
                return getAllValuesInRange(valueModule, cells, range);
            }
        }
        /**
     * 获取单元格值，如果遇到错误，就停止，且直接返回错误值
     */
        function getValuesInRangeBlockError(valueModule, cells, range) {
            var value;
            var rowCells;
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {}
            }
        }
        /**
     * 获取单元格值，不论是否遇到错误
     */
        function getAllValuesInRange() {}
    }
};

//src/core/header.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[83] = {
    value: function(require) {
        var Header = _p.r(0).create("Header", {
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initMessageHook();
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.show.header": this.showHeader,
                    "c.hide.header": this.hideHeader
                });
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.update
                });
            },
            update: function() {
                if (this.dataAccess.isShowHeader()) {
                    this.showHeaderContainer();
                } else {
                    this.hideHeaderContainer();
                }
            },
            showHeader: function() {
                this.dataAccess.setHeaderState(true);
                this.showHeaderContainer();
                this.postMessage("c.container.resize");
                this.coreRefresh(true);
            },
            hideHeader: function() {
                this.dataAccess.setHeaderState(false);
                this.hideHeaderContainer();
                this.postMessage("c.container.resize");
                this.coreRefresh(true);
            }
        });
        Header.deps = [ "dataAccess" ];
        return Header;
    }
};

//src/core/hidden.js
/**
 * @file 行列隐藏管理模块，该模块用于检查当前的行列是否被隐藏（宽度为0）
 * @author hancong03@baiud.com
 */
_p[84] = {
    value: function(require) {
        var Hidden = _p.r(0).create("Hidden", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.is.hidden.row": this.isHiddenRow,
                    "c.is.hidden.column": this.isHiddenColumn,
                    "c.hide.row": this.setHiddenRow,
                    "c.hide.column": this.setHiddenColumn,
                    "c.cancel.hidden.row": this.cancelHiddenRow,
                    "c.cancel.hidden.column": this.cancelHiddenColumn
                });
            },
            isHiddenRow: function(row) {
                return this.dataAccess.getHiddenRow(row) !== undefined;
            },
            isHiddenColumn: function(col) {
                return this.dataAccess.getHiddenColumn(col) !== undefined;
            },
            setHiddenRow: function(startIndex, endIndex) {
                var originalValue;
                if (endIndex === undefined) {
                    startIndex = endIndex;
                }
                for (var i = startIndex; i <= endIndex; i++) {
                    originalValue = this.dataAccess.getRowHeight(i) || 0;
                    this.dataAccess.setRowHeight(0, i);
                    this.dataAccess.setHiddenRow(i, originalValue);
                }
                this.coreRefresh(true);
            },
            setHiddenColumn: function(startIndex, endIndex) {
                var originalValue;
                if (endIndex === undefined) {
                    startIndex = endIndex;
                }
                for (var i = startIndex; i <= endIndex; i++) {
                    originalValue = this.dataAccess.getColumnWidth(i) || 0;
                    this.dataAccess.setColumnWidth(0, i);
                    this.dataAccess.setHiddenColumn(i, originalValue);
                }
                this.coreRefresh(true);
            },
            cancelHiddenRow: function(startIndex, endIndex) {
                var originalValue;
                if (endIndex === undefined) {
                    startIndex = endIndex;
                }
                for (var i = startIndex; i <= endIndex; i++) {
                    originalValue = this.dataAccess.getHiddenRow(i);
                    if (originalValue === 0) {
                        this.dataAccess.clearRowHeight(i);
                    } else {
                        this.dataAccess.setRowHeight(originalValue, i);
                    }
                    this.dataAccess.clearHiddenRow(i);
                }
                this.coreRefresh(true);
            },
            cancelHiddenColumn: function(startIndex, endIndex) {
                var originalValue;
                if (endIndex === undefined) {
                    startIndex = endIndex;
                }
                for (var i = startIndex; i <= endIndex; i++) {
                    originalValue = this.dataAccess.getHiddenColumn(i);
                    if (originalValue === 0) {
                        this.dataAccess.clearColumnWidth(i);
                    } else {
                        this.dataAccess.setColumnWidth(originalValue, i);
                    }
                    this.dataAccess.clearHiddenColumn(i);
                }
                this.coreRefresh(true);
            }
        });
        Hidden.deps = [ "dataAccess" ];
        return Hidden;
    }
};

//src/core/mode.js
/**
 * @file 控制只读模式的开闭
 * @author hancong03@baiud.com
 */
_p[85] = {
    value: function(require) {
        var Model = _p.r(0).create("Mode", {
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.is.readonly": this.isReadonly,
                    "c.set.readonly": this.setReadonly
                });
            },
            isReadonly: function() {
                return this.dataAccess.isReadonly();
            },
            setReadonly: function(state) {
                this.dataAccess.setReadonly(state);
            }
        });
        Model.deps = [ "dataAccess" ];
        return Model;
    }
};

//src/core/paster.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[86] = {
    value: function(require) {
        var common = _p.r(40);
        var Paster = _p.r(0).create("Paster", {
            dataAccess: null,
            valueModule: null,
            styleModule: null,
            base: _p.r(146),
            init: function(dataAccess, valueModule, styleModule) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.styleModule = styleModule;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.paste": this.paste
                });
            },
            paste: function(data, row, col) {
                var rowData;
                var current;
                var rowCount = data.length;
                var colCount = 0;
                var totalIndex = this.dataAccess.getTotalIndex();
                var valueModule = this.valueModule;
                var styleModule = this.styleModule;
                var r;
                var c;
                for (var i = 0, len = data.length; i < len; i++) {
                    colCount = Math.max(colCount, data[i].length);
                }
                this.corePrepareRefresh();
                if (row + rowCount > totalIndex.row) {
                    this.dataAccess.expandRow(Math.ceil((row + rowCount - totalIndex.row) / 100) * 100);
                }
                if (col + colCount > totalIndex.col) {
                    this.dataAccess.expandCol(Math.ceil((col + colCount - totalIndex.col) / 26) * 26);
                }
                for (var i = 0, len = data.length; i < len; i++) {
                    rowData = data[i];
                    if (!rowData) {
                        continue;
                    }
                    for (var j = 0, jlen = rowData.length; j < jlen; j++) {
                        current = rowData[j];
                        if (!current) {
                            continue;
                        }
                        r = row + i;
                        c = col + j;
                        valueModule.writeCell(current.content, r, c);
                        if (current.style) {
                            styleModule.batchSetStyle(current.style, r, c);
                        }
                    }
                }
                this.coreRefresh();
            }
        });
        Paster.deps = [ "dataAccess", "value", "style" ];
        return Paster;
    }
};

//src/core/range/range-facade.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[87] = {
    value: function(require) {
        return _p.r(0).create("RangeFacade", {
            dataAccess: null,
            cell: null,
            base: _p.r(143),
            init: function(cell, dataAccess) {
                this.cell = cell;
                this.dataAccess = dataAccess;
            },
            getFocus: function() {
                return this.dataAccess.getFocus();
            },
            getStart: function() {
                return this.dataAccess.getStart();
            },
            getEnd: function() {
                return this.dataAccess.getEnd();
            },
            getOriginalFocus: function() {
                return this.dataAccess.getOriginalFocus();
            },
            getAllSelection: function() {
                return this.dataAccess.getSelection();
            },
            isWritable: function() {
                return this.dataAccess.getWritable();
            },
            isMultiple: function() {
                var focus = this.getFocus();
                var start = this.getStart();
                var end = this.getEnd();
                if (start.row === end.row && start.col === end.col) {
                    return false;
                } else {
                    return !this.cell.isSameMergeCell(focus, start, end);
                }
            },
            isValid: function() {
                return this.getFocus().row !== -1;
            }
        });
    }
};

//src/core/range/range.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[88] = {
    value: function(require) {
        var RangeFacade = _p.r(87);
        var Range = _p.r(0).create("Range", {
            cell: null,
            hiddenModule: null,
            dataAccess: null,
            facade: null,
            base: _p.r(146),
            init: function(dataAccess, cell, hiddenModule) {
                this.dataAccess = dataAccess;
                this.cell = cell;
                this.hiddenModule = hiddenModule;
                this.facade = this.createComponent(RangeFacade, cell, dataAccess);
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
                    "c.selection.expand.left": this.expandLeft,
                    "c.select.column": this.selectColumn,
                    "c.select.row": this.selectRow,
                    "c.select.all": this.selectAll
                });
            },
            setRange: function(focus, start, end) {
                // 传递的是一个RangeFacade对象
                if (!start) {
                    start = focus.getStart();
                    end = focus.getEnd();
                    focus = focus.getFocus();
                }
                this.setFocus(focus.row, focus.col);
                this.setSelection(start, end);
                this.postMessage("c.range.change");
            },
            selectColumn: function(startIndex, endIndex) {
                var totalIndex = this.dataAccess.getTotalIndex();
                var totalRowIndex = totalIndex.row;
                var focusCol = startIndex;
                if (endIndex === undefined) {
                    endIndex = startIndex;
                }
                if (startIndex > endIndex) {
                    focusCol = endIndex;
                    endIndex = startIndex;
                    startIndex = focusCol;
                }
                var rowIndex = 0;
                var mergeCell;
                while (rowIndex <= totalRowIndex) {
                    if (this.cell.isMergeCell(rowIndex, startIndex)) {
                        mergeCell = this.cell.getMergeCell(rowIndex, startIndex);
                        rowIndex = mergeCell.end.row + 1;
                    } else {
                        break;
                    }
                }
                // --------- 整列被合并，则进行扩展选中
                if (rowIndex > totalRowIndex) {
                    this.setRange({
                        row: 0,
                        col: startIndex
                    }, {
                        row: 0,
                        col: startIndex
                    }, {
                        row: totalRowIndex,
                        col: endIndex
                    });
                    return;
                }
                this.setFocus(rowIndex, startIndex);
                this.setSelection({
                    row: 0,
                    col: startIndex
                }, {
                    row: totalRowIndex,
                    col: endIndex
                });
            },
            selectAll: function() {
                var totalIndex = this.dataAccess.getTotalIndex();
                this.setSelection({
                    row: 0,
                    col: 0
                }, {
                    row: totalIndex.row,
                    col: totalIndex.col
                });
                this.postMessage("c.range.change");
            },
            selectRow: function(startIndex, endIndex) {
                var totalIndex = this.dataAccess.getTotalIndex();
                var focusRow = startIndex;
                var totalColumnIndex = totalIndex.col;
                if (endIndex === undefined) {
                    endIndex = startIndex;
                }
                if (startIndex > endIndex) {
                    focusRow = endIndex;
                    endIndex = startIndex;
                    startIndex = focusRow;
                }
                var colIndex = 0;
                var mergeCell;
                while (colIndex <= totalColumnIndex) {
                    if (this.cell.isMergeCell(startIndex, colIndex)) {
                        mergeCell = this.cell.getMergeCell(startIndex, colIndex);
                        colIndex = mergeCell.end.col + 1;
                    } else {
                        break;
                    }
                }
                // --------- 整行被合并，则进行扩展选中
                if (colIndex > totalColumnIndex) {
                    this.setRange({
                        row: startIndex,
                        col: 0
                    }, {
                        row: startIndex,
                        col: 0
                    }, {
                        row: endIndex,
                        col: totalColumnIndex
                    });
                    return;
                }
                this.setFocus(startIndex, colIndex);
                this.setSelection({
                    row: startIndex,
                    col: 0
                }, {
                    row: endIndex,
                    col: totalColumnIndex
                });
            },
            setFocus: function(row, col) {
                var mergeCell;
                var start;
                var end;
                var focus = this.dataAccess.getFocus();
                if (row === focus.row && col === focus.col && this.dataAccess.getWritable()) {
                    return;
                }
                this.dataAccess.setOriginalFocus(row, col);
                if (this.cell.isMergeCell(row, col)) {
                    mergeCell = this.cell.getMergeCell(row, col);
                    focus = {
                        row: mergeCell.start.row,
                        col: mergeCell.start.col
                    };
                    start = {
                        row: mergeCell.start.row,
                        col: mergeCell.start.col
                    };
                    end = {
                        row: mergeCell.end.row,
                        col: mergeCell.end.col
                    };
                } else {
                    focus = {
                        row: row,
                        col: col
                    };
                    start = {
                        row: row,
                        col: col
                    };
                    end = {
                        row: row,
                        col: col
                    };
                }
                this.dataAccess.setFocus(focus.row, focus.col);
                this.setSelection(start, end);
                this.postMessage("c.focus.change");
                this.postMessage("c.range.change");
            },
            setSelection: function(start, end) {
                var tmp = this.cs("c.cell.compare", start, end);
                start = tmp.min;
                end = tmp.max;
                this.dataAccess.setWritable(true);
                tmp = this.cell.standardCellRange(start, end);
                this.dataAccess.setSelection(tmp.start, tmp.end);
                this.postMessage("c.range.change");
            },
            expandDown: function(count) {
                var start = this.dataAccess.getStart();
                var focus = this.dataAccess.getFocus();
                var end = this.dataAccess.getEnd();
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
                this.setSelection(tmp.min, tmp.max);
            },
            expandRight: function(count) {
                var start = this.dataAccess.getStart();
                var focus = this.dataAccess.getFocus();
                var end = this.dataAccess.getEnd();
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
                this.setSelection(tmp.min, tmp.max);
            },
            expandUp: function(count) {
                var start = this.dataAccess.getStart();
                var focus = this.dataAccess.getFocus();
                var end = this.dataAccess.getEnd();
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
                this.setSelection(tmp.min, tmp.max);
            },
            expandLeft: function(count) {
                var start = this.dataAccess.getStart();
                var focus = this.dataAccess.getFocus();
                var end = this.dataAccess.getEnd();
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
                this.setSelection(tmp.min, tmp.max);
            },
            disable: function() {
                this.dataAccess.setWritable(false);
                if (!true) {
                    this.dataAccess.clearRange();
                }
                this.postMessage("c.range.change");
            },
            getRange: function() {
                return this.facade;
            },
            moveDown: function(count) {
                var original = this.dataAccess.getOriginalFocus();
                var limit = this.dataAccess.getTotalIndex().row;
                count = count | 0;
                var mergeCell = this.cell.getMergeCell(original.row, original.col);
                if (mergeCell) {
                    count += mergeCell.end.row;
                } else {
                    count += original.row;
                }
                if (count > limit) {
                    return limit;
                }
                while (this.hiddenModule.isHiddenRow(count)) {
                    count++;
                }
                if (count > limit) {
                    return limit;
                }
                this.setFocus(count, original.col);
                this.postMessage("c.range.change");
                return this.dataAccess.getFocus().row;
            },
            moveUp: function(count) {
                var focus = this.dataAccess.getFocus();
                var original = this.dataAccess.getOriginalFocus();
                count = count | 0;
                count = focus.row - count;
                if (count < 0) {
                    return 0;
                }
                while (this.hiddenModule.isHiddenRow(count)) {
                    count--;
                }
                if (count < 0) {
                    return 0;
                }
                this.setFocus(count, original.col);
                this.postMessage("c.range.change");
                return this.dataAccess.getFocus().row;
            },
            moveLeft: function(count) {
                var focus = this.dataAccess.getFocus();
                var original = this.dataAccess.getOriginalFocus();
                count = count | 0;
                count = focus.col - count;
                if (count < 0) {
                    return 0;
                }
                while (this.hiddenModule.isHiddenColumn(count)) {
                    count--;
                }
                if (count < 0) {
                    return 0;
                }
                this.setFocus(original.row, count);
                this.postMessage("c.range.change");
                return this.dataAccess.getFocus().col;
            },
            moveRight: function(count) {
                var original = this.dataAccess.getOriginalFocus();
                var limit = this.dataAccess.getTotalIndex().col;
                count = count | 0;
                var mergeCell = this.cell.getMergeCell(original.row, original.col);
                if (mergeCell) {
                    count += mergeCell.end.col;
                } else {
                    count += original.col;
                }
                if (count > limit) {
                    return limit;
                }
                while (this.hiddenModule.isHiddenColumn(count)) {
                    count++;
                }
                if (count > limit) {
                    return limit;
                }
                this.setFocus(original.row, count);
                this.postMessage("c.range.change");
                return this.dataAccess.getFocus().col;
            }
        });
        Range.deps = [ "dataAccess", "cell", "hidden" ];
        return Range;
    }
};

//src/core/sheet.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[89] = {
    value: function(require) {
        var $ = _p.r(2);
        var Sheet = _p.r(0).create("Sheet", {
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.get.sheetname": this.getSheetName,
                    "c.get.sheetnames": this.getSheetNames,
                    "c.get.sheetindex": this.getSheetIndex,
                    "c.createsheet": this.createSheet,
                    "c.switchsheet": this.switchSheet,
                    "c.importsheet": this.importSheet
                });
            },
            createSheet: function(sheetName) {
                var index = this.dataAccess.addSheetName(sheetName);
                this.dataAccess.importSheet(index);
                this.postMessage("c.sheetschange");
                this.coreRefresh(true);
            },
            importSheet: function(index, sheetData) {
                this.dataAccess.importSheet(index, $._clone(sheetData));
            },
            switchSheet: function(index) {
                this.dataAccess.switchSheet(index);
                this.coreRefresh(true);
                this.postMessage("c.sheetschange");
                this.postMessage("c.range.change");
            },
            /**
         * 获取当前活动的工作表名称
         * @returns {*}
         */
            getSheetName: function() {
                return this.dataAccess.getSheetName();
            },
            getSheetIndex: function() {
                return this.dataAccess.getSheetIndex();
            },
            getSheetNames: function() {
                return this.dataAccess.getSheetNames();
            }
        });
        Sheet.deps = [ "dataAccess" ];
        return Sheet;
    }
};

//src/core/struct/struct-facade.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[90] = {
    value: function(require) {
        return _p.r(0).create("Struct", {
            dataAccess: null,
            valueModule: null,
            style: null,
            border: null,
            cell: null,
            wraptext: null,
            visible: null,
            comments: null,
            init: function(dataAccess, valueModule, style, border, cell, wraptext, visible, comments) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.style = style;
                this.border = border;
                this.cell = cell;
                this.wraptext = wraptext;
                this.visible = visible;
                this.comments = comments;
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
            getComments: function(row, col) {
                return this.comments.getComments(row, col);
            },
            getCommentsInView: function() {
                return this.comments.getCommentsInView();
            },
            getTotalIndex: function() {
                return this.dataAccess.getTotalIndex();
            },
            getBoundary: function() {
                return this.dataAccess.getBoundary();
            },
            getDimension: function() {
                return this.dataAccess.getDimension();
            },
            getSpace: function() {
                return this.dataAccess.getSpace();
            },
            getCellByName: function(name) {
                return this.dataAccess.getCellByName();
            },
            getComputedStyle: function(classify, row, col) {
                return this.style.getComputedStyle(classify, row, col);
            },
            getAllComputedStyle: function(row, col) {
                return this.style.getAllComputedStyle(row, col);
            },
            getRawStyle: function(classify, row, col) {
                return this.style.getStyle(classify, row, col);
            },
            getUserStyle: function(classify, row, col) {
                return this.style.getUserStyle(classify, row, col);
            },
            getDefaultStyle: function(classify) {
                return this.dataAccess.getDefaultStyle(classify);
            },
            getStyleIds: function(classify, start, end) {
                return this.dataAccess.getStyleIds(classify, start, end);
            },
            getStyleById: function(classify, id) {
                return this.dataAccess.getStyleById(classify, id);
            },
            getPane: function() {
                return this.dataAccess.getPane();
            },
            getDisplayValue: function(row, col) {
                return this.wraptext.getDisplayValue(row, col);
            },
            isShowHeader: function() {
                return this.dataAccess.isShowHeader();
            },
            getComputedValue: function(row, col) {
                return this.valueModule.getComputedValue(row, col);
            },
            getFormattedValue: function(row, col) {
                return this.valueModule.getFormattedValue(row, col);
            },
            getStandardValue: function(row, col) {
                return this.valueModule.getStandardValue(row, col);
            },
            getComputedValueInfo: function(row, col) {
                return this.valueModule.getComputedValueInfo(row, col);
            },
            getFormattedValueInfo: function(row, col) {
                return this.valueModule.getFormattedValueInfo(row, col);
            },
            getRawValue: function(row, col) {
                return this.valueModule.getRawValue(row, col);
            },
            getEffectiveIndex: function() {
                return this.dataAccess.getEffectiveIndex();
            },
            getBorder: function(row, col) {
                return this.border.getBorder(row, col);
            },
            getBorders: function(start, end) {
                return this.border.getBorders(start, end);
            },
            getAllMergeCell: function() {
                return this.cell.getAllMergeCell();
            },
            getMergeCell: function(row, col) {
                return this.cell.getMergeCell(row, col);
            },
            isMergeCell: function(row, col) {
                return this.cell.isMergeCell(row, col);
            },
            getMergeCellsInRange: function(range) {
                return this.cell.getMergeCellsInRange(range);
            },
            getColumnWidth: function(col) {
                return this.cell.getColumnWidth(col);
            },
            getRowHeight: function(row) {
                return this.cell.getRowHeight(row);
            },
            getRawRowHeight: function(row) {
                return this.dataAccess.getRowHeight(row);
            },
            getRawColumnWidth: function(col) {
                return this.dataAccess.getColumnWidth(col);
            },
            columnIsVisible: function(col) {
                return this.visible.columnIsVisible(col);
            },
            rowIsVisible: function(row) {
                return this.visible.rowIsVisible(row);
            },
            rowIsFullVisible: function(row) {
                return this.visible.rowIsFullVisible(row);
            },
            columnIsFullVisible: function(col) {
                return this.visible.columnIsFullVisible(col);
            },
            getViewPosition: function(row, col) {
                return this.visible.getViewPosition(row, col);
            }
        });
    }
};

//src/core/struct/struct.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[91] = {
    value: function(require) {
        var StructFacade = _p.r(90);
        var basic = _p.r(42);
        var Struct = _p.r(0).create("Struct", {
            base: _p.r(146),
            //-------- component
            actuary: null,
            dataAccess: null,
            init: function(dataAccess, actuary, valueModule, style, border, cell, wraptext, visible, comments) {
                this.dataAccess = dataAccess;
                this.actuary = actuary;
                this.structFacade = this.createComponent(StructFacade, dataAccess, valueModule, style, border, cell, wraptext, visible, comments);
                this.initService();
            },
            load: function(source) {
                this.rs("c.import", source);
                this.postMessage("c.init");
                this.actuary.reinit();
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
        Struct.deps = [ "dataAccess", "actuary", "value", "style", "border", "cell", "wraptext", "visible", "comments" ];
        return Struct;
    }
};

//src/core/style/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[92] = {
    value: function(require) {
        var TYPE_STYLE = _p.r(93);
        var Style = _p.r(0).create("Style", {
            dataAccess: null,
            valueModule: null,
            base: _p.r(146),
            init: function(dataAccess, valueModule) {
                this.dataAccess = dataAccess;
                this.valueModule = valueModule;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.setstyle": this.setStyle,
                    "c.batch.setstyle": this.batchSetStyle,
                    "c.clear.style": this.clearStyle,
                    "c.set.column.style": this.setColumnStyle,
                    "c.set.row.style": this.setRowStyle,
                    "c.set.cellstyles": this.setCellStyles
                });
            },
            /**
         * 原始值的样式
         * 不包含格式化代码颜色
         */
            getStyle: function(classify, row, col) {
                var cellType = this.valueModule.getRawType(row, col);
                var userStyle = this.getUserStyle(classify, row, col);
                var typeStyle = this.__getTypeStyle(cellType, classify);
                var res = $._extend($._clone(this.dataAccess.getDefaultStyle(classify)), typeStyle, userStyle);
                return res;
            },
            getAllComputedStyle: function(row, col) {
                var fontStyle = this.getComputedStyle("fonts", row, col);
                var fillStyle = this.getComputedStyle("fills", row, col);
                var alignmentStyle = this.getComputedStyle("alignments", row, col);
                return $.extend({}, fontStyle, fillStyle, alignmentStyle);
            },
            /**
         * 获取指定单元格的计算后的样式表
         * 该样式包含格式化代码颜色
         * @param row
         * @param col
         */
            getComputedStyle: function(classify, row, col) {
                var computedCellType = this.valueModule.getComputedValueInfo(row, col).type;
                var userStyle = this.getUserStyle(classify, row, col);
                var typeStyle = this.__getTypeStyle(computedCellType, classify);
                var formatColor;
                var result;
                result = $._extend($._clone(this.dataAccess.getDefaultStyle(classify)), typeStyle, userStyle);
                if (classify === "fonts") {
                    formatColor = this.valueModule.getFormatColor(row, col);
                }
                if (formatColor) {
                    result.color = formatColor;
                }
                return result;
            },
            getUserStyle: function(classify, row, col) {
                return this.dataAccess.getStyle(classify, row, col);
            },
            setStyle: function(styleName, styleValue, start, end) {
                this.dataAccess.setStyle(styleName, styleValue, start, end);
                this.postMessage("c.stylechange", start, end);
                this.coreRefresh(true);
            },
            batchSetStyle: function(styleOptions, row, col) {
                this.dataAccess.batchSetStyle(styleOptions, {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
                this.postMessage("c.stylechange", {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
                this.coreRefresh(true);
            },
            setColumnStyle: function(styleName, styleValue, startIndex, endIndex) {
                var totalIndex = this.dataAccess.getTotalIndex();
                this.dataAccess.setColumnStyle(styleName, styleValue, startIndex, endIndex);
                this.postMessage("c.stylechange", {
                    row: 0,
                    col: startIndex
                }, {
                    row: totalIndex.row,
                    col: endIndex
                });
                this.coreRefresh(true);
            },
            // 设置单元格主题样式
            setCellStyles: function(styleOption, start, end) {
                this.dataAccess.setCellStyles(styleOption, start, end);
                this.coreRefresh(true);
            },
            setRowStyle: function(styleName, styleValue, startIndex, endIndex) {
                var totalIndex = this.dataAccess.getTotalIndex();
                this.dataAccess.setRowStyle(styleName, styleValue, startIndex, endIndex);
                this.postMessage("c.stylechange", {
                    row: startIndex,
                    col: 0
                }, {
                    row: endIndex,
                    col: totalIndex.col
                });
                this.coreRefresh(true);
            },
            clearStyle: function(start, end) {
                this.dataAccess.clearStyle(start, end);
                this.postMessage("c.stylechange", start, end);
                this.coreRefresh(true);
            },
            /**
         * 根据值的类型获取样式
         */
            __getTypeStyle: function(cellType, classify) {
                var style = TYPE_STYLE[cellType];
                if (!style) {
                    return;
                }
                return style[classify];
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
_p[93] = {
    value: {
        TEXT: {},
        NUMBER: {
            alignments: {
                horizontal: "right"
            }
        },
        LOGICAL: {
            alignments: {
                horizontal: "center"
            }
        },
        ERROR: {
            alignments: {
                horizontal: "center"
            }
        }
    }
};

//src/core/value-security.js
/**
 * @file 值更改安全管理器，防止非法写入
 * @author hancong03@baiud.com
 */
_p[94] = {
    value: function(require) {
        var ValueSecurity = _p.r(0).create("ValueSecurity", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
            },
            check: function(row, col, isCSE) {
                if (isCSE) {
                    return true;
                }
                var arrayRef = this.dataAccess.getArrayReference(row, col);
                if (arrayRef) {
                    return false;
                }
                return true;
            }
        });
        ValueSecurity.deps = [ "dataAccess" ];
        return ValueSecurity;
    }
};

//src/core/value/code-flag.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[95] = {
    value: function() {
        return {
            DECIMAL: 0,
            SCIENTIFIC: 1,
            DATETIME: 2,
            FRACTION: 4
        };
    }
};

//src/core/value/code-parser.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[96] = {
    value: function(require) {
        var cache = {};
        var LOGICAL_OPERATOR_PATTERN = /^(>=|<=|>|<|=)(\d+)/;
        var DATE_TIME_PATTERN = /[HMSymd]/;
        var DATE_PATTERN = /[ymd]/;
        var TIME_PATTERN = /[HMS]/;
        var CODE_FLAG = _p.r(95);
        var COLOR = "[black][blue][cyan][green][magenta][red][white][yellow]";
        return {
            getFormatColor: function(code, segmentIndex) {
                var segments = getSegments(code);
                return (segments[segmentIndex] || segments[0]).color;
            },
            getNumberSegment: function(value, code) {
                var segments = getSegments(code);
                if (value > 0) {
                    return {
                        index: 0,
                        select: 0,
                        segment: segments[0]
                    };
                } else if (value < 0) {
                    if (segments[1]) {
                        return {
                            index: 1,
                            select: 1,
                            segment: segments[1]
                        };
                    }
                    return {
                        index: 1,
                        select: 0,
                        segment: segments[0]
                    };
                } else {
                    if (segments[2]) {
                        return {
                            index: 2,
                            select: 2,
                            segment: segments[2]
                        };
                    }
                    return {
                        index: 2,
                        select: 0,
                        segment: segments[0]
                    };
                }
            },
            getTextSegment: function(code) {
                var segments = getSegments(code);
                return segments[3];
            }
        };
        function getSegments(code) {
            if (cache[code]) {
                return cache[code];
            }
            var segments = [];
            cache[code] = segments;
            var currentSegments;
            var currentCode;
            var c;
            var j;
            var formatResult = formatCode(code);
            var effectiveSymbols = formatResult.effectiveSymbols;
            var effectiveStr;
            code = formatResult.symbols;
            // 格式检测
            for (var i = 0, len = effectiveSymbols.length; i < len; i++) {
                currentSegments = {};
                segments.push(currentSegments);
                effectiveStr = effectiveSymbols[i];
                currentCode = code[i];
                currentSegments.color = currentCode.color;
                currentSegments.condition = currentCode.condition;
                // 日期时间
                if (DATE_TIME_PATTERN.test(effectiveStr)) {
                    currentSegments.flag = CODE_FLAG.DATETIME;
                    currentSegments.value = currentCode;
                    effectiveStr = effectiveStr.replace("AM/PM", "");
                    if (DATE_PATTERN.test(effectiveStr)) {
                        currentSegments.hasDate = true;
                    }
                    if (TIME_PATTERN.test(effectiveStr)) {
                        currentSegments.hasTime = true;
                    }
                    j = 0;
                    while (c = currentCode[j++]) {
                        if (c === "AM/PM" || c === "A/P") {
                            currentSegments.dSign = c;
                            break;
                        }
                    }
                    continue;
                }
                // 科学计数法
                if (effectiveStr.indexOf("e") !== -1) {
                    currentSegments.flag = CODE_FLAG.SCIENTIFIC;
                    j = 0;
                    while (c = currentCode[j++]) {
                        if (c === "e+" || c === "e-") {
                            currentSegments.eSign = c;
                            currentSegments.value = currentCode.slice(0, j);
                            currentSegments.exponent = currentCode.slice(j);
                            break;
                        }
                    }
                    continue;
                }
                // 分数
                if (effectiveStr.indexOf("/") !== -1) {
                    currentSegments.flag = CODE_FLAG.FRACTION;
                    currentSegments.value = currentCode;
                    continue;
                }
                // other
                currentSegments.flag = CODE_FLAG.DECIMAL;
                currentSegments.value = currentCode;
            }
            // 占位符检测
            for (var i = 0, len = segments.length; i < len; i++) {
                currentSegments = segments[i];
                currentSegments.value = analyzeToken(currentSegments.value);
                if (currentSegments.eSign) {
                    currentSegments.exponent = analyzeToken(currentSegments.exponent);
                }
            }
            return segments;
        }
        function formatCode(code) {
            var record = [ [] ];
            var c;
            var str;
            var symbols = [ [] ];
            var index = 0;
            var tmp;
            var originalCode = code.split("");
            code = code.toLowerCase().split("");
            for (var i = 0, len = code.length; i < len; i++) {
                c = code[i];
                switch (c) {
                  case "!":
                  case "\\":
                    record[index].push({
                        str: originalCode[++i],
                        index: symbols[index].length
                    });
                    break;

                  case '"':
                    str = [];
                    while (c = originalCode[++i]) {
                        if (c !== '"') {
                            str.push(c);
                        } else {
                            break;
                        }
                    }
                    record[index].push({
                        str: str.join(""),
                        index: symbols[index].length
                    });
                    break;

                  case "[":
                    str = [];
                    while (c = code[++i]) {
                        if (c !== "]") {
                            str.push(c);
                        } else {
                            break;
                        }
                    }
                    analyzeControlToken(symbols[index], str.join(""));
                    break;

                  case ";":
                    index++;
                    symbols[index] = [];
                    record[index] = [];
                    break;

                  case "_":
                    symbols[index].push(" ");
                    i++;
                    break;

                  case "a":
                    if (code.slice(i + 1, i + 5).join("") === "m/pm") {
                        symbols[index].push(originalCode.slice(i, i + 5).join("").toUpperCase());
                        i += 5;
                    } else if (code.slice(i + 1, i + 3).join("") === "/p") {
                        symbols[index].push(originalCode.slice(i, i + 3).join("").toUpperCase());
                        i += 3;
                    }
                    break;

                  case "e":
                    symbols[index].push(c + code[i + 1]);
                    i++;
                    break;

                  case "y":
                  case "d":
                  case "h":
                  case "s":
                  case "m":
                    str = c;
                    while (tmp = code[i + 1]) {
                        if (c === tmp) {
                            str += tmp;
                            i++;
                        } else {
                            break;
                        }
                    }
                    if (str.indexOf("h") !== -1 || str.indexOf("s") !== -1) {
                        str = str.toUpperCase();
                    }
                    symbols[index].push(str);
                    break;

                  default:
                    symbols[index].push(c.toLowerCase());
                }
            }
            var currentsymbols;
            var currentRecord;
            var hasHour;
            var lastMinuteIndex = -1;
            var effectiveSymbols = [];
            // 日期时间中的"m"调整
            for (var i = 0, len = symbols.length; i < len; i++) {
                currentsymbols = symbols[i];
                hasHour = false;
                lastMinuteIndex = -1;
                for (var j = 0, jlen = currentsymbols.length; j < jlen; j++) {
                    c = currentsymbols[j];
                    if (c.indexOf("H") !== -1) {
                        hasHour = true;
                        continue;
                    }
                    if (c.indexOf("m") !== -1) {
                        if (hasHour) {
                            hasHour = false;
                            currentsymbols[j] = c.toUpperCase();
                        } else {
                            lastMinuteIndex = j;
                        }
                        continue;
                    }
                    if (c.indexOf("S") !== -1 && lastMinuteIndex !== -1) {
                        lastMinuteIndex = -1;
                        currentsymbols[j] = currentsymbols[j].toUpperCase();
                    }
                }
                effectiveSymbols[i] = currentsymbols.join("");
            }
            var prevCodeIndex = -1;
            // 合并连续的文本代码段
            for (var i = 0, len = symbols.length; i < len; i++) {
                currentRecord = record[i];
                tmp = [];
                prevCodeIndex = -1;
                for (var j = 0, jlen = currentRecord.length; j < jlen; j++) {
                    c = currentRecord[j];
                    if (prevCodeIndex !== -1 && c.index === prevCodeIndex) {
                        tmp[tmp.length - 1].str += c.str;
                    } else {
                        tmp.push(c);
                    }
                    prevCodeIndex = c.index;
                }
                record[i] = tmp;
            }
            // 合并文本段和占位符段
            for (var i = 0, len = symbols.length; i < len; i++) {
                currentRecord = record[i];
                currentsymbols = symbols[i];
                for (var j = currentRecord.length - 1; j >= 0; j--) {
                    c = currentRecord[j];
                    currentsymbols.splice(c.index, 0, [ c.str ]);
                }
            }
            return {
                symbols: symbols,
                effectiveSymbols: effectiveSymbols
            };
        }
        function analyzeToken(code) {
            var c;
            var i = 0;
            var isFront = true;
            var result = {
                // 小数点前code，包含小数点本身
                front: [],
                // 小数点后code
                back: [],
                // 前部分中的数字替换符个数
                frontCount: 0,
                // 后部分中的数字替换符个数
                backCount: 0
            };
            var segments = result.front;
            while (c = code[i++]) {
                segments.push(c);
                if ($.isArray(c)) {
                    continue;
                }
                // control
                if (c.charAt(0) === "[") {
                    continue;
                }
                switch (c) {
                  case ".":
                    if (isFront) {
                        isFront = false;
                        segments = result.back;
                    }
                    break;

                  case "0":
                  case "#":
                  case "?":
                    if (isFront) {
                        result.frontCount++;
                    } else {
                        result.backCount++;
                    }
                    break;
                }
            }
            return result;
        }
        function analyzeControlToken(tokenGroup, code) {
            if (COLOR.indexOf("[" + code + "]") !== -1) {
                tokenGroup.color = code;
                return;
            }
            if (LOGICAL_OPERATOR_PATTERN.test(code)) {
                tokenGroup.condition = [ RegExp.$1, parseFloat(RegExp.$2) ];
                return;
            }
            tokenGroup.push("[" + code + "]");
        }
    }
};

//src/core/value/color-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[97] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NumberFormatter = _p.r(112);
        var LOGICAL_VALUE = _p.r(125);
        var CodeParser = _p.r(96);
        return _p.r(0).create("Formatter", {
            dataAccess: null,
            base: _p.r(143),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
            },
            /**
         * 根据传递进来的内容和单元格，获取该内容最适合于该单元格的值和CODE。
         * @param content
         * @param row
         * @param col
         * @returns {*}
         */
            calculateFormatColor: function(cellType, cotnent, code) {
                if (!code || !cotnent) {
                    return undefined;
                }
                var partIndex;
                switch (cellType) {
                  case CELL_TYPE.UNDEFINED:
                  case CELL_TYPE.ERROR:
                    return undefined;

                  case CELL_TYPE.NUMBER:
                    if (cotnent > 0) {
                        partIndex = 0;
                    } else if (cotnent < 0) {
                        partIndex = 1;
                    } else {
                        partIndex = 2;
                    }
                    break;

                  case CELL_TYPE.TEXT:
                  case CELL_TYPE.LOGICAL:
                    partIndex = 4;
                    break;
                }
                return CodeParser.getFormatColor(code, partIndex);
            },
            getStandardValue: function(row, col) {
                var cellType = this.dataAccess.getCellType(row, col);
                if (!cellType) {
                    return undefined;
                }
                var rawValue = this.dataAccess.getValue(row, col);
                switch (cellType) {
                  case CELL_TYPE.TEXT:
                  case CELL_TYPE.ERROR:
                    return rawValue;

                  case CELL_TYPE.NUMBER:
                    return NumberFormatter.getStandardValue(rawValue, this.dataAccess.getNumberFormat(row, col));

                  case CELL_TYPE.LOGICAL:
                    return rawValue ? LOGICAL_VALUE.TRUE : LOGICAL_VALUE.FALSE;
                }
            }
        });
    }
};

//src/core/value/format/analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[98] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var AccurateAnalyzer = _p.r(99);
        return {
            /**
         * 对传递进来的内容进行格式化，并返回格式化后的值和类型
         * @param content
         * @returns {*}
         */
            exec: function(content, numberFormatCode) {
                if (!content) {
                    return {
                        type: CELL_TYPE.UNDEFINED,
                        value: undefined
                    };
                }
                return AccurateAnalyzer.exec(content, numberFormatCode);
            }
        };
    }
};

//src/core/value/format/analyzer/accurate-analyzer.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[99] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NumberAnalyzer = _p.r(102);
        var LogicalAnalyzer = _p.r(101);
        var ErrorAnalyzer = _p.r(100);
        return {
            exec: function(content, numberFormatCode) {
                var result;
                if (!content) {
                    return {
                        type: CELL_TYPE.UNDEFINED,
                        value: undefined
                    };
                }
                if (content.charAt("0") === "=" && content.length > 1) {
                    return {
                        type: CELL_TYPE.FORMULA,
                        value: content
                    };
                }
                var trimContent = content.trim();
                // 检查类型是否是数字类型
                result = NumberAnalyzer.exec(trimContent, numberFormatCode);
                if (result) {
                    return result;
                }
                // 是否是逻辑类型
                result = LogicalAnalyzer.exec(trimContent);
                if (result) {
                    return result;
                }
                // 是否是ERROR类型
                result = ErrorAnalyzer.exec(trimContent);
                if (result) {
                    return result;
                }
                return {
                    type: CELL_TYPE.TEXT,
                    value: content
                };
            }
        };
    }
};

//src/core/value/format/analyzer/error.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[100] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var ERROR_VALUE = _p.r(123);
        var ERROR_VALUE_STRING = [];
        for (var key in ERROR_VALUE) {
            if (ERROR_VALUE.hasOwnProperty(key)) {
                ERROR_VALUE_STRING.push(ERROR_VALUE[key]);
            }
        }
        ERROR_VALUE_STRING = "," + ERROR_VALUE_STRING.join(",") + ",";
        return {
            exec: function(content) {
                content = content.toUpperCase();
                if (content.indexOf(",") === -1 && ERROR_VALUE_STRING.indexOf("," + content + ",") !== -1) {
                    return {
                        type: CELL_TYPE.ERROR,
                        value: content
                    };
                }
                return false;
            }
        };
    }
};

//src/core/value/format/analyzer/logical.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[101] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var LOGICAL_VALUE = _p.r(125);
        return {
            exec: function(content) {
                content = content.toUpperCase();
                if (content === LOGICAL_VALUE.TRUE || content === LOGICAL_VALUE.FALSE) {
                    return {
                        type: CELL_TYPE.LOGICAL,
                        value: +(content === LOGICAL_VALUE.TRUE) + ""
                    };
                }
                return false;
            }
        };
    }
};

//src/core/value/format/analyzer/number.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[102] = {
    value: function(require) {
        var NumericAnalyzer = _p.r(106);
        var DateTimeAnalyzer = _p.r(104);
        var CurrencyAnalyzer = _p.r(103);
        var PercentAnalyzer = _p.r(107);
        var FractionAnalyzer = _p.r(105);
        var CodeParser = _p.r(96);
        var CODE_FLAG = _p.r(95);
        return {
            exec: function(content, code) {
                var result;
                var segment;
                // 检查类型是否是数字类型
                if ($.isNumeric(content)) {
                    result = NumericAnalyzer.exec(content);
                }
                if (code) {
                    segment = CodeParser.getNumberSegment(content, code).segment;
                }
                // 未设置格式化代码或者格式化代码中包含日期时间格式时，优先进行日期检查
                if (!code || segment.flag & (CODE_FLAG.DATE | CODE_FLAG.TIME | CODE_FLAG.DATETIME)) {
                    // 日期检查
                    if (!result) {
                        result = DateTimeAnalyzer.exec(content);
                    }
                    // 分数检查
                    if (!result) {
                        result = FractionAnalyzer.exec(content);
                    }
                } else {
                    // 分数检查
                    if (!result) {
                        result = FractionAnalyzer.exec(content);
                    }
                    // 日期检查
                    if (!result) {
                        result = DateTimeAnalyzer.exec(content);
                    }
                }
                // 货币检查
                if (!result) {
                    result = CurrencyAnalyzer.exec(content);
                }
                // 百分比检查
                if (!result) {
                    result = PercentAnalyzer.exec(content);
                }
                if (result) {
                    return result;
                }
                return false;
            }
        };
    }
};

//src/core/value/format/analyzer/number/currency.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[103] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var PATTERN = /^(?:\$|¥)([\s\S]+)$/;
        var FORMAT_CODE = _p.r(124);
        return {
            exec: function(content) {
                if (!PATTERN.test(content)) {
                    return false;
                }
                if (!$.isNumeric(RegExp.$1)) {
                    return false;
                }
                return {
                    type: CELL_TYPE.NUMBER,
                    subType: NUMBER_FORMAT.CURRENCY,
                    format: FORMAT_CODE._default[NUMBER_FORMAT.CURRENCY],
                    value: +RegExp.$1 + ""
                };
            }
        };
    }
};

//src/core/value/format/analyzer/number/datetime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[104] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var DateTimeConverter = _p.r(108);
        var FORMAT_CODE = _p.r(124);
        var MAX_YEAR = 9999;
        var MIN_YEAR = 1900;
        return {
            exec: function(content) {
                var result;
                result = checkDate(content);
                if (result) {
                    return {
                        type: CELL_TYPE.NUMBER,
                        subType: NUMBER_FORMAT.DATE,
                        format: FORMAT_CODE._default[NUMBER_FORMAT.DATE],
                        value: DateTimeConverter.dateToNumber(result.year, result.month, result.day) + ""
                    };
                }
                result = checkTime(content);
                if (result) {
                    return {
                        type: CELL_TYPE.NUMBER,
                        subType: NUMBER_FORMAT.TIME,
                        format: FORMAT_CODE._default[NUMBER_FORMAT.TIME],
                        value: DateTimeConverter.timeToNumber(result.hour, result.minute, result.second) + ""
                    };
                }
                return false;
            }
        };
        function checkDate(content) {
            var year;
            var month;
            var day;
            if (/^(\d{1,4})年(\d{1,2})月(\d{1,2})日$/i.test(content) || /^(\d{1,4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/i.test(content)) {
                year = RegExp.$1;
                month = RegExp.$2;
                day = RegExp.$3;
                if (year.length === 2) {
                    year = "20" + year;
                } else if (year.length === 1) {
                    year = "200" + year;
                }
            } else if (/^\d{1,2}月\d{1,2}日$/i.test(content) || /^(\d{1,2})[\/\-](\d{1,2})$/i.test(content)) {
                year = new Date().getFullYear() + "";
                month = RegExp.$1;
                day = RegExp.$2;
            } else if (/^\d{1,4}年\d{1,2}月$/i.test(content)) {
                year = RegExp.$1;
                month = RegExp.$2;
                day = new Date().getDate() + "";
            } else {
                return false;
            }
            if (!validateDate(+year, +month, +day)) {
                return false;
            }
            return {
                year: +year,
                month: +month,
                day: +day
            };
        }
        function checkTime(content) {
            var hour;
            var minute;
            var second;
            if (/^(\d{1,2})时(\d{1,2})分(\d{1,2})秒$/i.test(content) || /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/i.test(content)) {
                hour = RegExp.$1;
                minute = RegExp.$2;
                second = RegExp.$3;
            } else if (/^\d{1,2}时\d{1,2}分$/i.test(content) || /^(\d{1,2}):(\d{1,2})$/i.test(content)) {
                hour = RegExp.$1;
                minute = RegExp.$2;
                second = "0";
            } else if (/^\d{1,2}分\d{1,2}秒$/i.test(content)) {
                hour = "0";
                minute = RegExp.$1;
                second = RegExp.$2;
            } else {
                return false;
            }
            if (!validateTime(+hour, +minute, +second)) {
                return false;
            }
            return {
                hour: +hour,
                minute: +minute,
                second: +second
            };
        }
        function validateDate(year, month, day) {
            if (year > MAX_YEAR || year < MIN_YEAR) {
                return false;
            }
            var tmp = new Date(Date.UTC(year, month - 1, day));
            if (tmp.getUTCDate() !== day) {
                return false;
            }
            if (tmp.getUTCMonth() !== month - 1) {
                return false;
            }
            if (tmp.getUTCFullYear() !== year) {
                return false;
            }
            return true;
        }
        function validateTime(hour, minute, second) {
            if (hour >= 24 || hour < 0) {
                return false;
            }
            if (minute >= 60 || minute < 0) {
                return false;
            }
            if (second >= 60 || second < 0) {
                return false;
            }
            return true;
        }
    }
};

//src/core/value/format/analyzer/number/fraction.js
/**
 * @file 百分比分析器
 * @author hancong03@baiud.com
 */
_p[105] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var PATTERN = /^(?:(\d+)\s)?(\d+)\/(\d+)$/;
        var FORMAT_CODE = _p.r(124);
        return {
            exec: function(content) {
                var mixed;
                var numerator;
                var denominator;
                if (!PATTERN.test(content)) {
                    return false;
                }
                mixed = +RegExp.$1;
                numerator = +RegExp.$2;
                denominator = +RegExp.$3;
                return {
                    type: CELL_TYPE.NUMBER,
                    subType: NUMBER_FORMAT.FRACTION,
                    format: FORMAT_CODE._default[NUMBER_FORMAT.FRACTION],
                    value: mixed + numerator / denominator + ""
                };
            }
        };
    }
};

//src/core/value/format/analyzer/number/numeric.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[106] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var FORMAT_CODE = _p.r(124);
        return {
            exec: function(content) {
                if (content.toLowerCase().indexOf("e") !== -1) {
                    return {
                        type: CELL_TYPE.NUMBER,
                        subType: NUMBER_FORMAT.SCIENTIFIC,
                        format: FORMAT_CODE._default[NUMBER_FORMAT.SCIENTIFIC],
                        value: +content + ""
                    };
                }
                return {
                    type: CELL_TYPE.NUMBER,
                    subType: NUMBER_FORMAT.GENERAL,
                    value: +content + ""
                };
            }
        };
    }
};

//src/core/value/format/analyzer/number/percent.js
/**
 * @file 百分比分析器
 * @author hancong03@baiud.com
 */
_p[107] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var PATTERN = /^([\s\S]+)%$/;
        var FORMAT_CODE = _p.r(124);
        return {
            exec: function(content) {
                if (!PATTERN.test(content)) {
                    return false;
                }
                if (!$.isNumeric(RegExp.$1)) {
                    return false;
                }
                return {
                    type: CELL_TYPE.NUMBER,
                    subType: NUMBER_FORMAT.PERCENT,
                    format: FORMAT_CODE._default[NUMBER_FORMAT.PERCENT],
                    value: +RegExp.$1 + ""
                };
            }
        };
    }
};

//src/core/value/format/converter/datetime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[108] = {
    value: function(require) {
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
                number = number - parseInt(number, 10);
                if (number === 0) {
                    return {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        totalSecond: 0
                    };
                }
                var totalSecond = Math.round(number / SECOND_UNIT);
                var hour = Math.floor(totalSecond / SECOND_OF_HOUR);
                return {
                    hour: hour,
                    minute: Math.floor(totalSecond % SECOND_OF_HOUR / 60),
                    second: totalSecond % 60,
                    totalSecond: totalSecond,
                    am: hour < 12
                };
            }
        };
    }
};

//src/core/value/format/format.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[109] = {
    value: function(require) {
        var Analyzer = _p.r(98);
        return _p.r(0).create("Format", {
            dataAccess: null,
            base: _p.r(143),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.format.type": this.analyzeType
                });
            },
            /**
         * 根据传递进来的内容和单元格，获取该内容最适合于该单元格的值和CODE。
         * @param content
         * @param row
         * @param col
         * @returns {*}
         */
            analyzeFormatInfo: function(content, row, col) {
                return Analyzer.exec(content, this.dataAccess.getNumberFormat(row, col));
            },
            analyzeType: function(content) {
                return Analyzer.exec(content).type;
            }
        });
    }
};

//src/core/value/formatter/format-util.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[110] = {
    value: function(require) {
        // 字面量列表
        // 句点（.）也按字面量进行处理
        var LITERAL = "$¥+(:^'{<=-/)&~}> .";
        return {
            formatLeftPart: function(value, segment) {
                value = value.split("");
                return __doFrontFormat(value, segment);
            },
            formatRightPart: function(value, segment) {
                value = value.split("");
                return __doBackFormat(value, segment);
            }
        };
        function __doFrontFormat(value, segment) {
            var result = [];
            var currentValueChar;
            var currentCodeChar;
            var firstString = "";
            var endIndex = 0;
            if ($.isArray(segment[0])) {
                endIndex = 1;
                firstString = segment[0][0];
            }
            var valueIndex = value.length - 1;
            for (var i = segment.length - 1; i >= endIndex; i--) {
                currentCodeChar = segment[i];
                currentValueChar = value[valueIndex];
                // 纯文本， 直接输入
                if ($.isArray(currentCodeChar)) {
                    result.push(currentCodeChar[0]);
                    continue;
                }
                if (LITERAL.indexOf(currentCodeChar) !== -1) {
                    result.push(currentCodeChar);
                    continue;
                }
                // TODO 暂时不处理*
                if (currentCodeChar === "*") {
                    continue;
                }
                if (currentCodeChar === "," && currentValueChar) {
                    result.push(currentCodeChar);
                    continue;
                }
                if (currentCodeChar === "%") {
                    result.push(currentCodeChar);
                    continue;
                }
                // 增加value index
                valueIndex--;
                if (currentCodeChar === "0") {
                    result.push(currentValueChar || 0);
                    continue;
                }
                if (currentCodeChar === "#" && currentValueChar) {
                    result.push(currentValueChar);
                    continue;
                }
                if (currentCodeChar === "?" && currentValueChar) {
                    result.push(currentValueChar || " ");
                    continue;
                }
            }
            value = value.slice(0, valueIndex + 1);
            return firstString + value.join("") + result.reverse().join("");
        }
        function __doBackFormat(value, segment) {
            var result = [];
            var currentValueChar;
            var currentCodeChar;
            var valueIndex = 0;
            for (var i = 0, len = segment.length; i < len; i++) {
                currentCodeChar = segment[i];
                currentValueChar = value[valueIndex];
                // 纯文本， 直接输入
                if ($.isArray(currentCodeChar)) {
                    result.push(currentCodeChar[0]);
                    continue;
                }
                if (LITERAL.indexOf(currentCodeChar) !== -1) {
                    result.push(currentCodeChar);
                    continue;
                }
                // TODO 暂时不处理*
                if (currentCodeChar === "*") {
                    continue;
                }
                if (currentCodeChar === ",") {
                    result.push(currentValueChar);
                    continue;
                }
                if (currentCodeChar === "%") {
                    result.push(currentCodeChar);
                    continue;
                }
                // 增加value index
                valueIndex++;
                if (currentCodeChar === "0") {
                    result.push(currentValueChar || 0);
                    continue;
                }
                if (currentCodeChar === "#" && currentValueChar) {
                    result.push(currentValueChar);
                    continue;
                }
                if (currentCodeChar === "?" && currentValueChar) {
                    result.push(currentValueChar || " ");
                    continue;
                }
            }
            return result.join("");
        }
    }
};

//src/core/value/formatter/formatter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[111] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NumberFormatter = _p.r(112);
        var TextFormatter = _p.r(117);
        var LOGICAL_VALUE = _p.r(125);
        return _p.r(0).create("Formatter", {
            dataAccess: null,
            base: _p.r(143),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
            },
            /**
         * 根据传递进来的内容和单元格，获取该内容最适合于该单元格的值和CODE。
         * @param content
         * @param row
         * @param col
         * @returns {*}
         */
            getValue: function(cellType, value, numberFormat) {
                if (!cellType) {
                    return undefined;
                }
                switch (cellType) {
                  // text 和 logical都需要经过"文本"格式化
                    case CELL_TYPE.LOGICAL:
                    value = value === "1" ? LOGICAL_VALUE.TRUE : LOGICAL_VALUE.FALSE;

                  // break 省略
                    case CELL_TYPE.TEXT:
                    return TextFormatter.exec(value, numberFormat);
                    break;

                  case CELL_TYPE.NUMBER:
                    return NumberFormatter.exec(value, numberFormat);
                    break;

                  case CELL_TYPE.ERROR:
                    return value;
                    break;
                }
            },
            getStandardValue: function(row, col) {
                var cellType = this.dataAccess.getCellType(row, col);
                if (!cellType) {
                    return undefined;
                }
                var rawValue = this.dataAccess.getValue(row, col);
                switch (cellType) {
                  case CELL_TYPE.TEXT:
                  case CELL_TYPE.FORMULA:
                  case CELL_TYPE.ERROR:
                    return rawValue;

                  case CELL_TYPE.NUMBER:
                    return NumberFormatter.getStandardValue(rawValue, this.dataAccess.getNumberFormat(row, col));

                  case CELL_TYPE.LOGICAL:
                    return rawValue ? LOGICAL_VALUE.TRUE : LOGICAL_VALUE.FALSE;
                }
            }
        });
    }
};

//src/core/value/formatter/number.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[112] = {
    value: function(require) {
        var CodeParser = _p.r(96);
        var DecimalFormatter = _p.r(114);
        var ScientificFormatter = _p.r(116);
        var DateTimeFormatter = _p.r(113);
        var FractionFormatter = _p.r(115);
        var CODE_FLAG = _p.r(95);
        var FORMAT_CODE = _p.r(124);
        return {
            exec: function(value, code) {
                if (value === undefined) {
                    return undefined;
                }
                if (!code) {
                    return value;
                }
                var segmentInfo = CodeParser.getNumberSegment(value, code);
                switch (segmentInfo.segment.flag) {
                  case CODE_FLAG.DECIMAL:
                    return DecimalFormatter.exec(value, segmentInfo);

                  case CODE_FLAG.SCIENTIFIC:
                    return ScientificFormatter.exec(value, segmentInfo);

                  case CODE_FLAG.DATETIME:
                    return DateTimeFormatter.exec(value, segmentInfo);

                  case CODE_FLAG.FRACTION:
                    return FractionFormatter.exec(value, segmentInfo);
                }
            },
            getStandardValue: function(value, code) {
                if (!code) {
                    return value;
                }
                var segmentInfo = CodeParser.getNumberSegment(value, code);
                var segment = segmentInfo.segment;
                switch (segment.flag) {
                  case CODE_FLAG.DATETIME:
                    if (segment.hasDate && segment.hasTime) {
                        segmentInfo = CodeParser.getNumberSegment(value, FORMAT_CODE._default["DATETIME"]);
                    } else if (segment.hasDate) {
                        segmentInfo = CodeParser.getNumberSegment(value, FORMAT_CODE._default["DATE"]);
                    } else {
                        segmentInfo = CodeParser.getNumberSegment(value, FORMAT_CODE._default["TIME"]);
                    }
                    return DateTimeFormatter.exec(value, segmentInfo);

                  default:
                    return value;
                }
            }
        };
    }
};

//src/core/value/formatter/number/datetime.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[113] = {
    value: function(require) {
        var DateTimeConverter = _p.r(108);
        var MEDIUM_MONTH = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var SHORT_MONTH = [ "", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ];
        var FULL_MONTH = [ "", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var SHORT_WEEKDAY = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
        var FULL_WEEKDAY = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday" ];
        // 字面量列表
        // 句点（.）也按字面量进行处理
        var LITERAL = "$¥+(:^'{<=-/)&~}> .";
        return {
            exec: function(value, segmentInfo) {
                if (value < 0 || value > 2958465) {
                    return undefined;
                }
                return format(value, segmentInfo.segment.value.front, segmentInfo.segment.dSign);
            }
        };
        function format(value, codeSegment, sign) {
            var dateValue = DateTimeConverter.numberToDate(value);
            var timeValue = DateTimeConverter.numberToTime(value);
            if (sign) {
                timeValue.hour %= 12;
            }
            var result = [];
            var currentCodeChar;
            for (var i = 0, len = codeSegment.length; i < len; i++) {
                currentCodeChar = codeSegment[i];
                // 纯文本， 直接输入
                if (typeof currentCodeChar !== "string") {
                    result.push(currentCodeChar.join(""));
                    continue;
                }
                if (LITERAL.indexOf(currentCodeChar) !== -1) {
                    result.push(currentCodeChar);
                    continue;
                }
                // TODO 暂时不处理*
                if (currentCodeChar === "*") {
                    continue;
                }
                switch (currentCodeChar) {
                  case "m":
                    result.push(dateValue.month);
                    break;

                  case "mm":
                    result.push(dateValue.month < 10 ? "0" + dateValue.month : dateValue.month);
                    break;

                  case "mmm":
                    result.push(MEDIUM_MONTH[dateValue.month]);
                    break;

                  case "mmmm":
                    result.push(FULL_MONTH[dateValue.month]);
                    break;

                  case "mmmmm":
                    result.push(SHORT_MONTH[dateValue.month]);
                    break;

                  case "d":
                    result.push(dateValue.day);
                    break;

                  case "dd":
                    result.push(dateValue.day < 10 ? "0" + dateValue.day : dateValue.day);
                    break;

                  case "ddd":
                    result.push(SHORT_WEEKDAY[dateValue.weekday]);
                    break;

                  case "dddd":
                    result.push(FULL_WEEKDAY[dateValue.weekday]);
                    break;

                  case "yy":
                    result.push((dateValue.year + "").substring(2));
                    break;

                  case "yyyy":
                    result.push(dateValue.year);
                    break;

                  case "H":
                    result.push(timeValue.hour);
                    break;

                  case "HH":
                    result.push(timeValue.hour < 10 ? "0" + timeValue.hour : timeValue.hour);
                    break;

                  case "M":
                    result.push(timeValue.minute);
                    break;

                  case "MM":
                    result.push(timeValue.minute < 10 ? "0" + timeValue.minute : timeValue.minute);
                    break;

                  case "S":
                    result.push(timeValue.second);
                    break;

                  case "SS":
                    result.push(timeValue.second < 10 ? "0" + timeValue.second : timeValue.second);
                    break;

                  case "A/P":
                    timeValue.am ? result.push("A") : result.push("P");
                    break;

                  case "AM/PM":
                    timeValue.am ? result.push("AM") : result.push("PM");
                    break;
                }
            }
            return result.join("");
        }
    }
};

//src/core/value/formatter/number/decimal.js
/**
 * @file 数值 格式化器
 * @author hancong03@baiud.com
 */
_p[114] = {
    value: function(require) {
        var FormatUtil = _p.r(110);
        return {
            exec: function(value, segmentInfo) {
                var segment = segmentInfo.segment;
                if (segmentInfo.index == 1 && segmentInfo.select === 1) {
                    value = Math.abs(value) + "";
                }
                value = (+value).toFixed(segment.value.backCount);
                value = (value + "").split(".");
                var front = value[0];
                var back = value[1] || "";
                front = FormatUtil.formatLeftPart(front, segment.value.front);
                back = FormatUtil.formatRightPart(back, segment.value.back);
                return front + back;
            }
        };
    }
};

//src/core/value/formatter/number/fraction.js
/**
 * @file 数值 格式化器
 * @author hancong03@baiud.com
 */
_p[115] = {
    value: function(require) {
        var FormatUtil = _p.r(110);
        return {
            exec: function(value, segmentInfo) {
                debugger;
            }
        };
    }
};

//src/core/value/formatter/number/scientific.js
/**
 * @file 科学计数法-格式化器
 * @author hancong03@baiud.com
 */
_p[116] = {
    value: function(require) {
        var FormatUtil = _p.r(110);
        var SPLIT_PATTERN = /(\d+)(?:\.(\d+))?e([+-])(\d+)/i;
        return {
            exec: function(value, segmentInfo) {
                var segment = segmentInfo.segment;
                if (segmentInfo.index == 1 && segmentInfo.select === 1) {
                    value = Math.abs(value) + "";
                }
                value = (+value).toExponential(segment.value.backCount);
                var match = SPLIT_PATTERN.exec(value);
                var intValue = FormatUtil.formatLeftPart(match[1], segment.value.front);
                var decimalValue = "";
                if (match[2]) {
                    decimalValue = FormatUtil.formatRightPart(match[2], segment.value.back);
                }
                var exponentValue = FormatUtil.formatLeftPart(match[4], segment.exponent.front);
                var exponentDecimalValue = FormatUtil.formatLeftPart("", segment.exponent.back);
                var exponentSign = segment.eSign;
                var sign;
                if (match[3] === "-") {
                    sign = "-";
                } else {
                    if (exponentSign === "e+") {
                        sign = "+";
                    } else {
                        sign = "";
                    }
                }
                return intValue + decimalValue + "E" + sign + exponentValue + exponentDecimalValue;
            }
        };
    }
};

//src/core/value/formatter/text.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[117] = {
    value: function(require) {
        var CodeParseer = _p.r(96);
        return {
            exec: function(value, code) {
                if (value === undefined) {
                    return undefined;
                }
                if (!code) {
                    return value;
                }
                var segment = CodeParseer.getTextSegment(code);
                if (!segment) {
                    return value;
                }
                debugger;
            }
        };
    }
};

//src/core/value/value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[118] = {
    value: function(require) {
        var CELL_TYPE = _p.r(122);
        var NUMBER_FORMAT = _p.r(127);
        var Format = _p.r(109);
        var Formatter = _p.r(111);
        var ColorManager = _p.r(97);
        var Value = _p.r(0).create("Value", {
            dataAccess: null,
            formulaModule: null,
            rangeFacade: null,
            valueSecurityModule: null,
            format: null,
            formatter: null,
            colorManager: null,
            base: _p.r(146),
            init: function(dataAccess, formulaModule, valueSecurityModule) {
                this.dataAccess = dataAccess;
                this.formulaModule = formulaModule;
                this.valueSecurityModule = valueSecurityModule;
                this.format = this.createComponent(Format, dataAccess);
                this.formatter = this.createComponent(Formatter, dataAccess);
                this.colorManager = this.createComponent(ColorManager, dataAccess);
                this.formulaModule.bind(this);
                this.initService();
            },
            run: function() {
                this.rangeFacade = this.getModule("range").getRange();
            },
            initService: function() {
                this.registerService({
                    "c.write": this.writeCell,
                    "c.batchwrite": this.batchWriteCell,
                    "c.clear.content": this.clearContent,
                    "c.set.format": this.setFormat
                });
            },
            writeCell: function(content, row, col, isCSE) {
                // 安全检测
                if (!this.valueSecurityModule.check(row, col, isCSE)) {
                    return false;
                }
                this.corePrepareRefresh();
                this.__clearData(row, col);
                this.postMessage("c.contentchange", row, col);
                // 在写入前对内容进行编码
                var content = this.cs("c.encode.content", content);
                // auto format
                var formatInfo = this.format.analyzeFormatInfo(content, row, col);
                this.dataAccess.setCellType(formatInfo.type, row, col);
                this.dataAccess.setValue(formatInfo.value, row, col);
                // 当前输入的内容被解析为数字类型时，动态调整当前单元格的数字格式
                if (formatInfo.type === CELL_TYPE.NUMBER && formatInfo.subType !== NUMBER_FORMAT.GENERAL) {
                    this.dataAccess.setNumberFormat(formatInfo.format, {
                        row: row,
                        col: col
                    }, {
                        row: row,
                        col: col
                    });
                }
                //isCSE = true;
                if (formatInfo.type === CELL_TYPE.FORMULA) {
                    if (!isCSE) {
                        this.formulaModule.setFormula(row, col, formatInfo.value);
                    } else {
                        this.formulaModule.setArrayFormula(this.rangeFacade.getStart(), this.rangeFacade.getEnd(), formatInfo.value);
                    }
                }
                this.coreRefresh();
                this.postMessage("e.contentchange");
            },
            batchWriteCell: function(data, row, col) {
                var rowData;
                var current;
                var rowCount = data.length;
                var colCount = 0;
                var totalIndex = this.dataAccess.getTotalIndex();
                for (var i = 0, len = data.length; i < len; i++) {
                    colCount = Math.max(colCount, data[i].length);
                }
                this.corePrepareRefresh();
                if (row + rowCount > totalIndex.row) {
                    this.dataAccess.expandRow(Math.ceil((row + rowCount - totalIndex.row) / 100) * 100);
                }
                if (col + colCount > totalIndex.col) {
                    this.dataAccess.expandCol(Math.ceil((col + colCount - totalIndex.col) / 26) * 26);
                }
                for (var i = 0, len = data.length; i < len; i++) {
                    rowData = data[i];
                    if (!rowData) {
                        continue;
                    }
                    for (var j = 0, jlen = rowData.length; j < jlen; j++) {
                        current = rowData[j];
                        if (!current) {
                            continue;
                        }
                        this.writeCell(current.content, row + i, col + j);
                    }
                }
                this.coreRefresh();
            },
            setFormat: function(formatCode, start, end) {
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        this.dataAccess.clearFormatColor(i, j);
                        this.dataAccess.clearFormattedValue(i, j);
                    }
                }
                this.dataAccess.setNumberFormat(formatCode, start, end);
                this.coreRefresh(true);
            },
            getFormatColor: function(row, col) {
                var computedValueInfo = this.getComputedValueInfo(row, col);
                var color = this.dataAccess.getFormatColor(row, col);
                if (!color) {
                    var code = this.dataAccess.getNumberFormat(row, col);
                    color = this.colorManager.calculateFormatColor(computedValueInfo.type, computedValueInfo.value, code);
                    if (!color) {
                        color = "none";
                    }
                    this.dataAccess.setFormatColor(color, row, col);
                }
                if (color === "none") {
                    return undefined;
                }
                return color;
            },
            clearContent: function(ranges) {
                var range;
                var start;
                var end;
                for (var i = 0, len = ranges.length; i < len; i++) {
                    range = ranges[i];
                    start = range.start;
                    end = range.end;
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            this.__clearData(i, j);
                        }
                    }
                    this.postMessage("c.contentchange", start, end);
                }
                this.coreRefresh(true);
                this.postMessage("e.contentchange");
            },
            __clearData: function(row, col) {
                // ------ 清除相关数据
                this.dataAccess.clearCellType(row, col);
                this.dataAccess.clearValue(row, col);
                this.formulaModule.clearFormula(row, col);
                this.dataAccess.clearNumberFormat({
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
                this.clearCache(row, col);
            },
            clearCache: function(row, col) {
                // 清缓存
                this.dataAccess.clearComputedValue(row, col);
                this.dataAccess.clearFormattedValue(row, col);
                this.dataAccess.clearWraptextRecord(row, col);
                this.dataAccess.clearFormatColor(row, col);
            },
            getComputedValue: function(row, col) {
                return this.getComputedValueInfo(row, col).value;
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
                var valueInfo = this.dataAccess.getComputedValue(row, col);
                if (valueInfo) {
                    return valueInfo;
                }
                if (this.formulaModule.isArrayFormula(row, col)) {
                    return this.formulaModule.getComputedValueInfo(row, col);
                }
                var cellType = this.dataAccess.getCellType(row, col);
                if (cellType === undefined) {
                    return {
                        type: CELL_TYPE.UNDEFINED,
                        value: undefined
                    };
                }
                if (cellType === CELL_TYPE.FORMULA) {
                    // 公式计算结果缓存策略由FormulaModule管理
                    return this.formulaModule.getComputedValueInfo(row, col);
                } else {
                    valueInfo = {
                        type: cellType,
                        value: this.getRawValue(row, col)
                    };
                }
                this.dataAccess.setComputedValue(valueInfo, row, col);
                return valueInfo;
            },
            getFormattedValue: function(row, col) {
                return this.getFormattedValueInfo(row, col).value;
            },
            /**
         * 获取格式化后的值（当然也是计算过后的值）
         * @param row
         * @param col
         * @returns {*}
         */
            getFormattedValueInfo: function(row, col) {
                var formattedValueInfo = this.dataAccess.getFormattedValue(row, col);
                if (formattedValueInfo) {
                    return formattedValueInfo;
                }
                var valueInfo = this.getComputedValueInfo(row, col);
                if (valueInfo.type === CELL_TYPE.UNDEFINED) {
                    return valueInfo;
                }
                valueInfo = $._clone(valueInfo);
                // 获取已有的记录
                var numberFormat = this.dataAccess.getNumberFormat(row, col);
                valueInfo.value = this.formatter.getValue(valueInfo.type, valueInfo.value, numberFormat);
                this.dataAccess.setFormattedValue(valueInfo, row, col);
                return valueInfo;
            },
            /**
         * 获取一个最符合当前单元格内容类型和格式的值。
         * 该值以最精确、最简单的方式展现。
         * 注：该值适合于输入框内的值
         * @param row
         * @param col
         */
            getStandardValue: function(row, col) {
                var cellType = this.dataAccess.getCellType(row, col);
                if (!cellType) {
                    return "";
                }
                var standardValue = this.dataAccess.getStandardValue(row, col);
                if (!standardValue) {
                    standardValue = this.formatter.getStandardValue(row, col);
                    this.dataAccess.setStandardValue(standardValue);
                }
                return standardValue;
            },
            getRawValue: function(row, col) {
                return this.dataAccess.getValue(row, col);
            },
            getRawType: function(row, col) {
                var type = this.dataAccess.getCellType(row, col);
                if (type) {
                    return type;
                }
                var rawValue = this.dataAccess.getValue(row, col);
                var formatInfo = this.format.analyzeFormatInfo(rawValue, row, col);
                this.dataAccess.setCellType(formatInfo.type, row, col);
                return formatInfo.type;
            }
        });
        Value.deps = [ "dataAccess", "formula", "valueSecurity" ];
        return Value;
    }
};

//src/core/view.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[119] = {
    value: function(require) {
        var View = _p.r(0).create("View", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
                this.initService();
            },
            initService: function() {
                this.registerService({
                    "c.scroll": this.scroll,
                    "c.scrollto": this.scrollTo,
                    "c.row.scrollto": this.scrollRowTo,
                    "c.col.scrollto": this.scrollColTo,
                    "c.row.scroll": this.scrollRow,
                    "c.col.scroll": this.scrollCol,
                    "c.scroll.row.to.end": this.scrollRowToEnd,
                    "c.scroll.column.to.end": this.scrollColumnToEnd,
                    "c.scroll.to.end": this.scrollToEnd,
                    "c.updateview": this.updateview
                });
            },
            updateview: function(viewState) {
                if (viewState.row === 0 && viewState.column === 0) {
                    return;
                }
                this.corePrepareRefresh();
                if (viewState.row !== undefined) {
                    this.scrollRow(viewState.row);
                } else if (viewState.rowTo !== undefined) {
                    this.scrollRowTo(viewState.rowTo);
                } else if (viewState.rowToEnd !== undefined) {
                    this.scrollRowToEnd(viewState.rowToEnd);
                }
                if (viewState.column !== undefined) {
                    this.scrollCol(viewState.column);
                } else if (viewState.columnTo !== undefined) {
                    this.scrollColTo(viewState.columnTo);
                } else if (viewState.columnToEnd !== undefined) {
                    this.scrollColumnToEnd(viewState.columnToEnd);
                }
                this.coreRefresh();
                this.postMessage("c.view.change");
            },
            scrollRowTo: function(row) {
                this.__resetRowToStart(row);
                this.postMessage("c.view.change");
            },
            scrollColTo: function(col) {
                this.__resetColumnToStart(col);
                this.postMessage("c.view.change");
            },
            scrollTo: function(row, col) {
                this.__resetRowToStart(row);
                this.__resetColumnToStart(col);
                this.postMessage("c.view.change");
            },
            scroll: function(row, col) {
                this.corePrepareRefresh();
                var viewStart = this.dataAccess.getViewStart();
                this.__resetRowToStart(row + viewStart.row);
                this.__resetColumnToStart(col + viewStart.col);
                this.coreRefresh();
            },
            scrollRow: function(row) {
                var viewStart = this.dataAccess.getViewStart();
                this.__resetRowToStart(row + viewStart.row);
                this.postMessage("c.view.change");
            },
            scrollCol: function(col) {
                var viewStart = this.dataAccess.getViewStart();
                this.__resetColumnToStart(col + viewStart.col);
                this.postMessage("c.view.change");
            },
            scrollToEnd: function(row, col) {
                this.corePrepareRefresh();
                this.scrollRowToEnd(row);
                this.scrollColumnToEnd(col);
                this.coreRefresh();
            },
            scrollRowToEnd: function(row) {
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
                this.postMessage("c.view.change");
            },
            /**
         * 滚动指定列到可视区域末尾
         * @param col
         */
            scrollColumnToEnd: function(col) {
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
                this.postMessage("c.view.change");
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
            }
        });
        View.deps = [ "dataAccess" ];
        return View;
    }
};

//src/core/visible.js
/**
 * @file 行列可见性管理，不同于Hidden模块，该模块是检测给定的行列是否在当前可视区域内可见。
 * @author hancong03@baiud.com
 */
_p[120] = {
    value: function(require) {
        var Visible = _p.r(0).create("Visible", {
            dataAccess: null,
            base: _p.r(146),
            init: function(dataAccess) {
                this.dataAccess = dataAccess;
            },
            rowIsVisible: function(row) {
                var grid = this.dataAccess.getGrid();
                return grid.rMap[row] !== undefined;
            },
            /**
         * 检测该列是否可以在当前可视区域内完全被现实
         * @param row
         */
            rowIsFullVisible: function(row) {
                var grid = this.dataAccess.getGrid();
                var r = grid.rMap[row];
                if (r === undefined) {
                    return false;
                }
                if (r === grid.rowMap.length - 1) {
                    return false;
                }
                return true;
            },
            columnIsVisible: function(col) {
                var grid = this.dataAccess.getGrid();
                return grid.cMap[col] !== undefined;
            },
            columnIsFullVisible: function(col) {
                var grid = this.dataAccess.getGrid();
                var c = grid.cMap[col];
                if (c === undefined) {
                    return false;
                }
                if (c === grid.colMap.length - 1) {
                    return false;
                }
                return true;
            },
            /**
         * 计算给定的单元格在可是试图区域中的位置
         * @param row
         * @param col
         * @returns {string}
         */
            getViewPosition: function(row, col) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var rowMap = grid.rowMap;
                var colMap = grid.colMap;
                var firstRow = rowMap[0];
                var firstCol = colMap[0];
                var lastRow = rowMap[rowMap.length - 1];
                var lastCol = colMap[colMap.length - 1];
                var left = col < firstCol ? 8 : 0;
                var right = col >= lastCol ? 4 : 0;
                var top = row < firstRow ? 2 : 0;
                var bottom = row >= lastRow ? 1 : 0;
                switch (left | right | top | bottom) {
                  case 10:
                    return "leftTop";

                  case 9:
                    return "leftBottom";

                  case 6:
                    return "rightTop";

                  case 5:
                    return "rightBottom";

                  case 8:
                    return "left";

                  case 4:
                    return "right";

                  case 2:
                    return "top";

                  case 1:
                    return "bottom";

                  default:
                    return "in";
                }
            }
        });
        Visible.deps = [ "dataAccess" ];
        return Visible;
    }
};

//src/core/wraptext.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[121] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var CONTENT_PADDING = SYS_CONFIG.CONTENT_PADDING;
        var BORDER_WIDTH = SYS_CONFIG.border.width;
        var CANDIDATE_FONT = SYS_CONFIG.CANDIDATE_FONT;
        // 隐藏列的计算宽度，用于对隐藏的列进行换行计算
        var HIDDEN_CONTENT_WIDTH = 50;
        var Wraptext = _p.r(0).create("Wraptext", {
            shadowCanvas: null,
            canvasContext: null,
            dataAccess: null,
            valueModule: null,
            styleModule: null,
            cellModule: null,
            base: _p.r(146),
            init: function(dataAccess, valueModule, styleModule) {
                this.dataAccess = dataAccess;
                this.styleModule = styleModule;
                this.valueModule = valueModule;
                this.shadowCanvas = this.createElement("canvas");
                this.canvasContext = this.shadowCanvas.getContext("2d");
                this.shadowCanvas.width = 1;
                this.shadowCanvas.height = 1;
                this.initMessageHook();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.contentchange": this.__contentChange,
                    "c.stylechange": this.__styleChange,
                    "c.columnresize": this.__columnResize,
                    "c.rowresize": this.__rowResize,
                    "c.mergechange": this.__mergeChange
                });
            },
            /**
         * 获取用于显示的值
         * 用于显示的值是经过格式化后的值
         */
            getDisplayValue: function(row, col) {
                var aligmentStyle = this.styleModule.getComputedStyle("alignments", row, col);
                var computedValue = this.valueModule.getFormattedValue(row, col);
                if (aligmentStyle.wraptext) {
                    return this.__getContent(computedValue, row, col);
                }
                return computedValue;
            },
            __getContent: function(content, row, col) {
                if (!content) {
                    return;
                }
                var mergeInfo = this.dataAccess.getMergeCell(row, col);
                if (mergeInfo) {
                    row = mergeInfo.start.row;
                    col = mergeInfo.start.col;
                }
                var record = this.dataAccess.getWraptextRecord(row, col);
                if (record) {
                    return record;
                }
                var style = this.styleModule.getComputedStyle("fonts", row, col);
                var contents = this.__getWrapText(style, content, row, col);
                this.dataAccess.recordWraptext(contents, row, col);
                return contents;
            },
            __getWrapText: function(style, content, row, col) {
                var canvasContext = this.canvasContext;
                var cellWidth;
                var mergeCell;
                canvasContext.font = [ style.italic ? "italic" : "normal", style.bold ? "bold" : "normal", style.size + "px", style.name + "," + CANDIDATE_FONT ].join(" ");
                mergeCell = this.dataAccess.getMergeCell(row, col);
                if (!mergeCell) {
                    cellWidth = this.__getCellWidth(col) - CONTENT_PADDING;
                } else {
                    cellWidth = this.__getCellsWidth(mergeCell.start.col, mergeCell.end.col) - CONTENT_PADDING;
                }
                // 如果最终计算宽度过小，则以默认宽度来计算
                if (cellWidth <= 0) {
                    cellWidth = HIDDEN_CONTENT_WIDTH;
                }
                var widths = [];
                var contents = content.split("\n");
                for (var i = 0, len = contents.length; i < len; i++) {
                    widths.push(canvasContext.measureText(contents[i]).width);
                }
                contents = this.__checkText(cellWidth, widths, contents, parseInt(style.fontSize, 10));
                return contents.join("\n");
            },
            __checkText: function(cellWidth, widths, contents, fontSize) {
                var contentSet = [];
                var width;
                for (var i = 0, len = contents.length; i < len; i++) {
                    width = widths[i];
                    if (width <= cellWidth) {
                        contentSet.push(contents[i]);
                    } else {
                        this.__wraptext(contentSet, cellWidth, width, contents[i], "", fontSize * 2);
                    }
                }
                return contentSet;
            },
            __wraptext: function(contentSet, cellWidth, width, frontText, backText, minWidth) {
                var canvasContext = this.canvasContext;
                var contentLength;
                if (width === cellWidth) {
                    contentSet.push(frontText);
                    if (backText.length === 0) {
                        return;
                    }
                    frontText = backText;
                    backText = "";
                    width = canvasContext.measureText(frontText).width;
                }
                if (width <= cellWidth && backText.length === 0) {
                    contentSet.push(frontText);
                    return;
                }
                var diff = Math.abs(width - cellWidth);
                if (width > cellWidth) {
                    while (width > cellWidth) {
                        contentLength = frontText.length - 1;
                        backText = frontText.charAt(contentLength) + backText;
                        frontText = frontText.substring(0, contentLength);
                        width = canvasContext.measureText(frontText).width;
                    }
                    contentSet.push(frontText);
                    if (backText.length === 0) {
                        return;
                    }
                    //计算剩余内容宽度
                    width = canvasContext.measureText(backText).width;
                    this.__wraptext(contentSet, cellWidth, width, backText, "", minWidth);
                } else {
                    if (diff < minWidth) {
                        while (backText.length) {
                            frontText += backText.charAt(0);
                            backText = backText.substring(1);
                            width = canvasContext.measureText(frontText).width;
                            if (width > cellWidth) {
                                break;
                            }
                        }
                        if (width > cellWidth) {
                            backText = frontText.charAt(frontText.length - 1) + backText;
                            frontText = frontText.substring(0, frontText.length - 1);
                            contentSet.push(frontText);
                            frontText = backText;
                            backText = "";
                            width = canvasContext.measureText(frontText).width;
                            return this.__wraptext(contentSet, cellWidth, width, frontText, backText, minWidth);
                        }
                        // backText 已用尽
                        contentSet.push(frontText);
                    } else {
                        contentLength = Math.ceil(backText.length / 2);
                        frontText += backText.substring(0, contentLength);
                        backText = backText.substring(contentLength);
                        width = canvasContext.measureText(frontText).width;
                        this.__wraptext(contentSet, cellWidth, width, frontText, backText, minWidth);
                    }
                }
            },
            __contentChange: function(row, col) {
                var start = row;
                var end = col;
                if (!isNaN(+row)) {
                    this.__clear(row, col);
                } else {
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            this.__clear(i, j);
                        }
                    }
                }
            },
            __styleChange: function(start, end) {
                var mergeInfo;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        mergeInfo = this.dataAccess.getMergeCell(i, j);
                        if (mergeInfo) {
                            this.__clear(mergeInfo.start.row, mergeInfo.start.col);
                        } else {
                            this.__clear(i, j);
                        }
                    }
                }
            },
            __mergeChange: function(start, end) {
                var mergeInfo;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        mergeInfo = this.dataAccess.getMergeCell(i, j);
                        if (mergeInfo) {
                            this.__clear(mergeInfo.start.row, mergeInfo.start.col);
                        } else {
                            this.__clear(i, j);
                        }
                    }
                }
            },
            __columnResize: function(col) {
                var totalIndex = this.dataAccess.getTotalIndex();
                var mergeInfo;
                for (var i = 0, limit = totalIndex.row; i <= limit; i++) {
                    mergeInfo = this.dataAccess.getMergeCell(i, col);
                    if (mergeInfo) {
                        this.__clear(mergeInfo.start.row, mergeInfo.start.col);
                    } else {
                        this.__clear(i, col);
                    }
                }
            },
            __rowResize: function(row) {
                var totalIndex = this.dataAccess.getTotalIndex();
                var mergeInfo;
                for (var i = 0, limit = totalIndex.col; i <= limit; i++) {
                    mergeInfo = this.dataAccess.getMergeCell(row, i);
                    if (mergeInfo) {
                        this.__clear(mergeInfo.start.row, mergeInfo.start.col);
                    } else {
                        this.__clear(row, i);
                    }
                }
            },
            __clear: function(row, col) {
                this.dataAccess.clearWraptextRecord(row, col);
            },
            __getCellsWidth: function(startIndex, endIndex) {
                var sum = 0;
                var w;
                for (var i = startIndex; i <= endIndex; i++) {
                    w = this.__getCellWidth(i);
                    if (w === 0) {
                        continue;
                    }
                    sum += w + BORDER_WIDTH;
                }
                return sum;
            },
            __getCellWidth: function(col) {
                var value = this.dataAccess.getColumnWidth(col);
                if (value === undefined) {
                    return this.getSystemConfig("cellwidth");
                }
                return value;
            }
        });
        Wraptext.deps = [ "dataAccess", "value", "style" ];
        return Wraptext;
    }
};

//src/definition/cell-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[122] = {
    value: {
        TEXT: "TEXT",
        NUMBER: "NUMBER",
        LOGICAL: "LOGICAL",
        ERROR: "ERROR",
        // logic
        UNDEFINED: "UNDEFINED",
        FORMULA: "FORMULA",
        ARRAY: "ARRAY"
    }
};

//src/definition/error-value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[123] = {
    value: {
        NULL: "#NULL!",
        DIV0: "#DIV/0!",
        VALUE: "#VALUE!",
        REF: "#REF!",
        NAME: "#NAME?",
        NUM: "#NUM!",
        NAN: "#N/A",
        DATA: "#GETTING_DATA"
    }
};

//src/definition/format-code.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[124] = {
    value: function() {
        var data = {
            1: "0",
            2: "0.00",
            3: "#,##0",
            4: "#,##0.00",
            5: '_ * #,##0_ ;_ * -#,##0_ ;_ * "-"_ ;_ @_ ',
            6: '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ ',
            7: '_ ¥* #,##0_ ;_ ¥* -#,##0_ ;_ ¥* "-"_ ;_ @_ ',
            8: '_ ¥* #,##0.00_ ;_ ¥* -#,##0.00_ ;_ ¥* "-"??_ ;_ @_ ',
            9: "#,##0;-#,##0",
            10: "#,##0;[red]-#,##0",
            11: "#,##0.00;-#,##0.00",
            12: "#,##0.00;[red]-#,##0.00",
            13: "¥#,##0;¥-#,##0",
            14: "¥#,##0;[red]¥-#,##0",
            15: "¥#,##0.00;¥-#,##0.00",
            16: "¥#,##0.00;[red]¥-#,##0.00",
            17: "0%",
            18: "0.00%",
            19: "0.00E+00",
            20: "##0.0E+0",
            21: "# ?/?",
            22: "# ??/??",
            23: "$#,##0_);($#,##0)",
            24: "$#,##0_);[red]($#,##0)",
            25: "$#,##0.00_);($#,##0.00)",
            26: "$#,##0.00_);[red]($#,##0.00)",
            27: 'yyyy"年"m"月"',
            28: 'm"月"d"日"',
            29: "yyyy/m/d",
            30: 'yyyy"年"m"月"d"日"',
            31: "m/d/yy",
            32: "d-mmm-yy",
            33: "d-mmm",
            34: "mmm-yy",
            35: "h:mm AM/PM",
            36: "h:mm:ss AM/PM",
            37: "h:mm",
            38: "h:mm:ss",
            39: 'h"时"mm"分"',
            40: 'h"时"mm"分"ss"秒"',
            41: '上午/下午h"时"mm"分"',
            42: '上午/下午h"时"mm"分"ss"秒"',
            43: "yyyy/m/d h:mm",
            44: "mm:ss",
            45: "mm:ss.0",
            46: "@",
            47: "[h]:mm:ss",
            48: "0.00_);[red](0.00)",
            49: "0.00_);(0.00)",
            50: "0.00;[red]0.00",
            51: "0.00_ "
        };
        data._default = {
            DECIMAL: data[51],
            CURRENCY: data[15],
            PERCENT: data[18],
            SCIENTIFIC: data[19],
            FRACTION: data[21],
            DATE: data[29],
            TIME: data[38],
            DATETIME: data[22],
            TEXT: data[46]
        };
        return data;
    }
};

//src/definition/logical-value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[125] = {
    value: {
        TRUE: "TRUE",
        FALSE: "FALSE"
    }
};

//src/definition/none.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[126] = {
    value: function() {
        return "none";
    }
};

//src/definition/number-format.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[127] = {
    value: {
        GENERAL: "GENERAL",
        DECIMAL: "DECIMAL",
        CURRENCY: "CURRENCY",
        PERCENT: "PERCENT",
        SCIENTIFIC: "SCIENTIFIC",
        FRACTION: "FRACTION",
        DATE: "DATE",
        TIME: "TIME",
        DATETIME: "DATETIME",
        TEXT: "TEXT"
    }
};

//src/env/commands/redo.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[128] = {
    value: function(require) {
        return _p.r(0).create("RedoCommand", {
            base: _p.r(142),
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
_p[129] = {
    value: function(require) {
        return _p.r(0).create("UndoCommand", {
            base: _p.r(142),
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
_p[130] = {
    value: function(require) {
        var LOCAL_CONFIG = _p.r(13);
        var SYS_CONFIG = _p.r(14);
        var $ = _p.r(2);
        return _p.r(0).create("Configure", {
            constructor: function() {
                this.config = $.extend(true, {}, LOCAL_CONFIG);
            },
            getSystemConfig: function(key) {
                if (!key) {
                    return SYS_CONFIG;
                }
                return SYS_CONFIG[key] || null;
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
_p[131] = {
    value: function(require) {
        var Container = _p.r(134);
        var ElementFactory = _p.r(135);
        var Service = _p.r(138);
        var Command = _p.r(133);
        var Message = _p.r(136);
        var RefreshManager = _p.r(137);
        var Configure = _p.r(130);
        var ModuleLoader = _p.r(139);
        var PluginWrapper = _p.r(140);
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
            getSystemConfig: function(key) {
                return this.config.getSystemConfig(key);
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
            getModule: function(name) {
                return this.loader.getModule(this, name);
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
            datachange: function(name, handler) {
                return this.manager.message.datachange(name, handler);
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
            showHeaderContainer: function() {
                this.manager.container.showHeader();
            },
            hideHeaderContainer: function() {
                this.manager.container.hideHeader();
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
_p[132] = {
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
_p[133] = {
    value: function(require) {
        var CommandStack = _p.r(132);
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
                this.stack = new CommandStack(this.getContext().getSystemConfig("stack"));
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
                // 参数不合法，停止
                if (args === false) {
                    return;
                }
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
_p[134] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        return _p.r(0).create("Container", {
            base: _p.r(1),
            containers: {},
            size: {},
            headerState: true,
            init: function() {
                this.__initContainer();
                this.resize();
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
            showHeader: function() {
                if (this.headerState) {
                    return;
                }
                this.containers.top.style.display = "";
                this.containers.left.style.display = "";
                this.headerState = true;
                this.resize();
                this.__relocation();
            },
            hideHeader: function() {
                if (!this.headerState) {
                    return;
                }
                this.containers.top.style.display = "none";
                this.containers.left.style.display = "none";
                this.headerState = false;
                this.resize();
                this.__relocation();
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
            __initContainer: function() {
                var headConfig = SYS_CONFIG.head;
                var scrollbarConfig = SYS_CONFIG.scrollbar;
                var background = SYS_CONFIG.background;
                var borderConfig = SYS_CONFIG.border;
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
                var headConfig = SYS_CONFIG.head;
                var scrollbarConfig = SYS_CONFIG.scrollbar;
                var borderConfig = SYS_CONFIG.border;
                var borderWidth = borderConfig.width;
                var headerState = this.headerState;
                var targetSize = {
                    width: this.target.clientWidth,
                    height: this.target.clientHeight
                };
                var availableSize = {
                    width: targetSize.width - scrollbarConfig.width,
                    height: targetSize.height - scrollbarConfig.width
                };
                var contentSize = {
                    width: availableSize.width - (headerState ? headConfig.width : 0),
                    height: availableSize.height - (headerState ? headConfig.height : 0)
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
            __relocation: function() {
                var headConfig = SYS_CONFIG.head;
                if (!this.headerState) {
                    $(this.containers.content).css({
                        top: -1,
                        left: -1
                    });
                } else {
                    $(this.containers.content).css({
                        top: headConfig.height,
                        left: headConfig.width
                    });
                }
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
_p[135] = {
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
_p[136] = {
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
                var _self = this;
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
                        setTimeout(function() {
                            _self.emit(EVENT_MAP[name], args);
                        }, 1);
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
_p[137] = {
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
_p[138] = {
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
_p[139] = {
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
            instanceMap: {
                common: {},
                core: {},
                system: {},
                ext: {}
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
            getModule: function(module, name) {
                return this.instanceMap[module.____type][name];
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
                this.instanceMap[type][moduleName] = instance;
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
_p[140] = {
    value: function(require) {
        var clazz = _p.r(0);
        var Plugin = _p.r(147);
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
_p[141] = {
    value: function(require) {
        return {
            //'c.focus.change': 'focuschange',
            //'c.range.disabled': 'focusout',
            //'c.command.exec': 'commandexecute',
            //'s.input.statechange': 'inputmodelchange',
            //'c.refresh': 'refresh',
            //'c.sheetschange': 'sheetschange',
            "e.contentchange": "contentchange"
        };
    }
};

//src/interface/command.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[142] = {
    value: function(require) {
        return _p.r(0).create("Command", {
            base: _p.r(143),
            queryValueBefore: function() {
                return [].slice.call(arguments, 1);
            },
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
_p[143] = {
    value: function(require) {
        return _p.r(0).create("Component", {
            base: _p.r(144),
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
            },
            getModule: function(name) {
                return this.____ctx.getModule(name);
            }
        });
    }
};

//src/interface/functional.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[144] = {
    value: function(require) {
        return _p.r(0).create("Functional", {
            ____ctx: null,
            ____type: null,
            base: _p.r(145),
            constructor: function(context) {
                this.____ctx = context;
            },
            getDocument: function() {
                return this.____ctx.getDocument();
            },
            getConfig: function(key) {
                return this.____ctx.getConfig(key);
            },
            getSystemConfig: function(key) {
                return this.____ctx.getSystemConfig(key);
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
            showHeaderContainer: function() {
                return this.____ctx.showHeaderContainer();
            },
            hideHeaderContainer: function() {
                return this.____ctx.hideHeaderContainer();
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
_p[145] = {
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
_p[146] = {
    value: function(require) {
        return _p.r(0).create("Module", {
            ____loader: null,
            base: _p.r(143),
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
_p[147] = {
    value: function(require) {
        return _p.r(0).create("Plugin", {
            base: _p.r(146),
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
_p[148] = {
    value: function(require) {
        return _p.r(0).create("Component", {
            base: _p.r(145),
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
_p[149] = {
    value: function(require) {
        return _p.r(0).create("UndoableCommand", {
            base: _p.r(142),
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

//src/kernel/adapter/excel.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[150] = {
    value: function(require) {
        var importer = _p.r(154);
        return {
            "import": importer.worksheets,
            importSheet: importer.sheet,
            "export": _p.r(151)
        };
    }
};

//src/kernel/adapter/excel/export.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[151] = {
    value: function(require) {
        var HASH = _p.r(161);
        var FORMAT_CODE = _p.r(124);
        var FORMAT_CODE_MAP = {};
        var MAX_COLUMN = 16383;
        for (var key in FORMAT_CODE) {
            if (FORMAT_CODE.hasOwnProperty(key) && key !== "_default") {
                FORMAT_CODE_MAP[FORMAT_CODE[key]] = key;
            }
        }
        function exportExcel(btableData) {
            btableData = JSON.parse(btableData);
            var result = {
                cell: [],
                column: [],
                row: [],
                mergeCells: [],
                sheetView: {},
                styleSheet: {
                    numFmts: [],
                    fonts: [],
                    fills: [],
                    borders: [],
                    alignments: [],
                    cellStyleXfs: [],
                    cellXfs: []
                },
                dimension: {
                    c: 0,
                    r: 0
                }
            };
            result.cell = exportCellInfo(btableData);
            result.styleSheet = exportStyleSheet(btableData);
            result.sheetView = exportSheetView(btableData);
            result.mergeCells = exportMergeCells(btableData);
            result.column = exportColumn(btableData);
            result.row = exportRow(btableData);
            return JSON.stringify(result);
        }
        function exportCellInfo(data) {
            var result = [];
            var valueData = data.value;
            var cellStyle = data.cellStyle;
            var cellType = data.cellType;
            var index;
            var row;
            var col;
            for (var key in valueData) {
                if (!valueData.hasOwnProperty(key)) {
                    continue;
                }
                index = HASH.keyToIndex(key);
                row = index.row;
                col = index.col;
                if (!result[row]) {
                    result[row] = [];
                }
                if (!result[row][col]) {
                    result[row][col] = {
                        r: row,
                        c: col
                    };
                }
                result[row][col].v = valueData[key];
            }
            for (var key in cellStyle) {
                if (!cellStyle.hasOwnProperty(key)) {
                    continue;
                }
                index = HASH.keyToIndex(key);
                row = index.row;
                col = index.col;
                if (!result[row]) {
                    result[row] = [];
                }
                if (!result[row][col]) {
                    result[row][col] = {
                        r: row,
                        c: col
                    };
                }
                result[row][col].s = cellStyle[key];
            }
            for (var key in cellType) {
                if (!cellType.hasOwnProperty(key)) {
                    continue;
                }
                index = HASH.keyToIndex(key);
                row = index.row;
                col = index.col;
                if (!result[row]) {
                    result[row] = [];
                }
                if (!result[row][col]) {
                    result[row][col] = {
                        r: row,
                        c: col
                    };
                }
                result[row][col].t = cellType[key];
            }
            var finalResult = [];
            var rowResult;
            for (var i = 0, len = result.length; i < len; i++) {
                rowResult = result[i];
                for (var j = 0, jlen = rowResult.length; j < jlen; j++) {
                    if (rowResult[j]) {
                        finalResult.push(rowResult[j]);
                    }
                }
            }
            return finalResult;
        }
        function exportStyleSheet(data) {
            var result = {};
            var indexData = data.styleIndex;
            var xfListData = data.xfList;
            var fillData = data.styleGroup.fills;
            var borderData = data.styleGroup.borders;
            var cellXfs = [];
            var cellStyleXfs = [];
            var fills = [];
            var borders = [];
            // TODO 省略格式的导出
            result.numFmts = [];
            result.fonts = data.styleGroup.fonts;
            result.alignments = data.styleGroup.alignments;
            var current;
            for (var i = 0, len = indexData.length; i < len; i++) {
                current = indexData[i];
                cellXfs.push({
                    font: current.fonts,
                    border: current.borders,
                    fill: current.fills,
                    align: current.alignments,
                    xfId: current.xf,
                    applyFont: current.applyFont,
                    applyBorder: current.applyBorder,
                    applyFill: current.applyFill,
                    applyAlignment: current.applyAlignment
                });
            }
            for (var i = 0, len = xfListData.length; i < len; i++) {
                current = xfListData[i];
                cellStyleXfs.push({
                    font: current.fonts,
                    border: current.borders,
                    fill: current.fills,
                    align: current.alignments,
                    applyFont: current.applyFont,
                    applyBorder: current.applyBorder,
                    applyFill: current.applyFill,
                    applyAlignment: current.applyAlignment
                });
            }
            for (var i = 0, len = fillData.length; i < len; i++) {
                current = fillData[i];
                fills.push(current.fill);
            }
            for (var i = 0, len = borderData.length; i < len; i++) {
                current = borderData[i];
                borders.push(current.border);
            }
            result.fills = fills;
            result.borders = borders;
            result.cellXfs = cellXfs;
            result.cellStyleXfs = cellStyleXfs;
            return result;
        }
        function exportSheetView(data) {
            return {
                pane: {
                    r: data.pane.row,
                    c: data.pane.col
                }
            };
        }
        function exportMergeCells(data) {
            var result = {};
            var mergeData = data.merge;
            var current;
            for (var key in mergeData) {
                if (!mergeData.hasOwnProperty(key)) {
                    continue;
                }
                current = mergeData[key];
                result.push({
                    start: {
                        r: current.start.row,
                        c: current.start.col
                    },
                    end: {
                        r: current.end.row,
                        c: current.end.col
                    }
                });
            }
            return result;
        }
        function exportColumn(data) {
            var result = [];
            var colStyleData = data.columnStyle;
            var colWidthData = data.column;
            var min;
            var max;
            var currentIndex;
            var currentStyle;
            var currentWidth;
            var styleKeys = Object.keys(colStyleData);
            var widthKeys = Object.keys(colWidthData);
            var limit = Math.max(styleKeys[styleKeys.length - 1] || 0, widthKeys[widthKeys.length - 1] || 0);
            var index = 0;
            var tmpData;
            while (index <= limit) {
                currentIndex = index;
                min = index;
                max = index;
                currentIndex = index;
                currentStyle = colStyleData[index];
                currentWidth = colWidthData[index];
                if (currentStyle === undefined && currentWidth === undefined) {
                    index++;
                    continue;
                }
                for (var i = index + 1; i <= limit; i++) {
                    if (currentStyle === colStyleData[i] && currentWidth === colWidthData[i]) {
                        max = i;
                    } else {
                        break;
                    }
                }
                index = max + 1;
                tmpData = {
                    min: min,
                    max: max
                };
                if (currentStyle !== undefined) {
                    tmpData.s = currentStyle;
                }
                if (currentWidth !== undefined) {
                    tmpData.w = currentWidth;
                }
                result.push(tmpData);
            }
            var last = result[result.length - 1];
            if (data.allStyle !== -1) {
                if (last.max + 1 < MAX_COLUMN) {
                    result.push({
                        min: last.max + 1,
                        max: MAX_COLUMN,
                        s: data.allStyle
                    });
                }
            }
            return result;
        }
        function exportRow(data) {
            var rowStyleData = data.rowStyle;
            var rowHeightData = data.row;
            var result = [];
            var styleKeys = Object.keys(rowStyleData);
            var widthKeys = Object.keys(rowHeightData);
            var limit = Math.max(styleKeys[styleKeys.length - 1] || 0, widthKeys[widthKeys.length - 1] || 0);
            var tmpData;
            var s;
            var h;
            for (var i = 0; i <= limit; i++) {
                s = rowStyleData[i];
                h = rowHeightData[i];
                if (s === undefined && h === undefined) {
                    continue;
                }
                tmpData = {
                    r: i
                };
                if (s !== undefined) {
                    tmpData.s = s;
                }
                if (h !== undefined) {
                    tmpData.h = h;
                }
                result.push(tmpData);
            }
            return result;
        }
        return exportExcel;
    }
};

//src/kernel/adapter/excel/filter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[152] = {
    value: {
        horizontal: {
            none: "none",
            left: "left",
            right: "right",
            center: "center"
        },
        vertical: {
            none: "none",
            top: "top",
            middle: "middle",
            bottom: "bottom"
        }
    }
};

//src/kernel/adapter/excel/import-sheet.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[153] = {
    value: function(require) {
        var HASH = _p.r(161);
        var NONE = "none";
        var MAX_COLUMN = 16383;
        var BORDER_STYLE = {
            thin: "thin",
            dashed: "dashed",
            dotted: "dotted"
        };
        var numberformat_map = {};
        var STYLE_GROUP = _p.r(197).styleGroup;
        var DEFAULT_STYLE_VALUE = _p.r(157);
        var FORMAT_CODE = _p.r(124);
        var VALUE_FILTER = _p.r(152);
        var FORMAT_CODE_MAP = {};
        for (var key in FORMAT_CODE) {
            if (FORMAT_CODE.hasOwnProperty(key) && key !== "_default") {
                FORMAT_CODE_MAP[FORMAT_CODE[key]] = key;
            }
        }
        function importSheet(sheetData) {
            if (typeof sheetData === "string") {
                sheetData = JSON.parse(sheetData);
            }
            var result = {};
            result.styleGroup = importStyleGroup(excelData);
            result.styleIndex = importStyleIndex(excelData);
            result.xfList = importXfStyleList(excelData);
            result.sheetNames = excelData.workbook.sheets;
            result.sheets = importSheets(excelData.sheets);
            return result;
        }
        function importSheets(sheets) {
            var result = [];
            var res;
            var currentSheet;
            var cellInfo;
            var rowInfo;
            var columnInfo;
            var mergeInfo;
            var dimension;
            for (var i = 0, len = sheets.length; i < len; i++) {
                res = {};
                result[i] = res;
                currentSheet = sheets[i];
                dimension = currentSheet.dimension;
                res.dimension = dimension;
                res.total = {
                    row: Math.ceil(dimension.r / 100) * 100 || 100,
                    col: Math.ceil(dimension.c / 26) * 26 || 26
                };
                cellInfo = parseCell(currentSheet);
                rowInfo = parseRow(currentSheet);
                columnInfo = parseColumn(currentSheet);
                mergeInfo = parseMergeCells(currentSheet);
                res.value = cellInfo.value;
                res.cellType = cellInfo.type;
                res.cellStyle = cellInfo.cellStyle;
                res.arrayRef = cellInfo.arrayRef;
                res.comments = parseComments(currentSheet.comment);
                if (currentSheet.sheetView.pane) {
                    res.pane = {
                        row: currentSheet.sheetView.pane.r,
                        col: currentSheet.sheetView.pane.c
                    };
                } else {
                    res.pane = {
                        row: -1,
                        col: -1
                    };
                }
                res.row = rowInfo.height;
                res.rowStyle = rowInfo.style;
                res.allStyle = columnInfo.allStyle;
                res.column = columnInfo.width;
                res.columnStyle = columnInfo.style;
                res.merge = mergeInfo.cells;
                res.mergeMap = mergeInfo.map;
            }
            return result;
        }
        function parseCell(data) {
            var cellData = data.cell;
            var valueResult = {};
            var typeResult = {};
            var styleResult = {};
            var arrayRef = [];
            var currentData;
            var index;
            for (var i = 0, len = cellData.length; i < len; i++) {
                currentData = cellData[i];
                index = HASH.indexToKey(currentData.r, currentData.c);
                if (currentData.t === "FORMULA") {
                    valueResult[index] = currentData.f.v + "";
                    typeResult[index] = currentData.t + "";
                    if (currentData.f.t === "array") {
                        arrayRef.push({
                            start: {
                                row: currentData.f.ref.start.r,
                                col: currentData.f.ref.start.c
                            },
                            end: {
                                row: currentData.f.ref.end.r,
                                col: currentData.f.ref.end.c
                            }
                        });
                    }
                } else {
                    if (currentData.v !== undefined && currentData.v !== null) {
                        valueResult[index] = currentData.v + "";
                        typeResult[index] = currentData.t + "";
                    }
                }
                if (currentData.s !== undefined) {
                    styleResult[index] = +currentData.s;
                }
            }
            return {
                value: valueResult,
                type: typeResult,
                cellStyle: styleResult,
                arrayRef: arrayRef
            };
        }
        function parseRow(data) {
            var rowData = data.row;
            var heightResult = {};
            var styleResult = {};
            var current;
            for (var i = 0, len = rowData.length; i < len; i++) {
                current = rowData[i];
                if (current.h !== undefined) {
                    heightResult[current.r] = current.h;
                }
                if (current.s !== undefined) {
                    styleResult[current.r] = current.s;
                }
            }
            return {
                height: heightResult,
                style: styleResult
            };
        }
        function parseColumn(data) {
            var columnData = data.column;
            var widthResult = {};
            var styleResult = {};
            var current;
            var allStyle = -1;
            for (var i = 0, len = columnData.length; i < len; i++) {
                current = columnData[i];
                if (current.max === MAX_COLUMN) {
                    allStyle = current.s;
                } else {
                    for (var j = current.min; j <= current.max; j++) {
                        if (current.s !== undefined) {
                            styleResult[j] = current.s;
                        }
                        if (current.w !== undefined) {
                            widthResult[j] = current.w;
                        }
                    }
                }
            }
            return {
                allStyle: allStyle,
                width: widthResult,
                style: styleResult
            };
        }
        function importStyleGroup(data) {
            var result = {};
            var source = data.styleSheet;
            result.fonts = importFonts();
            result.alignments = importAlignments();
            result.fills = importFills();
            result.borders = importBorders();
            result.numberFormats = importNumberFormats();
            return result;
            function importFonts() {
                var res = [];
                var fontData = source.fonts;
                var fontOrder = STYLE_GROUP.fonts[0];
                var tmp;
                var currentData;
                for (var i = 0, len = fontData.length; i < len; i++) {
                    tmp = {};
                    currentData = fontData[i];
                    for (var key in fontOrder) {
                        if (!fontOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        tmp[key] = currentData[key] || DEFAULT_STYLE_VALUE[key];
                    }
                    res.push(tmp);
                }
                return res;
            }
            function importAlignments() {
                var res = [];
                var alignmentData = source.alignments;
                var alignmentOrder = STYLE_GROUP.alignments[0];
                var tmp;
                var currentData;
                for (var i = 0, len = alignmentData.length; i < len; i++) {
                    tmp = {};
                    currentData = alignmentData[i];
                    for (var key in alignmentOrder) {
                        if (!alignmentOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        switch (key) {
                          case "horizontal":
                            tmp[key] = VALUE_FILTER.horizontal[currentData[key] || DEFAULT_STYLE_VALUE[key]];
                            break;

                          case "vertical":
                            tmp[key] = VALUE_FILTER.vertical[currentData[key] || DEFAULT_STYLE_VALUE[key]];
                            break;

                          case "wraptext":
                            tmp[key] = +(currentData[key] || DEFAULT_STYLE_VALUE[key]);
                            break;
                        }
                    }
                    res.push(tmp);
                }
                return res;
            }
            function importFills() {
                var res = [];
                var fillData = source.fills;
                var currentData;
                for (var i = 0, len = fillData.length; i < len; i++) {
                    currentData = fillData[i];
                    res.push({
                        fill: currentData || DEFAULT_STYLE_VALUE["fill"]
                    });
                }
                return res;
            }
            function importBorders() {
                var res = [];
                var borderData = source.borders;
                var borderOrder = STYLE_GROUP.borders[0].border;
                var tmp;
                var currentData;
                for (var i = 0, len = borderData.length; i < len; i++) {
                    tmp = {};
                    currentData = borderData[i];
                    for (var key in borderOrder) {
                        if (!borderOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        if (currentData[key]) {
                            if (currentData[key] === NONE) {
                                tmp[key] = NONE;
                            } else {
                                tmp[key] = {
                                    style: BORDER_STYLE[currentData[key].style] || BORDER_STYLE.thin,
                                    color: currentData[key].color
                                };
                            }
                        } else {
                            tmp[key] = DEFAULT_STYLE_VALUE.border[key];
                        }
                    }
                    res.push({
                        border: tmp
                    });
                }
                return res;
            }
            function importNumberFormats() {
                var result = [];
                var numberFormatData = source.numFmts;
                var code;
                for (var key in numberFormatData) {
                    if (!numberFormatData.hasOwnProperty(key)) {
                        continue;
                    }
                    // 记录映射关系
                    numberformat_map[key] = result.length;
                    code = numberFormatData[key].code;
                    if (code === "General") {
                        code = "none";
                    }
                    result.push({
                        numberFormat: code
                    });
                }
                return result;
            }
        }
        function parseComments(data) {
            var result = {};
            var current;
            for (var i = 0, len = data.length; i < len; i++) {
                current = data[i];
                result[HASH.indexToKey(current.r, current.c)] = current.text;
            }
            return result;
        }
        function parseMergeCells(data) {
            var mergeCellsData = data.mergeCells;
            var mergeMap = {};
            var result = {};
            var currentData;
            var startData;
            var endData;
            var key;
            for (var i = 0, len = mergeCellsData.length; i < len; i++) {
                currentData = mergeCellsData[i];
                key = HASH.indexToKey(currentData.start.r, currentData.start.c);
                startData = currentData.start;
                endData = currentData.end;
                result[key] = {
                    start: {
                        row: startData.r,
                        col: startData.c
                    },
                    end: {
                        row: endData.r,
                        col: endData.c
                    }
                };
                for (var j = startData.r, jlimit = endData.r; j <= jlimit; j++) {
                    for (var k = startData.c, klimit = endData.c; k <= klimit; k++) {
                        mergeMap[[ HASH.indexToKey(j, k) ]] = key;
                    }
                }
            }
            return {
                cells: result,
                map: mergeMap
            };
        }
        function importStyleIndex(data) {
            var result = [];
            var indexData = data.styleSheet.cellXfs;
            for (var i = 0, len = indexData.length; i < len; i++) {
                var current = indexData[i];
                // 注意顺序
                result.push({
                    fonts: current.font ? +current.font : 0,
                    borders: current.border ? +current.border : 0,
                    fills: current.fill ? +current.fill : 0,
                    alignments: current.align ? +current.align : 0,
                    numberFormats: current.numberFormat ? numberformat_map[current.numberFormat] : 0,
                    xf: current.xfId ? +current.xfId : 0,
                    applyFont: current.applyFont === 0 ? 0 : 1,
                    applyBorder: current.applyBorder === 0 ? 0 : 1,
                    applyFill: current.applyFill === 0 ? 0 : 1,
                    applyAlignment: current.applyAlignment === 0 ? 0 : 1,
                    applyNumberFormat: current.applyNumberFormat === 0 ? 0 : 1
                });
            }
            return result;
        }
        function importXfStyleList(data) {
            var result = [];
            var indexData = data.styleSheet.cellStyleXfs;
            for (var i = 0, len = indexData.length; i < len; i++) {
                var current = indexData[i];
                // 注意顺序
                result.push({
                    fonts: current.font ? +current.font : 0,
                    borders: current.border ? +current.border : 0,
                    fills: current.fill ? +current.fill : 0,
                    alignments: current.align ? +current.align : 0,
                    numberFormats: current.numberFormat ? numberformat_map[current.numberFormat] : 0,
                    applyFont: current.applyFont ? 1 : 0,
                    applyBorder: current.applyBorder ? 1 : 0,
                    applyFill: current.applyFill ? 1 : 0,
                    applyAlignment: current.applyAlignment ? 1 : 0,
                    applyNumberFormat: current.applyNumberFormat === 0 ? 0 : 1
                });
            }
            return result;
        }
        return importSheet;
    }
};

//src/kernel/adapter/excel/import.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[154] = {
    value: function(require) {
        var HASH = _p.r(161);
        var NONE = "none";
        var MAX_COLUMN = 16383;
        var BORDER_STYLE = {
            thin: "thin",
            dashed: "dashed",
            dotted: "dotted"
        };
        var numberformat_map = {};
        var STYLE_GROUP = _p.r(197).styleGroup;
        var DEFAULT_STYLE_VALUE = _p.r(157);
        var FORMAT_CODE = _p.r(124);
        var VALUE_FILTER = _p.r(152);
        var FORMAT_CODE_MAP = {};
        for (var key in FORMAT_CODE) {
            if (FORMAT_CODE.hasOwnProperty(key) && key !== "_default") {
                FORMAT_CODE_MAP[FORMAT_CODE[key]] = key;
            }
        }
        function importExcel(excelData) {
            if (typeof excelData === "string") {
                excelData = JSON.parse(excelData);
            }
            var result = {};
            // 在导入前清空numberformat映射表
            numberformat_map = {};
            result.styleGroup = importStyleGroup(excelData);
            result.styleIndex = importStyleIndex(excelData);
            result.xfList = importXfStyleList(excelData);
            result.sheetNames = excelData.workbook.sheets;
            result.sheets = importSheets(excelData.sheets);
            return result;
        }
        function importSheet(sheetData) {
            if (typeof sheetData === "string") {
                sheetData = JSON.parse(sheetData);
            }
            return __importSignleSheet(sheetData);
        }
        function importSheets(sheets) {
            var result = [];
            for (var i = 0, len = sheets.length; i < len; i++) {
                result[i] = __importSignleSheet(sheets[i]);
            }
            return result;
        }
        function __importSignleSheet(currentSheet) {
            var res = {};
            var dimension = currentSheet.dimension;
            res.dimension = dimension;
            res.total = {
                row: Math.ceil(dimension.r / 100) * 100 || 100,
                col: Math.ceil(dimension.c / 26) * 26 || 26
            };
            var cellInfo = parseCell(currentSheet);
            var rowInfo = parseRow(currentSheet);
            var columnInfo = parseColumn(currentSheet);
            var mergeInfo = parseMergeCells(currentSheet);
            res.value = cellInfo.value;
            res.cellType = cellInfo.type;
            res.cellStyle = cellInfo.cellStyle;
            res.arrayRef = cellInfo.arrayRef;
            res.comments = parseComments(currentSheet.comment);
            if (currentSheet.sheetView.pane) {
                res.pane = {
                    row: currentSheet.sheetView.pane.r,
                    col: currentSheet.sheetView.pane.c
                };
            } else {
                res.pane = {
                    row: -1,
                    col: -1
                };
            }
            res.row = rowInfo.height;
            res.rowStyle = rowInfo.style;
            res.hidden = {
                row: rowInfo.hidden,
                col: columnInfo.hidden
            };
            res.allStyle = columnInfo.allStyle;
            res.column = columnInfo.width;
            res.columnStyle = columnInfo.style;
            res.merge = mergeInfo.cells;
            res.mergeMap = mergeInfo.map;
            return res;
        }
        function parseCell(data) {
            var cellData = data.cell;
            var valueResult = {};
            var typeResult = {};
            var styleResult = {};
            var arrayRef = [];
            var currentData;
            var index;
            for (var i = 0, len = cellData.length; i < len; i++) {
                currentData = cellData[i];
                index = HASH.indexToKey(currentData.r, currentData.c);
                if (currentData.t === "FORMULA") {
                    valueResult[index] = currentData.f.v + "";
                    typeResult[index] = currentData.t + "";
                    if (currentData.f.t === "array") {
                        arrayRef.push({
                            start: {
                                row: currentData.f.ref.start.r,
                                col: currentData.f.ref.start.c
                            },
                            end: {
                                row: currentData.f.ref.end.r,
                                col: currentData.f.ref.end.c
                            }
                        });
                    }
                } else {
                    if (currentData.v !== undefined && currentData.v !== null) {
                        valueResult[index] = currentData.v + "";
                        typeResult[index] = currentData.t + "";
                    }
                }
                if (currentData.s !== undefined) {
                    styleResult[index] = +currentData.s;
                }
            }
            return {
                value: valueResult,
                type: typeResult,
                cellStyle: styleResult,
                arrayRef: arrayRef
            };
        }
        function parseRow(data) {
            var rowData = data.row;
            var heightResult = {};
            var styleResult = {};
            var hiddenRow = [];
            var current;
            for (var i = 0, len = rowData.length; i < len; i++) {
                current = rowData[i];
                if (current.hidden) {
                    hiddenRow[current.r] = current.h || 0;
                    heightResult[current.r] = 0;
                } else if (current.h !== undefined) {
                    heightResult[current.r] = current.h;
                }
                if (current.s !== undefined) {
                    styleResult[current.r] = current.s;
                }
            }
            return {
                height: heightResult,
                style: styleResult,
                hidden: hiddenRow
            };
        }
        function parseColumn(data) {
            var columnData = data.column;
            var widthResult = {};
            var styleResult = {};
            var hiddenColumn = [];
            var current;
            var allStyle = -1;
            for (var i = 0, len = columnData.length; i < len; i++) {
                current = columnData[i];
                if (current.max === MAX_COLUMN) {
                    allStyle = current.s;
                } else {
                    for (var j = current.min; j <= current.max; j++) {
                        if (current.s !== undefined) {
                            styleResult[j] = current.s;
                        }
                        if (current.hidden) {
                            hiddenColumn[j] = current.w || 0;
                            widthResult[j] = 0;
                        } else if (current.w !== undefined) {
                            widthResult[j] = current.w;
                        }
                    }
                }
            }
            return {
                allStyle: allStyle,
                width: widthResult,
                style: styleResult,
                hidden: hiddenColumn
            };
        }
        function importStyleGroup(data) {
            var result = {};
            var source = data.styleSheet;
            result.fonts = importFonts();
            result.alignments = importAlignments();
            result.fills = importFills();
            result.borders = importBorders();
            result.numberFormats = importNumberFormats();
            return result;
            function importFonts() {
                var res = [];
                var fontData = source.fonts;
                var fontOrder = STYLE_GROUP.fonts[0];
                var tmp;
                var currentData;
                for (var i = 0, len = fontData.length; i < len; i++) {
                    tmp = {};
                    currentData = fontData[i];
                    for (var key in fontOrder) {
                        if (!fontOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        tmp[key] = currentData[key] || DEFAULT_STYLE_VALUE[key];
                    }
                    res.push(tmp);
                }
                return res;
            }
            function importAlignments() {
                var res = [];
                var alignmentData = source.alignments;
                var alignmentOrder = STYLE_GROUP.alignments[0];
                var tmp;
                var currentData;
                for (var i = 0, len = alignmentData.length; i < len; i++) {
                    tmp = {};
                    currentData = alignmentData[i];
                    for (var key in alignmentOrder) {
                        if (!alignmentOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        switch (key) {
                          case "horizontal":
                            tmp[key] = VALUE_FILTER.horizontal[currentData[key] || DEFAULT_STYLE_VALUE[key]];
                            break;

                          case "vertical":
                            tmp[key] = VALUE_FILTER.vertical[currentData[key] || DEFAULT_STYLE_VALUE[key]];
                            break;

                          case "wraptext":
                            tmp[key] = +(currentData[key] || DEFAULT_STYLE_VALUE[key]);
                            break;
                        }
                    }
                    res.push(tmp);
                }
                return res;
            }
            function importFills() {
                var res = [];
                var fillData = source.fills;
                var currentData;
                for (var i = 0, len = fillData.length; i < len; i++) {
                    currentData = fillData[i];
                    res.push({
                        fill: currentData || DEFAULT_STYLE_VALUE["fill"]
                    });
                }
                return res;
            }
            function importBorders() {
                var res = [];
                var borderData = source.borders;
                var borderOrder = STYLE_GROUP.borders[0].border;
                var tmp;
                var currentData;
                for (var i = 0, len = borderData.length; i < len; i++) {
                    tmp = {};
                    currentData = borderData[i];
                    for (var key in borderOrder) {
                        if (!borderOrder.hasOwnProperty(key)) {
                            continue;
                        }
                        if (currentData[key]) {
                            if (currentData[key] === NONE) {
                                tmp[key] = NONE;
                            } else {
                                tmp[key] = {
                                    style: BORDER_STYLE[currentData[key].style] || BORDER_STYLE.thin,
                                    color: currentData[key].color
                                };
                            }
                        } else {
                            tmp[key] = DEFAULT_STYLE_VALUE.border[key];
                        }
                    }
                    res.push({
                        border: tmp
                    });
                }
                return res;
            }
            function importNumberFormats() {
                var result = [];
                var numberFormatData = source.numFmts;
                var code;
                for (var key in numberFormatData) {
                    if (!numberFormatData.hasOwnProperty(key)) {
                        continue;
                    }
                    // 记录映射关系
                    numberformat_map[key] = result.length;
                    code = numberFormatData[key].code;
                    if (code === "General") {
                        code = "none";
                    }
                    result.push({
                        numberFormat: code
                    });
                }
                return result;
            }
        }
        function parseComments(data) {
            var result = {};
            var current;
            for (var i = 0, len = data.length; i < len; i++) {
                current = data[i];
                result[HASH.indexToKey(current.r, current.c)] = current.text;
            }
            return result;
        }
        function parseMergeCells(data) {
            var mergeCellsData = data.mergeCells;
            var mergeMap = {};
            var result = {};
            var currentData;
            var startData;
            var endData;
            var key;
            for (var i = 0, len = mergeCellsData.length; i < len; i++) {
                currentData = mergeCellsData[i];
                key = HASH.indexToKey(currentData.start.r, currentData.start.c);
                startData = currentData.start;
                endData = currentData.end;
                result[key] = {
                    start: {
                        row: startData.r,
                        col: startData.c
                    },
                    end: {
                        row: endData.r,
                        col: endData.c
                    }
                };
                for (var j = startData.r, jlimit = endData.r; j <= jlimit; j++) {
                    for (var k = startData.c, klimit = endData.c; k <= klimit; k++) {
                        mergeMap[[ HASH.indexToKey(j, k) ]] = key;
                    }
                }
            }
            return {
                cells: result,
                map: mergeMap
            };
        }
        function importStyleIndex(data) {
            var result = [];
            var indexData = data.styleSheet.cellXfs;
            for (var i = 0, len = indexData.length; i < len; i++) {
                var current = indexData[i];
                // 注意顺序
                result.push({
                    fonts: current.font ? +current.font : 0,
                    borders: current.border ? +current.border : 0,
                    fills: current.fill ? +current.fill : 0,
                    alignments: current.align ? +current.align : 0,
                    numberFormats: current.numberFormat ? numberformat_map[current.numberFormat] : 0,
                    xf: current.xfId ? +current.xfId : 0,
                    applyFont: current.applyFont === 0 ? 0 : 1,
                    applyBorder: current.applyBorder === 0 ? 0 : 1,
                    applyFill: current.applyFill === 0 ? 0 : 1,
                    applyAlignment: current.applyAlignment === 0 ? 0 : 1,
                    applyNumberFormat: current.applyNumberFormat === 0 ? 0 : 1
                });
            }
            return result;
        }
        function importXfStyleList(data) {
            var result = [];
            var indexData = data.styleSheet.cellStyleXfs;
            for (var i = 0, len = indexData.length; i < len; i++) {
                var current = indexData[i];
                // 注意顺序
                result.push({
                    fonts: current.font ? +current.font : 0,
                    borders: current.border ? +current.border : 0,
                    fills: current.fill ? +current.fill : 0,
                    alignments: current.align ? +current.align : 0,
                    numberFormats: current.numberFormat ? numberformat_map[current.numberFormat] : 0,
                    applyFont: current.applyFont ? 1 : 0,
                    applyBorder: current.applyBorder ? 1 : 0,
                    applyFill: current.applyFill ? 1 : 0,
                    applyAlignment: current.applyAlignment ? 1 : 0,
                    applyNumberFormat: current.applyNumberFormat === 0 ? 0 : 1
                });
            }
            return result;
        }
        return {
            worksheets: importExcel,
            sheet: importSheet
        };
    }
};

//src/kernel/border-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[155] = {
    value: function() {
        return [ "top", "right", "bottom", "left" ];
    }
};

//src/kernel/data.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[156] = {
    value: function(require) {
        var data = {
            active: 0,
            sheetNames: [ "sheet1" ],
            readonly: false,
            sheets: [ {
                total: {
                    row: 100,
                    col: 26
                },
                // 控制行列header是否显示
                header: true,
                // 手动调整行高记录
                row: {},
                // 主动调整列宽记录
                column: {},
                hidden: {
                    row: [],
                    col: []
                },
                value: {},
                // 数组公式引用关系
                arrayRef: [],
                // 单元格对应的数组公式的引用关系
                formulaRef: [],
                // 样式
                columnStyle: {},
                rowStyle: {},
                cellStyle: [],
                // 命名单元格vi
                name: {},
                mergeMap: {},
                merge: {},
                cellType: {},
                // 批注
                comments: [],
                // 窗格
                pane: {
                    row: -1,
                    col: -1
                },
                // 数据维度
                dimension: {
                    row: -1,
                    col: -1
                },
                dimensionRecord: {
                    row: [],
                    col: []
                },
                // 数据有效性设置
                dataValidation: [],
                validationMap: {},
                allStyle: -1
            } ]
        };
        $.extend(data, _p.r(197));
        return data;
    }
};

//src/kernel/definition/default-style-value.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[157] = {
    value: function(require) {
        var NONE = _p.r(126);
        return {
            color: NONE,
            name: NONE,
            bold: false,
            italic: false,
            underline: false,
            throughline: false,
            size: NONE,
            fill: NONE,
            border: {
                top: NONE,
                left: NONE,
                right: NONE,
                bottom: NONE
            },
            wraptext: false,
            horizontal: NONE,
            vertical: NONE,
            numberFormula: NONE
        };
    }
};

//src/kernel/definition/default-style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[158] = {
    value: {
        numberFormats: {
            numberFormat: "none"
        },
        fonts: {
            color: "#000000",
            name: "宋体",
            bold: false,
            italic: false,
            underline: false,
            throughline: false,
            size: 13
        },
        fills: {
            fill: "none"
        },
        // 注： 如果修改该处border的值，请同时修改util文件
        borders: {
            border: {
                top: "none",
                left: "none",
                right: "none",
                bottom: "none"
            }
        },
        alignments: {
            wraptext: false,
            horizontal: "left",
            vertical: "bottom"
        }
    }
};

//src/kernel/definition/default-validation.js
/**
 * @file 默认有效性规则
 * @author hancong03@baiud.com
 */
_p[159] = {
    value: function(require) {
        var VALUES = _p.r(160);
        return {
            type: VALUES.type[0],
            // 忽略空白
            allowBlank: 1,
            error: {
                errorStyle: VALUES.errorStyle[0],
                errorTitle: "",
                error: ""
            },
            prompt: {
                promptTitle: "",
                prompt: ""
            },
            operator: VALUES.operator[0],
            showDropDown: 1,
            showDropDown: 1,
            showInputMessage: 1
        };
    }
};

//src/kernel/definition/validation-value.js
/**
 * @file 默认有效性规则
 * @author hancong03@baiud.com
 */
_p[160] = {
    value: {
        type: [ "any", "whole", "decimal", "list", "date", "time", "text", "custom" ],
        errorStyle: [ "stop", "warning", "information" ],
        operator: [ "between", "equal", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual", "notBetween", "notEqual" ]
    }
};

//src/kernel/hash.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[161] = {
    value: function(require) {
        var MAX_COLUMN_COUNT = _p.r(193).MAX_COLUMN_COUNT;
        return {
            indexToKey: function(row, col) {
                return row * MAX_COLUMN_COUNT + +col;
            },
            indexToKeys: function(start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var keys = [];
                var index;
                for (var i = startRow, limit = endRow; i <= limit; i++) {
                    index = i * MAX_COLUMN_COUNT + +startCol;
                    for (var j = startCol, jlimit = endCol; j <= jlimit; j++, index++) {
                        keys.push(index);
                    }
                }
                return keys;
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
_p[162] = {
    value: function(require) {
        var HASH = _p.r(161);
        var ExchangeHelper = _p.r(163);
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
_p[163] = {
    value: function(require) {
        var HASH = _p.r(161);
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
_p[164] = {
    value: function(require) {
        return $.extend({
            bind: function(data) {
                this.data = data;
            },
            execCommand: function(commandName) {
                var args = [].slice.call(arguments);
                this.interpreter.exec(this.data, args);
            }
        }, _p.r(173));
    }
};

//src/kernel/interpreter/commands/clear.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[165] = {
    value: function(require) {
        function ClearCommand() {}
        $.extend(ClearCommand, $.extend({
            exec: function(commandName, ranges) {
                if (commandName === "clearcontent") {
                    this.kernelClearValue(ranges);
                } else {
                    this.kernelClearStyle(ranges);
                }
            }
        }, _p.r(164)));
        return ClearCommand;
    }
};

//src/kernel/interpreter/commands/export.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[166] = {
    value: function(require) {
        function ExportCommand() {}
        $.extend(ExportCommand, $.extend({
            exec: function(commandName, isSimple) {
                if (commandName === "export") {
                    return this.kernelExport(isSimple);
                } else {
                    return this.kernelExportExcel();
                }
            }
        }, _p.r(164)));
        return ExportCommand;
    }
};

//src/kernel/interpreter/commands/paste.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[167] = {
    value: function(require) {
        function PasteCommand() {}
        $.extend(PasteCommand, $.extend({
            exec: function(commandName, data, styles, point, range) {
                if (commandName === "paste") {
                    this.paste(data, styles, point);
                } else {
                    this.cut(data, styles, point, range);
                }
            },
            paste: function(data, styles, point) {
                this.batchWriteCell(data, point.row, point.col);
                if (styles) {
                    this.kernelBatchSetStyle(styles, point.row, point.col);
                }
            },
            cut: function(data, styles, point, range) {
                this.execCommand("clearcontent", [ range ]);
                this.execCommand("clearformat", [ range ]);
                this.paste(data, styles, point);
            },
            batchWriteCell: function(contents, row, col) {
                var rowContents;
                for (var i = 0, len = contents.length; i < len; i++) {
                    rowContents = contents[i];
                    for (var j = 0, jlen = rowContents.length; j < jlen; j++) {
                        this.execCommand("write", rowContents[j], row + i, col + j);
                    }
                }
            }
        }, _p.r(164)));
        return PasteCommand;
    }
};

//src/kernel/interpreter/commands/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[168] = {
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
        }, _p.r(164)));
        return ResizeCommand;
    }
};

//src/kernel/interpreter/commands/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[169] = {
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
        }, _p.r(164)));
        return StyleCommand;
    }
};

//src/kernel/interpreter/commands/write.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[170] = {
    value: function(require) {
        function WriteCommand() {}
        $.extend(WriteCommand, $.extend({
            exec: function(commandName, content, row, col) {
                this.kernelSetValue(content, row, col);
            }
        }, _p.r(164)));
        return WriteCommand;
    }
};

//src/kernel/interpreter/interpreter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[171] = {
    value: function(require) {
        var COMMAND_MAP = _p.r(172);
        function Interpreter() {}
        $.extend(Interpreter.prototype, {
            exec: function(data, commandArgs) {
                var commandName = commandArgs[0];
                var command = COMMAND_MAP[commandName];
                if (!command) {
                    return;
                }
                command.bind(data);
                command.interpreter = this;
                return command.exec.apply(command, commandArgs);
            },
            createSheet: function() {
                return $.clone(_p.r(156), true);
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
_p[172] = {
    value: function(require) {
        var StyleCommand = _p.r(169);
        var ResizeCommand = _p.r(168);
        var ClearCommand = _p.r(165);
        var WriteCommand = _p.r(170);
        var ExportCommand = _p.r(166);
        var PasteCommand = _p.r(167);
        return {
            write: WriteCommand,
            clearcontent: ClearCommand,
            clearformat: ClearCommand,
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
            "export": ExportCommand,
            exportexcel: ExportCommand,
            paste: PasteCommand,
            cut: PasteCommand
        };
    }
};

//src/kernel/kernel.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[173] = {
    value: function(require) {
        var KERNEL_DATA = _p.r(156);
        var HASH = _p.r(161);
        return $.extend({
            /* ---------------- read ---------------- */
            kernelCreateWorkbook: function(sheetCount) {
                var data = $._clone(KERNEL_DATA);
                if (sheetCount > 1) {
                    for (var i = 1; i < sheetCount; i++) {
                        data.sheets[i] = this.kernelCreateSheet();
                    }
                }
                return data;
            },
            kernelCreateSheet: function() {
                return $._clone(KERNEL_DATA.sheets[0]);
            },
            kernelGetValue: function(row, col) {
                return this.kernelGetActiveData().value[HASH.indexToKey(row, col)];
            },
            kernelGetTotal: function() {
                return this.kernelGetActiveData().total;
            },
            kernelGetTotalIndex: function() {
                var total = this.kernelGetActiveData().total;
                return {
                    row: total.row - 1,
                    col: total.col - 1
                };
            },
            kernelGetDefaultStyle: function(classify) {
                return $._clone(this.data.defaultStyle[classify]);
            },
            kernelGetCellType: function(row, col) {
                return this.kernelGetActiveData().cellType[this.indexToKey(row, col)];
            },
            kernelIsShowHeader: function() {
                return this.kernelGetActiveData().header;
            },
            /* ---------------- write ---------------- */
            kernelSetHeaderState: function(state) {
                return this.kernelGetActiveData().header = !!state;
            },
            kernelSetCellType: function(type, row, col) {
                if (!type) {
                    this.kernelClearCellType(row, col);
                } else {
                    this.kernelGetActiveData().cellType[this.indexToKey(row, col)] = type;
                }
            },
            kernelClearCellType: function(row, col) {
                this.kernelGetActiveData().cellType[this.indexToKey(row, col)] = undefined;
            },
            kernelExchangeRow: function(index, range) {},
            /* ---------------- private ---------------- */
            __kernelGetRangeType: function(start, end) {
                var totalIndex = this.kernelGetTotalIndex();
                var isFullRow = start.row === 0 && end.row >= totalIndex.row;
                var isFullColumn = start.col === 0 && end.col >= totalIndex.col;
                if (isFullColumn && isFullRow) {
                    return "ALL";
                }
                if (isFullColumn) {
                    return "ROW";
                }
                if (isFullRow) {
                    return "COLUMN";
                }
                return "RANGE";
            }
        }, _p.r(161), _p.r(190), _p.r(186), _p.r(181), _p.r(191), _p.r(188), _p.r(187), _p.r(192), _p.r(184), _p.r(174), _p.r(182), _p.r(183), _p.r(188), _p.r(174), _p.r(179), _p.r(175), _p.r(178), _p.r(177), _p.r(180), _p.r(185), _p.r(176));
    }
};

//src/kernel/kernels/border.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[174] = {
    value: function(require) {
        var StyleUtil = _p.r(189);
        var NONE = _p.r(126);
        return {
            kernelGetBorder: function(row, col) {
                var activeData = this.kernelGetActiveData();
                var data = this.data;
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var columnStyle = activeData.columnStyle;
                var styleIndex = data.styleIndex;
                var index = cellStyle[row][col];
                if (index !== undefined && styleIndex[index].applyBorder === 1) {
                    return styleIndex[index].borders;
                }
                index = rowStyle[row];
                if (index !== undefined && styleIndex[index].applyBorder === 1) {
                    return styleIndex[index].borders;
                }
                index = columnStyle[col];
                if (index !== undefined && styleIndex[index].applyBorder === 1) {
                    return styleIndex[index].borders;
                }
                return undefined;
            },
            kernelGetBorders: function(start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var borders = [];
                var rowBorders;
                for (var i = startRow; i <= endRow; i++) {
                    rowBorders = [];
                    for (var j = startCol; j <= endCol; j++) {
                        rowBorders.push(this.kernelGetBorder(i, j));
                    }
                    borders.push(rowBorders);
                }
                return borders;
            },
            kernelSetBorder: function(borderOption, start, end) {
                if (!borderOption) {
                    borderOption = {
                        top: NONE,
                        left: NONE,
                        right: NONE,
                        bottom: NONE
                    };
                }
                var rangeType = this.__kernelGetRangeType(start, end);
                switch (rangeType) {
                  case "ALL":
                    this.__kernelSetAllBorder(borderOption);
                    break;

                  case "ROW":
                    this.__kernelSetRowBorder(borderOption, start.row, end.row);
                    break;

                  case "COLUMN":
                    this.__kernelSetColumnBorder(borderOption, start.col, end.col);
                    break;

                  case "RANGE":
                    this.__kernelSetRangeBorder(borderOption, start, end);
                    break;
                }
            },
            __kernelGetBorderByIndex: function(index) {
                return this.styleGroup.borders[index].border;
            },
            __kernelSetAllBorder: function(borderOption) {
                var totalIndex = this.kernelGetTotalIndex();
                this.__kernelSetColumnBorder(borderOption, 0, totalIndex.col);
            },
            __kernelUnsetBorder: function(start, end) {
                var cellStyle = this.kernelGetActiveData().cellStyle;
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var index;
                var newStyle;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startCol; j <= endCol; j++) {
                        index = this.__getStyleIndex(i, j) || 0;
                        newStyle = StyleUtil.unsetStyleClassify(this.data, "borders", index);
                        cellStyle[i][j] = newStyle;
                    }
                }
            },
            __kernelSetRowBorder: function(borderOption, startIndex, endIndex, isClear) {
                var index;
                var rowStyle = this.kernelGetActiveData().rowStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = rowStyle[i] || 0;
                    rowStyle[i] = StyleUtil.generateBorder(this.data, index, borderOption);
                }
                // 补齐在行内的单元格样式
                this.__patchRowCellBorder(borderOption, startIndex, endIndex);
                // 覆盖交叉的列数据
                this.__overlayColumnBorder(borderOption, startIndex, endIndex);
                if (isClear === false) {
                    return;
                }
                // 清除上一行数据
                startIndex -= 1;
                if (startIndex >= 0) {
                    this.__clearRowBorder({
                        bottom: NONE
                    }, startIndex);
                }
                // 清除下一行数据
                endIndex += 1;
                this.__clearRowBorder({
                    top: NONE
                }, endIndex);
            },
            __kernelSetColumnBorder: function(borderOption, startIndex, endIndex, isClear) {
                var index;
                var columnStyle = this.kernelGetActiveData().columnStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = columnStyle[i] || 0;
                    columnStyle[i] = StyleUtil.generateBorder(this.data, index, borderOption);
                }
                this.__patchColumnCellBorder(borderOption, startIndex, endIndex);
                this.__overlayRowBorder(borderOption, startIndex, endIndex);
                if (isClear === false) {
                    return;
                }
                // 清除左列数据
                startIndex -= 1;
                if (startIndex >= 0) {
                    this.__clearColumnBorder({
                        right: NONE
                    }, startIndex);
                }
                // 清除右列数据
                endIndex += 1;
                this.__clearColumnBorder({
                    left: NONE
                }, endIndex);
            },
            __kernelSetRangeBorder: function(borderOption, start, end, isClear) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var index;
                var cellStyle = this.kernelGetActiveData().cellStyle;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startCol; j <= endCol; j++) {
                        index = this.__getStyleIndex(i, j) || 0;
                        cellStyle[i][j] = StyleUtil.generateBorder(this.data, index, borderOption);
                    }
                }
                if (isClear === false) {
                    return;
                }
                // clear top
                if (startRow > 0) {
                    this.__kernelSetRangeBorder({
                        bottom: NONE
                    }, {
                        row: startRow - 1,
                        col: startCol
                    }, {
                        row: startRow - 1,
                        col: endCol
                    }, false);
                }
                // clear bottom
                this.__kernelSetRangeBorder({
                    top: NONE
                }, {
                    row: endRow + 1,
                    col: startCol
                }, {
                    row: endRow + 1,
                    col: endCol
                }, false);
                // clear left
                if (startCol > 0) {
                    this.__kernelSetRangeBorder({
                        right: NONE
                    }, {
                        row: startRow,
                        col: startCol - 1
                    }, {
                        row: endRow,
                        col: startCol - 1
                    }, false);
                }
                this.__kernelSetRangeBorder({
                    left: NONE
                }, {
                    row: startRow,
                    col: endCol + 1
                }, {
                    row: endRow,
                    col: endCol + 1
                }, false);
            },
            __clearRowBorder: function(borderOption, index) {
                var currentIndex = this.kernelGetActiveData().rowStyle[index];
                var styleIndex = this.data.styleIndex;
                var currentStyle = styleIndex[currentIndex];
                // 该行有有效行样式，则按设置行样式执行
                if (currentStyle && currentStyle.applyBorder === 1) {
                    this.__kernelSetRowBorder(borderOption, index, index, false);
                } else {
                    // 没有行样式，则单独设置交叉的单元格
                    this.__patchRowCellBorder(borderOption, index, index);
                    // 覆盖与该行交叉的列数据
                    this.__overlayColumnBorder(borderOption, index, index);
                }
            },
            __clearColumnBorder: function(borderOption, index) {
                var currentIndex = this.kernelGetActiveData().columnStyle[index];
                var styleIndex = this.data.styleIndex;
                var currentStyle = styleIndex[currentIndex];
                // 该列包含有效列样式
                if (currentStyle && currentStyle.applyBorder === 1) {
                    this.__kernelSetColumnBorder(borderOption, index, index, false);
                } else {
                    this.__patchColumnCellBorder(borderOption, index, index);
                    this.__overlayRowBorder(borderOption, index, index);
                }
            },
            __patchRowCellBorder: function(borderOption, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    rowCellStyle = cellStyle[i];
                    for (var j = 0, jlen = rowCellStyle.length; j < jlen; j++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立数据，则跳过不补齐
                        if (currentCellStyle === undefined) {
                            continue;
                        }
                        newIndex = StyleUtil.generateBorder(this.data, currentCellStyle, borderOption);
                        // 新生成的样式和现有的行样式一致，则清除该单元格的样式
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            __patchColumnCellBorder: function(borderOption, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = cellStyle.length; i < len; i++) {
                    rowCellStyle = cellStyle[i];
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立单元格数据， 跳过
                        if (!currentCellStyle) {
                            continue;
                        }
                        newIndex = StyleUtil.generateBorder(this.data, currentCellStyle, borderOption);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            // 覆盖与行重叠的列
            __overlayColumnBorder: function(borderOption, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    for (var j = 0, jlen = columnStyle.length; j < jlen; j++) {
                        // 不存在列样式
                        // 或者，该行列单元格已经存在独立样式，跳过
                        if (!columnStyle[j] || cellStyle[i][j]) {
                            continue;
                        }
                        // 合并行列样式
                        newIndex = StyleUtil.mergeBorder(this.data, columnStyle[j], rowStyle[i], borderOption);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            },
            __overlayRowBorder: function(borderOption, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                var cellStyle = activeData.cellStyle;
                var columnStyle = activeData.columnStyle;
                var currentRowStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = rowStyle.length; i < len; i++) {
                    currentRowStyle = rowStyle[i];
                    if (!currentRowStyle) {
                        continue;
                    }
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = cellStyle[i][j];
                        // 不存在该列样式
                        // 已存在独立单元格样式， 跳过
                        if (!columnStyle[j] || currentCellStyle) {
                            continue;
                        }
                        // 合并行列样式， 基于合并后的样式，结合新增加的样式，生成新的样式
                        newIndex = StyleUtil.mergeBorder(this.data, columnStyle[j], currentRowStyle, borderOption);
                        // 行样式和单元格样式一致，则清除单元格样式
                        if (currentRowStyle === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            }
        };
    }
};

//src/kernel/kernels/comments.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[175] = {
    value: function(require) {
        return {
            kernelGetComments: function(row, col) {
                var comments = this.kernelGetActiveData().comments[row];
                if (comments && comments[col]) {
                    return comments[col];
                }
                return undefined;
            },
            kernelSetComments: function(row, col, content) {
                var comments = this.kernelGetActiveData().comments;
                if (!comments[row]) {
                    comments[row] = [];
                }
                comments[row][col] = content;
            },
            kernelClearComments: function(row, col) {
                var comments = this.kernelGetActiveData().comments[row];
                if (comments && comments[col]) {
                    comments[col] = undefined;
                }
            }
        };
    }
};

//src/kernel/kernels/data-validation.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[176] = {
    value: function(require) {
        var DEFAULT_VALIDATION = _p.r(159);
        return {
            kernelSetDataValidation: function(start, end, options) {
                options = $.extend(true, {}, DEFAULT_VALIDATION, options);
                var activeData = this.kernelGetActiveData();
                var key = JSON.stringify(options);
                var index = activeData.validationMap[key];
                if (index === undefined) {
                    index = activeData.dataValidation.length;
                    activeData.dataValidation.push({
                        options: options,
                        rel: []
                    });
                }
                var current = activeData.dataValidation[index];
                current.rel = getRegions(current.rel, start, end);
                console.log(current.rel);
                return index;
            }
        };
        function getRegions(regions, start, end) {
            // 待加入的区域
            var joinRegion = $._clone({
                start: start,
                end: end
            });
            if (regions.length === 0) {
                return [ joinRegion ];
            }
            var result = [];
            var current;
            var currentStart;
            var currentEnd;
            var joinRegion = {
                start: start,
                end: end
            };
            for (var i = 0, len = regions.length; i < len; i++) {
                current = regions[i];
                currentStart = current.start;
                currentEnd = current.end;
                if (currentStart.row > end.row || currentEnd.row < start.row) {
                    result.push(current);
                } else {
                    if (currentStart.col === start.col && currentEnd.col === end.col) {}
                }
            }
        }
    }
};

//src/kernel/kernels/dimension.js
/**
 * @file 导入导出BTable数据
 * @author hancong03@baiud.com
 */
_p[177] = {
    value: function() {
        return {
            kernelGetDimension: function() {
                return this.kernelGetActiveData().dimension;
            },
            kernelClearDimension: function(start, end) {
                var activeData = this.kernelGetActiveData();
                var valueData = activeData.value;
                var dimensionRecord = activeData.dimensionRecord;
                var rowDimension = dimensionRecord.row;
                var columnDimension = dimensionRecord.col;
                var currentMax;
                var key;
                var index;
                // row check
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    currentMax = rowDimension[i];
                    if (!currentMax) {
                        continue;
                    }
                    index = -1;
                    key = this.indexToKey(i, currentMax);
                    for (var j = currentMax; j >= 0; j--, key--) {
                        if (valueData[key]) {
                            index = j;
                            break;
                        }
                    }
                    if (index === -1) {
                        rowDimension[i] = undefined;
                    } else {
                        rowDimension[i] = index;
                    }
                }
                // column check
                for (var i = start.col, ilimit = end.col; i <= ilimit; i++) {
                    currentMax = columnDimension[i];
                    if (!currentMax) {
                        continue;
                    }
                    index = -1;
                    for (var j = currentMax; j >= 0; j--) {
                        key = this.indexToKey(j, i);
                        if (valueData[key]) {
                            index = j;
                            break;
                        }
                    }
                    if (index === -1) {
                        columnDimension[i] = undefined;
                    } else {
                        columnDimension[i] = index;
                    }
                }
                updateMainDimension(activeData);
            },
            kernelAddDimension: function(start, end) {
                var activeData = this.kernelGetActiveData();
                var dimensionRecord = activeData.dimensionRecord;
                var rowDimension = dimensionRecord.row;
                var columnDimension = dimensionRecord.col;
                var lastRow = end.row;
                var lastCol = end.col;
                // row check
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    if (!rowDimension[i]) {
                        rowDimension[i] = lastCol;
                    } else {
                        rowDimension[i] = Math.max(rowDimension[i], lastCol);
                    }
                }
                // column check
                for (var i = start.col, ilimit = end.col; i <= ilimit; i++) {
                    if (!columnDimension[i]) {
                        columnDimension[i] = lastRow;
                    } else {
                        columnDimension[i] = Math.max(columnDimension[i], lastRow);
                    }
                }
                var dimension = activeData.dimension;
                // update main recored
                dimension.row = Math.max(dimension.row, lastRow);
                dimension.col = Math.max(dimension.col, lastCol);
            },
            kernelExpandCol: function(count) {
                var totalData = this.kernelGetActiveData().total;
                totalData.col += count;
            }
        };
        function updateMainDimension(activeData) {
            activeData.dimension = {
                row: getMax(activeData.dimensionRecord.row),
                col: getMax(activeData.dimensionRecord.col)
            };
        }
        function getMax(values) {
            for (var i = values.length - 1; i >= 0; i--) {
                if (values[i] !== undefined) {
                    return i;
                }
            }
            return -1;
        }
    }
};

//src/kernel/kernels/expand.js
/**
 * @file 导入导出BTable数据
 * @author hancong03@baiud.com
 */
_p[178] = {
    value: function() {
        return {
            kernelExpandRow: function(count) {
                var activeData = this.kernelGetActiveData();
                var totalData = activeData.total;
                var cellStyleData = activeData.cellStyle;
                for (var i = 0, index = totalData.row; i < count; i++, index++) {
                    cellStyleData[index] = [];
                }
                totalData.row += count;
            },
            kernelExpandCol: function(count) {
                var totalData = this.kernelGetActiveData().total;
                totalData.col += count;
            }
        };
    }
};

//src/kernel/kernels/formula.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[179] = {
    value: function() {
        return {
            kernelGetArrayReference: function(row, col) {
                var activeData = this.kernelGetActiveData();
                var formulaRef = activeData.formulaRef;
                if (!formulaRef[row] || formulaRef[row][col] === undefined) {
                    return undefined;
                }
                var refIndex = formulaRef[row][col];
                return activeData.arrayRef[refIndex];
            },
            /**
         * 设置数组公式的引用关系
         * @param start 引用区域的开始部分
         * @param end 引用区域的结束部分
         */
            kernelSetArrayReference: function(start, end) {
                var activeData = this.kernelGetActiveData();
                var formulaRef = activeData.formulaRef;
                var arrayRefData = activeData.arrayRef;
                var refIndex = arrayRefData.length;
                arrayRefData.push({
                    start: {
                        row: start.row,
                        col: start.col
                    },
                    end: {
                        row: end.row,
                        col: end.col
                    }
                });
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        if (!formulaRef[i]) {
                            formulaRef[i] = [];
                        }
                        formulaRef[i][j] = refIndex;
                    }
                }
            },
            kernelClearArrayReference: function(row, col) {
                var activeData = this.kernelGetActiveData();
                var formulaRef = activeData.formulaRef;
                if (!formulaRef[row] || formulaRef[row][col] === undefined) {
                    return;
                }
                var arrayRefData = activeData.arrayRef;
                var refIndex = formulaRef[row][col];
                var range = arrayRefData[refIndex];
                var start = range.start;
                var end = range.end;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        formulaRef[i][j] = undefined;
                    }
                }
                arrayRefData[refIndex] = undefined;
            }
        };
    }
};

//src/kernel/kernels/hidden.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[180] = {
    value: function() {
        return {
            kernelGetHiddenRow: function(row) {
                return this.kernelGetActiveData().hidden.row[row];
            },
            kernelGetHiddenColumn: function(col) {
                return this.kernelGetActiveData().hidden.col[col];
            },
            kernelSetHiddenRow: function(row, value) {
                this.kernelGetActiveData().hidden.row[row] = value;
            },
            kernelSetHiddenColumn: function(col, value) {
                this.kernelGetActiveData().hidden.col[col] = value;
            },
            kernelClearHiddenRow: function(row) {
                this.kernelGetActiveData().hidden.row[row] = undefined;
            },
            kernelClearHiddenColumn: function(col) {
                this.kernelGetActiveData().hidden.col[col] = undefined;
            }
        };
    }
};

//src/kernel/kernels/io.js
/**
 * @file 导入导出BTable数据
 * @author hancong03@baiud.com
 */
_p[181] = {
    value: function(require) {
        var HASH = _p.r(161);
        return {
            /**
         * 获取存储数据，该数据是btable使用的数据格式
         * @returns {*}
         */
            kernelExportWorkbook: function(isOnlyData) {
                if (isOnlyData) {
                    return this.__kernelExportData();
                }
                var data = this.data;
                var masterData = {
                    active: data.active,
                    sheetNames: data.sheetNames,
                    sheets: [],
                    xfList: data.xfList,
                    styleGroup: data.styleGroup,
                    styleIndex: data.styleIndex
                };
                var sheetsData = data.sheets;
                var targetSheets = masterData.sheets;
                var current;
                for (var i = 0, len = sheetsData.length; i < len; i++) {
                    current = sheetsData[i];
                    targetSheets[i] = {
                        total: current.total,
                        row: current.row,
                        column: current.column,
                        value: current.value,
                        arrayRef: exportArrayRef(current.arrayRef),
                        comments: exportArrayData(current.comments),
                        cellType: current.cellType,
                        cellStyle: exportCellStyle(current.cellStyle),
                        rowStyle: current.rowStyle,
                        columnStyle: current.columnStyle,
                        allStyle: current.allStyle,
                        merge: current.merge,
                        pane: current.pane,
                        dimension: current.dimension
                    };
                }
                return JSON.stringify(masterData);
            },
            kernelImportWorkbook: function(data) {
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                if (data && !data.styleGroup) {
                    return this.__kernelImportData(data);
                }
                data = $.extend(true, this.kernelCreateWorkbook(data.sheets.length), $._clone(data));
                var styleGroup = data.styleGroup;
                var groupMap = data.styleGroupMap;
                var target;
                for (var groupName in styleGroup) {
                    target = styleGroup[groupName][0];
                    groupMap[groupName] = {};
                    groupMap[groupName][JSON.stringify(target)] = 0;
                }
                // 生成样式索引映射
                data.styleIndexMap[JSON.stringify(data.styleIndex[0])] = 0;
                // 边框索引
                data.borderMap[JSON.stringify(data.styleGroup.borders[0].border)] = 0;
                data.defaultStyle = importDefaultStyle(data);
                // 数组引用
                importArrayRef(data);
                importCellStyle(data);
                // 评论
                importCommonets(data);
                return data;
            },
            kernelImportSheet: function(sheetData) {
                sheetData = $.extend(true, this.kernelCreateSheet(), $._clone(sheetData));
                sheetData.cellStyle = __importSheetStyle(sheetData);
                return sheetData;
            },
            /**
         * 仅导出数据部分，其他格式不导出。导出的数据值是未经计算的值
         */
            __kernelExportData: function() {
                var data = this.data;
                var masterData = {
                    sheetNames: data.sheetNames,
                    sheets: []
                };
                var sheetsData = data.sheets;
                var targetSheets = masterData.sheets;
                for (var i = 0, len = sheetsData.length; i < len; i++) {
                    targetSheets[i] = importArrayData(sheetsData[i].value);
                }
                return JSON.stringify(masterData);
            },
            /**
         * 导入纯数据格式
         * @param data
         */
            __kernelImportData: function(data) {
                var internalData = this.kernelCreateWorkbook();
                var sheetData;
                var cellTypes;
                data = $._clone(data);
                internalData.sheetNames = data.sheetNames;
                cellTypes = data.cellType;
                data = data.sheets;
                var maxCol = 0;
                for (var i = 0, len = data.length; i < len; i++) {
                    sheetData = this.kernelCreateSheet();
                    sheetData.value = exportArrayData(data[i]);
                    for (var j = 0, jlen = data[i].length; j < jlen; j++) {
                        if (!data[i][j]) {
                            continue;
                        }
                        maxCol = Math.max(maxCol, data[i][j].length);
                    }
                    sheetData.total = {
                        row: Math.ceil(data[i].length / 100) * 100,
                        col: Math.ceil(maxCol / 26) * 26
                    };
                    if (sheetData.total.row === 0) {
                        sheetData.total.row = 100;
                    }
                    if (sheetData.total.col === 0) {
                        sheetData.total.col = 100;
                    }
                    sheetData.cellType = exportArrayData(cellTypes[i]);
                    internalData.sheets[i] = sheetData;
                }
                var styleGroup = internalData.styleGroup;
                var groupMap = internalData.styleGroupMap;
                var target;
                for (var groupName in styleGroup) {
                    target = styleGroup[groupName][0];
                    groupMap[groupName] = {};
                    groupMap[groupName][JSON.stringify(target)] = 0;
                }
                // 生成样式索引映射
                internalData.styleIndexMap[JSON.stringify(internalData.styleIndex[0])] = 0;
                // 边框索引
                internalData.borderMap[JSON.stringify(internalData.styleGroup.borders[0].border)] = 0;
                internalData.defaultStyle = importDefaultStyle(internalData);
                // 数组引用
                importArrayRef(internalData);
                importCellStyle(internalData);
                // 评论
                importCommonets(internalData);
                return internalData;
            }
        };
        function initCellStyle(data) {
            var cellStyle = data.cellStyle;
            for (var i = 0, len = data.total.row; i < len; i++) {
                cellStyle[i] = [];
            }
        }
        function exportArrayRef(arrayRef) {
            var result = [];
            for (var i = 0, len = arrayRef.length; i < len; i++) {
                if (arrayRef[i]) {
                    result.push(arrayRef[i]);
                }
            }
            return result;
        }
        function exportCellStyle(data) {
            var result = {};
            var rowData;
            var currentData;
            for (var i = 0, len = data.length; i < len; i++) {
                rowData = data[i];
                for (var j = 0, jlen = rowData.length; j < jlen; j++) {
                    currentData = rowData[j];
                    if (currentData !== undefined) {
                        result[HASH.indexToKey(i, j)] = currentData;
                    }
                }
            }
            return result;
        }
        function exportArrayData(arrayData) {
            var rowData;
            var current;
            var result = {};
            for (var i = 0, len = arrayData.length; i < len; i++) {
                rowData = arrayData[i];
                if (!rowData) {
                    continue;
                }
                for (var j = 0, jlen = rowData.length; j < jlen; j++) {
                    current = rowData[j];
                    if (current !== undefined && current !== null) {
                        result[HASH.indexToKey(i, j)] = current + "";
                    }
                }
            }
            return result;
        }
        function importArrayData(data) {
            var result = [];
            var index;
            for (var key in data) {
                if (!data.hasOwnProperty(key) || data[key] === undefined) {
                    continue;
                }
                index = HASH.keyToIndex(key);
                if (!result[index.row]) {
                    result[index.row] = [];
                }
                result[index.row][index.col] = data[key];
            }
            return result;
        }
        function importCellStyle(data) {
            var sheetData;
            for (var i = 0, len = data.sheets.length; i < len; i++) {
                sheetData = data.sheets[i];
                sheetData.cellStyle = __importSheetStyle(sheetData);
            }
        }
        function __importSheetStyle(data) {
            var originalCellStyle = data.cellStyle;
            var newCellStyle = [];
            var index;
            for (var i = 0, len = data.total.row; i < len; i++) {
                newCellStyle[i] = [];
            }
            /*
         * ------------------
         * 注意，如果导入的是空数据（也就是说，参数data完全是由 kernelCreateWorkbook() 创建的），
         * 则在for in 该数据时，不存在bug。因为原始数据为空，且导入的数据也是空。最终的结果都是空。
         * 这里在逻辑上需要特别注意一下
         * ------------------
         */
            for (var key in originalCellStyle) {
                if (!originalCellStyle.hasOwnProperty(key)) {
                    continue;
                }
                index = HASH.keyToIndex(key);
                newCellStyle[index.row][index.col] = originalCellStyle[key];
            }
            return newCellStyle;
        }
        function importArrayRef(data) {
            var sheets = data.sheets;
            for (var i = 0, len = sheets.length; i < len; i++) {
                __importRef(sheets[i]);
            }
            function __importRef(sheetData) {
                var arrayRefData = sheetData.arrayRef;
                var formulaRef = [];
                var refs = [];
                var range;
                var refIndex;
                for (var i = 0, len = arrayRefData.length; i < len; i++) {
                    range = arrayRefData[i];
                    if (!range) {
                        continue;
                    }
                    // 数据
                    refIndex = refs.length;
                    refs.push(range);
                    // 初始化公式引用缓存
                    for (var j = range.start.row, jlimit = range.end.row; j <= jlimit; j++) {
                        for (var k = range.start.col, klimit = range.end.col; k <= klimit; k++) {
                            if (!formulaRef[j]) {
                                formulaRef[j] = [];
                            }
                            formulaRef[j][k] = refIndex;
                        }
                    }
                }
                sheetData.formulaRef = formulaRef;
                sheetData.arrayRef = refs;
            }
        }
        function importCommonets(data) {
            var sheets = data.sheets;
            for (var i = 0, len = sheets.length; i < len; i++) {
                sheets[i].comments = importArrayData(sheets[i].comments);
            }
        }
        function importDefaultStyle(data) {
            var result = {};
            var defaultStyle = data.defaultStyle;
            var styleGroup = data.styleGroup;
            for (var key in styleGroup) {
                if (!styleGroup.hasOwnProperty(key)) {
                    continue;
                }
                result[key] = $._extend($._clone(defaultStyle[key]), styleGroup[key][0]);
            }
            return result;
        }
    }
};

//src/kernel/kernels/merge.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[182] = {
    value: function(require) {
        var HASH = _p.r(161);
        var NONE = "none";
        return {
            kernelSetMerge: function(range) {
                var activeData = this.kernelGetActiveData();
                var mergeMap = activeData.mergeMap;
                var start = range.start;
                var end = range.end;
                var mergeIndex;
                if (start.row === end.row && start.col === end.col) {
                    return false;
                }
                this.kernelUnmerge(range);
                mergeIndex = HASH.indexToKey(start.row, start.col);
                activeData.merge[mergeIndex] = $._clone(range);
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        mergeMap[[ HASH.indexToKey(i, j) ]] = mergeIndex;
                    }
                }
                var borderOption = this.__kernelGetMergeCellBorder(start, end);
                var rootStyleIndex;
                if (borderOption === null) {
                    // 剔除root单元格的边框
                    this.__kernelUnsetBorder(start, start);
                }
                // 覆盖其他单元格的样式
                rootStyleIndex = this.__getStyleIndex(start.row, start.col);
                this.__kernelSetStyleIndex(rootStyleIndex, start, end);
                // 边框不为空，则设置所有单元格的边框
                if (borderOption !== null) {
                    this.kernelSetBorder(borderOption, start, end);
                }
                return true;
            },
            kernelSetHorizontalMerge: function(range) {
                var startRow = range.start.row;
                var startCol = range.start.col;
                var endRow = range.end.row;
                var endCol = range.end.col;
                for (var i = startRow, limit = endRow; i <= limit; i++) {
                    this.kernelSetMerge({
                        start: {
                            row: i,
                            col: startCol
                        },
                        end: {
                            row: i,
                            col: endCol
                        }
                    });
                }
            },
            kernelSetVerticalMerge: function(range) {
                var startRow = range.start.row;
                var startCol = range.start.col;
                var endRow = range.end.row;
                var endCol = range.end.col;
                for (var i = startCol, limit = endCol; i <= limit; i++) {
                    this.kernelSetMerge({
                        start: {
                            row: startRow,
                            col: i
                        },
                        end: {
                            row: endRow,
                            col: i
                        }
                    });
                }
            },
            kernelGetMergeCell: function(row, col) {
                var activeData = this.kernelGetActiveData();
                if (row === undefined) {
                    return activeData.merge;
                }
                var mergeIndex = activeData.mergeMap[HASH.indexToKey(row, col)];
                if (mergeIndex === undefined) {
                    return null;
                }
                return activeData.merge[mergeIndex];
            },
            kernelIsMergeCell: function(row, col) {
                return this.kernelGetActiveData().mergeMap[HASH.indexToKey(row, col)] !== undefined;
            },
            kernelHasMergeCellInRange: function(range) {
                var mergeMap = this.kernelGetActiveData().mergeMap;
                var start = range.start;
                var end = range.end;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        if (mergeMap[HASH.indexToKey(i, j)]) {
                            return true;
                        }
                    }
                }
                return false;
            },
            kernelGetMergeCellsInRange: function(range) {
                var activeData = this.kernelGetActiveData();
                var mergeData = activeData.merge;
                var indices = {};
                var index;
                var mergeCells = [];
                var start = range.start;
                var end = range.end;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        index = activeData.mergeMap[HASH.indexToKey(i, j)];
                        if (index !== undefined) {
                            indices[index] = true;
                        }
                    }
                }
                for (var key in indices) {
                    if (indices.hasOwnProperty(key)) {
                        mergeCells.push(mergeData[key]);
                    }
                }
                return $._clone(mergeCells);
            },
            kernelIsSameMergeCell: function(cells) {
                var mergeIndex;
                var activeData = this.kernelGetActiveData();
                var mergeMap = activeData.mergeMap;
                var firstMergeIndex;
                firstMergeIndex = mergeMap[HASH.indexToKey(cells[0].row, cells[0].col)];
                if (firstMergeIndex === undefined) {
                    return false;
                }
                for (var i = 1, len = cells.length; i < len; i++) {
                    mergeIndex = mergeMap[HASH.indexToKey(cells[i].row, cells[i].col)];
                    if (mergeIndex !== firstMergeIndex) {
                        return false;
                    }
                }
                return true;
            },
            kernelUnmerge: function(range) {
                var activeData = this.kernelGetActiveData();
                var mergeMap = activeData.mergeMap;
                var start = range.start;
                var end = range.end;
                var key;
                var mergeIndex;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        key = HASH.indexToKey(i, j);
                        mergeIndex = mergeMap[key];
                        if (mergeIndex) {
                            this.__kernelUnmergeCell(mergeIndex);
                        }
                    }
                }
            },
            __kernelUnmergeCell: function(key) {
                var activeData = this.kernelGetActiveData();
                var mergeMap = activeData.mergeMap;
                var mergeData = activeData.merge[key];
                var start = mergeData.start;
                var end = mergeData.end;
                activeData.merge[key] = undefined;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        mergeMap[HASH.indexToKey(i, j)] = undefined;
                    }
                }
            },
            /**
         * 重置合并单元格的边框设置
         * @private
         */
            __kernelGetMergeCellBorder: function(start, end) {
                var topBorders;
                var leftBorders;
                var rightBorders;
                var bottomBorders;
                var borderOption = {};
                var startRow = start.row;
                var endRow = end.row;
                var startCol = start.col;
                var endCol = end.col;
                var isDifferent;
                topBorders = this.kernelGetBorders({
                    row: startRow,
                    col: startCol
                }, {
                    row: startRow,
                    col: endCol
                })[0];
                if (start.row === end.row) {
                    bottomBorders = topBorders;
                } else {
                    bottomBorders = this.kernelGetBorders({
                        row: endRow,
                        col: startCol
                    }, {
                        row: endRow,
                        col: endCol
                    })[0];
                }
                leftBorders = this.kernelGetBorders({
                    row: startRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: startCol
                })[0];
                if (start.col === end.col) {
                    rightBorders = leftBorders;
                } else {
                    rightBorders = this.kernelGetBorders({
                        row: startRow,
                        col: endCol
                    }, {
                        row: endRow,
                        col: endCol
                    })[0];
                }
                // top
                isDifferent = isDifferences(topBorders);
                if (isDifferent) {
                    borderOption.top = NONE;
                } else {
                    borderOption.top = this.__kernelGetBorderByIndex(topBorders[0]).top;
                }
                // left
                isDifferent = isDifferences(leftBorders);
                if (isDifferent) {
                    borderOption.left = NONE;
                } else {
                    borderOption.left = this.__kernelGetBorderByIndex(leftBorders[0]).left;
                }
                // right
                isDifferent = isDifferences(rightBorders);
                if (isDifferent) {
                    borderOption.right = NONE;
                } else {
                    borderOption.right = this.__kernelGetBorderByIndex(rightBorders[0]).right;
                }
                // top
                isDifferent = isDifferences(bottomBorders);
                if (isDifferent) {
                    borderOption.bottom = NONE;
                } else {
                    borderOption.bottom = this.__kernelGetBorderByIndex(bottomBorders[0]).bottom;
                }
                if (borderOption.top === NONE && borderOption.bottom === NONE && borderOption.left === NONE && borderOption.right === NONE) {
                    return null;
                }
                return borderOption;
            }
        };
        function isDifferences(borders) {
            var borderId = borders[0];
            if (borderId === undefined) {
                return true;
            } else {
                for (var i = 1, len = borders.length; i <= len; i++) {
                    if (borderId !== borders[i]) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
};

//src/kernel/kernels/numberformat.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[183] = {
    value: function(require) {
        var NONE = _p.r(126);
        return {
            kernelGetNumberFormat: function(row, col) {
                var result = this.kernelGetStyle("numberFormats", row, col);
                if (result && result.numberFormat !== NONE) {
                    return result.numberFormat;
                }
                return undefined;
            },
            kernelSetNumberFormat: function(code, start, end) {
                this.kernelSetStyle("numberFormat", code, start, end);
            },
            kernelClearNumberFormat: function(start, end) {
                this.kernelSetStyle("numberFormat", NONE, start, end);
            }
        };
    }
};

//src/kernel/kernels/pane.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[184] = {
    value: function(require) {
        return {
            kernelSetPane: function(row, col) {
                this.kernelGetActiveData().pane = {
                    row: row,
                    col: col
                };
            },
            kernelGetPane: function() {
                return this.kernelGetActiveData().pane;
            },
            kernelClearPane: function() {
                this.kernelGetActiveData().pane = {
                    row: -1,
                    col: -1
                };
            }
        };
    }
};

//src/kernel/kernels/row-column.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[185] = {
    value: function() {
        return {
            kernelGetRowHeight: function(row) {
                return this.kernelGetActiveData().row[row];
            },
            kernelGetColumnWidth: function(col) {
                return this.kernelGetActiveData().column[col];
            },
            kernelSetColumnWidth: function(value, col) {
                var activeData = this.kernelGetActiveData();
                if (value === undefined || value === null) {
                    this.kernelClearColumnWidth(col);
                } else {
                    activeData.column[col] = value >= 0 ? value : 0;
                }
            },
            kernelSetRowHeight: function(value, row) {
                var activeData = this.kernelGetActiveData();
                if (value === undefined || value === null) {
                    this.kernelClearRowHeight(row);
                } else {
                    activeData.row[row] = value >= 0 ? value : 0;
                }
            },
            kernelClearRowHeight: function(row) {
                this.kernelGetActiveData().row[row] = undefined;
            },
            kernelClearColumnWidth: function(col) {
                this.kernelGetActiveData().col[col] = undefined;
            }
        };
    }
};

//src/kernel/kernels/sheets.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[186] = {
    value: function(require) {
        return {
            kernelGetSheetName: function() {
                var active = this.data.active;
                return this.data.sheetNames[active];
            },
            kernelGetSheetNames: function() {
                return this.data.sheetNames;
            },
            kernelGetSheetIndex: function() {
                return this.data.active;
            },
            kernelSwitchSheet: function(index) {
                this.data.active = parseInt(index, 10);
            },
            kernelAddSheetName: function(sheetName) {
                var index = this.data.sheetNames.length;
                sheetName = sheetName || "Sheet" + (index + 1);
                this.data.sheetNames.push(sheetName);
                return index;
            },
            kernelInertSheet: function(index, sheetData) {
                this.data.sheets[index] = sheetData;
            }
        };
    }
};

//src/kernel/kernels/style-clear.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[187] = {
    value: function() {
        return {
            kernelClearStyle: function(start, end) {
                var rangeType = this.__kernelGetRangeType(start, end);
                switch (rangeType) {
                  case "ALL":
                    this.__kernelClearAllStyle();
                    break;

                  case "ROW":
                    this.__kernelClearRowStyle(start.row, end.row);
                    break;

                  case "COLUMN":
                    this.__kernelClearColumnStyle(start.col, end.col);
                    break;

                  case "RANGE":
                    this.__kernelClearRangeStyle(start, end);
                    break;
                }
            },
            __kernelClearAllStyle: function() {
                var totalIndex = this.kernelGetTotalIndex();
                this.__kernelClearColumnStyle(0, totalIndex.col);
            },
            __kernelClearRowStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    if (rowStyle[i] !== undefined) {
                        rowStyle[i] = undefined;
                    }
                }
                this.__clearRowCellStyle(startIndex, endIndex);
                // 覆盖交叉的列数据
                this.__clearOverlayColumnStyle(startIndex, endIndex);
            },
            __kernelClearColumnStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    if (columnStyle[i] !== undefined) {
                        columnStyle[i] = undefined;
                    }
                }
                this.__clearColumnCellStyle(startIndex, endIndex);
                // 覆盖交叉的列数据
                this.__clearOverlayRowStyle(startIndex, endIndex);
            },
            __kernelClearRangeStyle: function(start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var index;
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startCol; j <= endCol; j++) {
                        index = this.__getStyleIndex(i, j) || 0;
                        cellStyle[i][j] = 0;
                    }
                }
            },
            __clearRowCellStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowCellStyle;
                var currentCellStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    rowCellStyle = cellStyle[i];
                    for (var j = 0, jlen = rowCellStyle.length; j < jlen; j++) {
                        currentCellStyle = rowCellStyle[j];
                        if (currentCellStyle === undefined) {
                            continue;
                        }
                        rowCellStyle[j] = undefined;
                    }
                }
            },
            __clearColumnCellStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowCellStyle;
                var currentCellStyle;
                var index;
                for (var i = 0, len = cellStyle.length; i < len; i++) {
                    rowCellStyle = cellStyle[i];
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = rowCellStyle[j];
                        if (currentCellStyle === undefined) {
                            continue;
                        }
                        rowCellStyle[j] = undefined;
                    }
                }
            },
            __clearOverlayColumnStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                var cellStyle = activeData.cellStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    for (var j = 0, jlen = columnStyle.length; j < jlen; j++) {
                        if (columnStyle[j] === undefined) {
                            continue;
                        }
                        cellStyle[i][j] = 0;
                    }
                }
            },
            __clearOverlayRowStyle: function(startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                var cellStyle = activeData.cellStyle;
                var currentRowStyle;
                for (var i = 0, len = rowStyle.length; i < len; i++) {
                    currentRowStyle = rowStyle[i];
                    if (currentRowStyle === undefined) {
                        continue;
                    }
                    for (var j = startIndex; j <= endIndex; j++) {
                        cellStyle[i][j] = 0;
                    }
                }
            }
        };
    }
};

//src/kernel/kernels/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[188] = {
    value: function(require) {
        var StyleUtil = _p.r(189);
        var APPLY_CLASSIFY = _p.r(195).applyName;
        return {
            kernelGetStyle: function(classify, row, col) {
                var index = this.__kernelGetStyle(classify, row, col);
                if (index === undefined) {
                    return undefined;
                }
                return this.data.styleGroup[classify][index];
            },
            kernelGetStyleIds: function(classify, start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var result = [];
                var rowRes;
                var groupId;
                var index;
                for (var i = startRow; i <= endRow; i++) {
                    rowRes = [];
                    index = 0;
                    for (var j = startCol; j <= endCol; j++, index++) {
                        groupId = this.__kernelGetStyle(classify, i, j);
                        if (groupId !== undefined) {
                            rowRes[index] = groupId;
                        }
                    }
                    result.push(rowRes);
                }
                return result;
            },
            kernelGetStyleById: function(classify, id) {
                return this.data.styleGroup[classify][id];
            },
            kernelSetStyle: function(styleName, styleValue, start, end) {
                // border 处理
                if (styleName === "border") {
                    return this.kernelSetBorder(styleValue, start, end);
                }
                var rangeType = this.__kernelGetRangeType(start, end);
                switch (rangeType) {
                  case "ALL":
                    this.__kernelSetAllStyle(styleName, styleValue);
                    break;

                  case "ROW":
                    this.__kernelSetRowStyle(styleName, styleValue, start.row, end.row);
                    break;

                  case "COLUMN":
                    this.__kernelSetColumnStyle(styleName, styleValue, start.col, end.col);
                    break;

                  case "RANGE":
                    this.__kernelSetRangeStyle(styleName, styleValue, start, end);
                    break;
                }
            },
            kernelBatchSetStyle: function(styleOptions, start, end) {
                var styleGroupData = this.data.styleGroup;
                // 不复制边框
                if (styleOptions.border) {
                    delete styleOptions.border;
                }
                // 以默认值填补遗漏的style设置
                for (var key in styleOptions) {
                    if (!styleOptions.hasOwnProperty(key)) {
                        continue;
                    }
                    styleOptions[key] = $.extend($._clone(styleGroupData[key][0]), styleOptions[key]);
                }
                this.kernelSetStyle(styleOptions, null, start, end);
            },
            __kernelSetAllStyle: function(styleName, styleValue) {
                var totalIndex = this.kernelGetTotalIndex();
                this.__kernelSetColumnStyle(styleName, styleValue, 0, totalIndex.col);
            },
            __kernelSetRowStyle: function(styleName, styleValue, startIndex, endIndex) {
                var index;
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = rowStyle[i] || 0;
                    rowStyle[i] = StyleUtil.generateStyle(this.data, index, styleName, styleValue);
                }
                // 补齐在行内的单元格样式
                this.__patchRowCellStyle(styleName, styleValue, startIndex, endIndex);
                // 覆盖交叉的列数据
                this.__overlayColumnStyle(styleName, styleValue, startIndex, endIndex);
            },
            __kernelSetColumnStyle: function(styleName, styleValue, startIndex, endIndex) {
                var index;
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = columnStyle[i] || 0;
                    columnStyle[i] = StyleUtil.generateStyle(this.data, index, styleName, styleValue);
                }
                this.__patchColumnCellStyle(styleName, styleValue, startIndex, endIndex);
                this.__overlayRowStyle(styleName, styleValue, startIndex, endIndex);
            },
            __kernelSetRangeStyle: function(styleName, styleValue, start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var index;
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startCol; j <= endCol; j++) {
                        index = this.__getStyleIndex(i, j) || 0;
                        cellStyle[i][j] = StyleUtil.generateStyle(this.data, index, styleName, styleValue);
                    }
                }
            },
            __patchRowCellStyle: function(styleName, styleValue, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    rowCellStyle = cellStyle[i];
                    for (var j = 0, jlen = rowCellStyle.length; j < jlen; j++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立数据，则跳过不补齐
                        if (currentCellStyle === undefined) {
                            continue;
                        }
                        newIndex = StyleUtil.generateStyle(this.data, currentCellStyle, styleName, styleValue);
                        // 新生成的样式和现有的行样式一致，则清除该单元格的样式
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            __patchColumnCellStyle: function(styleName, styleValue, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = cellStyle.length; i < len; i++) {
                    rowCellStyle = cellStyle[i];
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立单元格数据， 跳过
                        if (!currentCellStyle) {
                            continue;
                        }
                        newIndex = StyleUtil.generateStyle(this.data, currentCellStyle, styleName, styleValue);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            __overlayColumnStyle: function(styleName, styleValue, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    for (var j = 0, jlen = columnStyle.length; j < jlen; j++) {
                        // 不存在列样式
                        // 或者，该行列单元格已经存在独立样式，跳过
                        if (!columnStyle[j] || cellStyle[i][j]) {
                            continue;
                        }
                        // 合并行列样式
                        newIndex = StyleUtil.mergeStyle(this.data, columnStyle[j], rowStyle[i], styleName, styleValue);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            },
            __overlayRowStyle: function(styleName, styleValue, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                var cellStyle = activeData.cellStyle;
                var columnStyle = activeData.columnStyle;
                var currentRowStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = rowStyle.length; i < len; i++) {
                    currentRowStyle = rowStyle[i];
                    if (!currentRowStyle) {
                        continue;
                    }
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = cellStyle[i][j];
                        // 不存在该列样式
                        // 已存在独立单元格样式， 跳过
                        if (!columnStyle[j] || currentCellStyle) {
                            continue;
                        }
                        // 合并行列样式， 基于合并后的样式，结合新增加的样式，生成新的样式
                        newIndex = StyleUtil.mergeStyle(this.data, columnStyle[j], currentRowStyle, styleName, styleValue);
                        // 行样式和单元格样式一致，则清除单元格样式
                        if (currentRowStyle === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            },
            __kernelGetStyle: function(classify, row, col) {
                var activeData = this.kernelGetActiveData();
                var data = this.data;
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var columnStyle = activeData.columnStyle;
                var styleIndex = data.styleIndex;
                var index = cellStyle[row][col];
                var result = this.__kernelGetClassifyInStyle(classify, styleIndex[index]);
                if (result !== undefined) {
                    return result;
                }
                index = rowStyle[row];
                result = this.__kernelGetClassifyInStyle(classify, styleIndex[index]);
                if (result !== undefined) {
                    return result;
                }
                index = columnStyle[col];
                result = this.__kernelGetClassifyInStyle(classify, styleIndex[index]);
                if (result !== undefined) {
                    return result;
                }
                // 检查全局样式
                if (activeData.allStyle !== -1) {
                    return this.__kernelGetClassifyInStyle(classify, styleIndex[activeData.allStyle]);
                }
                return undefined;
            },
            // 为给定区域的单元格统一设置样式索引
            __kernelSetStyleIndex: function(index, start, end) {
                var cellStyle = this.kernelGetActiveData().cellStyle;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                        cellStyle[i][j] = index;
                    }
                }
            },
            __getStyleIndex: function(row, col) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var columnStyle = activeData.columnStyle;
                var index = cellStyle[row][col];
                if (index !== undefined) {
                    return index;
                }
                index = rowStyle[row];
                if (index !== undefined) {
                    return index;
                }
                if (activeData.allStyle !== -1) {
                    return activeData.allStyle;
                }
                return columnStyle[col];
            },
            __kernelGetClassifyInStyle: function(classify, styles) {
                var applyName = APPLY_CLASSIFY[classify];
                var xfStyle;
                if (!styles) {
                    return undefined;
                }
                if (styles[applyName]) {
                    return styles[classify];
                }
                xfStyle = this.data.xfList[styles.xf];
                if (xfStyle[applyName]) {
                    return xfStyle[classify];
                }
                return undefined;
            }
        };
    }
};

//src/kernel/kernels/style/util.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[189] = {
    value: function(require) {
        var STYLE_REL = _p.r(195);
        var STYLE_CLASSIFY = STYLE_REL.classify;
        var APPLY_CLASSIFY = STYLE_REL.applyName;
        var APPLY_CLASSIFY_MAP = STYLE_REL.applyClassifyMap;
        var NONE = _p.r(126);
        var DEFAULT_STYLE_VALUE = _p.r(157);
        return {
            generateStyle: function(data, index, styleName, styleValue) {
                if (typeof styleName !== "string") {
                    return __generateStyle(data, index, styleName);
                }
                if (!styleValue) {
                    styleValue = DEFAULT_STYLE_VALUE[styleName];
                }
                var classify = STYLE_CLASSIFY[styleName];
                var applyName = APPLY_CLASSIFY[styleName];
                var styleIndex = data.styleIndex;
                var styleGroup = data.styleGroup[classify];
                var styles = styleIndex[index];
                var groupIndex = styles[classify];
                var groupStyle = styleGroup[groupIndex];
                // 设置的值和原始值一致，直接返回该style的索引即可
                if (groupStyle[styleName] === styleValue && styles[applyName] === 1) {
                    return index;
                }
                groupStyle = $._clone(groupStyle);
                groupStyle[styleName] = styleValue;
                if (styleName === "numberFormat" && styleValue === undefined) {
                    debugger;
                }
                index = getGroupIndex(data, classify, groupStyle);
                styles = $._clone(styles);
                styles[classify] = index;
                styles[applyName] = 1;
                return getStyleIndex(data, styles);
            },
            generateStyleByXfId: function(data, index, xfId) {
                var styles = $._clone(data.styleIndex[index]);
                var xfStyles = data.xfList[xfId];
                var originalXfStyle = data.xfList[styles.xf];
                var classify;
                styles.xf = xfId;
                for (var applyName in APPLY_CLASSIFY_MAP) {
                    if (!APPLY_CLASSIFY_MAP.hasOwnProperty(applyName)) {
                        continue;
                    }
                    classify = APPLY_CLASSIFY_MAP[applyName];
                    // clone 新xfstyle中所应用的所有样式
                    if (xfStyles[applyName]) {
                        styles[applyName] = 0;
                        styles[classify] = xfStyles[classify];
                    } else if (originalXfStyle[applyName]) {
                        styles[applyName] = 1;
                        styles[classify] = originalXfStyle[classify];
                    }
                }
                return getStyleIndex(data, styles);
            },
            generateBorder: function(data, index, styleValue) {
                if (!styleValue) {
                    styleValue = DEFAULT_STYLE_VALUE["border"];
                }
                var currentGroudpIndex = borderNormalized(data, index, styleValue);
                var styleIndex = data.styleIndex;
                var styles = styleIndex[index];
                // 设置的值和原始值一致，直接返回该style的索引即可
                if (styles.applyBorder === 1 && styles.borders === currentGroudpIndex) {
                    return index;
                }
                styles = $._clone(styles);
                styles.borders = currentGroudpIndex;
                styles.applyBorder = 1;
                return getStyleIndex(data, styles);
            },
            unsetStyleClassify: function(data, classify, index) {
                var styleIndex = data.styleIndex;
                var xfList = data.xfList;
                var applyName = APPLY_CLASSIFY[classify];
                var currentStyle = $._clone(styleIndex[index]);
                if (currentStyle[applyName]) {
                    currentStyle[classify] = 0;
                } else if (xfList[currentStyle.xf][applyName] && xfList[currentStyle.xf][classify] !== 0) {
                    currentStyle[applyName] = 1;
                    currentStyle[classify] = 0;
                }
                return getStyleIndex(data, currentStyle);
            },
            generateGroupIndex: function(data, classify, groupStyle) {
                return getGroupIndex(data, classify, groupStyle);
            },
            mergeStyle: function(data, toIndex, fromIndex, styleName, styleValue) {
                var newStyle = merge(data, toIndex, fromIndex);
                var styleGroup = data.styleGroup;
                var target;
                var classify = STYLE_CLASSIFY[styleName];
                var applyName = APPLY_CLASSIFY[styleName];
                if (newStyle[applyName] === 1) {
                    target = $._clone(styleGroup[classify][newStyle[classify]]);
                } else {
                    target = $._clone($._clone(styleGroup[classify][0]));
                }
                target[styleName] = styleValue;
                newStyle[applyName] = 1;
                newStyle[classify] = getGroupIndex(data, classify, target);
                return getStyleIndex(data, newStyle);
            },
            mergeBorder: function(data, toIndex, fromIndex, borderOption) {
                var newStyle = merge(data, toIndex, fromIndex);
                var styleGroup = data.styleGroup;
                var target;
                if (newStyle.applyBorder === 1) {
                    target = $._clone(styleGroup.borders[newStyle.borders].border);
                } else {
                    target = $._clone(styleGroup.borders[0].border);
                }
                newStyle.applyBorder = 1;
                newStyle.borders = generateNewBorder(data, target, borderOption);
                return getStyleIndex(data, newStyle);
            }
        };
        function __generateStyle(data, index, styleOptions) {
            var styleIndex = data.styleIndex;
            var styleGroupData = data.styleGroup;
            var styles = $._clone(styleIndex[index]);
            for (var key in styleOptions) {
                if (!styleOptions.hasOwnProperty(key)) {
                    continue;
                }
                resetIndex(key, styleOptions[key], styles);
            }
            function resetIndex(classify, options, styles) {
                var applyName = APPLY_CLASSIFY[classify];
                var styleGroup = styleGroupData[classify];
                var groupIndex = styles[classify];
                var groupStyle = $._clone(styleGroup[groupIndex]);
                groupStyle = $.extend(groupStyle, options);
                index = getGroupIndex(data, classify, groupStyle);
                styles[classify] = index;
                styles[applyName] = 1;
            }
            return getStyleIndex(data, styles);
        }
        /**
     * 合并两个样式，返回新的样式的值。注意：新的样式并未被索引
     * @param data
     * @param toIndex
     * @param fromIndex
     * @returns {*}
     */
        function merge(data, toIndex, fromIndex) {
            var styleIndex = data.styleIndex;
            var target = $._clone(styleIndex[toIndex]);
            // 重要条件
            if (!fromIndex) {
                return target;
            }
            if (toIndex === fromIndex) {
                return target;
            }
            var source = styleIndex[fromIndex];
            if (source.applyBorder) {
                target.applyBorder = 1;
                target.borders = source.borders;
            }
            if (source.applyFill) {
                target.applyFill = 1;
                target.fills = source.fills;
            }
            if (source.applyFont) {
                target.applyFont = 1;
                target.fonts = source.fonts;
            }
            if (source.applyAlignment) {
                target.applyAlignment = 1;
                target.alignments = source.alignments;
            }
            return target;
        }
        function getGroupIndex(data, classify, groupStyle) {
            var styleGroupMap = data.styleGroupMap[classify];
            var groupStyleKey = JSON.stringify(groupStyle);
            var classifyIndex = styleGroupMap[groupStyleKey];
            // 已经存在该组的样式
            if (classifyIndex !== undefined) {
                return classifyIndex;
            }
            // 不存在，则创建新的组样式
            var styleGroup = data.styleGroup[classify];
            classifyIndex = styleGroup.length;
            styleGroupMap[groupStyleKey] = classifyIndex;
            styleGroup.push(groupStyle);
            return classifyIndex;
        }
        function getStyleIndex(data, styles) {
            var styleIndexMap = data.styleIndexMap;
            var styleKey = JSON.stringify(styles);
            var index = styleIndexMap[styleKey];
            // 已有相同样式
            if (index !== undefined) {
                return index;
            }
            // 否则，记录新的样式
            var styleIndex = data.styleIndex;
            styleIndexMap[styleKey] = styleIndex.length;
            styleIndex.push(styles);
            return styleIndexMap[styleKey];
        }
        // 对border值进行归一化
        function borderNormalized(data, index, borderOption) {
            var styleIndex = data.styleIndex;
            var styleGroup = data.styleGroup.borders;
            var currentStyle = styleIndex[index];
            var basicBorder;
            if (currentStyle.applyBorder === 0) {
                basicBorder = {
                    top: NONE,
                    left: NONE,
                    right: NONE,
                    bottom: NONE
                };
            } else {
                basicBorder = $._clone(styleGroup[currentStyle.borders].border);
            }
            return generateNewBorder(data, basicBorder, borderOption);
        }
        // 合并两个border值，并索引该值。同时返回新值的索引序号
        function generateNewBorder(data, target, source) {
            var borderGroup = data.styleGroup.borders;
            for (var key in source) {
                if (!source.hasOwnProperty(key)) {
                    continue;
                }
                target[key] = source[key];
            }
            var valueKey = JSON.stringify(target);
            // 有相同样式存在
            if (data.borderMap[valueKey] !== undefined) {
                return data.borderMap[valueKey];
            }
            // 无相同样式存在
            data.borderMap[valueKey] = borderGroup.length;
            borderGroup.push({
                border: target
            });
            return data.borderMap[valueKey];
        }
    }
};

//src/kernel/kernels/switcher.js
/**
 * @file 文件切换器
 * @author hancong03@baiud.com
 */
_p[190] = {
    value: function(require) {
        var StyleUtil = _p.r(189);
        var NONE = _p.r(126);
        return {
            kernelGetActiveData: function() {
                return this.data.sheets[this.data.active];
            }
        };
    }
};

//src/kernel/kernels/value.js
/**
 * @file 导入导出BTable数据
 * @author hancong03@baiud.com
 */
_p[191] = {
    value: function() {
        return {
            kernelClearValue: function(ranges) {
                var activeData = this.kernelGetActiveData();
                var data = activeData.value;
                var total = activeData.total;
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
                        activeData.value = {};
                        return true;
                    }
                    for (var i = start.row, limit = end.row; i <= limit; i++) {
                        for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                            index = this.indexToKey(i, j);
                            if (data[index]) {
                                data[index] = undefined;
                            }
                        }
                    }
                    this.kernelClearDimension(start, end);
                    return false;
                }
            },
            kernelSetValue: function(value, row, col) {
                var data = this.kernelGetActiveData().value;
                var index = this.indexToKey(row, col);
                if (!value) {
                    if (data[index]) {
                        data[index] = undefined;
                    }
                    this.kernelClearDimension({
                        row: row,
                        col: col
                    }, {
                        row: row,
                        col: col
                    });
                } else {
                    data[index] = value;
                    this.kernelAddDimension({
                        row: row,
                        col: col
                    }, {
                        row: row,
                        col: col
                    });
                }
            }
        };
    }
};

//src/kernel/kernels/xfstyle.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[192] = {
    value: function(require) {
        var StyleUtil = _p.r(189);
        var STYLE_REL = _p.r(195);
        var STYLE_CLASSIFY = STYLE_REL.classify;
        var STYLE_APPLY_NAME = STYLE_REL.applyName;
        var XF_STYLE_DEFAULT = _p.r(194).xfStyle;
        return {
            kernelSetXfStyle: function(styleOption, start, end) {
                var xfId = this.__kernelGetXfId(styleOption);
                var rangeType = this.__kernelGetRangeType(start, end);
                switch (rangeType) {
                  case "ALL":
                    this.__kernelSetAllXfStyle(xfId);
                    break;

                  case "ROW":
                    this.__kernelSetRowXfStyle(xfId, start.row, end.row);
                    break;

                  case "COLUMN":
                    this.__kernelSetColumnXfStyle(xfId, start.col, end.col);
                    break;

                  case "RANGE":
                    this.__kernelSetRangeXfStyle(xfId, start, end);
                    break;
                }
            },
            __kernelSetAllXfStyle: function(xfId) {
                var totalIndex = this.kernelGetTotalIndex();
                this.__kernelSetColumnStyle(xfId, 0, totalIndex.col);
            },
            __kernelSetRowXfStyle: function(xfId, startIndex, endIndex) {
                // 设置行
                var index;
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = rowStyle[i] || 0;
                    rowStyle[i] = StyleUtil.generateStyleByXfId(this.data, index, xfId);
                }
                // 补齐在行内的单元格样式
                this.__patchRowCellXfStyle(xfId, startIndex, endIndex);
                // 覆盖交叉的列数据
                this.__overlayColumnXfStyle(xfId, startIndex, endIndex);
            },
            __kernelSetColumnXfStyle: function(xfId, startIndex, endIndex) {
                var index;
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                for (var i = startIndex; i <= endIndex; i++) {
                    index = columnStyle[i] || 0;
                    columnStyle[i] = StyleUtil.generateStyleByXfId(this.data, index, xfId);
                }
                this.__patchColumnCellXfStyle(xfId, startIndex, endIndex);
                this.__overlayRowXfStyle(xfId, startIndex, endIndex);
            },
            __kernelSetRangeXfStyle: function(xfId, start, end) {
                var startRow = start.row;
                var startCol = start.col;
                var endRow = end.row;
                var endCol = end.col;
                var index;
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startCol; j <= endCol; j++) {
                        index = this.__getStyleIndex(i, j) || 0;
                        cellStyle[i][j] = StyleUtil.generateStyleByXfId(this.data, index, xfId);
                    }
                }
            },
            __patchRowCellXfStyle: function(xfId, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    rowCellStyle = cellStyle[i];
                    for (var j = 0, jlen = rowCellStyle.length; j < jlen; j++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立数据，则跳过不补齐
                        if (currentCellStyle === undefined) {
                            continue;
                        }
                        newIndex = StyleUtil.generateStyleByXfId(this.data, currentCellStyle, xfId);
                        // 新生成的样式和现有的行样式一致，则清除该单元格的样式
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            __patchColumnCellXfStyle: function(xfId, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var rowCellStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = cellStyle.length; i < len; i++) {
                    rowCellStyle = cellStyle[i];
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = rowCellStyle[j];
                        // 无独立单元格数据， 跳过
                        if (!currentCellStyle) {
                            continue;
                        }
                        newIndex = StyleUtil.generateStyleByXfId(this.data, currentCellStyle, xfId);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            rowCellStyle[j] = undefined;
                        } else {
                            rowCellStyle[j] = newIndex;
                        }
                    }
                }
            },
            __overlayColumnXfStyle: function(xfId, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var columnStyle = activeData.columnStyle;
                var cellStyle = activeData.cellStyle;
                var rowStyle = activeData.rowStyle;
                var newIndex;
                for (var i = startIndex; i <= endIndex; i++) {
                    for (var j = 0, jlen = columnStyle.length; j < jlen; j++) {
                        // 不存在列样式
                        // 或者，该行列单元格已经存在独立样式，跳过
                        if (!columnStyle[j] || cellStyle[i][j]) {
                            continue;
                        }
                        // 合并行列样式
                        newIndex = StyleUtil.generateStyleByXfId(this.data, columnStyle[j], xfId);
                        // 新样式和当前所在行样式一致，则清除
                        if (rowStyle[i] === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            },
            __overlayRowXfStyle: function(xfId, startIndex, endIndex) {
                var activeData = this.kernelGetActiveData();
                var rowStyle = activeData.rowStyle;
                var cellStyle = activeData.cellStyle;
                var columnStyle = activeData.columnStyle;
                var currentRowStyle;
                var currentCellStyle;
                var index;
                var newIndex;
                for (var i = 0, len = rowStyle.length; i < len; i++) {
                    currentRowStyle = rowStyle[i];
                    if (!currentRowStyle) {
                        continue;
                    }
                    index = 0;
                    for (var j = startIndex; j <= endIndex; j++, index++) {
                        currentCellStyle = cellStyle[i][j];
                        // 不存在该列样式
                        // 已存在独立单元格样式， 跳过
                        if (!columnStyle[j] || currentCellStyle) {
                            continue;
                        }
                        // 合并行列样式， 基于合并后的样式，结合新增加的样式，生成新的样式
                        newIndex = StyleUtil.generateStyleByXfId(this.data, columnStyle[j], xfId);
                        // 行样式和单元格样式一致，则清除单元格样式
                        if (currentRowStyle === newIndex) {
                            cellStyle[i][j] = undefined;
                        } else {
                            cellStyle[i][j] = newIndex;
                        }
                    }
                }
            },
            __kernelGetXfId: function(styleOption) {
                var data = this.data;
                var group = {};
                var classify;
                var classifyList = [];
                var groupStyle;
                var styles = {};
                var styleOptionKey = JSON.stringify(styleOption);
                var xfId = data.xfValueRecord[styleOptionKey];
                // 已缓存
                if (xfId !== undefined) {
                    return xfId;
                }
                for (var styleName in styleOption) {
                    if (!styleOption.hasOwnProperty(styleName)) {
                        continue;
                    }
                    classify = STYLE_CLASSIFY[styleName];
                    classifyList.push(classify);
                    if (!group[classify]) {
                        group[classify] = {};
                    }
                    group[classify][styleName] = styleOption[styleName];
                }
                // 标准化值
                for (var i = 0, len = classifyList.length; i < len; i++) {
                    classify = classifyList[i];
                    groupStyle = this.__kernelGroupStyleNormalized(classify, group[classify]);
                    styles[STYLE_APPLY_NAME[classify]] = 1;
                    styles[classify] = StyleUtil.generateGroupIndex(data, classify, groupStyle);
                }
                // 标准化xfstyle
                styles = this.__kernelXfStyleNormalized(styles);
                // 存储并记录
                xfId = data.xfList.length;
                data.xfList.push(styles);
                data.xfValueRecord[styleOptionKey] = xfId;
                return xfId;
            },
            // TODO 不能取默认值，需要修改为去默认定义的值
            __kernelGroupStyleNormalized: function(classify, styleOption) {
                var defaultStyle = $._clone(this.kernelGetDefaultStyle(classify));
                return $.extend(defaultStyle, styleOption);
            },
            __kernelXfStyleNormalized: function(styles) {
                var defaultXfStyle = $._clone(XF_STYLE_DEFAULT);
                return $.extend(defaultXfStyle, styles);
            }
        };
    }
};

//src/kernel/limit.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[193] = {
    value: {
        MAX_COLUMN_COUNT: Math.pow(26, 3) - 1,
        MAX_ROW_COUNT: Math.pow(2, 16) - 1
    }
};

//src/kernel/style-default.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[194] = {
    value: {
        style: {
            fonts: 0,
            borders: 0,
            fills: 0,
            alignments: 0,
            numberFormats: 0,
            xf: 0,
            applyFont: 0,
            applyBorder: 0,
            applyFill: 0,
            applyAlignment: 0
        },
        xfStyle: {
            fonts: 0,
            borders: 0,
            fills: 0,
            alignments: 0,
            numberFormats: 0,
            applyFont: 0,
            applyBorder: 0,
            applyFill: 0,
            applyAlignment: 0,
            applyNumberFormat: 0
        }
    }
};

//src/kernel/style-rel.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[195] = {
    value: function() {
        return {
            classify: {
                color: "fonts",
                name: "fonts",
                bold: "fonts",
                italic: "fonts",
                underline: "fonts",
                throughline: "fonts",
                size: "fonts",
                fill: "fills",
                border: "borders",
                wraptext: "alignments",
                horizontal: "alignments",
                vertical: "alignments",
                numberFormat: "numberFormats"
            },
            applyName: {
                color: "applyFont",
                name: "applyFont",
                bold: "applyFont",
                italic: "applyFont",
                underline: "applyFont",
                throughline: "applyFont",
                size: "applyFont",
                font: "applyFont",
                border: "applyBorder",
                fill: "applyFill",
                numberFormat: "applyNumberFormat",
                wraptext: "applyAlignment",
                horizontal: "applyAlignment",
                vertical: "applyAlignment",
                alignments: "applyAlignment",
                fonts: "applyFont",
                fills: "applyFill",
                borders: "applyBorder",
                numberFormats: "applyNumberFormat"
            },
            applyClassifyMap: {
                applyFont: "fonts",
                applyBorder: "borders",
                applyFill: "fills",
                applyAlignment: "alignments",
                applyNumberFormat: "numberFormats"
            }
        };
    }
};

//src/kernel/style-type.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[196] = {
    value: function() {
        return [ "color", "backgroundColor", "textAlign", "verticalAlign", "underline", "throughline", "fontStyle", "fontWeight", "fontSize", "fontFamily", "wraptext" ];
    }
};

//src/kernel/style.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[197] = {
    value: function(require) {
        var NONE = _p.r(126);
        var data = {
            defaultStyle: $._clone(_p.r(158)),
            styleGroup: {
                numberFormats: [ {
                    numberFormat: NONE
                } ],
                fonts: [ {
                    color: "#000000",
                    name: "宋体",
                    bold: false,
                    italic: false,
                    underline: false,
                    throughline: false,
                    size: 13
                } ],
                fills: [ {
                    fill: NONE
                } ],
                // 注： 如果修改该处border的值，请同时修改util文件
                borders: [ {
                    border: {
                        top: NONE,
                        left: NONE,
                        right: NONE,
                        bottom: NONE
                    }
                } ],
                alignments: [ {
                    wraptext: false,
                    horizontal: NONE,
                    vertical: NONE
                } ]
            },
            xfList: [ {
                fonts: 0,
                borders: 0,
                fills: 0,
                alignments: 0,
                numberFormats: 0,
                applyFont: 1,
                applyBorder: 1,
                applyFill: 1,
                applyAlignment: 0,
                applyNumberFormat: 0
            } ],
            styleIndex: [ {
                fonts: 0,
                borders: 0,
                fills: 0,
                alignments: 0,
                numberFormats: 0,
                xf: 0,
                applyFont: 0,
                applyBorder: 0,
                applyFill: 0,
                applyAlignment: 0,
                applyNumberFormat: 0
            } ],
            styleGroupMap: {},
            styleIndexMap: {},
            xfListMap: {},
            // 记录style值和xfid的映射
            xfValueRecord: {},
            borderMap: {}
        };
        return data;
    }
};

//src/modules.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[198] = {
    value: function(require) {
        return {
            common: {
                cell: _p.r(6),
                title: _p.r(11),
                content: _p.r(9),
                color: _p.r(7),
                style: _p.r(10)
            },
            core: {
                struct: _p.r(91),
                dataAccess: _p.r(43),
                sheet: _p.r(89),
                actuary: _p.r(15),
                range: _p.r(88),
                value: _p.r(118),
                datetime: _p.r(51),
                cell: _p.r(18),
                view: _p.r(119),
                style: _p.r(92),
                border: _p.r(17),
                hidden: _p.r(84),
                visible: _p.r(120),
                device: _p.r(55),
                exportManager: _p.r(56),
                wraptext: _p.r(121),
                autosize: _p.r(16),
                formula: _p.r(59),
                valueSecurity: _p.r(94),
                mode: _p.r(85),
                comments: _p.r(39),
                paster: _p.r(86),
                header: _p.r(83),
                dataValidation: _p.r(41)
            },
            system: {
                screen: _p.r(238),
                scrollbar: _p.r(242),
                cover: _p.r(210),
                position: _p.r(221),
                input: _p.r(214),
                selection: _p.r(246),
                resize: _p.r(222),
                rowcolumn: _p.r(223),
                sort: _p.r(247),
                viewport: _p.r(248),
                clipboard: _p.r(199),
                selectall: _p.r(243),
                commentsTip: _p.r(203),
                converter: _p.r(204)
            }
        };
    }
};

//src/system/clipboard.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[199] = {
    value: function(require) {
        var $ = _p.r(2);
        var KEY_CODE = _p.r(213);
        var Clipboard = _p.r(0).create("Clipboard", {
            base: _p.r(146),
            converterModule: null,
            inputModule: null,
            tipNode: null,
            $tipNode: null,
            state: false,
            cutState: false,
            start: null,
            end: null,
            inputActive: false,
            init: function(inputModule, converterModule) {
                this.inputModule = inputModule;
                this.converterModule = converterModule;
                this.tipNode = this.createElement("div", "btb-copy-tip");
                this.$tipNode = $(this.tipNode);
                this.initEvent();
                this.initMessageHook();
                this.initService();
            },
            run: function() {
                this.getContentContainer().appendChild(this.tipNode);
            },
            initEvent: function() {
                var _self = this;
                $(this.getMainContainer()).on("paste", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (_self.inputActive) {
                        _self.pasteActiveCell(e.originalEvent.clipboardData);
                    } else {
                        _self.pasteInactiveCell(e.originalEvent.clipboardData);
                    }
                }).on("copy", function(e) {
                    if (_self.inputActive) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    _self.oncopy(e.originalEvent.clipboardData);
                }).on("cut", function(e) {
                    if (_self.inputActive) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    _self.oncut(e.originalEvent.clipboardData);
                }).on("keydown", function(e) {});
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.refresh,
                    "s.input.active": this.active,
                    "s.input.inactive": this.inactive
                });
            },
            active: function() {
                this.inputActive = true;
            },
            inactive: function() {
                this.inputActive = false;
            },
            initService: function() {
                this.registerService({
                    "s.paste": this.paste,
                    "s.cut": this.cut
                });
            },
            paste: function(data, styles, point) {
                var startRow = point.row;
                var startCol = point.col;
                this.corePrepareRefresh();
                this.rs("c.batch.write", data, point.row, point.col);
                if (styles) {
                    this.rs("c.batch.setstyle", styles, point.row, point.col);
                }
                var cols = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    cols.push(data[i].length);
                }
                var maxCol = Math.max.apply(null, cols);
                this.__changeSelection({
                    row: startRow,
                    col: startCol
                }, {
                    row: startRow + data.length - 1,
                    col: startCol + maxCol - 1
                });
                this.coreRefresh();
            },
            pasteInactiveCell: function(clipboardData) {
                if (clipboardData.types.indexOf("text/html") !== -1) {
                    this.writeHTML(clipboardData.getData("text/html"));
                } else if (clipboardData.types.indexOf("text/plain") !== -1) {
                    this.writeText(clipboardData.getData("text/plain"));
                } else {
                    return;
                }
                if (this.cutState) {
                    this.cutState = false;
                    this.execCommand("clearall", this.start, this.end);
                }
                this.hide();
            },
            writeText: function(content) {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var focus = range.getFocus();
                var cellData = this.converterModule.stringToCells(content);
                this.__writeData(cellData, focus.row, focus.col);
            },
            writeHTML: function(content) {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var focus = range.getFocus();
                var cellData = this.converterModule.htmlToCells(content);
                this.__writeData(cellData, focus.row, focus.col);
            },
            __writeData: function(data, row, col) {
                var rowCount = data.length;
                var colCount = 0;
                for (var i = 0, len = data.length; i < len; i++) {
                    colCount = Math.max(colCount, data[i].length);
                }
                if (rowCount > 0) {
                    rowCount -= 1;
                }
                if (colCount > 0) {
                    colCount -= 1;
                }
                this.rs("c.paste", data, row, col);
                this.rs("c.range.set", {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                }, {
                    row: row + rowCount,
                    col: col + colCount
                });
            },
            pasteActiveCell: function(clipboardData) {
                var types = clipboardData.types;
                if (types.indexOf("text/plain") === -1) {
                    return;
                }
                var str = clipboardData.getData("text/plain");
                this.rs("s.input.inserttext", str);
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
                this.cutState = false;
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
            oncopy: function(clipboardData) {
                var range = this.rs("c.range");
                var start = range.getStart();
                var end = range.getEnd();
                this.show(start, end);
                clipboardData.clearData();
                var exportContent = this.converterModule.export(start, end);
                if (!exportContent) {
                    return;
                }
                clipboardData.setData("text/html", exportContent.html);
                clipboardData.setData("text/plain", exportContent.string);
            },
            oncut: function(clipboardData) {
                this.cutState = true;
                this.oncopy(clipboardData);
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
        Clipboard.deps = [ "input", "converter" ];
        return Clipboard;
    }
};

//src/system/commands/_paste.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[200] = {
    value: function(require) {
        return _p.r(0).create("_PasteCommand", {
            base: _p.r(142),
            name: "paste cut",
            execute: function(name, data, style, point, range) {
                if (name === "paste") {
                    this.rs("s.paste", data, style, point);
                } else {
                    this.rs("s.cut", data, style, point, range);
                }
            }
        });
    }
};

//src/system/commands/input.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[201] = {
    value: function(require) {
        return _p.r(0).create("InputLockCommand", {
            base: _p.r(142),
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
_p[202] = {
    value: function(require) {
        return _p.r(0).create("SortCommand", {
            base: _p.r(142),
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
                var struct = this.rs("c.struct");
                var effectiveIndex = struct.getEffectiveIndex();
                var end = range.getEnd();
                return [ index, {
                    start: range.getStart(),
                    end: {
                        row: Math.min(end.row, effectiveIndex.row),
                        col: Math.min(end.col, effectiveIndex.col)
                    }
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

//src/system/comments-tip.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[203] = {
    value: function(require) {
        var LINE_OFFSET = _p.r(14).border.offset;
        var CommentsTip = _p.r(0).create("CommentsTip", {
            panel: null,
            cover: null,
            timer: null,
            base: _p.r(146),
            init: function(cover) {
                this.panel = this.createElement("div", "btb-comments-tip");
                this.cover = cover;
                this.initEvent();
                this.initMessageHook();
            },
            run: function() {
                this.getContentContainer().appendChild(this.panel);
            },
            initEvent: function() {
                this.cover.oncellenter(this, this.cellenter);
                this.cover.oncellleave(this, this.cellleave);
            },
            initMessageHook: function() {
                this.onMessage({
                    "s.input.active": this.hide
                });
            },
            cellenter: function(r, c) {
                var _self = this;
                this.timer = setTimeout(function() {
                    _self.show(r, c);
                }, 500);
            },
            cellleave: function(r, c) {
                this.hide();
                if (!this.timer) {
                    return;
                }
                clearTimeout(this.timer);
                this.timer = null;
            },
            show: function(r, c) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var row = grid.rowMap[r];
                var col = grid.colMap[c];
                var mergeCell = struct.getMergeCell(row, col);
                var comments = struct.getCommentsInView();
                if (mergeCell) {
                    row = mergeCell.start.row;
                    col = mergeCell.start.col;
                }
                comments = comments[row + "," + col];
                if (!comments) {
                    return;
                }
                if (!mergeCell) {
                    this.__showNormalCellComments(r, c, comments);
                } else {
                    this.__showMergeCellComments(mergeCell.end.row, mergeCell.end.col, comments);
                }
            },
            __showNormalCellComments: function(r, c, comments) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewColPoints = grid.viewColPoints;
                var viewRowPoints = grid.viewRowPoints;
                this.__showTips(viewColPoints[c + 1], viewRowPoints[r], comments.content);
            },
            __showMergeCellComments: function(row, col, comments) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var r = grid.rMap[row];
                var c = grid.cMap[col];
                if (r === undefined || c === undefined) {
                    return;
                }
                this.__showTips(grid.viewColPoints[c + 1], grid.viewRowPoints[r], comments.content);
            },
            __showTips: function(x, y, content) {
                $(this.panel).html(content.replace(/\n/g, "<br>")).css({
                    top: y - LINE_OFFSET,
                    left: x + LINE_OFFSET + 2,
                    display: "block"
                });
            },
            hide: function() {
                this.panel.style.display = "none";
            }
        });
        CommentsTip.deps = [ "cover" ];
        return CommentsTip;
    }
};

//src/system/converter/converter.js
/**
 * @file 转换器，提供HTML to Excel和Excel to HTML功能模块
 * @author hancong03@baiud.com
 */
_p[204] = {
    value: function(require) {
        var HTMLConverter = _p.r(205);
        var PlaintextConverter = _p.r(208);
        var OutConverter = _p.r(207);
        return _p.r(0).create("Converter", {
            htmlConverter: null,
            plaintextConverter: null,
            outConverter: null,
            base: _p.r(146),
            init: function(valueModule, styleModule) {
                this.valueModule = valueModule;
                this.styleModule = styleModule;
                this.htmlConverter = this.createComponent(HTMLConverter);
                this.plaintextConverter = this.createComponent(PlaintextConverter);
                this.outConverter = this.createComponent(OutConverter);
            },
            htmlToCells: function(content) {
                return this.htmlConverter.fromHTML(content);
            },
            stringToCells: function(content) {
                return this.plaintextConverter.fromPlaintext(content);
            },
            "export": function(start, end) {
                return this.outConverter.parse(start, end);
            },
            selectRow: function(y) {
                var index = this.position.toIndex(0, y);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                this.execCommand("selectrow", grid.rowMap[index.row]);
            }
        });
    }
};

//src/system/converter/html.js
/**
 * @file 转换器，提供HTML to Excel和Excel to HTML功能模块
 * @author hancong03@baiud.com
 */
_p[205] = {
    value: function(require) {
        var ELEMENT = 1;
        var TEXT = 3;
        var ROW_ELEMENTS = _p.r(209);
        var IGNORE_ELEMENTS = _p.r(206);
        return _p.r(0).create("Converter", {
            shadowNode: null,
            base: _p.r(143),
            init: function() {
                var hiddenFrame = this.createElement("iframe");
                hiddenFrame.style.display = "none";
                this.getDocument().body.appendChild(hiddenFrame);
                var struct = this.rs("c.struct");
                var defaultStyle = struct.getDefaultStyle("fonts");
                this.shadowNode = hiddenFrame.contentDocument.documentElement;
                this.shadowNode.style.cssText = [ "color:" + defaultStyle.color, "font-family:" + defaultStyle.name, "font-size:" + defaultStyle.size + "px" ].join("; ");
            },
            fromHTML: function(content) {
                var result = [];
                this.shadowNode.innerHTML = content;
                parse(this.shadowNode.getElementsByTagName("body")[0], result);
                return result;
            }
        });
        function parse(node, result) {
            var childNodes = node.childNodes;
            var current;
            var nodeType;
            var nodeName;
            var row = [];
            var content;
            var currentCol;
            var style = {};
            for (var i = 0, len = childNodes.length; i < len; i++) {
                current = childNodes[i];
                nodeType = current.nodeType;
                nodeName = current.nodeName.toLowerCase();
                if (nodeName === "br") {
                    result.push(row);
                    row = [];
                    continue;
                }
                if (IGNORE_ELEMENTS[nodeName]) {
                    continue;
                }
                if (nodeName === "table") {
                    parseTable(current, result);
                    continue;
                }
                if (ROW_ELEMENTS[nodeName]) {
                    if (row.length > 0) {
                        result.push(row);
                        row = [];
                    }
                    parse(current, result);
                    continue;
                }
                // content
                if (nodeType === ELEMENT) {
                    content = current.innerText;
                    style = $.extend(true, style, getStyle(current));
                } else if (nodeType === TEXT) {
                    content = current.data;
                }
                if (!content) {
                    continue;
                }
                if (!row.length) {
                    row.push({
                        content: ""
                    });
                }
                currentCol = row[row.length - 1];
                currentCol.content += content;
            }
            if (row.length > 0) {
                row[0].style = $.extend(true, getStyle(node), style);
                result.push(row);
            }
        }
        function parseTable(tableNode, result) {
            var caption = tableNode.caption;
            var rows = tableNode.rows;
            var cells;
            var tableRow;
            var rowStyle;
            if (caption) {
                result.push(caption.innerText);
            }
            for (var i = 0, len = rows.length; i < len; i++) {
                rowStyle = getStyle(rows[i]);
                cells = rows[i].cells;
                tableRow = [];
                result.push(tableRow);
                for (var j = 0, jlen = cells.length; j < jlen; j++) {
                    tableRow.push({
                        style: $.extend(true, $._clone(rowStyle), getStyle(cells[j]), getCellContentStyle(cells[j])),
                        // 单元格内部的换行全部剔除
                        content: cells[j].innerText.replace(/\n/g, "")
                    });
                }
            }
        }
        function getCellContentStyle(node) {
            var children = node.children;
            var style = getStyle(node);
            for (var i = 0, len = children.length; i < len; i++) {
                $.extend(true, style, getCellContentStyle(children[i]));
            }
            return style;
        }
        function getStyle(node) {
            var nodeStyle = node.style;
            var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);
            var fontStyle = getFontStyle(nodeStyle, computedStyle);
            var fillStyle = getFillStyle(nodeStyle, computedStyle);
            var alignStyle = getAlignStyle(nodeStyle, computedStyle);
            return {
                fonts: fontStyle,
                fills: fillStyle,
                alignments: alignStyle
            };
        }
        function getFontStyle(nodeStyle, computedStyle) {
            var bold = computedStyle.getPropertyValue("font-weight") !== "normal";
            var italic = computedStyle.getPropertyValue("font-style") !== "normal";
            var underline = computedStyle.getPropertyValue("text-decoration") === "underline";
            var throughline = computedStyle.getPropertyValue("text-decoration") === "line-through";
            var fontStyle = {};
            if (nodeStyle.fontFamily) {
                fontStyle.name = computedStyle.getPropertyValue("font-family").split(",")[0];
            }
            if (nodeStyle.color) {
                fontStyle.color = computedStyle.getPropertyValue("color");
            }
            if (nodeStyle.fontSize) {
                fontStyle.size = parseInt(computedStyle.getPropertyValue("font-size"), 10);
            }
            if (bold) {
                fontStyle.bold = true;
            }
            if (italic) {
                fontStyle.italic = true;
            }
            if (underline) {
                fontStyle.underline = true;
            }
            if (throughline) {
                fontStyle.throughline = true;
            }
            return fontStyle;
        }
        function getFillStyle(nodeStyle, computedStyle) {
            var fillStyle = {};
            var fillColor = computedStyle.getPropertyValue("background-color");
            if (!nodeStyle.backgroundColor) {
                return fillStyle;
            }
            // 忽略带透明通道的颜色
            if (fillColor.indexOf("rgba") === 0) {
                return fillStyle;
            }
            fillColor = fillColor.replace(/\s+/g, "");
            if (fillColor === "white" || fillColor === "#fff" || fillColor === "#ffffff" || fillColor === "rgb(255,255,255)") {
                return fillStyle;
            }
            fillStyle.fill = fillColor;
            return fillStyle;
        }
        function getAlignStyle(nodeStyle, computedStyle) {
            var alignStyle = {};
            var textAlign = computedStyle.getPropertyValue("text-align");
            var verticalAlign = computedStyle.getPropertyValue("vertical-align");
            if (textAlign === "left" || textAlign === "right" || textAlign === "center") {
                alignStyle.horizontal = textAlign;
            }
            if (verticalAlign === "top" || verticalAlign === "bottom" || verticalAlign === "middle") {
                alignStyle.vertical = verticalAlign;
            }
            return alignStyle;
        }
    }
};

//src/system/converter/ignore-elements.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[206] = {
    value: {
        applet: 1,
        area: 1,
        audio: 1,
        base: 1,
        basefont: 1,
        bdi: 1,
        bdo: 1,
        bgsound: 1,
        body: 1,
        button: 1,
        canvas: 1,
        caption: 1,
        center: 1,
        col: 1,
        colgroup: 1,
        command: 1,
        content: 1,
        data: 1,
        datalist: 1,
        dialog: 1,
        element: 1,
        embed: 1,
        footer: 1,
        form: 1,
        frame: 1,
        frameset: 1,
        head: 1,
        header: 1,
        hr: 1,
        html: 1,
        iframe: 1,
        image: 1,
        img: 1,
        input: 1,
        isindex: 1,
        keygen: 1,
        link: 1,
        listing: 1,
        map: 1,
        menu: 1,
        menuitem: 1,
        meta: 1,
        meter: 1,
        multicol: 1,
        noembed: 1,
        noframes: 1,
        noscript: 1,
        object: 1,
        optgroup: 1,
        option: 1,
        param: 1,
        picture: 1,
        progress: 1,
        rtc: 1,
        samp: 1,
        script: 1,
        select: 1,
        shadow: 1,
        source: 1,
        spacer: 1,
        strike: 1,
        style: 1,
        summary: 1,
        template: 1,
        textarea: 1,
        time: 1,
        track: 1,
        video: 1,
        wbr: 1,
        xmp: 1
    }
};

//src/system/converter/out.js
/**
 * @file 转换器，提供HTML to Excel和Excel to HTML功能模块
 * @author hancong03@baiud.com
 */
_p[207] = {
    value: function(require) {
        var NONE = "none";
        return _p.r(0).create("Converter", {
            shadowNode: null,
            base: _p.r(143),
            parse: function(start, end) {
                var cells = [];
                var contents = [];
                var rowCells;
                var rowContents;
                var valueModule = this.getModule("value");
                var styleModule = this.getModule("style");
                var currentContent;
                var currentStyle;
                var tmp;
                for (var i = start.row, limit = end.row; i <= limit; i++) {
                    rowCells = [];
                    rowContents = [];
                    cells.push(rowCells);
                    contents.push(rowContents);
                    for (var j = start.col, index = 0, jlimit = end.col; j <= jlimit; j++, index++) {
                        tmp = valueModule.getFormattedValue(i, j);
                        if (tmp) {
                            currentContent = tmp;
                        }
                        rowContents.push(tmp || "");
                        tmp = getUserStyle(styleModule, i, j);
                        if (tmp) {
                            currentStyle = tmp;
                        }
                        rowCells[index] = {
                            style: currentStyle,
                            content: currentContent
                        };
                    }
                }
                return {
                    html: toTable(cells),
                    string: toString(contents)
                };
            }
        });
        function toTable(cells) {
            var htmls = [];
            for (var i = 0, len = cells.length; i < len; i++) {
                htmls.push(getTableRow(cells[i]));
            }
            return "<table><tbody>" + htmls.join("") + "</tbody></table>";
        }
        function toString(contents) {
            var result = [];
            var rowContents;
            var rowResult;
            for (var i = 0, len = contents.length; i < len; i++) {
                rowResult = [];
                rowContents = contents[i];
                for (var j = 0, jlen = rowContents.length; j < jlen; j++) {
                    rowResult.push(rowContents[j]);
                }
                result.push(rowResult.join("	"));
            }
            return result.join("\n");
        }
        function getTableRow(tableRow) {
            var htmls = [];
            for (var i = 0, len = tableRow.length; i < len; i++) {
                htmls.push(getTableCell(tableRow[i]));
            }
            return "<tr>" + htmls.join("") + "</tr>";
        }
        function getTableCell(cell) {
            if (!cell) {
                return "<td></td>";
            }
            var style = cell.style;
            var content = cell.content || "";
            return '<td style="' + styleToText(style) + '">' + content + "</td>";
        }
        function styleToText(style) {
            if (!style) {
                return "";
            }
            var result = [];
            var fonts = style.fonts;
            var fills = style.fills;
            var aligns = style.alignments;
            if (fonts) {
                result.push(parseFonts(fonts));
            }
            if (fills) {
                result.push(parseFills(fills));
            }
            if (aligns) {
                result.push(parseAlignments(aligns));
            }
            return result.join(";");
        }
        function parseFonts(style) {
            var result = [];
            if (style.color !== NONE) {
                result.push("color: " + style.color);
            }
            if (style.name !== NONE) {
                result.push("font-family: " + style.name);
            }
            if (style.bold === true) {
                result.push("font-weight: bold");
            }
            if (style.italic === true) {
                result.push("font-style: italic");
            }
            if (style.underline === true) {
                result.push("text-decoration: underline");
            }
            if (style.throughline === true) {
                result.push("text-decoration: line-through");
            }
            if (style.size !== NONE) {
                result.push("font-size: " + style.size + "px");
            }
            return result.join(";");
        }
        function parseFills(style) {
            return "background-color:" + style.fill;
        }
        function parseAlignments(style) {
            var result = [];
            if (style.horizontal !== NONE) {
                result.push("text-align: " + style.horizontal);
            }
            if (style.vertical !== NONE) {
                result.push("vertical-align: " + style.vertical);
            }
            return result.join(";");
        }
        function getUserStyle(styleModule, row, col) {
            var result = {};
            var hasFonts = false;
            var hasAlignments = false;
            var hasFills = false;
            var tmp;
            tmp = styleModule.getUserStyle("fonts", row, col);
            if (tmp) {
                hasFonts = true;
                result.fonts = tmp;
            }
            tmp = styleModule.getUserStyle("alignments", row, col);
            if (tmp) {
                hasAlignments = true;
                result.alignments = tmp;
            }
            tmp = styleModule.getUserStyle("fills", row, col);
            if (tmp) {
                hasFills = true;
                result.fills = tmp;
            }
            if (hasFonts || hasAlignments || hasFills) {
                return result;
            }
            return null;
        }
    }
};

//src/system/converter/plaintext.js
/**
 * @file 转换器，提供HTML to Excel和Excel to HTML功能模块
 * @author hancong03@baiud.com
 */
_p[208] = {
    value: function(require) {
        return _p.r(0).create("Converter", {
            base: _p.r(143),
            fromPlaintext: function(content) {
                var data = [];
                var rowData;
                var rows = content.split("\n");
                var cells;
                for (var i = 0, len = rows.length; i < len; i++) {
                    cells = rows[i].split("	");
                    rowData = [];
                    data.push(rowData);
                    for (var j = 0, jlen = cells.length; j < jlen; j++) {
                        rowData.push({
                            content: cells[i]
                        });
                    }
                }
                return data;
            }
        });
    }
};

//src/system/converter/row-elements.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[209] = {
    value: {
        address: 1,
        article: 1,
        aside: 1,
        audio: 1,
        blockquote: 1,
        canvas: 1,
        dd: 1,
        div: 1,
        dl: 1,
        fieldset: 1,
        figcaption: 1,
        figure: 1,
        figcaption: 1,
        footer: 1,
        form: 1,
        h1: 1,
        h2: 1,
        h3: 1,
        h4: 1,
        h5: 1,
        h6: 1,
        header: 1,
        hgroup: 1,
        hr: 1,
        main: 1,
        nav: 1,
        noscript: 1,
        ol: 1,
        output: 1,
        p: 1,
        pre: 1,
        section: 1,
        table: 1,
        tfoot: 1,
        ul: 1,
        video: 1,
        li: 1
    }
};

//src/system/cover/cover.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[210] = {
    value: function(require) {
        var $ = _p.r(2);
        var Cover = _p.r(0).create("Cover", {
            position: null,
            panel: null,
            doc: null,
            timer: null,
            celleventTimer: null,
            leavePoint: null,
            lastIndex: null,
            lastPoint: null,
            state: false,
            queue: {
                mousedown: [],
                mousemove: [],
                mouseup: [],
                dblclick: [],
                mouseleave: [],
                cellenter: [],
                cellleave: []
            },
            base: _p.r(146),
            init: function(position) {
                this.position = position;
                this.doc = this.getDocument();
                this.panel = this.createPanel();
                this.initEvent();
                this.initMessageHook();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.refresh
                });
            },
            refresh: function() {
                var _self = this;
                if (this.celleventTimer) {
                    clearTimeout(this.celleventTimer);
                }
                if (this.lastIndex) {
                    this.emit("cellleave", this.lastIndex.row, this.lastIndex.col);
                    this.lastIndex = null;
                }
                this.celleventTimer = setTimeout(function() {
                    _self.update();
                    this.celleventTimer = null;
                }, 500);
            },
            update: function() {
                if (!this.lastPoint) {
                    return;
                }
                var index = this.position.toIndex(this.lastPoint.x, this.lastPoint.y);
                this.emit("cellenter", index.row, index.col);
                this.lastIndex = index;
            },
            initEvent: function() {
                var position = this.position;
                var _self = this;
                var time;
                var lastTime = -1;
                $(this.panel).on("mousedown dblclick", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    _self.lastPoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    time = Date.now();
                    if (evt.type !== "dblclick") {
                        if (time - lastTime < 300) {
                            return;
                        }
                        _self.state = true;
                    }
                    lastTime = time;
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.emit(evt.type, index.row, index.col);
                }).on("mouseup", function(evt) {
                    _self.lastPoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    if (!_self.state) {
                        return;
                    }
                    _self.state = false;
                    evt.stopPropagation();
                    evt.preventDefault();
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.emit(evt.type, index.row, index.col);
                }).on("mousemove", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.lastPoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    if (!_self.lastIndex) {
                        _self.lastIndex = index;
                        _self.emit("cellenter", index.row, index.col);
                    } else if (_self.lastIndex.row !== index.row || _self.lastIndex.col !== index.col) {
                        _self.emit("cellleave", _self.lastIndex.row, _self.lastIndex.col);
                        _self.emit("cellenter", index.row, index.col);
                        _self.lastIndex = index;
                    }
                    if (!_self.state) {
                        return;
                    }
                    _self.emit(evt.type, index.row, index.col);
                }).on("mouseleave", function(evt) {
                    var index = position.toIndex(evt.clientX, evt.clientY);
                    _self.lastPoint = null;
                    if (_self.lastIndex) {
                        _self.emit("cellleave", _self.lastIndex.row, _self.lastIndex.col);
                        _self.lastIndex = null;
                    }
                    if (!_self.state) {
                        return;
                    }
                    evt.stopPropagation();
                    evt.preventDefault();
                    var direction = position.getDirection(evt.clientX, evt.clientY);
                    if (!direction) {
                        return;
                    }
                    _self.startLeave();
                    _self.leavePoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    _self.emit(evt.type, direction, index.row, index.col);
                }).on("mouseenter", function(evt) {
                    _self.lastPoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    _self.endLeave();
                });
            },
            startLeave: function() {
                var _self = this;
                var position = this.position;
                $(this.doc).on("mousemove.btableleave", function(evt) {
                    if (evt.which === 0) {
                        _self.endLeave();
                        _self.stop();
                        return;
                    }
                    _self.leavePoint = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                }).on("mouseup.btableleave", function() {
                    _self.endLeave();
                    _self.stop();
                });
                this.timer = setInterval(function() {
                    var x = _self.leavePoint.x;
                    var y = _self.leavePoint.y;
                    var direction = position.getDirection(x, y);
                    var index = position.toIndex(x, y);
                    _self.emit("mouseleave", direction, index.row, index.col);
                }, 50);
            },
            endLeave: function() {
                this.leavePoint = null;
                $(this.doc).off("mousemove.btableleave mouseup.btableleave");
                if (this.timer !== null) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
            getLeaveIndex: function() {
                return this.position.toIndex(this.leavePoint.x, this.leavePoint.y);
            },
            stop: function() {
                this.state = false;
                this.emit("mouseup");
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
            onmouseleave: function(provider, handler) {
                this.queue.mouseleave.push({
                    provider: provider,
                    handler: handler
                });
            },
            oncellenter: function(provider, handler) {
                this.queue.cellenter.push({
                    provider: provider,
                    handler: handler
                });
            },
            oncellleave: function(provider, handler) {
                this.queue.cellleave.push({
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
_p[211] = {
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
_p[212] = {
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
_p[213] = {
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

//src/system/input/input.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[214] = {
    value: function(require) {
        var InputWorker = _p.r(220);
        var Input = _p.r(0).create("Input", {
            coverModule: null,
            eventManager: null,
            inputWorker: null,
            base: _p.r(146),
            init: function(coverModule, selectionModule) {
                this.coverModule = coverModule;
                this.inputWorker = this.createComponent(InputWorker, selectionModule);
                this.initEvent();
            },
            initEvent: function() {
                this.coverModule.onmousedown(this, this.onmousedown);
                this.coverModule.ondblclick(this, this.ondblclick);
            },
            onmousedown: function(r, c) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                this.rs("c.range.focus", grid.rowMap[r], grid.colMap[c]);
            },
            ondblclick: function() {
                this.inputWorker.toActive();
            }
        });
        Input.deps = [ "cover", "selection" ];
        return Input;
    }
};

//src/system/input/resize.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[215] = {
    value: function(require) {
        var HORIZONTAL_BUFFER_SIZE = 30;
        // 输入框空白区域大小：2px的边框+2px的padding
        var SPACE_SIZE = (2 + 2) * 2;
        var LINE_WIDTH = _p.r(14).border.width;
        return {
            resize: function() {
                if (!this.resizable) {
                    return;
                }
                this.sizePanel.style.width = "";
                this.sizePanel.innerHTML = this.inputNode.innerHTML;
                var rect = this.rect;
                var contentRect = this.sizePanel.getBoundingClientRect();
                var newWidth = rect.width;
                var newHeight = rect.height;
                var overflow;
                if (contentRect.width + SPACE_SIZE + HORIZONTAL_BUFFER_SIZE >= rect.width) {
                    newWidth = this.calculateNewWidth(rect, contentRect);
                    // update panel
                    this.sizePanel.style.width = newWidth - SPACE_SIZE + "px";
                    contentRect = this.sizePanel.getBoundingClientRect();
                }
                if (contentRect.height + SPACE_SIZE >= rect.height) {
                    newHeight = this.calculateNewHeight(rect, contentRect);
                    overflow = newHeight.overflow;
                    newHeight = newHeight.height;
                }
                if (newHeight === rect.height && newWidth === rect.width) {
                    if (overflow) {
                        this.inputNode.style.overflowY = "scroll";
                    }
                    return;
                }
                this.rect.width = newWidth;
                this.rect.height = newHeight;
                this.$wrapNode.css({
                    width: newWidth,
                    height: newHeight
                });
            },
            calculateNewWidth: function(rect, contentRect) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var boundary = struct.getBoundary();
                var activeCol = grid.cMap[this.activeCell.col];
                var viewWidths = grid.viewWidth;
                // 所需最小空间
                var minWidth = contentRect.width + SPACE_SIZE;
                // 检查是否有溢出
                if (minWidth + rect.x >= boundary.width) {
                    // 最大宽度
                    return boundary.width - rect.x;
                }
                var nextCol = activeCol;
                var newWidth = viewWidths[activeCol] + 2 * LINE_WIDTH;
                while (true) {
                    nextCol++;
                    // 没有后续单元格可用
                    if (grid.colMap[nextCol] === undefined) {
                        return boundary.width - rect.x;
                    }
                    newWidth += viewWidths[nextCol] + LINE_WIDTH;
                    if (newWidth > minWidth) {
                        break;
                    }
                }
                // 检查新宽度是否超出边界
                if (newWidth + SPACE_SIZE + rect.x >= boundary.width) {
                    // 最大宽度
                    return boundary.width - rect.x;
                }
                return newWidth;
            },
            calculateNewHeight: function(rect, contentRect) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var boundary = struct.getBoundary();
                var activeRow = grid.rMap[this.activeCell.row];
                var viewHeights = grid.viewHeight;
                // 所需最小空间
                var minHeight = contentRect.height + SPACE_SIZE;
                // 检查是否有溢出
                if (minHeight + rect.y >= boundary.height) {
                    // 最大宽度
                    return {
                        overflow: true,
                        height: boundary.height - rect.y
                    };
                }
                var nextRow = activeRow;
                var newHeight = viewHeights[activeRow] + 2 * LINE_WIDTH;
                while (true) {
                    nextRow++;
                    // 没有后续单元格可用
                    if (grid.rowMap[nextRow] === undefined) {
                        return {
                            overflow: true,
                            height: boundary.height - rect.y
                        };
                    }
                    newHeight += viewHeights[nextRow] + LINE_WIDTH;
                    if (newHeight > minHeight) {
                        break;
                    }
                }
                // 检查新宽度是否超出边界
                if (newHeight + SPACE_SIZE + rect.y >= boundary.height) {
                    // 最大宽度
                    return {
                        overflow: true,
                        height: boundary.height - rect.y
                    };
                }
                return {
                    overflow: false,
                    height: newHeight
                };
            }
        };
    }
};

//src/system/input/text-helper.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[216] = {
    value: {
        newline: function() {
            var selection = this.selectionObj;
            var placeholder = this.placeholderNode.cloneNode(false);
            var range = this.__getRange(selection);
            range = range.cloneRange();
            range.deleteContents();
            range.insertNode(placeholder);
            range.insertNode(this.createElement("br"));
            range.selectNode(placeholder);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            this.inputNode.scrollTop = 1e8;
        },
        focusToEnd: function() {
            var selection = this.selectionObj;
            var range = this.__getRange(selection);
            range = range.cloneRange();
            range.selectNodeContents(this.inputNode);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            this.inputNode.scrollTop = 1e8;
        },
        getContent: function() {
            return this.inputNode.innerText.replace(/\uFEFF/g, "");
        },
        __insertText: function(text) {
            var selection = this.selectionObj;
            var range = this.__getRange(selection);
            var textNode = this.doc.createTextNode(text);
            range = range.cloneRange();
            range.deleteContents();
            range.insertNode(textNode);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            this.inputNode.scrollTop = 1e8;
        },
        __getRange: function(selection) {
            if (selection.rangeCount !== 0) {
                return selection.getRangeAt(0);
            } else {
                return selection.createRange();
            }
        }
    }
};

//src/system/input/util.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[217] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var LINE_WIDTH = SYS_CONFIG.border.width;
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        var Util = {
            getMergeCellVisibleRect: function(struct, mergeInfo) {
                return getPaneSelectionRect(struct, mergeInfo.start, mergeInfo.end);
            },
            getSelectionRect: function(struct, start, end) {
                var startRow = Math.min(start.row, end.row);
                var startCol = Math.min(start.col, end.col);
                var endRow = Math.max(start.row, end.row);
                var endCol = Math.max(start.col, end.col);
                var mergeInfo;
                // top
                for (var i = startCol; i <= endCol; i++) {
                    mergeInfo = struct.getMergeCell(startRow, i);
                    if (!mergeInfo || mergeInfo.start.row >= startRow) {
                        continue;
                    }
                    return Util.getSelectionRect(struct, {
                        row: mergeInfo.start.row,
                        col: startCol
                    }, {
                        row: endRow,
                        col: endCol
                    });
                }
                // bottom
                for (var i = startCol; i <= endCol; i++) {
                    mergeInfo = struct.getMergeCell(endRow, i);
                    if (!mergeInfo || mergeInfo.end.row <= endRow) {
                        continue;
                    }
                    return Util.getSelectionRect(struct, {
                        row: startRow,
                        col: startCol
                    }, {
                        row: mergeInfo.end.row,
                        col: endCol
                    });
                }
                // left
                for (var i = startRow; i <= endRow; i++) {
                    mergeInfo = struct.getMergeCell(i, startCol);
                    if (!mergeInfo || mergeInfo.start.col >= startCol) {
                        continue;
                    }
                    return Util.getSelectionRect(struct, {
                        row: startRow,
                        col: mergeInfo.start.col
                    }, {
                        row: endRow,
                        col: endCol
                    });
                }
                // right
                for (var i = startRow; i <= endRow; i++) {
                    mergeInfo = struct.getMergeCell(i, endCol);
                    if (!mergeInfo || mergeInfo.end.col <= endCol) {
                        continue;
                    }
                    return Util.getSelectionRect(struct, {
                        row: startRow,
                        col: startCol
                    }, {
                        row: endRow,
                        col: mergeInfo.end.col
                    });
                }
                var pane = struct.getPane();
                if (pane.row !== -1 || pane.col !== -1) {
                    return getPaneSelectionRect(struct, {
                        row: startRow,
                        col: startCol
                    }, {
                        row: endRow,
                        col: endCol
                    });
                }
                return this.getRect(struct, {
                    row: startRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: endCol
                });
            },
            getRect: function(struct, start, end) {
                var regionStartRow = start.row;
                var regionStartCol = start.col;
                var regionEndRow = end.row;
                var regionEndCol = end.col;
                var viewStart = struct.getViewStart();
                var viewEnd = struct.getViewEnd();
                var startRow = viewStart.row;
                var startCol = viewStart.col;
                var endRow = viewEnd.row;
                var endCol = viewEnd.col;
                if (regionStartRow > endRow || regionEndRow < startRow) {
                    return null;
                }
                if (regionStartCol > endCol || regionEndCol < startCol) {
                    return null;
                }
                var result = {
                    borderTopStyle: "solid",
                    borderLeftStyle: "solid",
                    borderRightStyle: "solid",
                    borderBottomStyle: "solid",
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                if (regionStartRow >= startRow) {
                    startRow = regionStartRow;
                } else {
                    result.borderTopStyle = "none";
                }
                if (regionEndRow <= endRow) {
                    endRow = regionEndRow;
                } else {
                    result.borderBottomStyle = "none";
                }
                if (regionStartCol >= startCol) {
                    startCol = regionStartCol;
                } else {
                    result.borderLeftStyle = "none";
                }
                if (regionEndCol <= endCol) {
                    endCol = regionEndCol;
                } else {
                    result.borderRightStyle = "none";
                }
                var widthInfo = getWidthInfo(struct, startCol, endCol);
                var heightInfo = getHeightInfo(struct, startRow, endRow);
                result.x = widthInfo.x;
                result.left = widthInfo.x;
                result.width = widthInfo.width;
                result.y = heightInfo.y;
                result.top = heightInfo.y;
                result.height = heightInfo.height;
                return result;
            }
        };
        function getPaneSelectionRect(struct, start, end) {
            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;
            var grid = struct.getGrid();
            var viewHeight = grid.viewHeight;
            var viewWidth = grid.viewWidth;
            var viewColPoints = grid.viewColPoints;
            var viewRowPoints = grid.viewRowPoints;
            var rMap = grid.rMap;
            var cMap = grid.cMap;
            var rowMap = grid.rowMap;
            var colMap = grid.colMap;
            var result = {
                borderTopStyle: "solid",
                borderLeftStyle: "solid",
                borderRightStyle: "solid",
                borderBottomStyle: "solid",
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                width: 0,
                height: 0
            };
            var firstRow = rowMap[0];
            var firstCol = colMap[0];
            var lastRow = rowMap[rowMap.length - 1];
            var lastCol = colMap[colMap.length - 1];
            if (startRow > lastRow) {
                return null;
            }
            if (endRow < firstRow) {
                return null;
            }
            if (startCol > lastCol) {
                return null;
            }
            if (endCol < firstCol) {
                return null;
            }
            var width = -1;
            var height = -1;
            var xIsSet = false;
            var yIsSet = false;
            var r;
            var c;
            for (var i = startRow; i <= endRow; i++) {
                r = rMap[i];
                if (r === undefined) {
                    continue;
                }
                if (!yIsSet) {
                    yIsSet = true;
                    result.y = viewRowPoints[r] - LINE_OFFSET;
                }
                height += viewHeight[r] + LINE_WIDTH;
            }
            if (height === -1) {
                return null;
            }
            for (var i = startCol; i <= endCol; i++) {
                c = cMap[i];
                if (c === undefined) {
                    continue;
                }
                if (!xIsSet) {
                    xIsSet = true;
                    result.x = viewColPoints[c] - LINE_OFFSET;
                }
                width += viewWidth[c] + LINE_WIDTH;
            }
            if (width === -1) {
                return null;
            }
            result.top = result.y;
            result.left = result.x;
            result.width = width + 2 * LINE_WIDTH;
            result.height = height + 2 * LINE_WIDTH;
            if (startRow < firstRow || startRow > lastRow) {
                result.borderTopStyle = "none";
            }
            if (endRow < firstRow || endRow > lastRow) {
                result.borderBottomStyle = "none";
            }
            if (startCol < firstCol || startCol > lastCol) {
                result.borderLeftStyle = "none";
            }
            if (endCol < firstCol || endCol > lastCol) {
                result.borderRightStyle = "none";
            }
            return result;
        }
        function getWidthInfo(struct, startCol, endCol) {
            var grid = struct.getGrid();
            var cMap = grid.cMap;
            var viewColPoints = grid.viewColPoints;
            startCol = cMap[startCol];
            endCol = cMap[endCol];
            return {
                x: viewColPoints[startCol] - LINE_OFFSET,
                width: viewColPoints[endCol + 1] - viewColPoints[startCol] + LINE_WIDTH
            };
        }
        function getHeightInfo(struct, startRow, endRow) {
            var grid = struct.getGrid();
            var rMap = grid.rMap;
            var viewRowPoints = grid.viewRowPoints;
            startRow = rMap[startRow];
            endRow = rMap[endRow];
            return {
                y: viewRowPoints[startRow] - LINE_OFFSET,
                height: viewRowPoints[endRow + 1] - viewRowPoints[startRow] + LINE_WIDTH
            };
        }
        return Util;
    }
};

//src/system/input/view.js
/**
 * @file 输入框的视图控制，用以保障输入框时钟在视线内
 * @author hancong03@baiud.com
 */
_p[218] = {
    value: {
        checkView: function() {
            var struct = this.rs("c.struct");
            var grid = struct.getGrid();
            var rowMap = grid.rowMap;
            var colMap = grid.colMap;
            var activeCell = this.activeCell;
            var row = activeCell.row;
            var col = activeCell.col;
            var mergeInfo = struct.getMergeCell(row, col);
            var space = struct.getSpace();
            var width;
            var height;
            var viewState = {};
            if (!mergeInfo) {
                if (row < rowMap[0]) {
                    viewState.rowTo = row;
                } else if (row >= rowMap[rowMap.length - 1]) {
                    viewState.rowToEnd = row;
                } else {
                    viewState.row = 0;
                }
                if (col < colMap[0]) {
                    viewState.columnTo = col;
                } else if (col >= colMap[colMap.length - 1]) {
                    viewState.columnToEnd = col;
                } else {
                    viewState.column = 0;
                }
            } else {
                row = mergeInfo.start.row;
                col = mergeInfo.start.col;
                if (row < rowMap[0]) {
                    viewState.rowTo = row;
                } else if (row >= rowMap[rowMap.length - 1]) {
                    height = this.cs("c.rows.height", struct, mergeInfo.start.row, mergeInfo.end.row);
                    if (height > space.height) {
                        viewState.rowTo = mergeInfo.start.row;
                    } else {
                        viewState.rowToEnd = mergeInfo.end.row;
                    }
                } else {
                    viewState.row = 0;
                }
                if (col < colMap[0]) {
                    viewState.columnTo = col;
                } else if (col >= colMap[colMap.length - 1]) {
                    width = this.cs("c.columns.width", struct, mergeInfo.start.col, mergeInfo.end.col);
                    if (width > space.width) {
                        viewState.columnTo = mergeInfo.start.col;
                    } else {
                        viewState.columnToEnd = mergeInfo.end.col;
                    }
                } else {
                    viewState.column = 0;
                }
            }
            this.execCommand("updateview", viewState);
            // 强制重定位
            var range = this.rs("c.range");
            var focus = range.getFocus();
            this.resetInput(focus.row, focus.col, true);
        }
    }
};

//src/system/input/worker-control.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[219] = {
    value: {
        keyEnter: function(evt) {
            evt.preventDefault();
            // 可编辑模式
            if (!this.rs("c.is.readonly")) {
                if (evt.metaKey || evt.altKey) {
                    if (this.writeModel) {
                        this.newline();
                        this.resize();
                        return;
                    }
                }
                // 切换进入编辑状态
                if (!this.writeModel) {
                    this.shortcutWriteModel = false;
                    this.__toActive();
                    return;
                }
                // 退出编辑状态
                this.write();
                this.toInactive();
            }
            if (!evt.shiftKey) {
                this.execCommand("movedown", 1);
            } else {
                this.execCommand("moveup", 1);
            }
        },
        keyLeft: function(evt) {
            if (this.writeModel && !this.shortcutWriteModel) {
                return;
            }
            evt.preventDefault();
            if (!evt.shiftKey) {
                this.execCommand("moveleft", 1);
            } else {
                this.execCommand("expandleft", 1);
            }
        },
        keyRight: function(evt) {
            if (this.writeModel && !this.shortcutWriteModel) {
                return;
            }
            evt.preventDefault();
            if (!evt.shiftKey) {
                this.execCommand("moveright", 1);
            } else {
                this.execCommand("expandright", 1);
            }
        },
        keyUp: function(evt) {
            if (this.writeModel && !this.shortcutWriteModel) {
                return;
            }
            evt.preventDefault();
            if (!evt.shiftKey) {
                this.execCommand("moveup", 1);
            } else {
                this.execCommand("expandup", 1);
            }
        },
        keyDown: function(evt) {
            if (this.writeModel && !this.shortcutWriteModel) {
                return;
            }
            evt.preventDefault();
            if (!evt.shiftKey) {
                this.execCommand("movedown", 1);
            } else {
                this.execCommand("expanddown", 1);
            }
        },
        keyTab: function(evt) {
            evt.preventDefault();
            if (!evt.shiftKey) {
                this.execCommand("moveright", 1);
            } else {
                this.execCommand("moveleft", 1);
            }
        },
        keyEsc: function(evt) {
            evt.preventDefault();
            if (!this.writeModel) {
                return;
            }
            this.toInactive();
        },
        keyDelete: function(evt) {
            if (this.writeModel) {
                return;
            }
            evt.preventDefault();
            this.execCommand("clearcontent");
        }
    }
};

//src/system/input/worker.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[220] = {
    value: function(require) {
        var $ = _p.r(2);
        var SYS_CONFIG = _p.r(14);
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        var LINE_WIDTH = SYS_CONFIG.border.width;
        var KEY_CODE = _p.r(213);
        var CANDIDATE_FONT = SYS_CONFIG.CANDIDATE_FONT;
        var Util = _p.r(217);
        return _p.r(0).create("InputWorker", $.extend({
            inputNode: null,
            $inputNode: null,
            wrapNode: null,
            $wrapNode: null,
            sizePanel: null,
            $sizePanel: null,
            inputBox: null,
            labelNode: null,
            $labelNode: null,
            selectionObj: null,
            doc: null,
            placeholderNode: null,
            timer: null,
            selectionModule: null,
            // ------- state property start
            writeModel: false,
            // 快捷输入模式
            shortcutWriteModel: true,
            contentchanged: false,
            resizable: true,
            failedState: false,
            labelVisible: false,
            // ------- state property end
            // ------- data record start
            rect: null,
            activeCell: null,
            // ------- data record end
            base: _p.r(143),
            init: function(selectionModule) {
                this.doc = this.getDocument();
                this.selectionModule = selectionModule;
                this.placeholderNode = this.doc.createTextNode("﻿");
                this.selectionObj = this.doc.defaultView.getSelection();
                this.wrapNode = this.__createWrapNode();
                this.$wrapNode = $(this.wrapNode);
                this.inputBox = this.__createInputBox();
                this.labelNode = this.__createLabelNode();
                this.$labelNode = $(this.labelNode);
                this.inputNode = this.__createInput();
                this.$inputNode = $(this.inputNode);
                this.sizePanel = this.__createSizepanel();
                this.$sizePanel = $(this.sizePanel);
                this.wrapNode.appendChild(this.labelNode);
                this.wrapNode.appendChild(this.inputBox);
                this.inputBox.appendChild(this.inputNode);
                this.getContentContainer().appendChild(this.wrapNode);
                this.getContentContainer().appendChild(this.sizePanel);
                this.initEvent();
                this.initService();
                this.initMessageHook();
                this.clearInput();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.range.change": this.rangeChange,
                    "c.refresh": this.change,
                    "c.view.change": this.viewChange
                });
            },
            initService: function() {
                this.registerService({
                    "s.input.inserttext": this.insertText
                });
            },
            initEvent: function() {
                var _self = this;
                this.$inputNode.on("blur", function() {
                    _self.toDisableWriteModel();
                    _self.write();
                    _self.toInactive();
                }).on("input", function() {
                    _self.selectionModule.stop();
                    _self.contentchanged = true;
                    if (!_self.writeModel) {
                        _self.__toActive(false);
                    }
                    _self.resize();
                }).on("keydown", function(evt) {
                    if (!_self.writeModel && (evt.ctrlKey || evt.metaKey) && evt.keyCode === 65) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        _self.execCommand("selectall");
                        return;
                    }
                    evt.stopPropagation();
                    switch (evt.keyCode) {
                      case KEY_CODE.ENTER:
                        _self.keyEnter(evt);
                        break;

                      case KEY_CODE.LEFT:
                        _self.keyLeft(evt);
                        break;

                      case KEY_CODE.RIGHT:
                        _self.keyRight(evt);
                        break;

                      case KEY_CODE.UP:
                        _self.keyUp(evt);
                        break;

                      case KEY_CODE.DOWN:
                        _self.keyDown(evt);
                        break;

                      case KEY_CODE.TAB:
                        _self.keyTab(evt);
                        break;

                      case KEY_CODE.ESC:
                        _self.keyEsc(evt);
                        break;

                      case KEY_CODE.DELETE:
                      case KEY_CODE.BACKSPACE:
                        _self.keyDelete(evt);
                        break;
                    }
                }).on("mousedown contextmenu mousewheel DOMMouseScroll", function(evt) {
                    evt.stopPropagation();
                });
                this.$wrapNode.on("mousedown", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                $(this.getMainContainer()).on("contextmenu", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            },
            rangeChange: function() {
                this.write();
                this.toInactive();
                this.change();
            },
            change: function() {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    this.disable();
                    return;
                }
                if (!range.isWritable()) {
                    this.addFailedState();
                } else {
                    this.focus();
                }
                var focus = range.getFocus();
                this.resetInput(focus.row, focus.col);
            },
            // 该接口只允许用户触发的双击操作调用
            toActive: function() {
                if (this.rs("c.is.readonly")) {
                    return;
                }
                this.shortcutWriteModel = false;
                this.__toActive();
            },
            insertText: function(text) {
                if (!this.writeModel) {
                    return;
                }
                this.contentchanged = true;
                this.__insertText(text);
                this.resize();
            },
            __toActive: function(isResetCotnent) {
                if (this.writeModel) {
                    return;
                }
                var range = this.rs("c.range");
                var focus = range.getFocus();
                this.writeModel = true;
                this.activeCell = {
                    row: focus.row,
                    col: focus.col
                };
                this.$wrapNode.addClass("btb-input-active");
                this.updateStyle();
                if (isResetCotnent !== false) {
                    this.resetContent();
                }
                this.postMessage("s.input.active");
                // 检查输入框是否在完整的视图内
                this.checkView();
                // 主动检查大小
                this.resize();
            },
            toInactive: function() {
                var range = this.rs("c.range");
                if (range.isWritable()) {
                    this.removeFailedState();
                }
                if (!this.writeModel) {
                    return;
                }
                this.activeCell = null;
                this.writeModel = false;
                this.shortcutWriteModel = true;
                this.$wrapNode.removeClass("btb-input-active");
                this.clearInput();
                this.contentchanged = false;
                this.resetLabel();
                this.postMessage("s.input.inactive");
                if (!range.isValid()) {
                    this.hide();
                    return;
                }
                var focus = range.getFocus();
                this.resetInput(focus.row, focus.col);
            },
            toDisableWriteModel: function() {
                this.rs("c.range.disable");
            },
            addFailedState: function() {
                if (this.failedState) {
                    return;
                }
                this.failedState = true;
                this.$wrapNode.addClass("btb-input-failed");
                this.selectionModule.addFailedState();
            },
            removeFailedState: function() {
                if (!this.failedState) {
                    return;
                }
                this.failedState = false;
                this.$wrapNode.removeClass("btb-input-failed");
                this.selectionModule.removeFailedState();
            },
            write: function() {
                if (!this.contentchanged) {
                    return false;
                }
                this.contentchanged = false;
                var content = this.getContent();
                this.execCommand("write", content, this.activeCell.row, this.activeCell.col);
            },
            updateStyle: function() {
                var struct = this.rs("c.struct");
                var activeCell = this.activeCell;
                var fontStyle = struct.getRawStyle("fonts", activeCell.row, activeCell.col);
                var fillStyle = struct.getRawStyle("fills", activeCell.row, activeCell.col);
                var alignmentStyle = struct.getRawStyle("alignments", activeCell.row, activeCell.col);
                var styles = {
                    fontFamily: fontStyle.name + "," + CANDIDATE_FONT,
                    fontSize: fontStyle.size + "px",
                    color: fontStyle.color,
                    fontStyle: fontStyle.italic ? "italic" : "normal",
                    fontWeight: fontStyle.bold ? "bold" : "normal",
                    background: fillStyle.fill,
                    textAlign: alignmentStyle.horizontal
                };
                this.$inputNode.css(styles);
                this.$sizePanel.css(styles);
            },
            resetContent: function() {
                var struct = this.rs("c.struct");
                var activeCell = this.activeCell;
                var content = struct.getStandardValue(activeCell.row, activeCell.col);
                if (!content) {
                    return;
                }
                this.inputNode.innerHTML = content;
                this.resize();
                this.focusToEnd();
            },
            viewChange: function() {
                if (!this.writeModel || this.labelVisible) {
                    return;
                }
                var range = this.rs("c.range");
                var focus = range.getFocus();
                this.labelVisible = true;
                this.labelNode.innerHTML = this.cs("c.title.index2char", focus.col) + (focus.row + 1);
                this.$labelNode.show();
            },
            resetLabel: function() {
                if (!this.labelVisible) {
                    return;
                }
                this.labelVisible = false;
                this.$labelNode.hide();
            },
            clearInput: function() {
                this.$inputNode.html("&#xFEFF;");
            },
            enable: function() {
                this.show();
            },
            disable: function() {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.hide();
                this.inputNode.blur();
            },
            show: function() {
                this.$wrapNode.css("display", "");
            },
            hide: function() {
                // 输入模式，不允许隐藏
                if (this.writeModel) {
                    return;
                }
                this.$wrapNode.css({
                    top: -1e4,
                    left: -1e4
                });
            },
            focus: function() {
                var _self = this;
                var inputNode = this.inputNode;
                var timer = this.timer;
                if (timer !== null) {
                    clearTimeout(timer);
                }
                this.timer = setTimeout(function() {
                    inputNode.focus();
                    _self.timer = null;
                }, 50);
            },
            resetInput: function(row, col, force) {
                // 输入模式，定位不变
                if (this.writeModel && !force) {
                    return;
                }
                var struct = this.rs("c.struct");
                var mergeInfo = struct.getMergeCell(row, col);
                var grid = struct.getGrid();
                var r;
                var c;
                if (mergeInfo) {
                    this.resizable = false;
                    this.__resetMergeCellInput(mergeInfo);
                } else {
                    r = grid.rMap[row];
                    c = grid.cMap[col];
                    if (r === undefined || c === undefined) {
                        this.hide();
                    } else {
                        this.resizable = true;
                        this.__resetNormalInput(r, c);
                    }
                }
            },
            __resetMergeCellInput: function(mergeInfo) {
                var struct = this.rs("c.struct");
                var rect = Util.getMergeCellVisibleRect(struct, mergeInfo);
                if (!rect) {
                    this.hide();
                    return;
                }
                this.$wrapNode.css(rect);
                this.rect = rect;
            },
            __resetNormalInput: function(r, c) {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var x = grid.viewColPoints[c] - LINE_OFFSET;
                var y = grid.viewRowPoints[r] - LINE_OFFSET;
                var w = grid.viewWidth[c] + LINE_WIDTH * 2;
                var h = grid.viewHeight[r] + LINE_WIDTH * 2;
                this.wrapNode.style.cssText = "";
                this.$wrapNode.css({
                    top: y,
                    left: x,
                    width: w,
                    height: h
                });
                this.rect = {
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
            },
            __createInput: function() {
                return this.createElement("div", {
                    attr: {
                        "class": "btb-s-input",
                        contenteditable: true,
                        spellcheck: false
                    }
                });
            },
            __createWrapNode: function() {
                return this.createElement("div", "btb-s-input-wrap");
            },
            __createInputBox: function() {
                return this.createElement("div", "btb-s-input-box");
            },
            __createLabelNode: function() {
                return this.createElement("div", "btb-s-input-label");
            },
            __createSizepanel: function() {
                return this.createElement("div", "btb-s-input-size-panel");
            }
        }, _p.r(219), _p.r(215), _p.r(216), _p.r(218)));
    }
};

//src/system/position.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[221] = {
    value: function(require) {
        return _p.r(0).create("Position", {
            reference: null,
            base: _p.r(146),
            init: function() {
                this.reference = this.getContentContainer();
            },
            toIndex: function(x, y) {
                var location = this.getLocation();
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var count = struct.getVisibleCount();
                var colPoint = grid.viewColPoints;
                var rowPoint = grid.viewRowPoints;
                var index = {
                    row: -1,
                    col: -1
                };
                var finded = false;
                x -= location.left;
                y -= location.top;
                for (var i = 1, len = rowPoint.length; i <= len; i++) {
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
                for (var i = 1, len = colPoint.length; i <= len; i++) {
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
            getDirection: function(x, y) {
                var location = this.getLocation();
                var isRight = false;
                var isLeft = false;
                var isTop = false;
                var isBottom = false;
                if (location.right <= x) {
                    isRight = true;
                }
                if (location.bottom <= y) {
                    isBottom = true;
                }
                if (location.top >= y) {
                    isTop = true;
                }
                if (location.left >= x) {
                    isLeft = true;
                }
                if (isRight && isBottom) {
                    return "right-bottom";
                }
                if (isRight && isTop) {
                    return "right-top";
                }
                if (isLeft && isTop) {
                    return "left-top";
                }
                if (isLeft && isBottom) {
                    return "left-bottom";
                }
                if (isRight) {
                    return "right";
                }
                if (isBottom) {
                    return "bottom";
                }
                if (isLeft) {
                    return "left";
                }
                if (isTop) {
                    return "top";
                }
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
_p[222] = {
    value: function(require) {
        var $ = _p.r(2);
        // 单元格最小size
        var BUTTON_SIZE = 5;
        // TODO 所有按钮的位置更新可以做延迟优化
        return _p.r(0).create("Resize", {
            base: _p.r(146),
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
                var headConfig = this.getSystemConfig("head");
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
                    "c.refresh": this.cleanState
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
            cleanState: function() {
                this.columnState = false;
                this.rowState = false;
            },
            startResizeColumn: function(btnNode, x, y) {
                var _self = this;
                var $btnNode = $(btnNode);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var colPoints = grid.col;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var index = +btnNode.getAttribute("data-index");
                var max = struct.getSpace().width - BUTTON_SIZE - borderWidth;
                var min = colPoints[0] + offset - 3;
                var headOffset = this.getSystemConfig("head").width;
                var colMap = grid.colMap;
                var original = colPoints[index + 1] - offset - 2;
                var value;
                var hasMove = false;
                // 最终单元格的位置
                var left;
                $btnNode.addClass("btb-resizing");
                $(this.getDocument()).on("mousemove.resize", function(evt) {
                    var distance = evt.clientX - x;
                    hasMove = true;
                    left = original + distance;
                    left = Math.min(left, max);
                    left = Math.max(left, min);
                    $btnNode.css("left", headOffset + left);
                }).one("mouseup.resize", function() {
                    $btnNode.removeClass("btb-resizing");
                    $(this).off("mousemove.resize");
                    if (!hasMove) {
                        return;
                    }
                    value = left - (colPoints[index] - offset - 2);
                    if (value < 0) {
                        value = 0;
                    }
                    _self.execCommand("resizecol", value, colMap[index]);
                });
            },
            startResizeRow: function(btnNode, x, y) {
                var _self = this;
                var $btnNode = $(btnNode);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var rowPoints = grid.viewRowPoints;
                var offset = struct.getOffset();
                var borderWidth = struct.getBorderWidth();
                var index = +btnNode.getAttribute("data-index");
                var max = struct.getSpace().height - BUTTON_SIZE - borderWidth;
                var min = rowPoints[index] + offset - 3;
                var headOffset = this.getSystemConfig("head").height;
                var rowMap = grid.rowMap;
                var original = rowPoints[index + 1] - offset - 2;
                // 最终单元格的位置
                var top;
                var value;
                var hasMove = false;
                $btnNode.addClass("btb-resizing");
                $(this.getDocument()).on("mousemove.resize", function(evt) {
                    var distance = evt.clientY - y;
                    hasMove = true;
                    top = original + distance;
                    top = Math.min(top, max);
                    top = Math.max(top, min);
                    $btnNode.css("top", headOffset + top);
                }).one("mouseup.resize", function() {
                    $btnNode.removeClass("btb-resizing");
                    $(this).off("mousemove.resize");
                    if (!hasMove) {
                        return;
                    }
                    value = top - (rowPoints[index] - offset - 2);
                    if (value < 0) {
                        value = 0;
                    }
                    _self.execCommand("resizerow", value, rowMap[index]);
                });
            },
            updateColResizeBtn: function() {
                if (this.columnState) {
                    return;
                }
                this.columnState = true;
                var headConfig = this.getSystemConfig("head");
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var offset = struct.getOffset();
                var colPoints = grid.viewColPoints;
                var btns = this.getColBtns(visibleCount.col);
                for (var i = 0, len = visibleCount.col; i < len; i++) {
                    btns[i].style.left = headConfig.width + colPoints[i + 1] - 2 - offset + "px";
                }
            },
            getColBtns: function(count) {
                var newBtn;
                var btns = this.colBtns;
                var wrapper = this.wrapper;
                if (btns.length < count) {
                    for (var i = 0, len = count - btns.length; i < len; i++) {
                        newBtn = this.templateColumnNode.cloneNode(true);
                        btns.push(newBtn);
                        wrapper.appendChild(newBtn);
                        newBtn.setAttribute("data-index", btns.length - 1);
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
                var headConfig = this.getSystemConfig("head");
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var offset = struct.getOffset();
                var rowPoints = grid.viewRowPoints;
                var btns = this.getRowBtns(visibleCount.row);
                for (var i = 1, len = visibleCount.row; i < len; i++) {
                    btns[i - 1].style.top = headConfig.height + rowPoints[i] - 2 - offset + "px";
                }
            },
            getRowBtns: function(count) {
                var newBtn;
                var btns = this.rowBtns;
                var wrapper = this.wrapper;
                if (btns.length < count) {
                    for (var i = 0, len = count - btns.length; i < len; i++) {
                        newBtn = this.templateRowNode.cloneNode(true);
                        btns.push(newBtn);
                        wrapper.appendChild(newBtn);
                        newBtn.setAttribute("data-index", btns.length - 1);
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
_p[223] = {
    value: function(require) {
        var $ = _p.r(2);
        var RowColumnSelector = _p.r(0).create("RowColumnSelector", {
            position: null,
            base: _p.r(146),
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
                var grid = struct.getGrid();
                this.execCommand("selectcolumn", grid.colMap[index.col]);
            },
            selectRow: function(y) {
                var index = this.position.toIndex(0, y);
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                this.execCommand("selectrow", grid.rowMap[index.row]);
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
_p[224] = {
    value: function(require) {
        var Canvas = _p.r(236);
        var Painter = _p.r(230);
        return _p.r(0).create("BodyScreen", {
            panel: null,
            width: 0,
            height: 0,
            canvas: null,
            visiableCanvas: null,
            base: _p.r(143),
            init: function() {
                this.panel = this.createElement("div", "btb-body-screen");
                this.canvas = new Canvas(this.getDocument(), this.width, this.height);
                this.visiableCanvas = new Canvas(this.getDocument(), this.width, this.height);
                this.contentCanvas = new Canvas(this.getDocument(), this.width, this.height);
            },
            appendTo: function(contianer) {
                contianer.appendChild(this.panel);
            },
            resize: function(width, height) {
                this.width = width;
                this.height = height;
                this.canvas.resize(width, height, this.getSystemConfig("ZOOM"));
                this.visiableCanvas.resize(width, height, this.getSystemConfig("ZOOM"));
                this.contentCanvas.resize(width, height, this.getSystemConfig("ZOOM"));
            },
            clear: function() {
                this.canvas.clear();
                this.visiableCanvas.clear();
                this.contentCanvas.clear();
            },
            render: function() {
                var struct = this.rs("c.struct");
                Painter.draw(this.canvas, this.contentCanvas, struct);
                this.__toggle();
            },
            __toggle: function() {
                this.visiableCanvas.remove();
                this.canvas.appendTo(this.panel);
                var tmp = this.visiableCanvas;
                this.visiableCanvas = this.canvas;
                this.canvas = tmp;
            }
        });
    }
};

//src/system/screen/body/cell-grid.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[225] = {
    value: function() {
        return {
            generate: function(struct) {
                var cells = getCells(struct);
                var contents = getContents(struct, cells);
                return {
                    layout: getLayout(struct, cells, contents),
                    cells: cells
                };
            }
        };
        function getCells(struct) {
            var viewStart = struct.getViewStart();
            var viewEnd = struct.getViewEnd();
            var mergeCell;
            var mergeMap = {};
            var cells = [];
            var index;
            var currentRow = [];
            for (var i = viewStart.row, limit = viewEnd.row; i <= limit; i++) {
                currentRow = [];
                cells.push(currentRow);
                for (var j = viewStart.col, jlimit = viewEnd.col; j <= jlimit; j++) {
                    mergeCell = struct.getMergeCell(i, j);
                    if (mergeCell) {
                        index = mergeCell.start.row + "," + mergeCell.start.col;
                        if (mergeMap[index]) {
                            currentRow.push({
                                type: "cellunit"
                            });
                            continue;
                        }
                        mergeMap[index] = true;
                        currentRow.push({
                            type: "mergecell",
                            row: i,
                            col: j,
                            mergeCell: mergeCell,
                            userStyle: struct.getUserStyle(mergeCell.start.row, mergeCell.start.col)
                        });
                    } else {
                        currentRow.push({
                            type: "cell",
                            row: i,
                            col: j,
                            userStyle: struct.getUserStyle(i, j)
                        });
                    }
                }
            }
            return cells;
        }
        function getContents(struct, cells) {
            var contents = [];
            var rowCells;
            var cell;
            var rowContents;
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                rowContents = [];
                contents.push(rowContents);
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    cell = rowCells[j];
                    if (cell.type === "cellunit") {
                        continue;
                    }
                    if (cell.userStyle.wraptext) {
                        if (cell.type === "mergecell") {
                            rowContents[j] = struct.getDisplayWrapText(cell.mergeCell.start.row, cell.mergeCell.start.col);
                        } else {
                            rowContents[j] = struct.getDisplayWrapText(cell.row, cell.col);
                        }
                    } else {
                        if (cell.type === "mergecell") {
                            rowContents[j] = struct.getDisplayValue(cell.mergeCell.start.row, cell.mergeCell.start.col, false);
                        } else {
                            rowContents[j] = struct.getDisplayValue(cell.row, cell.col, false);
                        }
                    }
                }
            }
            return contents;
        }
        function getLayout(struct, cells, contents) {
            var layout = [];
            var rowCells;
            var rowContents;
            var cell;
            var count;
            var content;
            var rowLayout;
            var prevCell;
            var style;
            for (var i = 0, len = cells.length; i < len; i++) {
                rowCells = cells[i];
                rowContents = contents[i];
                count = 0;
                rowLayout = [];
                layout[i] = rowLayout;
                prevCell = null;
                for (var j = 0, jlen = rowCells.length; j < jlen; j++) {
                    cell = rowCells[j];
                    content = rowContents[j];
                    if (cell.type === "cell") {
                        if (!content) {
                            count++;
                        } else {
                            if (prevCell && prevCell.type === "cell") {
                                prevCell.right = count;
                            }
                            style = struct.getComputedStyle(cell.row, cell.col);
                            prevCell = {
                                type: "cell",
                                wraptext: !!style.wraptext,
                                left: count,
                                row: cell.row,
                                col: cell.col,
                                content: content,
                                style: style
                            };
                            count = 0;
                            rowLayout.push(prevCell);
                        }
                    } else {
                        if (prevCell && prevCell.type === "cell") {
                            prevCell.right = count;
                            prevCell = null;
                        }
                        count = 0;
                        if (cell.type === "cellunit") {
                            continue;
                        } else {
                            // 合并后的单元格，没有内容也需要获取其格式
                            rowLayout.push({
                                type: "mergecell",
                                row: cell.row,
                                col: cell.col,
                                mergeCell: cell.mergeCell,
                                content: content,
                                style: struct.getComputedStyle(cell.mergeCell.start.row, cell.mergeCell.start.col)
                            });
                        }
                    }
                    if (prevCell && prevCell.type === "cell") {
                        prevCell.right = count;
                    }
                }
            }
            return layout;
        }
    }
};

//src/system/screen/body/line-painters/border.js
/**
 * @file 边框绘制
 * @author hancong03@baiud.com
 */
_p[226] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var CANVAS_COLOR = SYS_CONFIG.canvas.background;
        var BORDER_OFFSET = SYS_CONFIG.border.offset;
        var BORDER_WIDTH = SYS_CONFIG.border.width;
        var DOUBLE_BORDER_WIDTH = 2 * BORDER_WIDTH;
        var NONE = _p.r(126);
        var BORDER_TYPE_SPACE = {
            thin: 0,
            dashed: [ 5, 3 ],
            dotted: [ 1, 1 ]
        };
        return {
            draw: function(canvas, struct, regions, overflowBorders) {
                var region;
                if (regions.length === 1) {
                    render(canvas, struct, regions[0], overflowBorders[0]);
                    return;
                }
                for (var i = 0, len = regions.length; i < len; i++) {
                    region = regions[i];
                    canvas.save();
                    canvas.beginPath();
                    canvas.rect(region.x, region.y, region.width, region.height);
                    canvas.clip();
                    render(canvas, struct, region, overflowBorders[i]);
                    canvas.restore();
                }
            }
        };
        function render(canvas, struct, region, overflowRecord) {
            var grid = struct.getGrid();
            var rowMap = grid.rowMap;
            var colMap = grid.colMap;
            var borders = [];
            var currentBorder;
            var row;
            var col;
            for (var i = region.startRow, limit = region.endRow; i <= limit; i++) {
                row = rowMap[i];
                if (row === undefined) {
                    continue;
                }
                for (var j = region.startCol, jlimit = region.endCol; j <= jlimit; j++) {
                    col = colMap[j];
                    if (col === undefined) {
                        continue;
                    }
                    currentBorder = struct.getBorder(row, col);
                    if (!currentBorder) {
                        continue;
                    }
                    borders.push({
                        r: i,
                        c: j,
                        row: row,
                        col: col,
                        border: currentBorder
                    });
                }
            }
            drawBorders(canvas, struct, borders, overflowRecord);
        }
        function drawBorders(canvas, struct, borders, overflowRecord) {
            var current;
            var mergeInfo;
            for (var i = 0, len = borders.length; i < len; i++) {
                current = borders[i];
                mergeInfo = struct.getMergeCell(current.row, current.col);
                if (mergeInfo) {
                    drawMergeCellBorder(canvas, struct, current, mergeInfo);
                } else {
                    drawBorder(canvas, struct, current.border, current.r, current.c, overflowRecord);
                }
            }
        }
        function drawBorder(canvas, struct, borderIndex, rowIndex, colIndex, overflowRecord) {
            var borderOption = struct.getStyleById("borders", borderIndex).border;
            var grid = struct.getGrid();
            var width = grid.viewWidth[colIndex] + DOUBLE_BORDER_WIDTH;
            var height = grid.viewHeight[rowIndex] + DOUBLE_BORDER_WIDTH;
            var x;
            var y;
            if (borderOption.top !== NONE) {
                x = grid.viewColPoints[colIndex];
                y = grid.viewRowPoints[rowIndex];
                __drawHBorder(canvas, borderOption.top, x, y, width);
            }
            // 右边框要注意溢出
            if (borderOption.right !== NONE && !overflowRecord[rowIndex + "," + (colIndex + 1)]) {
                x = grid.viewColPoints[colIndex + 1];
                y = grid.viewRowPoints[rowIndex];
                __drawVBorder(canvas, borderOption.right, x, y, height);
            }
            // 左边框要注意溢出
            if (borderOption.left !== NONE && !overflowRecord[rowIndex + "," + colIndex]) {
                x = grid.viewColPoints[colIndex];
                y = grid.viewRowPoints[rowIndex];
                __drawVBorder(canvas, borderOption.left, x, y, height);
            }
            if (borderOption.bottom !== NONE) {
                x = grid.viewColPoints[colIndex];
                y = grid.viewRowPoints[rowIndex + 1];
                __drawHBorder(canvas, borderOption.bottom, x, y, width);
            }
        }
        function drawMergeCellBorder(canvas, struct, current, mergeInfo) {
            var r = current.r;
            var c = current.c;
            var row = current.row;
            var col = current.col;
            var borderOption = struct.getStyleById("borders", current.border).border;
            var grid = struct.getGrid();
            var width = grid.viewWidth[c] + DOUBLE_BORDER_WIDTH;
            var height = grid.viewHeight[r] + DOUBLE_BORDER_WIDTH;
            var x;
            var y;
            var mergeStartRow = mergeInfo.start.row;
            var mergeStartCol = mergeInfo.start.col;
            var mergeEndRow = mergeInfo.end.row;
            var mergeEndCol = mergeInfo.end.col;
            if (row === mergeStartRow && borderOption.top !== NONE) {
                x = grid.viewColPoints[c];
                y = grid.viewRowPoints[r];
                __drawHBorder(canvas, borderOption.top, x, y, width);
            }
            if (col === mergeEndCol && borderOption.right !== NONE) {
                x = grid.viewColPoints[c + 1];
                y = grid.viewRowPoints[r];
                __drawVBorder(canvas, borderOption.right, x, y, height);
            }
            if (col === mergeStartCol && borderOption.left !== NONE) {
                x = grid.viewColPoints[c];
                y = grid.viewRowPoints[r];
                __drawVBorder(canvas, borderOption.left, x, y, height);
            }
            if (row === mergeEndRow && borderOption.bottom !== NONE) {
                x = grid.viewColPoints[c];
                y = grid.viewRowPoints[r + 1];
                __drawHBorder(canvas, borderOption.bottom, x, y, width);
            }
        }
        function __drawHBorder(canvas, borderStyle, x, y, width) {
            x -= BORDER_OFFSET;
            var space = BORDER_TYPE_SPACE[borderStyle.style];
            if (space === 0) {
                drawThinLine();
            } else {
                drawSpaceLine();
            }
            function drawThinLine() {
                canvas.strokeStyle(borderStyle.color);
                canvas.beginPath();
                canvas.moveTo(x, y);
                canvas.lineTo(x + width, y);
                canvas.stroke();
            }
            function drawSpaceLine() {
                var inc = 0;
                canvas.strokeStyle(CANVAS_COLOR);
                canvas.beginPath();
                canvas.moveTo(x, y);
                canvas.lineTo(x + width, y);
                canvas.stroke();
                canvas.strokeStyle(borderStyle.color);
                canvas.beginPath();
                while (true) {
                    if (inc >= width) {
                        break;
                    }
                    canvas.moveTo(inc + x, y);
                    inc += space[0];
                    canvas.lineTo(Math.min(inc, width) + x, y);
                    inc += space[1];
                }
                canvas.stroke();
            }
        }
        function __drawVBorder(canvas, borderStyle, x, y, height) {
            y -= BORDER_OFFSET;
            var space = BORDER_TYPE_SPACE[borderStyle.style];
            if (space === 0) {
                drawThinLine();
            } else {
                drawSpaceLine();
            }
            function drawThinLine() {
                canvas.strokeStyle(borderStyle.color);
                canvas.beginPath();
                canvas.moveTo(x, y);
                canvas.lineTo(x, y + height);
                canvas.stroke();
            }
            function drawSpaceLine() {
                var inc = 0;
                canvas.strokeStyle(CANVAS_COLOR);
                canvas.beginPath();
                canvas.moveTo(x, y);
                canvas.lineTo(x, y + height);
                canvas.stroke();
                canvas.strokeStyle(borderStyle.color);
                canvas.beginPath();
                while (true) {
                    if (inc >= height) {
                        break;
                    }
                    canvas.moveTo(x, y + inc);
                    inc += space[0];
                    canvas.lineTo(x, y + Math.min(inc, height));
                    inc += space[1];
                }
                canvas.stroke();
            }
        }
    }
};

//src/system/screen/body/line-painters/box.js
/**
 * @file 整个内容空间框线绘制
 * @author hancong03@baiud.com
 */
_p[227] = {
    value: function(require) {
        var BORDER_CONFIG = _p.r(14).border;
        return {
            draw: function(canvas, struct) {
                var offset = BORDER_CONFIG.offset;
                var boundary = struct.getBoundary();
                var space = struct.getSpace();
                canvas.save();
                canvas.strokeStyle(BORDER_CONFIG.color);
                canvas.lineWidth(BORDER_CONFIG.width);
                canvas.beginPath();
                // left
                canvas.moveTo(offset, 0);
                canvas.lineTo(offset, boundary.height);
                // top
                canvas.moveTo(0, offset);
                canvas.lineTo(boundary.width, offset);
                // bottom
                canvas.moveTo(0, space.height - offset);
                canvas.lineTo(space.width, space.height - offset);
                // right
                canvas.moveTo(space.width - offset, 0);
                canvas.lineTo(space.width - offset, space.height);
                canvas.stroke();
                canvas.restore();
            }
        };
    }
};

//src/system/screen/body/line-painters/grid.js
/**
 * @file 网格绘制
 * @author hancong03@baiud.com
 */
_p[228] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var CANVAS_FILL_COLOR = SYS_CONFIG.canvas.background;
        var BORDER_COLOR = SYS_CONFIG.border.color;
        return {
            draw: function(canvas, struct) {
                canvas.save();
                canvas.globalCompositeOperation("destination-over");
                var grid = struct.getGrid();
                var colPoints = grid.viewColPoints;
                var rowPoints = grid.viewRowPoints;
                var boundary = struct.getBoundary();
                canvas.lineWidth(1);
                canvas.strokeStyle(BORDER_COLOR);
                canvas.beginPath();
                for (var i = 0, len = colPoints.length; i < len; i++) {
                    canvas.moveTo(colPoints[i], 0);
                    canvas.lineTo(colPoints[i], boundary.height);
                }
                for (var i = 0, len = rowPoints.length; i < len; i++) {
                    canvas.moveTo(0, rowPoints[i]);
                    canvas.lineTo(boundary.width, rowPoints[i]);
                }
                canvas.stroke();
                canvas.fillStyle(CANVAS_FILL_COLOR);
                canvas.fillRect(0, 0, boundary.width, boundary.height);
                canvas.restore();
            }
        };
    }
};

//src/system/screen/body/line-painters/pane-line.js
/**
 * @file 网格绘制
 * @author hancong03@baiud.com
 */
_p[229] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        var PANE_LINE_COLOR = SYS_CONFIG.PANE_LINE_COLOR;
        return {
            draw: function(canvas, struct) {
                var pane = struct.getPane();
                if (pane.rowIndex === -1 && pane.colIndex === -1) {
                    return;
                }
                var grid = struct.getGrid();
                var boundary = struct.getBoundary();
                var spaceOffset = grid.spaceOffset;
                var x;
                var y;
                canvas.save();
                canvas.beginPath();
                canvas.strokeStyle(PANE_LINE_COLOR);
                if (pane.row !== -1) {
                    y = spaceOffset.row + LINE_OFFSET;
                    canvas.moveTo(0, y);
                    canvas.lineTo(boundary.width, y);
                }
                if (pane.col !== -1) {
                    x = spaceOffset.col + LINE_OFFSET;
                    canvas.moveTo(x, 0);
                    canvas.lineTo(x, boundary.height);
                }
                canvas.stroke();
                canvas.restore();
            }
        };
    }
};

//src/system/screen/body/painter.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[230] = {
    value: function(require) {
        var ContentFillPainter = _p.r(233);
        var ContentPainter = _p.r(234);
        var MergeFillPainter = _p.r(235);
        var CellFillPainter = _p.r(231);
        var Commentspainter = _p.r(232);
        var GridPainter = _p.r(228);
        var BorderPainter = _p.r(226);
        var BoxPainter = _p.r(227);
        var PaneLinePainter = _p.r(229);
        return {
            draw: function(canvas, contentCanvas, struct) {
                var layout = ContentPainter.draw(contentCanvas, struct);
                var regions = layout.regions;
                var contentLayout = layout.layout;
                var overflowBorders = layout.overflow;
                Commentspainter.draw(contentCanvas, canvas, struct);
                ContentFillPainter.draw(canvas, contentLayout);
                CellFillPainter.draw(canvas, struct, regions);
                BorderPainter.draw(canvas, struct, regions, overflowBorders);
                GridPainter.draw(canvas, struct);
                MergeFillPainter.draw(canvas, struct, regions);
                canvas.drawImage(contentCanvas.getImage(), 0, 0, canvas.width, canvas.height);
                BoxPainter.draw(canvas, struct);
                PaneLinePainter.draw(canvas, struct);
            }
        };
    }
};

//src/system/screen/body/painters/cell-fill.js
/**
 * @file¬
 * @author hancong03@baiud.com
 */
_p[231] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var BORDER_OFFSET = SYS_CONFIG.border.offset;
        var BORDER_WIDTH = SYS_CONFIG.border.width;
        var DOUBLE_BORDER_WIDTH = 2 * BORDER_WIDTH;
        var LINE_WIDTH = SYS_CONFIG.border.width;
        var Util = _p.r(240);
        var NONE = _p.r(126);
        return {
            draw: function(canvas, struct, regions) {
                var region;
                if (regions.length === 1) {
                    render(canvas, struct, regions[0]);
                    return;
                }
                for (var i = 0, len = regions.length; i < len; i++) {
                    region = regions[i];
                    canvas.save();
                    canvas.beginPath();
                    canvas.rect(region.x, region.y, region.width, region.height);
                    canvas.clip();
                    render(canvas, struct, region);
                    canvas.restore();
                }
            }
        };
        function render(canvas, struct, region) {
            //fillMergeCell(canvas, struct, region);
            var fillLayout = getFillLayout(struct, region);
            var rowLayout;
            for (var i = 0, len = fillLayout.length; i < len; i++) {
                rowLayout = fillLayout[i];
                for (var j = 0, jlen = rowLayout.length; j < jlen; j++) {
                    fillCell(canvas, struct, rowLayout[j]);
                }
            }
        }
        function fillMergeCell(canvas, struct, region) {
            var mergeInfo = getMergeCellInfo(struct, region);
            var currentInfo;
            for (var i = 0, len = mergeInfo.length; i < len; i++) {
                currentInfo = mergeInfo[i];
                canvas.fillStyle(currentInfo.fillColor);
                canvas.fillRect(currentInfo.x, currentInfo.y, currentInfo.width, currentInfo.height);
            }
        }
        function getMergeCellInfo(struct, region) {
            var result = [];
            var mergeInfo;
            var mergeRecord = {};
            var mergeKey;
            var fillStyle;
            var mergeStart;
            var mergeEnd;
            var grid = struct.getGrid();
            var row;
            var col;
            var rect;
            for (var i = region.startRow, limit = region.endRow; i <= limit; i++) {
                row = grid.rowMap[i];
                for (var j = region.startCol, jlimit = region.endCol; j <= jlimit; j++) {
                    col = grid.colMap[j];
                    mergeInfo = struct.getMergeCell(row, col);
                    if (!mergeInfo) {
                        continue;
                    }
                    mergeStart = mergeInfo.start;
                    mergeEnd = mergeInfo.end;
                    mergeKey = mergeStart.row + "," + mergeStart.col;
                    if (mergeRecord[mergeKey]) {
                        continue;
                    }
                    mergeRecord[mergeKey] = true;
                    rect = Util.getMergeCellRect(struct, i, j, mergeInfo);
                    fillStyle = struct.getComputedStyle("fills", mergeStart.row, mergeStart.col);
                    if (!fillStyle || fillStyle.fill === NONE) {
                        continue;
                    } else {
                        rect.fillColor = fillStyle.fill;
                        rect.x -= LINE_WIDTH;
                        rect.y -= LINE_WIDTH;
                        rect.width += DOUBLE_BORDER_WIDTH;
                        rect.height += DOUBLE_BORDER_WIDTH;
                        result.push(rect);
                    }
                }
            }
            return result;
        }
        function fillCell(canvas, struct, current) {
            var fillColor = struct.getStyleById("fills", current.fillId).fill;
            if (fillColor === NONE) {
                return;
            }
            canvas.fillStyle(fillColor);
            canvas.fillRect(current.x, current.y, current.w, current.h);
        }
        function getFillLayout(struct, region) {
            var grid = struct.getGrid();
            var rows = grid.viewRowPoints;
            var cols = grid.viewColPoints;
            var widthList = grid.viewWidth;
            var heightList = grid.viewHeight;
            var fills = [];
            var rowFills;
            var nextIndex;
            var currentIndex;
            var prevInfo;
            var rowIndex = 0;
            var colIndex;
            var fillIds = struct.getStyleIds("fills", {
                row: grid.rowMap[region.startRow],
                col: grid.colMap[region.startCol]
            }, {
                row: grid.rowMap[region.endRow],
                col: grid.colMap[region.endCol]
            });
            for (var i = region.startRow, limit = region.endRow; i <= limit; i++, rowIndex++) {
                rowFills = [];
                nextIndex = -1;
                colIndex = 0;
                for (var j = region.startCol, jlimit = region.endCol; j <= jlimit; j++, colIndex++) {
                    currentIndex = fillIds[rowIndex][colIndex];
                    if (!currentIndex) {
                        nextIndex = -1;
                        continue;
                    }
                    if (nextIndex === currentIndex) {
                        prevInfo = rowFills[rowFills.length - 1];
                        prevInfo.w += widthList[j] + BORDER_WIDTH;
                    } else {
                        rowFills.push({
                            x: cols[j] - BORDER_OFFSET,
                            y: rows[i] - BORDER_OFFSET,
                            w: widthList[j] + DOUBLE_BORDER_WIDTH,
                            h: heightList[i] + DOUBLE_BORDER_WIDTH,
                            fillId: currentIndex
                        });
                    }
                    nextIndex = currentIndex;
                }
                fills.push(rowFills);
            }
            return fills;
        }
    }
};

//src/system/screen/body/painters/comments.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[232] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        var IMAGE_WIDTH = 7;
        return {
            draw: function(canvas, shadowCanvas, struct) {
                var commentsSet = struct.getCommentsInView();
                var grid = struct.getGrid();
                var viewRowPoints = grid.viewRowPoints;
                var viewColPoints = grid.viewColPoints;
                var rMap = grid.rMap;
                var cMap = grid.cMap;
                var image;
                var current;
                var mergeCell;
                var row;
                var col;
                var r;
                var c;
                for (var key in commentsSet) {
                    if (!commentsSet.hasOwnProperty(key)) {
                        continue;
                    }
                    current = commentsSet[key];
                    row = current.row;
                    col = current.col;
                    mergeCell = struct.getMergeCell(row, col);
                    if (mergeCell) {
                        row = mergeCell.end.row;
                        col = mergeCell.end.col;
                    }
                    r = rMap[row];
                    c = cMap[col];
                    if (r === undefined || c === undefined) {
                        continue;
                    }
                    if (!image) {
                        image = getImage(shadowCanvas);
                    }
                    canvas.putImageData(image, viewColPoints[c + 1] - LINE_OFFSET - IMAGE_WIDTH, viewRowPoints[r] + LINE_OFFSET);
                }
                shadowCanvas.clear();
            }
        };
        function getImage(canvas) {
            canvas.save();
            canvas.beginPath();
            canvas.moveTo(0, 0);
            canvas.lineTo(IMAGE_WIDTH, 0);
            canvas.lineTo(IMAGE_WIDTH, IMAGE_WIDTH);
            canvas.closePath();
            canvas.fillStyle(SYS_CONFIG.COMMENTS_ICON_COLOR);
            canvas.fill();
            canvas.restore();
            return canvas.getImageData(0, 0, IMAGE_WIDTH, IMAGE_WIDTH);
        }
    }
};

//src/system/screen/body/painters/content-fill.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[233] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var CANVAS_COLOR = SYS_CONFIG.canvas.background;
        var CONTENT_PADDING = SYS_CONFIG.CONTENT_PADDING;
        var DOUBLE_CONTENT_PADDING = 2 * CONTENT_PADDING;
        return {
            draw: function(canvas, contentLayout) {
                canvas.fillStyle(CANVAS_COLOR);
                for (var i = 0, len = contentLayout.length; i < len; i++) {
                    render(canvas, contentLayout[i]);
                }
            }
        };
        function render(canvas, layout) {
            var currentLayout;
            var cellLayout;
            var x;
            var y;
            var width;
            var height;
            for (var key in layout) {
                currentLayout = layout[key];
                for (var i = 0, len = currentLayout.length; i < len; i++) {
                    cellLayout = currentLayout[i];
                    x = cellLayout.regionX - CONTENT_PADDING;
                    y = cellLayout.regionY - CONTENT_PADDING;
                    width = cellLayout.regionWidth + DOUBLE_CONTENT_PADDING;
                    height = cellLayout.regionHeight + DOUBLE_CONTENT_PADDING;
                    canvas.fillRect(x, y, width, height);
                }
            }
        }
    }
};

//src/system/screen/body/painters/content.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[234] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        var LINE_WIDTH = SYS_CONFIG.border.width;
        var CONTENT_PADDING = SYS_CONFIG.CONTENT_PADDING;
        var DOUBLE_CONTENT_PADDING = 2 * CONTENT_PADDING;
        var LINE_HEIHGT = SYS_CONFIG.LINE_HEIGHT;
        var Util = _p.r(240);
        return {
            draw: function(canvas, struct) {
                var cellInfo = getFullCellInfo(struct);
                var regions = cellInfo.regions;
                var layout = cellInfo.layout;
                var overflow = [];
                var region;
                var result;
                cellInfo.overflow = overflow;
                if (regions.length === 1) {
                    result = renderCell(canvas, struct, layout[0]);
                    cellInfo.layout[0] = result.layout;
                    cellInfo.overflow[0] = result.overflow;
                    return cellInfo;
                }
                for (var i = 0, len = regions.length; i < len; i++) {
                    region = regions[i];
                    canvas.save();
                    canvas.beginPath();
                    canvas.rect(region.x, region.y, region.width, region.height);
                    canvas.clip();
                    result = renderCell(canvas, struct, layout[i]);
                    cellInfo.layout[i] = result.layout;
                    cellInfo.overflow[i] = result.overflow;
                    canvas.restore();
                }
                return cellInfo;
            }
        };
        function getFullCellInfo(struct) {
            var pane = struct.getPane();
            var viewStart = struct.getViewStart();
            var startRow = viewStart.row;
            var startCol = viewStart.col;
            var visibleCount = struct.getVisibleCount();
            if (pane.row === -1 && pane.col === -1) {
                return getFullView(struct, visibleCount);
            }
            if (pane.row !== -1 && pane.col === -1) {
                return drawTop(struct, pane, visibleCount);
            }
            if (pane.row === -1 && pane.col !== -1) {
                return drawLeft(struct, pane, visibleCount);
            }
            if (startCol === 0) {
                return drawTop(struct, pane, visibleCount);
            }
            if (startRow === 0) {
                return drawLeft(struct, pane, visibleCount);
            }
            return drawFullPane(struct, pane, visibleCount);
        }
        function getFullView(struct, visibleCount) {
            var boundary = struct.getBoundary();
            var startRow = 0;
            var startCol = 0;
            var endRow = visibleCount.row - 1;
            var endCol = visibleCount.col - 1;
            var fullCellInfo = {
                regions: [],
                layout: []
            };
            // top
            fullCellInfo.layout.push(getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            }));
            fullCellInfo.regions.push({
                startRow: startRow,
                startCol: startCol,
                endRow: endRow,
                endCol: endCol,
                x: 0,
                y: 0,
                width: boundary.width,
                height: boundary.height
            });
            return fullCellInfo;
        }
        function drawFullPane(struct, pane, visibleCount) {
            var regions = [];
            var layout = [];
            var result = [];
            result.push(drawTopLeft(struct, pane));
            result.push(drawTopRight(struct, pane, visibleCount));
            result.push(drawBottomLeft(struct, pane, visibleCount));
            result.push(drawBottomRight(struct, pane, visibleCount));
            for (var i = 0, len = result.length; i < len; i++) {
                regions.push(result[i].region);
                layout.push(result[i].layout);
            }
            return {
                regions: regions,
                layout: layout
            };
        }
        function renderCell(canvas, struct, cellInfo) {
            var result = getLayout(canvas, struct, cellInfo);
            var layout = result.layout;
            var layoutGroup;
            var currentLayout;
            var fontStyle;
            for (var key in layout) {
                if (!layout.hasOwnProperty(key)) {
                    continue;
                }
                layoutGroup = layout[key];
                fontStyle = layoutGroup[0].font;
                canvas.fillStyle(fontStyle.color);
                canvas.strokeStyle(fontStyle.color);
                canvas.setFontStyle(fontStyle);
                for (var i = 0, len = layoutGroup.length; i < len; i++) {
                    currentLayout = layoutGroup[i];
                    canvas.save();
                    canvas.beginPath();
                    canvas.rect(currentLayout.regionX, currentLayout.regionY, currentLayout.regionWidth, currentLayout.regionHeight);
                    canvas.clip();
                    drawContent(canvas, currentLayout);
                    canvas.restore();
                }
            }
            return result;
        }
        function drawTop(struct, pane, visibleCount) {
            var grid = struct.getGrid();
            var spaceOffset = grid.spaceOffset;
            var boundary = struct.getBoundary();
            var startRow = 0;
            var startCol = 0;
            var endRow = pane.row;
            var endCol = visibleCount.col - 1;
            var fullCellInfo = {
                regions: [],
                layout: []
            };
            // top
            fullCellInfo.layout.push(getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            }));
            fullCellInfo.regions.push({
                startRow: startRow,
                startCol: startCol,
                endRow: endRow,
                endCol: endCol,
                x: 0,
                y: 0,
                width: boundary.width,
                height: spaceOffset.row
            });
            /* ------- 活动区域 --------- */
            startRow = pane.row + 1;
            startCol = 0;
            endRow = visibleCount.row - 1;
            endCol = visibleCount.col - 1;
            // bottom
            fullCellInfo.layout.push(getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            }));
            fullCellInfo.regions.push({
                startRow: startRow,
                startCol: startCol,
                endRow: endRow,
                endCol: endCol,
                x: 0,
                y: spaceOffset.row,
                width: boundary.width,
                height: boundary.height - spaceOffset.row
            });
            return fullCellInfo;
        }
        function drawLeft(struct, pane, visibleCount) {
            var grid = struct.getGrid();
            var spaceOffset = grid.spaceOffset;
            var boundary = struct.getBoundary();
            var fullCellInfo = {
                regions: [],
                layout: []
            };
            var startRow = 0;
            var startCol = 0;
            var endRow = visibleCount.row - 1;
            var endCol = pane.col;
            // left
            fullCellInfo.layout.push(getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            }));
            fullCellInfo.regions.push({
                startRow: startRow,
                startCol: startCol,
                endRow: endRow,
                endCol: endCol,
                x: 0,
                y: 0,
                width: spaceOffset.col,
                height: boundary.height
            });
            /* ------ 活动区域 -------- */
            startRow = 0;
            startCol = pane.col + 1;
            endRow = visibleCount.row - 1;
            endCol = visibleCount.col - 1;
            fullCellInfo.layout.push(getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            }));
            fullCellInfo.regions.push({
                startRow: startRow,
                startCol: startCol,
                endRow: endRow,
                endCol: endCol,
                x: spaceOffset.col,
                y: 0,
                width: boundary.width - spaceOffset.col,
                height: boundary.height
            });
            return fullCellInfo;
        }
        function drawTopLeft(struct, pane) {
            var grid = struct.getGrid();
            var spaceOffset = grid.spaceOffset;
            var startRow = 0;
            var startCol = 0;
            var endRow = pane.row;
            var endCol = pane.col;
            var cellInfo = getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            });
            return {
                layout: cellInfo,
                region: {
                    startRow: startRow,
                    startCol: startCol,
                    endRow: endRow,
                    endCol: endCol,
                    x: 0,
                    y: 0,
                    width: spaceOffset.col,
                    height: spaceOffset.row
                }
            };
        }
        function drawTopRight(struct, pane, visibleCount) {
            var grid = struct.getGrid();
            var boundary = struct.getBoundary();
            var spaceOffset = grid.spaceOffset;
            var cellInfo;
            var startRow = 0;
            var startCol = pane.col + 1;
            var endRow = pane.row;
            var endCol = visibleCount.col - 1;
            cellInfo = getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            });
            return {
                layout: cellInfo,
                region: {
                    startRow: startRow,
                    startCol: startCol,
                    endRow: endRow,
                    endCol: endCol,
                    x: spaceOffset.col,
                    y: 0,
                    width: boundary.width - spaceOffset.col,
                    height: spaceOffset.row
                }
            };
        }
        function drawBottomLeft(struct, pane, visibleCount) {
            var grid = struct.getGrid();
            var boundary = struct.getBoundary();
            var spaceOffset = grid.spaceOffset;
            var cellInfo;
            var startRow = pane.row + 1;
            var startCol = 0;
            var endRow = visibleCount.row - 1;
            var endCol = pane.col;
            cellInfo = getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            });
            return {
                layout: cellInfo,
                region: {
                    startRow: startRow,
                    startCol: startCol,
                    endRow: endRow,
                    endCol: endCol,
                    x: 0,
                    y: spaceOffset.row,
                    width: spaceOffset.col,
                    height: boundary.height - spaceOffset.row
                }
            };
        }
        function drawBottomRight(struct, pane, visibleCount) {
            var grid = struct.getGrid();
            var boundary = struct.getBoundary();
            var spaceOffset = grid.spaceOffset;
            var cellInfo;
            var startRow = pane.row + 1;
            var startCol = pane.col + 1;
            var endRow = visibleCount.row - 1;
            var endCol = visibleCount.col - 1;
            // left
            cellInfo = getCellInfo(struct, {
                r: startRow,
                c: startCol
            }, {
                r: endRow,
                c: endCol
            });
            return {
                layout: cellInfo,
                region: {
                    startRow: startRow,
                    startCol: startCol,
                    endRow: endRow,
                    endCol: endCol,
                    x: spaceOffset.col,
                    y: spaceOffset.row,
                    width: boundary.width - spaceOffset.col,
                    height: boundary.height - spaceOffset.row
                }
            };
        }
        function drawContent(canvas, layout) {
            var contents = layout.content.split("\n");
            var fontStyle = layout.font;
            var fontSize = fontStyle.size;
            var lineHeight = LINE_HEIHGT;
            var height = Math.floor(lineHeight * fontSize);
            canvas.textBaseline("bottom");
            canvas.textAlign(layout.alignment.horizontal);
            var contentHeight = height * contents.length;
            var y = getYPoint(layout.alignment.vertical, layout.regionHeight, contentHeight);
            var contentWidth;
            var hasUnderline = fontStyle.underline;
            var hasThroughline = fontStyle.throughline;
            //y = 0;
            y += layout.regionY;
            for (var i = 0, len = contents.length; i < len; i++) {
                y += height;
                canvas.fillText(contents[i], layout.textX, y);
                if (hasUnderline || hasThroughline) {
                    contentWidth = Math.ceil(canvas.measureText(contents[i]).width);
                    if (fontStyle.underline) {
                        drawTextDecoration(canvas, contentWidth, layout.textX, y, layout.alignment.horizontal, 0);
                    }
                    if (hasThroughline) {
                        drawTextDecoration(canvas, contentWidth, layout.textX, y, layout.alignment.horizontal, -height / 2);
                    }
                }
            }
        }
        function drawTextDecoration(shadowCanvas, width, x, y, textAlign, offset) {
            x = Math.floor(x);
            y = Math.floor(y + offset) - LINE_OFFSET;
            shadowCanvas.beginPath();
            switch (textAlign) {
              case "left":
                shadowCanvas.moveTo(x, y);
                shadowCanvas.lineTo(x + width, y);
                break;

              case "right":
                shadowCanvas.moveTo(x, y);
                shadowCanvas.lineTo(x - width, y);
                break;

              case "center":
                width = Math.ceil(width / 2);
                shadowCanvas.moveTo(x - width, y);
                shadowCanvas.lineTo(x + width, y);
                break;
            }
            shadowCanvas.stroke();
        }
        function getYPoint(verticalType, regionHeight, contentHeight) {
            switch (verticalType) {
              case "top":
                return 0;

              case "middle":
                return (regionHeight - contentHeight) / 2;

              case "bottom":
                return regionHeight - contentHeight;
            }
        }
        function getCellInfo(struct, start, end) {
            var infoList = [];
            var rowInfo;
            var text;
            var mergeInfo;
            var mergeRecord = {};
            var mergeKey;
            var mergeStartRow;
            var mergeStartCol;
            var row;
            var col;
            var grid = struct.getGrid();
            for (var i = start.r, limit = end.r; i <= limit; i++) {
                rowInfo = [];
                row = grid.rowMap[i];
                for (var j = start.c, jlimit = end.c; j <= jlimit; j++) {
                    col = grid.colMap[j];
                    mergeInfo = struct.getMergeCell(row, col);
                    if (mergeInfo) {
                        mergeStartRow = mergeInfo.start.row;
                        mergeStartCol = mergeInfo.start.col;
                        mergeKey = mergeStartRow + "," + mergeStartCol;
                        if (!mergeRecord[mergeKey]) {
                            mergeRecord[mergeKey] = true;
                        } else {
                            continue;
                        }
                    } else {
                        mergeStartRow = row;
                        mergeStartCol = col;
                    }
                    text = struct.getDisplayValue(mergeStartRow, mergeStartCol);
                    if (text) {
                        rowInfo[j] = {
                            content: text,
                            font: struct.getComputedStyle("fonts", mergeStartRow, mergeStartCol),
                            alignment: struct.getComputedStyle("alignments", mergeStartRow, mergeStartCol),
                            mergeInfo: mergeInfo,
                            row: i,
                            col: j
                        };
                    }
                }
                infoList.push(rowInfo);
            }
            return infoList;
        }
        function getLayout(canvas, struct, infoList) {
            var rowInfo;
            var currentInfo;
            var rowLayout;
            var fontStyleKey;
            var sameFontInfo = {};
            var overflowBorders = {};
            for (var i = 0, len = infoList.length; i < len; i++) {
                rowInfo = infoList[i];
                rowLayout = [];
                for (var j = 0, jlen = rowInfo.length; j < jlen; j++) {
                    currentInfo = rowInfo[j];
                    if (!currentInfo) {
                        continue;
                    }
                    fontStyleKey = JSON.stringify(currentInfo.font);
                    if (!sameFontInfo[fontStyleKey]) {
                        sameFontInfo[fontStyleKey] = [ currentInfo ];
                    } else {
                        sameFontInfo[fontStyleKey].push(currentInfo);
                    }
                }
            }
            // get content width
            for (var key in sameFontInfo) {
                if (!sameFontInfo.hasOwnProperty(key)) {
                    continue;
                }
                calculateContentWidth(canvas, sameFontInfo[key]);
            }
            // to layout
            toToLayout(struct, infoList, overflowBorders);
            return {
                layout: sameFontInfo,
                overflow: overflowBorders
            };
        }
        function calculateContentWidth(canvas, infoList) {
            var contents;
            var fontStyle = infoList[0].font;
            var widths;
            canvas.setFontStyle(fontStyle);
            for (var i = 0, len = infoList.length; i < len; i++) {
                widths = [];
                contents = infoList[i].content.split("\n");
                for (var j = 0, jlen = contents.length; j < jlen; j++) {
                    widths[j] = canvas.measureText(contents[j]).width;
                }
                infoList[i].contentWidth = Math.max.apply(null, widths);
            }
        }
        // 增加布局信息
        function toToLayout(struct, infoList, overflowBorders) {
            var rowInfo;
            var info;
            for (var i = 0, len = infoList.length; i < len; i++) {
                rowInfo = infoList[i];
                for (var j = 0, jlen = rowInfo.length; j < jlen; j++) {
                    info = rowInfo[j];
                    if (!info) {
                        continue;
                    }
                    if (!info.mergeInfo) {
                        calculateContentLayout(struct, rowInfo, i, j, overflowBorders);
                    } else {
                        // 合并后的单元格没有内容溢出，所以不需要有border溢出记录
                        calculateMergeCellContentLayout(struct, info);
                    }
                }
            }
            return infoList;
        }
        function calculateContentLayout(struct, rowInfo, rowIndex, cellIndex, overflowBorders) {
            var currentInfo = rowInfo[cellIndex];
            switch (currentInfo.alignment.horizontal) {
              case "left":
                calculateLeftAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders);
                break;

              case "right":
                calculateRightAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders);
                break;

              case "center":
                calculateCenterAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders);
                break;
            }
        }
        /**
     * 计算合并单元格的layout信息
     */
        function calculateMergeCellContentLayout(struct, currentInfo) {
            var rect = Util.getMergeCellRect(struct, currentInfo.row, currentInfo.col, currentInfo.mergeInfo);
            currentInfo.regionX = rect.x + CONTENT_PADDING;
            currentInfo.regionY = rect.y + CONTENT_PADDING;
            currentInfo.regionWidth = rect.width - DOUBLE_CONTENT_PADDING;
            currentInfo.regionHeight = rect.height - DOUBLE_CONTENT_PADDING;
            switch (currentInfo.alignment.horizontal) {
              case "left":
                currentInfo.textX = currentInfo.regionX;
                break;

              case "right":
                currentInfo.textX = currentInfo.regionX + currentInfo.regionWidth;
                break;

              case "center":
                currentInfo.textX = currentInfo.regionX + currentInfo.regionWidth / 2;
                break;
            }
        }
        function calculateLeftAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders) {
            var grid = struct.getGrid();
            var colWidths = grid.viewWidth;
            var colPoints = grid.viewColPoints;
            var currentInfo = rowInfo[cellIndex];
            var width = colWidths[cellIndex];
            var contentWidth = currentInfo.contentWidth + DOUBLE_CONTENT_PADDING;
            // 从下一个单元格开始
            for (var i = cellIndex + 1, len = colWidths.length; i < len; i++) {
                // 下一个单元格存在内容， 则结束
                if (rowInfo[i]) {
                    break;
                }
                // 宽度足够存放内容，则结束
                if (width >= contentWidth) {
                    break;
                }
                // 否则，记录下一个单元格的起始位置
                overflowBorders[rowIndex + "," + i] = true;
                // 同时，更新宽度
                width += colWidths[i] + LINE_WIDTH;
            }
            currentInfo.textX = colPoints[cellIndex] + LINE_OFFSET + CONTENT_PADDING;
            currentInfo.regionX = colPoints[cellIndex] + LINE_OFFSET + CONTENT_PADDING;
            currentInfo.regionY = grid.viewRowPoints[currentInfo.row] + LINE_OFFSET + CONTENT_PADDING;
            currentInfo.regionWidth = width - DOUBLE_CONTENT_PADDING;
            currentInfo.regionHeight = grid.viewHeight[currentInfo.row] - DOUBLE_CONTENT_PADDING;
        }
        function calculateCenterAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders) {
            var grid = struct.getGrid();
            var colWidths = grid.viewWidth;
            var colPoints = grid.viewColPoints;
            var currentInfo = rowInfo[cellIndex];
            var width = colWidths[cellIndex];
            var contentWidth = (width + currentInfo.contentWidth) / 2 + CONTENT_PADDING;
            currentInfo.regionWidth = 0;
            for (var i = cellIndex + 1, len = colPoints.length; i < len; i++) {
                // 下一个单元格存在内容， 则结束
                if (rowInfo[i]) {
                    break;
                }
                // 宽度足够存放内容，则结束
                if (width >= contentWidth) {
                    break;
                }
                // 否则，记录下一个单元格的起始位置
                overflowBorders[rowIndex + "," + i] = true;
                width += colWidths[i] + LINE_WIDTH;
            }
            currentInfo.regionWidth += width;
            // 左溢出计算
            width = colWidths[cellIndex];
            var count = 0;
            for (var i = cellIndex - 1; i >= 0; i--) {
                // 下一个单元格存在内容， 则结束
                if (rowInfo[i]) {
                    break;
                }
                // 宽度足够存放内容，则结束
                if (width >= contentWidth) {
                    break;
                }
                // 否则，记录当前单元格的起始位置
                overflowBorders[rowIndex + "," + (i + 1)] = true;
                count++;
                width += colWidths[i] + LINE_WIDTH;
            }
            currentInfo.textX = colPoints[cellIndex] + LINE_OFFSET + colWidths[cellIndex] / 2;
            currentInfo.regionWidth += width - colWidths[cellIndex] - DOUBLE_CONTENT_PADDING;
            currentInfo.regionHeight = grid.viewHeight[currentInfo.row] - DOUBLE_CONTENT_PADDING;
            currentInfo.regionX = colPoints[cellIndex - count] + LINE_OFFSET + CONTENT_PADDING;
            currentInfo.regionY = grid.viewRowPoints[currentInfo.row] + LINE_OFFSET + CONTENT_PADDING;
        }
        function calculateRightAlignOverflow(struct, rowInfo, rowIndex, cellIndex, overflowBorders) {
            var grid = struct.getGrid();
            var colWidths = grid.viewWidth;
            var colPoints = grid.viewColPoints;
            var currentInfo = rowInfo[cellIndex];
            var width = colWidths[cellIndex];
            var contentWidth = currentInfo.contentWidth + DOUBLE_CONTENT_PADDING;
            var count = 0;
            // 相对位置向左计算
            // 从下一个单元格开始
            for (var i = cellIndex - 1; i >= 0; i--) {
                // 下一个单元格存在内容， 则结束
                if (rowInfo[i]) {
                    break;
                }
                // 宽度足够存放内容，则结束
                if (width >= contentWidth) {
                    break;
                }
                // 否则，记录当前单元格的起始位置
                overflowBorders[rowIndex + "," + (i + 1)] = true;
                count++;
                width += colWidths[i] + LINE_WIDTH;
            }
            currentInfo.textX = colPoints[cellIndex + 1] - LINE_OFFSET - CONTENT_PADDING;
            currentInfo.regionWidth = width - DOUBLE_CONTENT_PADDING;
            currentInfo.regionHeight = grid.viewHeight[currentInfo.row] - DOUBLE_CONTENT_PADDING;
            currentInfo.regionX = colPoints[cellIndex - count] + LINE_OFFSET + CONTENT_PADDING;
            currentInfo.regionY = grid.viewRowPoints[currentInfo.row] + LINE_OFFSET + CONTENT_PADDING;
        }
    }
};

//src/system/screen/body/painters/merge-fill.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[235] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var CANVAS_COLOR = SYS_CONFIG.canvas.background;
        var NONE = _p.r(126);
        var Util = _p.r(240);
        return {
            draw: function(canvas, struct, regions) {
                var region;
                if (regions.length === 1) {
                    render(canvas, struct, regions[0]);
                    return;
                }
                for (var i = 0, len = regions.length; i < len; i++) {
                    region = regions[i];
                    canvas.save();
                    canvas.beginPath();
                    canvas.rect(region.x, region.y, region.width, region.height);
                    canvas.clip();
                    render(canvas, struct, region);
                    canvas.restore();
                }
            }
        };
        function render(canvas, struct, region) {
            var mergeInfo = getMergeCellInfo(struct, region);
            var currentInfo;
            for (var i = 0, len = mergeInfo.length; i < len; i++) {
                currentInfo = mergeInfo[i];
                canvas.fillStyle(currentInfo.fillColor);
                canvas.fillRect(currentInfo.x, currentInfo.y, currentInfo.width, currentInfo.height);
            }
        }
        function getMergeCellInfo(struct, region) {
            var grid = struct.getGrid();
            var result = [];
            var colIndex;
            var mergeInfo;
            var mergeRecord = {};
            var mergeKey;
            var fillStyle;
            var mergeStart;
            var mergeEnd;
            var fillColor;
            var rect;
            var row;
            var col;
            for (var i = region.startRow, limit = region.endRow; i <= limit; i++) {
                colIndex = 0;
                row = grid.rowMap[i];
                for (var j = region.startCol, jlimit = region.endCol; j <= jlimit; j++) {
                    col = grid.colMap[j];
                    mergeInfo = struct.getMergeCell(row, col);
                    if (!mergeInfo) {
                        continue;
                    }
                    mergeStart = mergeInfo.start;
                    mergeEnd = mergeInfo.end;
                    mergeKey = mergeStart.row + "," + mergeStart.col;
                    if (mergeRecord[mergeKey]) {
                        continue;
                    }
                    mergeRecord[mergeKey] = true;
                    rect = Util.getMergeCellRect(struct, i, j, mergeInfo);
                    fillStyle = struct.getComputedStyle("fills", mergeStart.row, mergeStart.col);
                    if (!fillStyle || fillStyle.fill === NONE) {
                        fillColor = CANVAS_COLOR;
                    } else {
                        fillColor = fillStyle.fill;
                    }
                    rect.fillColor = fillColor;
                    result.push(rect);
                }
            }
            return result;
        }
    }
};

//src/system/screen/canvas.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[236] = {
    value: function(require) {
        var CANDIDATE_FONT = _p.r(14).CANDIDATE_FONT;
        return _p.r(0).create("Canvas", {
            width: 0,
            height: 0,
            node: null,
            context: null,
            zoom: 1,
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
            remove: function() {
                var parentNode = this.node.parentNode;
                if (parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            },
            resize: function(width, height, zoom) {
                this.width = width;
                this.height = height;
                if (zoom == undefined) {
                    zoom = this.zoom;
                } else {
                    this.zoom = zoom;
                }
                this.node.width = Math.ceil(width * zoom);
                this.node.height = Math.ceil(height * zoom);
                this.node.style.width = width + "px";
                this.node.style.height = height + "px";
                this.context.scale(zoom, zoom);
            },
            clear: function() {
                this.resize(this.width, this.height);
            },
            clearRect: function(x, y, width, height) {
                this.context.clearRect(x, y, width, height);
            },
            font: function(val) {
                return this.__set("font", val);
            },
            setFontStyle: function(style) {
                this.context.font = [ style.italic ? "italic" : "normal", style.bold ? "bold" : "normal", style.size + "px", style.name + "," + CANDIDATE_FONT ].join(" ");
            },
            setLineDash: function(args) {
                this.context.setLineDash(args);
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
            createImageData: function(w, h) {
                return this.context.createImageData(w, h);
            },
            putImageData: function(image, x, y) {
                this.context.putImageData(image, x, y);
            },
            getImageData: function(x, y, w, h) {
                return this.context.getImageData(x, y, w, h);
            },
            dumpImageData: function() {
                return this.context.getImageData(0, 0, this.width, this.height);
            },
            drawImage: function(image, x, y) {
                return this.context.drawImage.apply(this.context, arguments);
            },
            globalCompositeOperation: function(val) {
                this.context.globalCompositeOperation = val;
            },
            translate: function(x, y) {
                this.context.translate(x, y);
            },
            getImage: function() {
                return this.node;
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
            rect: function(x, y, w, h) {
                this.context.rect(x, y, w, h);
                return this;
            },
            clip: function() {
                this.context.clip();
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
            measureText: function(content) {
                return this.context.measureText(content);
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

//src/system/screen/left-screen.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[237] = {
    value: function(require) {
        var Canvas = _p.r(236);
        var Util = _p.r(240);
        var PANE_LINE_COLOR = _p.r(14).PANE_LINE_COLOR;
        return _p.r(0).create("LeftScreen", {
            width: 0,
            height: 0,
            canvas: null,
            base: _p.r(143),
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
                this.canvas.resize(width, height, this.getSystemConfig("ZOOM"));
                this.canvas.font(this.getSystemConfig("head").font);
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
                this.drawPaneLine();
            },
            drawSelectionPatch: function(start, end) {
                this.clear();
                this.drawSelection(start, end);
                this.drawGrid();
                this.drawPaneLine();
            },
            drawPaneLine: function() {
                var struct = this.rs("c.struct");
                var pane = struct.getPane();
                if (pane.row === -1) {
                    return;
                }
                var canvas = this.canvas;
                var grid = struct.getGrid();
                var headConfig = this.getSystemConfig("head");
                var y = grid.viewRowPoints[pane.row + 1];
                canvas.strokeStyle(PANE_LINE_COLOR);
                canvas.beginPath();
                canvas.moveTo(0, y);
                canvas.lineTo(headConfig.width, y);
                canvas.stroke();
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
                var headConfig = this.getSystemConfig("head");
                var canvas = this.canvas;
                var rect = Util.getRegionHeight(struct, start.row, end.row);
                canvas.fillStyle(headConfig.focusColor);
                canvas.fillRect(0, rect.y, headConfig.width, rect.height);
            },
            drawGrid: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var config = this.getSystemConfig();
                var offset = struct.getOffset();
                var canvas = this.canvas;
                var width = this.width;
                var height = this.height;
                var borderWidth = struct.getBorderWidth();
                var point = null;
                var headWidth = config.head.width;
                var rowMap = grid.rowMap;
                var rowPoints = grid.viewRowPoints;
                var heights = grid.viewHeight;
                canvas.strokeStyle(config.border.color);
                canvas.lineWidth(borderWidth);
                canvas.textAlign("center");
                canvas.textBaseline("middle");
                canvas.fillStyle(config.head.color);
                canvas.beginPath();
                canvas.strokeRect(-borderWidth, grid.viewColPoints[0], width + 3 * borderWidth, height - borderWidth);
                for (var i = 0, len = visibleCount.row; i < len; i++) {
                    point = rowPoints[i + 1];
                    canvas.moveTo(0, point);
                    canvas.lineTo(width, point);
                    canvas.fillText(rowMap[i] + 1, headWidth / 2, point - offset - heights[i] / 2 + 1);
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
_p[238] = {
    value: function(require) {
        var BodyScreen = _p.r(224);
        var TopScreen = _p.r(239);
        var LeftScreen = _p.r(237);
        return _p.r(0).create("Screen", {
            bodyScreen: null,
            gridScreen: null,
            panel: null,
            base: _p.r(146),
            init: function() {
                this.bodyScreen = this.createComponent(BodyScreen);
                this.topScreen = this.createComponent(TopScreen);
                this.leftScreen = this.createComponent(LeftScreen);
                this.resize();
                this.onMessage("c.refresh", this.render);
                this.onMessage("c.container.resize", this.resize);
            },
            run: function() {
                this.bodyScreen.appendTo(this.getContentContainer());
                this.topScreen.appendTo(this.getTopContainer());
                this.leftScreen.appendTo(this.getLeftContainer());
            },
            render: function() {
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
_p[239] = {
    value: function(require) {
        var Canvas = _p.r(236);
        var Util = _p.r(240);
        var PANE_LINE_COLOR = _p.r(14).PANE_LINE_COLOR;
        return _p.r(0).create("TopScreen", {
            width: 0,
            height: 0,
            canvas: null,
            base: _p.r(143),
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
                this.canvas.resize(width, height, this.getSystemConfig("ZOOM"));
                this.canvas.font(this.getSystemConfig("head").font);
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
                this.drawPaneLine();
            },
            drawSelectionPatch: function(start, end) {
                this.clear();
                this.drawSelection(start, end);
                this.drawGrid();
                this.drawPaneLine();
            },
            drawStableSelection: function() {
                var range = this.rs("c.range");
                if (!range.isValid()) {
                    return;
                }
                var selection = range.getAllSelection()[0];
                this.drawSelection(selection.start, selection.end);
            },
            drawPaneLine: function() {
                var struct = this.rs("c.struct");
                var pane = struct.getPane();
                if (pane.col === -1) {
                    return;
                }
                var canvas = this.canvas;
                var grid = struct.getGrid();
                var headConfig = this.getSystemConfig("head");
                var x = grid.viewColPoints[pane.col + 1];
                canvas.strokeStyle(PANE_LINE_COLOR);
                canvas.beginPath();
                canvas.moveTo(x, 0);
                canvas.lineTo(x, headConfig.height);
                canvas.stroke();
            },
            drawSelection: function(start, end) {
                var struct = this.rs("c.struct");
                var headConfig = this.getSystemConfig("head");
                var canvas = this.canvas;
                var rect = Util.getRegionWidth(struct, start.col, end.col);
                canvas.fillStyle(headConfig.focusColor);
                canvas.fillRect(rect.x, 0, rect.width, headConfig.height);
            },
            drawGrid: function() {
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var visibleCount = struct.getVisibleCount();
                var offset = struct.getOffset();
                var config = this.getSystemConfig();
                var canvas = this.canvas;
                var width = this.width;
                var height = this.height;
                var borderWidth = struct.getBorderWidth();
                var point = null;
                var headHeight = config.head.height;
                var colMap = grid.colMap;
                var colPoints = grid.viewColPoints;
                var widths = grid.viewWidth;
                canvas.strokeStyle(config.border.color);
                canvas.lineWidth(borderWidth);
                canvas.textAlign("center");
                canvas.textBaseline("middle");
                canvas.fillStyle(config.head.color);
                canvas.beginPath();
                canvas.strokeRect(grid.viewColPoints[0], -borderWidth, width - borderWidth, height + 3 * borderWidth);
                for (var i = 0, len = visibleCount.col; i < len; i++) {
                    point = colPoints[i + 1];
                    canvas.moveTo(point, 0);
                    canvas.lineTo(point, height);
                    canvas.fillText(this.cs("c.title.index2char", colMap[i]), point - offset - widths[i] / 2, headHeight / 2);
                }
                canvas.closePath();
                canvas.stroke();
            }
        });
    }
};

//src/system/screen/util.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[240] = {
    value: function(require) {
        var SYS_CONFIG = _p.r(14);
        var LINE_WIDTH = SYS_CONFIG.border.width;
        var LINE_OFFSET = SYS_CONFIG.border.offset;
        return {
            getMergeCellRect: function(struct, r, c, mergeInfo) {
                var grid = struct.getGrid();
                // 当前可见的最左上角的合并单元格所在的行和列
                var row = grid.rowMap[r];
                var col = grid.colMap[c];
                var mergeStartRow = mergeInfo.start.row;
                var mergeStartCol = mergeInfo.start.col;
                var mergeEndRow = mergeInfo.end.row;
                var mergeEndCol = mergeInfo.end.col;
                var x = grid.viewColPoints[c];
                var y = grid.viewRowPoints[r];
                var widthInfo = getWidthInfo(struct, mergeStartCol, mergeEndCol);
                var heightInfo = getHeightInfo(struct, mergeStartRow, mergeEndRow);
                var widths = widthInfo.widthList;
                var heights = heightInfo.heightList;
                var index = 0;
                for (var i = mergeStartRow; i < row; i++, index++) {
                    if (heights[index] === 0) {
                        continue;
                    }
                    y -= heights[index] + LINE_WIDTH;
                }
                index = 0;
                for (var i = mergeStartCol; i < col; i++, index++) {
                    if (widths[index] === 0) {
                        continue;
                    }
                    x -= widths[index] + LINE_WIDTH;
                }
                return {
                    x: x + LINE_OFFSET,
                    y: y + LINE_OFFSET,
                    width: widthInfo.width,
                    height: heightInfo.height
                };
            },
            getRegionHeight: function(struct, startIndex, endIndex) {
                var grid = struct.getGrid();
                var rMap = grid.rMap;
                var rowHeight = grid.viewHeight;
                var rowPoints = grid.viewRowPoints;
                var height = -1;
                var y = -1;
                var r;
                var min = Math.min(startIndex, endIndex);
                var max = Math.max(startIndex, endIndex);
                for (var i = min; i <= max; i++) {
                    r = rMap[i];
                    if (r === undefined) {
                        continue;
                    }
                    if (y === -1) {
                        y = rowPoints[r] + LINE_OFFSET;
                    }
                    height += rowHeight[r] + LINE_WIDTH;
                }
                return {
                    y: y,
                    height: height
                };
            },
            getRegionWidth: function(struct, startIndex, endIndex) {
                var grid = struct.getGrid();
                var cMap = grid.cMap;
                var colWidth = grid.viewWidth;
                var colPoints = grid.viewColPoints;
                var width = -1;
                var x = -1;
                var c;
                var min = Math.min(startIndex, endIndex);
                var max = Math.max(startIndex, endIndex);
                for (var i = min; i <= max; i++) {
                    c = cMap[i];
                    if (c === undefined) {
                        continue;
                    }
                    if (x === -1) {
                        x = colPoints[c] + LINE_OFFSET;
                    }
                    width += colWidth[c] + LINE_WIDTH;
                }
                return {
                    x: x,
                    width: width
                };
            }
        };
        function getWidthInfo(struct, startCol, endCol) {
            var w;
            var width = -1;
            var widths = [];
            for (var i = startCol; i <= endCol; i++) {
                w = struct.getColumnWidth(i);
                widths.push(w);
                if (w === 0) {
                    continue;
                }
                width += w + LINE_WIDTH;
            }
            if (width < 0) {
                width = 0;
            }
            return {
                width: width,
                widthList: widths
            };
        }
        function getHeightInfo(struct, startRow, endRow) {
            var h;
            var height = -1;
            var heights = [];
            for (var i = startRow; i <= endRow; i++) {
                h = struct.getRowHeight(i);
                heights.push(h);
                if (h === 0) {
                    continue;
                }
                height += h + LINE_WIDTH;
            }
            if (height < 0) {
                height = 0;
            }
            return {
                height: height,
                heightList: heights
            };
        }
    }
};

//src/system/scrollbar/scroll-event-manager.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[241] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("ScrollEventManager", {
            base: _p.r(143),
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
_p[242] = {
    value: function(require) {
        var $ = _p.r(2);
        var BAR_MIN_LENGTH = 50;
        var ScrollEventManager = _p.r(241);
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
            base: _p.r(146),
            init: function() {
                var size = this.getScrollSize();
                this.hWayLength = size.h.width - 2;
                this.vWayLength = size.v.height - 2;
                this.createHorizontalBar(size.h);
                this.createVerticalBar(size.v);
                if (this.getSystemConfig("enableScroll")) {
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

//src/system/selectall.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[243] = {
    value: function(require) {
        return _p.r(0).create("Position", {
            panel: null,
            base: _p.r(146),
            init: function() {
                this.panel = this.createElement("div", "btb-selectall-panel");
                this.panel.appendChild(this.createElement("div", "btb-selectall-btn"));
                var topSize = this.getTopSize();
                var leftSize = this.getLeftSize();
                this.panel.style.cssText = "width: " + leftSize.width + "px; height: " + topSize.height + "px;";
                this.initEvent();
                this.initMessageHook();
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.update
                });
            },
            initEvent: function() {
                var _self = this;
                $(this.panel).on("mousedown", function(e) {
                    e.preventDefault();
                    _self.execCommand("focus", 0, 0);
                    _self.execCommand("selectall");
                });
            },
            update: function() {
                var struct = this.rs("c.struct");
                if (struct.isShowHeader()) {
                    this.panel.style.display = "";
                } else {
                    this.panel.style.display = "none";
                }
            },
            run: function() {
                this.getMainContainer().appendChild(this.panel);
            }
        });
    }
};

//src/system/selection/normal-worker.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[244] = {
    value: function(require) {
        var $ = _p.r(2);
        var Util = _p.r(217);
        return _p.r(0).create("NormalWorker", {
            selection: null,
            coverModule: null,
            selectionNode: null,
            $selectionNode: null,
            visiableState: false,
            activeCell: null,
            moveCell: null,
            // 是否开始坚挺选区变更
            started: false,
            banState: false,
            // 带窗格的视图的操作状态
            fixedToActive: false,
            ignorePaneCol: false,
            base: _p.r(143),
            init: function(selection, coverModule) {
                this.selection = selection;
                this.coverModule = coverModule;
                this.initEvent();
            },
            run: function() {
                this.getContentContainer().appendChild(this.selectionNode);
            },
            initEvent: function() {
                this.coverModule.onmousedown(this, this.onmousedown);
                this.coverModule.onmousemove(this, this.onmousemove);
                this.coverModule.onmouseup(this, this.onmouseup);
                this.coverModule.onmouseleave(this, this.onmouseleave);
            },
            onmousedown: function(r, c) {
                var struct = this.rs("c.struct");
                var pane = struct.getPane();
                if (pane.row !== -1 || pane.col !== -1) {
                    return;
                }
                this.started = true;
                var gird = struct.getGrid();
                this.selection.hide();
                this.activeCell = {
                    row: gird.rowMap[r],
                    col: gird.colMap[c]
                };
            },
            onmousemove: function(r, c) {
                if (!this.started) {
                    return;
                }
                this.banState = true;
                this.selection.unstable();
                var activeCell = this.activeCell;
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var row = grid.rowMap[r];
                var col = grid.colMap[c];
                this.moveCell = {
                    row: row,
                    col: col
                };
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                this.selection.resize(rect);
                this.rs("s.left.selection.patch", activeCell, this.moveCell);
                this.rs("s.top.selection.patch", activeCell, this.moveCell);
            },
            onmouseup: function() {
                if (!this.started) {
                    return;
                }
                this.stop();
            },
            onmouseleave: function(direction, r, c) {
                if (!this.started) {
                    return;
                }
                var struct = this.rs("c.struct");
                var viewStart;
                var viewEnd;
                switch (direction) {
                  case "right":
                    this.execCommand("scrollcolumn", 1);
                    viewEnd = struct.getViewEnd();
                    this.moveCell = {
                        row: struct.getGrid().rowMap[r],
                        col: viewEnd.col
                    };
                    break;

                  case "bottom":
                    this.execCommand("scrollrow", 1);
                    viewEnd = struct.getViewEnd();
                    this.moveCell = {
                        row: viewEnd.row,
                        col: struct.getGrid().colMap[c]
                    };
                    break;

                  case "top":
                    this.execCommand("scrollrow", -1);
                    viewStart = struct.getViewStart();
                    this.moveCell = {
                        row: viewStart.row,
                        col: struct.getGrid().colMap[c]
                    };
                    break;

                  case "left":
                    this.execCommand("scrollcolumn", -1);
                    viewStart = struct.getViewStart();
                    this.moveCell = {
                        row: struct.getGrid().rowMap[r],
                        col: viewStart.col
                    };
                    break;

                  case "right-bottom":
                    this.execCommand("scroll", 1, 1);
                    viewEnd = struct.getViewEnd();
                    this.moveCell = {
                        row: viewEnd.row,
                        col: viewEnd.col
                    };
                    break;

                  case "right-top":
                    this.execCommand("scroll", -1, 1);
                    viewStart = struct.getViewStart();
                    viewEnd = struct.getViewEnd();
                    this.moveCell = {
                        row: viewStart.row,
                        col: viewEnd.col
                    };
                    break;

                  case "left-bottom":
                    this.execCommand("scroll", 1, -1);
                    viewStart = struct.getViewStart();
                    viewEnd = struct.getViewEnd();
                    this.moveCell = {
                        row: viewEnd.row,
                        col: viewStart.col
                    };
                    break;

                  case "left-top":
                    this.execCommand("scroll", -1, -1);
                    viewStart = struct.getViewStart();
                    this.moveCell = {
                        row: viewStart.row,
                        col: viewStart.col
                    };
                    break;
                }
                var rect = Util.getSelectionRect(struct, this.activeCell, this.moveCell);
                this.selection.resize(rect);
                this.rs("s.left.selection.patch", this.activeCell, this.moveCell);
                this.rs("s.top.selection.patch", this.activeCell, this.moveCell);
            },
            stop: function() {
                if (!this.started || this.moveCell === null) {
                    return;
                }
                this.banState = false;
                this.started = false;
                var activeCell = this.activeCell;
                var struct = this.rs("c.struct");
                var row = this.moveCell.row;
                var col = this.moveCell.col;
                this.moveCell = null;
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                var region = this.cs("c.cell.compare", activeCell, {
                    row: row,
                    col: col
                });
                this.rs("c.range.selection", region.min, region.max);
            }
        });
    }
};

//src/system/selection/pane-worker.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[245] = {
    value: function(require) {
        var $ = _p.r(2);
        var Util = _p.r(217);
        return _p.r(0).create("NormalWorker", {
            selection: null,
            coverModule: null,
            selectionNode: null,
            $selectionNode: null,
            visiableState: false,
            activeCell: null,
            moveCell: null,
            // 是否开始坚挺选区变更
            started: false,
            // 带窗格的视图的操作状态
            rowFixedToActive: false,
            colFixedToActive: false,
            timer: null,
            base: _p.r(143),
            init: function(selection, coverModule) {
                this.selection = selection;
                this.coverModule = coverModule;
                this.initEvent();
            },
            run: function() {
                this.getContentContainer().appendChild(this.selectionNode);
            },
            initEvent: function() {
                this.coverModule.onmousedown(this, this.onmousedown);
                this.coverModule.onmousemove(this, this.onmousemove);
                this.coverModule.onmouseup(this, this.onmouseup);
                this.coverModule.onmouseleave(this, this.onmouseleave);
            },
            onmousedown: function(r, c) {
                var struct = this.rs("c.struct");
                var pane = struct.getPane();
                if (pane.row === -1 && pane.col === -1) {
                    return;
                }
                this.started = true;
                var gird = struct.getGrid();
                this.selection.hide();
                this.activeCell = {
                    row: gird.rowMap[r],
                    col: gird.colMap[c]
                };
            },
            onmousemove: function(r, c) {
                if (!this.started) {
                    return;
                }
                this.selection.unstable();
                var activeCell = this.activeCell;
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var viewStart = struct.getViewStart();
                var pane = struct.getPane();
                var row = grid.rowMap[r];
                var col = grid.colMap[c];
                var resetRow = false;
                var resetCol = false;
                var rollbackRow = false;
                var rollbackCol = false;
                if (pane.row !== -1) {
                    if (activeCell.row <= pane.row) {
                        // 由固定视图进入活动视图
                        if (row > pane.row) {
                            if (!this.rowFixedToActive) {
                                this.rowFixedToActive = true;
                                resetRow = true;
                            }
                        } else if (this.rowFixedToActive) {
                            if (viewStart.row !== 0) {
                                rollbackRow = true;
                            } else {
                                this.rowFixedToActive = false;
                            }
                        }
                    } else {
                        if (row <= pane.row) {
                            if (viewStart.row !== 0) {
                                rollbackRow = true;
                            } else {
                                this.rowFixedToActive = false;
                            }
                        }
                    }
                }
                if (pane.col !== -1) {
                    if (activeCell.col <= pane.col) {
                        if (col > pane.col) {
                            if (!this.colFixedToActive) {
                                this.colFixedToActive = true;
                                resetCol = true;
                            }
                        } else if (this.colFixedToActive) {
                            if (viewStart.col !== 0) {
                                rollbackCol = true;
                            } else {
                                this.colFixedToActive = false;
                            }
                        }
                    } else {
                        if (col <= pane.col) {
                            if (viewStart.col !== 0) {
                                rollbackCol = true;
                            } else {
                                this.colFixedToActive = false;
                            }
                        }
                    }
                }
                if (resetRow && resetCol) {
                    this.execCommand("scrollto", 0, 0);
                    return;
                }
                if (resetRow) {
                    this.execCommand("scrollrowto", 0);
                    return;
                }
                if (resetCol) {
                    this.execCommand("scrollcolumnto", 0);
                    return;
                }
                if (rollbackRow || rollbackCol) {
                    this.startRollback(rollbackRow, rollbackCol, row, col);
                    return;
                } else {
                    this.stopRollback();
                }
                this.moveCell = {
                    row: row,
                    col: col
                };
                this.rs("s.left.selection.patch", activeCell, this.moveCell);
                this.rs("s.top.selection.patch", activeCell, this.moveCell);
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                this.selection.resize(rect);
            },
            onmouseup: function() {
                if (!this.started) {
                    return;
                }
                this.stop();
            },
            onmouseleave: function(direction, r, c) {
                if (!this.started) {
                    return;
                }
                this.stopRollback();
                this.__leaveProcess(direction, r, c);
            },
            __leaveProcess: function(direction, r, c) {
                this.selection.unstable();
                var struct = this.rs("c.struct");
                var viewStart = struct.getViewStart();
                var startRow = viewStart.row;
                var startCol = viewStart.col;
                var pane = struct.getPane();
                var activeCell = this.activeCell;
                var visibleCount = struct.getVisibleCount();
                var isTop = r === 0;
                var isBottom = r === visibleCount.row - 1;
                var isLeft = c === 0;
                var isRight = c === visibleCount.col - 1;
                var scrollRow = 0;
                var scrollCol = 0;
                var resetRow = false;
                var resetCol = false;
                if (isTop && startRow > 0) {
                    scrollRow = -1;
                } else if (isBottom) {
                    this.rowFixedToActive = true;
                    scrollRow = 1;
                } else {
                    if (activeCell.row <= pane.row && r > pane.row && startRow > 0 && !this.rowFixedToActive) {
                        this.rowFixedToActive = true;
                        resetRow = true;
                    } else if (activeCell.row > pane.row && r < pane.row && startRow > 0) {
                        scrollRow = -1;
                    } else if (activeCell.row <= pane.row && r <= pane.row && startRow > 0 && this.rowFixedToActive) {
                        scrollRow = -1;
                    }
                }
                if (isLeft && startCol > 0) {
                    scrollCol = -1;
                } else if (isRight) {
                    this.colFixedToActive = true;
                    scrollCol = 1;
                } else {
                    if (activeCell.col <= pane.col && c > pane.col && startCol > 0 && !this.colFixedToActive) {
                        this.colFixedToActive = true;
                        resetCol = true;
                    } else if (activeCell.col > pane.col && c < pane.col && startRow > 0) {
                        scrollCol = -1;
                    } else if (activeCell.col <= pane.col && c <= pane.col && startCol > 0 && this.colFixedToActive) {
                        scrollCol = -1;
                    }
                }
                if (resetRow && resetCol) {
                    this.execCommand("scrollto", 0, 0);
                } else if (resetRow) {
                    this.execCommand("scrollrowto", 0);
                } else if (resetCol) {
                    this.execCommand("scrollcolumnto", 0);
                }
                if (scrollRow && scrollCol) {
                    this.execCommand("scroll", scrollRow, scrollCol);
                } else if (scrollRow) {
                    this.execCommand("scrollrow", scrollRow);
                } else if (scrollCol) {
                    this.execCommand("scrollcolumn", scrollCol);
                }
                var row;
                var col;
                var grid = struct.getGrid();
                viewStart = struct.getViewStart();
                var index = this.coverModule.getLeaveIndex();
                if (isBottom) {
                    row = grid.rowMap[index.row];
                } else if (activeCell.row <= pane.row && r > pane.row) {
                    row = grid.rowMap[index.row];
                } else if (activeCell.row > pane.row && r < pane.row) {
                    if (viewStart.row === 0) {
                        row = grid.rowMap[index.row];
                    } else {
                        row = grid.rowMap[pane.row + 1];
                    }
                } else if (activeCell.row <= pane.row && r <= pane.row) {
                    if (viewStart.row > 0 && this.rowFixedToActive) {
                        row = grid.rowMap[pane.row + 1];
                    } else {
                        row = grid.rowMap[index.row];
                    }
                } else {
                    row = grid.rowMap[index.row];
                }
                if (isRight) {
                    col = grid.colMap[index.col];
                } else if (activeCell.col <= pane.col && c > pane.col) {
                    col = grid.colMap[index.col];
                } else if (activeCell.col > pane.col && c < pane.col) {
                    if (viewStart.col === 0) {
                        col = grid.colMap[index.col];
                    } else {
                        col = grid.colMap[pane.col + 1];
                    }
                } else if (activeCell.col <= pane.col && c <= pane.col) {
                    if (viewStart.col > 0 && this.colFixedToActive) {
                        col = grid.colMap[pane.col + 1];
                    } else {
                        col = grid.colMap[index.col];
                    }
                } else {
                    col = grid.colMap[index.col];
                }
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                this.moveCell = {
                    row: row,
                    col: col
                };
                this.rs("s.left.selection.patch", activeCell, this.moveCell);
                this.rs("s.top.selection.patch", activeCell, this.moveCell);
                var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                this.selection.resize(rect);
            },
            startRollback: function(rollbackRow, rollbackCol, row, col) {
                var _self = this;
                this.stopRollback();
                this.__rollback(rollbackRow, rollbackCol, row, col);
                this.timer = setInterval(function() {
                    _self.__rollback(rollbackRow, rollbackCol, row, col);
                }, 50);
            },
            __rollback: function(rollbackRow, rollbackCol, row, col) {
                var activeCell = this.activeCell;
                // 回滚行列，同时更新选区
                if (rollbackRow && rollbackCol) {
                    this.execCommand("scroll", -1, -1);
                } else if (rollbackRow) {
                    this.execCommand("scrollrow", -1);
                } else if (rollbackCol) {
                    this.execCommand("scrollcolumn", -1);
                }
                var struct = this.rs("c.struct");
                var grid = struct.getGrid();
                var pane = struct.getPane();
                var viewStart = struct.getViewStart();
                if (rollbackRow && rollbackCol) {
                    if (viewStart.row === 0 && viewStart.col === 0) {
                        this.stopRollback();
                        this.moveCell = {
                            row: row,
                            col: col
                        };
                        this.rs("s.left.selection.patch", activeCell, this.moveCell);
                        this.rs("s.top.selection.patch", activeCell, this.moveCell);
                        var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                        this.selection.resize(rect);
                        return;
                    }
                } else if (rollbackRow) {
                    if (viewStart.row === 0) {
                        this.stopRollback();
                        this.moveCell = {
                            row: row,
                            col: col
                        };
                        this.rs("s.left.selection.patch", activeCell, this.moveCell);
                        this.rs("s.top.selection.patch", activeCell, this.moveCell);
                        var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                        this.selection.resize(rect);
                        return;
                    }
                } else if (rollbackCol) {
                    if (viewStart.col === 0) {
                        this.stopRollback();
                        this.moveCell = {
                            row: row,
                            col: col
                        };
                        this.rs("s.left.selection.patch", activeCell, this.moveCell);
                        this.rs("s.top.selection.patch", activeCell, this.moveCell);
                        var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                        this.selection.resize(rect);
                        return;
                    }
                }
                if (rollbackRow && viewStart.row !== 0) {
                    row = grid.rowMap[pane.row + 1];
                }
                if (rollbackCol && viewStart.col !== 0) {
                    col = grid.colMap[pane.col + 1];
                }
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                this.moveCell = {
                    row: row,
                    col: col
                };
                this.rs("s.left.selection.patch", activeCell, this.moveCell);
                this.rs("s.top.selection.patch", activeCell, this.moveCell);
                var rect = Util.getSelectionRect(struct, activeCell, this.moveCell);
                this.selection.resize(rect);
            },
            stopRollback: function() {
                if (this.timer !== null) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
            stop: function() {
                if (!this.started || this.moveCell === null) {
                    return;
                }
                this.started = false;
                var activeCell = this.activeCell;
                var struct = this.rs("c.struct");
                var row = this.moveCell.row;
                var col = this.moveCell.col;
                this.moveCell = null;
                this.rowFixedToActive = false;
                this.colFixedToActive = false;
                this.stopRollback();
                if (row === activeCell.row && col === activeCell.col) {
                    this.selection.hide();
                    return;
                }
                var region = this.cs("c.cell.compare", activeCell, {
                    row: row,
                    col: col
                });
                this.rs("c.range.selection", region.min, region.max);
            }
        });
    }
};

//src/system/selection/selection.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[246] = {
    value: function(require) {
        var $ = _p.r(2);
        var Util = _p.r(217);
        var NormalWorker = _p.r(244);
        var PaneWorker = _p.r(245);
        var Selection = _p.r(0).create("Selection", {
            selectionNode: null,
            $selectionNode: null,
            visiableState: false,
            base: _p.r(146),
            init: function(coverModule) {
                this.selectionNode = this.createSelection();
                this.$selectionNode = $(this.selectionNode);
                this.normalWorker = this.createComponent(NormalWorker, this, coverModule);
                this.paneWorker = this.createComponent(PaneWorker, this, coverModule);
                this.initMessageHook();
            },
            run: function() {
                this.getContentContainer().appendChild(this.selectionNode);
            },
            initMessageHook: function() {
                this.onMessage({
                    "c.refresh": this.update,
                    "c.range.change": this.rangeChange
                });
            },
            rangeChange: function() {
                this.$selectionNode.removeClass("btb-s-selection-unstable");
                this.update();
            },
            update: function() {
                var range = this.rs("c.range");
                if (!range.isValid() || !range.isMultiple()) {
                    this.hide();
                    return;
                }
                var struct = this.rs("c.struct");
                var rect = Util.getSelectionRect(struct, range.getStart(), range.getEnd());
                this.resize(rect);
            },
            show: function() {
                if (this.visiableState) {
                    return;
                }
                this.visiableState = true;
                this.$selectionNode.show();
            },
            hide: function() {
                if (!this.visiableState) {
                    return;
                }
                this.visiableState = false;
                this.$selectionNode.hide();
            },
            addFailedState: function() {
                this.$selectionNode.addClass("btb-selection-failed");
            },
            removeFailedState: function() {
                this.$selectionNode.removeClass("btb-selection-failed");
            },
            unstable: function() {
                this.$selectionNode.addClass("btb-s-selection-unstable");
            },
            stop: function() {
                this.normalWorker.stop();
                this.paneWorker.stop();
            },
            resize: function(rect) {
                if (!rect) {
                    this.hide();
                    return;
                }
                this.show();
                this.$selectionNode.css(rect);
            },
            createSelection: function() {
                return this.createElement("div", "btb-s-selection");
            }
        });
        Selection.deps = [ "cover" ];
        return Selection;
    }
};

//src/system/sort/sort.js
/**
 * @file
 * @author hancong03@baiud.com
 */
_p[247] = {
    value: function(require) {
        var $ = _p.r(2);
        var CELL_VALUE_TYPE = _p.r(122);
        var BOOLEAN_VALUE = _p.r(125);
        return _p.r(0).create("Cell", {
            base: _p.r(146),
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
_p[248] = {
    value: function(require) {
        var $ = _p.r(2);
        return _p.r(0).create("Viewport", {
            base: _p.r(146),
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
_p[249] = {
    value: function(require) {
        var BTable = _p.r(4);
        BTable.command(_p.r(5));
        BTable.module(_p.r(198));
        BTable.mapEvent(_p.r(141));
        BTable.Interpreter = _p.r(171);
        BTable.ExcelAdapter = _p.r(150);
        window.BTable = BTable;
    }
};

var moduleMapping = {
    "kf.start": 249
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