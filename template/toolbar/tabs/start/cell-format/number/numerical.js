define( function () {
return '<div unselectable="on" class="b-numberformat-tabs-content b-column">\n' +
'<label unselectable="on">\n' +
'小数位数：<input unselectable="on" type="number" ng-model="status.precision" min="0" max="30">\n' +
'</label>\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox" ng-model="status.thousandth"><i unselectable="on"></i> 使用千分位分隔符\n' +
'</label>\n' +
'<label unselectable="on" class="b-column b-numberformat-preview">\n' +
'负数：\n' +
'<ul unselectable="on" class="b-cellformat-list">\n' +
'<li unselectable="on" ng-repeat="format in status.format.number" ng-style="{\'color\': format.color}" ng-class="{\'b-nubmerformat-preview-active\': status.numericalSelected === $index}" ng-click="status.numericalSelected=$index;">{{format.text}}</li>\n' +
'</ul>\n' +
'</label>\n' +
'<div unselectable="on" class="b-numberformat-desc">\n' +
'数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n' +
'</div>\n' +
'</div>\n';
} );