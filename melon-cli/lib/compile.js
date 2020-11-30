const fs = require('fs')
const handlebars = require('handlebars');
const chalk = require('chalk')

/**
 * 模板编译
 * @param {*} meta 元数据
 * @param {*} filePath 输出文件路径
 * @param {*} templatePath 模板文件路径
 */
function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath).toString()
        const content = handlebars.compile(template)(meta)
        fs.writeFileSync(filePath, content)
        console.log(chalk.red(`🚀${filePath} 创建成功`))
    }
}

module.exports = {
    compile
}