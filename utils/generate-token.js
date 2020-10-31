const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

module.exports = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, SECRET_KEY, { expiresIn: '2h' })
}