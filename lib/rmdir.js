var http = require('http');
var host = require('./host.js');
function rmdir(remote, callback) {
    console.error("[rmdir]", remote);
    var tree = 'fs';
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : host.host,
        port   : host.port,
        path   : `/tree2/rmdir?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        res.on('data', function (chunk) {
            process.stdout.write(chunk)
        });
        res.on('end', function () {
            console.error("[rmdir]finished", decodeURIComponent(remote), res.statusCode);
            callback();
        });
    });
    req.end();
};

module.exports = rmdir;
