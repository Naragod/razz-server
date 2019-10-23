const express = require('express');

const router = express.Router();
const auth = require('../auth/auth');
const authResponseModel = require('../models/authResponseModel');

const testUser = 'mateo';
const testPass = 'pass';

router.post('/auth', (req, res) => {
  const { user } = req.body;
  const { password } = req.body;
  if (user !== testUser || password !== testPass) {
    return res.json(authResponseModel(false, 'Authentication Failed. Incorrect Username or Password.'));
  }

  return auth.sign({ user: testUser }, {}, (err, token) => {
    if (err) {
      throw new Error('Could not generate token.');
    }

    return res.json(authResponseModel(true, 'Authentication Succesful.', token));
  });
});

module.exports = router;
