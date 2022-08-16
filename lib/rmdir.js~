var http = require('http');
var host = require('./host.js');
function mkdir(remote, callback) {
    console.error("[mkdir]", remote);
    var tree = 'fs';
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : host.host,
        port   : host.port,
        path   : `/tree2/mkdir?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        res.on('data', function (chunk) {
            process.stdout.write(chunk)
        });
        res.on('end', function () {
            console.error("[mkdir]finished", decodeURIComponent(remote), res.statusCode);
            callback();
        });
    });
    req.end();
};

module.exports = mkdir;
