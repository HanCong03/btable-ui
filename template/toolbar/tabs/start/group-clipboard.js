define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-clipboard-groups">\n' +
'<div unselectable="on" class="b-toolbar-clipboard-button-wrap">\n' +
'<div unselectable="on">\n' +
'<!-- unselectable="on" 粘贴按钮 -->\n' +
'<div unselectable="on" class="b-drap-button" ng-class="{\'b-open\': btnState.pasteOpen}">\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="paste" ng-click="handler.btnclick($event);" ng-class="{\'b-open\': btnState.pasteOpen}">\n' +
'<span unselectable="on" class="b-big-icon b-icon-paste"></span>\n' +
'</a>\n' +
'<div unselectable="on" class="btn-group b-drop-button" dropdown on-toggle="btnState.pasteOpen=open;">\n' +
'<div unselectable="on" type="button" class="btn b-drop-button-bottom b-btn dropdown-toggle" ng-class="{\'b-open\': btnState.pasteOpen}" dropdown-toggle>\n' +
'{{\'toolbar.buttonlabel.paste\' | translate}}\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on"><a unselectable="on" href="#">Action</a></li>\n' +
'<li unselectable="on"><a unselectable="on" href="#">Another action</a></li>\n' +
'<li unselectable="on"><a unselectable="on" href="#">Something else here</a></li>\n' +
'<li unselectable="on" class="divider"></li>\n' +
'<li unselectable="on"><a unselectable="on" href="#">Separated link</a></li>\n' +
'</ul>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'<!-- unselectable="on" 复制 剪切 -->\n' +
'<div unselectable="on" class="b-toolbar-clipboard-right-wrap">\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="cut" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-cut"></span>\n' +
'{{\'toolbar.buttonlabel.cut\' | translate}}\n' +
'</a>\n' +
'<a unselectable="on" class="btn b-btn" role="button" data-name="copy" ng-click="handler.btnclick($event);">\n' +
'<span unselectable="on" class="b-icon b-icon-copy"></span>\n' +
'{{\'toolbar.buttonlabel.copy\' | translate}}\n' +
'</a>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-group-label">\n' +
'{{\'toolbar.grouplabel.clipboard\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );