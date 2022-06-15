#!/usr/bin/env node
var scp = require("./scp");

module.exports = (option) => {
  // console.log(process.argv);

  let host = option.ip || "";
  let username = option.username || "";
  let password = option.password || "";
  let sourceDir = option.source === true ? `dist/` : option.source || "";
  let targetDir = option.target || "";

  // const options = program.opts();
  // console.log(option);

  // for (let i = 0; i < process.argv.length; i++) {
  //   const item = process.argv[i];
  //   if (item.indexOf("=") > -1) {
  //     const [key, value] = item.split("=");
  //     if (value) {
  //       if (key == "ip") host = value;
  //       if (key == "u") username = value;
  //       if (key == "p") password = value;
  //       if (key == "s") sourceDir = value;
  //       if (key == "t") targetDir = value;
  //     }
  //   }
  // }

  if (!host || !username || !password || !sourceDir || !targetDir) {
    console.error("缺失关键参数！！！");
    console.warn(`
      参数列表：
        ip，目标服务器ip
        u，目标服务器用户名
        p，目标服务器密码
        s，源文件目录地址（默认为当前目录下dist目录）
        t，目标目录地址
    `);
    return false;
  }

  // console.log(sourceDir, {
  //   host,
  //   username,
  //   password,
  //   targetDir,
  // });
  scp.scp(
    sourceDir,
    {
      host,
      username,
      password,
      path: targetDir,
    },
    (err) => {
      console.error(err);
    }
  );
};
