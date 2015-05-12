define( function () {
return '<div unselectable="on" class="b-numberformat-tabs-content b-column">\n' +
'<label unselectable="on">\n' +
'小数位数：<input unselectable="on" type="number" ng-model="status.precision" min="0" max="30">\n' +
'</label>\n' +
'<label unselectable="on">\n' +
'货币符号(国家/地区)：\n' +
'<select unselectable="on" ng-model="status.currency">\n' +
'<option unselectable="on" ng-repeat="symbol in currencyList" value="{{$index}}">{{symbol.text}}</option>\n' +
'</select>\n' +
'</label>\n' +
'<label unselectable="on" class="b-column b-numberformat-preview">\n' +
'负数：\n' +
'<ul unselectable="on" class="b-cellformat-list">\n' +
'<li unselectable="on" ng-repeat="format in status.format.currency" ng-style="{\'color\': format.color}" ng-class="{\'b-nubmerformat-preview-active\': status.currencySelected === $index}" ng-click="status.currencySelected=$index;">{{format.text}}</li>\n' +
'</ul>\n' +
'</label>\n' +
'<div unselectable="on" class="b-numberformat-desc">\n' +
'数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n' +
'</div>\n' +
'</div>\n';
} );