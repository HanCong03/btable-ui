define( function () {
return '<div unselectable="on" class="b-numberformat-tabs-content b-column">\n' +
'<label unselectable="on">\n' +
'小数位数：<input unselectable="on" type="number" value="2" min="0" max="30">\n' +
'</label>\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox" id="t" ng-model="status.thousandth"><i unselectable="on"></i> 使用千分位分隔符\n' +
'</label>\n' +
'<label unselectable="on" class="b-column b-numberformat-preview">\n' +
'负数：\n' +
'<ul unselectable="on" class="b-cellformat-list">\n' +
'<li unselectable="on" ng-repeat="format in numberformatValues[0]" style="{{format.style}}" ng-class="{\'b-nubmerformat-preview-active\': status.numericalSelected === $index}" ng-click="status.numericalSelected=$index;">{{format.text}}</li>\n' +
'</ul>\n' +
'</label>\n' +
'<div unselectable="on" class="b-numberformat-desc">\n' +
'阿斯顿发斯蒂芬即可垃圾的收付款了；按时交地方\n' +
'</div>\n' +
'</div>\n';
} );