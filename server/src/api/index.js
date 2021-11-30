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

            // people.forEach(person => {
            //     person.positionList = person.position.split(',').map(item => item.trim());
            //     delete person.position;
            //     delete person._id;
            // });
            // console.log('\n/api/people people', people);
            // fs.writeFileSync('data.json', JSON.stringify(people));

            ctx.body = JSON.stringify(people);
        })
}

module.exports = {
    api
};
