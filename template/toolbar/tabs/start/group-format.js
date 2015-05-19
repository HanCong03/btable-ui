define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on">\n' +
'<b-numberformat unselectable="on" onselect="handler.formatSelect(code);"></b-numberformat>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column">\n' +
'<a unselectable="on" class="btn b-btn"\n' +
'role="button"\n' +
'data-name="inc-precision"\n' +
'ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-inc-precision"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn"\n' +
'role="button"\n' +
'data-name="dec-precision"\n' +
'ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-dec-precision"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn"\n' +
'role="button"\n' +
'data-name="thousandth"\n' +
'ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-thousands"></span>\n' +
'</a>\n' +
'</div>\n' +
'</div>\n' +
'<button unselectable="on" type="button"\n' +
'class="btn b-btn b-open-cellformat-btn"\n' +
'ng-click="handler.openCellFormat(\'numberformat\')">\n' +
'<span unselectable="on" class="b-icon"></span>\n' +
'</button>\n' +
'<div unselectable="on" class="b-group-label">\n' +
'{{\'toolbar.grouplabel.number\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );