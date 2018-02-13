package application;

{{#if bluemix.server.services.length}}
import application.ibmcloud.ServiceMappings;

import org.springframework.beans.factory.annotation.Autowired;
{{/if}}
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
{{#bluemix}}
{{#mongodb}}
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
{{/mongodb}}
{{#openApiServers}}
import org.springframework.context.annotation.ComponentScan;

import springfox.documentation.swagger2.annotations.EnableSwagger2;
{{/openApiServers}}
{{/bluemix}}

@SpringBootApplication
{{#bluemix}}
{{#openApiServers}}
@EnableSwagger2
@ComponentScan(basePackages = { "io.swagger", "application" })
{{/openApiServers}}
{{#mongodb}}
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
{{/mongodb}}
{{/bluemix}}
public class SBApplication {

    {{#if bluemix.server.services.length}}
    @Autowired
    ServiceMappings serviceMappings;
	
    {{/if}}
    public static void main(String[] args) {
        SpringApplication.run(SBApplication.class, args);
    }
}
