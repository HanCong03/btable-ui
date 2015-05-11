define( function () {
return '<div unselectable="on" class="b-cell-format-box">\n' +
'<tabset unselectable="on">\n' +
'<tab unselectable="on" heading="{{\'dialog.cellformat.number\' | translate}}">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/number/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="对齐">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/alignment/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="字体">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/font/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="边框">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/border/index.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="填充">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/fill/index.html\'"></ng-include>\n' +
'</tab>\n' +
'</tabset>\n' +
'</div>\n';
} );