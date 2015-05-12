define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-column b-fontsgroup-layout">\n' +
'<div unselectable="on" class="b-row">\n' +
'<!-- unselectable="on" font family -->\n' +
'<b-inputselect unselectable="on" classname="b-fontfamily-select" change="handler.fontSelect(value);" select-value="values.fontfamily" values="initValue.fontfamily"></b-inputselect>\n' +
'<!-- unselectable="on" font size -->\n' +
'<b-inputselect unselectable="on" classname="b-fontsize-select" change="handler.fontsizeSelect(value);" only-number="true" select-value="values.fontsize" values="initValue.fontsize"></b-inputselect>\n' +
'</div>\n' +
'<div unselectable="on" class="b-toolbar-fonts-biu-wrap">\n' +
'<!-- unselectable="on" BIU -->\n' +
'<b-pressbutton unselectable="on" buttontype="bold" onchange="handler.pressChange(\'bold\', status)" pressed="false"></b-pressbutton>\n' +
'<b-pressbutton unselectable="on" buttontype="italic" onchange="handler.pressChange(\'italic\', status)" pressed="false"></b-pressbutton>\n' +
'<b-pressbutton unselectable="on" buttontype="underline" onchange="handler.pressChange(\'underline\', status)" pressed="false"></b-pressbutton>\n' +
'<div unselectable="on" class="b-toolbar-delimiter"></div>\n' +
'<!-- unselectable="on" border -->\n' +
'<div unselectable="on" class="btn-group" dropdown on-toggle="btnState.borderOpen=open;">\n' +
'<button unselectable="on" type="button" class="btn b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': btnState.borderOpen}">\n' +
'<span unselectable="on" class="b-icon b-icon-border"></span>\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</button>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'bottom\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-bottom b-mr5"></span>\n' +
'{{\'toolbar.items.border.bottom\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'top\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-top b-mr5"></span>\n' +
'{{\'toolbar.items.border.top\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'left\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-left b-mr5"></span>\n' +
'{{\'toolbar.items.border.left\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'right\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-right b-mr5"></span>\n' +
'{{\'toolbar.items.border.right\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'none\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-none b-mr5"></span>\n' +
'{{\'toolbar.items.border.none\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'all\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-all b-mr5"></span>\n' +
'{{\'toolbar.items.border.all\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on" ng-click="handler.borderSelect(\'outer\');">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-border-outer b-mr5"></span>\n' +
'{{\'toolbar.items.border.outer\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'<div unselectable="on" class="b-toolbar-delimiter"></div>\n' +
'<b-colorpicker unselectable="on" oncolorchange="handler.colorChange(\'background\', color);" colortype="bgcolor"></b-colorpicker>\n' +
'<b-colorpicker unselectable="on" oncolorchange="handler.colorChange(\'foreground\', color);" colortype="color"></b-colorpicker>\n' +
'</div>\n' +
'</div>\n' +
'<button unselectable="on" type="button" class="btn b-btn b-open-cellformat-btn" ng-click="handler.openCellFormat(\'font\')">\n' +
'<span unselectable="on" class="b-icon"></span>\n' +
'</button>\n' +
'<div unselectable="on" class="b-group-label">\n' +
'{{\'toolbar.grouplabel.fonts\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );