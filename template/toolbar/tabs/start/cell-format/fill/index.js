define( function () {
return '<div unselectable="on" class="b-numberformat-box b-fill-box-tabs">\n' +
'背景色：\n' +
'<div unselectable="on">\n' +
'<button unselectable="on" b-attr-colorpicker ng-model="status.fillColor" type="button" class="btn b-color-btn b-row">\n' +
'<div unselectable="on" class="b-color-panel">\n' +
'<div unselectable="on" ng-style="{backgroundColor: status.fillColor}"></div>\n' +
'</div>\n' +
'<div unselectable="on" class="b-caret-wrap">\n' +
'<span unselectable="on" class="caret"></span>\n' +
'</div>\n' +
'</button>\n' +
'</div>\n' +
'预览：\n' +
'<div unselectable="on" class="b-fill-preview-box" ng-style="{backgroundColor: status.fillColor}">\n' +
'微软卓越 AaBbCc\n' +
'</div>\n' +
'</div>\n';
} );