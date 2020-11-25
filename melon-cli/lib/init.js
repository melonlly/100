const { promisify } = require("util");
const figlet = promisify(require("figlet"));

const clear = require("clear");
const chalk = require("chalk");
const { clone } = require("./download");

const log = (msg) => console.log(chalk.green(msg));

module.exports = async (name) => {
    // 1.初始页
    const welcome = await figlet("melon welcome");
    log(welcome);

    // 2.下载项目模板
    log(`创建项目${name}`)
    await clone(`github:su37josephxia/vue-template`, name)

    // 3.安装依赖
    
};
