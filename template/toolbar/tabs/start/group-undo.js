define( function () {
return '<div unselectable="on" class="toolbar-groups">\n' +
'<div unselectable="on">\n' +
'<div unselectable="on">\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="undo" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-undo"></span>\n' +
'</a>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="redo" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-redo"></span>\n' +
'</a>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.undo\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );