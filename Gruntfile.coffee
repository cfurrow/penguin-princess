module.exports = (grunt) ->


  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      compileWithMaps: 
        options: 
          join: true
          sourceMap: true
        
        files: 
          'scripts/all.js': ['scripts/coffee/**/*.coffee'] # concat then compile into single file
          'spec/all.js':    ['spec/**/*.coffee']
    meta:
      src:   'scripts/all.js'
      specs: 'spec/all.js'

    watch:
      files: 'scripts/**/*.coffee'
      tasks: ['test']

    jasmine:
      src: '<%= meta.src %>'
      options:
        specs: '<%= meta.specs %>'
        vendor: ['vendor/js/jasmine-given.js','scripts/pixi.dev.js']
          
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['coffee', 'jasmine'])
  grunt.registerTask('default', ['test'])
