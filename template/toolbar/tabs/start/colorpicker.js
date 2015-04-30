define( function () {
return '<div unselectable="on" class="btn-group" dropdown on-toggle="toggle(open);" is-open="status.isOpen">\n' +
'<button unselectable="on" type="button" class="btn b-btn dropdown-toggle" dropdown-toggle ng-class="{\'b-open\': status.isOpen}">\n' +
'<span unselectable="on" class="b-icon b-icon-{{colortype}}"></span>\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</button>\n' +
'</div>\n';
} );