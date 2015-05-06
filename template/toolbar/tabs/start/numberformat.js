define( function () {
return '<div unselectable="on" class="btn-group b-drop-button" dropdown on-toggle="btnState.numberOpen=open;">\n' +
'<div unselectable="on" type="button" class="btn b-drop-button-bottom b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': btnState.numberOpen}">\n' +
'<span unselectable="on" class="b-big-icon b-icon-number"></span>\n' +
'{{\'toolbar.buttonlabel.numberformat\' | translate}}\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on" ng-repeat="type in types" ng-click="select($index)">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-{{type}} b-mr5"></span>\n' +
'{{\'toolbar.items.format.\' + type | translate}}\n' +
'</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n';
} );