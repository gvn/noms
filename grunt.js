/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: '0.1.0',
            banner: 'Noms'
        },
        lint: {
            files: ['_ui/js/*.js']
        },
        concat: {
            dist: {
                src: ['_ui/js/*.js'],
                dest: '_ui/built/app.js'
            }
        },
        min: {
            dist: {
                src: ['_ui/built/app.js'],
                dest: '_ui/built/app.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                $: true,
                NOMS: true,
                console: true,
                d3: true
            }
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint concat min');

};