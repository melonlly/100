class BaseController {
    root(ctx, next) {
        ctx.type = "application/json";
        ctx.body = {
            msg: "Hello koa",
        };
    } 
}

module.exports = BaseController;
