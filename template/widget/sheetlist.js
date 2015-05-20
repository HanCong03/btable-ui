define( function () {
return '<div unselectable="on" class="b-row">\n' +
'<div unselectable="on" class="b-sl-scrollbtn-wrap b-row">\n' +
'<button unselectable="on" class="b-sl-scrollbtn"\n' +
'ng-click="moveRight();"\n' +
'ng-class="{\'b-disabled\': !status.leftMore}"\n' +
'ng-disabled="!status.leftMore">\n' +
'<span unselectable="on" class="b-arrow-icon b-arrow-left"></span>\n' +
'</button>\n' +
'<button unselectable="on" class="b-sl-scrollbtn"\n' +
'ng-class="{\'b-disabled\': !status.rightMore}"\n' +
'ng-click="moveLeft();"\n' +
'ng-disabled="!status.rightMore">\n' +
'<span unselectable="on" class="b-arrow-icon b-arrow-right"></span>\n' +
'</button>\n' +
'</div>\n' +
'<div unselectable="on" class="b-sl-sheets b-row">\n' +
'<button unselectable="on" class="b-sl-more-button"\n' +
'ng-click="moveRight();"\n' +
'ng-class="{\'b-disabled\': !status.leftMore}"\n' +
'ng-disabled="!status.leftMore">\n' +
'...\n' +
'</button>\n' +
'<div unselectable="on" class="b-sl-list-wrap">\n' +
'<ul unselectable="on" class="b-sl-list"\n' +
'style="transform: translateX({{status.translate}}px);">\n' +
'<li unselectable="on" ng-repeat="sheet in sheets"\n' +
'ng-click="itemChange($index);"\n' +
'ng-class="{\'b-active\': $index === status.selected}">\n' +
'<span unselectable="on" class="b-sl-item-label">{{sheet}}</span>\n' +
'</li>\n' +
'</ul>\n' +
'</div>\n' +
'<button unselectable="on" class="b-sl-more-button"\n' +
'ng-class="{\'b-disabled\': !status.rightMore}"\n' +
'ng-click="moveLeft();"\n' +
'ng-disabled="!status.rightMore">\n' +
'...\n' +
'</button>\n' +
'<div unselectable="on" class="b-sl-add-btn" ng-mousedown="addSheet($event);">+</div>\n' +
'</div>\n' +
'</div>\n';
} );