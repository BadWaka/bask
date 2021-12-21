/**
 * @file 认证
 */

const config = require('./config.json');
const jwt = require('jsonwebtoken');

/**
 * 生成 token
 *
 * @param {string} id 用户 id
 */
function genToken(id) {
    const token = jwt.sign(
        {
            _id: id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        },
        config.secret
    );
    console.log('genToken token', token);
    return token;
}

/**
 * 验证 token
 *
 * @param {string} token 用户 token
 */
function verifyToken(token) {
    const decoded = jwt.verify(token, config.secret);
    console.log('genToken decoded', decoded);
    return decoded;
}

/**
 * 校验登录状态
 *
 * @param {string} token 用户 token
 */
function authLogin(token) {
    if (!token) {
        console.error('authLogin token 为空');
        return;
    }
    return verifyToken(token);
}

module.exports = {
    genToken,
    verifyToken,
    authLogin
};
