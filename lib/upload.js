var http = require('http');
var fs = require('fs');
var path = require('path');
var mkdir = require('./mkdir.js');
function upload(host, port, tree, base, dir, remote, done) {
    var stat = fs.statSync(base);
    if (!stat.isDirectory()) {
        upload_file(host, port, tree, base, remote, done);
        return;
    }
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    var s = file.substr(base.length);
                    mkdir(remote + s, function () {
                        upload(base, file, remote, function(err, res) {
                            results = results.concat(res);
                            next();
                        });
                    });
                } else {
                    var s = file.substr(base.length);
                    upload_file(host, port, tree, file, remote + s, function () {
                        results.push(file);
                        next();
                    });
                }
            });
        })();
    });
};
function upload_file(host, port, tree, local, remote, callback) {
    console.log("[upload]", local, '->', remote);
    var filename = require('path').basename(local);
    // remote = encodeURIComponent(remote + '/' + filename);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        method : "PUT",
        host   : host,
        port   : port,
        path   : `/tree2/put?tree=${tree}&path=${remote}`
    };
    try {
        fs.accessSync(local, fs.R_OK);
        var f = fs.createReadStream(local);
        var req = http.request(option, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                console.log("finished", local, res.statusCode, body);
                callback();
            });
        });
        f.pipe(req);
    } catch (e) {
        console.error(e);
        callback();
    }
};

module.exports = upload;
