var http = require('http');
function find(host, port, tree, remote, opt, callback) {
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/find?tree=${tree}&path=${remote}&option=${opt}`
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
