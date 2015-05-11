define( function () {
return '<!-- unselectable="on" Modal -->\n' +
'<div unselectable="on" class="modal" id="cellFormatModal" style="display: none;" ng-controller="CellForamtModalController" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
'<div unselectable="on" class="modal-dialog">\n' +
'<div unselectable="on" class="modal-content">\n' +
'<div unselectable="on" class="modal-header">\n' +
'<h4 unselectable="on" class="modal-title">{{\'dialog.title.cellformat\' | translate}}</h4>\n' +
'</div>\n' +
'<div unselectable="on" class="modal-body">\n' +
'<ng-include unselectable="on" src="\'template/toolbar/tabs/start/cell-format/index.html\'"></ng-include>\n' +
'</div>\n' +
'<div unselectable="on" class="modal-footer">\n' +
'<button unselectable="on" type="button" class="btn btn-primary">{{\'common.ok\' | translate}}</button>\n' +
'<button unselectable="on" type="button" class="btn btn-default" data-dismiss="modal">{{\'common.cancel\' | translate}}</button>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n' +
'</div>\n';
} );