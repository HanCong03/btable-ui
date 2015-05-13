define( function () {
return '<div unselectable="on" class="b-numberformat-box">\n' +
'<fieldset unselectable="on">\n' +
'<legend unselectable="on">文本对齐方式</legend>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on">\n' +
'水平对齐：\n' +
'<select unselectable="on" ng-model="status._default.hAlign">\n' +
'<option unselectable="on" ng-repeat="align in horizontalAlign"\n' +
'ng-selected="{{status.hAlignSelected === $index;}}"\n' +
'value="{{$index}}">\n' +
'{{align.text}}\n' +
'</option>\n' +
'</select>\n' +
'</label>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on">\n' +
'垂直对齐：\n' +
'<select unselectable="on" ng-model="status._default.vAlign">\n' +
'<option unselectable="on" ng-repeat="align in verticalAlign"\n' +
'ng-selected="{{status._default.vAlign === $index;}}"\n' +
'value="{{$index}}">\n' +
'{{align.text}}\n' +
'</option>\n' +
'</select>\n' +
'</label>\n' +
'</div>\n' +
'</fieldset>\n' +
'<fieldset unselectable="on">\n' +
'<legend unselectable="on">文本控制</legend>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox"\n' +
'ng-model="status._default.autowrap">\n' +
'<i unselectable="on"></i>\n' +
'自动换行\n' +
'</label>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox"\n' +
'ng-model="status._default.merge">\n' +
'<i unselectable="on"></i>\n' +
'合并单元格\n' +
'</label>\n' +
'</div>\n' +
'</fieldset>\n' +
'</div>\n';
} );