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

function AssertOpenApi() {
    this.assert = function(exists) {
        var check = exists ? assert.file : assert.noFile;
        var desc = exists ? 'creates openapi files' : 'does not create openapi files';
        it(desc, function() {
            check([
                'src/main/java/io/swagger/Swagger2SpringBoot.java',
                'src/main/java/io/swagger/RFC3339DateFormat.java',
                'src/main/java/io/swagger/model/User.java',
                'src/main/java/io/swagger/model/Tag.java',
                'src/main/java/io/swagger/model/Pet.java',
                'src/main/java/io/swagger/model/Order.java',
                'src/main/java/io/swagger/model/ModelApiResponse.java',
                'src/main/java/io/swagger/model/Category.java',
                'src/main/java/io/swagger/configuration/SwaggerDocumentationConfig.java',
                'src/main/java/io/swagger/configuration/HomeController.java',
                'src/main/java/io/swagger/api/UserApiController.java',
                'src/main/java/io/swagger/api/UserApi.java',
                'src/main/java/io/swagger/api/StoreApiController.java',
                'src/main/java/io/swagger/api/StoreApi.java',
                'src/main/java/io/swagger/api/PetApiController.java',
                'src/main/java/io/swagger/api/PetApi.java',
                'src/main/java/io/swagger/api/NotFoundException.java',
                'src/main/java/io/swagger/api/ApiResponseMessage.java',
                'src/main/java/io/swagger/api/ApiOriginFilter.java',
                'src/main/java/io/swagger/api/ApiException.java'
            ])
        });
    }
}

module.exports = exports = AssertOpenApi;