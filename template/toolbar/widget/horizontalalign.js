define( function () {
return '<div unselectable="on">\n' +
'<!-- unselectable="on" horizontal alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'left\'" ng-click="alignChange(\'left\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-left"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'center\'" ng-click="alignChange(\'center\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-center"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="value" btn-radio="\'right\'" ng-click="alignChange(\'right\');" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-right"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n';
} );