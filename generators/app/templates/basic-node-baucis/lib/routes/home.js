'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({
        title: 'Express basic route'
    });
});

module.exports = router;
