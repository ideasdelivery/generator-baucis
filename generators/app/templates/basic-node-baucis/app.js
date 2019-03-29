'use strict';
const express = require('express');
const path = require('path');
const logger = require('./lib/logger');
const expressWinston = require('express-winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./lib/routes');
const mongoose = require('mongoose');
const cors = require('cors');

function connectMongoose() {
    return new Promise((resolve, reject) => {
        mongoose.Promise = Promise;
        mongoose.connect(
            `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`
        )
            .then(() => {
                logger.info('Mongoose connection: OK');
                return resolve();
            })
            .catch((error) => {
                logger.error('Mongoose connection: ', error.message);
                return reject();
            });
    });
}

function initialize() {
    const app = express();

    app.use(expressWinston.logger({
        winstonInstance: logger,
        expressFormat: true,
        colorize: false,
        meta: false,
        statusLevels: true
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors());

    Object.keys(routes).forEach((key) => {
        app.use(routes[key]);
    });

    const buildBaucis = require('./build-baucis');
    const baucisInstance = buildBaucis();
    app.use('/api', baucisInstance);

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        return res.status(404).json({
            message: 'Not Found'
        });
    });

    app.use(function(err, req, res, next) {
        logger.error('handleError: ', err);
        if (res.headersSent) {
            next(err);
            return;
        }
        res.status(500).json({
            message: 'Unexpected error'
        });
    });

    return app;
}

module.exports = {
    initialize,
    connectMongoose
};
