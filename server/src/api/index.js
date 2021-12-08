const fs = require('fs');

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
