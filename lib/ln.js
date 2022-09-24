var http = require('http');
function ln(host, port, tree, src, dst, opt, callback) {
    console.error("[mv]", src, dst);
    src  = encodeURIComponent(src);
    dst  = encodeURIComponent(dst);
    tree = encodeURIComponent(tree);
    opt  = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/ln?tree=${tree}&src=${src}&dst=${dst}&option=${opt}`
    };
    var req = http.request(option, function (res) {
        res.on('data', function (chunk) {
            process.stdout.write(chunk)
        });
        res.on('end', function () {
            console.error("[ln]finished", res.statusCode);
            callback();
        });
    });
    req.end();
};

module.exports = ln;
