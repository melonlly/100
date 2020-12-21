const Router = require('koa-router');
let load = require("./utils/load");
load = load(__dirname)

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
        routes = typeof routes === "function" ? routes.app : routes;
        const prefix = filename === "index" ? "" : `/${filename}`;
        Object.keys(routes).forEach((key) => {
            const [method, path] = key.split(" ");
            console.log(
                `正在映射地址: ${method.toLocaleUpperCase()}${prefix}${path}`
            );
            // 注册路由
            router[method](prefix + path, routes[key]);
        });
    });
    return router;
};

module.exports = {
    initController,
    initRouter,
};
