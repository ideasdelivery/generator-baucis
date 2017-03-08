'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: {
    dir: function() {
      this.log(yosay(
        'Welcome to the rad ' + chalk.red('generator-baucis') + ' generator!'
      ));
      if (this.options.createDirectory !== undefined) {
        return true;
      }

      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      return this.prompt(prompt).then(function(response) {
        this.options.createDirectory = response.createDirectory;
      }.bind(this));
    },
    dirname: function() {
      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter directory name'
      }];

      return this.prompt(prompt).then(function(response) {
        this.options.dirname = response.dirname;
      }.bind(this));
    },
    config: function() {

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
        default: true
      }];

      return this.prompt(prompts)
        .then(function(props) {
          // To access props later use this.props.someAnswer;
          this.props = props;
        }.bind(this));
    }
  },

  writing: function() {
    if (this.options.createDirectory) {
      this.destinationRoot(this.options.dirname);
      this.appname = this.options.dirname;
    }
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/.env'),
      this.destinationPath('.env')
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/.esformatter'),
      this.destinationPath('.esformatter')
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        version: this.props.version,
        private: this.props.private
      }
    );
    this.fs.copy(
      this.templatePath('basic-node-baucis/'),
      this.destinationPath('./')
    );
  },

  install: function() {
    this.installDependencies({
      bower: false
    });
  }
});
