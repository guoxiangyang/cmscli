#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var host = require('./lib/host.js');
var argv = require('minimist')(process.argv.slice(2));
var config_file = process.env.HOME + '/.config/.cmscli.json';
host.host = argv.host;
host.port = parseInt(argv.port, 10);
if (!host.host || !host.port) {
    try {
        var config = JSON.parse(fs.readFileSync(config_file).toString());
        host.host = config.host || null;
        host.port = config.port || 0;
        console.log(config, host);
    } catch (e) {
        console.error(e);
    };
};
if (!host.host || !host.port) {
    console.error("Missing host, port", host);
    process.exit();
};
if (argv.save) {
    var config = {
        host : host.host,
        port : host.port,
    }
    fs.writeFileSync(config_file, JSON.stringify(config, null, 4));
    console.log("config saved to", config_file);
    process.exit();
}
var func_upload  = require('./lib/upload.js');
var func_ls      = require('./lib/ls.js');
var func_find    = require('./lib/find.js');
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
case "ls" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    func_ls(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "find" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    func_find(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
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
