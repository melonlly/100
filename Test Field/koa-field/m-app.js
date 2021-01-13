const MKoa = require("./libs/application");
const app = new MKoa()

app.use(async (ctx, next) => {
    console.log(`入口1~~~`);
    await next()
    console.log(`出口1~~~`)
})

app.use(async (ctx, next) => {
    console.log(`入口2~~~`);
    await next()
    console.log(`出口2~~~`)
})

/*
    依照 koa 的洋葱模型，以上两个middleware的输出：
        入口1~~~
        入口2~~~
        出口2~~~
        出口1~~~
    先 use 的middleware，在洋葱模型外层，
    后续 use 的middleware，在洋葱模型的里层，
    请求会从洋葱模型外部进入middleware，因此最外部middleware最先被执行，
        当遇到 next() 将会开始执行下一个middleware，
        以此类推，执行到最后一个middleware（洋葱模型最里层的middleware，最后use的middleware）
        执行完成某一个middleware，将返回到上一层middleware继续执行
        直到完成所有middleware的执行
        
    若某个middleware直接返回了 Response，则后续middleware不会被执行
*/

app.listen(3001, () => {
    console.log(`serve started on 3001`);
})