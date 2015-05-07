define( function () {
return '<div unselectable="on" class="b-drappanel-wrap">\n' +
'<div unselectable="on" class="b-drappanel b-row">\n' +
'<div unselectable="on" class="b-drappanel-box">\n' +
'<div unselectable="on" class="b-drappanel-content b-row b-row-left b-wrap">\n' +
'<div unselectable="on" ng-click="select(style.id, style.builtin);" ng-repeat="style in uncategoryBuiltinStyles" class="b-drappanel-item">\n' +
'<div unselectable="on" class="b-drappanel-item-inside" style="{{style.styleText}}">\n' +
'{{style.name}}\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-ctrl-button-group b-column">\n' +
'<button unselectable="on" type="button" class="btn b-btn" ng-class="{disabled: !allowUp}" ng-click="pageUp();">\n' +
'<span unselectable="on" class="b-arrow-up"></span>\n' +
'</button>\n' +
'<button unselectable="on" type="button" class="btn b-btn" ng-class="{disabled: !allowDown}" ng-click="pageDown();">\n' +
'<span unselectable="on" class="b-arrow-down"></span>\n' +
'</button>\n' +
'<button unselectable="on" type="button" class="btn b-btn" ng-click="openPanel($event);">\n' +
'<span unselectable="on" class="b-arrow-open"></span>\n' +
'</button>\n' +
'</div>\n' +
'</div>\n' +
'<div unselectable="on" class="dropdown-menu b-drappanel-menu" role="menu">\n' +
'<div unselectable="on" class="b-drappanel-menu-bed" ng-click="checkPop($event);">\n' +
'<div unselectable="on" ng-repeat="categoryStyle in builtinStyles" class="b-drappanel-menu-box">\n' +
'<label unselectable="on" class="b-cellstyle-category-label">\n' +
'{{categoryStyle[0].categoryName}}\n' +
'</label>\n' +
'<div unselectable="on" class="b-droppanel-menu-item-wrap b-row">\n' +
'<div unselectable="on" ng-click="select(style.id, style.builtin);" isitem ng-repeat="style in categoryStyle" class="b-drappanel-menu-item">\n' +
'<div unselectable="on" class="b-drappanel-menu-item-inside" isitem style="{{style.styleText}}">\n' +
'{{style.name}}\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n';
} );