define( function () {
return '<div unselectable="on" class="b-input-select {{classname}}" ng-class="{\'b-open\': isOpen}">\n' +
'<input unselectable="on" ng-model="selectValue" class="b-input-select-input">\n' +
'<div unselectable="on" class="btn-group" dropdown on-toggle="toggle(open)">\n' +
'<button unselectable="on" type="button" class="btn b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': isOpen}">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</button>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on" ng-repeat="font in values" data-value="{{font}}" class="b-input-select-item">\n' +
'<a unselectable="on" style=\'font-family: {{font}};\'>{{font}}</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'</div>\n';
} );