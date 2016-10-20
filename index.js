'use strict';

function buildPath(statusCode) {
    var path = require('path');
    var serverErrorPagesPath = path.join(require('server-error-pages').path, '_site');
    return path.join(serverErrorPagesPath, statusCode + '-error.html');
}

module.exports = [
    function (req, res, next) {
        res.statusCode = 404;
        return res.sendFile(buildPath(404));
    },
    function (err, req, res, next) {
        // respect err.statusCode
        if (err.statusCode) {
            res.statusCode = err.statusCode;
        }
        // respect err.status
        if (err.status) {
            res.statusCode = err.status;
        }
        // default status code to 500
        if (res.statusCode < 400) {
            res.statusCode = 500;
        }
        return res.sendFile(buildPath(res.statusCode));
    }
];
