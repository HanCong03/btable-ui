define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on" class="b-column">\n' +
'<b-verticalalign unselectable="on" onchange="handler.valignChange(status);" value="middle"></b-verticalalign>\n' +
'<b-horizontalalign unselectable="on" onchange="handler.alignChange(status);" value="left"></b-horizontalalign>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column-left">\n' +
'<b-pressbutton unselectable="on" buttontype="wraptext" text="{{\'toolbar.buttonlabel.wraptext\' | translate}}" onchange="handler.pressChange(\'wraptext\', status)" pressed="false"></b-pressbutton>\n' +
'<b-mergeselect unselectable="on" merge="true" onchange="handler.mergechange(mode, value);"></b-mergeselect>\n' +
'</div>\n' +
'</div>\n' +
'<button unselectable="on" type="button" class="btn b-btn b-open-cellformat-btn" ng-click="handler.openCellFormat(\'alignment\')">\n' +
'<span unselectable="on" class="b-icon"></span>\n' +
'</button>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.alignments\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );