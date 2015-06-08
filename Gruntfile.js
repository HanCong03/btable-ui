/**
 * FUI Grunt file
 **/

module.exports = function (grunt) {

    var cssBanner = '/*!\n' +
        ' * ====================================================\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * GitHub: <%= pkg.repository.url %> \n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' * ====================================================\n' +
        ' */\n';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ["theme/**/*.less"],
                tasks: ['less:build']
            },
            ngtemplates: {
                files: ['template/**/*.html'],
                tasks: ['ngtemplates']
            }
        },

        less: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'dist/theme/default/btable-ui.css': ["theme/default/**/*.less"]
                }
            }
        },

        ngtemplates: {
            app: {
                src: 'template/**/*.html',
                dest: 'src/template.js'
            }
        },

        // 最终代码合并
        concat: {
            js: {
                options: {
                    banner: '/*!\n' +
                    ' * ====================================================\n' +
                    ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                    ' * GitHub: <%= pkg.repository.url %> \n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                    ' * ====================================================\n' +
                    ' */\n\n' +
                    '(function () {\n',

                    footer: '})();'
                },

                dest: 'dist/btable-ui.js',
                src: [
                    "src/constant.js",
                    "src/main.js",
                    "src/config.js",
                    "src/template.js",
                    "l10n/zh-CN.js",
                    "src/toolbar/directives/b-include-replace.js",
                    "src/toolbar/directives/b-colorpicker.js",
                    "src/toolbar/directives/b-attr-colorpicker.js",
                    "src/toolbar/directives/b-pressbutton.js",
                    "src/toolbar/directives/b-inputselect.js",
                    "src/toolbar/directives/b-mergeselect.js",
                    "src/toolbar/directives/b-verticalalign.js",
                    "src/toolbar/directives/b-horizontalalign.js",
                    "src/toolbar/directives/b-numberformat.js",
                    "src/toolbar/directives/b-tooltip.js",
                    "src/toolbar/directives/b-cellstyles.js",
                    "src/toolbar/directives/b-toolbar.js",
                    "src/toolbar/directives/b-submenu.js",
                    "src/toolbar/directives/b-sheetlist.js",
                    "src/toolbar/directives/b-showcolor.js",
                    "src/toolbar/directives/b-cutbtn.js",
                    "src/toolbar/directives/b-pastebtn.js",
                    "src/toolbar/directives/b-copybtn.js",
                    "src/directives/btable.js",
                    "src/directives/btable-preview.js",
                    "src/toolbar/services/toolbar-notify.js",
                    "src/toolbar/services/cellformat-modal-notify.js",
                    "src/toolbar/services/btable.js",
                    "src/toolbar/services/numberformat.js",
                    "src/toolbar/services/sheetlist.js",
                    "src/toolbar/controllers/basic.js",
                    "src/toolbar/controllers/cellformat-modal.js",
                    "src/toolbar/filter/b-currency.js",
                    "src/toolbar/filter/numberformat/number.js",
                    "src/toolbar/filter/numberformat/currency.js"
                ]
            }
        },

        // 压缩
        uglify: {
            options: {
                banner: cssBanner,
                beautify: {
                    ascii_only: true
                },
                sourceMap: false
            },

            minimize: {
                dest: 'dist/btable-ui.min.js',
                src: 'dist/btable-ui.js'
            }
        },

        // 模块依赖合并
        dependence: {

            replace: {

                options: {
                    base: 'src',
                    entrance: 'fui.export'
                },

                files: [{
                    src: ['src/**/*.js', 'dev-lib/exports.js'],
                    dest: '.tmp_build/fui.tmp.js'
                }]

            }
        },

        // hint检查
        jshint: {
            options: {
                ignores: ['src/base/kit/class.js'],
                jshintrc: '.jshintrc'
            },
            check: ['src/**/*.js']
        },

        cssmin: {
            options: {
                banner: '/*!\n' +
                ' * ====================================================\n' +
                ' * Themes file' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * GitHub: <%= pkg.repository.url %> \n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                ' * ====================================================\n' +
                ' */\n'
            },

            min: {
                files: {
                    'dist/theme/default/btable-ui.min.css': ['dist/theme/default/btable-ui.css']
                }
            }
        },

        // 临时目录清理
        clean: {
            files: ['.tmp_build']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-module-dependence');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-angular-templates');


    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['uglify']);
    grunt.registerTask('dev', ['less', 'ngtemplates', 'watch']);
    grunt.registerTask('build', ['less', 'ngtemplates', 'concat', 'uglify', 'cssmin']);
};
