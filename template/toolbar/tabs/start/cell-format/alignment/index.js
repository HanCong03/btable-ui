define( function () {
return '<div unselectable="on" class="b-numberformat-box">\n' +
'<fieldset unselectable="on">\n' +
'<legend unselectable="on">文本对齐方式</legend>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" for="modalHAlign">水平对齐：</label>\n' +
'<select unselectable="on" ng-model="status.hAlignSelected">\n' +
'<option unselectable="on" ng-repeat="align in horizontalAlign" ng-selected="{{status.hAlignSelected === $index;}}" value="{{$index}}">{{align.text}}</option>\n' +
'</select>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" for="modalHAlign">垂直对齐：</label>\n' +
'<select unselectable="on" ng-model="status.vAlignSelected">\n' +
'<option unselectable="on" ng-repeat="align in verticalAlign" ng-selected="{{status.vAlignSelected === $index;}}" value="{{$index}}">{{align.text}}</option>\n' +
'</select>\n' +
'</div>\n' +
'</fieldset>\n' +
'<fieldset unselectable="on">\n' +
'<legend unselectable="on">文本控制</legend>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox" ng-model="status.autowrap"><i unselectable="on"></i> 自动换行\n' +
'</label>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<label unselectable="on" class="i-checks">\n' +
'<input unselectable="on" type="checkbox" ng-model="status.merge"><i unselectable="on"></i> 合并单元格\n' +
'</label>\n' +
'</div>\n' +
'</fieldset>\n' +
'</div>\n';
} );