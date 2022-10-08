var call_cms = require('../call_cms.js');
function touch(host, port, tree, remote, opt, callback) {
    console.error("[touch]", remote);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/touch?tree=${tree}&path=${remote}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = touch;
