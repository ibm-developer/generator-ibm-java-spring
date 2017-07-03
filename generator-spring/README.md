# Yeoman generator for Spring code
This is a [yeoman generator](http://yeoman.io/) that will create Java code for you.

| Build | Status |
| ------ | ---- |
| development | [![Build Status](https://travis.ibm.com/arf/java-codegen-spring.svg?token=D9H1S9JmREZirtqjnxut&branch=development)](https://travis.ibm.com/arf/java-codegen-spring) |
| master | [![Build Status](https://travis.ibm.com/arf/java-codegen-spring.svg?token=D9H1S9JmREZirtqjnxut&branch=master)](https://travis.ibm.com/arf/java-codegen-spring) |

The code coverage for the latest version of the generator hosted in the [IBM NPM repository](https://npm.whitewater.ibm.com/package/@arf/generator-spring) can be viewed in GitHub Pages. There are separate reports for [unit test coverage](https://pages.github.ibm.com/arf/java-codegen-spring/cc/unit/lcov-report/index.html) and [integration test coverage](https://pages.github.ibm.com/arf/java-codegen-spring/cc/int/lcov-report/index.html).

# Getting started:

To run the Yeoman generator simply type the following:

```bash
yo @arf/java (this generator is actually a sub-generator that the main java generator will compose with)
```

The generator provides the ability to generate Spring Java applications.

[Bluemix](https://console.ng.bluemix.net/) starters provide infrastructure files for building locally with Maven or Gradle and deploying to IBM Bluemix using containers. They also include code snippets to connect to any Bluemix services that are selected as part of the generation.

For more information see our [GitHub Enterprise page](https://github.ibm.com/arf/java-codegen-spring).
