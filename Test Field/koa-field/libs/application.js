const { EventEmitter } = require("events");
const http = require("http");
const compose = require("./compose");

class MKoa extends EventEmitter {
    constructor() {
        super();
        this.middlewares = []; // 中间件列表
    }
    use(middleware) {
        if (typeof middleware !== "function")
            throw new TypeError("middleware must be a function!");
        this.middlewares.push(middleware);
        return this;
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    // 服务创建完成回调
    callback() {
        const fn = compose(this.middlewares);
        /*
            TODO
            封装 req res error 等
        */
        return (req, res) => {
            /*
                see http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener
            */
            // console.log(req); // http.IncomingMessage
            // console.log(res); // http.ServerResponse
            return this.handleRequest({ req, res }, fn);
        }
    }

    handleRequest(ctx, composeMiddleware) {
        return composeMiddleware(ctx)
            .then(() => ctx.res.end())
            .catch((err) => ctx.res.end(err));
    }
}

module.exports = MKoa;
