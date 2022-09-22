var http = require('http');
var fs = require('fs');
var path = require('path');
var func_stat = require('./stat.js');
function Download(host, port, tree, remote, local, done) {
    this.tree = tree;
    this.host = host;
    this.port = port;
    this.remote = remote;
    this.local  = local;
    this.done   = done;
    console.log(remote, local)
    var stat = fs.statSync(local);
    if (!stat.isDirectory) {
        done(local +  ' is not a directory');
        return;
    }
    this.local = `${this.local}/${path.basename(this.remote)}`;
    console.log(`[download]${this.remote} -> ${this.local}`);
    func_stat(host, port, tree, this.remote, function (err, result) {
        if (err) {
            done(err);
        } else {
            if (result.type === 'folder') {
                this.download_folder();
            } else if (result.type === 'file') {
                this.download_file(this.remote, this.local, function (err) {
                    this.done(err);
                }.bind(this));
            } else {
                this.done(result);
            }
        }
    }.bind(this));
};
Download.prototype.download_folder = function () {
    console.log('download_folder')
    var tree = this.tree;
    remote = encodeURIComponent(this.remote);
    tree   = encodeURIComponent(tree);
    var option = {
        host   : this.host,
        port   : this.port,
        path   : `/tree2/find?tree=${tree}&path=${remote}`
    };
    this.files = [];
    this.find_req = http.request(option, function (res) {
        var buf = Buffer.alloc(0);
        this.find_res = res;
        res.on('data', function (chunk) {
            buf = Buffer.concat([buf, chunk]);
            res.pause();
            while (true) {
                var pos = buf.indexOf('\n');
                if (pos < 0) { break; };
                var filename = buf.subarray(0, pos).toString();
                this.files.push(filename);
                buf = buf.subarray(pos + 1);
            };
            this.process_files();
        }.bind(this));
        res.on('end', function () {
            this.done();
        }.bind(this));
    }.bind(this));
    this.find_req.end();
};
Download.prototype.process_files = function () {
    if (this.files.length === 0) {
        this.find_res.resume();
        return;
    }
    var file   = this.files.shift();
    var space  = file.indexOf(' ');
    var type   = file.substr(0, space);
    var remote = file.substr(space + 1);
    // console.log(type, '\t', remote, file);
    if (type === 'folder') {
        var folder = path.relative(this.remote, remote);
        folder = `${this.local}/${folder}`;
        console.log("[mkdir]", folder);
        try {
            fs.mkdirSync(folder, { recursive: true });
        } catch (e) {
            console.trace(e);
            this.find_req.abort();
            this.done(e);
        }
        setTimeout(function () {
            this.process_files();
        }.bind(this), 0);
    } else {
        var target = path.relative(this.remote, remote);
        target = `${this.local}/${target}`;
        var dirname = path.dirname(target);
        try {
            fs.mkdirSync(dirname, { recursive: true });
        } catch (e) {
        }
        this.download_file(remote, target, function (err) {
            if (err) {
                console.trace(err);
                this.find_req.abort();
                this.done(err);
            } else {
                setTimeout(function () {
                    this.process_files();
                }.bind(this), 0);
            };
        }.bind(this));
    }
    
};
Download.prototype.download_file = function (remote, local, callback) {
    console.log('[download]', remote, '->', local)
    var tree = this.tree;
    var remote = encodeURIComponent(remote);
    var option = {
        host   : this.host,
        port   : this.port,
        path   : `/tree2/cat?tree=${tree}&path=${remote}`
    };
    var req = http.request(option, function (res) {
        if (res.statusCode === 200) {
            var output = fs.createWriteStream(local);
            res.pipe(output);
            res.on('error', function (err) {
                callback(err);
            });
            res.on('end', function () {
                callback();
            });
        } else {
            callback(res.statusCode);
        }
    });
    req.end();
};
function download(host, port, tree, remote, local, done) {
    var task = new Download(host, port, tree, remote, local, done);
};
module.exports = download;
