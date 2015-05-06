define( function () {
return '<div unselectable="on">\n' +
'<!-- unselectable="on" vertical alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'top\'" ng-click="alignChange(\'top\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-top"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'middle\'" ng-click="alignChange(\'middle\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-middle"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'bottom\'" ng-click="alignChange(\'bottom\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-bottom"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n';
} );