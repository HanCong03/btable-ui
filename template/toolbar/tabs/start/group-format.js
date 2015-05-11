define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on">\n' +
'<b-numberformat unselectable="on" onselect="handler.formatSelect(type);"></b-numberformat>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column">\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="inc-precision" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-inc-precision"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="dec-precision" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-dec-precision"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="thousands" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-thousands"></span>\n' +
'</a>\n' +
'</div>\n' +
'</div>\n' +
'<button unselectable="on" type="button" class="btn b-btn b-open-cellformat-btn" ng-click="handler.openCellFormat(\'numberformat\')">\n' +
'<span unselectable="on" class="b-icon"></span>\n' +
'</button>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.number\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );