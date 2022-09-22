var opt = require('./lib/opt.js');
var func_upload  = require('./lib/upload.js');
var func_download  = require('./lib/download.js');
var func_ls      = require('./lib/ls.js');
var func_find    = require('./lib/find.js');
var func_mkdir   = require('./lib/mkdir.js');
var func_rmdir   = require('./lib/rmdir.js');
var func_mv      = require('./lib/mv.js');
var func_ln      = require('./lib/ln.js');

function Cms(config) {
    this.config = config;
    for (var key in config) {
        var value = config[key];
        opt[key] = value;
    }
};
Cms.prototype.download = function (remote, local, done) {
    func_download(remote, local, done);
};
Cms.prototype.find = function (remote, callback) {
    func_find(remote, callback);
};
Cms.prototype.ls = function (remote, callback) {
    func_ls(remote, callback);
};
Cms.prototype.mkdir = function (remote, callback) {
    func_mkdir(remote, callback);
}
Cms.prototype.rmdir = function (remote, callback) {
    func_rmdir(remote, callback);
}
Cms.prototype.stat = function (remote, callback) {
    func_stat(remote, callback);
}
Cms.prototype.stat = function (remote, callback) {
    func_stat(remote, callback);
}
Cms.prototype.upload = function (remote, callback) {
    func_upload(remote, callback);
}
Cms.prototype.mv = function (src, dst, callback) {
    func_mv(src, dst, callback);
}
Cms.prototype.ln = function (src, dst, callback) {
    func_ln(src, dst, callback);
}
module.exports = Cms;
