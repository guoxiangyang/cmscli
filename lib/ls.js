var call_cms = require('./call_cms.js');
function ls(host, port, tree, remote, opt, callback) {
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/ls?tree=${tree}&path=${remote}&option=${opt}`
    };
    call_cms(option, callback);
};
module.exports = ls;
