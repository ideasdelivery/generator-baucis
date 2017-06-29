'use strict';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function getJwt(request) {
    var token;
    if (request.headers.authorization && request.headers.authorization.indexOf('Bearer') !== -1) {
        token = request.headers.authorization.replace('Bearer ', '');
    } else if (request.query && request.query.jwt) {
        token = request.query.jwt;
    }
    return token;
}

function extractJwt(request, response, next) {
    jwt.verify(getJwt(request), JWT_SECRET, (err, decoded) => {
        if (err) {
            response.status(401).json({
                msg: 'unauthorized'
            });
            return;
        }
        request.user = decoded;
        next();
    });
}

module.exports = extractJwt;
