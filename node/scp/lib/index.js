#!/usr/bin/env node
var client = require("./scp");

const host = "172.31.223.138";
const username = "root";
const password = "Cbswk@223";

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
            sourceDir = `D:/workspace/voiceprint/voiceprint-web/dist/`;
            targetDir = `/mnt/dadi/dists/`;
            break;
        case "renbao":
            sourceDir = `D:/workspace/voiceprint/Ele_Fraud/dist/`;
            targetDir = `/mnt/renbao/Test/dist_test/`;
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
