/*
    组合 middleware 列表，达到洋葱模型的效果
*/
module.exports = function compose(middlewares) {
    return function (context, next) {
        let _index = -1;
        function _fn(i) {
            _index = i;
            let middleware = middlewares[i];
            // if (i === middlewares.length) middleware = next; // 当所有middleware处理完成，调用最外层的next
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
