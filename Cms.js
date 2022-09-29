var func_upload  = require('./lib/upload.js');
var func_download  = require('./lib/download.js');
var func_ls      = require('./lib/ls.js');
var func_find    = require('./lib/find.js');
var func_mkdir   = require('./lib/mkdir.js');
var func_rmdir   = require('./lib/rmdir.js');
var func_mv      = require('./lib/mv.js');
var func_ln      = require('./lib/ln.js');
var func_stat    = require('./lib/stat.js');

function Cms(config) {
    this.config = config;
    if (!config.host) { console.error("missing host in config"); };
    if (!config.port) { console.error("missing port in config"); };
    if (!config.tree) { console.error("missing tree in config"); };
    if (!this.config.root) {
        this.config.root = '';
    }
};
Cms.prototype.download = function (remote, local, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_download(this.config.host, this.config.port, this.config.tree, remote, local, opt, callback);
};
Cms.prototype.find = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_find(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
};
Cms.prototype.ls = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_ls(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
};
Cms.prototype.mkdir = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_mkdir(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Cms.prototype.rmdir = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_rmdir(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Cms.prototype.stat = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_stat(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Cms.prototype.stat = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_stat(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Cms.prototype.upload = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    remote = this.config.root + remote;
    func_upload(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Cms.prototype.mv = function (src, dst, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    src = this.config.root + src;
    dst = this.config.root + dst;
    func_mv(this.config.host, this.config.port, this.config.tree, src, dst, opt, callback);
}
Cms.prototype.ln = function (src, dst, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    src = this.config.root + src;
    dst = this.config.root + dst;
    func_ln(this.config.host, this.config.port, this.config.tree, src, dst, opt, callback);
}
module.exports = Cms;
