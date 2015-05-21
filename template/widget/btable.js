define( function () {
return '<div unselectable="on" class="b-header"\n' +
'b-toolbar>\n' +
'<div unselectable="on" class="b-toolbar"\n' +
'ng-controller="ToolbarBasicController">\n' +
'<tabset unselectable="on" class="b-toolbar-tabs-head">\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label b-toolbar-file-tab"\n' +
'disabled="true"\n' +
'ng-mousedown="controlClick();"\n' +
'heading="{{\'toolbar.tabs.file\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.start\' | translate}}"\n' +
'active="true">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.insert\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.layout\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.formula\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.data\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.review\' | translate}}">\n' +
'</tab>\n' +
'<tab unselectable="on" class="b-toolbar-tabs-label"\n' +
'heading="{{\'toolbar.tabs.view\' | translate}}">\n' +
'</tab>\n' +
'</tabset>\n' +
'</div>\n' +
'<div unselectable="on" class="b-row b-input-area">\n' +
'<div unselectable="on" class="b-btable-ctrl-btns"></div>\n' +
'<div unselectable="on" id="btableOuterInput" spellcheck="false" contenteditable="true" class="btable-input"></div>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-body">\n' +
'<div unselectable="on" class="btable-container"></div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-footer">\n' +
'<div unselectable="on" class="b-sheet-list">\n' +
'<div unselectable="on" b-sheetlist></div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-status-bar">\n' +
'就绪\n' +
'</div>\n' +
'</div>\n' +
'<ng-include unselectable="on" src="\'template/dialogs/cell-format.html \'"></ng-include>\n';
} );