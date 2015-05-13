define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-column-left b-aligngroup-layout">\n' +
'<div unselectable="on" class="b-row-stretch">\n' +
'<b-verticalalign unselectable="on" onchange="handler.valignChange(status);" value="{{status.vertical}}"></b-verticalalign>\n' +
'<div unselectable="on" class="b-toolbar-delimiter"></div>\n' +
'<b-pressbutton unselectable="on" buttontype="wraptext" text="{{\'toolbar.buttonlabel.wraptext\' | translate}}" onchange="handler.pressChange(\'wraptext\', status)" pressed="status.wraptext"></b-pressbutton>\n' +
'</div>\n' +
'<div unselectable="on" class="b-row-stretch">\n' +
'<b-horizontalalign unselectable="on" onchange="handler.alignChange(status);" value="{{status.horizontal}}"></b-horizontalalign>\n' +
'<div unselectable="on" class="b-toolbar-delimiter"></div>\n' +
'<b-mergeselect unselectable="on" merge="res.merge" onchange="handler.mergechange(mode, value);"></b-mergeselect>\n' +
'</div>\n' +
'</div>\n' +
'<button unselectable="on" type="button" class="btn b-btn b-open-cellformat-btn" ng-click="handler.openCellFormat(\'alignment\')">\n' +
'<span unselectable="on" class="b-icon"></span>\n' +
'</button>\n' +
'<div unselectable="on" class="b-group-label">\n' +
'{{\'toolbar.grouplabel.alignments\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );