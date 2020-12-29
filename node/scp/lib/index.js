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
        case "dadi":
            host = "172.31.223.138";
            username = "root";
            password = "Cbswk@223";
            sourceDir = `D:/workspace/voiceprint/voiceprint-web/dist/`;
            targetDir = `/mnt/dadi/dists/`;
            break;
        case "renbao":
            host = "172.31.223.138";
            username = "root";
            password = "Cbswk@223";
            sourceDir = `D:/workspace/voiceprint/Ele_Fraud/dist/`;
            // targetDir = `/mnt/renbao/Test/dist_test/`;
            targetDir = `/mnt/renbao/Test/dist/`;
            break;
        case "rongzhi":
            host = "172.31.243.54";
            username = "root";
            password = "Iflytek@saa11";
            sourceDir = `D:/workspace/rongzhi/hengfeng/web/dist/`;
            targetDir = `/home/iflytek/iikb/apache-tomcat-manage/webapps/iikb_manage_web_war/views/`;
            break;
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
