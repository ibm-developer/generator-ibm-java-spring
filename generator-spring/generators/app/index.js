/*
 * Copyright IBM Corporation 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Generator = require('yeoman-generator');
var Handlebars = require('handlebars');
var fspath = require('path');
var fs = require('fs');
var extend = require('extend');
const Defaults = require('../../lib/defaults');
const OpenApi = require('../../lib/openapi');

var defaults = new Defaults();

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    if(!opts.context) throw "This generator cannot be run standalone, only composed with.";
    defaults.setOptions(this);
    extend(this, opts.context);   //inject the objects and functions directly into 'this' to make things easy
    this.logger.writeToLog("Spring Generator context", opts.context);
    var ext = this.promptmgr.add(require('../prompts/spring.js'));
    ext.setContext(opts.context);
    this.conf.addMissing(opts, defaults);
    this.openApiDir = undefined;
    this.logger.writeToLog("Spring Generator conf (final)", this.conf);
  }

  initializing() {
  }


  prompting() {
    //do not add questions in here, use the promptmgr on the context if you need to get input from the user
  }

  configuring() {
    this.configure(this);
    if(this.conf.bluemix && this.conf.bluemix.openApiServers && this.conf.bluemix.backendPlatform == 'SPRING') {
      var doc = this.conf.bluemix.openApiServers[0];
      return OpenApi.generate(doc.spec, this.logger)
        .then(sdk => {
          this.openApiDir = sdk;
        });
    }
  }

  writing() {
    if(this.openApiDir) {
      OpenApi.writeFiles(this.openApiDir, this);
    }
    return this.defaultWriter(this);   //use the default writer supplied by the context.
  }

  end() {
  }

};
