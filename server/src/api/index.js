const fs = require('fs');
const {
    getPersonByName,
    getPersonById,
    addPerson,
    changePerson,
    deletePerson,
    login
} = require('./person');
const {
    authLogin
} = require('../auth/index');

function api(router, app) {
    router

        // 首页
        .get('/', (ctx, next) => {
            ctx.body = 'Hello World!';
        })

        // 获取所有人员
        .get('/api/people', async (ctx, next) => {
            const dbClient = app.dbClient;
            const dbBask = dbClient.db('bask');
            const cPeople = dbBask.collection('people');
            const people = await cPeople.find({}).toArray();
            ctx.body = JSON.stringify(people);
        })

        // 新增人员
        .post('/api/addPerson', async (ctx, next) => {
            ctx.body = await addPerson(ctx.request.body, app.dbClient);
        })

        // 删除人员信息
        .post('/api/deletePerson', async (ctx, next) => {
            ctx.body = await deletePerson(ctx.request.body, app.dbClient);
        })

        // 修改人员信息
        .post('/api/changePerson', async (ctx, next) => {
            ctx.body = await changePerson(ctx.request.body, app.dbClient);
        })

        // 查询人员信息
        .get('/api/getPerson', async (ctx, next) => {
            console.log('/api/getPerson ctx.query', ctx.query);
            const person = await getPersonByName(ctx.query.name, app.dbClient);
            if (person) {
                delete person.password;
                ctx.body = person;
                return;
            }
            ctx.body = {
                status: 1,
                msg: '查询人员信息失败'
            };
        })

        // 登录
        .post('/api/login', async (ctx, next) => {
            const res = await login(ctx.request.body, app.dbClient);
            ctx.cookies.set('LOGIN_TOKEN', res.token);
            ctx.body = res;
        })

        // 校验登录状态
        .get('/api/authLogin', async (ctx, next) => {
            // 从 cookie 里拿 token
            const token = ctx.cookies.get('LOGIN_TOKEN');
            console.log('/api/authLogin token', token);
            const res = authLogin(token);

            if (
                !res
                || !res._id
            ) {
                ctx.body = {
                    status: 1,
                    msg: 'token 验证失败'
                };
                return;
            }

            const nowTime = new Date().getTime() / 1000;
            console.log('nowTime', nowTime, 'res.exp', res.exp);
            if (res.exp < nowTime) {
                ctx.body = {
                    status: 2,
                    msg: 'token 超时，请重新登录'
                };
                return;
            }

            const person = await getPersonById(res._id, app.dbClient);
            console.log('person', person);
            if (!person) {
                ctx.body = {
                    status: 3,
                    msg: '未找到对应人员'
                };
                return;
            }

            delete person.password;
            ctx.body = person;
        });
}

module.exports = {
    api
};
