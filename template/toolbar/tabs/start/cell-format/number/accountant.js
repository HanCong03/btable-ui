define( function () {
return '<div unselectable="on" class="b-numberformat-tabs-content b-column">\n' +
'<label unselectable="on">\n' +
'小数位数：\n' +
'<input unselectable="on" type="number"\n' +
'ng-model="status._default.precision"\n' +
'min="0"\n' +
'max="30">\n' +
'</label\n' +
'>\n' +
'<label unselectable="on">\n' +
'货币符号(国家/地区)：\n' +
'<select unselectable="on" ng-model="status._default.currency">\n' +
'<option unselectable="on" ng-repeat="symbol in currencyList"\n' +
'value="{{$index}}" ng-selected="{{$index === status._default.currency}}">\n' +
'{{symbol.text}}\n' +
'</option>\n' +
'</select>\n' +
'</label>\n' +
'<div unselectable="on" class="b-numberformat-desc">\n' +
'会计格式可对一列数值进行货币符号和小数点对齐。\n' +
'</div>\n' +
'</div>\n';
} );