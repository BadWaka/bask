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
    // name 不能相同
    let person = await getPersonByName(params.name, dbClient);
    if (person) {
        return {
            status: 1,
            msg: '名称已存在'
        };
    }
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    params.createTime = new Date().toString();
    person = await cPeople.insertOne(params);
    return {
        status: 0,
        msg: `${params.name} 创建成功`,
        id: person.insertedId
    };
}

/**
 * 修改人员信息
 *
 * @param {object} params
 * @param {*} dbClient
 */
async function changePerson(params, dbClient) {
    // 得有这个人，并且拿到 id
    let person = await getPersonByName(params.name, dbClient);
    if (!person) {
        return {
            status: 1,
            msg: '人员不存在'
        };
    }
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
    if (
        res
        && res.acknowledged
    ) {
        return {
            status: 0,
            msg: `${params.name} 修改成功`
        };
    }
    return {
        status: 1,
        msg: `${params.name} 修改失败`
    };
}

/**
 * 删除人员
 *
 * @param {object} params
 * @param {*} dbClient
 */
async function deletePerson(params, dbClient) {
    console.log('deletePerson params', params);
    // 得有这个人，并且拿到 id
    let person = await getPersonByName(params.name, dbClient);
    console.log('deletePerson person', person);
    if (!person) {
        return {
            status: 1,
            msg: '人员不存在'
        };
    }
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const res = await cPeople.remove({
        _id: person._id
    });
    if (
        res
        && res.acknowledged
    ) {
        return {
            status: 0,
            msg: `${params.name} 删除成功`
        };
    }
    return {
        status: 1,
        msg: `${params.name} 删除失败`
    };
}

module.exports = {
    getPersonByName,
    addPerson,
    changePerson,
    deletePerson
};
