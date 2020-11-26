const chalk = require("chalk");

const log = (msg) => console.log(chalk.green(msg));
const error = (err) => console.error(chalk.red(err));

module.exports = {
    log, error
}