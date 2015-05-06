define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on" class="b-column">\n' +
'<div unselectable="on">\n' +
'<!-- unselectable="on" vertical alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.valignValue" btn-radio="\'top\'" ng-click="handler.valignChange(\'top\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-top"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.valignValue" btn-radio="\'middle\'" ng-click="handler.valignChange(\'middle\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-middle"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.valignValue" btn-radio="\'bottom\'" ng-click="handler.valignChange(\'bottom\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-bottom"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<!-- unselectable="on" horizontal alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.alignValue" btn-radio="\'left\'" ng-click="handler.alignChange(\'left\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-left"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.alignValue" btn-radio="\'center\'" ng-click="handler.alignChange(\'center\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-center"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="res.alignValue" btn-radio="\'right\'" ng-click="handler.alignChange(\'right\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-right"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column-left">\n' +
'<b-pressbutton unselectable="on" buttontype="wraptext" text="{{\'toolbar.buttonlabel.wraptext\' | translate}}" onchange="handler.pressChange(\'wraptext\', status)" pressed="false"></b-pressbutton>\n' +
'<b-mergeselect unselectable="on" merge="true" onchange="handler.mergechange(mode, value);"></b-mergeselect>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.alignments\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );