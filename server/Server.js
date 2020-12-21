const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const { initController, initRouter } = require("./init");

class Server {
    constructor(options = {}) {
        const app = new Koa(options);
        this.$app = app;
        this.controller = initController();
        const router = initRouter();
        this.router = router;
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
        this.start(options.port || 3000);
    }
    start(port) {
        this.$app.listen(port, `Server is running at http://localhost:${port}`);
    }
}

module.exports = Server;
