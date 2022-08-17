var http = require('http');
var host = require('./host.js');
function stat(remote, callback) {
    var tree = 'fs';
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : host.host,
        port   : host.port,
        path   : `/tree2/stat?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            try {
                var result = JSON.parse(body);
                callback(null, result);
            } catch (e) {
                callback(e);
            }
        });
    });
    req.end();
};
module.exports = stat;
