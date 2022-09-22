var http = require('http');
var opt = require('./opt.js');
function mv(src, dst, callback) {
    console.error("[mv]", src, dst);
    var tree = opt.tree;
    src  = encodeURIComponent(src);
    dst  = encodeURIComponent(dst);
    tree = encodeURIComponent(tree);
    var option = {
        host   : opt.host,
        port   : opt.port,
        path   : `/tree2/mkdir?tree=${tree}&src=${src}&dst=${dst}`
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

module.exports = mv;
