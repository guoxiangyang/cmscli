var tree_create = require('./cms/tree/tree-create.js');
var tree_del    = require('./cms/tree/tree-del.js');
var tree_list   = require('./cms/tree/tree-list.js');
var tree_rename = require('./cms/tree/tree-rename.js');

function Tree(config) {
    this.config = config;
};
Tree.prototype.create = function (tree, opt, callback) {
    tree_create(this.config.host, this.config.port, tree, opt, callback);
};
Tree.prototype.del = function (tree, opt, callback) {
    tree_del(this.config.host, this.config.port, tree, opt, callback);
};
Tree.prototype.list = function (tree, opt, callback) {
    tree_list(this.config.host, this.config.port, tree, opt, callback);
};
Tree.prototype.rename = function (tree, opt, callback) {
    tree_rename(this.config.host, this.config.port, tree, opt, callback);
};

function Cms(config) {
    this.config = config;
    this.tree = new Tree(config);
}



module.exports = Cms;
