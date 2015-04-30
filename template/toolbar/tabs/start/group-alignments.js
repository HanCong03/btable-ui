define( function () {
return '<div unselectable="on" class="toolbar-groups b-toolbar-fonts-groups">\n' +
'<div unselectable="on" class="b-row">\n' +
'<div unselectable="on" class="b-column">\n' +
'<div unselectable="on">\n' +
'<!-- unselectable="on" vertical alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="a" btn-radio="\'Left\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-top"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="a" btn-radio="\'Middle\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-middle"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="a" btn-radio="\'Right\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-bottom"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'<!-- unselectable="on" horizontal alignments -->\n' +
'<div unselectable="on" class="btn-group">\n' +
'<label unselectable="on" class="btn b-btn" ng-model="radioModel" btn-radio="\'Left\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-left"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="radioModel" btn-radio="\'Middle\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-center"></span>\n' +
'</label>\n' +
'<label unselectable="on" class="btn b-btn" ng-model="radioModel" btn-radio="\'Right\'" uncheckable>\n' +
'<span unselectable="on" class="b-icon b-icon-right"></span>\n' +
'</label>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-column-left">\n' +
'<!-- unselectable="on" wrap text -->\n' +
'<a unselectable="on" class="btn b-btn" role="button">\n' +
'<span unselectable="on" class="b-icon b-icon-wraptext"></span>\n' +
'{{\'toolbar.buttonlabel.wraptext\' | translate}}\n' +
'</a>\n' +
'<!-- unselectable="on" merge cell -->\n' +
'<div unselectable="on" class="b-button-select b-mergecell-selector" ng-class="{\'b-open\': btnState.mergeOpen}">\n' +
'<a unselectable="on" class="btn b-btn b-mergeandcenter-button" role="button" ng-class="{\'b-open\': btnState.mergeOpen}">\n' +
'<span unselectable="on" class="b-icon b-icon-merge"></span>\n' +
'{{\'toolbar.buttonlabel.merge\' | translate}}\n' +
'</a>\n' +
'<div unselectable="on" class="btn-group" dropdown on-toggle="btnState.mergeOpen=open;">\n' +
'<button unselectable="on" type="button" class="btn b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': btnState.mergeOpen}">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</button>\n' +
'<ul unselectable="on" class="dropdown-menu" role="menu">\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.center\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.across\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.merge\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'<li unselectable="on">\n' +
'<a unselectable="on" class="b-row">\n' +
'<span unselectable="on" class="b-icon b-icon-merge b-mr5"></span>\n' +
'{{\'toolbar.items.merge.cancel\' | translate}}\n' +
'</a>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on">\n' +
'{{\'toolbar.grouplabel.alignments\' | translate}}\n' +
'</div>\n' +
'</div>\n';
} );