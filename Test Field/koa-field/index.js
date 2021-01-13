const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`入口0~~~`);
    await next()
    console.log(`出口0~~~`)
})

app.use(async (ctx, next) => {
    console.log(`入口1~~~`);
    // await next()
    console.log(`出口1~~~`)
})

app.use(async (ctx, next) => {
    console.log(`入口2~~~`);
    await next()
    console.log(`出口2~~~`)
})

app.listen(3001, () => {
    console.log(`listen on 3001`);
});
