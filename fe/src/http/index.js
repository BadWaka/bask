const axios = require('axios');

const config = require('./config.json');
const host = `https://${config.ip}:8848`;
// const host = `http://localhost:8848`;

async function getPeople() {
    const res = await axios({
        url: `${host}/api/people`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        params: {
        }
    });
    return res;
}

async function getPerson(name) {
    const res = await axios({
        url: `${host}/api/getPerson`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        params: {
            name
        }
    });
    return res;
}

async function addPerson(params) {
    const res = await axios({
        url: `${host}/api/addPerson`,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify(params)
    });
    console.log('http/index.js changePerson res', res);
    return res;
}

async function changePerson(params) {
    const res = await axios({
        url: `${host}/api/changePerson`,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify(params)
    });
    console.log('http/index.js changePerson res', res);
    return res;
}

async function login(username, password) {
    const res = await axios({
        url: `${host}/api/login`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        params: {
            username,
            password
        }
    });
    return res;
}

module.exports = {
    getPeople,
    getPerson,
    changePerson,
    addPerson,
    login
};
