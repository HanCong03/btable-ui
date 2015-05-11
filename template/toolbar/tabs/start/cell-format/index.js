define( function () {
return '<div unselectable="on" class="b-cell-format-box">\n' +
'<tabset unselectable="on">\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.number\' | translate}}" active="status.tabSelected[0]">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/number/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.alignment\' | translate}}" active="status.tabSelected[1]">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/alignment/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.font\' | translate}}" active="status.tabSelected[2]">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/font/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.border\' | translate}}" active="status.tabSelected[3]">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/border/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.fill\' | translate}}" active="status.tabSelected[4]">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/fill/index.html\'"></ng-include>\n' +
'</tab>\n' +
'</tabset>\n' +
'</div>\n';
} );