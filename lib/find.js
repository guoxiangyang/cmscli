var http = require('http');
var host = require('./host.js');
function find(remote, callback) {
    var tree = 'fs';
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : host.host,
        port   : host.port,
        path   : `/tree2/find?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        res.on('data', function (chunk) {
            process.stdout.write(chunk);
        });
        res.on('end', function () {
            callback();
        });
    });
    req.end();
};
module.exports = find;
