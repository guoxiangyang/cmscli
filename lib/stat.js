var http = require('http');
var opt = require('./opt.js');
function stat(remote, callback) {
    var tree = opt.tree;
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : opt.host,
        port   : opt.port,
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
