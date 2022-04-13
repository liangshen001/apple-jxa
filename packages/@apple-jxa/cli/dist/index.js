#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var build_1 = require("./build");
commander_1.program.version(require('../package.json').version, '-v, --version');
commander_1.program
    .addArgument(new commander_1.Argument('<application>', 'build application'))
    .option('-o, --output [output]', 'output dir')
    .action(function (application, cmd) {
    (0, build_1.build)(application, cmd);
});
commander_1.program.parse();
