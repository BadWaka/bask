const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = "Hello World";
});

const port = 3000;

app.listen(port);

console.log('服务启动 server started, url: ' + `http://localhost:${port}/`);