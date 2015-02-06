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
        initHAlign(widgets.hAlign, btable);
        initVAlign(widgets.vAlign, btable);
        initFillColor(widgets.fillcolor, btable);
        initFrontColor(widgets.frontcolor, btable);
        //initSort(widgets, btable);
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