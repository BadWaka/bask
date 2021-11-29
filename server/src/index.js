const path = require('path');

const Koa = require("koa");
const static_ = require('koa-static');
const Router = require('koa-router');
const cors = require('koa2-cors');

const {
    getIP
} = require('./utils');
const {
    api
} = require('./api');
const {
    initDB
} = require('./db');

const app = new Koa();
const router = new Router();

// 初始化数据库
initDB(app);

// 设置接口
api(router, app);

app
    // 静态资源目录
    .use(static_(
        path.join(__dirname, '../static')
    ))
    .use(cors({
        origin: (ctx) => {
            return '*';
        },
        // credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE']
    }))
    // 路由
    .use(router.routes())
    .use(router.allowedMethods());

const port = 8848;

app.listen(port);

console.log('服务启动 server started, url: ' + `http://localhost:${port}/`);
console.log('服务启动 server started, url: ' + `http://${getIP()}:${port}/`);
