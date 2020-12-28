#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);

program.command("msg").description("系统提醒").action(require("../lib"));

program.parse(process.argv);