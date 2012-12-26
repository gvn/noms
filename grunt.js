/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      meta: {
          version: '0.1.0',
          banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://PROJECT_WEBSITE/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'YOUR_NAME; Licensed MIT */'
      },
      lint: {
          files: ['grunt.js', '_ui/js/*.js']
      },
      // qunit: {
      //   files: ['test/**/*.html']
      // },
      concat: {
          dist: {
            src: ['_ui/js/*.js'],
            dest: '_ui/built/catfeedr.js'
          }
      },
      min: {
          dist: {
            src: ['_ui/built/catfeedr.js'],
            dest: '_ui/built/catfeedr.min.js'
          }
      },
      // watch: {
      //   files: '<config:lint.files>',
      //   tasks: 'lint'
      // },
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
            CFV: true,
            console: true
          }
      },
    uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint concat min');

};