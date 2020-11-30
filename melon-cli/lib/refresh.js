const fs = require("fs");
const { compile } = require("./compile");

module.exports = async () => {
    // 1.获取
    const list = fs
        .readdirSync(`./src/views`)
        .filter((v) => v !== "Home.vue")
        .map((v) => ({
            name: v.replace(".vue", "").toLowerCase(),
            file: v,
        }));
    // 2.编译模板，写入到目标文件
    compile({ list }, "./src/router.js", "./template/router.js.hbs");
    compile({ list }, "./src/App.vue", "./template/App.vue.hbs");
};
