define( function () {
return '<button unselectable="on" type="button" class="btn b-btn" ng-model="status" ng-click="toggle();" btn-checkbox>\n' +
'<span unselectable="on" class="b-icon b-icon-{{type}}"></span>\n' +
'{{text}}\n' +
'</button>\n';
} );