'use strict';
const express = require('express');
const router = express.Router();

router.get('/users', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
