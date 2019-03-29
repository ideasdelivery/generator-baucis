'use strict';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function getJwt(request) {
    let token;
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
            return response.status(401).json({
                message: 'Uunauthorized',
                code: 'unauthorized'
            });
        }
        request.user = decoded;
        return next();
    });
}

module.exports = extractJwt;
