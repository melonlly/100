#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);

program.command("renbao").description("人保 scp").action(require("../lib"));

program.command("dadi").description("大地 scp").action(require("../lib"));

program.command("rongzhi").description("rongzhi 3.0.3 scp").action(require("../lib"));

program.parse(process.argv);

// module.exports = require('../lib')
