#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var opt = require('./lib/opt.js');
var argv = require('minimist')(process.argv.slice(2));
var config_file = process.env.HOME + '/.config/.cmscli.json';
opt.host = argv.host;
opt.port = parseInt(argv.port, 10);
if (!opt.host || !opt.port) {
    try {
        var config = JSON.parse(fs.readFileSync(config_file).toString());
        opt.host = config.host || null;
        opt.port = config.port || 0;
        opt.tree = config.tree || 'fs';
    } catch (e) {
        console.error(e);
    };
};
if (!opt.host || !opt.port) {
    console.error("Missing host, port", opt);
    process.exit();
};
if (argv.tree) { opt.tree = argv.tree; };
if (argv.save) {
    var config = {
        host : opt.host,
        port : opt.port,
        tree : opt.tree,
    }
    fs.writeFileSync(config_file, JSON.stringify(config, null, 4));
    console.log("config saved to", config_file);
    process.exit();
}
var func_upload  = require('./lib/upload.js');
var func_download  = require('./lib/download.js');
var func_ls      = require('./lib/ls.js');
var func_find    = require('./lib/find.js');
var func_mkdir   = require('./lib/mkdir.js');
var func_rmdir   = require('./lib/rmdir.js');
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
case "download" :
    var remote = argv._[1];
    var local  = argv._[2] || '.';
    if (!local || !remote) {
        usage();
        return;
    }
    local = path.resolve(local);
    func_download(remote, local, function (err, result) {
        // console.log(err, result);
    });
    break;
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
case "mkdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    func_mkdir(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "rmdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    func_rmdir(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "put" : break;
case "stat" : break;
case "get" : break;
case "rm" : break;
default :
    console.log("Unknown cmd:", cmd);
    usage();
    break;
};
