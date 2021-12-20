/**
 * @file 人员操作
 */

/**
 * 根据名字找到人
 *
 * @param {string} name
 * @param {*} dbClient
 */
async function getPersonByName(name, dbClient) {
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const person = await cPeople.findOne({
        name
    });
    return person;
}

/**
 * 新增人员
 *
 * @param {object} params
 * @param {*} dbClient
 */
async function addPerson(params, dbClient) {
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    params.createTime = new Date().toString();
    const person = await cPeople.insertOne(params);
    return person;
}

/**
 * 修改人员信息
 *
 * @param {object} params
 * @param {*} dbClient
 */
async function changePerson(params, person, dbClient) {
    // console.log('changePerson params', params, 'person', person);
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const res = await cPeople.update(
        {
            _id: person._id
        },
        {
            $set: params
        }
    );
    return res;
}

module.exports = {
    getPersonByName,
    addPerson,
    changePerson
};
