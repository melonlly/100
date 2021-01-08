#!/usr/bin/env node
module.exports = () => {
    const args = process.argv.slice(2)
    // console.log(args);
    const commander = args[0]
    let content = '内容'
    if (args.length > 1) {
        content = args.slice(1).join('')
    }
    // console.log(content);

    var cp = require("child_process");
    var initApp = function () {
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); sh.Popup("' + content + '", 10, "Title!", 64 );close()"'
        );
    };
    initApp();
};
