'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function validation(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({error: 'missing params', code: 'missing_params', status: 'error'});
        return;
    }
    next();
}

router.post('/login', validation, (req, res) => {
    User.findOne({username: req.body.username}).then((user) => {
        if (!user) {
            res.status(400).json({error: 'user not found!', code: 'user_not_found'});
            return;
        }
        if (!user.validPassword(req.body.password)) {
            res.status(400).json({error: 'authentication failed!', code: 'authentication_failed'});
            return;
        }
        Reflect.deleteProperty(user, 'password');
        var token = jwt.sign(user, JWT_SECRET);
        res.json({
            token
        });
    }).catch((error) => {
        logger.error('findUserError: ', error);
        res.status(400).json({error: 'authentication error', code: 'authentication_failed'});
    });
});

function checkIfExist(req, res, next) {
    User.count({username: req.body.username}).then((count) => {
        if (count === 0) {
            next();
            return;
        }
        res.status(400).json({error: 'username already in use!', code: 'username_alredy_used'});
    }).catch((error) => {
        logger.error('countUserError: ', error);
    });
}

router.post('/signup', validation, checkIfExist, (req, res) => {
    var newUser = new User({
        username: req.body.username,
        full_name: req.body.fullname,
        password: req.body.password,
        email: req.body.email
    });

    newUser.save().then(() => {
        res.json({status: 'completed'});
    }).catch((error) => {
        logger.error('signupError', error);
        res.status(400).json({error: 'save user error', code: 'save_error', status: 'error'});
    });
});

module.exports = router;
