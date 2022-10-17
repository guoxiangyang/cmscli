var merge = require('deepmerge');
var func_upload  = require('./tree/upload.js');
var func_download  = require('./tree/download.js');
var func_ls      = require('./tree/ls.js');
var func_select  = require('./tree/select.js');
var func_find    = require('./tree/find.js');
var func_mkdir   = require('./tree/mkdir.js');
var func_rmdir   = require('./tree/rmdir.js');
var func_mv      = require('./tree/mv.js');
var func_ln      = require('./tree/ln.js');
var func_stat    = require('./tree/stat.js');
var func_touch   = require('./tree/touch.js');
var func_rm      = require('./tree/rm.js');

function Tree(config) {
    this.config = config;
    if (!config.host) { console.error("missing host in config"); };
    if (!config.port) { console.error("missing port in config"); };
    if (!config.tree) { console.error("missing tree in config"); };
    if (!this.config.root) {
        this.config.root = '';
    }
    if (!this.config.opt) {
        this.config.opt = {};
    }
};
Tree.prototype.add_root = function (path) {
    if (path === '/') {
        if (this.config.root) {
            return this.config.root
        } else {
            return path;
        }
    } else {
        if (this.config.root) {
            return this.config.root + path
        } else {
            return path;
        }
    }
};
Tree.prototype.download = function (remote, local, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_download(this.config.host, this.config.port, this.config.tree, remote, local, opt, callback);
};
Tree.prototype.find = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_find(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
};
Tree.prototype.ls = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_ls(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
};
Tree.prototype.select = function (remote, query, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_select(this.config.host, this.config.port, this.config.tree, remote, query, opt, callback);
};
Tree.prototype.mkdir = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_mkdir(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.touch = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_touch(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.rmdir = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_rmdir(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.rm = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_rm(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.stat = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_stat(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.stat = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_stat(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.upload = function (remote, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    remote = this.add_root(remote);
    func_upload(this.config.host, this.config.port, this.config.tree, remote, opt, callback);
}
Tree.prototype.mv = function (src, dst, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    src = this.add_root(src);
    dst = this.add_root(dst);
    func_mv(this.config.host, this.config.port, this.config.tree, src, dst, opt, callback);
}
Tree.prototype.ln = function (src, dst, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt = merge(this.config.opt, opt);
    src = this.add_root(src);
    dst = this.add_root(dst);
    func_ln(this.config.host, this.config.port, this.config.tree, src, dst, opt, callback);
}
module.exports = Tree;
