const path = require("path");
const fs = require("fs");
const load = baseDir => async (dir, cb) => {
    // 获取dir的路径
    const url = path.resolve(baseDir, dir);
    // 获取dir文件夹下所有文件
    const files = fs.readdirSync(url);
    console.log(files);
    loadFiles(files, url, cb)
    // files.forEach((filename) => {
    //     // 去掉扩展模
    //     filename = filename.replace(".js", "");
    //     const md = require(`${url}/${filename}`);
    //     cb(filename, md);
    // });
};

const loadFiles = (files, baseDir, cb) => {
    if (files) {
        files.forEach(file => {
            const path = `${baseDir}\\${file}`
            console.log(path);
            const stat = fs.statSync(path)
            if (stat.isDirectory) {
                loadFiles(fs.readdirSync(path), path, cb)
            } else {
                console.log(file);
            }
        })
    }
}

module.exports = load;
