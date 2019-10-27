const express = require('express');

const router = express.Router();

const authenticationRouter = require('./authentication');
// routes
router.use(authenticationRouter);

module.exports = router;
