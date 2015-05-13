define( function () {
return '<div unselectable="on" class="b-numberformat-box b-border-box-tabs b-row">\n' +
'<div unselectable="on">\n' +
'<fieldset unselectable="on" class="b-border-line-box">\n' +
'<legend unselectable="on">线条</legend>\n' +
'<ul unselectable="on" class="b-border-style-list">\n' +
'<li unselectable="on" ng-repeat="border in borderStyle" ng-click="status._default.borderType = $index;" ng-class="{\'b-selected\': status._default.borderType === $index}">\n' +
'<span unselectable="on" style="border-bottom-width: {{border.width}}px; border-bottom-style: {{border.type}}; border-bottom-color: {{status._default._default.borderColor}}">{{border.text}}</span>\n' +
'</li>\n' +
'</ul>\n' +
'<div unselectable="on">\n' +
'颜色：\n' +
'<div unselectable="on">\n' +
'<button unselectable="on" ng-model="status._default.borderColor" b-attr-colorpicker type="button" class="btn b-color-btn b-row">\n' +
'<div unselectable="on" class="b-color-panel">\n' +
'<div unselectable="on" ng-style="{backgroundColor: status._default.borderColor}"></div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-caret-wrap">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'</button>\n' +
'</div>\n' +
'</div>\n' +
'</fieldset>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column b-border-type-box">\n' +
'<fieldset unselectable="on" class="b-border-builtin-box">\n' +
'<legend unselectable="on">预置</legend>\n' +
'<button unselectable="on" ng-click="clearBorder(\'all\');">无</button>\n' +
'<button unselectable="on" ng-click="builtinBorderChange(\'outer\');">外边框</button>\n' +
'<button unselectable="on" ng-click="builtinBorderChange(\'inner\');">内部</button>\n' +
'</fieldset>\n' +
'<fieldset unselectable="on" class="b-border-ctrl-box">\n' +
'<legend unselectable="on">边框</legend>\n' +
'<table unselectable="on">\n' +
'<tbody unselectable="on">\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on" valign="top" align="right">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.top != null}" ng-click="borderChange(\'top\');">上</button>\n' +
'</td>\n' +
'<td unselectable="on" colspan="3" rowspan="3" valign="middle" align="center">\n' +
'<div unselectable="on" class="b-border-preview">\n' +
'<div unselectable="on" class="b-border-preview-cell b-row">\n' +
'<div unselectable="on">文本</div>\n' +
'<div unselectable="on">文本</div>\n' +
'<div unselectable="on">文本</div>\n' +
'<div unselectable="on">文本</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-top" ng-style="status._default.borders.top"></div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-middle" ng-style="status._default.borders.middle"></div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-bottom" ng-style="status._default.borders.bottom"></div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-left" ng-style="status._default.borders.left"></div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-center" ng-style="status._default.borders.center"></div>\n' +
'<div unselectable="on" class="b-border-preview-line b-preview-line-right" ng-style="status._default.borders.right"></div>\n' +
'</div>\n' +
'</td>\n' +
'</tr>\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on" valign="middle" align="right">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.middle != null}" ng-click="borderChange(\'middle\');">内</button>\n' +
'</td>\n' +
'</tr>\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on" valign="bottom" align="right">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.bottom != null}" ng-click="borderChange(\'bottom\');">下</button>\n' +
'</td>\n' +
'</tr>\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on"></td>\n' +
'<td unselectable="on" valign="top" align="left">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.left != null}" ng-click="borderChange(\'left\');">左</button>\n' +
'</td>\n' +
'<td unselectable="on" valign="top" align="center">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.center != null}" ng-click="borderChange(\'center\');">内</button>\n' +
'</td>\n' +
'<td unselectable="on" valign="top" align="right">\n' +
'<button unselectable="on" class="btn b-border-line-btn" ng-class="{\'b-active\': status._default.borders.right != null}" ng-click="borderChange(\'right\');">右</button>\n' +
'</td>\n' +
'</tr>\n' +
'</tbody>\n' +
'</table>\n' +
'</fieldset>\n' +
'</div>\n' +
'</div>\n';
} );