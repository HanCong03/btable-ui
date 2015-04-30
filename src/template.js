angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

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
    "            <div>\n" +
    "                <!-- vertical alignments -->\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"a\" btn-radio=\"'Left'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-top\"></span>\n" +
    "                    </label>\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"a\" btn-radio=\"'Middle'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-middle\"></span>\n" +
    "                    </label>\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"a\" btn-radio=\"'Right'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-bottom\"></span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <!-- horizontal alignments -->\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"radioModel\" btn-radio=\"'Left'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-left\"></span>\n" +
    "                    </label>\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"radioModel\" btn-radio=\"'Middle'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-center\"></span>\n" +
    "                    </label>\n" +
    "                    <label class=\"btn b-btn\" ng-model=\"radioModel\" btn-radio=\"'Right'\" uncheckable>\n" +
    "                        <span class=\"b-icon b-icon-right\"></span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"b-column-left\">\n" +
    "\n" +
    "            <!-- wrap text -->\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-wraptext\"></span>\n" +
    "                {{'toolbar.buttonlabel.wraptext' | translate}}\n" +
    "            </a>\n" +
    "\n" +
    "            <!-- merge cell -->\n" +
    "            <div class=\"b-button-select b-mergecell-selector\" ng-class=\"{'b-open': btnState.mergeOpen}\">\n" +
    "                <a class=\"btn b-btn b-mergeandcenter-button\" role=\"button\" ng-class=\"{'b-open': btnState.mergeOpen}\">\n" +
    "                    <span class=\"b-icon b-icon-merge\"></span>\n" +
    "                    {{'toolbar.buttonlabel.merge' | translate}}\n" +
    "                </a>\n" +
    "                <div class=\"btn-group\" dropdown on-toggle=\"btnState.mergeOpen=open;\">\n" +
    "                    <button type=\"button\" class=\"btn b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.mergeOpen}\">\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li>\n" +
    "                            <a class=\"b-row\">\n" +
    "                                <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                                {{'toolbar.items.merge.center' | translate}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a class=\"b-row\">\n" +
    "                                <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                                {{'toolbar.items.merge.across' | translate}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a class=\"b-row\">\n" +
    "                                <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                                {{'toolbar.items.merge.merge' | translate}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a class=\"b-row\">\n" +
    "                                <span class=\"b-icon b-icon-merge b-mr5\"></span>\n" +
    "                                {{'toolbar.items.merge.cancel' | translate}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.alignments' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-clipboard.html',
    "<div class=\"toolbar-groups b-toolbar-clipboard-groups\">\n" +
    "    <div class=\"b-toolbar-clipboard-button-wrap\">\n" +
    "\n" +
    "        <!-- 粘贴按钮 -->\n" +
    "        <div class=\"b-drap-button\" ng-class=\"{'b-open': btnState.pasteOpen}\">\n" +
    "            <a class=\"btn b-btn\" role=\"button\" ng-class=\"{'b-open': btnState.pasteOpen}\">\n" +
    "                <span class=\"b-big-icon b-icon-paste\"></span>\n" +
    "            </a>\n" +
    "\n" +
    "            <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.pasteOpen=open;\">\n" +
    "                <div type=\"button\" class=\"btn b-drop-button-bottom b-btn dropdown-toggle\" ng-class=\"{'b-open': btnState.pasteOpen}\" dropdown-toggle>\n" +
    "                    {{'toolbar.buttonlabel.paste' | translate}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </div>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li><a href=\"#\">Action</a></li>\n" +
    "                    <li><a href=\"#\">Another action</a></li>\n" +
    "                    <li><a href=\"#\">Something else here</a></li>\n" +
    "                    <li class=\"divider\"></li>\n" +
    "                    <li><a href=\"#\">Separated link</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- 复制 剪切 -->\n" +
    "        <div class=\"b-toolbar-clipboard-right-wrap\">\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-cut\"></span>\n" +
    "                {{'toolbar.buttonlabel.cut' | translate}}\n" +
    "            </a>\n" +
    "\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
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
    "    <div>\n" +
    "        <div class=\"b-row\">\n" +
    "            <!-- font family -->\n" +
    "            <b-inputselect classname=\"b-fontfamily-select\" select-value=\"'Arial'\" values=\"initValue.fontfamily\"></b-inputselect>\n" +
    "\n" +
    "            <!-- font size -->\n" +
    "            <b-inputselect classname=\"b-fontsize-select\" only-number=\"true\" select-value=\"10\" values=\"initValue.fontsize\"></b-inputselect>\n" +
    "        </div>\n" +
    "        <div class=\"b-toolbar-fonts-biu-wrap\">\n" +
    "\n" +
    "            <!-- BIU -->\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-model=\"a\" btn-checkbox btn-checkbox-true=\"1\" btn-checkbox-false=\"0\">\n" +
    "                <span class=\"b-icon b-icon-bold\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-model=\"b\" btn-checkbox btn-checkbox-true=\"1\" btn-checkbox-false=\"0\">\n" +
    "                <span class=\"b-icon b-icon-italic\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn b-btn\" ng-model=\"c\" btn-checkbox btn-checkbox-true=\"1\" btn-checkbox-false=\"0\">\n" +
    "                <span class=\"b-icon b-icon-underline\"></span>\n" +
    "            </button>\n" +
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
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-bottom b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.bottom' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-top b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.top' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-left b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.left' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-right b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.right' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-none b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.none' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-icon b-icon-border-all b-mr5\"></span>\n" +
    "                            {{'toolbar.items.border.all' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
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
    "            <colorpicker colortype=\"bgcolor\"></colorpicker>\n" +
    "            <colorpicker colortype=\"color\"></colorpicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.fonts' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-format.html',
    "<div class=\"toolbar-groups b-toolbar-fonts-groups\">\n" +
    "    <div class=\"b-row\">\n" +
    "        <div>\n" +
    "            <div class=\"btn-group b-drop-button\" dropdown on-toggle=\"btnState.numberOpen=open;\">\n" +
    "                <div type=\"button\" class=\"btn b-drop-button-bottom b-btn dropdown-toggle\" dropdown-toggle ng-class=\"{'b-open': btnState.numberOpen}\">\n" +
    "                    <span class=\"b-big-icon b-icon-number\"></span>\n" +
    "                    {{'toolbar.buttonlabel.numberformat' | translate}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                </div>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-general b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.general' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-number b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.number' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-currency b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.currency' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-shortdate b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.shortdate' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-longdate b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.longdate' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-time b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.time' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-percentage b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.percentage' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-scientific b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.scientific' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a class=\"b-row\">\n" +
    "                            <span class=\"b-big-icon b-icon-text b-mr5\"></span>\n" +
    "                            {{'toolbar.items.format.text' | translate}}\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"b-column\">\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-floatleft\"></span>\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-floatright\"></span>\n" +
    "            </a>\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-precision\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.number' | translate}}\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/group-undo.html',
    "<div class=\"toolbar-groups\">\n" +
    "    <div>\n" +
    "        <div>\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-undo\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <a class=\"btn b-btn\" role=\"button\">\n" +
    "                <span class=\"b-icon b-icon-redo\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        {{'toolbar.grouplabel.undo' | translate}}\n" +
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
    "</div>"
  );


  $templateCache.put('template/toolbar/tabs/start/inputselect.html',
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
