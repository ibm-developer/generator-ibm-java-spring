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

  constructor(buildType, createType, envEntries, artifactId) {
    super();
    this.conf = {
      headless :  "true",
      debug : "true",
      buildType : buildType,
      createType : createType,
      promptType : 'prompt:spring',
      envEntries : envEntries,
      appName : APPNAME,
      groupId : GROUPID,
      artifactId : artifactId,
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

    this.assertHealthFiles = function(buildType) {
      it('creates Java src files for health endpoint', function() {
        assert.file(['src/main/java/application/SBApplication.java', 'src/main/java/application/rest/HealthEndpoint.java',
          'src/test/java/application/HealthEndpointTest.java']);
      });
      common.test(buildType).assertDependency('compile', 'org.springframework.boot', 'spring-boot-starter-web');
      common.test(buildType).assertDependency('compile', 'org.springframework.boot', 'spring-boot-actuator');
      common.test(buildType).assertDependency('test', 'org.springframework.boot', 'spring-boot-starter-test');
    }
  }

}

const buildTypes = ['gradle', 'maven'];
const envEntries = [{name: 'envName', value : 'envValue'}];

describe('java spring generator : Spring server integration test', function () {

  buildTypes.forEach(buildType => {
    describe('Generates server configuration for ' + buildType, function () {
      var options = new Options(buildType, 'health', envEntries, ARTIFACTID);
      before(options.before.bind(options));
      options.assertAllFiles(true);
      options.assertVersion(buildType);
      envEntries.forEach(entry => {
          options.assertEnv(true, entry.name, entry.value);
        });
      options.assertHealthFiles(buildType);
    });

    describe('Check artifact id for ' + buildType, function () {
      var options = new Options(buildType, 'health', envEntries, ARTIFACTID);
      before(options.before.bind(options));
      options.assertArtifactID(buildType, options.conf.artifactId);
    });

    describe('Check appName overrides artifact id for ' + buildType, function () {
      var options = new Options(buildType, 'health', envEntries, undefined);
      before(options.before.bind(options));
      options.assertArtifactID(buildType, options.conf.appName);
    });
  })

});

describe('java spring generator : Spring server content test', function () {

  describe('Check default content is generated', function () {
    var options = new Options('maven', 'content', envEntries, ARTIFACTID);
    before(options.before.bind(options));
    options.assertContent(true, '/index.html');
    options.assertContent(true, '/error/404.html');
  });
  

});

