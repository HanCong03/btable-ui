define( function () {
return '<div unselectable="on" class="b-numberformat-box">\n' +
'<label unselectable="on">分类：</label>\n' +
'<tabset unselectable="on" vertical="true" class="b-numberformat-tabs b-row">\n' +
'<tab unselectable="on" heading="常规"\n' +
'active="status.formatSelected[0]">\n' +
'常规单元格格式不包含任何特定的数字格式。\n' +
'</tab>\n' +
'<tab unselectable="on" heading="数值"\n' +
'active="status.formatSelected[1]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/numerical.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="货币"\n' +
'active="status.formatSelected[2]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/currency.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="会计专用"\n' +
'active="status.formatSelected[3]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/accountant.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="日期"\n' +
'active="status.formatSelected[4]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/date.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="时间"\n' +
'active="status.formatSelected[5]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/time.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="百分比"\n' +
'active="status.formatSelected[6]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/percentage.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="分数"\n' +
'active="status.formatSelected[7]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/fraction.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="科学计数法"\n' +
'active="status.formatSelected[8]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/scientific.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'<tab unselectable="on" heading="文本"\n' +
'active="status.formatSelected[9]">\n' +
'<ng-include unselectable="on" b-include-replace\n' +
'src="\'template/toolbar/tabs/start/cell-format/number/text.html\'">\n' +
'</ng-include>\n' +
'</tab>\n' +
'</tabset>\n' +
'</div>\n';
} );