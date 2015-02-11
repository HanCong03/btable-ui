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
        }, {
            clazz: 'Separator'
        },

        {
            clazz: 'Button',
            className: 'b-thousandth',
            id: 'thousandth',
            label: ',',
            text: '千分位'
        },

        {
            clazz: 'Button',
            className: 'b-dec-precision',
            id: 'decPrecision',
            text: '减少小数位数'
        },

        {
            clazz: 'Button',
            className: 'b-inc-precision',
            id: 'incPrecision',
            text: '增加小数位数'
        },

        {
            clazz: 'SubMenu',
            id: "shortcutFormat",
            className: 'b-shortcut-format',
            button: {
                label: '123',
                icon: [{
                    className: 'b-shortcut-format-open-icon'
                }]
            },
            text: '数字格式',
            panel: {
                className: 'b-shortcut-format-panel'
            },
            widgets: [
                {
                    clazz: 'Item',
                    label: '常规',
                    value: 'default'
                }, {
                    clazz: 'Item',
                    label: '数字',
                    value: 'numeric'
                }, {
                    clazz: 'Item',
                    label: '日期',
                    value: 'date'
                }, {
                    clazz: 'Item',
                    label: '时间',
                    value: 'time'
                }, {
                    clazz: 'Item',
                    label: '文本',
                    value: 'text'
                }
            ]
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
            clazz: 'SubMenu',
            id: "borderSelect",
            className: 'b-border-select',
            button: {
                icon: [{
                    className: 'b-border-select-icon'
                }, {
                    className: 'b-border-select-open-icon'
                }]
            },
            text: '边框',
            widgets: [
                {
                    clazz: 'Item',
                    className: 'b-border-bottom',
                    label: '下框线',
                    value: 'bottom'
                }, {
                    clazz: 'Item',
                    className: 'b-border-top',
                    label: '上框线',
                    value: 'top'
                }, {
                    clazz: 'Item',
                    className: 'b-border-left',
                    label: '左框线',
                    value: 'left'
                }, {
                    clazz: 'Item',
                    className: 'b-border-right',
                    label: '右框线',
                    value: 'right'
                }, {
                    clazz: 'Separator'
                }, {
                    clazz: 'Item',
                    className: 'b-border-none',
                    label: '无框线',
                    value: 'none'
                }, {
                    clazz: 'Item',
                    className: 'b-border-all',
                    label: '所有框线',
                    value: 'all'
                }, {
                    clazz: 'Item',
                    className: 'b-border-outer',
                    label: '外侧框线',
                    value: 'outer'
                }, {
                    clazz: 'Separator'
                }, {
                    clazz: 'ColorPicker',
                    className: 'b-colorpicker b-border-color',
                    id: 'borderColor',
                    label: {
                        'text': '边框色'
                    },
                    layout: 'right',
                    defaultColor: '#000',
                    icon: {
                        className: 'b-border-color-icon'
                    },
                    openIcon: {
                        className: 'b-open-icon'
                    }
                }, {
                    clazz: 'SubMenu',
                    id: "borderStyle",
                    className: 'b-border-style',
                    button: {
                        label: {
                            text: '框线样式'
                        },
                        icon: [{
                            className: 'b-border-style-icon'
                        }, {
                            className: 'b-border-style-open-icon'
                        }]
                    },
                    panel: {
                        className: 'b-border-style-panel',
                        layout: 'right'
                    },
                    widgets: [
                        {
                            clazz: 'Item',
                            className: 'b-border-style-solid',
                            value: 'thin'
                        }, {
                            clazz: 'Item',
                            className: 'b-border-style-dashed',
                            value: 'dashed'
                        }, {
                            clazz: 'Item',
                            className: 'b-border-style-dotted',
                            value: 'dotted'
                        }
                    ]
                }
            ]
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
        },

        {
            clazz: 'Button',
            className: 'b-column-asc',
            id: 'ascColumn',
            text: '升序'
        },

        {
            clazz: 'Button',
            className: 'b-column-desc',
            id: 'descColumn',
            text: '降序'
        }

    ]

};