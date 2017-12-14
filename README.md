# Yeoman generator for Spring code

[![Build Status](https://travis-ci.org/ibm-developer/generator-ibm-java-spring.svg?branch=master)](https://travis-ci.org/ibm-developer/generator-ibm-java-spring)

This is a yeoman generator that will create Java code for you.

It is published on npm [here](https://www.npmjs.com/package/generator-ibm-java-spring).

## Overview
The generator works by taking the answers that the user has supplied, either via the CLI or a UI, and then maps that
to a folder under the templates directory (in future this will be to a Github repository or a cache of a repository).
It then walks all the files in the directory and for each one parses it through a [mustache template processing](https://mustache.github.io/mustache.5.html) engine.

## Running the generator

This is a sub generator and is intended to work with the main [Java code generator](https://github.com/ibm-developer/generator-ibm-java). This generator is listed as a dependency in the [package.json](https://github.ibm.com/arf/java-codegen-yeoman/blob/development/generator-java/package.json) which means that it will be installed automatically. Follow the build instructions for the main page then additionally

* Fork or clone this repository locally.
* Change into the `generator-spring` directory (where the *package.json* file is)
* Run `npm link` - this will configure your local node installation to resolve this generator from the local file system rather than the NPM registry.

You will now be able to make changes locally and have them picked up when you run the main Java generator.
