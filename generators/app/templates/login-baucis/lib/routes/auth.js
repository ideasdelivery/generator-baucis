'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function validation(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Missing params',
            code: 'missing_params'
        });
    }
    return next();
}

router.post('/auth/login', validation, (req, res) => {
    return User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    code: 'authentication_failed',
                    message: 'User not found'
                });
            }
            if (!user.validPassword(req.body.password)) {
                return res.status(400).json({
                    code: 'authentication_failed',
                    message: 'Authentication failed!'
                });
            }
            var token = jwt.sign(user.toJSON(), JWT_SECRET);
            return res.status(200).json({
                token
            });
        })
        .catch((error) => {
            logger.error('Login error: ', error.message);
            return res.status(500).json({
                message: 'Internal error',
                code: 'internal_error'
            });
        });
});

function checkIfExist(req, res, next) {
    return User.count({email: req.body.email}).then((count) => {
        if (count === 0) {
            return next();
        }
        return res.status(400).json({
            message: 'email already in use!',
            code: 'email_alredy_used'
        });
    }).catch((error) => {
        logger.error('countUserError: ', error.message);
        return res.status(500).json({
            message: 'Internal error',
            code: 'internal_error'
        });
    });
}

router.post('/auth/signup', validation, checkIfExist, (req, res) => {
    const newUser = new User({
        full_name: req.body.fullname,
        password: req.body.password,
        email: req.body.email
    });

    return newUser.save()
        .then(() => {
            return res.status(201).json({});
        })
        .catch((error) => {
            logger.error('signupError: ', error.message);
            return res.status(500).json({
                message: 'Internal error',
                code: 'internal_error'
            });
        });
});

module.exports = router;
