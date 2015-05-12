define( function () {
return '<div unselectable="on" class="b-numberformat-box">\n' +
'<label unselectable="on">分类：</label>\n' +
'<tabset unselectable="on" vertical="true" class="b-numberformat-tabs b-row">\n' +
'<tab unselectable="on" heading="常规" active="status.formatSelected[0]">常规单元格格式不包含任何特定的数字格式。</tab>\n' +
'<tab unselectable="on" heading="数值" active="status.formatSelected[1]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/numerical.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="货币" active="status.formatSelected[2]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/currency.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="会计专用" active="status.formatSelected[3]">常规单元格格式不包含任何特定的数字格式。</tab>\n' +
'<tab unselectable="on" heading="日期" active="status.formatSelected[4]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/date.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="时间" active="status.formatSelected[5]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/time.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="百分比" active="status.formatSelected[6]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/percentage.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="分数" active="status.formatSelected[7]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/fraction.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="科学计数法" active="status.formatSelected[8]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/scientific.html\'"></ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="文本" active="status.formatSelected[9]">\n' +
'<ng-include unselectable="on" b-include-replace src="\'template/toolbar/tabs/start/cell-format/number/text.html\'"></ng-include>\n' +
'</tab>\n' +
'</tabset>\n' +
'</div>\n';
} );