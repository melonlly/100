const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const { initController, initRouter } = require("./init");

const app = new Koa();

const controller = initController();
const router = initRouter();

app.use(cors())
    .use(
        koaBody({
            multipart: true,
            formidable: {
                uploadDir: __dirname + "/uploads",
            },
        })
    )
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)
