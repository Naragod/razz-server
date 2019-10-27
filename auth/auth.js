const jwt = require('jsonwebtoken');

const secret = 'some_secret';
const signOptions = { expiresIn: '24h' };
const verifyOptions = {};

const sign = (payload, options = signOptions, callback) => {
  jwt.sign(payload, secret, options, (err, token) => {
    callback(err, token);
  });
};

const verify = (token, options = verifyOptions, callback) => {
  jwt.verify(token, secret, options, (err, decoded) => {
    callback(err, decoded);
  });
};

module.exports.sign = sign;
module.exports.verify = verify;
