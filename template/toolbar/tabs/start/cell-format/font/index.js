define( function () {
return '<div unselectable="on" class="b-numberformat-box b-font-tabs">\n' +
'<table unselectable="on" class="b-font-tabs-layout">\n' +
'<tbody unselectable="on">\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on">\n' +
'字体：\n' +
'<div unselectable="on" class="b-fontfamily-panel b-select-box">\n' +
'<input unselectable="on" ng-model="status.font">\n' +
'<select unselectable="on" size="100" ng-model="status.font">\n' +
'<option unselectable="on" ng-repeat="font in fonts" value="{{font.name}}">{{font.name}}</option>\n' +
'</select>\n' +
'</div>\n' +
'</td>\n' +
'<td unselectable="on">\n' +
'字形：\n' +
'<div unselectable="on" class="b-fontstyle-panel b-select-box">\n' +
'<input unselectable="on" ng-model="fontStyle[status.fontstyle].name">\n' +
'<select unselectable="on" ng-model="status.fontstyle" size="100">\n' +
'<option unselectable="on" ng-repeat="style in fontStyle" value="{{$index}}">{{style.name}}</option>\n' +
'</select>\n' +
'</div>\n' +
'</td>\n' +
'<td unselectable="on">\n' +
'字号：\n' +
'<div unselectable="on" class="b-fontsize-panel b-select-box">\n' +
'<input unselectable="on" ng-model="status.fontsize">\n' +
'<select unselectable="on" ng-model="status.fontsize" size="100">\n' +
'<option unselectable="on" ng-repeat="size in fontSize" value="{{size}}">{{size}}</option>\n' +
'</select>\n' +
'</div>\n' +
'</td>\n' +
'</tr>\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on">\n' +
'下划线：\n' +
'<div unselectable="on">\n' +
'<select unselectable="on" ng-model="status.underline">\n' +
'<option unselectable="on" ng-repeat="line in underline" value="{{$index}}">{{line.text}}</option>\n' +
'</select>\n' +
'</div>\n' +
'</td>\n' +
'<td unselectable="on">\n' +
'颜色：\n' +
'<div unselectable="on">\n' +
'<button unselectable="on" b-attr-colorpicker ng-model="status.color" type="button" class="btn b-color-btn b-row">\n' +
'<div unselectable="on" class="b-color-panel">\n' +
'<div unselectable="on" ng-style="{backgroundColor: status.color}"></div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-caret-wrap">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'</button>\n' +
'</div>\n' +
'</td>\n' +
'<td unselectable="on">\n' +
'</td>\n' +
'</tr>\n' +
'<tr unselectable="on">\n' +
'<td unselectable="on">\n' +
'特殊效果：\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox" ng-model="status.throughline"><i unselectable="on"></i> 删除线\n' +
'</label>\n' +
'</div>\n' +
'</td>\n' +
'<td unselectable="on" colspan="2">\n' +
'预览：\n' +
'<div unselectable="on" class="b-font-preview-box b-column">\n' +
'<span unselectable="on" ng-style="{\'font-family\': status.font, color: status.color, \'font-size\': status.fontsize + \'px\', \'font-style\': (status.fontstyle == 1 || status.fontstyle == 3)? \'italic\' : \'normal\', \'font-weight\': (status.fontstyle == 2 || status.fontstyle == 3)? \'900\' : \'normal\', \'text-decoration\': status.underline != 1 ? (status.throughline ? \'line-through\' : \'none\') : \'underline\'}">微软卓越 AaBbCc</span>\n' +
'</div>\n' +
'</td>\n' +
'</tr>\n' +
'</tbody>\n' +
'</table>\n' +
'</div>\n';
} );