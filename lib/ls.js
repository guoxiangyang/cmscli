var http = require('http');
var opt = require('./opt.js');
function ls(remote, callback) {
    var tree = opt.tree;
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : opt.host,
        port   : opt.port,
        path   : `/tree2/ls?tree=${tree}&path=${remote}`
    };
    console.log(opt, option);
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
module.exports = ls;
