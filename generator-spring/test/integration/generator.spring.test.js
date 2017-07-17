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
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const AssertSpring = require('../../lib/assert.spring');
const MockPromptMgr = require('../mocks/mock.promptmgr');
const common = require('@arf/java-common');

const ARTIFACTID = 'artifact.0.1';
const GROUPID = 'test.group';
const VERSION = '1.0.0';
const APPNAME = 'testApp';
const FRAMEWORK = 'spring';

class Options extends AssertSpring {

  constructor(buildType, createType) {
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

describe('java spring generator : Spring server integration test', function () {

  buildTypes.forEach(buildType => {
    describe('Generates server configuration for ' + buildType, function () {
      var options = new Options(buildType, 'build');
      before(options.before.bind(options));
      options.assertAllFiles(true);
      options.assertVersion(buildType);
    });
  })

});
