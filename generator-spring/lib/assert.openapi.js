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
const example = require('../test/resources/basicswagger.json');
const example1 = require('../test/resources/basicswagger1.json');

function AssertOpenApi() {
    this.assert = function(exists, examples) {
        var check = exists ? assert.file : assert.noFile;
        var desc = exists ? 'creates ' : 'does not create ';
        it(desc + 'core openapi files', function() {
            check([
                'src/main/java/io/swagger/Swagger2SpringBoot.java',
                'src/main/java/io/swagger/RFC3339DateFormat.java',
                'src/main/java/io/swagger/configuration/SwaggerDocumentationConfig.java',
                'src/main/java/io/swagger/configuration/HomeController.java',
                'src/main/java/io/swagger/api/NotFoundException.java',
                'src/main/java/io/swagger/api/ApiResponseMessage.java',
                'src/main/java/io/swagger/api/ApiOriginFilter.java',
                'src/main/java/io/swagger/api/ApiException.java'
            ])
        });
        if(examples.includes('example')) {
            it(desc + 'example openapi files', function() {
                check([
                    'src/main/java/io/swagger/model/User.java',
                    'src/main/java/io/swagger/model/Tag.java',
                    'src/main/java/io/swagger/model/Pet.java',
                    'src/main/java/io/swagger/model/Order.java',
                    'src/main/java/io/swagger/model/ModelApiResponse.java',
                    'src/main/java/io/swagger/model/Category.java',
                    'src/main/java/io/swagger/api/UserApiController.java',
                    'src/main/java/io/swagger/api/UserApi.java',
                    'src/main/java/io/swagger/api/StoreApiController.java',
                    'src/main/java/io/swagger/api/StoreApi.java',
                    'src/main/java/io/swagger/api/PetApiController.java',
                    'src/main/java/io/swagger/api/PetApi.java',
                ])
            });
        }
        if(examples.includes('example1')) {
            it(desc + 'example1 openapi files', function() {
                check([
                    'src/main/java/io/swagger/model/Pet1.java',
                    'src/main/java/io/swagger/api/Pets1ApiController.java',
                    'src/main/java/io/swagger/api/Pets1Api.java',
                ])
            });
        }
    }

    this.getExample = function() {
        return {name: 'example', value: example};
    }

    this.getExample1 = function() {
        return {name: 'example1', value: example1};
    }
}

module.exports = exports = AssertOpenApi;