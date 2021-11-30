const axios = require('axios');

const config = require('./config.json');

const host = `http://${config.ip}:8848`;
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

module.exports = {
    getPeople
};
