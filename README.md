# Yeoman generator for Spring code
| Build | Status |
| ------ | ---- |
| development | [![Build Status](https://travis.ibm.com/arf/java-codegen-spring.svg?token=D9H1S9JmREZirtqjnxut&branch=development)](https://travis.ibm.com/arf/java-codegen-spring) |
| master | [![Build Status](https://travis.ibm.com/arf/java-codegen-spring.svg?token=D9H1S9JmREZirtqjnxut&branch=master)](https://travis.ibm.com/arf/java-codegen-spring) |

You can see builds for all branches here https://travis.ibm.com/arf/java-codegen-spring/branches.

This is a yeoman generator that will create Java code for you.

* It is published as a node module in the IBM NPM repository : https://npm.whitewater.ibm.com
* The node module is published as @arf/generator-spring (note that it's [scoped](https://docs.npmjs.com/misc/scope#installing-scoped-packages) to @arf), see the [step above](https://github.ibm.com/Whitewater/npm) as to
why this module is scoped.

The code coverage for the latest version of the generator hosted in the [IBM NPM repository](https://npm.whitewater.ibm.com/package/@arf/generator-spring) can be viewed in GitHub Pages. There are separate reports for [unit test coverage](https://pages.github.ibm.com/arf/java-codegen-spring/cc/unit/lcov-report/index.html) and [integration test coverage](https://pages.github.ibm.com/arf/java-codegen-spring/cc/int/lcov-report/index.html).

## Branches
The generator has a number of branches that correspond to various bluemix environments and development lifecycles

* **development** : this is the development branch, although this should build, it is the latest code for this generator and may not work as expected. This branch is needed to be able to do end-to-end testing as YaaS, scaffolder etc. work from git repositories.
* **master** : this is what is deployed into live.

## Overview
The generator works by taking the answers that the user has supplied, either via the CLI or a UI, and then maps that
to a folder under the templates directory (in future this will be to a Github repository or a cache of a repository).
It then walks all the files in the directory and for each one parses it through a [mustache template processing](https://mustache.github.io/mustache.5.html) engine.

## Running the generator

This is a sub generator and is intended to work with the main [Java code generator](https://github.ibm.com/arf/java-codegen-yeoman). This generator is listed as a dependency in the [package.json](https://github.ibm.com/arf/java-codegen-yeoman/blob/development/generator-java/package.json) which means that it will be installed automatically. Follow the build instructions for the main page then additionally

* Fork or clone this repository locally.
* Change into the `generator-spring` directory (where the *package.json* file is)
* Run `npm link` - this will configure your local node installation to resolve this generator from the local file system rather than the NPM registry.

You will now be able to make changes locally and have them picked up when you run the main Java generator.

Further information is available in the [Java Codegen documentation](https://pages.github.ibm.com/arf/java-codegen-devguide/spring/overview/)
