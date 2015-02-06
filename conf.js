/**
 * UI 配置文件
 */

var config = {
    clazz: 'Panel',
    className: 'b-toolbar-panel',
    widgets: [
        {
            clazz: 'Button',
            className: 'b-print',
            id: 'print',
            text: '打印'
        },

        {
            clazz: 'Separator'
        },

        {
            clazz: 'Select',
            selected: 0,
            id: "fontFamily",
            className: 'b-fontfamily',
            icon: {
                className: 'b-fontfamily-open'
            },
            text: '字体',
            widgets: [
                {
                    clazz: 'Item',
                    label: 'Arial',
                    value: 'arial'
                },
                {
                    clazz: 'Item',
                    label: 'Courier New',
                    value: 'Courier New'
                },
                {
                    clazz: 'Item',
                    label: 'Georgia',
                    value: 'Georgia'
                },
                {
                    clazz: 'Item',
                    label: 'Times New Roman',
                    value: 'Times New Roman'
                },
                {
                    clazz: 'Item',
                    label: 'Trebuchet MS',
                    value: 'Trebuchet MS'
                },
                {
                    clazz: 'Item',
                    label: 'Verdana',
                    value: 'Verdana'
                }
            ]
        },

        {
            clazz: 'Separator'
        },

        {
            clazz: 'InputMenu',
            className: 'b-fontsize',
            selected: 6,
            id: "fontSize",
            text: '字号',
            input: {
                button: {
                    className: 'b-fontsize-open'
                }
            },
            menu: {
                className: 'b-fontsize-menu',
                items: [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 24, 36]
            }
        },

        {
            clazz: 'Separator'
        },

        {
            clazz: 'ToggleButton',
            className: 'b-bold',
            id: 'bold',
            text: '加粗'
        },

        {
            clazz: 'ToggleButton',
            className: 'b-italic',
            id: 'italic',
            text: '斜体'
        },

        {
            clazz: 'ToggleButton',
            className: 'b-underline',
            id: 'underline',
            text: '下划线'
        },

        {
            clazz: 'ColorPicker',
            className: 'b-colorpicker',
            id: 'frontcolor',
            text: '前景色',
            defaultColor: '#000',
            icon: {
                className: 'b-frontcolor-icon'
            },
            openIcon: {
                className: 'b-open-icon'
            }
        },

        {
            clazz: 'Separator'
        },

        {
            clazz: 'ColorPicker',
            className: 'b-colorpicker b-fillcolor',
            id: 'fillcolor',
            text: '填充色',
            icon: {
                className: 'b-fillcolor-icon'
            },
            openIcon: {
                className: 'b-open-icon'
            }
        },

        {
            clazz: 'Buttonset',
            id: 'hAlign',
            buttons: [ {
                text: '左对齐',
                pressed: true,
                icon: {
                    className: 'b-left'
                },
                value: 'left'
            }, {
                text: '居中对齐',
                pressed: true,
                icon: {
                    className: 'b-center'
                },
                value: 'center'
            }, {
                text: '右对齐',
                icon: {
                    className: 'b-right'
                },
                value: 'right'
            } ]

        },

        {
            clazz: 'Separator'
        },

        {
            clazz: 'Buttonset',
            id: 'vAlign',
            buttons: [ {
                text: '顶部对齐',
                icon: {
                    className: 'b-top'
                },
                value: 'top'
            }, {
                text: '垂直居中对齐',
                icon: {
                    className: 'b-middle'
                },
                value: 'middle'
            }, {
                text: '底部对齐',
                icon: {
                    className: 'b-bottom'
                },
                value: 'bottom'
            } ]

        },

        {
            clazz: 'Separator'
        //},
        //
        //{
        //    clazz: 'Button',
        //    className: 'b-column-asc',
        //    id: 'ascColumn',
        //    text: '升序'
        //},
        //
        //{
        //    clazz: 'Button',
        //    className: 'b-column-desc',
        //    id: 'descColumn',
        //    text: '降序'
        }

    ]

};