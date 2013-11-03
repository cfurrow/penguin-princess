module.exports = (grunt) ->


  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      compile:
        options:
          sourceMap: true
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'scripts',
            src: ['**/*.coffee'],
            dest: 'scripts/compiled/',
            ext: '.js'
          }
          {
            expand: true,
            flatten: true,
            cwd: 'spec',
            src: ['**/*.coffee'],
            dest: 'spec/compiled/',
            ext: '.js'
          }
          ]
          

      compileWithMaps: 
        options: 
          join: true
          sourceMap: true
        
        files: 
          'scripts/compiled/all.js': ['scripts/coffee/**/*.coffee'] # concat then compile into single file
    meta:
      src:   ['scripts/compiled/**/*.js','!scripts/**/main.js']
      specs: 'spec/**/*.js'

    watch:
      files: 'scripts/**/*.coffee'
      tasks: ['test']

    jasmine:
      src: '<%= meta.src %>'
      options:
        specs: '<%= meta.specs %>'
        vendor: ['vendor/js/jasmine-given.js','lib/pixi.dev.js','spec/compiled/audio_helper.js', 'lib/konami.js', 'lib/orientationEventDetection.js', 'lib/simple-events.js']

          
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['coffee', 'jasmine'])
  grunt.registerTask('default', ['test'])
