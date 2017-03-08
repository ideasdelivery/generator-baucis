'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the rad ' + chalk.red('generator-basic') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your proyect name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'Your proyect version',
      default: '0.0.0'
    }, {
      type: 'confirm',
      name: 'private',
      message: 'Is your proyect private?',
      default: false
    }];

    return this.prompt(prompts)
      .then(function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/*'),
      this.destinationPath('./')
    );
  },

  install: function() {
    this.installDependencies();
  }
});