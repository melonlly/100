#!/usr/bin/env node
var client = require("./scp");

let host;
let username;
let password;

module.exports = () => {
  let type = process.argv.slice(2);
  if (type.length) {
    type = type[0];
  }

  console.log(`当前指定类型 -> ${type}`);

  let sourceDir = ``;
  let targetDir = ``;
  switch (type) {
    
  }

  let path = targetDir;
  if (path) {
    client.scp(
      sourceDir,
      {
        host,
        username,
        password,
        path,
      },
      (err) => {
        console.error(err);
      }
    );
  }
};
