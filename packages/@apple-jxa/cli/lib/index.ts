#!/usr/bin/env node
import {Argument, program, Option} from 'commander';
import {build} from "./build";

program.version(require('../package.json').version, '-v, --version')

program
    .addArgument(new Argument('<application>', 'build application'))
    .option('-o, --output [output]', 'output dir')
    .action((application, cmd) => {
        build(application, cmd)
    });


program.parse();

