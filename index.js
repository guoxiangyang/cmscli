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
};
Cms.prototype.download = function (remote, local, done) {
    func_download(this.config.host, this.config.port, this.config.tree, remote, local, done);
};
Cms.prototype.find = function (remote, callback) {
    func_find(this.config.host, this.config.port, this.config.tree, remote, callback);
};
Cms.prototype.ls = function (remote, callback) {
    func_ls(this.config.host, this.config.port, this.config.tree, remote, callback);
};
Cms.prototype.mkdir = function (remote, callback) {
    func_mkdir(this.config.host, this.config.port, this.config.tree, remote, callback);
}
Cms.prototype.rmdir = function (remote, callback) {
    func_rmdir(this.config.host, this.config.port, this.config.tree, remote, callback);
}
Cms.prototype.stat = function (remote, callback) {
    func_stat(this.config.host, this.config.port, this.config.tree, remote, callback);
}
Cms.prototype.stat = function (remote, callback) {
    func_stat(this.config.host, this.config.port, this.config.tree, remote, callback);
}
Cms.prototype.upload = function (remote, callback) {
    func_upload(this.config.host, this.config.port, this.config.tree, remote, callback);
}
Cms.prototype.mv = function (src, dst, callback) {
    func_mv(this.config.host, this.config.port, this.config.tree, src, dst, callback);
}
Cms.prototype.ln = function (src, dst, callback) {
    func_ln(this.config.host, this.config.port, this.config.tree, src, dst, callback);
}
module.exports = Cms;
