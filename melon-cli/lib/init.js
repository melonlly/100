const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const { log, error } = require("./logs");
const clear = require("clear");
const { clone } = require("./download");
const open = require("open")

const isWin32 = process.platform === 'win32'

// 1.输出流引入到主进程输出流
// 2.promise
const spawn = async (...args) => {
    // 全局的 process 对象是主进程
    const { spawn } = require("child_process");
    return new Promise((resolve, reject) => {
        const cpro = spawn(...args); // 子进程
        cpro.stdout.pipe(process.stdout); // 子进程输出流引入到主进程输出
        cpro.stderr.pipe(process.stderr); // 子进程错误流引入到主进程错误
        cpro.on("close", () => {
            resolve();
        });
        cpro.on("error", (err) => {
            reject(err);
        });
    });
};

module.exports = async (name) => {
    // 1.初始页
    const welcome = await figlet("melon welcome");
    log(welcome);

    // 2.下载项目模板
    log(`创建项目${name}`);
    // await clone(`github:su37josephxia/vue-template`, name);

    // 3.安装依赖
    // npm i
    log(`安装依赖。。。`);
    await spawn("npm", ["install"], {
        cwd: `./${name}`, // 指定子进程工作目录
        shell: isWin32, // 需指定平台，否则 err: spawn npm ENOENT
    }).catch((err) => error(err));

    log(`
    安装完成！
    ==============================
        cd ${name}
        npm run serve
    ==============================
    `);

    // 4.打开默认浏览器
    open(`http://localhost:8080/`)
    await spawn("npm", ['run', 'serve'], {
        cwd: `./${name}`,
        shell: isWin32
    })
};
