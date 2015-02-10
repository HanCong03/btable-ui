/**
 * @file
 * @author hancong03@baiud.com
 */

BTable.plugin('OuterInput', (function () {

    var $ = jQuery;

    return {

        input: null,

        init: function () {
            this.$input = $('#outerInput');
            this.input = this.$input[0];

            this.initEvent();
            this.initMessageHook();
        },

        initEvent: function () {
            var _self = this;

            this.$input.on('focus', function () {
                _self.open();
            }).on('input', function () {
                _self.sync();
            }).on('blur', function () {
                _self.close();
            }).on('keydown', function (e) {
                if (e.keyCode === 13) {
                    e.stopPropagation();
                    e.preventDefault();

                    if (e.altKey || e.metaKey) {
                        _self.__newLine();
                    } else {
                        _self.close();
                    }
                }
            });
        },

        initMessageHook: function () {
            this.onMessage({
                'c.refresh': this.refreshContent,
                'c.range.change': this.refreshContent,
                's.input.contentchange': this.contentchange
            });
        },

        open: function () {
            this.rs('s.input.open', this.content);
        },

        close: function () {
            this.rs('s.input.close');
        },

        sync: function () {
            this.rs('s.input.sync', this.input.innerHTML);
        },

        refreshContent: function () {
            var struct = this.rs('c.struct');
            var range = this.rs('c.range');
            var focus = range.getFocus();

            var value = struct.getRawValue(focus.row, focus.col);

            if (value) {
                this.content = this.cs('c.decode.content', value);
            } else {
                this.content = '';
            }

            this.contentchange(this.content);
        },

        contentchange: function (content) {
            this.input.innerHTML = content;
        },

        __newLine: function () {
            var range = this.getDocument().getSelection().getRangeAt(0);

            range = range.cloneRange();

            range.deleteContents();

            range.collapse(false);

            range.insertNode(this.createElement('br'));

            range.collapse(false);

            range.insertNode(this.getDocument().createTextNode('\uFEFF'));

            range.collapse(false);

            this.getDocument().getSelection().removeAllRanges();

            this.getDocument().getSelection().addRange(range);

            this.sync();
        }

    };

})());