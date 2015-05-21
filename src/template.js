angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/dialogs/cell-format.html',
    "<!-- Modal -->\n" +
    "<div class=\"modal\" id=\"cellFormatModal\" style=\"display: none;\" ng-controller=\"CellForamtModalController\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\">{{'dialog.title.cellformat' | translate}}</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <ng-include src=\"'template/toolbar/tabs/start/cell-format/index.html'\"></ng-include>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-mousedown=\"modalOkClick($event);\">{{'common.ok' | translate}}</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">{{'common.cancel' | translate}}</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "        <tab heading=\"{{'dialog.cellformat.number' | translate}}\" active=\"status.tabSelected[0]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/number/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"{{'dialog.cellformat.alignment' | translate}}\" active=\"status.tabSelected[1]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/alignment/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"{{'dialog.cellformat.font' | translate}}\" active=\"status.tabSelected[2]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/font/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"{{'dialog.cellformat.border' | translate}}\" active=\"status.tabSelected[3]\">\n" +
    "            <ng-include src=\"'template/toolbar/tabs/start/cell-format/border/index.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"{{'dialog.cellformat.fill' | translate}}\" active=\"status.tabSelected[4]\">\n" +
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
    "\n" +
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
    "        <div>\n" +
    "            <!-- 粘贴按钮 -->\n" +
    "            <div class=\"b-drap-button\" ng-class=\"{'b-open': btnState.pasteOpen}\">\n" +
    "                <a class=\"btn b-btn\" role=\"button\" data-name=\"paste\" ng-click=\"handler.btnclick($event);\" ng-class=\"{'b-open': btnState.pasteOpen}\">\n" +
    "                    <span class=\"b-big-icon b-icon-paste\"></span>\n" +
    "                </a>\n" +
    "\n" +
    "                <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.pasteOpen=open;\">\n" +
    "                    <div type=\"button\" class=\"btn b-drop-button-bottom b-btn dropdown-toggle\" ng-class=\"{'b-open': btnState.pasteOpen}\" dropdown-toggle>\n" +
    "                        {{'toolbar.buttonlabel.paste' | translate}}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </div>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li><a href=\"#\">Action</a></li>\n" +
    "                        <li><a href=\"#\">Another action</a></li>\n" +
    "                        <li><a href=\"#\">Something else here</a></li>\n" +
    "                        <li class=\"divider\"></li>\n" +
    "                        <li><a href=\"#\">Separated link</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- 复制 剪切 -->\n" +
    "        <div class=\"b-toolbar-clipboard-right-wrap\">\n" +
    "            <a class=\"btn b-btn\" role=\"button\" data-name=\"cut\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-cut\"></span>\n" +
    "                {{'toolbar.buttonlabel.cut' | translate}}\n" +
    "            </a>\n" +
    "\n" +
    "            <a class=\"btn b-btn\" role=\"button\" data-name=\"copy\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-copy\"></span>\n" +
    "                {{'toolbar.buttonlabel.copy' | translate}}\n" +
    "            </a>\n" +
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
    "            <b-inputselect classname=\"b-fontfamily-select\" change=\"handler.fontSelect(value);\" select-value=\"status.font\" values=\"initValue.fontfamily\"></b-inputselect>\n" +
    "\n" +
    "            <!-- font size -->\n" +
    "            <b-inputselect classname=\"b-fontsize-select\" change=\"handler.fontsizeSelect(value);\" only-number=\"true\" select-value=\"status.fontsize\" values=\"initValue.fontsize\"></b-inputselect>\n" +
    "        </div>\n" +
    "        <div class=\"b-toolbar-fonts-biu-wrap\">\n" +
    "            <!-- BIU -->\n" +
    "            <b-pressbutton buttontype=\"bold\" onchange=\"handler.pressChange('bold', status)\" pressed=\"status.bold\"></b-pressbutton>\n" +
    "            <b-pressbutton buttontype=\"italic\" onchange=\"handler.pressChange('italic', status)\" pressed=\"status.italic\"></b-pressbutton>\n" +
    "            <b-pressbutton buttontype=\"underline\" onchange=\"handler.pressChange('underline', status)\" pressed=\"status.underline\"></b-pressbutton>\n" +
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
    "                    <li class=\"divider\"></li>\n" +
    "                    <li class=\"b-submenu-item\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-outer b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.linecolor' | translate}}\n" +
    "                        </a>\n" +
    "                        <ul class=\"dropdown-menu b-submenu\" b-submenu>\n" +
    "                            <li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"#\">Action</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                    <li class=\"b-submenu-item\">\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-outer b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.linestyle' | translate}}\n" +
    "                        </a>\n" +
    "                        <ul class=\"dropdown-menu b-border-submenu b-submenu\" b-submenu>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a class=\"b-border-linestyle b-border-linestyle-none\">无边框</a>\n" +
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
    "</div>"
  );


  $templateCache.put('template/toolbar/widget/buttonselect.html',
    "<div class=\"b-button-select b-mergecell-selector\" ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "    <a class=\"btn b-btn b-mergeandcenter-button\" role=\"button\" ng-class=\"{'b-open': isOpen || isSelected}\" ng-click=\"changeModel('center');\">\n" +
    "        <span class=\"b-icon b-icon-merge\"></span>\n" +
    "        {{'toolbar.buttonlabel.merge' | translate}}\n" +
    "    </a>\n" +
    "    <div class=\"btn-group\" dropdown on-toggle=\"isOpen=open;\">\n" +
    "        <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': isOpen || isSelected}\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('center');\">\n" +
    "                    <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.center' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('across');\">\n" +
    "                    <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.across' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('merge');\">\n" +
    "                    <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.merge' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a class=\"b-row\" ng-click=\"changeModel('cancel');\">\n" +
    "                    <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                    {{'toolbar.items.merge.cancel' | translate}}\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
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


  $templateCache.put('template/toolbar/widget/pressbutton.html',
    "<button type=\"button\" class=\"btn b-btn\" ng-model=\"pressed\" ng-click=\"toggle();\" btn-checkbox>\n" +
    "    <span class=\"b-icon b-icon-{{type}}\"></span>\n" +
    "    {{text}}\n" +
    "</button>"
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


  $templateCache.put('template/widget/btable.html',
    "<div class=\"b-header\"\n" +
    "     b-toolbar>\n" +
    "    <div class=\"b-toolbar\"\n" +
    "         ng-controller=\"ToolbarBasicController\">\n" +
    "\n" +
    "        <tabset class=\"b-toolbar-tabs-head\">\n" +
    "            <tab class=\"b-toolbar-tabs-label b-toolbar-file-tab\"\n" +
    "                 disabled=\"true\"\n" +
    "                 ng-mousedown=\"controlClick();\"\n" +
    "                 heading=\"{{'toolbar.tabs.file' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.start' | translate}}\"\n" +
    "                 active=\"true\">\n" +
    "                <ng-include b-include-replace src=\"'template/toolbar/tabs/start/index.html'\"></ng-include>\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.insert' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.layout' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.formula' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.data' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.review' | translate}}\">\n" +
    "            </tab>\n" +
    "\n" +
    "            <tab class=\"b-toolbar-tabs-label\"\n" +
    "                 heading=\"{{'toolbar.tabs.view' | translate}}\">\n" +
    "            </tab>\n" +
    "        </tabset>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"b-row b-input-area\">\n" +
    "        <div class=\"b-btable-ctrl-btns\"></div>\n" +
    "        <div id=\"btableOuterInput\" spellcheck=\"false\" contenteditable=\"true\" class=\"btable-input\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"b-body\">\n" +
    "    <div class=\"btable-container\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"b-footer\">\n" +
    "    <div class=\"b-sheet-list\">\n" +
    "        <div b-sheetlist></div>\n" +
    "    </div>\n" +
    "    <div class=\"b-status-bar\">\n" +
    "        就绪\n" +
    "    </div>\n" +
    "</div>\n" +
    "<ng-include src=\"'template/dialogs/cell-format.html'\"></ng-include>"
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
    "                ng-mousdown=\"rightClick($event);\"\n" +
    "                ng-disabled=\"!status.rightMore\">\n" +
    "            ...\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"b-sl-add-btn\" ng-mousedown=\"addSheet($event);\">+</div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
