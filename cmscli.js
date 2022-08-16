#!/usr/bin/env node
var http = require('http');
var fs   = require('fs');
var argv = require('minimist')(process.argv.slice(2));
function usage() {
    console.log(`cms command line tool
       cms [option] upload <local> <remote>
       cms [option] ls <remote> <local>

       cms [option] ls <path>
       cms [option] mkdir <path>
       cms [option] rmdir <path>
    
       cms [option] put <path> <path to localfile>
       cms [option] stat <path>
       cms [option] get <path>
       cms [option] rm <path>
    
       -r recursive
       -j output json format
       -t <tree>
       -m <meta>
       -b <body>
`);
}
function mkdir(remote, callback) {
    console.log("[mkdir]", remote);
    var tree = 'fs';
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : "localhost",
        port   : 7000,
        path   : `/tree2/mkdir?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            console.log("[mkdir]finished", decodeURIComponent(remote), res.statusCode, body);
            callback();
        });
    });
    req.end();
};
function upload_file(local, remote, callback) {
    console.log("[upload]", local, '->', remote);
    var filename = require('path').basename(local);
    var tree = 'fs';
    // remote = encodeURIComponent(remote + '/' + filename);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        method : "PUT",
        host   : "localhost",
        port   : 7000,
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

var fs = require('fs');
var path = require('path');
function upload(base, dir, remote, done) {
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
                    upload_file(file, remote + s, function () {
                        results.push(file);
                        next();
                    });
                }
            });
        })();
    });
};
var cmd = argv._[0];
switch (cmd) {
case "upload" :
    var local  = argv._[1];
    var remote = argv._[2];
    if (!local || !remote) {
        usage();
        return;
    }
    local = path.resolve(local);
    var stat = fs.statSync(local);
    if (stat.isDirectory()) {
        upload(local, local, remote, function (err, result) {
            // console.log(err, result);
        });
    } else {
        upload_file(local, remote, function () {
        });
    }
    break;
case "download" : break;
case "ls" : break;
case "mkdir" : break;
case "rmdir" : break;
case "put" : break;
case "stat" : break;
case "get" : break;
case "rm" : break;
default :
    console.log("Unknown cmd:", cmd);
    usage();
    break;
};
