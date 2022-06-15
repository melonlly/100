#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);

// 自定义scp
program
  .command("custom")
  .requiredOption("-ip, --ip <ip>", "目标服务器ip")
  .requiredOption("-u, --username <username>", "目标服务器用户名")
  .requiredOption("-p, --password <password>", "目标服务器密码")
  .requiredOption("-s, --source <source>", "源文件目录地址")
  .requiredOption("-t, --target <target>", "目标目录地址")
  .description("自定义scp")
  .action(require("../lib/custom"));

program.parse(process.argv);

// module.exports = require('../lib')
