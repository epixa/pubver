# pubver

A utility for publishing the next version of your node modules on npm and git.
Simply put, pubver will create an annotated git tag based off of the version
number in your module's package.json, and then it will publish to npm.

## Installation

```
$ npm install -g pubver
```

## CLI Usage

The primary usage of `pubver` is via the command line:

```
$ cd /path/to/your/node/module
$ pubver
```
