define( function () {
return '<div unselectable="on" class="b-numberformat-tabs-content b-column">\n' +
'<label unselectable="on">\n' +
'类型：\n' +
'</label>\n' +
'<label unselectable="on" class="b-column b-numberformat-preview">\n' +
'<ul unselectable="on" class="b-cellformat-list">\n' +
'<li unselectable="on" ng-repeat="format in numberformatValues[4]" ng-class="{\'b-nubmerformat-preview-active\': status.timeSelected === $index}" ng-click="status.timeSelected=$index;">{{format.text}}</li>\n' +
'</ul>\n' +
'</label>\n' +
'<div unselectable="on" class="b-numberformat-desc">\n' +
'数值格式用于一般数字的表示。货币和会计格式则提供货币值计算的专用格式。\n' +
'</div>\n' +
'</div>\n';
} );