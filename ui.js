(function () {

    var pool = [];

    function bind(toolbar, widgets, btable) {
        toolbar.disable();

        btable.on("refresh", refresh);
        btable.on("focuschange", function () {
            enableToolbar(toolbar);
            refresh(btable);
        });
        btable.on("focusout", function () {
            disableToolbar(toolbar);
        });

        initPrint(widgets.print, btable);
        initFontFamily(widgets.fontFamily, btable);
        initFontSize(widgets.fontSize, btable);
        initBold(widgets.bold, btable);
        initItalic(widgets.italic, btable);
        initUnderline(widgets.underline, btable);
        initHAlign(widgets.hAlign, btable);
        initVAlign(widgets.vAlign, btable);
        initFillColor(widgets.fillcolor, btable);
        initFrontColor(widgets.frontcolor, btable);
        initSort(widgets, btable);
        initBorder(widgets, btable);
        initShortcutFormat(widgets.shortcutFormat, btable);
        initPrecision(widgets, btable);
        initThousandth(widgets.thousandth, btable);
        initMerge(widgets.merge, btable);
        initWraptext(widgets.wraptext, btable);
    }

    /**
     * 刷新
     */
    function refresh(btable) {
        for (var i = 0, len = pool.length; i < len; i++) {
            pool[i](btable);
        }
    }

    function listen(cb) {
        pool.push(cb);
    }

    function enableToolbar(toolbar) {
        toolbar.enable();
    }

    function disableToolbar(toolbar) {
        toolbar.disable();
    }

    function initFontFamily(widget, btable) {
        var command = "font";
        var hold = false;

        widget.on("select", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand("font", this.getValue());
            btable.execCommand("inputfocus");
        });

        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.selectByValue(value);
            } else {
                widget.select(0);
            }
            hold = false;
        });
    }

    function initFontSize(widget, btable) {
        var command = 'fontsize';
        var hold = false;

        widget.on("select", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command, this.getValue());
            btable.execCommand("inputfocus");
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                //debugger;
                widget.selectByValue(parseInt(value, 10));
            } else {
                widget.select(6);
            }
            hold = false;
        });
    }

    function initPrint(widget, btable) {
        //var command = 'font';
        //var hold = false;
        //
        widget.on("btnclick", function (evt, info) {
            //if (hold) {
            //    return;
            //}
            //btable.execCommand("font", this.getValue());
            alert("淘气");
        });
        //
        //
        //listen(function () {
        //    var value = btable.queryCommandValue(command);
        //
        //    hold = true;
        //    if (value) {
        //        widget.selectByValue(value);
        //    } else {
        //        widget.select(6);
        //    }
        //    hold = false;
        //});
    }

    function initBold(widget, btable) {
        var command = 'bold';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command);
            btable.execCommand("inputfocus");
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.press();
            } else {
                widget.bounce();
            }
            hold = false;
        });
    }

    function initWraptext(widget, btable) {
        var command = 'wraptext';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command);
            btable.execCommand("inputfocus");
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.press();
            } else {
                widget.bounce();
            }
            hold = false;
        });
    }

    function initItalic(widget, btable) {
        var command = 'italic';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command);
            btable.execCommand("inputfocus");
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.press();
            } else {
                widget.bounce();
            }
            hold = false;
        });
    }

    function initUnderline(widget, btable) {
        var command = 'underline';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command);
            btable.execCommand("inputfocus");
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.press();
            } else {
                widget.bounce();
            }
            hold = false;
        });
    }

    function initHAlign(widget, btable) {
        var command = 'horizontal';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command, this.getValue());
            btable.execCommand('inputfocus');
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.selectByValue(value);
            } else {
                widget.clearSelect();
            }
            hold = false;
        });
    }

    function initVAlign(widget, btable) {
        var command = 'vertical';
        var hold = false;

        widget.on("change", function (evt, info) {
            if (hold) {
                return;
            }
            btable.execCommand(command, this.getValue());
            btable.execCommand('inputfocus');
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.selectByValue(value);
            } else {
                widget.clearSelect();
            }
            hold = false;
        });
    }

    function initFillColor(widget, btable) {
        var command = 'fill';
        var hold = false;

        widget.on("select", function (evt, color) {
            if (hold) {
                return;
            }
            btable.execCommand(command, color);
            btable.execCommand('inputfocus');
        });


        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.selectByColor(value);
            } else {
                widget.resetColor();
            }
            hold = false;
        });
    }

    function initFrontColor(widget, btable) {
        var command = 'color';
        var hold = false;

        widget.on("select", function (evt, color) {
            if (hold) {
                return;
            }
            btable.execCommand(command, color);
            btable.execCommand('inputfocus');
        });

        listen(function () {
            var value = btable.queryCommandValue(command);

            hold = true;
            if (value) {
                widget.selectByColor(value);
            } else {
                widget.resetColor();
            }
            hold = false;
        });
    }

    function initShortcutFormat(widget, btable) {
        var command = 'format';

        widget.getPanel().on("itemclick", function (evt) {
            btable.execCommand(command, evt.widget.getValue());
            widget.close();
        });
    }

    function initPrecision(widgets, btable) {
        var command = 'precision';

        widgets.decPrecision.on("click", function (evt) {
            var value = getPrecision();

            if (!value) {
                return;
            }

            btable.execCommand('format', 'numeric');
            btable.execCommand(command, value - 1);
        });

        widgets.incPrecision.on("click", function (evt) {
            var value = getPrecision();

            if (value === undefined || value >= 15) {
                return;
            }

            btable.execCommand('format', 'numeric');
            btable.execCommand(command, value + 1);
        });


        function getPrecision() {
            var value = btable.queryCommandValue(command);
            var content;

            if (value === undefined) {
                content = btable.execCommand('content');
                content = parseFloat(content, 10);

                if (isNaN(content)) {
                    return;
                }

                content = (content + '').split('.');

                if (content[1]) {
                    return content[1].length;
                } else {
                    return 0;
                }
            }

            return value;
        }

    }

    function initThousandth(widget, btable) {
        widget.on('click', function () {
            btable.execCommand('format', 'numeric');
            btable.execCommand('thousandth', true);
        });
    }

    function initMerge(widget, btable) {
        widget.on("select", function () {
            switch (this.getValue()) {
                case 'center':
                    btable.execCommand('centermerge');
                    break;

                case 'horizontal':
                    btable.execCommand('horizontalmerge');
                    break;

                case 'vertical':
                    btable.execCommand('verticalmerge');
                    break;

                case 'merge':
                    btable.execCommand('merge');
                    break;

                case 'unmerge':
                    btable.execCommand('unmerge');
                    break;
            }
        });

        widget.on("buttonclick", function () {
            btable.execCommand('centermerge');
        });
    }

    function initBorder(widgets, btable) {
        var defaultColor = '#000';
        var currentColor = defaultColor;

        var styleSelected;
        var currentStyle = 'thin';

        var selectWidget = widgets.borderSelect;

        selectWidget.getPanel().on("itemclick", function (evt) {
            applyBorder(evt.widget.getValue());

            selectWidget.close();
        });

        widgets.borderColor.on("select", function (evt, color) {
            currentColor = color || defaultColor;
        });

        styleSelected = widgets.borderStyle.__widgets[0];
        styleSelected.addClass('fui-selected');

        widgets.borderStyle.getPanel().on('itemclick', function (evt) {
            styleSelected.removeClass('fui-selected');
            styleSelected = evt.widget;
            styleSelected.addClass('fui-selected');
            currentStyle = styleSelected.getValue();

            widgets.borderStyle.close();
        });

        function applyBorder(type) {
            var borderData = {
                style: currentStyle,
                color: currentColor
            };

            switch (type) {
                case 'top':
                case 'left':
                case 'bottom':
                case 'right':
                    btable.execCommand('border', type, borderData);
                    break;

                case 'none':
                    btable.execCommand('clearborder');
                    break;

                case 'all':
                    btable.execCommand('border', {
                        top: borderData,
                        left: borderData,
                        right: borderData,
                        bottom: borderData
                    });
                    break;

                case 'outer':
                    btable.execCommand('outerborder', {
                        top: borderData,
                        left: borderData,
                        right: borderData,
                        bottom: borderData
                    });
                    break;
            }
        }
    }

    function initSort(widgets, btable) {
        widgets.ascColumn.on("btnclick", function (evt, color) {
            btable.execCommand('sortcolumnbyasc', color);
        });

        widgets.descColumn.on("btnclick", function (evt, color) {
            btable.execCommand('sortcolumnbydesc', color);
        });
    }

    window.UI = {
        bind: bind
    };

})();