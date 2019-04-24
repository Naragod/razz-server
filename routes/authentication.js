
const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const authResponseModel = require('../models/authResponseModel');
const testUser = "mateo";
const testPass = "pass";

router.post('/auth', (req, res) => {
    let user = req.body.user;
    let password = req.body.password;
    if(user !== testUser || password !== testPass){
        return res.json(authResponseModel(false, "Authentication Failed. Incorrect Username or Password."));
    }

    auth.sign({user: testUser}, {},
        (err, token) => {
            if(err)
                return res.json(authResponseModel(false, "Authentication Failed."));
                
            return res.json(authResponseModel(true, "Authentication Succesful.", token));
        }
    );
});


module.exports = router;