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
    "                <button type=\"button\" class=\"btn btn-primary\">{{'common.ok' | translate}}</button>\n" +
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
    "        <div>\n" +
    "            <label for=\"modalHAlign\">水平对齐：</label>\n" +
    "            <select ng-model=\"status.hAlignSelected\">\n" +
    "                <option ng-repeat=\"align in horizontalAlign\" ng-selected=\"{{status.hAlignSelected === $index;}}\" value=\"{{$index}}\">{{align.text}}</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label for=\"modalHAlign\">垂直对齐：</label>\n" +
    "            <select ng-model=\"status.vAlignSelected\">\n" +
    "                <option ng-repeat=\"align in varticalAlign\" ng-selected=\"{{status.vAlignSelected === $index;}}\" value=\"{{$index}}\">{{align.text}}</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <fieldset>\n" +
    "        <legend>文本控制</legend>\n" +
    "        <div>\n" +
    "            <label class=\"i-checks\">\n" +
    "                <input type=\"checkbox\" ng-model=\"status.autowrap\"><i></i> 自动换行\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label class=\"i-checks\">\n" +
    "                <input type=\"checkbox\" ng-model=\"status.merge\"><i></i> 合并单元格\n" +
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
    "                <li ng-repeat=\"border in borderStyle\" ng-click=\"status.borderType = $index;\" ng-class=\"{'b-selected': status.borderType === $index}\">\n" +
    "                    <span style=\"border-bottom-width: {{border.width}}px; border-bottom-style: {{border.type}}; border-bottom-color: {{status.borderColor}}\">{{border.text}}</span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div>\n" +
    "                颜色：\n" +
    "                <div>\n" +
    "                    <button ng-model=\"status.borderColor\" b-attr-colorpicker type=\"button\" class=\"btn b-color-btn b-row\">\n" +
    "                        <div class=\"b-color-panel\">\n" +
    "                            <div ng-style=\"{backgroundColor: status.borderColor}\"></div>\n" +
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
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.top != null}\" ng-click=\"borderChange('top');\">上</button>\n" +
    "                        </td>\n" +
    "                        <td colspan=\"3\" rowspan=\"3\" valign=\"middle\" align=\"center\">\n" +
    "                            <div class=\"b-border-preview\">\n" +
    "                                <div class=\"b-border-preview-cell b-row\">\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                    <div>文本</div>\n" +
    "                                </div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-top\" ng-style=\"status.borders.top\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-middle\" ng-style=\"status.borders.middle\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-bottom\" ng-style=\"status.borders.bottom\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-left\" ng-style=\"status.borders.left\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-center\" ng-style=\"status.borders.center\"></div>\n" +
    "                                <div class=\"b-border-preview-line b-preview-line-right\" ng-style=\"status.borders.right\"></div>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td valign=\"middle\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.middle != null}\" ng-click=\"borderChange('middle');\">内</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td valign=\"bottom\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.bottom != null}\" ng-click=\"borderChange('bottom');\">下</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td></td>\n" +
    "                        <td valign=\"top\" align=\"left\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.left != null}\" ng-click=\"borderChange('left');\">左</button>\n" +
    "                        </td>\n" +
    "                        <td valign=\"top\" align=\"center\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.center != null}\" ng-click=\"borderChange('center');\">内</button>\n" +
    "                        </td>\n" +
    "                        <td valign=\"top\" align=\"right\">\n" +
    "                            <button class=\"btn b-border-line-btn\" ng-class=\"{'b-active': status.borders.right != null}\" ng-click=\"borderChange('right');\">右</button>\n" +
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
    "        <button b-attr-colorpicker ng-model=\"status.fillColor\" type=\"button\" class=\"btn b-color-btn b-row\">\n" +
    "            <div class=\"b-color-panel\">\n" +
    "                <div ng-style=\"{backgroundColor: status.fillColor}\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"b-caret-wrap\">\n" +
    "                <span class=\"caret\"></span>\n" +
    "            </div>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    预览：\n" +
    "    <div class=\"b-fill-preview-box\" ng-style=\"{backgroundColor: status.fillColor}\">\n" +
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
    "                    <input ng-model=\"status.font\">\n" +
    "                    <select size=\"100\" ng-model=\"status.font\">\n" +
    "                        <option ng-repeat=\"font in fonts\" value=\"{{font.name}}\">{{font.name}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                字形：\n" +
    "                <div class=\"b-fontstyle-panel b-select-box\">\n" +
    "                    <input ng-model=\"fontStyle[status.fontstyle].name\">\n" +
    "                    <select ng-model=\"status.fontstyle\" size=\"100\">\n" +
    "                        <option ng-repeat=\"style in fontStyle\" value=\"{{$index}}\">{{style.name}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                字号：\n" +
    "                <div class=\"b-fontsize-panel b-select-box\">\n" +
    "                    <input ng-model=\"status.fontsize\">\n" +
    "                    <select ng-model=\"status.fontsize\" size=\"100\">\n" +
    "                        <option ng-repeat=\"size in fontSize\" value=\"{{size}}\">{{size}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                下划线：\n" +
    "                <div>\n" +
    "                    <select ng-model=\"status.underline\">\n" +
    "                        <option ng-repeat=\"line in underline\" value=\"{{$index}}\">{{line.text}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                颜色：\n" +
    "                <div>\n" +
    "                    <button b-attr-colorpicker ng-model=\"status.color\" type=\"button\" class=\"btn b-color-btn b-row\">\n" +
    "                        <div class=\"b-color-panel\">\n" +
    "                            <div ng-style=\"{backgroundColor: status.color}\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"b-caret-wrap\">\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </div>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                特殊效果：\n" +
    "                <div>\n" +
    "                    <label class=\"i-checks\">\n" +
    "                        <input type=\"checkbox\" ng-model=\"status.throughline\"><i></i> 删除线\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td colspan=\"2\">\n" +
    "                预览：\n" +
    "                <div class=\"b-font-preview-box b-column\">\n" +
    "                    <span ng-style=\"{'font-family': status.font, color: status.color, 'font-size': status.fontsize + 'px', 'font-style': (status.fontstyle == 1 || status.fontstyle == 3)? 'italic' : 'normal', 'font-weight': (status.fontstyle == 2 || status.fontstyle == 3)? '900' : 'normal', 'text-decoration': status.underline != 1 ? (status.throughline ? 'line-through' : 'none') : 'underline'}\">微软卓越 AaBbCc</span>\n" +
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


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/currency.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" value=\"2\" min=\"0\" max=\"30\">\n" +
    "    </label>\n" +
    "    <label>\n" +
    "        货币符号(国家/地区)：\n" +
    "        <select ng-model=\"status.currencySymbol\">\n" +
    "            <option ng-repeat=\"symbol in config.currency\" value=\"{{$index}}\">{{symbol}}</option>\n" +
    "        </select>\n" +
    "    </label>\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        负数：\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in numberformatValues[1]\" style=\"{{format.style}}\" ng-class=\"{'b-nubmerformat-preview-active': status.currencySelected === $index}\" ng-click=\"status.currencySelected=$index;\">{{format.text | bCurrency:config.currency[status.currencySymbol]}}</li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
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
    "            <li ng-repeat=\"format in numberformatValues[3]\" ng-class=\"{'b-nubmerformat-preview-active': status.dateSelected === $index}\" ng-click=\"status.dateSelected=$index;\">{{format.text}}</li>\n" +
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
    "        暂不支持\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/index.html',
    "<div class=\"b-numberformat-box\">\n" +
    "    <label>分类：</label>\n" +
    "    <tabset vertical=\"true\" class=\"b-numberformat-tabs b-row\">\n" +
    "        <tab heading=\"常规\">常规单元格格式不包含任何特定的数字格式。</tab>\n" +
    "        <tab heading=\"数值\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/numerical.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"货币\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/currency.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"会计专用\">常规单元格格式不包含任何特定的数字格式。</tab>\n" +
    "        <tab heading=\"日期\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/date.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"时间\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/time.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"百分比\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/percentage.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"分数\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/fraction.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"科学计数法\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/scientific.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "        <tab heading=\"文本\">\n" +
    "            <ng-include b-include-replace src=\"'template/toolbar/tabs/start/cell-format/number/text.html'\"></ng-include>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/numerical.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" value=\"2\" min=\"0\" max=\"30\">\n" +
    "    </label>\n" +
    "    <label class=\"i-checks\">\n" +
    "        <input type=\"checkbox\" ng-model=\"status.thousandth\"><i></i> 使用千分位分隔符\n" +
    "    </label>\n" +
    "    <label class=\"b-column b-numberformat-preview\">\n" +
    "        负数：\n" +
    "        <ul class=\"b-cellformat-list\">\n" +
    "            <li ng-repeat=\"format in numberformatValues[0]\" style=\"{{format.style}}\" ng-class=\"{'b-nubmerformat-preview-active': status.numericalSelected === $index}\" ng-click=\"status.numericalSelected=$index;\">{{format.text}}</li>\n" +
    "        </ul>\n" +
    "    </label>\n" +
    "    <div class=\"b-numberformat-desc\">\n" +
    "        数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/percentage.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" value=\"2\" min=\"0\" max=\"30\">\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/cell-format/number/scientific.html',
    "<div class=\"b-numberformat-tabs-content b-column\">\n" +
    "    <label>\n" +
    "        小数位数：<input type=\"number\" value=\"2\" min=\"0\" max=\"30\">\n" +
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
    "            <li ng-repeat=\"format in numberformatValues[4]\" ng-class=\"{'b-nubmerformat-preview-active': status.timeSelected === $index}\" ng-click=\"status.timeSelected=$index;\">{{format.text}}</li>\n" +
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
    "    <div class=\"b-row\">\n" +
    "        <div class=\"b-column\">\n" +
    "            <b-verticalalign onchange=\"handler.valignChange(status);\" value=\"res.valignValue\"></b-verticalalign>\n" +
    "            <b-horizontalalign onchange=\"handler.alignChange(status);\" value=\"res.alignValue\"></b-horizontalalign>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"b-column-left\">\n" +
    "            <b-pressbutton buttontype=\"wraptext\" text=\"{{'toolbar.buttonlabel.wraptext' | translate}}\" onchange=\"handler.pressChange('wraptext', status)\" pressed=\"false\"></b-pressbutton>\n" +
    "            <b-mergeselect merge=\"res.merge\" onchange=\"handler.mergechange(mode, value);\"></b-mergeselect>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn b-btn b-open-cellformat-btn\" ng-click=\"handler.openCellFormat('alignment')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.alignments' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-cellstyles.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <b-cellstyles onselect=\"handler.selectCellstyle(id, isBuiltin);\"></b-cellstyles>\n" +
    "    </div>\n" +
    "    <div>\n" +
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
    "    <div>\n" +
    "        {{'toolbar.grouplabel.clipboard' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-fonts.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-column b-fontsgroup-layout\">\n" +
    "        <div class=\"b-row\">\n" +
    "            <!-- font family -->\n" +
    "            <b-inputselect classname=\"b-fontfamily-select\" change=\"handler.fontSelect(value);\" select-value=\"values.fontfamily\" values=\"initValue.fontfamily\"></b-inputselect>\n" +
    "\n" +
    "            <!-- font size -->\n" +
    "            <b-inputselect classname=\"b-fontsize-select\" change=\"handler.fontsizeSelect(value);\" only-number=\"true\" select-value=\"values.fontsize\" values=\"initValue.fontsize\"></b-inputselect>\n" +
    "        </div>\n" +
    "        <div class=\"b-toolbar-fonts-biu-wrap\">\n" +
    "\n" +
    "            <!-- BIU -->\n" +
    "            <b-pressbutton buttontype=\"bold\" onchange=\"handler.pressChange('bold', status)\" pressed=\"false\"></b-pressbutton>\n" +
    "            <b-pressbutton buttontype=\"italic\" onchange=\"handler.pressChange('italic', status)\" pressed=\"false\"></b-pressbutton>\n" +
    "            <b-pressbutton buttontype=\"underline\" onchange=\"handler.pressChange('underline', status)\" pressed=\"false\"></b-pressbutton>\n" +
    "\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <!-- border -->\n" +
    "            <div class=\"btn-group\" dropdown on-toggle=\"btnState.borderOpen=open;\">\n" +
    "                <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.borderOpen}\">\n" +
    "                    <span class=\"b-icon b-icon-border\"></span>\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
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
    "                </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "            <b-colorpicker oncolorchange=\"handler.colorChange('background', color);\" colortype=\"bgcolor\"></b-colorpicker>\n" +
    "            <b-colorpicker oncolorchange=\"handler.colorChange('foreground', color);\" colortype=\"color\"></b-colorpicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn b-btn b-open-cellformat-btn\" ng-click=\"handler.openCellFormat('font')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.fonts' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-format.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <b-numberformat onselect=\"handler.formatSelect(type);\"></b-numberformat>\n" +
    "        </div>\n" +
    "        <div class=\"b-column\">\n" +
    "            <a class=\"btn b-btn\" role=\"button\" data-name=\"inc-precision\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-inc-precision\"></span>\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\" role=\"button\" data-name=\"dec-precision\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-dec-precision\"></span>\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\" role=\"button\" data-name=\"thousandth\" ng-click=\"handler.btnclick($event);\">\n" +
    "                <span class=\"b-icon b-icon-thousands\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn b-btn b-open-cellformat-btn\" ng-click=\"handler.openCellFormat('numberformat')\">\n" +
    "        <span class=\"b-icon\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.number' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-undo.html',
    "<div class=\"toolbar-groups\">\n" +
    "    <div>\n" +
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
    "    <div>\n" +
    "        {{'toolbar.grouplabel.undo' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/horizontalalign.html',
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


  $templateCache.put('template/toolbar/tabs/start/index.html',
    "<div class=\"toolbar-tabs-content\">\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-undo.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-clipboard.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-fonts.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-alignments.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-format.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "\n" +
    "    <ng-include class=\"b-tabs-page\" src=\"'template/toolbar/tabs/start/group-cellstyles.html'\"></ng-include>\n" +
    "    <div class=\"b-toolbar-delimiter\"></div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/numberformat.html',
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


  $templateCache.put('template/toolbar/tabs/start/pressbutton.html',
    "<button type=\"button\" class=\"btn b-btn\" ng-model=\"status\" ng-click=\"toggle();\" btn-checkbox>\n" +
    "    <span class=\"b-icon b-icon-{{type}}\"></span>\n" +
    "    {{text}}\n" +
    "</button>"
  );


  $templateCache.put('template/toolbar/tabs/start/verticalalign.html',
    "<div>\n" +
    "    <!-- vertical alignments -->\n" +
    "    <div class=\"btn-group\">\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'top'\" ng-click=\"alignChange('top');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-top\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'middle'\" ng-click=\"alignChange('middle');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-middle\"></span>\n" +
    "        </label>\n" +
    "        <label class=\"btn b-btn\" ng-model=\"value\" btn-radio=\"'bottom'\" ng-click=\"alignChange('bottom');\" uncheckable>\n" +
    "            <span class=\"b-icon b-icon-bottom\"></span>\n" +
    "        </label>\n" +
    "    </div>\n" +
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

}]);
