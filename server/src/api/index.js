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
}

module.exports = {
    api
};
