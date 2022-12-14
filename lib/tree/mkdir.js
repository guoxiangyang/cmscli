var call_cms = require('../call_cms.js');
function mkdir(host, port, tree, remote, opt, callback) {
    console.error("[mkdir]", remote);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/mkdir?tree=${tree}&path=${remote}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = mkdir;
