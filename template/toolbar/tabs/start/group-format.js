define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on">\n' +
'<div unselectable="on" class="btn-group b-drop-button" dropdown on-toggle="btnState.numberOpen=open;">\n' +
'<div unselectable="on" type="button" class="btn b-drop-button-bottom b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': btnState.numberOpen}">\n' +
'<span unselectable="on" class="b-big-icon b-icon-number"></span>\n' +
'{{\'toolbar.buttonlabel.numberformat\' | translate}}\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-general b-mr5"></span>\n' +
'{{\'toolbar.items.format.general\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-number b-mr5"></span>\n' +
'{{\'toolbar.items.format.number\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-currency b-mr5"></span>\n' +
'{{\'toolbar.items.format.currency\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-shortdate b-mr5"></span>\n' +
'{{\'toolbar.items.format.shortdate\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-longdate b-mr5"></span>\n' +
'{{\'toolbar.items.format.longdate\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-time b-mr5"></span>\n' +
'{{\'toolbar.items.format.time\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-percentage b-mr5"></span>\n' +
'{{\'toolbar.items.format.percentage\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-scientific b-mr5"></span>\n' +
'{{\'toolbar.items.format.scientific\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-big-icon b-icon-text b-mr5"></span>\n' +
'{{\'toolbar.items.format.text\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column">\n' +
'<a unselectable="on" class="btn b-btn" role="button">\n' +
'<span unselectable="on" class="b-icon b-icon-floatleft"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn" role="button">\n' +
'<span unselectable="on" class="b-icon b-icon-floatright"></span>\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn" role="button">\n' +
'<span unselectable="on" class="b-icon b-icon-precision"></span>\n' +
'</a>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.number\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );