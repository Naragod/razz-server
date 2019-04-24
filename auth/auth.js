
const jwt = require('jsonwebtoken');
const secret = "some_secret";
const signOptions = {expiresIn: "24h"};
const verifyOptions = {};


module.exports = {
    sign: (payload, options, callback) => {
        options = options || signOptions;
        jwt.sign(payload, secret, options, (err, token) => {
            callback(err, token);
        });
    },

    verify: (token, options, callback) => {
        options = options || verifyOptions;
        jwt.verify(token, secret, options, (err, decoded) => {
            callback(err, decoded);
        });
    },

    
};