#!/usr/bin/env node
module.exports = () => {
    var cp = require("child_process");
    var initApp = function () {
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); sh.Popup("打包好啦~~~~~~~~~~~~~~~~~~~~~~!", 10, "Title!", 64 );close()"'
        );
    };
    initApp();
};
