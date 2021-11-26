const path = require('path');
const Koa = require("koa");
const static_ = require('koa-static');

const app = new Koa();

app.use(static_(
    path.join(__dirname, '../static')
));

app.use(async (ctx) => {
    ctx.body = "Hello World";
});

const port = 8848;

app.listen(port);

console.log('服务启动 server started, url: ' + `http://localhost:${port}/`);
