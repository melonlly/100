const fs = require("fs");

module.exports = async () => {
    // 1.获取
    const fileList = fs
        .readFileSync(`./src/views`)
        .filter((v) => v !== "Home.vue")
        .map((v) => ({
            name: v.replace(".vue", "").toLowerCase(),
            file: v,
        }));
    
};
