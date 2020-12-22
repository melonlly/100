const Router = require("koa-router");
const routeMiddleware = require("./middleware/route-middleware")
let { load, separator } = require("./utils/load");
load = load(__dirname);

const initController = () => {
    const controllers = {};
    load("controller", (filename, controller) => {
        controllers[filename] = controller;
    });
    return controllers;
};

const initRouter = () => {
    const router = new Router();
    load("routes", (filename, routes) => {
        let relativePath = filename.split(`routes${separator}`)[1];
        if (relativePath.indexOf(separator) > -1) {
            relativePath = relativePath.split(separator);
        } else {
            relativePath = [relativePath];
        }
        const name = relativePath.pop(); // 文件名称
        let prePath = relativePath
            .map((path) => {
                if (path == "root") {
                    path = "/";
                } else {
                    path = "/" + path;
                }
                return path;
            })
            .join("");
        prePath = prePath == "/" ? "" : prePath;
        Object.keys(routes).forEach((key) => {
            const [method, path] = key.split(" ");
            console.log(
                `正在映射地址: ${method.toLocaleUpperCase()} ${prePath}${path}`
            );
            // 注册路由
            router[method](prePath + path, routeMiddleware(), routes[key]);
        });
    });
    return router;
};

module.exports = {
    initController,
    initRouter,
};
