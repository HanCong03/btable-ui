/*!
 * ====================================================
 * Flex UI - v1.0.0 - 2015-08-24
 * https://github.com/fex-team/fui
 * GitHub: https://github.com/fex-team/fui.git 
 * Copyright (c) 2015 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('b.const', []).constant('NUMBER_FORMAT', (function () {
    return {
        'normal': 'General',

        'number': {
            // 无千分位符
            'normal': [{
                code: '0%p_);[Red](0%p)',
                text: '(1234%p)',
                color: '#ff0000'
            }, {
                code: '0%p_);(0%p)',
                text: '(1234%p)',
                color: ''
            }, {
                code: '0%p;[Red]0%p',
                text: '1234%p ',
                color: '#ff0000'
            }, {
                code: '0%p_ ',
                text: '-1234%p',
                color: ''
            }, {
                code: '0%p_ ;[Red]-0%p ',
                text: '-1234%p',
                color: '#ff0000'
            }],

            // 含有千分位符
            'thousandth': [{
                code: '#,##0%p_);[Red](#,##0%p)',
                text: '(1,234%p)',
                color: '#ff0000'
            }, {
                code: '#,##0%p_);(#,##0%p)',
                text: '(1,234%p)',
                color: ''
            }, {
                code: '#,##0%p;[Red]#,##0%p',
                text: '1,234%p ',
                color: '#ff0000'
            }, {
                code: '#,##0%p_ ',
                text: '-1,234%p',
                color: ''
            }, {
                code: '#,##0%p_ ;[Red]-#,##0%p ',
                text: '-1,234%p',
                color: '#ff0000'
            }]
        },

        'currency': [
            {
                code: '"%$"#,##0%p_);[Red]("%$"#,##0%p)',
                text: '(%$1,234%p)',
                color: '#ff0000'
            }, {
                code: '"%$"#,##0%p_);("%$"#,##0%p)',
                text: '(%$1,234%p)',
                color: ''
            }, {
                code: '"%$"#,##0%p;[Red]"%$"#,##0%p',
                text: '%$1,234%p',
                color: '#ff0000'
            }, {
                code: '"%$"#,##0%p;-"%$"#,##0%p',
                text: '-%$1,234%p',
                color: ''
            }, {
                code: '"%$"#,##0%p;[Red]-"%$"#,##0%p',
                text: '-%$1,234%p',
                color: '#ff0000'
            }
        ],

        'accountant': '_-"%$"* #,##0%p_ ;_-"%$"* -#,##0%p ;_-"%$"* "-"??_ ;_-@_ ',
        
        'date': [
            {
                code: '[DBNum1][$-804]yyyy"年"m"月"d"日";@',
                text: '二O一二年三月十四日',
                color: ''
            },
            {
                code: '[DBNum1][$-804]yyyy"年"m"月";@',
                text: '二O一二年三月',
                color: ''
            },
            {
                code: '[DBNum1][$-804]m"月"d"日";@',
                text: '三月十四日',
                color: ''
            },
            {
                code: 'yyyy"年"m"月"d"日";@',
                text: '2012年3月14日',
                color: ''
            },
            {
                code: 'yyyy"年"m"月";@',
                text: '2012年3月',
                color: ''
            },
            {
                code: 'm"月"d"日";@',
                text: '3月14日',
                color: ''
            },
            {
                code: '[$-804]aaaa;@',
                text: '星期三',
                color: ''
            },
            {
                code: '[$-804]aaa;@',
                text: '周三',
                color: ''
            },
            {
                code: '[$-409]yyyy/m/d h:mm AM/PM;@',
                text: '2012/3/14 1:30 PM',
                color: ''
            },
            {
                code: 'yyyy/m/d h:mm;@',
                text: '2012/3/14 13:30',
                color: ''
            },
            {
                code: 'yy/m/d;@',
                text: '2012/3/14',
                color: ''
            },
            {
                code: 'm/d;@',
                text: '3/14',
                color: ''
            },
            {
                code: 'm/d/yy;@',
                text: '3/14/12',
                color: ''
            },
            {
                code: 'mm/dd/yy;@',
                text: '03/14/12',
                color: ''
            },
            {
                code: '[$-409]d-mmm;@',
                text: '14-Mar',
                color: ''
            },
            {
                code: '[$-409]d-mmm-yy;@',
                text: '14-Mar-12',
                color: ''
            },
            {
                code: '[$-409]dd-mmm-yy;@',
                text: '14-Mar-12',
                color: ''
            },
            {
                code: '[$-409]mmm-yy;@',
                text: 'Mar-12',
                color: ''
            },
            {
                code: '[$-409]mmmm-yy;@',
                text: 'March-12',
                color: ''
            },
            {
                code: '[$-409]mmmmm;@',
                text: 'M',
                color: ''
            },
            {
                code: '[$-409]mmmmm-yy;@',
                text: 'M-12',
                color: ''
            }
        ],

        'time': [
            {
                code: 'h:mm;@',
                text: '13:30',
                color: ''
            },
            {
                code: '[$-409]h:mm AM/PM;@',
                text: '1:30 PM',
                color: ''
            },
            {
                code: 'h:mm:ss;@',
                text: '13:30:55',
                color: ''
            },
            {
                code: '[$-409]h:mm:ss AM/PM;@',
                text: '1:30:55 PM',
                color: ''
            },
            {
                code: 'h"时"mm"分";@',
                text: '13时30分',
                color: ''
            },
            {
                code: 'h"时"mm"分"ss"秒";@',
                text: '13时30分55秒',
                color: ''
            },
            {
                code: '上午/下午h"时"mm"分";@',
                text: '下午1时30分',
                color: ''
            },
            {
                code: '上午/下午h"时"mm"分"ss"秒";@',
                text: '下午1时30分55秒',
                color: ''
            },
            {
                code: '[DBNum1][$-804]h"时"mm"分";@',
                text: '十三时三十分',
                color: ''
            },
            {
                code: '[DBNum1][$-804]上午/下午h"时"mm"分";@',
                text: '下午一时三十分',
                color: ''
            }
        ],

        'scientific': '0%pE+00',

        'fraction': [
            {
                code: '# ?/?',
                text: '分母为一位数（1/4）',
                color: ''
            },
            {
                code: '# ??/??',
                text: '分母为两位数（21/25）',
                color: ''
            },
            {
                code: '# ???/???',
                text: '分母为三位数（312/943）',
                color: ''
            },
            {
                code: '# ?/2',
                text: '以 2 为分母（1/2）',
                color: ''
            },
            {
                code: '# ?/4',
                text: '以 4 为分母（2/4）',
                color: ''
            },
            {
                code: '# ?/8',
                text: '以 8 为分母（4/8）',
                color: ''
            },
            {
                code: '# ??/16',
                text: '以 16 为分母（8/16）',
                color: ''
            },
            {
                code: '# ?/10',
                text: '以 10 为分母（3/10）',
                color: ''
            },
            {
                code: '# ??/100',
                text: '百分之几（30/100）',
                color: ''
            }
        ],

        'percentage': '0%p%'
    };
})()).constant('FONT_LIST', [
    "Angsana New",
    "Arial",
    "Arial Black",
    "Batang",
    "Book Antiqua",
    "Browallia New",
    "Calibri",
    "Cambria",
    "Candara",
    "Century",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Cordia New",
    "Courier",
    "Courier New",
    "DilleniaUPC",
    "Dotum",
    "仿宋",
    "Garamond",
    "Georgia",
    "Gulim",
    "GungSuh",
    "楷体",
    "JasmineUPC",
    "Malgun Gothic",
    "Mangal",
    "Meiryo",
    "Microsoft JhengHei",
    "微软雅黑",
    "MingLiu",
    "MingLiU_HKSCS",
    "MS Gothic",
    "MS Mincho",
    "MS PGothic",
    "MS PMincho",
    "PMingliU",
    "PMingLiU-ExtB",
    "黑体",
    "宋体",
    "宋体-ExtB",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Yu Gothic",
    "Yu Mincho"
]).constant('FONT_STYLE', [{
    text: '常规',
    value: 0
}, {
    text: '倾斜',
    value: 1
}, {
    text: '加粗',
    value: 2
}, {
    text: '加粗倾斜',
    value: 3
}]).constant('FONT_SIZE', [
    6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
]).constant('HORIZONTAL_ALIGNMENT', [{
    text: '常规',
    value: 'none'
}, {
    text: '左对齐',
    value: 'left'
}, {
    text: '右对齐',
    value: 'right'
}, {
    text: '居中',
    value: 'center'
}]).constant('VERTICAL_ALIGNMENT', [{
    text: '靠上',
    value: 'top'
}, {
    text: '靠下',
    value: 'bottom'
}, {
    text: '居中',
    value: 'middle'
}]).constant('CURRENCY', [{
    text: '无',
    value: ''
}, {
    text: '$',
    value: '$'
}, {
    text: '￥',
    value: '￥'
}, {
    text: 'US$',
    value: 'US$'
}]).constant('BORDERS', [{
    text: '无',
    width: 0,
    type: 'none',
    value: 'none'
}, {
    text: '',
    width: 1,
    type: 'solid',
    value: 'thin'
}, {
    text: '',
    width: 1,
    type: 'dashed',
    value: 'dashed'
}, {
    text: '',
    width: 1,
    type: 'dotted',
    value: 'dotted'
}, {
    text: '',
    width: 2,
    type: 'solid',
    value: 'medium'
}]);
angular.module('app', ['ui.bootstrap', 'pascalprecht.translate', 'cgPrompt', 'b.const']);
angular.module('app').config([
    '$translateProvider',

    function ($translateProvider) {
        $translateProvider.translations('zh-CN', _zhCN);

        $translateProvider.preferredLanguage('zh-CN');
    }
]).run(function () {
    ZeroClipboard.config({
        hoverClass: 'b-hover'
    });
});
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/dialogs/cell-format.html',
    "<!-- Modal -->\n" +
    "<div class=\"modal\" id=\"cellFormatModal\" style=\"display: none;\" ng-controller=\"CellForamtModalController\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n" +
    "    <div class=\"modal-dialog btable-modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\">{{'dialog.title.cellformat' | translate}}</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <ng-include src=\"'template/toolbar/tabs/start/cell-format/index.html'\"></ng-include>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn b-modal-btn b-ok-btn\" ng-mousedown=\"modalOkClick($event);\">{{'common.ok' | translate}}</button>\n" +
    "                <button type=\"button\" class=\"btn b-modal-btn b-cancel-btn\" data-dismiss=\"modal\">{{'common.cancel' | translate}}</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/file-default.html',
    "默认文件"
  );


  $templateCache.put('template/modal/comment.html',
    "<div class=\"b-modal\">\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ng-click=\"cancel();\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                <h4 class=\"modal-title\">批注：</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <form>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"commentInput\" class=\"control-label\">批注:</label>\n" +
    "                        <textarea class=\"form-control\" id=\"commentInput\" ng-model=\"comment\"></textarea>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"cancel();\">\n" +
    "                    {{'common.cancel' | translate}}\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok();\">\n" +
    "                    {{'common.ok' | translate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/modal/hyperlink.html',
    "<div class=\"b-modal\">\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ng-click=\"cancel();\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                <h4 class=\"modal-title\">超链接：</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <form>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"hyperlinkTextInput\" class=\"control-label\">显示文本:</label>\n" +
    "                        <input class=\"form-control\" id=\"hyperlinkTextInput\" ng-model=\"text\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"hyperlinkInput\" class=\"control-label\">链接地址（仅http(s)协议）:</label>\n" +
    "                        <input class=\"form-control\" id=\"hyperlinkInput\" ng-model=\"hyperlink\">\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"cancel();\">\n" +
    "                    {{'common.cancel' | translate}}\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok();\">\n" +
    "                    {{'common.ok' | translate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/file.html',
    "<div class=\"b-fileoptions-container\" tabindex=\"-1\">\n" +
    "    <ng-include src=\"url\"></ng-include>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/alignment/index.html',
    "<div class=\"b-numberformat-box\">\n" +
    "    <fieldset>\n" +
    "        <legend>文本对齐方式</legend>\n" +
    "\n" +
    "        <div>\n" +
    "            <label>\n" +
    "                水平对齐：\n" +
    "\n" +
    "                <select ng-model=\"status._default.hAlign\">\n" +
    "                    <option ng-repeat=\"align in horizontalAlign\"\n" +
    "                            ng-selected=\"{{status.hAlignSelected === $index;}}\"\n" +
    "                            value=\"{{$index}}\">\n" +
    "                        {{align.text}}\n" +
    "                    </option>\n" +
    "                </select>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "            <label>\n" +
    "                垂直对齐：\n" +
    "\n" +
    "                <select ng-model=\"status._default.vAlign\">\n" +
    "                    <option ng-repeat=\"align in verticalAlign\"\n" +
    "                            ng-selected=\"{{status._default.vAlign === $index;}}\"\n" +
    "                            value=\"{{$index}}\">\n" +
    "                        {{align.text}}\n" +
    "                    </option>\n" +
    "                </select>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <fieldset>\n" +
    "        <legend>文本控制</legend>\n" +
    "\n" +
    "        <div>\n" +
    "            <label class=\"i-checks\">\n" +
    "                <input type=\"checkbox\"\n" +
    "                       ng-model=\"status._default.wraptext\">\n" +
    "                <i></i>\n" +
    "                自动换行\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "            <label class=\"i-checks\">\n" +
    "                <input type=\"checkbox\"\n" +
    "                       ng-model=\"status._default.merge\">\n" +
    "                <i></i>\n" +
    "                合并单元格\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </fieldset>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/border/index.html',
    "<div class=\"b-numberformat-box b-border-box-tabs b-row\">\n" +
    "    <div>\n" +
    "        <fieldset class=\"b-border-line-box\">\n" +
    "            <legend>线条</legend>\n" +
    "            <ul class=\"b-border-style-list\">\n" +
    "                <li ng-repeat=\"border in borderStyle\" ng-click=\"status._default.borderType = $index;\" ng-class=\"{'b-selected': status._default.borderType === $index}\">\n" +
    "                    <span style=\"border-bottom-width: {{border.width}}px; border-bottom-style: {{border.type}}; border-bottom-color: {{status._default._default.borderColor}}\">{{border.text}}</span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div>\n" +
    "                颜色：\n" +
    "                <div>\n" +
    "                    <button ng-model=\"status._default.borderColor\" b-attr-colorpicker type=\"button\" class=\"btn b-color-btn b-row\">\n" +
    "                        <div class=\"b-color-panel\">\n" +
    "                            <div ng-style=\"{backgroundColor: status._default.borderColor}\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"b-caret-wrap\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </div>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-column b-border-type-box\">\n" +
    "        <fieldset class=\"b-border-builtin-box\">\n" +
    "            <legend>预置</legend>\n" +
    "            <button ng-click=\"clearBorder('all');\">无</button>\n" +
    "            <button ng-click=\"builtinBorderChange('outer');\">外边框</button>\n" +
    "            <button ng-click=\"builtinBorderChange('inner');\">内部</button>\n" +
    "        </fieldset>\n" +
    "\n" +
    "        <fieldset class=\"b-border-ctrl-box\">\n" +
    "            <legend>边框</legend>\n" +
    "            <table>\n" +
    "                <tbody>\n" +
    "                    <tr>\n" +
    "                        <td valign=\"top\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.top != null}\" ng-click=\"borderChange('top');\">上</button>\n" +
    "                        </td>\n" +
    "                        <td colspan=\"3\" rowspan=\"3\" valign=\"middle\" align=\"center\">\n" +
    "                            <div class=\"b-border-preview\">\n" +
    "                                <div class=\"b-border-preview-cell b-row\">\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                </div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-top\" ng-style=\"status._default.borders.top\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-middle\" ng-style=\"status._default.borders.middle\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-bottom\" ng-style=\"status._default.borders.bottom\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-left\" ng-style=\"status._default.borders.left\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-center\" ng-style=\"status._default.borders.center\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-right\" ng-style=\"status._default.borders.right\"></div>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td valign=\"middle\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.middle != null}\" ng-click=\"borderChange('middle');\">内</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td valign=\"bottom\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.bottom != null}\" ng-click=\"borderChange('bottom');\">下</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td></td>\n" +
    "                        <td valign=\"top\" align=\"left\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.left != null}\" ng-click=\"borderChange('left');\">左</button>\n" +
    "                        </td>\n" +
    "                        <td valign=\"top\" align=\"center\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.center != null}\" ng-click=\"borderChange('center');\">内</button>\n" +
    "                        </td>\n" +
    "                        <td valign=\"top\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status._default.borders.right != null}\" ng-click=\"borderChange('right');\">右</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/fill/index.html',
    "<div class=\"b-numberformat-box b-fill-box-tabs\">\n" +
    "    背景色：\n" +
    "    <div>\n" +
    "        <button b-attr-colorpicker\n" +
    "                ng-model=\"status._default.fillColor\"\n" +
    "                type=\"button\"\n" +
    "                class=\"btn b-color-btn b-row\">\n" +
    "\n" +
    "            <div class=\"b-color-panel\">\n" +
    "                <div ng-style=\"{backgroundColor: status._default.fillColor}\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"b-caret-wrap\">\n" +
    "                <span class=\"caret\"></span>\n" +
    "            </div>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    预览：\n" +
    "    <div class=\"b-fill-preview-box\"\n" +
    "         ng-style=\"{backgroundColor: status._default.fillColor}\">\n" +
    "        微软卓越 AaBbCc\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/font/index.html',
    "<div class=\"b-numberformat-box b-font-tabs\">\n" +
    "    <table class=\"b-font-tabs-layout\">\n" +
    "        <tbody>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                字体：\n" +
    "                <div class=\"b-fontfamily-panel b-select-box\">\n" +
    "                    <input disabled\n" +
    "                           ng-model=\"status._default.font\">\n" +
    "\n" +
    "                    <select size=\"100\" ng-model=\"status._default.font\">\n" +
    "                        <option ng-repeat=\"font in fonts\"\n" +
    "                                ng-selected=\"font === status._default.font\"\n" +
    "                                value=\"{{font}}\">\n" +
    "                            {{font}}\n" +
    "                        </option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <td>\n" +
    "                字形：\n" +
    "                <div class=\"b-fontstyle-panel b-select-box\">\n" +
    "                    <input disabled\n" +
    "                           ng-model=\"fontStyle[status._default.fontstyle].text\">\n" +
    "\n" +
    "                    <select ng-model=\"status._default.fontstyle\" size=\"100\">\n" +
    "                        <option ng-repeat=\"style in fontStyle\"\n" +
    "                                ng-selected=\"status._default.fontstyle === $index\"\n" +
    "                                value=\"{{$index}}\">\n" +
    "                            {{style.text}}\n" +
    "                        </option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <td>\n" +
    "                字号：\n" +
    "                <div class=\"b-fontsize-panel b-select-box\">\n" +
    "                    <input disabled\n" +
    "                           ng-model=\"status._default.fontsize\">\n" +
    "\n" +
    "                    <select ng-model=\"status._default.fontsize\" size=\"100\">\n" +
    "                        <option ng-repeat=\"size in fontSize\"\n" +
    "                                ng-selected=\"size === status._default.fontsize\"\n" +
    "                                value=\"{{size}}\">\n" +
    "                            {{size}}\n" +
    "                        </option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                下划线：\n" +
    "                <div>\n" +
    "                    <select ng-model=\"status._default.underline\">\n" +
    "                        <option ng-repeat=\"line in underline\"\n" +
    "                                value=\"{{$index}}\">\n" +
    "                            {{line.text}}\n" +
    "                        </option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <td>\n" +
    "                颜色：\n" +
    "                <div>\n" +
    "                    <button b-attr-colorpicker\n" +
    "                            ng-model=\"status._default.color\"\n" +
    "                            type=\"button\"\n" +
    "                            class=\"btn b-color-btn b-row\">\n" +
    "                        <div class=\"b-color-panel\">\n" +
    "                            <div ng-style=\"{backgroundColor: status._default.color}\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"b-caret-wrap\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </div>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <td>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                特殊效果：\n" +
    "                <div>\n" +
    "                    <label class=\"i-checks\">\n" +
    "                        <input type=\"checkbox\"\n" +
    "                               ng-model=\"status._default.throughline\">\n" +
    "                        <i></i>\n" +
    "                        删除线\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <td colspan=\"2\">\n" +
    "                预览：\n" +
    "                <div class=\"b-font-preview-box b-column\">\n" +
    "                    <span ng-style=\"\n" +
    "                        {\n" +
    "                            'font-family': status._default.font,\n" +
    "                            'color': status._default.color,\n" +
    "                            'font-size': status._default.fontsize + 'px',\n" +
    "                            'font-style': (status._default.fontstyle == 1 || status._default.fontstyle == 3)? 'italic' : 'normal',\n" +
    "                            'font-weight': (status._default.fontstyle == 2 || status._default.fontstyle == 3)? '900' : 'normal',\n" +
    "                            'text-decoration': status._default.underline != 1 ? (status._default.throughline ? 'line-through' : 'none') : 'underline'\n" +
    "                        }\n" +
    "                    \">微软卓越 AaBbCc</span>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/index.html',
    "<div class=\"b-cell-format-box\">\n" +
    "    <tabset>\n" +
    "        <tab class=\"b-cellformat-tab\" heading=\"{{'dialog.cellformat.number' | translate}}\" active=\"status.tabSelected[0]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/number/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab class=\"b-cellformat-tab\" heading=\"{{'dialog.cellformat.alignment' | translate}}\" active=\"status.tabSelected[1]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/alignment/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab class=\"b-cellformat-tab\" heading=\"{{'dialog.cellformat.font' | translate}}\" active=\"status.tabSelected[2]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/font/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab class=\"b-cellformat-tab\" heading=\"{{'dialog.cellformat.border' | translate}}\" active=\"status.tabSelected[3]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/border/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab class=\"b-cellformat-tab\" heading=\"{{'dialog.cellformat.fill' | translate}}\" active=\"status.tabSelected[4]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/fill/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/accountant.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：\n" +
    "        <input type=\"number\"\n" +
    "            ng-model=\"status._default.precision\"\n" +
    "            min=\"0\"\n" +
    "            max=\"30\">\n" +
    "    </label\n" +
    "            >\n" +
    "    <label>\n" +
    "        货币符号(国家/地区)：\n" +
    "        <select ng-model=\"status._default.currency\">\n" +
    "            <option ng-repeat=\"symbol in currencyList\"\n" +
    "                    value=\"{{$index}}\" ng-selected=\"{{$index === status._default.currency}}\">\n" +
    "                {{symbol.text}}\n" +
    "            </option>\n" +
    "        </select>\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        会计格式可对一列数值进行货币符号和小数点对齐。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/currency.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：\n" +
    "        <input type=\"number\"\n" +
    "            ng-model=\"status._default.precision\"\n" +
    "            min=\"0\"\n" +
    "            max=\"30\">\n" +
    "    </label\n" +
    "            >\n" +
    "    <label>\n" +
    "        货币符号(国家/地区)：\n" +
    "        <select ng-model=\"status._default.currency\">\n" +
    "            <option ng-repeat=\"symbol in currencyList\"\n" +
    "                    value=\"{{$index}}\" ng-selected=\"{{$index === status._default.currency}}\">\n" +
    "                {{symbol.text}}\n" +
    "            </option>\n" +
    "        </select>\n" +
    "    </label>\n" +
    "\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        负数：\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in status.format.currency\"\n" +
    "                ng-style=\"{'color': format.color}\"\n" +
    "                ng-class=\"{'b-nubmerformat-preview-active': status._default.code.currency === $index}\"\n" +
    "                ng-click=\"status._default.code.currency=$index;\">\n" +
    "                {{format.text}}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/date.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        类型：\n" +
    "    </label>\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in status.format.date\" ng-class=\"{'b-nubmerformat-preview-active': status._default.code.date === $index}\" ng-click=\"status._default.code.date=$index;\">{{format.text}}</li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/fraction.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        类型：\n" +
    "    </label>\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in status.format.fraction\" ng-class=\"{'b-nubmerformat-preview-active': status._default.code.fraction === $index}\" ng-click=\"status._default.code.fraction=$index;\">{{format.text}}</li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/index.html',
    "<div class=\"b-numberformat-box\">\n" +
    "    <label>分类：</label>\n" +
    "    <tabset vertical=\"true\" class=\"b-numberformat-tabs b-row\">\n" +
    "        <tab heading=\"常规\"\n" +
    "             active=\"status.formatSelected[0]\">\n" +
    "            常规单元格格式不包含任何特定的数字格式。\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"数值\"\n" +
    "             active=\"status.formatSelected[1]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/numerical.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"货币\"\n" +
    "             active=\"status.formatSelected[2]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/currency.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"会计专用\"\n" +
    "             active=\"status.formatSelected[3]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/accountant.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"日期\"\n" +
    "             active=\"status.formatSelected[4]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/date.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"时间\"\n" +
    "             active=\"status.formatSelected[5]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/time.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"百分比\"\n" +
    "             active=\"status.formatSelected[6]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/percentage.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"分数\"\n" +
    "             active=\"status.formatSelected[7]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/fraction.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"科学计数法\"\n" +
    "             active=\"status.formatSelected[8]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/scientific.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"文本\"\n" +
    "             active=\"status.formatSelected[9]\">\n" +
    "            <ng-include b-include-replace\n" +
    "                        src=\"'template/toolbar/tabs/start/cell-format/number/text.html'\">\n" +
    "            </ng-include>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/numerical.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：\n" +
    "        <input type=\"number\"\n" +
    "               ng-model=\"status._default.precision\"\n" +
    "               min=\"0\"\n" +
    "               max=\"30\">\n" +
    "    </label>\n" +
    "\n" +
    "    <label class=\"i-checks\">\n" +
    "        <input type=\"checkbox\"\n" +
    "               ng-model=\"status._default.thousandth\">\n" +
    "        <i></i>\n" +
    "        使用千分位分隔符\n" +
    "    </label>\n" +
    "\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        负数：\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in status.format.number\"\n" +
    "                ng-style=\"{'color': format.color}\"\n" +
    "                ng-class=\"{'b-nubmerformat-preview-active': status._default.code.number === $index}\"\n" +
    "                ng-click=\"status._default.code.number=$index;\">\n" +
    "                {{format.text}}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/percentage.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" ng-model=\"status._default.precision\" min=\"0\" max=\"30\">\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/scientific.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" ng-model=\"status._default.precision\" min=\"0\" max=\"30\">\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/text.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "         文本单元格格式中，数字作为文本处理。单元格显示的内容与输入的内容完全一致。\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/time.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        类型：\n" +
    "    </label>\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in status.format.time\" ng-class=\"{'b-nubmerformat-preview-active': status._default.code.time === $index}\" ng-click=\"status._default.code.time=$index;\">{{format.text}}</li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/colorpicker.html',
    "<div class=\"btn-group\" dropdown on-toggle=\"toggle(open);\" is-open=\"status.isOpen\">\n" +
    "    <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': status.isOpen}\">\n" +
    "        <span class=\"b-icon b-icon-{{colortype}}\"></span>\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-alignments.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-column-left b-aligngroup-layout\">\n" +
    "        <div class=\"b-row-stretch\">\n" +
    "            <b-verticalalign onchange=\"handler.valignChange(status);\" value=\"{{status.vertical}}\"></b-verticalalign>\n" +
    "\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <b-pressbutton buttontype=\"wraptext\" text=\"{{'toolbar.buttonlabel.wraptext' | translate}}\" onchange=\"handler.pressChange('wraptext', status)\" pressed=\"status.wraptext\"></b-pressbutton>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"b-row-stretch\">\n" +
    "            <b-horizontalalign onchange=\"handler.alignChange(status);\" value=\"{{status.horizontal}}\"></b-horizontalalign>\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <b-mergeselect checked=\"status.merge\" onchange=\"handler.mergechange(mode, value);\"></b-mergeselect>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn b-btn b-open-cellformat-btn\" ng-click=\"handler.openCellFormat('alignment')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.alignments' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-cell.html',
    "<div class=\"toolbar-groups b-toolbar-cell-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.insertOpen=open;\">\n" +
    "                <div type=\"button\" class=\"btn b-insert-main-btn b-drop-button-bottom b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.insertOpen}\">\n" +
    "                    <span class=\"b-big-icon b-icon-insert\"></span>\n" +
    "                    {{'toolbar.buttonlabel.insert' | translate}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </div>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li ng-click=\"handler.insertRightCell();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-insert-cell-right b-mr5\"></span>\n" +
    "                            {{'toolbar.items.insert.rightcell' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.insertBottomCell();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-insert-cell-bottom b-mr5\"></span>\n" +
    "                            {{'toolbar.items.insert.bottomcell' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.insertRow();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-insert-row b-mr5\"></span>\n" +
    "                            {{'toolbar.items.insert.row' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.insertColumn()\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-insert-column b-mr5\"></span>\n" +
    "                            {{'toolbar.items.insert.column' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.insertSheet();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-insert-sheet b-mr5\"></span>\n" +
    "                            {{'toolbar.items.insert.sheet' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "            <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.cellformatOpen=open;\">\n" +
    "                <div type=\"button\" class=\"btn b-cellformat-main-btn b-drop-button-bottom b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.cellformatOpen}\">\n" +
    "                    <span class=\"b-big-icon2 b-icon-cellformat\"></span>\n" +
    "                    {{'toolbar.buttonlabel.cellformat' | translate}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </div>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li ng-click=\"handler.setRowHeight();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-rowheight b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.rowheight' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.setBestfitRowHeight();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.bestfitrowheight' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.setColumnWidth();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-columnwidth b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.columnwidth' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.setBestfitColumnWidth();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.bestfitcolumnwidth' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.setDefaultColumnWidth();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.defaultcolumnwidth' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.hideRow();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.hiderow' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.hideColumn();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.hidecolumn' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.showRow();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.showrow' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.showColumn();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.cellformat.showcolumn' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.cell' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-cellstyles.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <b-cellstyles onselect=\"handler.selectCellstyle(id, isBuiltin);\"></b-cellstyles>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.style' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-clipboard.html',
    "<div class=\"toolbar-groups b-toolbar-clipboard-groups\">\n" +
    "    <div class=\"b-toolbar-clipboard-button-wrap\">\n" +
    "\n" +
    "        <!--<div>-->\n" +
    "            <!--&lt;!&ndash; 粘贴按钮 &ndash;&gt;-->\n" +
    "            <!--<b-pastebtn></b-pastebtn>-->\n" +
    "        <!--</div>-->\n" +
    "\n" +
    "        <!-- 复制 剪切 -->\n" +
    "        <div class=\"b-toolbar-clipboard-right-wrap\">\n" +
    "            <b-cutbtn></b-cutbtn>\n" +
    "            <b-copybtn></b-copybtn>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.clipboard' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-fonts.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-column b-fontsgroup-layout\">\n" +
    "        <div class=\"b-row\">\n" +
    "            <!-- font family -->\n" +
    "            <b-fontselect classname=\"b-fontfamily-select\" change=\"handler.fontSelect(value);\" isminor=\"status.isMinor\" ismajor=\"status.isMajor\" select-value=\"status.font\" major=\"initValue.major\" minor=\"initValue.minor\" values=\"initValue.fontfamily\"></b-fontselect>\n" +
    "            <!-- font size -->\n" +
    "            <b-inputselect classname=\"b-fontsize-select\" change=\"handler.fontsizeSelect(value);\" only-number=\"true\" select-value=\"status.fontsize\" values=\"initValue.fontsize\"></b-inputselect>\n" +
    "        </div>\n" +
    "        <div class=\"b-toolbar-fonts-biu-wrap\">\n" +
    "            <!-- BIU -->\n" +
    "            <b-pressbutton buttontype=\"bold\" onchange=\"handler.pressChange('bold', status)\" pressed=\"status.bold\"></b-pressbutton>\n" +
    "            <b-pressbutton buttontype=\"italic\" onchange=\"handler.pressChange('italic', status)\" pressed=\"status.italic\"></b-pressbutton>\n" +
    "\n" +
    "            <b-underlineselect checked=\"status.underline\" onchange=\"handler.underlineChange(mode);\"></b-underlineselect>\n" +
    "\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <!-- border -->\n" +
    "            <div class=\"btn-group\" dropdown on-toggle=\"btnState.borderOpen=open;\">\n" +
    "                <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.borderOpen}\">\n" +
    "                    <span class=\"b-icon b-icon-border\"></span>\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu b-border-menu\" role=\"menu\">\n" +
    "                    <li ng-click=\"handler.borderSelect('bottom');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-bottom b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.bottom' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"handler.borderSelect('top');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-top b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.top' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"handler.borderSelect('left');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-left b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.left' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"handler.borderSelect('right');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-right b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.right' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.borderSelect('none');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.none' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"handler.borderSelect('all');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-all b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.all' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ng-click=\"handler.borderSelect('outer');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-outer b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.outer' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.borderSelect('outermedium');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-border-outer-medium b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.outer-medium' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.borderSelect('bottommedium');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-border-bottom-mediumn b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.outer-bottom-medium' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.borderSelect('top-bottom');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-border-outer-top-bottom b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.outer-top-bottom' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.borderSelect('top-bottom-medium');\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2 b-icon-border-outer-top-bottom-medium b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.outer-top-bottom-medium' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"divider\"></li>\n" +
    "\n" +
    "                    <li class=\"b-submenu-item\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <div class=\"b-border-color-icon-wrap\">\n" +
    "                                <span class=\"b-icon b-ico-border-color b-mr5\"></span>\n" +
    "                                <div class=\"b-border-color-tips\" ng-style=\"{'background': border.color}\"></div>\n" +
    "                            </div>\n" +
    "                            {{'toolbar.items.border.linecolor' | translate}}\n" +
    "                            <span class=\"b-arrow-float b-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                        <ul class=\"dropdown-menu b-submenu b-show-color-menu\" b-submenu>\n" +
    "                            <li role=\"presentation\" class=\"b-show-color-item\">\n" +
    "                                <b-showcolor oncolorchange=\"handler.borderColor(color);\"></b-showcolor>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"b-submenu-item\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-empty b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.linestyle' | translate}}\n" +
    "                            <span class=\"b-arrow-float b-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                        <ul class=\"dropdown-menu b-border-submenu b-submenu\" b-submenu>\n" +
    "                            <li class=\"b-border-linestyle-li\" ng-mousedown=\"handler.borderStyle(0)\">\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\" ng-class=\"{'b-item-selected': borderStyle[0] === border.style}\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li class=\"b-border-linestyle-li\" ng-mousedown=\"handler.borderStyle(1)\">\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\" ng-class=\"{'b-item-selected': borderStyle[1] === border.style}\">\n" +
    "                                    <div style=\"width: 70px; height: 0; border-top: 1px solid black;\"></div>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                            <li class=\"b-border-linestyle-li\" ng-mousedown=\"handler.borderStyle(2)\">\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\" ng-class=\"{'b-item-selected': borderStyle[2] === border.style}\">\n" +
    "                                    <div style=\"width: 70px; height: 0; border-top: 1px dashed black;\"></div>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                            <li class=\"b-border-linestyle-li\" ng-mousedown=\"handler.borderStyle(3)\">\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\" ng-class=\"{'b-item-selected': borderStyle[3] === border.style}\">\n" +
    "                                    <div style=\"width: 70px; height: 0; border-top: 1px dotted black;\"></div>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <b-colorpicker oncolorchange=\"handler.colorChange('background', color);\" value=\"{{}}\" colortype=\"bgcolor\"></b-colorpicker>\n" +
    "            <b-colorpicker oncolorchange=\"handler.colorChange('foreground', color);\" colortype=\"color\"></b-colorpicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn b-btn b-open-cellformat-btn\" ng-click=\"handler.openCellFormat('font')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.fonts' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-format.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <b-numberformat onselect=\"handler.formatSelect(code);\"></b-numberformat>\n" +
    "        </div>\n" +
    "        <div class=\"b-column\">\n" +
    "            <a class=\"btn b-btn\"\n" +
    "               role=\"button\"\n" +
    "               data-name=\"inc-precision\"\n" +
    "               ng-click=\"handler.btnclick($event);\">\n" +
    "\n" +
    "                <span class=\"b-icon b-icon-inc-precision\"></span>\n" +
    "\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\"\n" +
    "               role=\"button\"\n" +
    "               data-name=\"dec-precision\"\n" +
    "               ng-click=\"handler.btnclick($event);\">\n" +
    "\n" +
    "                <span class=\"b-icon b-icon-dec-precision\"></span>\n" +
    "\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\"\n" +
    "               role=\"button\"\n" +
    "               data-name=\"thousandth\"\n" +
    "               ng-click=\"handler.btnclick($event);\">\n" +
    "\n" +
    "                <span class=\"b-icon b-icon-thousands\"></span>\n" +
    "\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\"\n" +
    "            class=\"btn b-btn b-open-cellformat-btn\"\n" +
    "            ng-click=\"handler.openCellFormat('numberformat')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.number' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-undo.html',
    "<div class=\"toolbar-groups\">\n" +
    "    <div class=\"b-column b-undogroup-layout\">\n" +
    "        <div>\n" +
    "            <a b-tooltip=\"toolbar.tooltip.undo\" class=\"btn b-btn\" role=\"button\" data-name=\"undo\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-undo\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <a b-tooltip=\"toolbar.tooltip.redo\" class=\"btn b-btn\" role=\"button\" data-name=\"redo\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-redo\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.undo' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/index.html',
    "<div class=\"toolbar-tabs-content\">\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-undo.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-clipboard.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-fonts.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-alignments.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-format.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-cellstyles.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-cell.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/view/group-display.html',
    "<div class=\"toolbar-groups b-toolbar-cell-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <label class=\"b-label\">\n" +
    "                <input type=\"checkbox\" ng-model=\"isShowGridline\" ng-change=\"handler.toggleGridline();\">\n" +
    "                <span>\n" +
    "                    {{'toolbar.items.display.gridline' | translate}}\n" +
    "                </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"b-label\">\n" +
    "                <input type=\"checkbox\" ng-model=\"isShowHeader\" ng-change=\"handler.toggleHeader();\">\n" +
    "                <span>\n" +
    "                    {{'toolbar.items.display.header' | translate}}\n" +
    "                </span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.display' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/view/group-window.html',
    "<div class=\"toolbar-groups b-toolbar-window-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.insertOpen=open;\">\n" +
    "                <div type=\"button\" class=\"btn b-frozen-main-btn b-drop-button-bottom b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.insertOpen}\">\n" +
    "                    <span class=\"b-big-icon2 b-icon-frozen\"></span>\n" +
    "                    {{'toolbar.buttonlabel.frozen' | translate}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </div>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li ng-if=\"!hasPane\" ng-click=\"handler.frozen();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon2 b-icon-frozen b-mr5\"></span>\n" +
    "                            {{'toolbar.items.window.frozen' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-if=\"hasPane\" ng-click=\"handler.cancelFrozen();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon2 b-icon-frozen b-mr5\"></span>\n" +
    "                            {{'toolbar.items.window.cancel-frozen' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.frozenRow();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon2 b-icon-frozen-first-row b-mr5\"></span>\n" +
    "                            {{'toolbar.items.window.frozen-first-row' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li ng-click=\"handler.frozenColumn();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon2 b-icon-frozen-first-column b-mr5\"></span>\n" +
    "                            {{'toolbar.items.window.frozen-first-column' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-group-label\">\n" +
    "        {{'toolbar.grouplabel.window' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/view/index.html',
    "<div class=\"toolbar-tabs-content\">\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/view/group-display.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include b-include-replace class=\"b-tabs-page\" src=\"'template/toolbar/tabs/view/group-window.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/cellstyles.html',
    "<div class=\"b-drappanel-wrap\">\n" +
    "    <div class=\"b-drappanel b-row\">\n" +
    "        <div class=\"b-drappanel-box\">\n" +
    "            <div class=\"b-drappanel-content b-row b-row-left b-wrap\">\n" +
    "                <div ng-click=\"select(style.id, style.builtin);\" ng-repeat=\"style in uncategoryBuiltinStyles\" class=\"b-drappanel-item\">\n" +
    "                    <div class=\"b-drappanel-item-inside\" style=\"{{style.styleText}}\">\n" +
    "                        {{style.name}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"b-ctrl-button-group b-column\">\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-class=\"{disabled: !allowUp}\" ng-click=\"pageUp();\">\n" +
    "                <span class=\"b-arrow-up\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-class=\"{disabled: !allowDown}\" ng-click=\"pageDown();\">\n" +
    "                <span class=\"b-arrow-down\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-click=\"openPanel($event);\">\n" +
    "                <span class=\"b-arrow-open\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"dropdown-menu b-drappanel-menu\" role=\"menu\">\n" +
    "        <div class=\"b-drappanel-menu-bed\" ng-click=\"checkPop($event);\">\n" +
    "            <div ng-repeat=\"categoryStyle in builtinStyles\" class=\"b-drappanel-menu-box\">\n" +
    "                <label class=\"b-cellstyle-category-label\">\n" +
    "                    {{categoryStyle[0].categoryName}}\n" +
    "                </label>\n" +
    "                <div class=\"b-droppanel-menu-item-wrap b-row\">\n" +
    "                    <div ng-click=\"select(style.id, style.builtin);\" isitem ng-repeat=\"style in categoryStyle\" class=\"b-drappanel-menu-item\">\n" +
    "                        <div class=\"b-drappanel-menu-item-inside\" isitem style=\"{{style.styleText}}\">\n" +
    "                            {{style.name}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/contextmenu.html',
    "<div class=\"b-contextmenu-mask\" tabindex=\"-1\">\n" +
    "    <div class=\"b-contextmenu\">\n" +
    "        <!-- 单元格菜单 start -->\n" +
    "        <ul ng-if='type === \"cell\"' class=\"show dropdown-menu b-cell-contextmenu\" role=\"menu\">\n" +
    "            <li class=\"b-contextmenu-item\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.insert.main' | translate}}\n" +
    "                    <span class=\"b-arrow-float b-arrow-right\"></span>\n" +
    "                </a>\n" +
    "                <ul class=\"dropdown-menu b-submenu\" b-contextsubmenu>\n" +
    "                    <li class=\"b-contextmenu-item\" ng-click=\"handler.insertRight();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                            {{'contextmenu.insert.insert-right' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"b-contextmenu-item\" ng-click=\"handler.insertBottom();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                            {{'contextmenu.insert.insert-bottom' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"b-contextmenu-item\" ng-click=\"handler.insertRow();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                            {{'contextmenu.insert.insert-row' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"b-contextmenu-item\" ng-click=\"handler.insertColumn();\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                            {{'contextmenu.insert.insert-column' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.clearContent();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.clearcontent' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider\"></li>\n" +
    "\n" +
    "            <li ng-if=\"!focusHasComment\" class=\"b-contextmenu-item\" ng-click=\"handler.insertComment();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-comment b-mr5\"></span>\n" +
    "                    {{'contextmenu.comment' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"focusHasComment\" class=\"b-contextmenu-item\" ng-click=\"handler.insertComment();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-comment b-mr5\"></span>\n" +
    "                    {{'contextmenu.edit-comment' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"hasComment\" class=\"b-contextmenu-item\" ng-click=\"handler.removeComment();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-remove-comment b-mr5\"></span>\n" +
    "                    {{'contextmenu.remove-comment' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider\"></li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.cellformat();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-cellformat b-mr5\"></span>\n" +
    "                    {{'contextmenu.cellformat' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"!focusHasHyperlink\" class=\"b-contextmenu-item\" ng-click=\"handler.insertHyperlink();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-hyperlink b-mr5\"></span>\n" +
    "                    {{'contextmenu.hyperlink' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"focusHasHyperlink\" class=\"b-contextmenu-item\" ng-click=\"handler.insertHyperlink();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-hyperlink b-mr5\"></span>\n" +
    "                    {{'contextmenu.edit-hyperlink' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"hasHyperlink\" class=\"b-contextmenu-item\" ng-click=\"handler.removeHyperlink();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-remove-hyperlink b-mr5\"></span>\n" +
    "                    {{'contextmenu.remove-hyperlink' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <!-- 单元格菜单 end -->\n" +
    "\n" +
    "        <!-- 列菜单 start -->\n" +
    "        <ul ng-if='type === \"column\"' class=\"show dropdown-menu b-cell-contextmenu\" role=\"menu\">\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.insertColumn();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.insert.insert-column' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.clearContent();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.clearcontent' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider\"></li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.cellformat();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-cellformat b-mr5\"></span>\n" +
    "                    {{'contextmenu.cellformat' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.setColumnWidth();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.columnwidth' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.hideColumn();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.hide' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.showColumn();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.cancel-hide' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <!-- 列菜单 end -->\n" +
    "\n" +
    "        <!-- 行菜单 start -->\n" +
    "        <ul ng-if='type === \"row\"' class=\"show dropdown-menu b-cell-contextmenu\" role=\"menu\">\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.insertRow();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.insert.insert-row' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.clearContent();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.clearcontent' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider\"></li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.cellformat();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-contextmenu-cellformat b-mr5\"></span>\n" +
    "                    {{'contextmenu.cellformat' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.setRowHeight();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.rowheight' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.hideRow();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.hide' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"b-contextmenu-item\" ng-click=\"handler.showRow();\">\n" +
    "                <a class=\"b-row\">\n" +
    "                    <span class=\"b-icon2  b-icon-none b-mr5\"></span>\n" +
    "                    {{'contextmenu.cancel-hide' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <!-- 行菜单 end -->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/copybtn.html',
    "<a class=\"btn b-btn\" role=\"button\" data-name=\"copy\" ng-click=\"handler.btnclick($event);\">\n" +
    "    <span class=\"b-icon b-icon-copy\"></span>\n" +
    "    {{'toolbar.buttonlabel.copy' | translate}}\n" +
    "</a>"
  );


  $templateCache.put('template/toolbar/widget/cutbtn.html',
    "<a class=\"btn b-btn\" role=\"button\" data-name=\"cut\" ng-click=\"handler.btnclick($event);\">\n" +
    "    <span class=\"b-icon b-icon-cut\"></span>\n" +
    "    {{'toolbar.buttonlabel.cut' | translate}}\n" +
    "</a>"
  );


  $templateCache.put('template/toolbar/widget/fontselect.html',
    "<div class=\"b-input-select {{classname}}\" ng-class=\"{'b-open': isOpen}\">\n" +
    "    <input ng-if=\"ismajor\" class=\"b-input-select-input\" value=\"标题字体({{major}})\">\n" +
    "    <input ng-if=\"isminor\" class=\"b-input-select-input\" value=\"正文字体({{minor}})\">\n" +
    "    <input ng-if=\"!isminor && !ismajor\" ng-model=\"selectValue\" class=\"b-input-select-input\">\n" +
    "    <div class=\"btn-group\" dropdown on-toggle=\"toggle(open)\">\n" +
    "        <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li data-type=\"major\" data-value=\"标题字体({{major}})\" class=\"b-input-select-item\">\n" +
    "                <a style=\"font-family: {{major}}\">标题字体({{major}})</a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li data-type=\"minor\" data-value=\"正文字体({{minor}})\" class=\"b-input-select-item\">\n" +
    "                <a style=\"font-family: {{minor}}\">正文字体({{minor}})</a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider\"></li>\n" +
    "\n" +
    "            <li ng-repeat=\"font in values\" data-value=\"{{font}}\" class=\"b-input-select-item\">\n" +
    "                <a style='font-family: {{font}};'>{{font}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/horizontalalign.html',
    "<div>\n" +
    "    <!-- horizontal alignments -->\n" +
    "    <div class=\"btn-group\">\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'left'\" ng-click=\"alignChange('left');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-left\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'center'\" ng-click=\"alignChange('center');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-center\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'right'\" ng-click=\"alignChange('right');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-right\"></span>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/inputselect.html',
    "<div class=\"b-input-select {{classname}}\" ng-class=\"{'b-open': isOpen}\">\n" +
    "    <input ng-model=\"selectValue\" class=\"b-input-select-input\">\n" +
    "    <div class=\"btn-group\" dropdown on-toggle=\"toggle(open)\">\n" +
    "        <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li ng-repeat=\"font in values\" data-value=\"{{font}}\" class=\"b-input-select-item\">\n" +
    "                <a style='font-family: {{font}};'>{{font}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/mergecell.html',
    "<div class=\"b-button-select b-mergecell-selector\" ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "    <a class=\"btn b-btn b-mergeandcenter-button\" role=\"button\" ng-class=\"{'b-open': isOpen || isSelected}\" ng-click=\"changeModel('center');\">\n" +
    "        <span class=\"b-icon2 b-icon-merge-center\"></span>\n" +
    "        {{'toolbar.buttonlabel.merge' | translate}}\n" +
    "    </a>\n" +
    "    <div class=\"btn-group\" dropdown on-toggle=\"isOpen=open;\">\n" +
    "        <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('center');\">\n" +
    "                    <span class=\"b-icon2 b-icon-merge-center b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.center' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('across');\">\n" +
    "                    <span class=\"b-icon2 b-icon-cross-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.across' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('merge');\">\n" +
    "                    <span class=\"b-icon2 b-icon-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.merge' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('cancel');\">\n" +
    "                    <span class=\"b-icon2 b-icon-cancel-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.cancel' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/namedefine.html',
    "<div class=\"b-input-select b-namedefine-wrap\">\n" +
    "    <input class=\"b-input-select-input\">\n" +
    "    <div class=\"btn-group\" dropdown>\n" +
    "        <button type=\"button\" class=\"btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li ng-repeat=\"name in names\" data-value=\"{{name}}\" class=\"b-input-select-item\">\n" +
    "                <a>{{name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/numberformat.html',
    "<div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.numberOpen=open;\">\n" +
    "    <div type=\"button\" class=\"btn b-drop-button-bottom b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.numberOpen}\">\n" +
    "        <span class=\"b-big-icon b-icon-number\"></span>\n" +
    "        {{'toolbar.buttonlabel.numberformat' | translate}}\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </div>\n" +
    "    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "        <li ng-repeat=\"type in types\" ng-click=\"select($index)\">\n" +
    "            <a class=\"b-row\">\n" +
    "                <span class=\"b-big-icon b-icon-{{type}} b-mr5\"></span>\n" +
    "                {{'toolbar.items.format.' + type | translate}}\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/pastebtn.html',
    "<a class=\"btn b-btn b-column\"\n" +
    "   role=\"button\"\n" +
    "   data-name=\"paste\">\n" +
    "    <span class=\"b-big-icon b-icon-paste\"></span>\n" +
    "\n" +
    "    <div>\n" +
    "        {{'toolbar.buttonlabel.paste' | translate}}\n" +
    "    </div>\n" +
    "</a>\n"
  );


  $templateCache.put('template/toolbar/widget/pressbutton.html',
    "<button type=\"button\" class=\"btn b-btn\" ng-model=\"pressed\" ng-click=\"toggle();\" btn-checkbox>\n" +
    "    <span class=\"b-icon b-icon-{{type}}\"></span>\n" +
    "    {{text}}\n" +
    "</button>"
  );


  $templateCache.put('template/toolbar/widget/showcolor.html',
    "<div class=\"b-show-color-bed\">\n" +
    "    <input style=\"display: none;\">\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/underlineselect.html',
    "<div class=\"b-button-select b-underline-selector\" ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "    <a ng-if=\"current === 'single'\" class=\"btn b-btn b-underline-button\" role=\"button\" ng-class=\"{'b-open': isOpen || isSelected}\" ng-click=\"changeModel('single');\">\n" +
    "        <span class=\"b-icon b-icon-underline-single\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"current === 'double'\" class=\"btn b-btn b-underline-button\" role=\"button\" ng-class=\"{'b-open': isOpen || isSelected}\" ng-click=\"changeModel('double');\">\n" +
    "        <span class=\"b-icon b-icon-underline-double\"></span>\n" +
    "    </a>\n" +
    "    <div class=\"btn-group\" dropdown on-toggle=\"isOpen=open;\">\n" +
    "        <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('single');\">\n" +
    "                    <span class=\"b-icon b-icon-underline-single b-mr5\"></span>\n" +
    "                    {{'toolbar.items.underline.single' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('double');\">\n" +
    "                    <span class=\"b-icon b-icon-underline-double b-mr5\"></span>\n" +
    "                    {{'toolbar.items.underline.double' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/verticalalign.html',
    "<div>\n" +
    "    <!-- vertical alignments -->\n" +
    "    <div class=\"btn-group\">\n" +
    "        <label class=\"btn b-btn\" ng-model=\"__initValue\" btn-radio=\"'top'\" ng-click=\"alignChange('top');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-top\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"__initValue\" btn-radio=\"'middle'\" ng-click=\"alignChange('middle');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-middle\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"__initValue\" btn-radio=\"'bottom'\" ng-click=\"alignChange('bottom');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-bottom\"></span>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/widget/btable-preview.html',
    "<div class=\"b-btable-box b-btable-preview-box\">\n" +
    "    <div class=\"b-header\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-body\">\n" +
    "        <div class=\"btable-container\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-footer\">\n" +
    "        <div class=\"b-sheet-list\">\n" +
    "            <div b-sheetlist></div>\n" +
    "        </div>\n" +
    "        <div class=\"b-status-bar\">\n" +
    "            就绪\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <ng-include src=\"'template/dialogs/cell-format.html'\"></ng-include>\n" +
    "</div>"
  );


  $templateCache.put('template/widget/btable.html',
    "<div class=\"b-btable-box\">\n" +
    "    <div class=\"b-header\"\n" +
    "         b-toolbar>\n" +
    "        <div class=\"b-toolbar\"\n" +
    "             ng-controller=\"ToolbarBasicController\">\n" +
    "\n" +
    "            <b-filepanel filestatus=\"fileStatus\" url=\"fileTemplateSrc\"></b-filepanel>\n" +
    "\n" +
    "            <tabset class=\"b-toolbar-tabs-head\">\n" +
    "                <tab class=\"b-toolbar-tabs-label b-toolbar-file-tab\"\n" +
    "                     disabled=\"true\"\n" +
    "                     ng-mousedown=\"controlClick();\"\n" +
    "                     heading=\"{{'toolbar.tabs.file' | translate}}\">\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab class=\"b-toolbar-tabs-label\"\n" +
    "                     heading=\"{{'toolbar.tabs.start' | translate}}\"\n" +
    "                     active=\"true\">\n" +
    "                    <ng-include b-include-replace src=\"'template/toolbar/tabs/start/index.html'\"></ng-include>\n" +
    "                </tab>\n" +
    "\n" +
    "                <!--<tab class=\"b-toolbar-tabs-label\"-->\n" +
    "                     <!--heading=\"{{'toolbar.tabs.insert' | translate}}\">-->\n" +
    "                <!--</tab>-->\n" +
    "\n" +
    "                <!--<tab class=\"b-toolbar-tabs-label\"-->\n" +
    "                     <!--heading=\"{{'toolbar.tabs.layout' | translate}}\">-->\n" +
    "                <!--</tab>-->\n" +
    "\n" +
    "                <!--<tab class=\"b-toolbar-tabs-label\"-->\n" +
    "                     <!--heading=\"{{'toolbar.tabs.formula' | translate}}\">-->\n" +
    "                <!--</tab>-->\n" +
    "\n" +
    "                <!--<tab class=\"b-toolbar-tabs-label\"-->\n" +
    "                     <!--heading=\"{{'toolbar.tabs.data' | translate}}\">-->\n" +
    "                <!--</tab>-->\n" +
    "\n" +
    "                <!--<tab class=\"b-toolbar-tabs-label\"-->\n" +
    "                     <!--heading=\"{{'toolbar.tabs.review' | translate}}\">-->\n" +
    "                <!--</tab>-->\n" +
    "\n" +
    "                <tab class=\"b-toolbar-tabs-label\"\n" +
    "                     heading=\"{{'toolbar.tabs.view' | translate}}\">\n" +
    "                    <ng-include b-include-replace src=\"'template/toolbar/tabs/view/index.html'\"></ng-include>\n" +
    "                </tab>\n" +
    "            </tabset>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"b-row b-input-area\">\n" +
    "            <div class=\"b-btable-ctrl-btns\">\n" +
    "                <b-namedefine onchange=\"handler.namechange();\"></b-namedefine>\n" +
    "            </div>\n" +
    "            <div id=\"btableOuterInput\" spellcheck=\"false\" contenteditable=\"true\" class=\"btable-input\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-body\">\n" +
    "        <div class=\"btable-container\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-footer\">\n" +
    "        <div class=\"b-sheet-list\">\n" +
    "            <div b-sheetlist></div>\n" +
    "        </div>\n" +
    "        <div class=\"b-status-bar\">\n" +
    "            就绪\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-include src=\"'template/dialogs/cell-format.html'\"></ng-include>\n" +
    "    <b-contextmenu></b-contextmenu>\n" +
    "    <b-comment></b-comment>\n" +
    "    <b-hyperlink></b-hyperlink>\n" +
    "</div>"
  );


  $templateCache.put('template/widget/error.html',
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">错误提示</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    {{errorMsg}}\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <input type=\"text\" style=\"width: 0; height: 0; overflow: hidden; opacity: 0; margin-right: 100px;\" id=\"errorModalHiddenInput\">\n" +
    "    <button class=\"btn btn-primary\" id=\"errorModalBtn\" type=\"button\" ng-click=\"close();\">OK</button>\n" +
    "</div>"
  );


  $templateCache.put('template/widget/sheetlist.html',
    "<div class=\"b-row\">\n" +
    "    <div class=\"b-sl-scrollbtn-wrap b-row\">\n" +
    "        <button class=\"b-sl-scrollbtn b-sl-leftscroll-btn\"\n" +
    "                ng-mousedown=\"leftClick($event);\"\n" +
    "                ng-class=\"{'b-disabled': !status.leftMore}\"\n" +
    "                ng-disabled=\"!status.leftMore\">\n" +
    "            <span class=\"b-arrow-icon b-big-arrow-left\"></span>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"b-sl-scrollbtn b-sl-rightscroll-btn\"\n" +
    "                ng-class=\"{'b-disabled': !status.rightMore}\"\n" +
    "                ng-mousedown=\"rightClick($event);\"\n" +
    "                ng-disabled=\"!status.rightMore\">\n" +
    "            <span class=\"b-arrow-icon b-big-arrow-right\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"b-sl-sheets b-row\">\n" +
    "\n" +
    "        <button class=\"b-sl-more-button\"\n" +
    "                ng-mousedown=\"leftClick($event);\"\n" +
    "                ng-class=\"{'b-disabled': !status.leftMore}\"\n" +
    "                ng-disabled=\"!status.leftMore\">\n" +
    "            ...\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"b-sl-list-wrap\">\n" +
    "            <ul class=\"b-sl-list\"></ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"b-sl-list-shadow-wrap\">\n" +
    "            <ul class=\"b-sl-shadow-list\">\n" +
    "                <!-- 注意：本段代码交由directive内部刷新。\n" +
    "                <li ng-repeat=\"sheet in sheets\"\n" +
    "                    ng-mousedown=\"itemClick($event, $index);\"\n" +
    "                    class=\"b-sl-item\"\n" +
    "                    ng-class=\"{'b-active': $index === status.selected}\">\n" +
    "                    <div class=\"b-sl-item-top-space\"></div>\n" +
    "\n" +
    "                    <span class=\"b-sl-item-label\">{{sheet}}</span>\n" +
    "\n" +
    "                    <div class=\"b-sl-item-bottom-space\"></div>\n" +
    "                </li>\n" +
    "                -->\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <button class=\"b-sl-more-button\"\n" +
    "                ng-class=\"{'b-disabled': !status.rightMore}\"\n" +
    "                ng-mousedown=\"rightClick($event);\"\n" +
    "                ng-disabled=\"!status.rightMore\">\n" +
    "            ...\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"b-sl-add-btn\" ng-mousedown=\"addSheet($event);\">+</div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);

var _zhCN = {
    "toolbar": {
        "tabs": {
            "file": "文件",
            "start": "开始",
            "insert": "插入",
            "layout": "页面布局",
            "formula": "公式",
            "data": "数据",
            "review": "审阅",
            "view": "视图"
        },
        "grouplabel" : {
            "undo": "撤销",
            "clipboard": "剪贴板",
            "fonts": "字体",
            "alignments": "对齐方式",
            "number": "数字",
            "style": "样式",
            "cell": "单元格",
            "display": "显示",
            "window": "窗口"
        },
        "buttonlabel": {
            "paste": "粘贴",
            "cut": "剪切",
            "copy": "复制",
            "wraptext": "自动换行",
            "merge": "合并后居中",
            "numberformat": "数字格式",
            "insert": "插入",
            "cellformat": "格式",
            "frozen": "冻结窗格"
        },
        "items": {
            "border": {
                "top": "上框线",
                "bottom": "下框线",
                "left": "左框线",
                "right": "右框线",
                "none": "无框线",
                "all": "所有框线",
                "outer": "外侧框线",
                "outer-medium": "外粗框线",
                "outer-bottom-medium": "粗底框线",
                "outer-top-bottom": "上下框线",
                "outer-top-bottom-medium": "上框线和粗下框线",

                "linecolor":  "线条颜色",
                "linestyle": "线形"
            },
            "merge": {
                "center": "合并后居中",
                "across": "跨越合并",
                "merge": "合并单元格",
                "cancel": "取消单元格合并"
            },
            "underline": {
                "single": "下划线",
                "double": "双下划线"
            },
            "format": {
                "general": "常规",
                "number": "数字",
                "currency": "货币",
                "accountant": "会计专用",
                "shortdate": "短日期",
                "longdate": "长日期",
                "time": "时间",
                "percentage": "百分比",
                "fraction": "分数",
                "scientific": "科学记数",
                "text": "文本"
            },
            "insert": {
                "rightcell": "插入单元格，活动单元格右移",
                'bottomcell': "插入单元格，活动单元格下移",
                "row": "插入工作表行",
                "column": "插入工作表列",
                "sheet": "插入工作表"
            },
            "cellformat": {
                "rowheight": "行高...",
                "bestfitrowheight": "自动调整行高",
                "columnwidth": "列宽...",
                "bestfitcolumnwidth": "自动调整列宽",
                "defaultcolumnwidth": "默认列宽...",
                "hiderow": "隐藏行",
                "hidecolumn": "隐藏列",
                "showrow": "取消隐藏行",
                "showcolumn": "取消隐藏列"
            },

            "display": {
                "gridline": "网格线",
                "header": "标题"
            },

            "window": {
                "frozen": "冻结拆分窗格",
                "frozen-first-row": "冻结首行",
                "frozen-first-column": "冻结首列",
                "cancel-frozen": "取消冻结窗格"
            }
        },

        "colorpicker": {
            "more": "更多",
            "less": "收起",
            "cancel": "取消",
            "choose": "选择"
        },

        "tooltip": {
            "undo": "撤销",
            "redo": "重做"
        }
    },
    "dialog": {
        "cellformat": {
            "number": "数字",
            "alignment": "对齐",
            "font": "字体",
            "border": "边框",
            "fill": "填充"
        },
        "title": {
            "cellformat": "设置单元格格式"
        }
    },

    "common": {
        "ok": "确认",
        "cancel": "取消"
    },

    "contextmenu": {
        "insert": {
            "main": "插入",
            "insert-right": "插入单元格，活动单元格右移",
            "insert-bottom": "插入单元格，活动单元格下移",
            "insert-row": "插入行",
            "insert-column": "插入列",
        },
        "clearcontent": "清除内容",
        "comment": "插入批注 ...",
        "edit-comment": "编辑批注 ...",
        "remove-comment": "删除批注",
        "cellformat": "设置单元格格式 ...",
        "hyperlink": "超链接 ...",
        "edit-hyperlink": "编辑超链接 ...",
        "remove-hyperlink": "取消超链接",
        "columnwidth": "列宽 ...",
        "rowheight": "行高 ...",
        "hide": "隐藏",
        "cancel-hide": "取消隐藏"
    }
};
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bIncludeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function ($scope, $ele) {
            $ele.replaceWith($ele.children());
        }
    };
});
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bColorpicker', ['$translate', function ($translate) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&oncolorchange'
        },
        templateUrl: 'template/toolbar/tabs/start/colorpicker.html',
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onchange || angular.noop;

            $scope.status = {
                isOpen: false
            };

            $scope.colortype = $attr.colortype || 'color';

            $scope.toggle = function (open) {
                $scope.status.isOpen = open;
            };

            var $btn = $ele.find(".dropdown-toggle");
            var togglePaletteMoreText;
            var togglePaletteLessText;
            var chooseText;
            var cancelText;


            $translate(['toolbar.colorpicker.more', 'toolbar.colorpicker.less', 'toolbar.colorpicker.choose', 'toolbar.colorpicker.cancel']).then(function (res) {
                togglePaletteMoreText = res['toolbar.colorpicker.more'];
                togglePaletteLessText = res['toolbar.colorpicker.less'];;
                chooseText = res['toolbar.colorpicker.choose'];
                cancelText = res['toolbar.colorpicker.cancel'];
            }).finally(function () {
                $btn.spectrum({
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    hideAfterPaletteSelect: true,
                    maxSelectionSize: 0,
                    containerClassName: "b-colorpicker-panel",

                    togglePaletteMoreText: togglePaletteMoreText,
                    togglePaletteLessText: togglePaletteLessText,
                    chooseText: chooseText,
                    cancelText: cancelText,
                    color: 'blanchedalmond',
                    showInitial: "true",
                    palette: [
                        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                    ]
                });

                $btn.on('hide.spectrum', function(e, tinycolor) {
                    $scope.status.isOpen = false;
                    $scope.$apply();
                });

                $btn.on('change.spectrum', function(e, tinycolor) {
                    hook({
                        'color': tinycolor.toHexString()
                    });
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bAttrColorpicker', ['$translate', function ($translate) {

    return {
        restrict: 'A',
        scope: {
            onchange: '&oncolorchange',
            ngModel: '='
        },
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onchange || angular.noop;

            $scope.status = {
                isOpen: false
            };

            $scope.colortype = $attr.colortype || 'color';

            $scope.toggle = function (open) {
                $scope.status.isOpen = open;
            };

            var togglePaletteMoreText;
            var togglePaletteLessText;
            var chooseText;
            var cancelText;


            $translate(['toolbar.colorpicker.more', 'toolbar.colorpicker.less', 'toolbar.colorpicker.choose', 'toolbar.colorpicker.cancel']).then(function (res) {
                togglePaletteMoreText = res['toolbar.colorpicker.more'];
                togglePaletteLessText = res['toolbar.colorpicker.less'];;
                chooseText = res['toolbar.colorpicker.choose'];
                cancelText = res['toolbar.colorpicker.cancel'];
            }).finally(function () {
                $ele.spectrum({
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    hideAfterPaletteSelect: true,
                    maxSelectionSize: 0,
                    containerClassName: "b-colorpicker-panel",

                    togglePaletteMoreText: togglePaletteMoreText,
                    togglePaletteLessText: togglePaletteLessText,
                    chooseText: chooseText,
                    cancelText: cancelText,
                    color: 'blanchedalmond',
                    showInitial: "true",
                    palette: [
                        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                    ]
                });

                $ele.on('hide.spectrum', function(e, tinycolor) {
                    $scope.status.isOpen = false;
                    $scope.$apply();
                });

                $ele.on('change.spectrum', function(e, tinycolor) {
                    $scope.ngModel = tinycolor.toHexString();
                    hook({
                        'color': tinycolor.toHexString()
                    });
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bPressbutton', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            text: '@text',
            type: '@buttontype',
            pressed: '=?'
        },
        templateUrl: 'template/toolbar/widget/pressbutton.html',
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop;
            $scope.isPressed = !!$scope.pressed;

            $scope.toggle = function () {
                $scope.isPressed = false;
                hook({
                    status: $scope.isPressed
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bInputselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            values: '=',
            selectValue: '=',
            onlyNumber: '=',
            onchange: '&change'
        },
        templateUrl: 'template/toolbar/widget/inputselect.html',
        link: function ($scope, $ele, $attr) {
            var $input = $('.b-input-select-input', $ele);
            var hook = $scope.onchange || angular.noop;

            $scope.isOpen = false;
            $scope.classname = $attr.classname || '';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.update = function (newValue) {
                $scope.selectValue = newValue;
                hook({value: newValue});
            };

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                $scope.update(this.getAttribute('data-value'));
            });

            $input.on('mousedown', function (e) {
                e.stopPropagation();
            }).on('keydown', function (e) {
                var value = this.value;

                if (e.keyCode !== 13) {
                    return;
                }

                if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                    value = +value;
                } else {
                    value = $scope.selectValue;
                }

                $scope.update(value);
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bNamedefine', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&change'
        },
        templateUrl: 'template/toolbar/widget/namedefine.html',
        link: function ($scope, $ele, $attr) {
            var inputNode = $('.b-input-select-input', $ele)[0];
            var hook = $scope.onchange || angular.noop;

            updateName();
            reset();

            btableService.on('namedefinechange', function () {
                updateName();
                $scope.$apply();
            });

            btableService.on('rangechange', function () {
                reset();
            });

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                //$scope.update(this.getAttribute('data-value'));
                console.log('select')
            });

            $(inputNode).on('mousedown', function (e) {
                e.stopPropagation();
            }).on('keydown', function (e) {
                e.stopPropagation();
                var value = this.value;
                //
                console.log(3)
                //if (e.keyCode !== 13) {
                //    return;
                //}
                //
                //if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                //    value = +value;
                //} else {
                //    value = $scope.selectValue;
                //}
                //
                //$scope.update(value);
            });

            function updateName() {
                var names = btableService.queryCommandValue('names');
                var result = [];

                for (var key in names) {
                    if (!names.hasOwnProperty(key)) {
                        continue;
                    }

                    result.push(key);
                }

                $scope.names = result;
            }

            function reset() {
                var range = btableService.queryCommandValue('range');
                var rowTitle = range.entry.row + 1;
                var columnTitle = btableService.queryCommandValue('columntitle', range.entry.col);
                inputNode.value = columnTitle + rowTitle;
            }
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bFontselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            values: '=',
            major: '=',
            minor: '=',
            ismajor: '=',
            isminor: '=',
            selectValue: '=',
            onlyNumber: '=',
            onchange: '&change'
        },
        templateUrl: 'template/toolbar/widget/fontselect.html',
        link: function ($scope, $ele, $attr) {
            var $input = $('.b-input-select-input', $ele);
            var hook = $scope.onchange || angular.noop;

            $scope.isOpen = false;
            $scope.classname = $attr.classname || '';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.update = function (newValue, type) {
                if (type === 'major') {
                    console.log(3)
                } else if (type === 'minor') {
                    console.log(4)
                } else {
                    console.log(5)
                }

                $scope.selectValue = newValue;

                hook({value: newValue, type: type});
            };

            $('.dropdown-menu', $ele).delegate('.b-input-select-item', 'click', function () {
                $scope.update(this.getAttribute('data-value'), this.getAttribute('data-type'));
            });

            $input.on('mousedown', function (e) {
                e.stopPropagation();
            }).on('keydown', function (e) {
                var value = this.value;

                if (e.keyCode !== 13) {
                    return;
                }

                if ($scope.onlyNumber && $.isNumeric(value) && parseInt(value, 10) === parseFloat(value)) {
                    value = +value;
                } else {
                    value = $scope.selectValue;
                }

                $scope.update(value);
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bMergeselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            checked: '=?'
        },
        templateUrl: 'template/toolbar/widget/mergecell.html',
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop();

            $scope.isSelected = !!$scope.checked;
            $scope.isOpen = false;

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.$watch('checked', function (value) {
                $scope.isSelected = !!value;
            });

            $scope.changeModel = function (mode) {
                $scope.isSelected = false;

                hook({
                    mode: mode,
                    value: $scope.isSelected
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bUnderlineselect', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            checked: '=?'
        },
        templateUrl: 'template/toolbar/widget/underlineselect.html',
        link: function ($scope) {
            var hook = $scope.onchange || angular.noop();

            $scope.isSelected = !!$scope.checked;
            $scope.isOpen = false;
            $scope.current = 'single';

            $scope.toggle = function (isOpen) {
                $scope.isOpen = isOpen;
            };

            $scope.$watch('checked', function (value) {
                $scope.isSelected = !!value;
            });

            $scope.changeModel = function (mode) {
                switch (mode) {
                    case 'single':
                        $scope.current = 'single';
                        break;

                    case 'double':
                        $scope.current = 'double';
                        break;
                }

                hook({
                    mode: mode
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bVerticalalign', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            value: '@?'
        },
        templateUrl: 'template/toolbar/widget/verticalalign.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;

            $scope.top = "top";
            $scope.middle = "middle";
            $scope.bottom = "bottom";
            $scope.__initValue = null;

            $scope.$watch('value', function (newValue) {
                $scope.__initValue = newValue;
            });

            $scope.alignChange = function (mode) {
                if ($scope.__initValue === mode) {
                    $scope.__initValue = null;
                } else {
                    $scope.__initValue = mode;
                }

                hook({
                    status: $scope.__initValue
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bHorizontalalign', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&',
            value: '@?'
        },
        templateUrl: 'template/toolbar/widget/horizontalalign.html',
        link: function ($scope, $ele, $attr) {
            var hook = $scope.onchange || angular.noop;

            $scope.left = "left";
            $scope.center = "center";
            $scope.right = "right";
            $scope.__initValue = null;

            $scope.$watch('value', function (newValue) {
                $scope.__initValue = newValue;
            });

            $scope.alignChange = function (mode) {
                if ($scope.__initValue === mode) {
                    $scope.__initValue = null;
                } else {
                    $scope.__initValue = mode;
                }

                hook({
                    status: $scope.__initValue
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextmenu', [
    'btableService',
    'modalService',
    'cellformatModalNotify',
    'prompt',

    function (btableService, modalService, cellformatModalNotify, prompt) {

    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'template/toolbar/widget/contextmenu.html',
        link: function ($scope, $ele, $attr) {
            $scope.type = 'cell';
            $scope.hasHyperlink = false;
            $scope.hasComment = false;

            var $contextment = $(".b-contextmenu", $ele);

            btableService.on('contextmenu', function (type, location) {
                $scope.type = type;

                $contextment.css({
                    top: location.clientY,
                    left: location.clientX
                });

                open();

                $scope.$apply();
            });

            $ele.on('mousedown', function () {
                close();
            }).on('keydown', function (evt) {
                // esc
                if (evt.keyCode === 27) {
                    close();
                }
            });

            function open() {
                $scope.hasHyperlink = !!btableService.queryCommandValue('containhyperlink');
                $scope.focusHasHyperlink = !!btableService.queryCommandValue('hyperlink');
                $scope.hasComment = !!btableService.queryCommandValue('containcomment');
                $scope.focusHasComment = !!btableService.queryCommandValue('comment');

                $scope.$apply();

                $ele.show().focus();
            }

            function close() {
                $ele.hide();
            }

            $contextment.on('mousedown keydown', function (evt) {
                evt.stopPropagation();
            });


            $scope.handler = {
                insertComment: function () {
                    close();
                    modalService.open('comment');
                },

                removeComment: function () {
                    close();
                    btableService.execCommand(['clearcomment']);
                },

                insertHyperlink: function () {
                    close();
                    modalService.open('hyperlink');
                },

                removeHyperlink: function () {
                    close();
                    btableService.execCommand(['clearhyperlink']);
                },

                cellformat: function () {
                    close();
                    cellformatModalNotify.notify('open', 'fonts');
                },

                clearContent: function () {
                    close();
                    btableService.execCommand(['clearcontent']);
                },

                insertRight: function () {
                    close();
                    btableService.execCommand(['insertleftcell']);
                },

                insertBottom: function () {
                    close();
                    btableService.execCommand(['inserttopcell']);
                },

                insertRow: function () {
                    close();
                    btableService.execCommand(['insertrow']);
                },

                insertColumn: function () {
                    close();
                    btableService.execCommand(['insertcolumn']);
                },

                setColumnWidth: function () {
                    close();
                    var width = btableService.queryCommandValue('rawcolumnwidth');

                    if (width === undefined) {
                        width = btableService.queryCommandValue('rawstandardwidth');
                    }

                    prompt({
                        "title": "列宽",
                        "message": "宽度必须在0到255之间",
                        "input": true,
                        "label": "列宽",
                        "value": width,
                        "buttons": [{
                            label: "取消",
                            cancel: true
                        }, {
                            label: "确定",
                            primary: true
                        }]
                    }).then(function(result){
                        if ($.isNumeric(result) && result >= 0 && result <= 255) {
                            btableService.execCommand(['rawcolumnwidth', +result]);
                        } else {
                            alert('宽度必须在0到255之间');
                            return false;
                        }
                    });
                },

                hideColumn: function () {
                    close();
                    btableService.execCommand(['hidecolumn']);
                },

                showColumn: function () {
                    close();
                    btableService.execCommand(['showcolumn']);
                },

                setRowHeight: function () {
                    close();
                    var height = btableService.queryCommandValue('rawrowheight');

                    if (height === undefined) {
                        height = btableService.queryCommandValue('rawstandardheight');
                    }

                    prompt({
                        "title": "行高",
                        "message": "高度必须在0到409之间",
                        "input": true,
                        "label": "行高",
                        "value": height,
                        "buttons": [{
                            label: "取消",
                            cancel: true
                        }, {
                            label: "确定",
                            primary: true
                        }]
                    }).then(function(result){
                        if ($.isNumeric(result) && result >= 0 && result <= 409) {
                            btableService.execCommand(['rawrowheight', +result]);
                        } else {
                            alert('高度必须在0到409之间');
                        }
                    });
                },

                hideRow: function () {
                    close();
                    btableService.execCommand(['hiderow']);
                },

                showRow: function () {
                    close();
                    btableService.execCommand(['showrow']);
                }
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bContextsubmenu', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        replace: true,
        scope: {
        },
        link: function ($scope, $ele, $attr) {
            $ele.parent().hover(function () {
                $ele.show();
            }, function () {
                $ele.hide();
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bNumberformat', [function () {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onselect: '&'
        },
        templateUrl: 'template/toolbar/widget/numberformat.html',
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onselect || angular.noop;

            var types = [
                "general",
                "number",
                "currency",
                "accountant",
                "shortdate",
                "longdate",
                "time",
                "percentage",
                "fraction",
                "scientific",
                "text"
            ];

            var codes = [
                'General',
                '0.00_);[Red](0.00)',
                '"¥"#,##0.00_);[Red]("¥"#,##0.00)',
                '_ "¥"* #,##0.00_ ;_ "¥"* -#,##0.00_ ;_ "¥"* "-"??_ ;_ @_ ',
                'yyyy/m/d',
                '[$-F800]dddd, mmmm dd, yyyy',
                '[$-F400]h:mm:ss AM/PM',
                '0.00%',
                '# ?/?',
                '0.00E+00',
                '@'
            ];

            $scope.types = types;

            $scope.select = function (index) {
                hook({
                    code: codes[index]
                });
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bTooltip', ['$translate', function ($translate) {

    return {
        restrict: 'A',
        scope: {
            title: "@bTooltip"
        },
        link: function ($scope, $ele) {
            $translate($scope.title).then(function (text) {
                $ele.tooltip({
                    delay: {
                        show: 500,
                        hide: 0
                    },
                    placement: 'bottom',
                    title: text
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCellstyles', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onselect: '&'
        },
        templateUrl: 'template/toolbar/widget/cellstyles.html',
        link: function ($scope, $ele) {
            var hook = $scope.onselect || angular.noop();
            var originalBuiltinStyles = btableService.queryCommandValue('builtincellstyles');
            var builtinCellStyles = analyzeCellStyls(originalBuiltinStyles);
            var current;
            var offset = 0;

            // 和css中对应
            var itemHeight = 33;

            var cellstyleOrder = [
                [0, 27, 26, 28],
                [22, 23, 53, 11, 24, 21, 20, 10],
                [15, 16, 17, 18, 19, 25],
                [
                    30, 34, 38, 42, 46, 50,
                    31, 35, 39, 43, 47, 51,
                    32, 36, 40, 44, 48, 52,
                    29, 33, 37, 41, 45, 49
                ],
                [5, 4, 7, 3, 6]
            ];

            var categoryNames = [
                '好、差和适中',
                '数据和模型',
                '标题',
                '主题单元格样式',
                '数字格式'
            ];

            var builtinStyles = [];
            var uncategoryBuiltinStyles = [];

            for (var i = 0, len = cellstyleOrder.length; i < len; i++) {

                if (!builtinStyles[i]) {
                    builtinStyles[i] = [];
                }

                for (var j = 0, jlen = cellstyleOrder[i].length; j < jlen; j++) {
                    current = builtinCellStyles[cellstyleOrder[i][j]];
                    current.styleText = toStyleText(current.format);
                    current.categoryName = categoryNames[i];
                    current.id = cellstyleOrder[i][j];

                    builtinStyles[i].push(current);
                    uncategoryBuiltinStyles.push(current);
                }
            }

            // 未分类内建样式
            $scope.uncategoryBuiltinStyles = uncategoryBuiltinStyles;
            $scope.builtinStyles = builtinStyles;

            var maxOffset = Math.ceil(uncategoryBuiltinStyles.length / 3) - 2;

            $scope.allowUp = offset > 0;
            $scope.allowDown = offset < maxOffset;

            var $contentBox = $(".b-drappanel-content", $ele);
            var $menu = $(".b-drappanel-menu", $ele);

            $scope.pageUp = function () {
                if (offset <= 0) {
                    offset = 0;
                    return;
                }

                offset--;
                scroll();
            }

            $scope.pageDown = function () {
                if (offset >= maxOffset) {
                    offset = maxOffset;
                    return;
                }

                offset++;
                scroll();
            }

            $scope.openPanel = function (evt) {
                setTimeout(function () {
                    $menu.show();
                }, 0);
            };

            $scope.closePanel = function (evt) {
                $menu.hide();
            };

            $scope.select = function (id, isBuiltin) {
                hook({
                    id: id,
                    isBuiltin: true
                });
            };

            $scope.checkPop = function (evt) {
                if (evt.target.getAttribute('isitem') === null) {
                    evt.stopPropagation();
                }
            };

            $(document).on("click", $scope.closePanel);

            function scroll() {
                $scope.allowUp = offset > 0;
                $scope.allowDown = offset < maxOffset;

                $contentBox.css({
                    transform: 'translateY(-' + offset * (itemHeight) + 'px)'
                });
            }
        }
    };

    function toStyleText(styles) {
        var result = [];

        if (styles.borders) {
            parseBorder(styles.borders.border);
        }

        if (styles.fills) {
            result.push('background-color: ' + styles.fills.fill);
        }

        if (styles.fonts) {
            parseFont(styles.fonts);
        }

        if (styles.alignments && styles.alignments.horizontal) {
            result.push('text-align: ' + styles.alignments.horizontal);
        }

        return result.join(';');

        function parseFont(data) {
            var val;
            var styleMap = {
                'bold': 'font-weight: bold',
                'italic': 'font-style: italic',
                'underline': 'text-decoration: underline',
                'throughline': 'text-decoration: line-through'
            };

            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                val = data[key];

                switch (key) {
                    case 'color':
                        result.push('color: ' + val);
                        break;

                    case 'name':
                        result.push('font-family: ' + val);
                        break;

                    case 'size':
                        result.push('font-size: ' + val + 'pt');
                        break;

                    default:
                        if (val === false) {
                            break;
                        }
                        result.push(styleMap[key]);
                        break;
                }
            }


        }

        function parseBorder(data) {
            if (!data.left) {
                result.push('border-left: none');
            } else {
                result.push('border-left: ' + borderText(data.left));
            }

            if (!data.right) {
                result.push('border-right: none');
            } else {
                result.push('border-right: ' + borderText(data.right));
            }

            if (!data.top) {
                result.push('border-top: none');
            } else {
                result.push('border-top: ' + borderText(data.top));
            }

            if (!data.bottom) {
                result.push('border-bottom: none');
            } else {
                result.push('border-bottom: ' + borderText(data.bottom));
            }
        }
    }

    function borderText(borderOption) {
        var color = borderOption.color;

        switch (borderOption.style) {
            case 'thin':
                return '1px solid ' + color;

            default:
                return '2px solid ' + color;
        }
    }

    function analyzeCellStyls(styles) {
        styles = $.extend(true, {}, styles);

        for (var key in styles) {
            if (!styles.hasOwnProperty(key)) {
                continue;
            }

            analyzeItem(styles[key].format);
        }

        return styles;
    }

    function analyzeItem(data) {
        analyzeFont(data.fonts);
        analyzeFill(data.fills);
        analyzeBorder(data.borders);
    }

    function analyzeFont(font) {
        if (!font) {
            return;
        }

        if (font.color) {
            if (font.color.theme !== undefined) {
                font.color = btableService.queryCommandValue('themecolor', font.color.theme, font.color.tint);
            } else {
                font.color = font.color.value;
            }
        }

        if (font.name) {
            if (font.name.type === 'major') {
                font.name = btableService.queryCommandValue('majorfont');
            } else if (font.name.type === 'minor') {
                font.name = btableService.queryCommandValue('minorfont');
            } else {
                font.name = font.name.value;
            }
        }
    }

    function analyzeFill(fills) {
        if (!fills || !fills.fill) {
            return;
        }

        if (fills.fill.theme !== undefined) {
            fills.fill = btableService.queryCommandValue('themecolor', fills.fill.theme, fills.fill.tint);
        } else {
            fills.fill = fills.fill.value;
        }
    }

    function analyzeBorder(borders) {
        if (!borders || !borders.border) {
            return;
        }

        var border = borders.border;

        if (border.top) {
            analyzeSignBorder(border.top);
        }

        if (border.left) {
            analyzeSignBorder(border.left);
        }

        if (border.bottom) {
            analyzeSignBorder(border.bottom);
        }

        if (border.right) {
            analyzeSignBorder(border.right);
        }
    }

    function analyzeSignBorder(data) {
        if (data.color.theme !== undefined) {
            data.color = btableService.queryCommandValue('themecolor', data.color.theme, data.color.tint);
        } else {
            data.color = data.color.value;
        }
    }
}])
;
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bToolbar', [function () {

    return {
        restrict: 'A',
        scope: {
        },
        link: {
            post: function ($scope, $ele) {
                $ele.on('mousedown', function (evt) {
                    evt.preventDefault();
                });
            }
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSubmenu', function () {
    return {
        restrict: 'A',
        link: function ($scope, $ele, attrs) {
            $ele.parent().hover(function () {
                $ele.addClass('b-show');
            }, function () {
                $ele.removeClass('b-show');
            });
        }
    };
});
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSheetlist', [
    '$timeout',
    'btableService',
    'sheetlistService',

    function ($timeout, btableService, sheetlistService) {

    return {
        restrict: 'A',
        replace: true,
        scope: {
        },
        templateUrl: 'template/widget/sheetlist.html',
        link: {
            post: function ($scope, $ele, $attr, $controller) {
                var MAX_WIDTH = 800;

                var startIndex = 0;
                var endIndex = -1;

                var status = {
                    selected: 0,

                    overflow: false,
                    leftMore: false,
                    rightMore: false
                };

                var $list = $(".b-sl-list", $ele);
                var $shadowList = $(".b-sl-shadow-list", $ele);
                var customHandler;

                /* ---- scope 挂载 start ---- */
                $scope.status = status;
                $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));

                btableService.on('beforedataready', function () {
                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                });

                btableService.on('sheetschange', function () {
                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                });

                btableService.on('sheetswitch', function () {
                    status.selected = btableService.queryCommandValue('activesheetindex');
                    refresh();
                });

                (function () {
                    startIndex = 0;
                    endIndex = -1;

                    $.extend(status, {
                        selected: 0,

                        overflow: false,
                        leftMore: false,
                        rightMore: false
                    });

                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                })();

                $scope.addSheet = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    btableService.execCommand(['addsheet']);
                };

                $scope.leftClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    if (startIndex === 0) {
                        return;
                    }

                    startIndex -= 1;

                    customHandler = sheetlistService.getHandler();

                    // 当前有自定义处理器，则通知自定义处理器
                    if (customHandler) {
                        customHandler(startIndex);

                    // 否则，执行默认动作
                    } else {
                        btableService.execCommand(['switchsheet', startIndex]);
                    }
                };

                $scope.rightClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var count = $scope.sheets.length;

                    if (endIndex === count - 1) {
                        return;
                    }

                    customHandler = sheetlistService.getHandler();

                    // 当前有自定义处理器，则通知自定义处理器
                    if (customHandler) {
                        customHandler(endIndex + 1);

                        // 否则，执行默认动作
                    } else {
                        btableService.execCommand(['switchsheet', endIndex + 1]);
                    }
                };

                var lastClickTime = -1;

                // init item click
                (function () {
                    $list.on('mousedown', '.b-sl-item', function (evt) {
                        evt.stopPropagation();
                        evt.preventDefault();

                        var now = Date.now();

                        if (!window.BTB_READ_ONLY && Date.now() - lastClickTime < 500) {
                            lastClickTime = now;

                            $timeout(function () {
                                var $input = $('.b-sl-item-label-input', $list.find('.b-active'));
                                $('.b-sl-item-label', $list.find('.b-active')).hide();
                                $input.show();
                                $input[0].focus();
                                $input[0].setSelectionRange(0, 99999);
                            }, 0);
                            return;
                        }

                        lastClickTime = now;

                        var index = this.getAttribute('data-index') | 0;

                        customHandler = sheetlistService.getHandler();

                        // 当前有自定义处理器，则通知自定义处理器
                        if (customHandler) {
                            customHandler(index);

                            // 否则，执行默认动作
                        } else {
                            btableService.execCommand(['switchsheet', index]);
                        }
                    }).on('mousedown', '.b-sl-item-label-input', function (evt) {
                        evt.stopPropagation();
                    }).on('blur', '.b-sl-item-label-input', function () {
                        if (!btableService.execCommand(['renamesheet', this.value, +this.getAttribute('data-index')])) {
                            alert('重命名失败，名称冲突: ' + this.value);
                        } else {
                            btableService.execCommand(['focus']);
                        }
                    }).on('keydown', '.b-sl-item-label-input', function (evt) {
                        // enter
                        if (evt.keyCode === 13) {
                            evt.preventDefault();
                            this.blur();
                        // esc
                        } else if (evt.keyCode === 27) {
                            var $input = $('.b-sl-item-label-input', $list.find('.b-active'));
                            $('.b-sl-item-label', $list.find('.b-active')).show();
                            $input.hide();
                            btableService.execCommand(['focus']);
                        }
                    });
                })();

                function refresh() {
                    updateItem();

                    var $items = $(".b-sl-item", $shadowList);

                    var width = getAllWidth($items);

                    if (width < MAX_WIDTH) {
                        startIndex = 0;
                        endIndex = startIndex + $items.length - 1;
                        $list.append($items);

                        status.overflow = false;
                        status.leftMore = false;
                        status.rightMore = false;
                    } else {
                        status.overflow = true;
                        checkOffset($items);
                    }
                }

                function updateItem() {
                    var tpl = '<li class="b-sl-item ${active}" data-index="${index}"><div class="b-sl-item-top-space"></div><input type="text" data-index="${index}" class="b-sl-item-label-input" value="${sheetname}"><span class="b-sl-item-label">${sheetname}</span><div class="b-sl-item-bottom-space"></div></li>'

                    var sheets = $scope.sheets;
                    var info = {};
                    var result = [];

                    for (var i = 0, len = sheets.length; i < len; i++) {
                        if (i === status.selected) {
                            info.active = 'b-active'
                        } else {
                            info.active = '';
                        }

                        info.index = i;
                        info.sheetname = sheets[i];

                        result.push(tpl.replace(/\$\{([^}]+)\}/g, function (match, key) {
                            return info[key] || '';
                        }));
                    }

                    $shadowList.html(result.join(''));
                    $list.html('');
                }

                // 检测当前显示的item是否被隐藏， 如果被隐藏，则要进行偏移校正
                function checkOffset($items) {
                    var items = [].slice.call($items, 0);

                    // 可确定已经发生左溢出
                    if (startIndex > status.selected) {
                        startIndex = status.selected;
                        endIndex = startIndex + items.length - 1;
                        items = getBoundingItems(items.slice(startIndex));
                        $list.append(items);

                        status.leftMore = startIndex > 0;
                        status.rightMore = startIndex + items.length < $items.length;
                        return;
                    }

                    // 检测右溢出
                    var currentItems = items.slice(startIndex, status.selected + 1);
                    var width = getAllWidth(currentItems);

                    // 可确定发生了右溢出
                    if (width > MAX_WIDTH) {
                        currentItems.reverse();
                        items = getBoundingItems(currentItems);
                        items.reverse();
                        startIndex += (currentItems.length - items.length);

                        $list.append(items);
                    // 未发生右溢出，直接选取元素设置即可
                    } else {
                        items = getBoundingItems(items.slice(startIndex));
                        $list.append(items);
                    }

                    // 更新状态
                    status.leftMore = startIndex > 0;
                    status.rightMore = startIndex + items.length < $items.length;

                    endIndex = startIndex + items.length - 1;
                }

                function getAllWidth($items) {
                    var sum = 0;
                    var rect;

                    for (var i = 0, len = $items.length; i < len; i++) {
                        rect = __getRect($items[i]);

                        sum += Math.round(rect.width);
                    }

                    return sum - (len - 1);
                }

                function getBoundingItems($items) {
                    var result = [];
                    var sum = 1;
                    var rect;

                    for (var i = 0, len = $items.length; i < len; i++) {
                        rect = __getRect($items[i]);
                        sum += Math.round(rect.width) - 1;

                        if (sum > MAX_WIDTH) {
                            break;
                        }

                        result.push($items[i]);
                    }

                    return result;
                }

                function __getRect(node) {
                    return node.getBoundingClientRect();
                }
            }
        }
    };

    function clone(arr) {
        var keys = Object.keys(arr);
        var result = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = arr[keys[i]];
        }

        return result;
    }
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCutbtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/cutbtn.html',
        link: function ($scope, $ele) {
            var client = new ZeroClipboard($ele);

            client.on("ready", function (readyEvent) {
                client.on("copy", function (event) {
                    var clipboard = event.clipboardData;
                    var copyData = btableService.execCommand(['execcut']);

                    if (!copyData) {
                        return null;
                    }

                    clipboard.setData("text/plain", copyData.string);
                    clipboard.setData("text/html", copyData.html);

                    btableService.execCommand(['focus']);
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bShowcolor', ['$translate', function ($translate) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            onchange: '&oncolorchange'
        },
        templateUrl: 'template/toolbar/widget/showcolor.html',
        link: function ($scope, $ele, $attr, $controller) {
            var hook = $scope.onchange || angular.noop;

            var $input = $ele.find("input");
            var togglePaletteMoreText;
            var togglePaletteLessText;
            var chooseText;
            var cancelText;

            $translate(['toolbar.colorpicker.more', 'toolbar.colorpicker.less', 'toolbar.colorpicker.choose', 'toolbar.colorpicker.cancel']).then(function (res) {
                togglePaletteMoreText = res['toolbar.colorpicker.more'];
                togglePaletteLessText = res['toolbar.colorpicker.less'];;
                chooseText = res['toolbar.colorpicker.choose'];
                cancelText = res['toolbar.colorpicker.cancel'];
            }).finally(function () {
                $input.spectrum({
                    flat: true,
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    hideAfterPaletteSelect: true,
                    maxSelectionSize: 0,
                    containerClassName: "b-colorpicker-panel",

                    togglePaletteMoreText: togglePaletteMoreText,
                    togglePaletteLessText: togglePaletteLessText,
                    chooseText: chooseText,
                    cancelText: cancelText,
                    color: 'blanchedalmond',
                    showInitial: "true",
                    palette: [
                        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                    ]
                });

                $input.on('change.spectrum', function(e, tinycolor) {
                    $(this).closest('.b-show-color-menu').removeClass('b-show');
                    hook({
                        'color': tinycolor.toHexString()
                    });
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bCopybtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/copybtn.html',
        link: function ($scope, $ele) {
            var client = new ZeroClipboard($ele);

            client.on("ready", function (readyEvent) {
                client.on("copy", function (event) {
                    var clipboard = event.clipboardData;
                    var copyData = btableService.execCommand(['execcopy']);

                    if (!copyData) {
                        return null;
                    }

                    clipboard.setData("text/plain", copyData.string);
                    clipboard.setData("text/html", copyData.html);

                    btableService.execCommand(['focus']);
                });
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bComment', ['btableService', 'modalService', function (btableService, modalService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
        },
        templateUrl: 'template/modal/comment.html',
        link: function ($scope, $ele, $attr) {
            $scope.comment = null;

            var $mask = $('<div class="b-modal-box"></div>');
            var commentInput = $("#commentInput", $ele[0]);

            $mask.append($ele);
            $ele[0].ownerDocument.body.appendChild($mask[0]);

            modalService.register('comment', {
                open: function () {
                    $scope.comment = btableService.queryCommandValue('comment');
                    $mask.show();
                    commentInput.focus();
                }
            });

            $mask.on('mousedown', function () {
                $mask.hide();
            });

            $ele.on('mousedown', function (evt) {
                evt.stopPropagation();
            });

            $scope.ok = function () {
                $mask.hide();
                btableService.execCommand(['comment', $scope.comment]);
            };

            $scope.cancel = function () {
                $mask.hide();
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bHyperlink', ['btableService', 'modalService', function (btableService, modalService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
        },
        templateUrl: 'template/modal/hyperlink.html',
        link: function ($scope, $ele, $attr) {
            $scope.hyperlink = null;
            $scope.text = null;

            var $mask = $('<div class="b-modal-box"></div>');
            var hyperlinkTextInput = $("#hyperlinkTextInput", $ele[0]);

            $mask.append($ele);
            $ele[0].ownerDocument.body.appendChild($mask[0]);

            modalService.register('hyperlink', {
                open: function () {
                    $scope.hyperlink = btableService.queryCommandValue('hyperlink');
                    $scope.text = btableService.queryCommandValue('content');
                    $mask.show();
                    hyperlinkTextInput.focus();
                }
            });

            $mask.on('mousedown', function () {
                $mask.hide();
            });

            $ele.on('mousedown', function (evt) {
                evt.stopPropagation();
            });

            $scope.ok = function () {
                $mask.hide();
                btableService.execCommand(['hyperlink', $scope.text || $scope.hyperlink, $scope.hyperlink]);
            };

            $scope.cancel = function () {
                $mask.hide();
            };
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bPastebtn', ['btableService', function (btableService) {

    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'template/toolbar/widget/pastebtn.html',
        link: function ($scope, $ele) {
            //var client = new ZeroClipboard($ele);
            //
            //client.on("ready", function (readyEvent) {
            //    var text = client.getData("text/plain");
            //    client.on("copy", function (event) {
            //        //var clipboard = event.clipboardData;
            //        //var copyData = btableService.execCommand(['execcopy']);
            //        //
            //        //if (!copyData) {
            //        //    return null;
            //        //}
            //        //
            //        //clipboard.setData("text/plain", copyData.string);
            //        //clipboard.setData("text/html", copyData.html);
            //        //console.log(client.getData('text/plain'))
            //    });
            //});
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bFilepanel', ['btableService', function (btableService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            'filestatus': '&',
            'url': '='
        },
        templateUrl: 'template/toolbar/tabs/file.html',
        link: function ($scope, $ele, attrs) {
            $ele.on('mousedown', function (evt) {
                evt.stopPropagation();
            });

            btableService.onRequireCloseFilePanel(function () {
                $ele.hide();
                btableService.notify('close');
            });

            btableService.onRequireOpenFilePanel(function () {
                $ele.show();
                $ele.focus();
                btableService.notify('open');
            });

            $scope.$watch($scope.filestatus, function (opended) {
                if (opended.status) {
                    $ele.show();
                    $ele.focus();
                    btableService.notify('open');
                } else {
                    $ele.hide();
                    btableService.notify('close');
                }
            });

            $ele.on('keydown', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (evt.keyCode === 27) {
                    evt.preventDefault();
                    $ele.hide();

                    btableService.notify('close');
                    $scope.$apply();
                }
            });
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('btable', ['btableService', function (btableService) {

    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'template/widget/btable.html',
        link: function ($scope, $ele) {
            var btable = btableService.createBtable($ele.find('.btable-container')[0]);
            $("#btableOuterInput").on("mousedown", function (evt) {
                evt.stopPropagation();
            });

            btable.execCommand('bindinput', $("#btableOuterInput")[0]);
            btable.execCommand('init');
        }
    };
}]);
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
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('modalService', [function () {
    var instace = {};

    return {
        open: function (name, cb) {
            instace[name].open(cb);
        },

        register: function (name, handler) {
            instace[name] = handler;
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('cellformatModalNotify', [function () {

    var listeners = {};

    return {
        notify: function (message, args) {
            if (!listeners[message]) {
                return;
            }

            var queue = listeners[message];

            for (var i = 0, len = queue.length; i < len; i++) {
                queue[i](args);
            }
        },

        onMessage: function (message, cb) {
            if (!listeners[message]) {
                listeners[message] = [];
            }

            listeners[message].push(cb);
        }
    };

}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('btableService', [function () {
    var DELAY_TIME = 50;
    var timer = null;
    var callbacks = [];
    var btable;
    var readyList = [];
    var closeFilePanelCb = null;
    var openFilePanelCb = null;

    var openCbs = [];
    var closeCbs = [];
    var changeCb = function () {};

    return {
        createBtable: function (ele) {
            if (btable) {
                return btable;
            }

            btable = new BTable(ele);

            btable.on('refresh', function () {
                emit();
            });

            for (var i = 0, len = readyList.length; i < len; i++) {
                readyList[i]();
            }

            return btable;
        },

        onRequireCloseFilePanel: function (cb) {
            closeFilePanelCb = cb;
        },

        onRequireOpenFilePanel: function (cb) {
            openFilePanelCb = cb;
        },

        onchange: function (cb) {
            callbacks.push(cb);
        },

        ready: function (cb) {
            readyList.push(cb);
        },

        on: function () {
            btable.on.apply(btable, arguments);
        },

        execCommand: function (args) {
            return btable.execCommand.apply(btable, args);
        },

        queryCommandValue: function () {
            return btable.queryCommandValue.apply(btable, arguments);
        },

        onopen: function (cb) {
            openCbs.push(cb);
        },

        onclose: function (cb) {
            closeCbs.push(cb);
        },

        setFileTemplate: function (url) {
            changeCb(url);
        },

        onTemplateChange: function (cb) {
            changeCb = cb;
        },

        openFilePanel: function () {
            openFilePanelCb && openFilePanelCb();
        },

        closeFilePanel: function () {
            closeFilePanelCb && closeFilePanelCb();
        },

        notify: function (type) {
            if (type === 'open') {
                for (var i = 0, len = openCbs.length; i < len; i++) {
                    openCbs[i]();
                }
            } else {
                for (var i = 0, len = openCbs.length; i < len; i++) {
                    closeCbs[i]();
                }
            }
        }
    };

    function emit () {
        if (timer !== null) {
            return;
        }

        timer = setTimeout(function () {
            timer = null;
            var status = reflect(btable);

            for (var i = 0, len = callbacks.length; i < len; i++) {
                callbacks[i](status);
            }

        }, DELAY_TIME);
    }

    function reflect() {
        return btable.queryCommandValue({
            'fontdetail': null,
            'fontsize': null,
            'colordetail': null,
            'bold': null,
            'italic': null,
            'filldetail': null,
            'horizontal': null,
            'vertical': null,
            'underline': null,
            'throughline': null,
            'wraptext': null,
            'numfmt': null,
            'mergecell': null
        });
    }

}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('sheetlistService', [function () {
    var handler = null;

    return {
        setHandler: function (h) {
            handler = h;
        },

        removeHandler: function () {
            handler = null;
        },

        getHandler: function () {
            return handler;
        }
    };
}]);
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').factory('numberformat', ['NUMBER_FORMAT', 'CURRENCY', function (NUMBER_FORMAT, CURRENCY) {

    var FORMAT_TYPES = ['normal', 'number', 'currency', 'accountant', 'date', 'time', 'percentage', 'fraction', 'scientific', 'text'];

    /* ---- 初始化内置code start ---- */
    /*
     * 内置CODE，code中的'%p'是占位符，代表小数位数的占位
     * */
    var CODES = NUMBER_FORMAT;

    // 货币符号列表
    var CURRENCY_SYMBOL = [];

    // code表
    var CODE_TABLE = [];
    // code结构，方便获取信息
    var CODE_MAP = {};

    /* --- 初始化表 start --- */

    // 初始化货币符号列表
    (function () {
        for (var i = 0, len = CURRENCY.length; i < len; i++) {
            CURRENCY_SYMBOL.push(CURRENCY[i].value);
        }
    })();

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

    // 初始化 货币类code
    (function () {
        var current = CODES.currency;
        var item;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'currency',
                index: i,
                thousandth: false,
                code: item.code,
                color: item.color
            });
        }
    })();

    // 初始化 会计code
    (function () {
        CODE_MAP[CODES.accountant] = CODE_TABLE.length;
        CODE_TABLE.push({
            type: 'accountant',
            index: 0,
            thousandth: false,
            code: CODES.accountant,
            color: ''
        });
    })();

    // 初始化 日期类code
    (function () {
        var current = CODES.date;
        var item;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'date',
                index: i,
                thousandth: false,
                code: item.code,
                color: item.color
            });
        }
    })();

    // 初始化 时间类code
    (function () {
        var current = CODES.time;
        var item;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'time',
                index: i,
                thousandth: false,
                code: item.code,
                color: item.color
            });
        }
    })();

    // 初始化 科学计数法 code
    (function () {
        // scientific
        CODE_MAP[CODES.scientific] = CODE_TABLE.length;
        CODE_TABLE.push({
            type: 'scientific',
            index: 0,
            thousandth: false,
            code: CODES.scientific,
            color: ''
        });
    })();

    // 初始化 分数类code
    (function () {
        var current = CODES.fraction;
        var item;

        for (var i = 0, len = current.length; i < len; i++) {
            item = current[i];

            CODE_MAP[item.code] = CODE_TABLE.length;
            CODE_TABLE.push({
                type: 'fraction',
                index: i,
                thousandth: false,
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
            // 移除小数位后进行比较
            var newCode = format(code);
            var index = CODE_MAP[newCode.code];

            if (index === undefined) {
                return null;
            }

            var precision = /\.(0+)/.test(code) ? RegExp.$1.length : -1;

            return {
                // code 结构信息
                info: CODE_TABLE[index],
                // 精度信息
                precision: precision,
                currency: newCode.currency
            };
        },

        getNumberformatCode: function (typeId, status) {
            var currencySymbol = CURRENCY[status._default.currency].value;
            var precision = status._default.precision;
            var codeSelected = status._default.code;

            switch (FORMAT_TYPES[typeId]) {
                case 'normal':
                    return NUMBER_FORMAT.normal;

                case 'number':
                    if (status._default.thousandth) {
                        return getFormatCode(NUMBER_FORMAT.number.thousandth[codeSelected.number].code, precision, '');
                    } else {
                        return getFormatCode(NUMBER_FORMAT.number.normal[codeSelected.number].code, precision, '');
                    }

                case 'currency':
                    return getFormatCode(NUMBER_FORMAT.currency[codeSelected.currency].code, precision, currencySymbol);

                case 'accountant':
                    return getFormatCode(NUMBER_FORMAT.accountant, precision, currencySymbol);

                case 'date':
                    return getFormatCode(NUMBER_FORMAT.date[codeSelected.date].code, '', '');

                case 'time':
                    return getFormatCode(NUMBER_FORMAT.time[codeSelected.time].code, '', '');

                case 'percentage':
                    return getFormatCode(NUMBER_FORMAT.percentage, precision, '');

                case 'fraction':
                    return getFormatCode(NUMBER_FORMAT.fraction[codeSelected.fraction].code, '', '');

                case 'scientific':
                    return getFormatCode(NUMBER_FORMAT.scientific, precision, '');

                case 'text':
                    return NUMBER_FORMAT.text;
            }
        }
    };

    function getFormatCode(code, precision, currencySymbol) {
        // 构造精度字符串
        var precisionBuffer = [];

        precision -= 1;
        while (precision >= 0) {
            precisionBuffer.push(0);
            precision--;
        }

        precisionBuffer = precisionBuffer.join('');

        if (precisionBuffer.length) {
            precisionBuffer = '.' + precisionBuffer;
        }

        return code.replace(/%p/g, precisionBuffer).replace(/%\$/g, currencySymbol);
    }

    function format(code) {
        var symbolIndex = -1;

        code = code.replace(/\.(0+)/g, '%p').replace(/"([^"]+)"/g, function (match, symbol) {
            var tmp = CURRENCY_SYMBOL.indexOf(symbol);

            if (tmp !== -1) {
                symbolIndex = tmp;
                return '"%$"';
            }

            return match;
        });

        return {
            code: code,
            currency: symbolIndex
        };
    }
}]);
/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ToolbarBasicController', [
    '$scope',
    'toolbarNotify',
    'cellformatModalNotify',
    'btableService',
    '$modal',
    'prompt',

    function ($scope, toolbarNotify, cellformatModalNotify, btableService, $modal, prompt) {
        window.onresize = function () {
            btableService.execCommand(['resize']);
        };

        $scope.isShowGridline = true;
        $scope.isShowHeader = true;
        $scope.hasPane = false;

        $scope.fileStatus = {
            status: false
        };

        $scope.fileTemplateSrc = 'template/file-default.html';

        btableService.onTemplateChange(function (url) {
            $scope.fileTemplateSrc = url;
            $scope.$apply();
        });

        btableService.ready(function () {
            btableService.on('error', function (key, msg) {
                $modal.open({
                    animation: false,
                    templateUrl: 'template/widget/error.html',
                    controller: 'ModalController',
                    size: 'sm',
                    resolve: {
                        errorMsg: function () {
                            return msg;
                        }
                    }
                });

                setTimeout(function () {
                    $("#errorModalHiddenInput").focus();
                    $("#errorModalBtn").focus();
                }, 1);
            });

            btableService.on('dataready', function () {
                $scope.isShowGridline = btableService.queryCommandValue('gridline');
                $scope.isShowHeader = btableService.queryCommandValue('header');
                $scope.hasPane = !!btableService.queryCommandValue('pane');
            });
        });

        $scope.closeModal = function () {
            $modalInstance.close();
        };

        $scope.btnState = {
            pasteOpen: false,
            fontfamilyOpen: false,
            fontsizeOpen: false,
            colorOpen: false,
            bgcolorOpen: false,
            mergeOpen: false,
            underlienOpen: false
        };

        var res = {
            valignValue: null,
            alignValue: null,
            merge: false
        };

        var status = {
            bold: false,
            italic: false,
            underline: false,
            throughline: false,

            font: '正文字体(宋体)',
            fontsize: 11,
            color: null,
            fill: null,
            horizontal: null,
            vertical: null,
            wraptext: false
        };

        btableService.onchange(function (btableStatus) {
            status.bold = btableStatus.bold;
            status.italic = btableStatus.italic;
            status.underline = btableStatus.underline;

            status.vertical = btableStatus.vertical;
            status.horizontal = btableStatus.horizontal;
            status.wraptext = btableStatus.wraptext;
            // TODO 对默认值的处理需要优化
            status.font = btableStatus.fontdetail.value;
            status.isMajor = btableStatus.fontdetail.type === 'major';
            status.isMinor = btableStatus.fontdetail.type === 'minor';
            status.fontsize = btableStatus.fontsize;
            status.color = btableStatus.colordetail.value;
            status.fill = btableStatus.filldetail ? btableStatus.filldetail.value : null;
            status.merge = !!btableStatus.mergecell;

            $scope.isShowGridline = btableService.queryCommandValue('gridline');
            $scope.isShowHeader = btableService.queryCommandValue('header');
            $scope.hasPane = !!btableService.queryCommandValue('pane');

            $scope.$apply();
        });

        $scope.status = status;
        $scope.fileOpen = false;

        $scope.res = res;

        $scope.values = {
            fontsize: 12,
            fontfamily: 'Arial'
        };

        $scope.borderStyle = [
            'none', 'thin', 'dashed', 'dotted'
        ];

        $scope.border = {
            style: 'thin',
            color: '#000000'
        };

        $scope.initValue = {
            major: '宋体',
            minor: '宋体',
            fontfamily: ["Angsana New", "Arial", "Arial Black", "Batang", "Book Antiqua", "Browallia New", "Calibri", "Cambria", "Candara", "Century", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "Courier", "Courier New", "DilleniaUPC", "Dotum", "仿宋", "Garamond", "Georgia", "Gulim", "GungSuh", "楷体", "JasmineUPC", "Malgun Gothic", "Mangal", "Meiryo", "Microsoft JhengHei", "微软雅黑", "MingLiu", "MingLiU_HKSCS", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "PMingliU", "PMingLiU-ExtB", "黑体", "宋体", "宋体-ExtB", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Verdana", "Yu Gothic", "Yu Mincho"],
            fontsize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 36, 48, 72]
        };

        $scope.controlClick = function () {
            $scope.fileStatus = {
                status: true
            };
        };

        $scope.handler = {
            btnclick: function (evt) {
                var buttonType = evt.delegateTarget.getAttribute('data-name');
                toolbarNotify.emit(buttonType);
            },

            fontSelect: function (val) {
                toolbarNotify.emit('font', val);
            },

            fontsizeSelect: function (val) {
                toolbarNotify.emit('fontsize', val);
            },

            mergechange: function (mode) {
                var command = {
                    'center': 'centermergecell',
                    'across': 'horizontalmergecell',
                    'merge': 'mergecell',
                    'cancel': 'unmergecell'
                };

                toolbarNotify.emit('merge', command[mode]);
            },

            underlineChange: function (mode) {
                toolbarNotify.emit('underline', mode);
            },

            borderStyle: function (index) {
                $scope.border.style = $scope.borderStyle[index];
            },

            borderColor: function (color) {
                $scope.border.color = color;
                $scope.$apply();
            },

            pressChange: function (type, status) {
                toolbarNotify.emit(type);
            },

            valignChange: function (status) {
                toolbarNotify.emit('vertical', status);
            },

            alignChange: function (status) {
                toolbarNotify.emit('horizontal', status);
            },

            colorChange: function (type, color) {
                if (type === 'foreground') {
                    toolbarNotify.emit('color', color);
                } else {
                    toolbarNotify.emit('fill', color);
                }
            },

            borderSelect: function (type) {
                var args = ['setborder'];
                var borderStyle = $scope.border.style;
                var borderColor = $scope.border.color;

                switch (type) {
                    case 'none':
                        args = ['clearborder'];
                        break;

                    case 'top':
                        if (borderStyle === 'none') {
                            args = ['cleartopborder'];
                        } else {
                            args = ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'bottom':
                        if (borderStyle === 'none') {
                            args = ['clearbottomborder'];
                        } else {
                            args = ['bottomborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'left':
                        if (borderStyle === 'none') {
                            args = ['clearleftborder'];
                        } else {
                            args = ['leftborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'right':
                        if (borderStyle === 'none') {
                            args = ['clearrightborder'];
                        } else {
                            args = ['rightborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'outer':
                        if (borderStyle === 'none') {
                            args = ['clearouterborder'];
                        } else {
                            args = ['outerborder', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;

                    case 'top-bottom':
                        if (borderStyle === 'none') {
                            toolbarNotify.emit('border', ['cleartopborder']);
                            toolbarNotify.emit('border', ['clearbottomborder']);
                        } else {
                            toolbarNotify.emit('border', ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                            toolbarNotify.emit('border', ['bottomborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                        }
                        // 注意，此处直接返回
                        return;

                    case 'top-bottom-medium':
                        if (borderStyle === 'none') {
                            toolbarNotify.emit('border', ['cleartopborder']);
                        } else {
                            toolbarNotify.emit('border', ['topborder', {
                                style: borderStyle,
                                color: borderColor
                            }]);
                        }

                        toolbarNotify.emit('border', ['bottomborder', {
                            style: 'medium',
                            color: borderColor
                        }]);
                        // 注意，此处直接返回
                        return;

                    case 'outermedium':
                        args = ['outerborder', {
                            style: 'medium',
                            color: borderColor
                        }]
                        break;

                    case 'bottommedium':
                        args = ['bottomborder', {
                            style: 'medium',
                            color: borderColor
                        }]
                        break;

                    case 'all':
                        if (borderStyle === 'none') {
                            args = ['clearborder'];
                        } else {
                            args = ['border', {
                                style: borderStyle,
                                color: borderColor
                            }]
                        }
                        break;
                }

                toolbarNotify.emit('border', args);
            },

            formatSelect: function (code) {
                toolbarNotify.emit('numfmt', code);
            },

            selectCellstyle: function (id, isBuiltin) {
                toolbarNotify.emit('cellstyle', id);
            },

            openCellFormat: function (type) {
                cellformatModalNotify.notify('open', type);
            },

            insertRightCell: function () {
                toolbarNotify.emit('insertleftcell');
            },

            insertBottomCell: function () {
                toolbarNotify.emit('inserttopcell');
            },

            insertRow: function () {
                toolbarNotify.emit('insertrow');
            },

            insertColumn: function () {
                toolbarNotify.emit('insertcolumn');
            },

            insertSheet: function () {
                toolbarNotify.emit('insertsheet');
            },

            setRowHeight: function () {
                var height = btableService.queryCommandValue('rawrowheight');

                if (height === undefined) {
                    height = btableService.queryCommandValue('rawstandardheight');
                }

                prompt({
                    "title": "行高",
                    "message": "高度必须在0到409之间",
                    "input": true,
                    "label": "行高",
                    "value": height,
                    "buttons": [{
                        label: "取消",
                        cancel: true
                    }, {
                        label: "确定",
                        primary: true
                    }]
                }).then(function(result){
                    if ($.isNumeric(result) && result >= 0 && result <= 409) {
                        toolbarNotify.emit('rawrowheight', +result);
                    } else {
                        alert('高度必须在0到409之间');
                    }
                });
            },

            setColumnWidth: function () {
                var width = btableService.queryCommandValue('rawcolumnwidth');

                if (width === undefined) {
                    width = btableService.queryCommandValue('rawstandardwidth');
                }

                prompt({
                    "title": "列宽",
                    "message": "宽度必须在0到255之间",
                    "input": true,
                    "label": "列宽",
                    "value": width,
                    "buttons": [{
                        label: "取消",
                        cancel: true
                    }, {
                        label: "确定",
                        primary: true
                    }]
                }).then(function(result){
                    if ($.isNumeric(result) && result >= 0 && result <= 255) {
                        toolbarNotify.emit('rawcolumnwidth', +result);
                    } else {
                        alert('宽度必须在0到255之间');
                        return false;
                    }
                });
            },

            setBestfitRowHeight: function () {
                toolbarNotify.emit('bestfitrowheight');
            },

            setBestfitColumnWidth: function () {
                toolbarNotify.emit('bestfitcolumnwidth');
            },

            setDefaultColumnWidth: function () {
                var width = btableService.queryCommandValue('rawdefaultcolumnwidth');

                if (width === undefined) {
                    width = btableService.queryCommandValue('rawstandardwidth');
                }

                prompt({
                    "title": "标准列宽",
                    "message": "宽度必须在0到255之间",
                    "input": true,
                    "label": "标准列宽",
                    "value": width,
                    "buttons": [{
                        label: "取消",
                        cancel: true
                    }, {
                        label: "确定",
                        primary: true
                    }]
                }).then(function(result){
                    if ($.isNumeric(result) && result >= 0 && result <= 255) {
                        toolbarNotify.emit('rawdefaultcolumnwidth', +result);
                    } else {
                        alert('宽度必须在0到255之间');
                        return false;
                    }
                });
            },

            hideRow: function () {
                toolbarNotify.emit('hiderow');
            },

            hideColumn: function () {
                toolbarNotify.emit('hidecolumn');
            },

            showRow: function () {
                toolbarNotify.emit('showrow');
            },

            showColumn: function () {
                toolbarNotify.emit('showcolumn');
            },

            namechange: function () {
                console.log('namechange')
            },

            toggleHeader: function () {
                toolbarNotify.emit('header');
            },

            toggleGridline: function () {
                toolbarNotify.emit('gridline');
            },

            frozen: function () {
                toolbarNotify.emit('frozen');
            },

            frozenRow: function () {
                toolbarNotify.emit('frozenfirstrow');
            },

            frozenColumn: function () {
                toolbarNotify.emit('frozenfirstcolumn');
            },

            cancelFrozen: function () {
                toolbarNotify.emit('cancelfrozen');
            }
        };
    }
]);
/**
 * @file toolbar基础功能控制器
 * @author hancong03@baiud.com
 */

angular.module('app').controller('ModalController', [
    '$scope',
    '$modalInstance',
    'errorMsg',
    'btableService',

    function ($scope, $modalInstance, errorMsg, btableService) {
        $scope.errorMsg = errorMsg;

        $scope.close = function () {
            $modalInstance.close();
            btableService.execCommand(['focus']);
        }
    }]);
/**
 * @file modal通信控制器
 * @author hancong03@baiud.com
 */

(function () {
    angular.module('app').controller('CellForamtModalController', [
        '$scope',
        'cellformatModalNotify',
        'numberformat',
        '$filter',
        'NUMBER_FORMAT',
        'FONT_LIST',
        'FONT_STYLE',
        'FONT_SIZE',
        'HORIZONTAL_ALIGNMENT',
        'VERTICAL_ALIGNMENT',
        'CURRENCY',
        'BORDERS',
        'btableService',

        function ($scope,
                  cellformatModalNotify,
                  numberformat,
                  $filter,
                  NUMBER_FORMAT,
                  FONT_LIST,
                  FONT_STYLE,
                  FONT_SIZE,
                  HORIZONTAL_ALIGNMENT,
                  VERTICAL_ALIGNMENT,
                  CURRENCY,
                  BORDERS,
                  btableService) {

            var numberformatTypes = ['normal', 'number', 'currency', 'accountant', 'date', 'time', 'percentage', 'fraction', 'scientific', 'text'];
            var tabs = ['numberformat', 'alignment', 'font', 'border', 'fill'];

            /* --- 初始化索引，用于从btable的状态反查UI索引 start --- */
            var INDEX_MAP = initIndexMap({
                hAlign: HORIZONTAL_ALIGNMENT,
                vAlign: VERTICAL_ALIGNMENT
            });
            /* --- 初始化索引，用于从btable的状态反查UI索引 end --- */

            var underline = [{
                text: '无',
                value: 'none'
            }, {
                text: '单下划线',
                value: 'single'
            }, {
                text: '双下划线',
                value: 'double'
            }];

            var _defaultStatus = {
                // code选中索引
                code: {
                    number: 3,
                    currency: 3,
                    date: 0,
                    time: 0,
                    fraction: 0
                },

                // 默认精度
                precision: 2,
                // 千分位符开启状态
                thousandth: false,
                // 货币符号
                currency: 2,

                // 水平对齐
                hAlign: 0,
                // 垂直对齐
                vAlign: 1,
                // 自动换行
                wraptext: false,
                // 单元格禁用
                merge: false,

                // 默认字体: value
                font: FONT_LIST[0],
                // 默认字形: index
                fontstyle: 0,
                // 字号: value
                fontsize: 13,
                // 字体颜色
                color: null,
                // 下划线
                underline: 0,
                // 贯穿线
                throughline: false,

                // border type
                borderType: 0,
                // border color
                borderColor: null,
                // 边框应用记录
                borders: {
                    left: null,
                    center: null,
                    right: null,
                    top: null,
                    middle: null,
                    bottom: null
                },

                // fill color
                fillColor: null
            };

            // btable 当前状态
            var btableStatus = null;
            // 当前的未发生改变的状态快照
            var statusSnapshot;

            btableService.onchange(function (status) {
                btableStatus = status;
            });

            /* filter */
            var numberFormatFilter = $filter('bNumberformatNumber');
            var currencyFormatFilter = $filter('bNumberformatCurrency');

            /* ---------- scope 挂载 ---------- */
            var _status = {
                tabSelected: [true],

                formatSelected: [true],

                // 格式code信息
                format: {
                    date: NUMBER_FORMAT.date,
                    time: NUMBER_FORMAT.time,
                    fraction: NUMBER_FORMAT.fraction,
                    number: numberFormatFilter(NUMBER_FORMAT.number, _defaultStatus.precision, !!_defaultStatus.thousandth),
                    currency: currencyFormatFilter(NUMBER_FORMAT.currency, _defaultStatus.precision, CURRENCY[_defaultStatus.currency].value)
                },

                // 各种类别的默认选中索引
                _default: _defaultStatus
            };

            var status = $.extend(true, {}, _status);

            $scope.status = status;

            $scope.horizontalAlign = HORIZONTAL_ALIGNMENT;
            $scope.verticalAlign = VERTICAL_ALIGNMENT;
            $scope.fontStyle = FONT_STYLE;
            $scope.fontSize = FONT_SIZE;
            $scope.underline = underline;
            $scope.borderStyle = BORDERS;
            $scope.fonts = FONT_LIST;
            $scope.currencyList = CURRENCY;

            $scope.$watchGroup(['status._default.precision', 'status._default.thousandth'], function () {
                $scope.status.format.number = numberFormatFilter(NUMBER_FORMAT.number, status._default.precision, !!status._default.thousandth);
            });

            $scope.$watchGroup(['status._default.precision', 'status._default.currency'], function () {
                $scope.status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, status._default.precision, CURRENCY[status._default.currency].value);
            });

            $scope.modalOkClick = function (evt) {
                evt.preventDefault();

                var commands = checkChange();
                btableService.execCommand([commands]);

                $("#cellFormatModal").modal('hide');
            };

            /* ---------- 监听open消息 --------- */
            cellformatModalNotify.onMessage('open', function (type) {
                var index = tabs.indexOf(type)

                if (index === -1) {
                    index = 0;
                }

                // 在打开前根据当前的单元格信息重置状态
                resetCurrentStatus();

                status.tabSelected = [];
                status.tabSelected[index] = true;
                $("#cellFormatModal").modal('show');
            });

            $("#cellFormatModal").on('hidden.bs.modal', function () {
                //var commands = checkChange();
                //btableService.execCommand([commands]);
            });

            /* ----- 边框控制 ----- */
            $scope.builtinBorderChange = function (type) {
                if (status._default.borderType === 0) {
                    $scope.clearBorder(type);
                } else {
                    addBorder(type, getCurrentBorderStyels());
                }

                function addBorder(type, styles) {
                    switch (type) {
                        case 'all':
                            status._default.borders.left = {
                                left: styles,
                                center: styles,
                                right: styles,
                                top: styles,
                                middle: styles,
                                bottom: styles
                            };
                            break;

                        case 'outer':
                            status._default.borders.left = styles;
                            status._default.borders.right = styles;
                            status._default.borders.top = styles;
                            status._default.borders.bottom = styles;
                            break;

                        case 'inner':
                            status._default.borders.center = styles;
                            status._default.borders.middle = styles;
                            break;
                    }
                }
            };

            $scope.clearBorder = function (type) {
                switch (type) {
                    case 'all':
                        status._default.borders = {
                            left: null,
                            center: null,
                            right: null,
                            top: null,
                            middle: null,
                            bottom: null
                        };
                        break;

                    case 'outer':
                        status._default.borders.left = null;
                        status._default.borders.right = null;
                        status._default.borders.top = null;
                        status._default.borders.bottom = null;
                        break;

                    case 'inner':
                        status._default.borders.center = null;
                        status._default.borders.middle = null;
                        break;
                }
            }

            $scope.borderChange = function (type) {
                if (status._default.borderType === 0) {
                    status._default.borders[type] = null;
                    return;
                }

                var styles = getCurrentBorderStyels();

                if (!status._default.borders[type]) {
                    status._default.borders[type] = styles;
                    return;
                }

                if (JSON.stringify(status._default.borders[type]) === JSON.stringify(styles)) {
                    status._default.borders[type] = null;
                } else {
                    status._default.borders[type] = styles;
                }
            };

            /**
             * 重置初始状态
             */
            function resetCurrentStatus() {
                // 用默认配置覆盖现有配置
                $.extend(status, $.extend(true, {}, _status));

                var _default = status._default;

                resetNumberformat();

                resetAlignment();
                resetFont();
                resetBorder();
                resetFill();

                // 刷新快照
                statusSnapshot = $.extend(true, {}, status);

                // 重置数字格式
                function resetNumberformat() {
                    if (!btableStatus.numfmt) {
                        return;
                    }

                    var formatCodeInfo = numberformat.match(btableStatus.numfmt);

                    if (formatCodeInfo) {
                        status.formatSelected = [];
                        status.formatSelected[numberformatTypes.indexOf(formatCodeInfo.info.type)] = true;

                        _default.thousandth = formatCodeInfo.info.thousandth;
                        _default.code[formatCodeInfo.info.type] = formatCodeInfo.info.index;

                        if (formatCodeInfo.precision !== -1) {
                            _default.precision = formatCodeInfo.precision;
                        }

                        if (formatCodeInfo.currency !== -1) {
                            _default.currency = formatCodeInfo.currency;
                        }

                        status.format.number = numberFormatFilter(NUMBER_FORMAT.number, _default.precision, !!_default.thousandth);
                        status.format.currency = currencyFormatFilter(NUMBER_FORMAT.currency, _default.precision, CURRENCY[_default.currency].value);
                    }
                }

                // 重置对齐
                function resetAlignment() {
                    _default.hAlign = getIndex('hAlign', btableStatus.horizontal, _defaultStatus.hAlign);
                    _default.vAlign = getIndex('vAlign', btableStatus.vertical, _defaultStatus.vAlign);
                    _default.wraptext = !!btableStatus.wraptext;
                    _default.merge = !!btableStatus.mergecell;
                }

                function resetFont() {
                    var italic = btableStatus.italic ? 1 : 0;
                    var bold = btableStatus.bold ? 2 : 0;

                    _default.font = btableStatus.fontdetail.value;
                    _default.fontsize = btableStatus.fontsize;
                    _default.fontstyle = italic | bold;
                    _default.color = btableStatus.colordetail.value;
                    _default.underline = btableStatus.underline ? (btableStatus.underline === 'single' ? 1 : 2) : 0;
                    _default.throughline = btableStatus.throughline;
                }

                function resetBorder() {
                    /*
                     borderType: 0,
                     // border color
                     borderColor: null,
                     // 边框应用记录
                     borders: {
                     left: null,
                     center: null,
                     right: null,
                     top: null,
                     middle: null,
                     bottom: null
                     },
                     */
                }

                function resetFill() {
                    _default.fillColor = btableStatus.filldetail ? btableStatus.filldetail.value : null;
                }
            }

            function getCurrentBorderStyels() {
                return {
                    'border-width': BORDERS[status._default.borderType].width + 'px',
                    'border-style': BORDERS[status._default.borderType].type,
                    'border-color': status._default.borderColor
                };
            }

            function getIndex(type, value, defaultValue) {
                var index = INDEX_MAP[type][value];

                if (index === undefined) {
                    return defaultValue;
                }

                return index;
            }

            /* --- 检查更新值 --- */
            function checkChange() {
                var commands = [];

                checkNumberformat();
                checkAlign();
                checkFont();
                checkFill();

                return commands;

                /**
                 * 检查nubmerformat的更新，如果有新的变更，则生成对应的命令
                 */
                function checkNumberformat() {
                    var index = 0;

                    for (var i = 0, len = status.formatSelected.length; i < len; i++) {
                        if (status.formatSelected[i]) {
                            index = i;
                            break;
                        }
                    }

                    var code = numberformat.getNumberformatCode(index, status);

                    if (btableStatus.numfmt !== code) {
                        if (code) {
                            commands.push({
                                command: 'numfmt',
                                args: [code]
                            });
                        } else {
                            commands.push({
                                command: 'unsetstyle',
                                args: ['numfmt']
                            });
                        }
                    }
                }

                /**
                 * 检查对齐面板的更新，如果有变化，则生成更新命令
                 */
                function checkAlign() {
                    // 竖直对齐检查
                    if (statusSnapshot._default.vAlign !== status._default.vAlign) {
                        commands.push({
                            command: 'vertical',
                            args: [VERTICAL_ALIGNMENT[status._default.vAlign].value]
                        });
                    }

                    // 水平对齐检查
                    if (statusSnapshot._default.hAlign !== status._default.hAlign) {
                        commands.push({
                            command: 'horizontal',
                            args: [HORIZONTAL_ALIGNMENT[status._default.hAlign].value]
                        });
                    }

                    // 自动换行检查
                    if (statusSnapshot._default.wraptext !== status._default.wraptext) {
                        commands.push({
                            command: 'wraptext',
                            args: []
                        });
                    }

                    // 合并单元格检查
                    if (statusSnapshot._default.merge !== status._default.merge) {
                        commands.push({
                            command: 'centermergecell',
                            args: []
                        });
                    }
                }

                /**
                 * 检查字体面板的更新，如果有变化，则生成更新命令
                 */
                function checkFont() {
                    // 字体检查
                    if (statusSnapshot._default.font !== status._default.font) {
                        commands.push({
                            command: 'font',
                            args: [status._default.font]
                        });
                    }

                    // 字形检查
                    if (statusSnapshot._default.fontstyle !== status._default.fontstyle) {
                        if ((status._default.fontstyle & 1) !== (statusSnapshot._default.fontstyle & 1)) {
                            commands.push({
                                command: 'italic',
                                args: []
                            });
                        }

                        if ((status._default.fontstyle & 2) !== (statusSnapshot._default.fontstyle & 2)) {
                            commands.push({
                                command: 'bold',
                                args: []
                            });
                        }
                    }

                    // 字号检查
                    if (statusSnapshot._default.fontsize !== status._default.fontsize) {
                        commands.push({
                            command: 'fontsize',
                            args: [status._default.fontsize]
                        });
                    }

                    // 颜色检查
                    if (statusSnapshot._default.color !== status._default.color) {
                        commands.push({
                            command: 'color',
                            args: [status._default.color]
                        });
                    }

                    // 下划线检查
                    if (statusSnapshot._default.underline !== status._default.underline) {
                        if (status._default.underline === '0') {
                            commands.push({
                                command: 'unsetstyle',
                                args: ['underline']
                            });
                        } else {
                            commands.push({
                                command: 'underline',
                                args: [status._default.underline === '1' ? 'single' : 'double']
                            });
                        }
                    }

                    // 删除线检查
                    if (statusSnapshot._default.throughline !== status._default.throughline) {
                        console.log('throughline')
                        commands.push({
                            command: 'throughline',
                            args: []
                        });
                    }
                }

                /**
                 * 检查填充面板的更新，如果有变化，则生成更新命令
                 */
                function checkFill() {
                    // 填充色检查
                    if (statusSnapshot._default.fillColor !== status._default.fillColor) {
                        commands.push({
                            command: 'fill',
                            args: [status._default.fillColor]
                        });
                    }
                }
            }
        }
    ]);

    function initIndexMap(mapData) {
        var map = {};
        var current;
        var currentMap;

        for (var type in mapData) {
            if (!mapData.hasOwnProperty(type)) {
                continue;
            }

            current = mapData[type];
            currentMap = {};
            map[type] = currentMap;

            for (var i = 0, len = current.length; i < len; i++) {
                currentMap[current[i].value] = i;
            }
        }

        return map;
    }
})();
/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').filter('bCurrency', function() {
    return function(input, symbol) {
        return input.replace(/\$/g, symbol);
    };
});
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
});})();