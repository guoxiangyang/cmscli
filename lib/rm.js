var call_cms = require('./call_cms.js');
function rm(host, port, tree, remote, opt, callback) {
    console.error("[rm]", remote);
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/rm?tree=${tree}&path=${remote}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = rm;
