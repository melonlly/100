class FileController {
    upload(ctx, next) {
        // const req = ctx.req // Node 的 request 对象
        const request = ctx.request; // koa 的 Request 对象
        console.log(request.body);
        console.log(request.files.file);
    
        const msg = request.body.msg;
        const file = request.files.file;
        const fileName = file.name;
        const filePath = file.path;
        // 文件重命名
        const fs = require("fs");
        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, `${filePath}_${msg}_${fileName}`);
        }
    
        ctx.type = "application/json";
        ctx.body = {
            msg: "上传成功",
        };
    }
}

module.exports = FileController