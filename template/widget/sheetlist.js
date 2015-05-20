define( function () {
return '<div unselectable="on" class="b-row">\n' +
'<div unselectable="on" class="b-sl-scrollbtn-wrap b-row">\n' +
'<button unselectable="on" class="b-sl-scrollbtn b-sl-leftscroll-btn"\n' +
'ng-mousedown="leftClick($event);"\n' +
'ng-class="{\'b-disabled\': !status.leftMore}"\n' +
'ng-disabled="!status.leftMore">\n' +
'<span unselectable="on" class="b-arrow-icon b-big-arrow-left"></span>\n' +
'</button>\n' +
'<button unselectable="on" class="b-sl-scrollbtn b-sl-rightscroll-btn"\n' +
'ng-class="{\'b-disabled\': !status.rightMore}"\n' +
'ng-mousedown="rightClick($event);"\n' +
'ng-disabled="!status.rightMore">\n' +
'<span unselectable="on" class="b-arrow-icon b-big-arrow-right"></span>\n' +
'</button>\n' +
'</div>\n' +
'<div unselectable="on" class="b-sl-sheets b-row">\n' +
'<button unselectable="on" class="b-sl-more-button"\n' +
'ng-mousedown="leftClick($event);"\n' +
'ng-class="{\'b-disabled\': !status.leftMore}"\n' +
'ng-disabled="!status.leftMore">\n' +
'...\n' +
'</button>\n' +
'<div unselectable="on" class="b-sl-list-wrap">\n' +
'<ul unselectable="on" class="b-sl-list"></ul>\n' +
'</div>\n' +
'<div unselectable="on" class="b-sl-list-shadow-wrap">\n' +
'<ul unselectable="on" class="b-sl-shadow-list">\n' +
'<!-- unselectable="on" 注意：本段代码交由directive内部刷新。\n' +
'<li unselectable="on" ng-repeat="sheet in sheets"\n' +
'ng-mousedown="itemClick($event, $index);"\n' +
'class="b-sl-item"\n' +
'ng-class="{\'b-active\': $index === status.selected}">\n' +
'<div unselectable="on" class="b-sl-item-top-space"></div>\n' +
'<span unselectable="on" class="b-sl-item-label">{{sheet}}</span>\n' +
'<div unselectable="on" class="b-sl-item-bottom-space"></div>\n' +
'</li>\n' +
'-->\n' +
'</ul>\n' +
'</div>\n' +
'<button unselectable="on" class="b-sl-more-button"\n' +
'ng-class="{\'b-disabled\': !status.rightMore}"\n' +
'ng-mousdown="rightClick($event);"\n' +
'ng-disabled="!status.rightMore">\n' +
'...\n' +
'</button>\n' +
'<div unselectable="on" class="b-sl-add-btn" ng-mousedown="addSheet($event);">+</div>\n' +
'</div>\n' +
'</div>\n';
} );