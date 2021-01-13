const { EventEmitter } = require("events")
const http = require("http");
const compose = require("./compose");

class MKoa extends EventEmitter {
    constructor() {
        super()
        this.middlewares = [] // 中间件列表
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args)
    }

    // 服务创建完成回调
    callback() {
        const fn = compose(this.middlewares)
    }
}

module.exports = MKoa