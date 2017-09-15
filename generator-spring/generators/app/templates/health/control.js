{
  "excludes" : [
{{#if bluemix.openApiServers}}
    "src/main/java/application/SBApplication.java",
{{/if}}
    ".classpath",
    ".project"
  ],
  "composition" : [
    "build",
    "config"
  ]
}