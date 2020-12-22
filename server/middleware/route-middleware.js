/**
 * 路由中间件
 * @param {*} options 
 */
function routeMiddleware(options = {}) {
    return function (ctx, next) {
        console.log(`[route-AOP] 当前访问url：${ ctx.request.method } ${ ctx.request.url }`);
        return next()
    }
}

module.exports = routeMiddleware