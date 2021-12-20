const fs = require('fs');
const {
    addPerson,
    changePerson,
    deletePerson
} = require('./person');

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
            console.log('/api/getPerson');
        })
        // login
        .get('/api/login', async (ctx, next) => {
            console.log('ctx.query', ctx.query);
            const {
                username,
                password
            } = ctx.query;
            ctx.body = '登录成功';
            const dbClient = app.dbClient;
            const dbBask = dbClient.db('bask');
            const cPeople = dbBask.collection('people');
            const people = await cPeople.findOne({
                username,
                password
            });
            ctx.body = JSON.stringify(people);
        })
}

module.exports = {
    api
};
