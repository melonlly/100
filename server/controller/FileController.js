const { separator } = require("../utils/load");
const path = require("path")

class FileController {
    // 上传
    upload(ctx, next) {
        // const req = ctx.req // Node 的 request 对象
        const request = ctx.request; // koa 的 Request 对象
        const msg = request.body.msg;
        const file = request.files.file;
        console.log(file);
        const fileName = file.name;
        const filePath = file.path;
        // 文件重命名
        const fs = require("fs");
        let newFilePath = `${filePath}_${msg}_${fileName}`;
        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, newFilePath);
        }

        ctx.type = "application/json";
        ctx.body = {
            id: newFilePath.split(separator).pop(),
            msg: "上传成功",
        };
    }

    // 下载
    download(ctx, next) {
        const id = ctx.request.body.id || ''
        console.log(id);
        const filePath = path.resolve('uploads', id)
        console.log(filePath);

        ctx.body = {
            filePath
        }
    }
}

module.exports = FileController;
