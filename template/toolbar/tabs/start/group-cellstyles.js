define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<b-cellstyles unselectable="on" onselect="handler.selectCellstyle(id, isBuiltin);"></b-cellstyles>\n' +
'</div>\n' +
'<div unselectable="on" class="b-group-label">\n' +
'{{\'toolbar.grouplabel.style\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );