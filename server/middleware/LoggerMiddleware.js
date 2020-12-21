/**
 * 日志中间件
 * @param {*} options 
 */
function logger(options = {}) {
    console.log(`logger middleware`);
    return function (ctx, next) {
        return next()
    }
}

module.exports = logger