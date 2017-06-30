'use strict';
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('./lib/logger');
const expressWinston = require('express-winston');
const dotenv = require('dotenv');
dotenv.load();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./lib/routes');
const extractJwt = require('./lib/routes/extract-jwt');
var app = express();


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
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

//Baucis configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB);

app.use(/^\/(?!login)(?!signup).*/, extractJwt);

const buildBaucis = require('./build-baucis');
const baucisInstance = buildBaucis();
app.use('/api', baucisInstance);

Object.keys(routes).forEach((key) => {
    app.use(routes[key]);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ?
          err :
          {};

    res.status(err.status || 500).json({error: err});
});

module.exports = app;
