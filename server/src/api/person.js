/**
 * @file 人员操作
 */

const ObjectId = require('mongodb').ObjectId;

const {
    genToken
} = require('../auth/index');

/**
 * 根据 id 找到人
 *
 * @param {string} id
 * @param {*} dbClient
 */
async function getPersonById(_id, dbClient) {
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const person = await cPeople.findOne({
        _id: ObjectId(_id)
    });
    return person;
}

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
    let person = await getPersonById(params._id, dbClient);
    if (!person) {
        return {
            status: 1,
            msg: '人员不存在'
        };
    }
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    delete params._id; // 删除 _id 避免更新数据库时报错
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
    // 得有这个人，并且拿到 id
    let person = await getPersonById(params._id, dbClient);
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
            msg: `${person.name} 删除成功`
        };
    }
    return {
        status: 1,
        msg: `${person.name} 删除失败`
    };
}

/**
 * 登录
 *
 * @param {object} params
 * @param {*} dbClient
 */
async function login(params, dbClient) {
    const dbBask = dbClient.db('bask');
    const cPeople = dbBask.collection('people');
    const person = await cPeople.findOne({
        username: params.username,
        password: params.password
    });
    if (
        person
        && person._id
    ) {
        const token = genToken(person._id);
        return {
            status: 0,
            msg: `${person.name} 登录成功`,
            token
        };
    }
    return {
        status: 1,
        msg: `${person.name} 登录失败`
    };
}

module.exports = {
    getPersonById,
    getPersonByName,
    addPerson,
    changePerson,
    deletePerson,
    login
};
