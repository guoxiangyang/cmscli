var call_cms = require('../call_cms.js');
function rmdir(host, port, tree, remote, opt, callback) {
    console.error("[rmdir]", remote);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/rmdir?tree=${tree}&path=${remote}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = rmdir;
