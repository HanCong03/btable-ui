/**
 * FUI Grunt file
 **/

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ["themes/**/*.less"],
                tasks: ['less:develop']
            }
        },

        less: {
            develop: {
                files: {
                    'themes/default/btable-ui.all.css': ["themes/default/**.less"]
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('dev', ['less', 'watch']);

};
