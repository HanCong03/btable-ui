define( function () {
return '<div unselectable="on" class="b-button-select b-mergecell-selector" ng-class="{\'b-open\': isOpen || isSelected}">\n' +
'<a unselectable="on" class="btn b-btn b-mergeandcenter-button" role="button" ng-class="{\'b-open\': isOpen || isSelected}" ng-click="changeModel(\'center\');">\n' +
'<span unselectable="on" class="b-icon b-icon-merge"></span>\n' +
'{{\'toolbar.buttonlabel.merge\' | translate}}\n' +
'</a>\n' +
'<div unselectable="on" class="btn-group" dropdown on-toggle="isOpen=open;">\n' +
'<button unselectable="on" type="button" class="btn b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': isOpen || isSelected}">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</button>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row" ng-click="changeModel(\'center\');">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.center\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row" ng-click="changeModel(\'across\');">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.across\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row" ng-click="changeModel(\'merge\');">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.merge\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row" ng-click="changeModel(\'cancel\');">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.cancel\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'</div>\n';
} );