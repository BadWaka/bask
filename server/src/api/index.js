const fs = require('fs');
const {
    getPersonByName,
    addPerson
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
            const {
                name,
                positionList
            } = ctx.request.body;
            // name 不能相同
            let person = await getPersonByName(name, app.dbClient);
            if (person) {
                ctx.body = {
                    status: 1,
                    errmsg: '名称已存在'
                }
                return;
            }
            // 添加人员
            person = await addPerson({
                name,
                positionList
            }, app.dbClient);
            ctx.body = {
                status: 0,
                errmsg: `${name} 创建成功`,
                id: person.insertedId
            }
            return;
        })
        // 删除人员信息
        .post('/api/deletePerson', async (ctx, next) => {
            console.log('/api/deletePerson');
        })
        // 修改人员信息
        .post('/api/changePerson', async (ctx, next) => {
            console.log('/api/changePerson');
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
