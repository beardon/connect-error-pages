'use strict';

function buildPath(statusCode) {
    var path = require('path');
    var serverErrorPagesPath = path.join(require('server-error-pages').path, '_site');
    return path.join(serverErrorPagesPath, statusCode + '-error.html');
}

function isAvailableStatusCode(statusCode) {
    return ([403, 404, 500, 502, 503, 504].indexOf(statusCode) > -1);
}

module.exports = [
    function (req, res, next) {
        res.statusCode = 404;
        return res.sendFile(buildPath(404));
    },
    function (err, req, res, next) {
        res.statusCode = err.status || err.statusCode || res.status || res.statusCode;
        if (!isAvailableStatusCode(res.statusCode)) {
            res.statusCode = 500;
        }
        return res.sendFile(buildPath(res.statusCode));
    }
];
