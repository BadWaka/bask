const {
    MongoClient
} = require('mongodb');

// 读取数据库配置文件
const db = require('./db.json');

async function initDB(app) {
    // 拼链接
    const url = `mongodb://${db.user}:${db.pw}@${db.ip}:${db.port}/?authSource=${db.db}&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
    const dbClient = new MongoClient(url);
    await dbClient.connect();
    app.dbClient = dbClient;
}

module.exports = {
    initDB
};
