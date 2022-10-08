#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var Tree = require('./index.js').Tree;
var opt = {};
var opts = {
    boolean : ['L', 'j', 'r'],
    string  : ['t', 'm', 'b'],
    alias   : {
        tree : 't',
        json : 'j'
    },
    default : {
        t : 'fs',
    }
}
var argv = require('minimist')(process.argv.slice(2), opts);
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
var option = {
    output : {
        json : argv.j,
    },
    follow_link : argv.L,
};
if (argv.meta) { option.meta = argv.meta; };
if (argv.body) { option.body = argv.body; };
var tree = new Tree(opt);
function usage() {
    console.log(`cms command line tool
       cms.tree [option] upload <local> <remote>
       cms.tree [option] ls <remote> <local>

       cms.tree [option] ls <path>
       cms.tree [option] mkdir <path>
       cms.tree [option] rmdir <path>
    
       cms.tree [option] put <path> <path to localfile>
       cms.tree [option] stat <path>
       cms.tree [option] get <path>
       cms.tree [option] rm <path>
    
       -r recursive
       -j output json format
       -L follow link
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
    tree.upload(local, local, remote, option, function (err, result) {
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
    tree.download(remote, local, option, function (err, result) {
        // console.log(err, result);
    });
    break;
case "ls" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.ls(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
case "find" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.find(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
case "mkdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.mkdir(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
case "rmdir" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.rmdir(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
case "put" : break;
case "stat" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.stat(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
case "touch" :
    var remote = argv._[1];
    if (!remote) {
        usage();
        return;
    }
    tree.touch(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
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
    tree.rm(remote, option, function (err, result) {
        if (err) {
            process.stderr.write(err);
        } else {
            process.stdout.write(result);
        }
    });
    break;
default :
    if (cmd !== undefined) {
        console.log("Unknown cmd:", cmd);
    }
    usage();
    break;
};
