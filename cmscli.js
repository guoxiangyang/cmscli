#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var host = require('./lib/host.js');
var argv = require('minimist')(process.argv.slice(2));

host.host = argv.host;
host.port = parseInt(argv.port, 10);
if (!host.host || !host.port) {
    console.error("Missing host, port", host);
    process.exit();
};
var func_upload  = require('./lib/upload.js');
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
        host   : host.host,
        port   : host.port,
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
    func_upload(local, local, remote, function (err, result) {
        // console.log(err, result);
    });
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
