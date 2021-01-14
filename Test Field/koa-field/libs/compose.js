/*
    组合 middleware 列表，达到洋葱模型的效果
        middleware必须都是函数

    返回的是一个封装好的函数
*/
module.exports = function compose(middlewares) {
    return function (context, next) {
        let _index = -1;
        function _fn(i) {
            _index = i;
            const middleware = middlewares[i];
            if (!middleware) return Promise.resolve(); // 返回上一层
            try {
                return Promise.resolve(
                    middleware(context, _fn.bind(null, i + 1))
                );
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return _fn(0);
    };
};
