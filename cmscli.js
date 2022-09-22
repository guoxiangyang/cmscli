#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var opt = {};
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
var Cms = require('./index.js');
var cms = new Cms(opt);
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
    cms.upload(local, local, remote, function (err, result) {
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
    cms.download(remote, local, function (err, result) {
        // console.log(err, result);
    });
    break;
case "ls" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.ls(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "find" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.find(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "mkdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.mkdir(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "rmdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.rmdir(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
case "put" : break;
case "stat" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.stat(remote, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
    break;
case "get" : break;
case "rm" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    cms.rm(remote, function (err, result) {
        // console.log(err, result);
    });
    break;
default :
    console.log("Unknown cmd:", cmd);
    usage();
    break;
};
