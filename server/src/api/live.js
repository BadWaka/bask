/**
 * @file 直播相关 api
 */

/**
 * 获取所有直播列表
 *
 * @param {string} id
 * @param {*} dbClient
 */
async function getLiveList(dbClient) {
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const people = await cPeople.find({
        live: {
            $exists: true
        }
    }).toArray();
    console.log('getLiveList people', people);
    return people;
}

module.exports = {
    getLiveList
};
