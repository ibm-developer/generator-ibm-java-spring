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

/**
 * Tests the Liberty aspects generator
 */
'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const AssertOpenApi = require('../../lib/assert.openapi');
const MockPromptMgr = require('../mocks/mock.promptmgr');
const common = require('@arf/java-common');
const Context = common.context;
const openapidoc = require('../resources/basicswagger.json');
const openapidoc1 = require('../resources/basicswagger1.json');

const ARTIFACTID = 'artifact.0.1';
const GROUPID = 'test.group';
const VERSION = '1.0.0';
const APPNAME = 'testApp';

class Options extends AssertOpenApi {

  constructor(buildType, createType, bluemix) {
    super();
    this.conf = {
      headless :  "true",
      debug : "true",
      buildType : buildType,
      createType : createType,
      promptType : 'prompt:spring',
      appName : APPNAME,
      groupId : GROUPID,
      artifactId : ARTIFACTID,
      version : VERSION
    }
    if(bluemix) {
        this.conf.bluemix = bluemix;
    }
    var ctx = new common.context('test', this.conf, new MockPromptMgr());
    this.options = {
      context : ctx
    };
    this.before = function() {
      return helpers.run(path.join( __dirname, '../../generators/app'))
        .withOptions(this.options)
        .withPrompts({})
        .toPromise();
    }
  }
}

const buildTypes = ['gradle', 'maven'];

describe('java spring generator : Spring generation integration test', function () {
  this.timeout(20000);

  buildTypes.forEach(buildType => {
    describe('generate project without openapi code with buildType ' + buildType, function () {
      var bluemix = {
        "backendPlatform" : "SPRING"
      }
      var options = new Options(buildType, 'basic/spring');
      before(options.before.bind(options));
      options.assert(false, []);
    });
    describe('generate project with openapi code with buildType ' + buildType, function () {
      var bluemix = {
          "backendPlatform" : "SPRING",
          "openApiServers" : [
              {
                  "spec" : JSON.stringify(openapidoc)
              }
          ]
      }
      var options = new Options(buildType, 'basic/spring', bluemix);
      before(options.before.bind(options));
      options.assert(true, ['example']);
    });
    describe('generate project with two identical openapi code docs with buildType ' + buildType, function () {
      var bluemix = {
          "backendPlatform" : "SPRING",
          "openApiServers" : [
              {
                  "spec" : JSON.stringify(openapidoc)
              },
              {
                  "spec" : JSON.stringify(openapidoc)
              }
          ]
      }
      var options = new Options(buildType, 'basic/spring', bluemix);
      before(options.before.bind(options));
      options.assert(true, ['example']);
    });
    describe('generate project with two different openapi code docs with buildType ' + buildType, function () {
      var bluemix = {
          "backendPlatform" : "SPRING",
          "openApiServers" : [
              {
                  "spec" : JSON.stringify(openapidoc)
              },
              {
                  "spec" : JSON.stringify(openapidoc1)
              }
          ]
      }
      var options = new Options(buildType, 'basic/spring', bluemix);
      before(options.before.bind(options));
      options.assert(true, ['example', 'example1']);
    });
  });
})
