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
 * Provides the assertions for testing Liberty code and config from this generator
 */
'use strict';

const assert = require('yeoman-assert');
const tests = require('@arf/java-common');

const SPRING_VERSION = '1.5.4.RELEASE';   //current Spring version to check for
const SERVER_ENV = 'src/main/resources/application-local.properties';

//handy function for checking both existence and non-existence
function getCheck(exists) {
  return {
    file : exists ? assert.file : assert.noFile,
    desc : exists ? 'should create ' : 'should not create ',
    content : exists ? assert.fileContent : assert.noFileContent
  }
}

function getBuildCheck(exists, buildType) {
  return {
    content : exists ? tests.test(buildType).assertContent : tests.test(buildType).assertNoContent
  }
}

function AssertSpring() {
  this.assertAllFiles = function(exists) {
    var check = getCheck(exists);
    it(check.desc + 'server specific files - application-local.properties', function() {
      check.file(SERVER_ENV);
    });
  }

  this.assertArtifactID = function(buildType, id) {
    var check = getBuildCheck(true, buildType);
    if(buildType === 'gradle') {
      it('settings.gradle contains root project setting of ' + id, function() {
        assert.fileContent('settings.gradle', 'rootProject.name = \'' + id + '\'');
      });
    }
    if(buildType === 'maven') {
      check.content('<artifactId>' + id + '</artifactId>');
    }
  }

  this.assertVersion = function(buildType) {
    describe('contains Spring version ' + SPRING_VERSION, function() {
      var check = getBuildCheck(true, buildType);
      if(buildType === 'gradle') {
        check.content('org.springframework.boot:spring-boot-gradle-plugin:' + SPRING_VERSION);
      }
      if(buildType === 'maven') {
        var groupId = 'org\\.springframework\\.boot';
        var artifactId = 'spring-boot-starter-parent';
        var version = SPRING_VERSION.replace(/\./g, '\\.');
        var content = '<parent>\\s*<groupId>' + groupId + '</groupId>\\s*<artifactId>' + artifactId + '</artifactId>\\s*<version>' + version + '</version>\\s*</parent>';
        var regex = new RegExp(content);
        check.content(regex);
      }
    });
  }

  this.assertEnv = function(exists, name, value) {
    var check = getCheck(exists);
    it(check.desc + 'an application-local.properties entry for ' + name + " = " + value, function() {
      check.content(SERVER_ENV, name + '="' + value + '"');
    });
  }
}

module.exports = exports = AssertSpring;
