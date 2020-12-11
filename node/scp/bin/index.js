#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);

program
    .command("renbao")
    .description("人保 scp")
    .action(require("../lib"));

program.parse(process.argv);

// module.exports = require('../lib')