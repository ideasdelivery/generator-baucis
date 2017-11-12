'use strict';
const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const dotenv = require('dotenv');
dotenv.load();

const logger = require('./lib/logger');
const expressWinston = require('express-winston');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./lib/routes');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true,
    colorize: false,
    meta: false,
    statusLevels: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Baucis configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {useMongoClient:true})
    .then(() => {
        logger.info('success mongoose connection.');
    })
    .catch((error) => {
        logger.error('Error mongoose connection: ', error);
    });


const buildBaucis = require('./build-baucis');
const baucisInstance = buildBaucis();
app.use('/api', baucisInstance);

Object.keys(routes).forEach((key) => {
    app.use(routes[key]);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    logger.error('handleError: ', err);
    if (res.headersSent) {
        next(err);
        return;
    }
    let error = {};
    error.status = err.status;
    if(req.app.get('env') === 'development') {
        error.message = err.message;
        error.stack = err.stack;
    }
    res.status(err.status || 500).json({
        error
    });
});

module.exports = app;
