#!/usr/bin/env node
var http = require('http');
var path = require('path');
var fs   = require('fs');
var Tree = require('./index.js').Tree;
var opt = {};
var opts = {
    boolean : ['L', 'j', 'r', 'c'],
    string  : ['t', 'm', 'b', 'o'],
    alias   : {
        tree : 't',
        json : 'j',
        option : 'o',
        count : 'c',
    },
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
    output : {}
};
if (argv.o) {
    option = JSON.parse(argv.o);
}
option.output.json = argv.j;
option.follow_link = argv.L;
option.count = argv.c;

if (argv.meta) { option.meta = argv.meta; };
if (argv.body) { option.body = argv.body; };

var tree = new Tree(opt);
function usage() {
    console.log(`cms command line tool
       cms.tree [option] upload <local> <remote>
       cms.tree [option] download <remote> <local>

       cms.tree [option] ls <path>
       cms.tree [option] mkdir <path>
       cms.tree [option] rmdir <path>
       cms.tree [option] touch <path>
       cms.tree [option] mv    <path src> <path dst>
    
       cms.tree [option] put <path> <path to localfile>
       cms.tree [option] stat <path>
       cms.tree [option] get <path>
       cms.tree [option] rm <path>

       cms.tree [option] select <path> <query>
    
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
case "select" :
    var remote = argv._[1];
    var query = argv._[2];
    if (!remote || !query) {
        usage();
        return;
    }
    
    tree.select(remote, query, option, function (err, result) {
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
    option.stdout = process.stdout;
    option.stderr = process.stderr;
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
case "mv" :
    var src = argv._[1];
    var dst = argv._[2];
    if (!src || !dst) {
        usage();
        return;
    }
    tree.mv(src, dst, option, function (err, result) {
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
