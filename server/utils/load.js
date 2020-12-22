const path = require("path");
const fs = require("fs");

const separator = process.platform == "win32" ? "\\" : "/";

const load = (baseDir) => async (dir, cb) => {
    // 获取dir的路径
    const url = path.resolve(baseDir, dir);
    // 获取dir文件夹下所有文件
    const files = fs.readdirSync(url);
    loadFiles(files, url, cb);
};

const loadFiles = (files, baseDir, cb) => {
    if (files) {
        files.forEach((file) => {
            const path = `${baseDir}${separator}${file}`;
            const stat = fs.statSync(path);
            // console.log(`${path}  isDirectory->${stat.isDirectory()}`);
            if (stat.isDirectory()) {
                loadFiles(fs.readdirSync(path), path, cb);
            } else {
                console.log(path, file);
                const fileFullPath = path.replace(".js", "");
                cb(fileFullPath, require(fileFullPath));
            }
        });
    }
};


module.exports = {
    load,
    loadFiles,
    separator,
};
