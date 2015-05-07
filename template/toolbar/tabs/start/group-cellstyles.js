define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<b-cellstyles unselectable="on" onselect="handler.selectCellstyle(id, isBuiltin);"></b-cellstyles>\n' +
'</div>\n' +
'<!-- unselectable="on" Button trigger modal -->\n' +
'<button unselectable="on" type="button" class="btn btn-lg b-cellformat-btn" data-toggle="modal" data-target="#cellFormatModal">\n' +
'a\n' +
'</button>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.style\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );